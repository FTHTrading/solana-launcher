import { NextRequest, NextResponse } from 'next/server';
import { getStorageAdapter } from '@/lib/storage/storage';
import { appConfig } from '@/lib/config/app-config';
import { isRateLimited, getIpKey } from '@/lib/rate-limit/rate-limit';
import { createLogger } from '@/lib/logger/logger';

const log = createLogger('api/upload');

// =============================================
// POST /api/upload
// Server-side image upload to IPFS.
// Accepts multipart/form-data with "file" field.
// Rate limited: 10 uploads / minute per IP.
// =============================================

export async function POST(req: NextRequest) {
  // Rate limit: 10 uploads per minute per IP
  const ip = getIpKey(req.headers);
  if (await isRateLimited(ip, { maxRequests: 10, windowMs: 60_000 })) {
    log.warn('Rate limited', { ip });
    return NextResponse.json(
      { error: 'Too many requests. Please wait a moment before uploading again.' },
      { status: 429 }
    );
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file type server-side
    if (!(appConfig.token.allowedImageTypes as readonly string[]).includes(file.type)) {
      return NextResponse.json(
        { error: `Invalid file type. Allowed: ${appConfig.token.allowedImageTypes.join(', ')}` },
        { status: 400 }
      );
    }

    // Validate file size server-side
    if (file.size > appConfig.token.maxImageSizeMB * 1024 * 1024) {
      return NextResponse.json(
        { error: `File too large. Max ${appConfig.token.maxImageSizeMB}MB` },
        { status: 400 }
      );
    }

    const storage = getStorageAdapter();
    const result = await log.timed('IPFS upload', () => storage.uploadFile(file));

    log.info('Upload complete', { fileType: file.type, fileSize: file.size });
    return NextResponse.json({ uri: result.uri }, { status: 200 });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    log.error('Upload failed', { error: msg });
    return NextResponse.json(
      { error: `Upload failed: ${msg}` },
      { status: 500 }
    );
  }
}

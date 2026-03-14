import { NextRequest, NextResponse } from 'next/server';
import type { TokenMetadata } from '@/types';
import { getStorageAdapter } from '@/lib/storage/storage';
import { isRateLimited, getIpKey } from '@/lib/rate-limit/rate-limit';

// =============================================
// POST /api/metadata
// Server-side metadata upload to IPFS.
// This route keeps provider secrets server-side.
// Rate limited: 10 uploads / minute per IP.
// =============================================

export async function POST(req: NextRequest) {
  // Rate limit
  if (isRateLimited(getIpKey(req.headers), { maxRequests: 10, windowMs: 60_000 })) {
    return NextResponse.json(
      { error: 'Too many requests. Please wait a moment.' },
      { status: 429 }
    );
  }

  try {
    const body = await req.json() as TokenMetadata;

    // Basic server-side validation
    if (!body.name || !body.symbol || !body.image) {
      return NextResponse.json(
        { error: 'Missing required metadata fields: name, symbol, image' },
        { status: 400 }
      );
    }

    const storage = getStorageAdapter();
    const result = await storage.uploadMetadata(body);

    return NextResponse.json({ uri: result.uri }, { status: 200 });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    console.error('[api/metadata] Upload failed:', msg);
    return NextResponse.json(
      { error: `Metadata upload failed: ${msg}` },
      { status: 500 }
    );
  }
}

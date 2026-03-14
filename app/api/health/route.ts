import { NextResponse } from 'next/server';
import { appConfig, isMainnet } from '@/lib/config/app-config';
import { validateEnv } from '@/lib/config/env-validation';

// =============================================
// GET /api/health
// Lightweight healthcheck for uptime monitoring.
// Returns config summary + env validation status.
// No secrets are exposed.
// =============================================

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  const env = validateEnv();

  return NextResponse.json({
    status: env.valid ? 'healthy' : 'degraded',
    timestamp: new Date().toISOString(),
    network: appConfig.solana.network,
    mainnet: isMainnet(),
    envValid: env.valid,
    missingVars: env.missing.length,
    invalidVars: env.invalid.length,
    warnings: env.warnings.length,
    version: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? 'local',
  });
}

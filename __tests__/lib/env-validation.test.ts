import { describe, it, expect, vi, beforeEach } from 'vitest';
import { validateEnv } from '@/lib/config/env-validation';

// Mock process.env for controlled testing
beforeEach(() => {
  vi.unstubAllEnvs();
});

describe('validateEnv', () => {
  it('returns valid:false when required vars are missing', () => {
    // With no env vars set, required ones should be missing
    vi.stubEnv('NEXT_PUBLIC_SOLANA_NETWORK', '');
    vi.stubEnv('NEXT_PUBLIC_SOLANA_RPC_URL', '');
    vi.stubEnv('PINATA_API_KEY', '');
    vi.stubEnv('PINATA_API_SECRET', '');
    vi.stubEnv('NEXT_PUBLIC_TREASURY_WALLET', '');
    vi.stubEnv('NEXT_PUBLIC_PLATFORM_FEE_SOL', '');

    const result = validateEnv();
    expect(result.missing.length).toBeGreaterThan(0);
    expect(result.valid).toBe(false);
  });

  it('detects placeholder values as warnings', () => {
    vi.stubEnv('NEXT_PUBLIC_SOLANA_NETWORK', 'devnet');
    vi.stubEnv('NEXT_PUBLIC_SOLANA_RPC_URL', 'https://api.devnet.solana.com');
    vi.stubEnv('PINATA_API_KEY', 'test-key');
    vi.stubEnv('PINATA_API_SECRET', 'test-secret');
    vi.stubEnv('PINATA_JWT', 'YOUR_JWT_HERE'); // server-only placeholder triggers warning
    vi.stubEnv('NEXT_PUBLIC_TREASURY_WALLET', '11111111111111111111111111111111');
    vi.stubEnv('NEXT_PUBLIC_CREATION_FEE_SOL', '0.1');

    const result = validateEnv();
    // PINATA_JWT is server-only and contains YOUR_ — should warn
    expect(result.warnings.length).toBeGreaterThan(0);
  });
});

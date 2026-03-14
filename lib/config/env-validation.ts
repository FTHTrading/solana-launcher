// =============================================
// ENVIRONMENT VALIDATION — Solana Launcher
//
// Validates required and optional env vars at
// import time. Safe for server + client configs.
// =============================================

interface EnvVar {
  key: string;
  required: boolean;
  serverOnly?: boolean;
  description: string;
  validator?: (value: string) => string | null; // returns error msg or null
}

function isBase58PublicKey(v: string): string | null {
  if (!/^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(v)) {
    return 'must be a valid Solana base58 public key';
  }
  return null;
}

function isPositiveNumber(v: string): string | null {
  const n = parseFloat(v);
  if (isNaN(n) || n <= 0) return 'must be a positive number';
  return null;
}

const ENV_SCHEMA: EnvVar[] = [
  // Required public vars
  {
    key: 'NEXT_PUBLIC_SOLANA_NETWORK',
    required: true,
    description: 'Solana network (devnet | mainnet-beta | testnet)',
    validator: (v) => ['devnet', 'mainnet-beta', 'testnet'].includes(v) ? null : 'must be devnet, mainnet-beta, or testnet',
  },
  {
    key: 'NEXT_PUBLIC_TREASURY_WALLET',
    required: true,
    description: 'Treasury wallet public key (receives platform fees)',
    validator: isBase58PublicKey,
  },
  {
    key: 'NEXT_PUBLIC_CREATION_FEE_SOL',
    required: true,
    description: 'Platform fee in SOL per token launch',
    validator: isPositiveNumber,
  },

  // Required server secrets
  {
    key: 'PINATA_JWT',
    required: true,
    serverOnly: true,
    description: 'Pinata JWT for IPFS uploads',
  },

  // Optional but recommended
  {
    key: 'NEXT_PUBLIC_SOLANA_RPC_URL',
    required: false,
    description: 'Custom Solana RPC URL (Helius, QuickNode, etc.)',
  },
  {
    key: 'NEXT_PUBLIC_HELIUS_RPC_URL',
    required: false,
    description: 'Helius RPC URL (preferred RPC provider)',
  },
  {
    key: 'NEXT_PUBLIC_STORAGE_PROVIDER',
    required: false,
    description: 'Storage provider (pinata | nft-storage | web3-storage)',
    validator: (v) => ['pinata', 'nft-storage', 'web3-storage'].includes(v) ? null : 'must be pinata, nft-storage, or web3-storage',
  },
  {
    key: 'NEXT_PUBLIC_APP_NAME',
    required: false,
    description: 'App display name',
  },
  {
    key: 'NEXT_PUBLIC_APP_URL',
    required: false,
    description: 'Production app URL',
  },
  {
    key: 'NEXT_PUBLIC_PINATA_GATEWAY',
    required: false,
    description: 'Custom Pinata gateway URL',
  },

  // Upstash Redis
  {
    key: 'UPSTASH_REDIS_REST_URL',
    required: false,
    serverOnly: true,
    description: 'Upstash Redis REST URL for distributed rate limiting',
  },
  {
    key: 'UPSTASH_REDIS_REST_TOKEN',
    required: false,
    serverOnly: true,
    description: 'Upstash Redis REST token',
  },

  // Admin
  {
    key: 'ADMIN_API_SECRET',
    required: false,
    serverOnly: true,
    description: 'Secret for admin API routes',
  },
];

export interface EnvValidationResult {
  valid: boolean;
  missing: string[];
  invalid: { key: string; error: string }[];
  warnings: string[];
  summary: Record<string, { set: boolean; required: boolean; description: string }>;
}

export function validateEnv(): EnvValidationResult {
  const missing: string[] = [];
  const invalid: { key: string; error: string }[] = [];
  const warnings: string[] = [];
  const summary: EnvValidationResult['summary'] = {};

  for (const v of ENV_SCHEMA) {
    const raw = process.env[v.key];
    const value = raw?.trim();
    const isSet = !!value && value.length > 0;

    summary[v.key] = { set: isSet, required: v.required, description: v.description };

    if (v.required && !isSet) {
      missing.push(v.key);
      continue;
    }

    // Run validator if value is set
    if (isSet && v.validator) {
      const error = v.validator(value);
      if (error) {
        invalid.push({ key: v.key, error });
      }
    }

    // Placeholder check
    if (isSet && v.serverOnly && (value.includes('YOUR_') || value === '...')) {
      warnings.push(`${v.key} appears to contain a placeholder value`);
    }
  }

  // Mainnet safety checks
  const network = process.env.NEXT_PUBLIC_SOLANA_NETWORK;
  if (network === 'mainnet-beta') {
    if (!process.env.NEXT_PUBLIC_SOLANA_RPC_URL && !process.env.NEXT_PUBLIC_HELIUS_RPC_URL) {
      warnings.push('mainnet-beta selected but using default RPC — strongly recommended to set a paid RPC endpoint');
    }
    const wallet = process.env.NEXT_PUBLIC_TREASURY_WALLET;
    if (wallet === 'YOUR_TREASURY_WALLET_PUBKEY_HERE') {
      warnings.push('mainnet-beta selected but NEXT_PUBLIC_TREASURY_WALLET is still the placeholder value');
    }
  }

  // Upstash pairing
  if (process.env.UPSTASH_REDIS_REST_URL && !process.env.UPSTASH_REDIS_REST_TOKEN) {
    warnings.push('UPSTASH_REDIS_REST_URL is set but UPSTASH_REDIS_REST_TOKEN is missing');
  }

  return {
    valid: missing.length === 0 && invalid.length === 0,
    missing,
    invalid,
    warnings,
    summary,
  };
}

export function logEnvValidation(): void {
  const result = validateEnv();
  const isDev = process.env.NODE_ENV === 'development';

  if (result.missing.length > 0) {
    const msg = `Missing required variables: ${result.missing.join(', ')}`;
    if (isDev) {
      console.warn(`\n⚠️  [env] ${msg}\n   Copy .env.example to .env.local and fill in values.\n`);
    } else {
      console.error(`[CRITICAL] [env] ${msg}`);
    }
  }

  for (const inv of result.invalid) {
    console.error(`[env] ${inv.key}: ${inv.error}`);
  }

  for (const w of result.warnings) {
    console.warn(`[env] ${w}`);
  }

  if (result.valid && isDev) {
    console.log('[env] All required environment variables are set ✓');
  }
}

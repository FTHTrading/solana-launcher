import { clusterApiUrl, type Cluster } from '@solana/web3.js';
import type { SolanaNetwork } from '@/types';

// =============================================
// APP CONFIGURATION
// All magic values must come from here.
// =============================================

const rawNetwork = process.env.NEXT_PUBLIC_SOLANA_NETWORK ?? 'devnet';

function validateNetwork(n: string): SolanaNetwork {
  if (n === 'devnet' || n === 'mainnet-beta' || n === 'testnet') return n;
  console.warn(`[config] Unknown network "${n}", falling back to devnet`);
  return 'devnet';
}

export const appConfig = {
  app: {
    name: process.env.NEXT_PUBLIC_APP_NAME ?? 'Solana Launcher',
    url: process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000',
  },

  solana: {
    network: validateNetwork(rawNetwork) as SolanaNetwork,
    rpcUrl:
      process.env.NEXT_PUBLIC_HELIUS_RPC_URL ??
      process.env.NEXT_PUBLIC_SOLANA_RPC_URL ??
      clusterApiUrl(rawNetwork as Cluster),
    explorerBaseUrl: 'https://solscan.io',
    explorerClusterParam:
      rawNetwork === 'mainnet-beta' ? '' : `?cluster=${rawNetwork}`,
  },

  fees: {
    creationFeeSOL: parseFloat(
      process.env.NEXT_PUBLIC_CREATION_FEE_SOL ?? '0.1'
    ),
    // Estimated network fee in SOL (covers rent + tx fees)
    estimatedNetworkFeeSOL: 0.01,
    treasuryWallet: process.env.NEXT_PUBLIC_TREASURY_WALLET ?? '',
  },

  storage: {
    provider: (process.env.NEXT_PUBLIC_STORAGE_PROVIDER ?? 'pinata') as
      | 'pinata'
      | 'nft-storage'
      | 'web3-storage',
    pinataGateway:
      process.env.NEXT_PUBLIC_PINATA_GATEWAY ?? 'https://gateway.pinata.cloud',
  },

  ecosystem: {
    jupiter: {
      swapUrl: 'https://jup.ag/swap',
      apiUrl: 'https://quote-api.jup.ag/v6',
    },
    raydium: {
      appUrl: 'https://raydium.io',
      swapUrl: 'https://raydium.io/swap',
      poolUrl: 'https://raydium.io/liquidity/create-pool',
    },
    meteora: {
      appUrl: 'https://app.meteora.ag',
      poolUrl: 'https://app.meteora.ag/pools/create',
    },
    orca: {
      appUrl: 'https://www.orca.so',
      poolUrl: 'https://www.orca.so/pools',
    },
    helius: {
      rpcUrl: process.env.NEXT_PUBLIC_HELIUS_RPC_URL ?? '',
    },
  },

  token: {
    // Safe defaults shown to users in the wizard
    defaultDecimals: 6,
    minDecimals: 0,
    maxDecimals: 9,
    maxNameLength: 32,
    maxSymbolLength: 10,
    maxDescriptionLength: 500,
    maxImageSizeMB: 5,
    allowedImageTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  },
} as const;

export function getExplorerTokenUrl(mintAddress: string): string {
  const base = appConfig.solana.explorerBaseUrl;
  const cluster = appConfig.solana.explorerClusterParam;
  return `${base}/token/${mintAddress}${cluster}`;
}

export function getExplorerTxUrl(signature: string): string {
  const base = appConfig.solana.explorerBaseUrl;
  const cluster = appConfig.solana.explorerClusterParam;
  return `${base}/tx/${signature}${cluster}`;
}

export function getExplorerAccountUrl(address: string): string {
  const base = appConfig.solana.explorerBaseUrl;
  const cluster = appConfig.solana.explorerClusterParam;
  return `${base}/account/${address}${cluster}`;
}

export function isMainnet(): boolean {
  return appConfig.solana.network === 'mainnet-beta';
}

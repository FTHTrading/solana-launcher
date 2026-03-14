import { Connection, clusterApiUrl } from '@solana/web3.js';
import { appConfig } from '@/lib/config/app-config';

// =============================================
// SOLANA CONNECTION
// Single source of truth for network config.
// =============================================

let _connection: Connection | null = null;

export function getConnection(): Connection {
  if (!_connection) {
    const rpcUrl =
      appConfig.solana.rpcUrl ||
      clusterApiUrl(appConfig.solana.network);

    _connection = new Connection(rpcUrl, {
      commitment: 'confirmed',
      confirmTransactionInitialTimeout: 60_000,
    });
  }
  return _connection;
}

export function getNetworkDisplayName(): string {
  switch (appConfig.solana.network) {
    case 'mainnet-beta':
      return 'Mainnet';
    case 'devnet':
      return 'Devnet';
    case 'testnet':
      return 'Testnet';
    default:
      return appConfig.solana.network;
  }
}

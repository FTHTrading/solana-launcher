'use client';

import { AlertTriangle, Globe, Shield } from 'lucide-react';
import { appConfig } from '@/lib/config/app-config';

// =============================================
// NETWORK BANNER
//
// Prominent banner displayed on transaction
// pages to make the connected network obvious.
// Devnet shows a clear "development mode" note.
// Mainnet shows a "real money" warning.
//
// Usage:
//   <NetworkBanner />
//   <NetworkBanner className="mb-4" />
// =============================================

interface NetworkBannerProps {
  className?: string;
}

export function NetworkBanner({ className }: NetworkBannerProps) {
  const network = appConfig.solana.network;
  const isMainnet = network === 'mainnet-beta';

  if (isMainnet) {
    return (
      <div
        className={`flex items-center gap-2 rounded-lg border border-amber-500/30 bg-amber-500/5 px-3 py-2 text-sm text-amber-800 dark:text-amber-300 ${className ?? ''}`}
      >
        <AlertTriangle className="h-4 w-4 flex-shrink-0" />
        <span>
          <strong>Mainnet</strong> — Transactions use real SOL and are irreversible.
        </span>
      </div>
    );
  }

  return (
    <div
      className={`flex items-center gap-2 rounded-lg border border-sky-500/30 bg-sky-500/5 px-3 py-2 text-sm text-sky-800 dark:text-sky-300 ${className ?? ''}`}
    >
      {network === 'devnet' ? (
        <>
          <Shield className="h-4 w-4 flex-shrink-0" />
          <span>
            <strong>Devnet</strong> — Development mode. Tokens have no real value.
            Get free SOL from{' '}
            <a
              href="https://faucet.solana.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:no-underline"
            >
              faucet.solana.com
            </a>
          </span>
        </>
      ) : (
        <>
          <Globe className="h-4 w-4 flex-shrink-0" />
          <span>
            <strong>Testnet</strong> — Test mode. Tokens have no real value.
          </span>
        </>
      )}
    </div>
  );
}

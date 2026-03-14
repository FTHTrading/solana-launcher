'use client';

import { AlertTriangle, Coins } from 'lucide-react';
import { Alert } from '@/components/ui/alert';
import { useSOLBalance } from '@/hooks/useSOLBalance';
import { useWallet } from '@solana/wallet-adapter-react';

// =============================================
// SOL BALANCE CHECK
//
// Inline component that warns users when their
// wallet SOL balance is too low to execute
// on-chain transactions. Drop this above any
// "submit / launch / burn" button.
//
// Usage:
//   <SolBalanceCheck />
//   <SolBalanceCheck threshold={0.1} />
// =============================================

interface SolBalanceCheckProps {
  /** SOL threshold below which the warning appears (default: 0.05) */
  threshold?: number;
  /** Optional class name for the wrapper */
  className?: string;
}

export function SolBalanceCheck({
  threshold = 0.05,
  className,
}: SolBalanceCheckProps) {
  const { connected } = useWallet();
  const { balance, loading, isLow } = useSOLBalance(threshold);

  // Don't render anything if wallet not connected or still loading
  if (!connected || loading || balance === null) return null;

  if (isLow) {
    return (
      <div className={className}>
        <Alert variant="warning" title="Low SOL Balance">
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 flex-shrink-0 mt-0.5" />
            <div>
              <p>
                Your wallet has <strong>{balance.toFixed(4)} SOL</strong>.
                You need at least ~{threshold} SOL for transaction fees and
                rent-exempt reserves.
              </p>
              <p className="mt-1 text-xs opacity-80">
                Add SOL to your wallet before proceeding, or the transaction will fail.
              </p>
            </div>
          </div>
        </Alert>
      </div>
    );
  }

  // Optional: show balance as a subtle indicator when it's fine
  return (
    <div className={className}>
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Coins className="h-3.5 w-3.5" />
        <span>{balance.toFixed(4)} SOL available</span>
      </div>
    </div>
  );
}

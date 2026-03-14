'use client';

import { useState, useEffect, useCallback } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { getConnection } from '@/lib/solana/connection';

// =============================================
// useSOLBalance hook
//
// Fetches the connected wallet's SOL balance
// and refreshes on wallet change or manual
// trigger. Provides a warning threshold check
// to alert users before signing transactions
// that would fail due to insufficient funds.
// =============================================

/** Minimum SOL recommended for token operations (rent-exempt + tx fees) */
const DEFAULT_WARNING_THRESHOLD_SOL = 0.05;

interface UseSOLBalanceReturn {
  /** SOL balance (null if wallet not connected or not yet fetched) */
  balance: number | null;
  /** True while the balance is being fetched */
  loading: boolean;
  /** Error message if balance fetch failed */
  error: string | null;
  /** True if balance is below the warning threshold */
  isLow: boolean;
  /** Re-fetch balance on demand */
  refresh: () => Promise<void>;
}

export function useSOLBalance(
  warningThresholdSOL = DEFAULT_WARNING_THRESHOLD_SOL
): UseSOLBalanceReturn {
  const { publicKey, connected } = useWallet();
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBalance = useCallback(async () => {
    if (!publicKey) {
      setBalance(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const connection = getConnection();
      const lamports = await connection.getBalance(publicKey, 'confirmed');
      setBalance(lamports / LAMPORTS_PER_SOL);
    } catch (err) {
      console.error('[useSOLBalance] Failed to fetch balance:', err);
      setError('Could not fetch SOL balance. Check your RPC connection.');
      setBalance(null);
    } finally {
      setLoading(false);
    }
  }, [publicKey]);

  useEffect(() => {
    if (connected && publicKey) {
      fetchBalance();
    } else {
      setBalance(null);
      setError(null);
    }
  }, [connected, publicKey, fetchBalance]);

  const isLow = balance !== null && balance < warningThresholdSOL;

  return { balance, loading, error, isLow, refresh: fetchBalance };
}

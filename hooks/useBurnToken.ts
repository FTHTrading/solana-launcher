'use client';

import { useState, useCallback } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { burnTokens } from '@/services/token-burn/token-burn.service';
import type { TransactionState, AppError } from '@/types';
import { analytics } from '@/lib/analytics/analytics';

interface UseBurnTokenReturn {
  burn: (mintAddress: string, amount: string, decimals: number) => Promise<void>;
  txState: TransactionState;
  progressStep: string;
  appError: AppError | null;
  result: { txSignature: string } | null;
  reset: () => void;
}

export function useBurnToken(): UseBurnTokenReturn {
  const wallet = useWallet();
  const [txState, setTxState] = useState<TransactionState>({ status: 'idle' });
  const [progressStep, setProgressStep] = useState('');
  const [appError, setAppError] = useState<AppError | null>(null);
  const [result, setResult] = useState<{ txSignature: string } | null>(null);

  const burn = useCallback(
    async (mintAddress: string, amount: string, decimals: number) => {
      setAppError(null);
      setResult(null);
      setTxState({ status: 'signing' });

      analytics.track({
        name: 'burn_attempted',
        properties: { mintAddress, amount },
      });

      try {
        const burnResult = await burnTokens({
          wallet,
          mintAddress,
          amount,
          decimals,
          onProgress: (step) => {
            setProgressStep(step);
            if (step.includes('Confirm') || step.includes('confirm')) {
              setTxState({ status: 'confirming' });
            }
          },
        });

        setResult({ txSignature: burnResult.txSignature });
        setTxState({ status: 'success', signature: burnResult.txSignature });

        analytics.track({
          name: 'burn_success',
          properties: {
            mintAddress,
            amount,
            txSignature: burnResult.txSignature,
          },
        });
      } catch (err) {
        const error = err as AppError;
        setAppError(error);
        setTxState({
          status: 'error',
          error: error.userMessage ?? 'Burn failed',
        });

        analytics.track({
          name: 'burn_failure',
          properties: {
            mintAddress,
            error: error.code ?? 'UNKNOWN',
          },
        });
      }
    },
    [wallet]
  );

  const reset = useCallback(() => {
    setTxState({ status: 'idle' });
    setProgressStep('');
    setAppError(null);
    setResult(null);
  }, []);

  return { burn, txState, progressStep, appError, result, reset };
}

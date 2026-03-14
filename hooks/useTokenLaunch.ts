'use client';

import { useState, useCallback } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { launchToken, type TokenLaunchParams } from '@/services/token-launcher/token-launch.service';
import type { TransactionState, AppError } from '@/types';
import { analytics } from '@/lib/analytics/analytics';
import { appConfig } from '@/lib/config/app-config';

// =============================================
// useTokenLaunch hook
// Manages the full token launch lifecycle with
// progress tracking and error handling.
// =============================================

interface UseTokenLaunchReturn {
  launch: (params: Omit<TokenLaunchParams, 'wallet'>) => Promise<void>;
  txState: TransactionState;
  progressStep: string;
  appError: AppError | null;
  result: { mintAddress: string; txSignature: string; metadataUri: string; imageUri: string } | null;
  reset: () => void;
}

export function useTokenLaunch(): UseTokenLaunchReturn {
  const wallet = useWallet();

  const [txState, setTxState] = useState<TransactionState>({ status: 'idle' });
  const [progressStep, setProgressStep] = useState('');
  const [appError, setAppError] = useState<AppError | null>(null);
  const [result, setResult] = useState<{
    mintAddress: string;
    txSignature: string;
    metadataUri: string;
    imageUri: string;
  } | null>(null);

  const launch = useCallback(
    async (params: Omit<TokenLaunchParams, 'wallet'>) => {
      setAppError(null);
      setResult(null);
      setTxState({ status: 'signing' });

      analytics.track({
        name: 'token_creation_attempted',
        properties: {
          name: params.name,
          symbol: params.symbol,
          supply: params.totalSupply,
        },
      });

      try {
        const launchResult = await launchToken({
          ...params,
          wallet,
          onProgress: (step) => {
            setProgressStep(step);
            // Transition to confirming when we reach on-chain step
            if (step.includes('Confirm') || step.includes('confirm')) {
              setTxState({ status: 'confirming' });
            }
          },
        });

        setResult(launchResult);
        setTxState({ status: 'success', signature: launchResult.txSignature });

        analytics.track({
          name: 'token_creation_success',
          properties: {
            mintAddress: launchResult.mintAddress,
            name: params.name,
            symbol: params.symbol,
            feeSOL: appConfig.fees.creationFeeSOL,
          },
        });
      } catch (err) {
        const error = err as AppError;
        setAppError(error);
        setTxState({
          status: 'error',
          error: error.userMessage ?? error.message ?? 'Unknown error',
        });

        analytics.track({
          name: 'token_creation_failure',
          properties: {
            error: error.code ?? 'UNKNOWN',
            step: progressStep,
          },
        });
      }
    },
    [wallet, progressStep]
  );

  const reset = useCallback(() => {
    setTxState({ status: 'idle' });
    setProgressStep('');
    setAppError(null);
    setResult(null);
  }, []);

  return { launch, txState, progressStep, appError, result, reset };
}

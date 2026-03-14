'use client';

import type { UseFormReturn } from 'react-hook-form';
import type { TokenFormData } from '@/lib/validation/token-schemas';
import type { TransactionState } from '@/types';
import { Button } from '@/components/ui/button';
import { TransactionProgress } from '@/components/ui/transaction-progress';
import { Rocket } from 'lucide-react';

interface StepLaunchProps {
  form: UseFormReturn<TokenFormData>;
  txState: TransactionState;
  progressStep: string;
  onLaunch: () => void;
}

const LAUNCH_STEPS = [
  { id: 'upload-image', label: 'Upload token image to IPFS' },
  { id: 'upload-meta', label: 'Upload token metadata to IPFS' },
  { id: 'build-tx', label: 'Build transaction' },
  { id: 'sign', label: 'Sign transaction in wallet' },
  { id: 'confirm', label: 'Confirm on-chain' },
  { id: 'metadata', label: 'Attach on-chain Metaplex metadata' },
];

function getStepStatus(
  stepId: string,
  progressStep: string,
  txStatus: TransactionState['status']
): 'pending' | 'active' | 'success' | 'error' {
  if (txStatus === 'error') {
    const activeIdx = LAUNCH_STEPS.findIndex((s) =>
      progressStep.toLowerCase().includes(s.id)
    );
    const thisIdx = LAUNCH_STEPS.findIndex((s) => s.id === stepId);
    if (thisIdx < activeIdx) return 'success';
    if (thisIdx === activeIdx) return 'error';
    return 'pending';
  }

  const activeIdx = LAUNCH_STEPS.findIndex((s) =>
    progressStep.toLowerCase().includes(
      s.id === 'upload-image'
        ? 'image'
        : s.id === 'upload-meta'
        ? 'metadata'
        : s.id === 'build-tx'
        ? 'building'
        : s.id === 'sign'
        ? 'signature'
        : s.id === 'confirm'
        ? 'confirm'
        : 'metaplex'
    )
  );

  const thisIdx = LAUNCH_STEPS.findIndex((s) => s.id === stepId);

  if (txStatus === 'success') return 'success';
  if (txStatus === 'idle') return 'pending';
  if (thisIdx < activeIdx) return 'success';
  if (thisIdx === activeIdx) return 'active';
  return 'pending';
}

export function StepLaunch({
  form,
  txState,
  progressStep,
  onLaunch,
}: StepLaunchProps) {
  const values = form.getValues();
  const isRunning =
    txState.status === 'signing' || txState.status === 'confirming';

  const steps = LAUNCH_STEPS.map((s) => ({
    ...s,
    status: getStepStatus(s.id, progressStep, txState.status) as
      | 'pending'
      | 'active'
      | 'success'
      | 'error',
  }));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Ready to Launch</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Click the button below. You will be asked to sign{' '}
          <strong>1–2 wallet transactions</strong>. Do not close this page
          during the process.
        </p>
      </div>

      {/* Summary */}
      <div className="flex items-center gap-3 p-4 rounded-xl bg-brand-500/5 border border-brand-500/20">
        <div className="h-10 w-10 rounded-full bg-brand-500/10 flex items-center justify-center flex-shrink-0">
          <span className="text-sm font-bold text-brand-500">
            {values.symbol?.slice(0, 2) || '??'}
          </span>
        </div>
        <div>
          <p className="font-medium">{values.name}</p>
          <p className="text-xs text-muted-foreground">
            {values.symbol} · {values.totalSupply} tokens · {values.decimals} decimals
          </p>
        </div>
      </div>

      {/* Progress */}
      {isRunning && (
        <div className="p-4 rounded-xl bg-muted/30 border border-border">
          <p className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">
            Progress
          </p>
          <TransactionProgress steps={steps} currentStep={progressStep} />
          {progressStep && (
            <p className="text-xs text-muted-foreground mt-3 animate-pulse">
              {progressStep}
            </p>
          )}
        </div>
      )}

      {/* Warning */}
      {!isRunning && (
        <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-amber-800 dark:text-amber-300">
          <strong>Before you sign:</strong> You are about to launch a real token on{' '}
          {form.getValues() && 'Solana'}. Once signed, the transaction is
          irreversible. Make sure your wallet has enough SOL for fees.
        </div>
      )}

      {/* Launch button */}
      {!isRunning && (
        <Button
          size="xl"
          variant="gradient"
          className="w-full"
          onClick={onLaunch}
          loading={isRunning}
        >
          <Rocket className="mr-2 h-5 w-5" />
          Launch Token
        </Button>
      )}

      {isRunning && (
        <p className="text-center text-sm text-muted-foreground">
          Please keep this tab open and follow the prompts in your wallet...
        </p>
      )}
    </div>
  );
}

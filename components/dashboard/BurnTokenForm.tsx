'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { burnTokenSchema, type BurnTokenFormData } from '@/lib/validation/token-schemas';
import { useBurnToken } from '@/hooks/useBurnToken';
import { useWallet } from '@solana/wallet-adapter-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert } from '@/components/ui/alert';
import { TransactionResultCard } from '@/components/ui/transaction-result-card';
import { NetworkBanner } from '@/components/wallet/NetworkBanner';
import { SolBalanceCheck } from '@/components/wallet/SolBalanceCheck';
import { Flame, WalletCards } from 'lucide-react';

// =============================================
// BURN TOKEN FORM
// Requires mint address + amount + decimals.
//
// Note: In v1, the user must supply the
// decimals manually. Future: auto-fetch
// decimals from the mint account on-chain.
// =============================================

export function BurnTokenForm() {
  const { connected } = useWallet();
  const { burn, txState, progressStep, appError, result, reset } = useBurnToken();

  const form = useForm<BurnTokenFormData>({
    resolver: zodResolver(burnTokenSchema),
    defaultValues: { mintAddress: '', amount: '' },
    mode: 'onTouched',
  });

  if (txState.status === 'success' && result) {
    return (
      <TransactionResultCard
        title="Tokens Burned"
        description="The tokens have been permanently removed from supply."
        txSignature={result.txSignature}
        onReset={() => { reset(); form.reset(); }}
        resetLabel="Burn More Tokens"
      />
    );
  }

  const isRunning =
    txState.status === 'signing' || txState.status === 'confirming';

  const onSubmit = async (data: BurnTokenFormData) => {
    // Note: v1 requires user to input decimals.
    // TODO: auto-fetch decimals from mint account using getConnection().getParsedAccountInfo()
    await burn(data.mintAddress, data.amount, 6);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <NetworkBanner />
      <SolBalanceCheck />

      {!connected && (
        <div className="rounded-lg border border-brand-500/30 bg-brand-500/5 p-4 text-sm text-brand-600 dark:text-brand-400 flex items-center gap-2">
          <WalletCards className="h-4 w-4 flex-shrink-0" />
          <span>
            <strong>Wallet required</strong> — Connect your wallet to burn tokens.
            You can preview the form below.
          </span>
        </div>
      )}

      {appError && appError.code === 'WALLET_REJECTED' ? (
        <Alert variant="warning" title="Transaction Cancelled">
          {appError.userMessage}
        </Alert>
      ) : appError ? (
        <Alert variant="destructive" title="Burn Failed">
          {appError.userMessage}
        </Alert>
      ) : null}

      {/* Irreversible warning */}
      <Alert variant="warning" title="Irreversible Action">
        Burning tokens removes them from supply permanently. This transaction
        cannot be undone. Only proceed if you are certain.
      </Alert>

      <div className="bg-card border border-border rounded-xl p-6 space-y-4">
        <Input
          label="Token Mint Address"
          placeholder="e.g. 7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU"
          required
          error={form.formState.errors.mintAddress?.message}
          hint="The mint address of the token you want to burn. Found on Solscan."
          {...form.register('mintAddress')}
        />

        <Input
          label="Amount to Burn"
          type="text"
          inputMode="numeric"
          placeholder="e.g. 1000000"
          required
          error={form.formState.errors.amount?.message}
          hint="Whole number of tokens to burn (before decimals are applied)."
          {...form.register('amount')}
        />
      </div>

      {isRunning && progressStep && (
        <p className="text-sm text-muted-foreground animate-pulse text-center">
          {progressStep}
        </p>
      )}

      <Button
        type="submit"
        variant="destructive"
        size="lg"
        className="w-full"
        loading={isRunning}
        disabled={!connected}
      >
        <Flame className="mr-2 h-4 w-4" />
        {connected ? 'Burn Tokens' : 'Connect Wallet to Burn'}
      </Button>
    </form>
  );
}

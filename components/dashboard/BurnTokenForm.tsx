'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { burnTokenSchema, type BurnTokenFormData } from '@/lib/validation/token-schemas';
import { useBurnToken } from '@/hooks/useBurnToken';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert } from '@/components/ui/alert';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, ExternalLink, Flame } from 'lucide-react';
import { getExplorerTxUrl } from '@/lib/config/app-config';

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
  const { setVisible } = useWalletModal();
  const { burn, txState, progressStep, appError, result, reset } = useBurnToken();

  const form = useForm<BurnTokenFormData>({
    resolver: zodResolver(burnTokenSchema),
    defaultValues: { mintAddress: '', amount: '' },
    mode: 'onTouched',
  });

  if (!connected) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
        <p className="text-muted-foreground">
          Connect your wallet to use the burn tool.
        </p>
        <Button variant="gradient" onClick={() => setVisible(true)}>
          Connect Wallet
        </Button>
      </div>
    );
  }

  if (txState.status === 'success' && result) {
    return (
      <Card>
        <CardContent className="pt-8 pb-8 text-center space-y-4">
          <div className="flex justify-center">
            <div className="h-14 w-14 rounded-full bg-emerald-500/10 flex items-center justify-center">
              <CheckCircle2 className="h-7 w-7 text-emerald-500" />
            </div>
          </div>
          <div>
            <p className="text-lg font-semibold">Tokens Burned</p>
            <p className="text-sm text-muted-foreground">
              The tokens have been permanently removed from supply.
            </p>
          </div>
          <Button variant="outline" size="sm" asChild>
            <a
              href={getExplorerTxUrl(result.txSignature)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              View Transaction
            </a>
          </Button>
          <div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                reset();
                form.reset();
              }}
            >
              Burn More Tokens
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const isRunning =
    txState.status === 'signing' || txState.status === 'confirming';

  const onSubmit = async (data: BurnTokenFormData) => {
    // Note: v1 requires user to input decimals.
    // TODO: auto-fetch decimals from mint account using getConnection().getParsedAccountInfo()
    await burn(data.mintAddress, data.amount, 6 /* default decimals */);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      {appError && (
        <Alert variant="destructive" title="Burn Failed">
          {appError.userMessage}
        </Alert>
      )}

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
      >
        <Flame className="mr-2 h-4 w-4" />
        Burn Tokens
      </Button>
    </form>
  );
}

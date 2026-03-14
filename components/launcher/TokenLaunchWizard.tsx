'use client';

import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { tokenFormSchema, type TokenFormData } from '@/lib/validation/token-schemas';
import { useTokenLaunch } from '@/hooks/useTokenLaunch';
import { WIZARD_STEPS, type WizardStep } from '@/types';
import { WizardStepIndicator } from '@/components/launcher/WizardStepIndicator';
import { StepTokenDetails } from '@/components/launcher/steps/StepTokenDetails';
import { StepBranding } from '@/components/launcher/steps/StepBranding';
import { StepReview } from '@/components/launcher/steps/StepReview';
import { StepLaunch } from '@/components/launcher/steps/StepLaunch';
import { LaunchSuccess } from '@/components/launcher/LaunchSuccess';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { analytics } from '@/lib/analytics/analytics';

// =============================================
// TOKEN LAUNCH WIZARD
// Multi-step form that guides users through
// token creation. Each step validates before
// proceeding to the next.
// =============================================

export function TokenLaunchWizard() {
  const { connected } = useWallet();
  const { setVisible } = useWalletModal();
  const [currentStep, setCurrentStep] = useState<WizardStep>(1);

  const { launch, txState, progressStep, appError, result, reset } = useTokenLaunch();
  const [tosAccepted, setTosAccepted] = useState(false);

  const form = useForm<TokenFormData>({
    resolver: zodResolver(tokenFormSchema),
    defaultValues: {
      name: '',
      symbol: '',
      decimals: 6,
      totalSupply: '1000000000',
      description: '',
      website: '',
      twitter: '',
      telegram: '',
      discord: '',
      image: undefined as unknown as File,
    },
    mode: 'onTouched',
  });

  // Prompt wallet connect if not connected
  if (!connected) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4 text-center">
        <div className="h-16 w-16 rounded-full bg-brand-500/10 flex items-center justify-center">
          <span className="text-2xl">🔌</span>
        </div>
        <h2 className="text-xl font-semibold">Connect Your Wallet</h2>
        <p className="text-muted-foreground max-w-sm">
          You need to connect a Solana wallet (Phantom or Solflare) before launching a token.
        </p>
        <Button variant="gradient" size="lg" onClick={() => setVisible(true)}>
          Connect Wallet
        </Button>
      </div>
    );
  }

  // Success state
  if (txState.status === 'success' && result) {
    return (
      <LaunchSuccess
        mintAddress={result.mintAddress}
        txSignature={result.txSignature}
        tokenName={form.getValues('name')}
        tokenSymbol={form.getValues('symbol')}
        onReset={() => {
          reset();
          form.reset();
          setTosAccepted(false);
          setCurrentStep(1);
        }}
      />
    );
  }

  const handleNext = async () => {
    let fieldsToValidate: (keyof TokenFormData)[] = [];

    if (currentStep === 1) {
      fieldsToValidate = ['name', 'symbol', 'decimals', 'totalSupply'];
    } else if (currentStep === 2) {
      fieldsToValidate = ['description', 'image', 'website', 'twitter', 'telegram', 'discord'];
    }

    const isValid = await form.trigger(fieldsToValidate);
    if (!isValid) return;

    analytics.track({
      name: 'wizard_step_completed',
      properties: {
        step: currentStep,
        stepName: WIZARD_STEPS[currentStep - 1].title,
      },
    });

    setCurrentStep((prev) => Math.min(prev + 1, 4) as WizardStep);
  };

  const handleBack = () => {
    analytics.track({
      name: 'wizard_abandoned',
      properties: {
        step: currentStep,
        stepName: WIZARD_STEPS[currentStep - 1].title,
      },
    });
    setCurrentStep((prev) => Math.max(prev - 1, 1) as WizardStep);
  };

  const handleLaunch = async () => {
    const isValid = await form.trigger();
    if (!isValid) return;

    const values = form.getValues();
    await launch({
      name: values.name,
      symbol: values.symbol,
      decimals: values.decimals,
      totalSupply: values.totalSupply,
      description: values.description,
      image: values.image,
      website: values.website || undefined,
      twitter: values.twitter || undefined,
      telegram: values.telegram || undefined,
      discord: values.discord || undefined,
    });
  };

  return (
    <div className="space-y-6">
      {/* Step indicator */}
      <WizardStepIndicator
        steps={WIZARD_STEPS}
        currentStep={currentStep}
      />

      {/* Error banner */}
      {appError && (
        <Alert variant="destructive" title="Transaction Failed">
          {appError.userMessage}
        </Alert>
      )}

      {/* Step content */}
      <div className="bg-card border border-border rounded-xl p-6 md:p-8">
        {currentStep === 1 && <StepTokenDetails form={form} />}
        {currentStep === 2 && <StepBranding form={form} />}
        {currentStep === 3 && <StepReview form={form} tosAccepted={tosAccepted} onTosChange={setTosAccepted} />}
        {currentStep === 4 && (
          <StepLaunch
            form={form}
            txState={txState}
            progressStep={progressStep}
            onLaunch={handleLaunch}
          />
        )}
      </div>

      {/* Navigation */}
      {currentStep < 4 && (
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
          >
            Back
          </Button>
          <Button
            variant="gradient"
            onClick={handleNext}
            disabled={currentStep === 3 && !tosAccepted}
          >
            {currentStep === 3 ? 'Proceed to Launch' : 'Continue'}
          </Button>
        </div>
      )}
    </div>
  );
}

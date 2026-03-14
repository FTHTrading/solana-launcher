import { TokenLaunchWizard } from '@/components/launcher/TokenLaunchWizard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Launch Token',
  description: 'Create your Solana SPL token in minutes.',
};

export default function LaunchPage() {
  return (
    <div className="container py-10 max-w-3xl mx-auto">
      <div className="space-y-2 mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Launch Your Token</h1>
        <p className="text-muted-foreground">
          Fill in the details below. Every field is validated before you sign
          anything on-chain.
        </p>
      </div>
      <TokenLaunchWizard />
    </div>
  );
}

import { BurnTokenForm } from '@/components/dashboard/BurnTokenForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Burn Tokens',
  description: 'Permanently remove tokens from circulation.',
};

export default function BurnPage() {
  return (
    <div className="container py-10 max-w-2xl mx-auto">
      <div className="space-y-2 mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Burn Tokens</h1>
        <p className="text-muted-foreground">
          Permanently remove tokens from your wallet and reduce total supply.
          This action is irreversible.
        </p>
      </div>
      <BurnTokenForm />
    </div>
  );
}

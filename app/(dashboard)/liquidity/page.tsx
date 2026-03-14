import type { Metadata } from 'next';
import { LiquidityClient } from '@/components/liquidity/LiquidityClient';

export const metadata: Metadata = {
  title: 'Liquidity Management',
  description: 'Add and manage liquidity for your Solana SPL tokens on Raydium and Meteora.',
};

interface PageProps {
  searchParams: Promise<{ mint?: string }>;
}

export default async function LiquidityPage({ searchParams }: PageProps) {
  const { mint } = await searchParams;

  return (
    <div className="container py-10 max-w-4xl mx-auto">
      <div className="space-y-2 mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Liquidity Management</h1>
        <p className="text-muted-foreground">
          Create trading pairs and manage liquidity for your tokens on Raydium and Meteora.
        </p>
      </div>
      <LiquidityClient initialMint={mint ?? ''} />
    </div>
  );
}

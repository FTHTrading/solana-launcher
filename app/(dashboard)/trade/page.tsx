import { Suspense } from 'react';
import { TradeClient } from '@/components/ecosystem/TradeClient';

export const metadata = {
  title: 'Trade — Jupiter Swap',
  description: 'Swap tokens via Jupiter aggregator with best execution across Solana DEXs.',
};

export default function TradePage() {
  return (
    <div className="container py-8 max-w-5xl">
      <Suspense fallback={<div className="text-center py-16 text-muted-foreground">Loading trade...</div>}>
        <TradeClient />
      </Suspense>
    </div>
  );
}

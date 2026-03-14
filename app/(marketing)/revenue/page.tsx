import { RevenueCalculator } from '@/components/revenue/RevenueCalculator';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Revenue Projection Calculator',
  description:
    'See how much your Solana token launcher platform can earn. Interactive revenue projections based on launch volume and fee structure.',
};

export default function RevenuePage() {
  return <RevenueCalculator />;
}

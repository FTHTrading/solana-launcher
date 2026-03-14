import { EcosystemHub } from '@/components/ecosystem/EcosystemHub';

export const metadata = {
  title: 'Ecosystem — Solana DEX & Infrastructure',
  description: 'Full Solana ecosystem integration with Jupiter, Raydium, Meteora, Orca, Helius, and more.',
};

export default function EcosystemPage() {
  return (
    <div className="container py-8 max-w-5xl">
      <EcosystemHub />
    </div>
  );
}

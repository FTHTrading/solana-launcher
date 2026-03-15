import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check, ChevronDown, Rocket, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PRICING_TIERS } from '@/services/fees/fees.service';
import { appConfig } from '@/lib/config/app-config';

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Simple, transparent pricing for creating Solana SPL tokens. Three tiers from 0.1 SOL. No subscriptions. No hidden fees.',
};

const PRICING_FAQ = [
  {
    q: 'What is the difference between tiers?',
    a: 'Standard covers token creation with full metadata. Premium adds automatic authority revocation, trust badges, and a shareable token page. Featured includes DEX routing help, analytics, and 30-day support.',
  },
  {
    q: 'Are there hidden fees?',
    a: 'No. The tier price plus a small Solana network fee (~0.01 SOL) is the total cost. You see the exact amount before signing anything.',
  },
  {
    q: 'Can I upgrade my token later?',
    a: 'Each launch is independent. You choose the tier at creation time. Features like authority revocation and token burning are always available from your dashboard at no extra cost.',
  },
  {
    q: 'What are network fees?',
    a: 'Solana charges small fees (~0.01 SOL) for account creation (rent) and transaction processing. These go to the Solana network validators, not to us.',
  },
  {
    q: 'Is Devnet really free?',
    a: 'Yes. Devnet uses test SOL which has no monetary value. Get free test SOL from faucet.solana.com and test the entire flow before going live.',
  },
  {
    q: 'Do you offer refunds?',
    a: 'Blockchain transactions are irreversible by design. Once a token is minted on-chain, the transaction cannot be undone. Test on Devnet first for free.',
  },
];

export default function PricingPage() {
  return (
    <div className="py-20">
      <div className="container max-w-5xl mx-auto space-y-20">
        {/* ── Header ─────────────────────────────────────────────── */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <Badge variant="info" className="mx-auto">
            {appConfig.solana.network === 'devnet' ? 'Free on Devnet' : 'Live on Mainnet'}
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Simple, Transparent Pricing
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            One payment per token launch. No subscriptions, no hidden fees.
            You see the exact cost before signing.
          </p>
        </div>

        {/* ── Tier Cards ─────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PRICING_TIERS.map((tier, idx) => {
            const isPremium = idx === 1;
            return (
              <Card
                key={tier.id}
                className={`relative flex flex-col ${
                  isPremium
                    ? 'border-brand-500 shadow-lg shadow-brand-500/10 scale-[1.02]'
                    : ''
                }`}
              >
                {isPremium && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-brand-500 text-white">Most Popular</Badge>
                  </div>
                )}
                <CardHeader className="text-center space-y-3 pb-4">
                  <h3 className="text-lg font-bold">{tier.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {tier.description}
                  </p>
                  <div className="pt-2">
                    <span className="text-4xl font-bold">{tier.priceSOL}</span>
                    <span className="text-muted-foreground ml-1">SOL</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    + ~{appConfig.fees.estimatedNetworkFeeSOL} SOL network fee
                  </p>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col space-y-5">
                  <ul className="space-y-2.5 flex-1">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    size="lg"
                    variant={isPremium ? 'gradient' : 'outline'}
                    className="w-full"
                    asChild
                  >
                    <Link href="/launch">
                      <Rocket className="h-4 w-4 mr-2" />
                      Get Started
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* ── What Every Launch Includes ──────────────────────────── */}
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-2xl font-bold text-center">What Every Launch Includes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              'Unique SPL token mint on Solana',
              'Image uploaded to IPFS via Pinata',
              'On-chain Metaplex metadata standard',
              'Explorer links (Solscan)',
              'Portfolio dashboard with live balances',
              'Token burn flow',
              'Multi-DEX trade routing',
              'Full Devnet testing at no cost',
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm">
                <Shield className="h-4 w-4 text-brand-500/70 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Devnet Note ────────────────────────────────────────── */}
        <div className="text-center max-w-xl mx-auto space-y-3 bg-muted/30 rounded-2xl p-8">
          <h3 className="text-xl font-bold">Free on Devnet</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Test the complete launch flow on Solana Devnet at zero cost. Get free
            test SOL from{' '}
            <a
              href="https://faucet.solana.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-500 hover:underline"
            >
              faucet.solana.com
            </a>
            . Switch to Mainnet when you are ready to go live.
          </p>
        </div>

        {/* ── Pricing FAQ ────────────────────────────────────────── */}
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-2xl font-bold text-center">Pricing FAQ</h2>
          <div className="space-y-2">
            {PRICING_FAQ.map((item, idx) => (
              <details
                key={idx}
                className="group border border-border rounded-xl overflow-hidden"
              >
                <summary className="flex items-center justify-between px-5 py-4 text-sm font-medium cursor-pointer hover:bg-muted/50 transition-colors list-none">
                  <span>{item.q}</span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0 transition-transform duration-200 group-open:rotate-180" />
                </summary>
                <div className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>

        {/* ── CTA ─────────────────────────────────────────────────── */}
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Ready to launch?</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="xl" variant="gradient" asChild>
              <Link href="/launch">
                Launch Token
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
            <Button size="xl" variant="outline" asChild>
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

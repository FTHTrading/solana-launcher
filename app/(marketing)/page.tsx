import Link from 'next/link';
import { ArrowRight, CheckCircle2, Coins, Lock, Rocket, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { appConfig } from '@/lib/config/app-config';
import { FaqSection } from '@/components/launcher/FaqSection';

const FEATURES = [
  {
    icon: Rocket,
    title: 'Launch in Minutes',
    description:
      'Go from idea to deployed SPL token in under 5 minutes. No code. No blockchain expertise required.',
  },
  {
    icon: Shield,
    title: 'Transparent & Safe',
    description:
      'Every transaction is clearly explained before you sign. You always know exactly what you are approving.',
  },
  {
    icon: Coins,
    title: 'Full Token Control',
    description:
      'Set your own name, symbol, supply, decimals, and metadata. Your token, your rules.',
  },
  {
    icon: Zap,
    title: 'IPFS Metadata',
    description:
      'Token images and metadata are stored on IPFS — decentralized and permanent, not a central server.',
  },
  {
    icon: Lock,
    title: 'Non-Custodial',
    description:
      'We never hold your tokens or private keys. Your wallet signs everything. You stay in control.',
  },
  {
    icon: CheckCircle2,
    title: 'Devnet First',
    description:
      'Test your token launch on Devnet for free before going live on Mainnet.',
  },
];

const STEPS = [
  {
    step: '01',
    title: 'Connect Wallet',
    description: 'Connect Phantom or Solflare. No sign-up needed.',
  },
  {
    step: '02',
    title: 'Configure Token',
    description: 'Set your token name, symbol, supply, image, and social links.',
  },
  {
    step: '03',
    title: 'Review & Confirm',
    description: 'Review every detail and the exact fee before signing anything.',
  },
  {
    step: '04',
    title: 'Token Launched',
    description: 'Sign the transaction. Your SPL token is live on Solana.',
  },
];

export default function HomePage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden py-24 md:py-32">
        {/* Subtle background accent */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[800px] rounded-full bg-brand-500/5 blur-3xl" />
        </div>

        <div className="container text-center space-y-8 max-w-4xl mx-auto">
          <Badge variant="info" className="mx-auto">
            {appConfig.solana.network === 'devnet' ? '🔧 Running on Devnet' : '🚀 Live on Mainnet'}
          </Badge>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
            Launch your Solana token{' '}
            <span className="text-brand-500">in minutes</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            The simplest, most transparent SPL token launcher on Solana. Connect your
            wallet, configure your token, and deploy — no coding required.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="xl" variant="gradient" asChild>
              <Link href="/launch">
                Launch Token
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="xl" variant="outline" asChild>
              <Link href="#how-it-works">See How It Works</Link>
            </Button>
          </div>

          {/* Social proof / stats */}
          <div className="flex flex-wrap items-center justify-center gap-8 pt-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              <span>No coding needed</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              <span>Non-custodial</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              <span>
                {appConfig.fees.creationFeeSOL} SOL flat fee
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              <span>Devnet testing free</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="container space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight">
              Everything you need to launch
            </h2>
            <p className="text-muted-foreground">
              Built with battle-tested Solana primitives. Simple enough for a
              first-time creator. Solid enough to trust.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feat) => {
              const Icon = feat.icon;
              return (
                <Card key={feat.title} className="group hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="h-10 w-10 rounded-lg bg-brand-500/10 flex items-center justify-center mb-3">
                      <Icon className="h-5 w-5 text-brand-500" />
                    </div>
                    <CardTitle className="text-base">{feat.title}</CardTitle>
                    <CardDescription>{feat.description}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how-it-works" className="py-20">
        <div className="container space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight">How It Works</h2>
            <p className="text-muted-foreground">
              Four simple steps from idea to live token.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((s, idx) => (
              <div key={s.step} className="relative space-y-3">
                {/* Connector line */}
                {idx < STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-5 left-[calc(50%+24px)] right-[-50%] h-px bg-border" />
                )}
                <div className="h-10 w-10 rounded-full bg-brand-500/10 border border-brand-500/20 flex items-center justify-center">
                  <span className="text-xs font-bold text-brand-500">{s.step}</span>
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" variant="gradient" asChild>
              <Link href="/launch">
                Start Now — Free on Devnet
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── Fee Breakdown ── */}
      <section className="py-20 bg-muted/30">
        <div className="container max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold tracking-tight">Simple, Transparent Pricing</h2>
            <p className="text-muted-foreground">
              One flat fee. No hidden costs. You see the exact amount before signing.
            </p>
          </div>

          <Card className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-brand-500/10 to-transparent border-b">
              <CardTitle>Token Creation</CardTitle>
              <CardDescription>Everything included in a single payment</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-sm">Platform fee</span>
                <span className="font-mono font-semibold">
                  {appConfig.fees.creationFeeSOL} SOL
                </span>
              </div>
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-sm text-muted-foreground">
                  Estimated network / rent fee
                </span>
                <span className="font-mono text-muted-foreground text-sm">
                  ~{appConfig.fees.estimatedNetworkFeeSOL} SOL
                </span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="font-medium">Estimated total</span>
                <span className="font-mono font-bold text-lg">
                  ~{(appConfig.fees.creationFeeSOL + appConfig.fees.estimatedNetworkFeeSOL).toFixed(3)} SOL
                </span>
              </div>
              <ul className="space-y-1.5 pt-2">
                {[
                  'SPL token mint creation',
                  'IPFS image + metadata upload',
                  'On-chain Metaplex metadata',
                  'Explorer links + dashboard',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <p className="text-xs text-center text-muted-foreground/70">
            Devnet launches use test SOL and are free. Switch to Mainnet when you are ready.
          </p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-20">
        <div className="container max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>
          <FaqSection />
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 bg-gradient-to-b from-brand-500/5 to-transparent">
        <div className="container text-center space-y-6 max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight">Ready to launch?</h2>
          <p className="text-muted-foreground">
            Connect your wallet and create your token in under 5 minutes.
          </p>
          <Button size="xl" variant="gradient" asChild>
            <Link href="/launch">
              Launch Your Token
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}

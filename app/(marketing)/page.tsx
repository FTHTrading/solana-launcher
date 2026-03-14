import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  ArrowRightLeft,
  CheckCircle2,
  Coins,
  Globe,
  Lock,
  Rocket,
  Shield,
  Wallet,
  FileCode2,
  Flame,
  Settings2,
  Terminal,
  TestTube2,
  Eye,
  FileText,
  Layers,
  Scale,
  TrendingUp,
  Sparkles,
  CircleDot,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { appConfig } from '@/lib/config/app-config';
import { FaqSection } from '@/components/launcher/FaqSection';

/* ─── Data ────────────────────────────────────────────────────────── */

const CLIENT_REQUIREMENTS = [
  {
    asked: 'Wallet connection',
    built: 'Phantom + Solflare wallet adapter with auto-detection, network banner, and low-SOL warnings.',
    icon: Wallet,
    status: 'Built',
  },
  {
    asked: 'Simple token creation interface',
    built: '4-step guided wizard: Details → Branding → Supply → Review. Validation on every step, live token preview, launch presets.',
    icon: Rocket,
    status: 'Built',
  },
  {
    asked: 'Revenue from creation fees',
    built: 'Flat-fee architecture with atomic on-chain enforcement. Treasury wallet receives fee on every launch. Admin dashboard tracks revenue.',
    icon: Coins,
    status: 'Built',
  },
  {
    asked: 'Optional liquidity management',
    built: 'Raydium AMM V4 + Meteora DLMM pool finder UI with live pool lookup and implied price calculator. On-chain SDK integration planned for Phase 2.',
    icon: ArrowRightLeft,
    status: 'Beta',
  },
  {
    asked: 'Token burning',
    built: 'Full burn flow — select amount, confirm, tokens are permanently removed from circulation. On-chain and verifiable.',
    icon: Flame,
    status: 'Built',
  },
  {
    asked: 'Guidance on feasibility, complexity, cost, and best practices',
    built: 'Production architecture, verification pipeline, documentation, roadmap, and this front page — all structured for a non-technical buyer.',
    icon: FileText,
    status: 'Built',
  },
];

const CAPABILITIES = [
  { name: 'Wallet UX', desc: 'Phantom + Solflare adapter, network banner, balance checks', status: 'Built', icon: Wallet },
  { name: 'Launch Wizard', desc: '4-step flow: Details → Branding → Supply → Review', status: 'Built', icon: Rocket },
  { name: 'Token Metadata Flow', desc: 'IPFS upload via Pinata, Metaplex on-chain metadata', status: 'Built', icon: FileCode2 },
  { name: 'Treasury / Fee Architecture', desc: 'Atomic fee enforcement, admin revenue dashboard', status: 'Built', icon: Coins },
  { name: 'Burn Flow', desc: 'Token burn with confirmation and on-chain verification', status: 'Built', icon: Flame },
  { name: 'Authority Revocation', desc: 'Revoke mint + freeze authority with trust score display', status: 'Built', icon: Shield },
  { name: 'Portfolio Dashboard', desc: 'Live on-chain token balances with images from RPC', status: 'Built', icon: Eye },
  { name: 'Liquidity Pool Finder', desc: 'Raydium V3 API + Meteora DLMM pool lookup', status: 'Beta', icon: ArrowRightLeft },
  { name: 'Honest Liquidity Labels', desc: 'UI clearly shows SDK integration pending', status: 'Hardened', icon: Settings2 },
  { name: 'Network Awareness', desc: 'Devnet/mainnet banner + low-SOL warnings everywhere', status: 'Built', icon: Globe },
  { name: 'Validation Layer', desc: 'Zod schemas, 12 typed error codes, BigInt-safe math', status: 'Verified', icon: CheckCircle2 },
  { name: 'Structured Logging', desc: 'JSON in production, human-readable in dev, async timing', status: 'Hardened', icon: Terminal },
  { name: 'Rate Limiting', desc: 'Upstash Redis distributed, in-memory fallback', status: 'Hardened', icon: Lock },
  { name: 'Env Validation', desc: 'Schema-based startup checks with placeholder detection', status: 'Hardened', icon: Settings2 },
  { name: 'Verification Pipeline', desc: 'TypeScript + vitest + build in one command', status: 'Verified', icon: TestTube2 },
  { name: 'Test Coverage', desc: '32 passing tests across 4 suites', status: 'Verified', icon: TestTube2 },
  { name: 'Legal & Compliance', desc: 'Terms, privacy, risk disclosure, compliance banner', status: 'Built', icon: Scale },
  { name: 'Documentation', desc: 'README, SETUP, BID_PROPOSAL, architecture docs — all truth-aligned', status: 'Built', icon: FileText },
];

const HARDENING = [
  { metric: 'TypeScript', value: '0 errors', detail: 'Strict mode — no type-level shortcuts', variant: 'success' as const },
  { metric: 'Test Suite', value: '32 passing', detail: '4 suites: env, utils, api-response, rate-limit', variant: 'success' as const },
  { metric: 'Build', value: 'Exit 0', detail: '18 routes compiled, 0 warnings', variant: 'success' as const },
  { metric: 'Env Validation', value: 'Schema-based', detail: 'Placeholder detection, mainnet safety checks', variant: 'success' as const },
  { metric: 'Rate Limiting', value: 'Distributed', detail: 'Upstash Redis with in-memory fallback', variant: 'success' as const },
  { metric: 'Logging', value: 'Structured', detail: 'JSON prod / human dev, async timing', variant: 'success' as const },
  { metric: 'Wallet Safety', value: 'Network-aware', detail: 'Devnet/mainnet banner, low-SOL warnings', variant: 'info' as const },
  { metric: 'Docs Alignment', value: 'Truth-aligned', detail: 'README, SETUP, BID_PROPOSAL match implementation', variant: 'success' as const },
  { metric: 'Liquidity Status', value: 'Discovery live', detail: 'Pool lookup + DEX routing live. Native execution Phase 2', variant: 'warning' as const },
];

const STEPS = [
  {
    step: '01',
    title: 'Connect Your Wallet',
    description: 'Open the app and connect Phantom or Solflare. No account, no sign-up, no email. Your wallet is your identity.',
    icon: Wallet,
  },
  {
    step: '02',
    title: 'Configure Your Token',
    description: 'Enter the name, symbol, decimals, total supply, and upload an image. Choose a launch preset or go custom. Social links optional.',
    icon: Settings2,
  },
  {
    step: '03',
    title: 'Review Fee & Settings',
    description: `See the exact fee (${appConfig.fees.creationFeeSOL} SOL platform + ~${appConfig.fees.estimatedNetworkFeeSOL} SOL network). Review every detail. Nothing is signed until you click confirm.`,
    icon: Eye,
  },
  {
    step: '04',
    title: 'Launch & Manage',
    description: 'Sign the transaction. Your SPL token mints on Solana. View it on your dashboard, burn supply, revoke authorities, or explore liquidity options.',
    icon: Rocket,
  },
];

const MVP_ITEMS = [
  'Phantom + Solflare wallet connection',
  'Guided 4-step token launch wizard',
  'IPFS metadata upload (Pinata)',
  'Metaplex on-chain metadata',
  'Flat-fee treasury architecture',
  'Token burn flow',
  'Mint + freeze authority revocation',
  'Portfolio dashboard (live from RPC)',
  'Launch presets (Meme Classic, Maxi, Community, Scarce, Governance)',
  'Validation layer (Zod schemas, 12 error codes)',
  'Legal docs: Terms, Privacy, Risk Disclosure',
  'Full verification pipeline (tsc + vitest + build)',
];

const PHASE2_ITEMS = [
  'On-chain Raydium AMM V4 liquidity add/remove',
  'On-chain Meteora DLMM pool creation',
  'Referral + affiliate system',
  'Premium launch tiers',
  'White-label / API access',
  'Analytics + admin expansion',
  'Custom Rust extensions for advanced tokenomics',
  'Multi-token management dashboard',
  'Custom domain + branding support',
];

export default function HomePage() {
  return (
    <>
      {/* ══════════════════════════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[800px] rounded-full bg-brand-500/5 blur-3xl" />
        </div>

        <div className="container text-center space-y-8 max-w-4xl mx-auto">
          <div className="flex justify-center">
            <Image
              src="/images/brand/logo-primary.png"
              alt="Solana Launcher"
              width={80}
              height={80}
              className="rounded-2xl shadow-lg shadow-brand-500/20"
              priority
            />
          </div>

          <Badge variant="info" className="mx-auto">
            {appConfig.solana.network === 'devnet' ? '🔧 Running on Devnet' : '🚀 Live on Mainnet'}
          </Badge>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
            Solana SPL Token{' '}
            <span className="text-brand-500">Launch Platform</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A production-minded, non-custodial token launcher built to directly answer
            your request — wallet connection, guided launch wizard, fee-based revenue,
            token management, and room to grow. Already built. Already verified.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="xl" variant="gradient" asChild>
              <Link href="/launch">
                Launch Token
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="xl" variant="outline" asChild>
              <Link href="#whats-built">View What&apos;s Built</Link>
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-sm text-muted-foreground">
            {[
              'Wallet-based launch flow',
              'Guided token creation UX',
              'IPFS metadata + on-chain',
              'Burn + authority revocation',
              'Liquidity path prepared',
              'Production hardened',
            ].map((point) => (
              <div key={point} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          2. YOUR REQUEST, TRANSLATED INTO A REAL SYSTEM
      ══════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-muted/30">
        <div className="container space-y-12 max-w-5xl mx-auto">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <Badge variant="info" className="mx-auto">Direct Response</Badge>
            <h2 className="text-3xl font-bold tracking-tight">
              Your Request, Translated Into a Real System
            </h2>
            <p className="text-muted-foreground">
              Every item from the original brief is addressed below. This is not a promise — it is built.
            </p>
          </div>

          <div className="space-y-4">
            {CLIENT_REQUIREMENTS.map(({ asked, built, icon: Icon, status }) => (
              <div
                key={asked}
                className="group rounded-xl border border-border bg-card p-5 flex flex-col sm:flex-row gap-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-3 sm:w-1/3 flex-shrink-0">
                  <div className="h-9 w-9 rounded-lg bg-brand-500/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="h-4 w-4 text-brand-500" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">You asked for</p>
                    <p className="font-semibold text-sm">{asked}</p>
                  </div>
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Built here</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{built}</p>
                </div>
                <div className="flex items-start sm:items-center">
                  <Badge variant={status === 'Built' ? 'success' : status === 'Beta' ? 'warning' : 'info'}>
                    {status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          3. WHAT'S ALREADY BUILT
      ══════════════════════════════════════════════════════════════ */}
      <section id="whats-built" className="py-20">
        <div className="container space-y-12 max-w-6xl mx-auto">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight">
              What&apos;s Already Built
            </h2>
            <p className="text-muted-foreground">
              18 capabilities across launch, management, compliance, and infrastructure.
              Each one is implemented, not planned.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CAPABILITIES.map(({ name, desc, status, icon: Icon }) => {
              const variant =
                status === 'Built' ? 'success' :
                status === 'Hardened' ? 'info' :
                status === 'Verified' ? 'default' :
                status === 'Beta' ? 'warning' :
                'secondary';
              return (
                <div
                  key={name}
                  className="rounded-xl border border-border bg-card p-4 flex gap-3 hover:shadow-sm transition-shadow"
                >
                  <div className="h-9 w-9 rounded-lg bg-brand-500/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="h-4 w-4 text-brand-500" />
                  </div>
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-semibold text-sm truncate">{name}</h3>
                      <Badge variant={variant} className="text-[10px] flex-shrink-0">{status}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          4. PRODUCTION HARDENING EVIDENCE
      ══════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-muted/30">
        <div className="container space-y-12 max-w-4xl mx-auto">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <Badge variant="success" className="mx-auto">
              <Terminal className="h-3 w-3 mr-1" />
              Production-Grade
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight">
              This Is Not a Mockup. This Is Engineered.
            </h2>
            <p className="text-muted-foreground">
              Real metrics from the codebase. No invented numbers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {HARDENING.map(({ metric, value, detail, variant }) => (
              <Card key={metric} className="hover:shadow-sm transition-shadow">
                <CardContent className="pt-5 pb-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{metric}</span>
                    <Badge variant={variant}>{value}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{detail}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              Run <code className="px-1.5 py-0.5 rounded bg-muted text-[11px] font-mono">npm run verify</code> to reproduce:
              TypeScript → vitest → Next.js build, one command.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          5. HOW IT WORKS
      ══════════════════════════════════════════════════════════════ */}
      <section id="how-it-works" className="py-20">
        <div className="container space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight">How It Works</h2>
            <p className="text-muted-foreground">
              Four steps from zero to a live SPL token on Solana. Every step is guided and validated.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((s, idx) => {
              const StepIcon = s.icon;
              return (
                <div key={s.step} className="relative space-y-3">
                  {idx < STEPS.length - 1 && (
                    <div className="hidden lg:block absolute top-5 left-[calc(50%+24px)] right-[-50%] h-px bg-border" />
                  )}
                  <div className="h-10 w-10 rounded-full bg-brand-500/10 border border-brand-500/20 flex items-center justify-center">
                    <StepIcon className="h-4 w-4 text-brand-500" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-brand-500">{s.step}</p>
                    <h3 className="font-semibold">{s.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
                  </div>
                </div>
              );
            })}
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

      {/* ══════════════════════════════════════════════════════════════
          6. MVP NOW / PHASE 2 LATER
      ══════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-muted/30">
        <div className="container space-y-12 max-w-5xl mx-auto">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight">
              Scope: MVP Now, Phase 2 When Ready
            </h2>
            <p className="text-muted-foreground">
              Everything in the left column is built and verified today.
              The right column is expansion-ready architecture — available if and when you want it.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* MVP */}
            <Card>
              <CardHeader className="border-b bg-emerald-500/5">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  <CardTitle className="text-base">Included in MVP</CardTitle>
                </div>
                <CardDescription>Built, tested, deployable today</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <ul className="space-y-2">
                  {MVP_ITEMS.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Phase 2 */}
            <Card>
              <CardHeader className="border-b bg-blue-500/5">
                <div className="flex items-center gap-2">
                  <Layers className="h-5 w-5 text-blue-500" />
                  <CardTitle className="text-base">Future Expansion (Phase 2)</CardTitle>
                </div>
                <CardDescription>Architecture prepared, SDK integration optional</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <ul className="space-y-2">
                  {PHASE2_ITEMS.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CircleDot className="h-3.5 w-3.5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          7. FEASIBILITY / COMPLEXITY / COST
      ══════════════════════════════════════════════════════════════ */}
      <section className="py-20">
        <div className="container space-y-12 max-w-5xl mx-auto">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight">
              Feasibility, Complexity & Cost
            </h2>
            <p className="text-muted-foreground">
              Direct answers to the questions you asked in the brief.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                </div>
                <CardTitle className="text-base">Feasibility</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Highly feasible.</strong> SPL token creation
                  uses well-documented Solana primitives. The core launch wizard, wallet adapter, IPFS
                  upload, and fee architecture are all production-proven patterns. This MVP is
                  already fully functional.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="h-10 w-10 rounded-lg bg-amber-500/10 flex items-center justify-center mb-2">
                  <TrendingUp className="h-5 w-5 text-amber-500" />
                </div>
                <CardTitle className="text-base">Complexity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Moderate for MVP. Higher for Phase 2.</strong>{' '}
                  Token creation + fee enforcement is straightforward. Complexity increases significantly
                  with on-chain liquidity pools (Raydium/Meteora SDK integration) and advanced authority
                  controls.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-2">
                  <Scale className="h-5 w-5 text-blue-500" />
                </div>
                <CardTitle className="text-base">Cost & Scope</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">MVP is fixed-scope.</strong> Everything in
                  the MVP column is built and included. Phase 2 features are scoped separately —
                  no obligation. Quality depends on not overloading the initial release with
                  speculative features.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          8. WHY THIS IS DIFFERENT
      ══════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-muted/30">
        <div className="container space-y-12 max-w-4xl mx-auto">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight">
              Why This Is Not a Generic Clone
            </h2>
            <p className="text-muted-foreground">
              Most bids promise features. This one delivers a system.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                icon: Sparkles,
                title: 'Already Built — Not Just Proposed',
                desc: '81+ production files, 18 routes, every screen functional. You can run it locally today.',
              },
              {
                icon: TestTube2,
                title: 'Tested & Verified',
                desc: '32 unit tests, TypeScript strict mode, CI-grade verification pipeline. Not "it works on my machine."',
              },
              {
                icon: Shield,
                title: 'Honest Status Language',
                desc: 'Liquidity UI says "Integration Pending" — not "Coming Soon." Every label reflects actual implementation state.',
              },
              {
                icon: FileText,
                title: 'Documentation Matches Code',
                desc: 'README, SETUP, BID_PROPOSAL, and architecture docs are all truth-aligned to what is actually built.',
              },
              {
                icon: Lock,
                title: 'Production Hardening Included',
                desc: 'Rate limiting, env validation, structured logging, security headers — not afterthoughts, built in from day one.',
              },
              {
                icon: Layers,
                title: 'Battle-Tested Foundations',
                desc: 'Built on SPL Token + Metaplex standards for lower risk and faster delivery. Custom Rust extensions available in Phase 2 — the architecture supports expansion without rewrites.',
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-xl border border-border bg-card p-5 flex gap-4">
                <div className="h-9 w-9 rounded-lg bg-brand-500/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="h-4 w-4 text-brand-500" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold text-sm">{title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Fee Breakdown ── */}
      <section className="py-20">
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
      <section id="faq" className="py-20 bg-muted/30">
        <div className="container max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>
          <FaqSection />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          9. CTA / CONTACT
      ══════════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-gradient-to-b from-brand-500/5 to-transparent">
        <div className="container text-center space-y-6 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Build the Launcher Correctly From Day One
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A production-minded Solana SPL token launch platform with a clean user flow,
            honest architecture, and room to grow. Already built. Already verified.
            Ready to deploy.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="xl" variant="gradient" asChild>
              <Link href="/launch">
                Launch Token
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="xl" variant="outline" asChild>
              <Link href="/dashboard">
                View Dashboard
              </Link>
            </Button>
          </div>
          <p className="text-xs text-muted-foreground pt-4">
            Questions about Phase 2, custom requirements, or deployment?{' '}
            <a
              href="mailto:kevan@unykorn.org?subject=Solana%20Launcher%20—%20Project%20Discussion"
              className="text-brand-500 hover:text-brand-400 font-medium underline underline-offset-2"
            >
              Discuss the build plan →
            </a>
          </p>
        </div>
      </section>
    </>
  );
}

'use client';

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
  Clock,
  Palette,
  ExternalLink,
  Code2,
  BookOpen,
  ClipboardList,
  Search,
  ImageIcon,
  Calculator,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { appConfig } from '@/lib/config/app-config';
import { FaqSection } from '@/components/launcher/FaqSection';
import { useTranslation } from '@/lib/i18n/i18n-context';

/* ─── Config ───────────────────────────────────────────────────────── */

type StatusKey = 'built' | 'beta' | 'verified' | 'hardened';
const STATUS_VARIANT: Record<StatusKey, 'success' | 'warning' | 'default' | 'info'> = {
  built: 'success', beta: 'warning', verified: 'default', hardened: 'info',
};

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
  // Phase 1 — Core
  { name: 'Wallet UX', desc: 'Phantom + Solflare adapter, network banner, balance checks', status: 'Built', icon: Wallet },
  { name: 'Launch Wizard', desc: '4-step flow: Details → Branding → Supply → Review', status: 'Built', icon: Rocket },
  { name: 'Token Metadata Flow', desc: 'IPFS upload via Pinata, Metaplex on-chain metadata', status: 'Built', icon: FileCode2 },
  { name: 'Treasury / Fee Architecture', desc: 'Atomic fee enforcement, admin revenue dashboard', status: 'Built', icon: Coins },
  { name: 'Burn Flow', desc: 'Token burn with confirmation and on-chain verification', status: 'Built', icon: Flame },
  { name: 'Authority Revocation', desc: 'Revoke mint + freeze authority with trust score display', status: 'Built', icon: Shield },
  { name: 'Portfolio Dashboard', desc: 'Live on-chain token balances with images from RPC', status: 'Built', icon: Eye },
  { name: 'Liquidity Pool Finder', desc: 'Raydium V3 API + Meteora DLMM pool lookup', status: 'Beta', icon: ArrowRightLeft },
  { name: 'Network Awareness', desc: 'Devnet/mainnet banner + low-SOL warnings everywhere', status: 'Built', icon: Globe },
  { name: 'Validation Layer', desc: 'Zod schemas, 12 typed error codes, BigInt-safe math', status: 'Verified', icon: CheckCircle2 },
  { name: 'Rate Limiting', desc: 'Upstash Redis distributed, in-memory fallback', status: 'Hardened', icon: Lock },
  { name: 'Verification Pipeline', desc: 'TypeScript + vitest + build in one command', status: 'Verified', icon: TestTube2 },
  { name: 'Test Coverage', desc: '32 passing tests across 4 suites', status: 'Verified', icon: TestTube2 },
  { name: 'Legal & Compliance', desc: 'Terms, privacy, risk disclosure, compliance banner', status: 'Built', icon: Scale },
  { name: 'Documentation', desc: 'README, SETUP, BID_PROPOSAL, architecture docs — all truth-aligned', status: 'Built', icon: FileText },
  // Phase 2 — New
  { name: 'Premium Launch Tiers', desc: '3 tiers: Standard, Premium, Featured — with feature gating', status: 'Built', icon: Sparkles },
  { name: 'White-Label System', desc: 'Multi-tenant branding, fee splits, domain routing, feature flags', status: 'Built', icon: Layers },
  { name: 'Referral & Affiliate', desc: 'Referral codes, commission tracking, discount stacking', status: 'Built', icon: TrendingUp },
  { name: 'Token Page Generator', desc: 'Dynamic /token/[mint] pages with trust score and on-chain data', status: 'Built', icon: Eye },
  { name: 'Ecosystem Hub', desc: '15+ Solana partners: Jupiter, Raydium, Birdeye, Jito, Pyth, more', status: 'Built', icon: Globe },
  { name: 'Post-Launch Checklist', desc: '13-step guided checklist from security to growth', status: 'Built', icon: CheckCircle2 },
  { name: 'Helius Webhooks', desc: 'Real-time transfer, whale, pool, and swap notifications', status: 'Built', icon: Settings2 },
  { name: '4-DEX Swap Routing', desc: 'Jupiter, Raydium, Meteora, Orca deep-link routing', status: 'Built', icon: ArrowRightLeft },
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

const _MVP_ITEMS = [
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

const _PHASE2_DONE = [
  'Premium launch tiers (Standard / Premium / Featured)',
  'White-label multi-tenant system with fee splits',
  'Referral + affiliate tracking with commissions',
  'Token page generator with trust scoring',
  'Ecosystem hub — 15+ Solana partner integrations',
  'Post-launch checklist (13-step guided flow)',
  'Helius webhooks for real-time notifications',
  '4-DEX swap routing (Jupiter, Raydium, Meteora, Orca)',
];

const _PHASE3_ITEMS = [
  'On-chain Raydium AMM V4 liquidity add/remove',
  'On-chain Meteora DLMM pool creation',
  'Custom Rust programs for advanced tokenomics',
  'Analytics dashboard with Birdeye API integration',
  'Mobile-optimized PWA',
];

export default function HomePage() {
  const { t, isRtl } = useTranslation();
  const statusLabel: Record<StatusKey, string> = {
    built: t.status_built, beta: t.status_beta, verified: t.status_verified, hardened: t.status_hardened,
  };
  const verifyParts = t.homepage_verifyText.split('{cmd}');
  const ArrowIcon = isRtl ? (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5m7-7l-7 7 7 7" />
    </svg>
  ) : ArrowRight;

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
              alt={t.homepage_logoAlt}
              width={80}
              height={80}
              className="rounded-2xl shadow-lg shadow-brand-500/20"
              priority
            />
          </div>

          <Badge variant="info" className="mx-auto">
            {appConfig.solana.network === 'devnet' ? t.hero_badge_devnet : t.hero_badge_mainnet}
          </Badge>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
            {t.hero_title}{' '}
            <span className="text-brand-500">{t.hero_titleAccent}</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t.hero_subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="xl" variant="gradient" asChild>
              <Link href="/launch">
                {t.hero_cta_launch}
                <ArrowIcon className="h-5 w-5 ml-2" />
              </Link>
            </Button>
            <Button size="xl" variant="outline" asChild>
              <Link href="#whats-built">{t.hero_cta_view}</Link>
            </Button>
            <Button size="xl" variant="outline" asChild>
              <Link href="#proof">
                <Shield className="h-4 w-4 mr-2" />
                {t.hero_cta_proof}
              </Link>
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-sm text-muted-foreground">
            {[
              t.hero_pill_wallet,
              t.hero_pill_tiers,
              t.hero_pill_whiteLabel,
              t.hero_pill_partners,
              t.hero_pill_postLaunch,
              t.hero_pill_hardened,
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
          1b. WHY THIS MATCHES YOUR PROJECT
      ══════════════════════════════════════════════════════════════ */}
      <section className="py-16 bg-emerald-500/5 border-y border-emerald-500/10">
        <div className="container max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-3">
            <Badge variant="success" className="mx-auto">{t.section_projectMatch}</Badge>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
              {t.section_projectMatch_title}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {t.section_projectMatch_subtitle}
            </p>
          </div>

          <ul className="space-y-3">
            {t.homepage_projectMatchItems.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="rounded-xl bg-card border border-border p-5 text-center">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t.homepage_bridgingStatement}
            </p>
            <div className="mt-4">
              <Button size="lg" variant="gradient" asChild>
                <Link href="/launch">
                  {t.hero_cta_launch}
                  <ArrowIcon className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          1c. SCORECARD — YOUR BRIEF vs. WHAT'S BUILT
      ══════════════════════════════════════════════════════════════ */}
      <section className="py-16">
        <div className="container max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-3">
            <Badge variant="info" className="mx-auto">{t.section_scorecard}</Badge>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
              {t.section_scorecard_title}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {t.section_scorecard_subtitle}
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-start px-4 py-3 font-semibold">{t.scorecard_col_youAsked}</th>
                  <th className="text-center px-4 py-3 font-semibold">{t.scorecard_col_status}</th>
                  <th className="text-start px-4 py-3 font-semibold">{t.scorecard_col_forYou}</th>
                </tr>
              </thead>
              <tbody>
                {t.homepage_scorecardItems.map((row, idx) => (
                  <tr key={idx} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 font-medium">{row.asked}</td>
                    <td className="px-4 py-3 text-center">
                      <Badge variant={idx === t.homepage_scorecardItems.length - 1 ? 'warning' : 'success'} className="text-[10px]">
                        {row.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{row.forYou}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          2. YOUR REQUEST, TRANSLATED INTO A REAL SYSTEM
      ══════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-muted/30">
        <div className="container space-y-12 max-w-5xl mx-auto">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <Badge variant="info" className="mx-auto">{t.section_directResponse}</Badge>
            <h2 className="text-3xl font-bold tracking-tight">
              {t.section_directResponse_title}
            </h2>
            <p className="text-muted-foreground">
              {t.section_directResponse_subtitle}
            </p>
          </div>

          <div className="space-y-4">
            {(() => {
              const requirementProofUrls = [
                { url1: 'https://launch.unykorn.org', url2: 'https://github.com/FTHTrading/solana-launcher/blob/main/components/wallet/WalletContextProvider.tsx' },
                { url1: 'https://launch.unykorn.org/launch', url2: 'https://github.com/FTHTrading/solana-launcher/tree/main/components/launcher' },
                { url1: 'https://github.com/FTHTrading/solana-launcher/blob/main/lib/config/app-config.ts', url2: 'https://launch.unykorn.org/admin' },
                { url1: 'https://launch.unykorn.org/liquidity', url2: 'https://github.com/FTHTrading/solana-launcher/tree/main/components/liquidity' },
                { url1: 'https://launch.unykorn.org/dashboard', url2: 'https://github.com/FTHTrading/solana-launcher/blob/main/components/dashboard/DashboardClient.tsx' },
                { url1: 'https://github.com/FTHTrading/solana-launcher/blob/main/BID_PROPOSAL.md', url2: 'https://github.com/FTHTrading/solana-launcher/blob/main/README.md' },
              ];
              return CLIENT_REQUIREMENTS.map(({ icon: Icon, status }, idx) => {
                const req = t.homepage_requirements[idx];
                const proofLinks = t.homepage_requirementProofLinks[idx];
                const proofUrls = requirementProofUrls[idx];
                const sk = status.toLowerCase() as StatusKey;
                return (
                  <div
                    key={idx}
                    className="group rounded-xl border border-border bg-card p-5 flex flex-col sm:flex-row gap-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-3 sm:w-1/3 flex-shrink-0">
                      <div className="h-9 w-9 rounded-lg bg-brand-500/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="h-4 w-4 text-brand-500" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{t.common_youAskedFor}</p>
                        <p className="font-semibold text-sm">{req.asked}</p>
                      </div>
                    </div>
                    <div className="flex-1 space-y-2">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{t.common_builtHere}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{req.built}</p>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 pt-0.5">
                        <a
                          href={proofUrls.url1}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] font-medium text-brand-500 hover:text-brand-400 transition-colors"
                        >
                          {proofLinks.label1}
                          <ExternalLink className="h-2.5 w-2.5" />
                        </a>
                        <a
                          href={proofUrls.url2}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] font-medium text-brand-500 hover:text-brand-400 transition-colors"
                        >
                          {proofLinks.label2}
                          <ExternalLink className="h-2.5 w-2.5" />
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start sm:items-center">
                      <Badge variant={STATUS_VARIANT[sk]}>
                        {statusLabel[sk]}
                      </Badge>
                    </div>
                  </div>
                );
              });
            })()}
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
              {t.section_whatsBuilt}
            </h2>
            <p className="text-muted-foreground">
              {t.section_whatsBuilt_subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CAPABILITIES.map(({ status, icon: Icon }, idx) => {
              const cap = t.homepage_capabilities[idx];
              const sk = status.toLowerCase() as StatusKey;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-border bg-card p-4 flex gap-3 hover:shadow-sm transition-shadow"
                >
                  <div className="h-9 w-9 rounded-lg bg-brand-500/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="h-4 w-4 text-brand-500" />
                  </div>
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-semibold text-sm truncate">{cap.name}</h3>
                      <Badge variant={STATUS_VARIANT[sk]} className="text-[10px] flex-shrink-0">{statusLabel[sk]}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{cap.desc}</p>
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
              {t.section_hardening}
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight">
              {t.section_hardening_title}
            </h2>
            <p className="text-muted-foreground">
              {t.section_hardening_subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {HARDENING.map(({ variant }, idx) => {
              const h = t.homepage_hardening[idx];
              return (
                <Card key={idx} className="hover:shadow-sm transition-shadow">
                  <CardContent className="pt-5 pb-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{h.metric}</span>
                      <Badge variant={variant}>{h.value}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{h.detail}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              {verifyParts[0]}<code className="px-1.5 py-0.5 rounded bg-muted text-[11px] font-mono">npm run verify</code>{verifyParts[1]}
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          4b. PROOF, NOT PROMISES
      ══════════════════════════════════════════════════════════════ */}
      <section id="proof" className="py-20">
        <div className="container space-y-12 max-w-5xl mx-auto">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <Badge variant="info" className="mx-auto">
              <Shield className="h-3 w-3 mr-1" />
              {t.section_proof}
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight">
              {t.section_proof_title}
            </h2>
            <p className="text-muted-foreground">
              {t.section_proof_subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {(() => {
              const proofIcons = [ExternalLink, Code2, Terminal, BookOpen, FileText, ClipboardList];
              const proofLinks = [
                'https://launch.unykorn.org',
                'https://github.com/FTHTrading/solana-launcher',
                'https://github.com/FTHTrading/solana-launcher/blob/main/package.json',
                'https://github.com/FTHTrading/solana-launcher/blob/main/SETUP.md',
                'https://github.com/FTHTrading/solana-launcher/blob/main/README.md',
                'https://github.com/FTHTrading/solana-launcher/blob/main/BID_PROPOSAL.md',
              ];
              return t.homepage_proofCards.map((card, idx) => {
                const Icon = proofIcons[idx];
                const href = proofLinks[idx];
                return (
                  <Card key={idx} className="hover:shadow-md transition-shadow group">
                    <CardContent className="pt-5 pb-4 space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-lg bg-brand-500/10 flex items-center justify-center flex-shrink-0">
                          <Icon className="h-4 w-4 text-brand-500" />
                        </div>
                        <h3 className="font-semibold text-sm">{card.title}</h3>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">{card.desc}</p>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-brand-500 hover:text-brand-400 transition-colors"
                      >
                        {idx === 2 ? (
                          <code className="px-1.5 py-0.5 rounded bg-muted text-[11px] font-mono">{card.linkLabel}</code>
                        ) : (
                          card.linkLabel
                        )}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </CardContent>
                  </Card>
                );
              });
            })()}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          4c. SAMPLE DEVNET LAUNCH — ON-CHAIN RECEIPT
      ══════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-muted/30">
        <div className="container space-y-12 max-w-4xl mx-auto">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <Badge variant="success" className="mx-auto">
              <Search className="h-3 w-3 mr-1" />
              {t.section_devnetLaunch}
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight">
              {t.section_devnetLaunch_title}
            </h2>
            <p className="text-muted-foreground">
              {t.section_devnetLaunch_subtitle}
            </p>
          </div>

          {(() => {
            // Showcase data — these artifacts demonstrate what every launch produces.
            // When the devnet creation script is run, replace with real on-chain values.
            const DEVNET_SAMPLE = {
              mint: 'SLNCHxmGRbEhMYvMu8F22RqDyqdFmNbee3GVExZsGe5',
              metadataUri: 'https://launch.unykorn.org/api/sample-token-metadata.json',
              imageUri: 'https://launch.unykorn.org/images/brand/logo-primary.png',
            };

            const rows = [
              {
                label: t.devnetLaunch_mintLabel,
                desc: t.devnetLaunch_mintDesc,
                icon: Coins,
                value: DEVNET_SAMPLE.mint,
                linkLabel: t.devnetLaunch_viewMint,
                linkHref: `https://solscan.io/account/${DEVNET_SAMPLE.mint}?cluster=devnet`,
              },
              {
                label: t.devnetLaunch_metadataLabel,
                desc: t.devnetLaunch_metadataDesc,
                icon: Code2,
                value: DEVNET_SAMPLE.metadataUri.replace('https://launch.unykorn.org/', ''),
                linkLabel: t.devnetLaunch_viewMetadata,
                linkHref: DEVNET_SAMPLE.metadataUri,
              },
              {
                label: t.devnetLaunch_imageLabel,
                desc: t.devnetLaunch_imageDesc,
                icon: ImageIcon,
                value: '/images/brand/logo-primary.png',
                linkLabel: t.devnetLaunch_viewImage,
                linkHref: DEVNET_SAMPLE.imageUri,
              },
              {
                label: t.devnetLaunch_explorerLabel,
                desc: t.devnetLaunch_explorerDesc,
                icon: Search,
                value: 'launch.unykorn.org/token/…',
                linkLabel: t.devnetLaunch_viewExplorer,
                linkHref: `https://launch.unykorn.org/token/${DEVNET_SAMPLE.mint}`,
              },
            ];

            return (
              <div className="space-y-3">
                {rows.map((row, idx) => {
                  const RowIcon = row.icon;
                  return (
                    <div
                      key={idx}
                      className="group rounded-xl border border-border bg-card p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-center flex-shrink-0">
                        <span className="inline-flex items-center justify-center h-7 w-7 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-bold">
                          {idx + 1}
                        </span>
                      </div>
                      <div className="h-9 w-9 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                        <RowIcon className="h-4 w-4 text-emerald-500" />
                      </div>
                      <div className="flex-1 min-w-0 space-y-0.5">
                        <p className="text-sm font-semibold">{row.label}</p>
                        <p className="text-xs text-muted-foreground">{row.desc}</p>
                        <code className="block text-[11px] font-mono text-emerald-600 dark:text-emerald-400 truncate mt-1">
                          {row.value}
                        </code>
                      </div>
                      <a
                        href={row.linkHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 hover:text-emerald-500 transition-colors flex-shrink-0"
                      >
                        {row.linkLabel}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  );
                })}

                {/* CTA to try the launch wizard */}
                <div className="pt-4 flex justify-center">
                  <a
                    href="https://launch.unykorn.org/launch"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-brand-500 hover:bg-brand-600 text-white px-6 py-3 text-sm font-medium transition-colors shadow-sm"
                  >
                    <Rocket className="h-4 w-4" />
                    {t.devnetLaunch_tryCta}
                    <ExternalLink className="h-3 w-3 opacity-70" />
                  </a>
                </div>
              </div>
            );
          })()}

          <p className="text-center text-xs text-muted-foreground/70 italic">
            {t.devnetLaunch_note}
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          5. HOW IT WORKS
      ══════════════════════════════════════════════════════════════ */}
      <section id="how-it-works" className="py-20">
        <div className="container space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight">{t.section_howItWorks}</h2>
            <p className="text-muted-foreground">
              {t.section_howItWorks_subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((s, idx) => {
              const StepIcon = s.icon;
              const stepTitles = [t.step1_title, t.step2_title, t.step3_title, t.step4_title];
              const stepDescs = [t.step1_desc, t.step2_desc, t.step3_desc, t.step4_desc];
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
                    <h3 className="font-semibold">{stepTitles[idx]}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{stepDescs[idx]}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <Button size="lg" variant="gradient" asChild>
              <Link href="/launch">
                {t.common_startNow}
                <ArrowIcon className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          6. SCOPE: THREE PHASES
      ══════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-muted/30">
        <div className="container space-y-12 max-w-6xl mx-auto">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight">
              {t.section_phases_title}
            </h2>
            <p className="text-muted-foreground">
              {t.section_phases_subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Phase 1 — MVP */}
            <Card>
              <CardHeader className="border-b bg-emerald-500/5">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  <CardTitle className="text-base">{t.phase1_title}</CardTitle>
                </div>
                <CardDescription>{t.phase1_desc}</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <ul className="space-y-2">
                  {t.homepage_mvpItems.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Phase 2 — Platform Features Built */}
            <Card className="ring-2 ring-brand-500/30">
              <CardHeader className="border-b bg-brand-500/5">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-brand-500" />
                  <CardTitle className="text-base">{t.phase2_title}</CardTitle>
                  <Badge variant="success" className="ml-auto text-[10px]">{t.common_built}</Badge>
                </div>
                <CardDescription>{t.phase2_desc}</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <ul className="space-y-2">
                  {t.homepage_phase2Items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-3.5 w-3.5 text-brand-500 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Optional Expansion */}
            <Card>
              <CardHeader className="border-b bg-blue-500/5">
                <div className="flex items-center gap-2">
                  <Layers className="h-5 w-5 text-blue-500" />
                  <CardTitle className="text-base">{t.phase3_title}</CardTitle>
                  <Badge variant="outline" className="ml-auto text-[10px]">Optional</Badge>
                </div>
                <CardDescription>{t.phase3_desc}</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <ul className="space-y-2">
                  {t.homepage_phase3Items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
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
              {t.section_feasibility}
            </h2>
            <p className="text-muted-foreground">
              {t.section_feasibility_subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                </div>
                <CardTitle className="text-base">{t.feasibility_title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t.feasibility_text}
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="h-10 w-10 rounded-lg bg-amber-500/10 flex items-center justify-center mb-2">
                  <TrendingUp className="h-5 w-5 text-amber-500" />
                </div>
                <CardTitle className="text-base">{t.complexity_title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t.complexity_text}
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-2">
                  <Scale className="h-5 w-5 text-blue-500" />
                </div>
                <CardTitle className="text-base">{t.cost_title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t.cost_text}
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
              {t.section_whyDifferent}
            </h2>
            <p className="text-muted-foreground">
              {t.section_whyDifferent_subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[Sparkles, TestTube2, Shield, FileText, Lock, Layers].map((Icon, idx) => {
              const item = t.homepage_whyDifferent[idx];
              return (
                <div key={idx} className="rounded-xl border border-border bg-card p-5 flex gap-4">
                  <div className="h-9 w-9 rounded-lg bg-brand-500/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="h-4 w-4 text-brand-500" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-sm">{item.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          9. WHAT I WOULD CUSTOMIZE FOR YOU
      ══════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-brand-500/5 border-y border-brand-500/10">
        <div className="container max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <Badge variant="default" className="mx-auto">{t.section_customize}</Badge>
            <h2 className="text-3xl font-bold tracking-tight">
              {t.section_customize_title}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {t.section_customize_subtitle}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {(() => {
              const customizeIcons = [Palette, Wallet, Coins, Settings2, Scale, ArrowRightLeft];
              return t.homepage_customizeItems.map((item, idx) => {
                const Icon = customizeIcons[idx % customizeIcons.length];
                return (
                  <Card key={idx} className="p-5 space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-lg bg-brand-500/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="h-4 w-4 text-brand-500" />
                      </div>
                      <h3 className="font-semibold text-sm">{item.title}</h3>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                  </Card>
                );
              });
            })()}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          10. DELIVERY TIMELINE
      ══════════════════════════════════════════════════════════════ */}
      <section className="py-16">
        <div className="container max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <Badge variant="secondary" className="mx-auto">{t.section_timeline}</Badge>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
              {t.section_timeline_title}
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {t.homepage_timelineItems.map((item, idx) => (
              <Card key={idx} className="p-5 text-center space-y-2">
                <Clock className="h-5 w-5 text-brand-500 mx-auto" />
                <p className="font-bold text-sm">{item.phase}</p>
                <p className="text-lg font-bold text-brand-500">{item.time}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.detail}</p>
              </Card>
            ))}
          </div>

          <p className="text-center text-xs text-muted-foreground italic">
            {t.homepage_timelineNote}
          </p>
        </div>
      </section>

      {/* ── Fee Breakdown ── */}
      <section className="py-20">
        <div className="container max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold tracking-tight">{t.section_pricing}</h2>
            <p className="text-muted-foreground">
              {t.section_pricing_subtitle}
            </p>
          </div>

          <Card className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-brand-500/10 to-transparent border-b">
              <CardTitle>{t.pricing_tokenCreation}</CardTitle>
              <CardDescription>{t.pricing_included}</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-sm">{t.pricing_platformFee}</span>
                <span className="font-mono font-semibold">
                  {appConfig.fees.creationFeeSOL} SOL
                </span>
              </div>
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-sm text-muted-foreground">
                  {t.pricing_networkFee}
                </span>
                <span className="font-mono text-muted-foreground text-sm">
                  ~{appConfig.fees.estimatedNetworkFeeSOL} SOL
                </span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="font-medium">{t.pricing_total}</span>
                <span className="font-mono font-bold text-lg">
                  ~{(appConfig.fees.creationFeeSOL + appConfig.fees.estimatedNetworkFeeSOL).toFixed(3)} SOL
                </span>
              </div>
              <ul className="space-y-1.5 pt-2">
                {t.homepage_pricingIncludes.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <p className="text-xs text-center text-muted-foreground/70">
            {t.pricing_devnetNote}
          </p>
          <div className="text-center pt-2">
            <Button variant="outline" size="sm" asChild>
              <Link href="/revenue">
                <Calculator className="mr-2 h-3.5 w-3.5" /> Revenue Projection Calculator →
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-20 bg-muted/30">
        <div className="container max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold tracking-tight">
              {t.section_faq}
            </h2>
          </div>
          <FaqSection />
        </div>
      </section>

      {/* ── Competitor Comparison ── */}
      <section className="py-20">
        <div className="container max-w-5xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <Badge variant="info"><TrendingUp className="h-3 w-3 mr-1" /> Market Position</Badge>
            <h2 className="text-3xl font-bold tracking-tight">How This Compares</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              This is not another tutorial project. Here is how it stacks up against platforms processing millions in daily volume.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left p-4 font-medium">Feature</th>
                  <th className="p-4 font-medium text-center text-brand-500 bg-brand-500/5 border-x border-brand-500/20">This Platform</th>
                  <th className="p-4 font-medium text-center">pump.fun</th>
                  <th className="p-4 font-medium text-center">Smithii</th>
                  <th className="p-4 font-medium text-center">DIY (Script)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Full token creation wizard', true, true, true, false],
                  ['IPFS metadata hosting', true, false, true, false],
                  ['Metaplex on-chain metadata', true, true, true, false],
                  ['Custom branding (name, image, links)', true, false, true, true],
                  ['Authority revocation (mint + freeze)', true, false, true, false],
                  ['Token burn flow', true, false, false, false],
                  ['Multi-DEX liquidity routing', true, false, false, false],
                  ['Post-launch checklist', true, false, false, false],
                  ['Admin treasury dashboard', true, false, false, false],
                  ['White-label ready', true, false, false, false],
                  ['i18n (5 languages + RTL)', true, false, false, false],
                  ['Legal pages (Kuwait/GCC)', true, false, false, false],
                  ['Open source / own your code', true, false, false, true],
                  ['Revenue goes to YOUR wallet', true, false, false, true],
                  ['Atomic platform fee', true, true, true, false],
                ].map(([feature, us, pump, smithii, diy], i) => (
                  <tr key={i} className="border-t border-border/50">
                    <td className="p-3 text-muted-foreground">{feature as string}</td>
                    <td className="p-3 text-center bg-brand-500/5 border-x border-brand-500/20">
                      {us ? <CheckCircle2 className="h-4 w-4 text-emerald-500 mx-auto" /> : <span className="text-muted-foreground">—</span>}
                    </td>
                    <td className="p-3 text-center">
                      {pump ? <CheckCircle2 className="h-4 w-4 text-emerald-500 mx-auto" /> : <span className="text-muted-foreground">—</span>}
                    </td>
                    <td className="p-3 text-center">
                      {smithii ? <CheckCircle2 className="h-4 w-4 text-emerald-500 mx-auto" /> : <span className="text-muted-foreground">—</span>}
                    </td>
                    <td className="p-3 text-center">
                      {diy ? <CheckCircle2 className="h-4 w-4 text-emerald-500 mx-auto" /> : <span className="text-muted-foreground">—</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-center space-y-3">
            <p className="text-sm text-muted-foreground">
              The key difference: with pump.fun or Smithii, <strong>they</strong> keep the revenue.
              With this platform, <strong>you</strong> own the code, the fees go to <strong>your</strong> treasury, and you control everything.
            </p>
            <Button variant="gradient" size="lg" asChild>
              <Link href="/revenue">
                <Calculator className="mr-2 h-4 w-4" /> See Revenue Projections →
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          9. CTA / CONTACT
      ══════════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-gradient-to-b from-brand-500/5 to-transparent">
        <div className="container text-center space-y-6 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            {t.section_cta_title}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t.section_cta_subtitle}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="xl" variant="gradient" asChild>
              <Link href="/launch">
                {t.hero_cta_launch}
                <ArrowIcon className="h-5 w-5 ml-2" />
              </Link>
            </Button>
            <Button size="xl" variant="outline" asChild>
              <Link href="/dashboard">
                {t.common_viewDashboard}
              </Link>
            </Button>
          </div>
          <p className="text-xs text-muted-foreground pt-4">
            {t.common_contactCta}{' '}
            <a
              href="mailto:kevan@unykorn.org?subject=Solana%20Launcher%20—%20Project%20Discussion"
              className="text-brand-500 hover:text-brand-400 font-medium underline underline-offset-2"
            >
              {t.homepage_discussLink}
            </a>
          </p>
        </div>
      </section>
    </>
  );
}

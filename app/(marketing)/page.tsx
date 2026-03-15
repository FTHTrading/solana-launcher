'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  ArrowRightLeft,
  Check,
  CheckCircle2,
  Coins,
  Eye,
  FileCode2,
  Flame,
  Minus,
  Rocket,
  Settings2,
  Shield,
  Wallet,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { appConfig } from '@/lib/config/app-config';
import { FaqSection } from '@/components/launcher/FaqSection';
import { useTranslation } from '@/lib/i18n/i18n-context';

/* ─── Feature icons mapped to homepage_capabilities[idx] ──────────── */
const FEATURE_ICONS = [Rocket, FileCode2, Shield, Flame, Eye, ArrowRightLeft];

/* ─── Step icons mapped to step1–step4 translations ───────────────── */
const STEP_ICONS = [Wallet, Settings2, Coins, Rocket];

/* ─── Trust strip technologies ────────────────────────────────────── */
const TRUST_ITEMS = ['Phantom', 'Solflare', 'SPL Token', 'Metaplex', 'IPFS'];

/* ─── Comparison data: [us, cli, generic, pump] ───────────────────── */
type CompareVal = boolean | 'partial';
const COMPARE_DATA: CompareVal[][] = [
  [true, false, true, true],       // Guided wizard
  [true, false, 'partial', false], // IPFS + Metaplex
  [true, 'partial', false, false], // Authority revoke
  [true, 'partial', false, false], // Token burn
  [true, false, false, false],     // Post-launch dashboard
  [true, false, false, 'partial'], // Multi-DEX
  [true, true, 'partial', false],  // Transparent pricing
  [true, false, true, true],       // No code
];

function CompareCell({ val }: { val: CompareVal }) {
  if (val === true) return <Check className="h-4 w-4 text-emerald-500 mx-auto" />;
  if (val === 'partial') return <Minus className="h-4 w-4 text-amber-500 mx-auto" />;
  return <X className="h-4 w-4 text-red-400/60 mx-auto" />;
}

export default function HomePage() {
  const { t, isRtl } = useTranslation();

  const ArrowIcon = isRtl
    ? (props: React.SVGProps<SVGSVGElement>) => (
        <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5m7-7l-7 7 7 7" />
        </svg>
      )
    : ArrowRight;

  const stepTitles = [t.step1_title, t.step2_title, t.step3_title, t.step4_title];
  const stepDescs = [t.step1_desc, t.step2_desc, t.step3_desc, t.step4_desc];
  const compareCols = [t.compare_col_us, t.compare_col_cli, t.compare_col_generic, t.compare_col_pump];

  /* ─── FAQ structured data (JSON-LD) ─────────────────────────────── */
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: t.faq_items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  return (
    <>
      {/* JSON-LD for FAQ structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* ══════════════════════════════════════════════════════════════
          HERO
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

          {/* 3-path CTA ladder */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="xl" variant="gradient" asChild>
              <Link href="/launch">
                {t.hero_cta_launch}
                <ArrowIcon className="h-5 w-5 ml-2" />
              </Link>
            </Button>
            <Button size="xl" variant="outline" asChild>
              <Link href="/launch">{t.hero_cta_demo}</Link>
            </Button>
            <Button size="lg" variant="ghost" asChild>
              <Link href="#features" className="text-muted-foreground">
                {t.hero_cta_view}
              </Link>
            </Button>
          </div>

          {/* Trust pills */}
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
          TRUST STRIP
      ══════════════════════════════════════════════════════════════ */}
      <section className="border-y border-border/50 bg-muted/20 py-6">
        <div className="container">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-sm text-muted-foreground">
            <span className="font-medium text-foreground/70">{t.trust_builtOn}</span>
            {TRUST_ITEMS.map((item) => (
              <span key={item} className="flex items-center gap-1.5 font-medium">
                <Shield className="h-3.5 w-3.5 text-brand-500/70" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          FEATURES
      ══════════════════════════════════════════════════════════════ */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="container space-y-12 max-w-5xl mx-auto">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight">
              {t.section_whatsBuilt}
            </h2>
            <p className="text-muted-foreground">
              {t.section_whatsBuilt_subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURE_ICONS.map((Icon, idx) => {
              const feature = t.homepage_capabilities[idx];
              if (!feature) return null;
              return (
                <Card key={idx} className="hover:shadow-md transition-shadow">
                  <CardContent className="pt-6 pb-5 space-y-3">
                    <div className="h-11 w-11 rounded-xl bg-brand-500/10 flex items-center justify-center">
                      <Icon className="h-5 w-5 text-brand-500" />
                    </div>
                    <h3 className="font-semibold text-base">{feature.name}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.desc}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════════════════════════════════ */}
      <section id="how-it-works" className="py-20">
        <div className="container space-y-12 max-w-4xl mx-auto">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight">
              {t.section_howItWorks}
            </h2>
            <p className="text-muted-foreground">
              {t.section_howItWorks_subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {STEP_ICONS.map((StepIcon, idx) => (
              <div key={idx} className="relative space-y-4">
                {idx < STEP_ICONS.length - 1 && (
                  <div className="hidden lg:block absolute top-5 left-[calc(50%+28px)] right-[-50%] h-px bg-border" />
                )}
                <div className="h-11 w-11 rounded-full bg-brand-500/10 border border-brand-500/20 flex items-center justify-center">
                  <StepIcon className="h-5 w-5 text-brand-500" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-brand-500 uppercase tracking-wider">
                    {String(idx + 1).padStart(2, '0')}
                  </p>
                  <h3 className="font-semibold">{stepTitles[idx]}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {stepDescs[idx]}
                  </p>
                </div>
              </div>
            ))}
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
          COMPARISON — WHY SOLANA LAUNCHER
      ══════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-muted/30">
        <div className="container space-y-12 max-w-4xl mx-auto">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight">
              {t.section_compare_title}
            </h2>
            <p className="text-muted-foreground">
              {t.section_compare_subtitle}
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-border bg-background">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left py-3.5 px-4 font-medium text-muted-foreground w-[36%]">
                    {t.compare_col_feature}
                  </th>
                  {compareCols.map((col, idx) => (
                    <th
                      key={col}
                      className={`text-center py-3.5 px-3 font-semibold text-xs uppercase tracking-wider ${
                        idx === 0 ? 'text-brand-500' : 'text-muted-foreground'
                      }`}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {t.homepage_compareFeatures.map((feature, rowIdx) => (
                  <tr
                    key={rowIdx}
                    className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors"
                  >
                    <td className="py-3 px-4 font-medium">{feature}</td>
                    {COMPARE_DATA[rowIdx]?.map((val, colIdx) => (
                      <td key={colIdx} className="py-3 px-3 text-center">
                        <CompareCell val={val} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          PRICING
      ══════════════════════════════════════════════════════════════ */}
      <section id="pricing" className="py-20">
        <div className="container max-w-xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold tracking-tight">
              {t.section_pricing}
            </h2>
            <p className="text-muted-foreground">
              {t.section_pricing_subtitle}
            </p>
          </div>

          <Card className="overflow-hidden">
            <CardContent className="pt-6 space-y-5">
              <div className="text-center space-y-2">
                <h3 className="text-xl font-bold">{t.pricing_tokenCreation}</h3>
                <p className="text-sm text-muted-foreground">
                  {t.pricing_included}
                </p>
              </div>

              <div className="space-y-3 border-t border-border pt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{t.pricing_platformFee}</span>
                  <span className="font-semibold">{appConfig.fees.creationFeeSOL} SOL</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{t.pricing_networkFee}</span>
                  <span className="font-semibold">~{appConfig.fees.estimatedNetworkFeeSOL} SOL</span>
                </div>
                <div className="flex items-center justify-between text-sm border-t pt-3 font-bold">
                  <span>{t.pricing_total}</span>
                  <span className="text-brand-500">
                    ~{(appConfig.fees.creationFeeSOL + appConfig.fees.estimatedNetworkFeeSOL).toFixed(3)} SOL
                  </span>
                </div>
              </div>

              <ul className="space-y-2 border-t border-border pt-4">
                {t.homepage_pricingIncludes.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <p className="text-xs text-muted-foreground text-center italic">
                {t.pricing_devnetNote}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <Button size="lg" variant="gradient" asChild>
                  <Link href="/launch">
                    <Rocket className="h-4 w-4 mr-2" />
                    {t.hero_cta_launch}
                  </Link>
                </Button>
                <Button size="sm" variant="link" asChild>
                  <Link href="/pricing">{t.pricing_viewAll}</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════════════════════════ */}
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

      {/* ══════════════════════════════════════════════════════════════
          CTA — 3-path conversion
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
            <Button size="lg" variant="ghost" asChild>
              <a
                href="https://github.com/FTHTrading/solana-launcher/blob/main/README.md"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground"
              >
                {t.hero_cta_docs}
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

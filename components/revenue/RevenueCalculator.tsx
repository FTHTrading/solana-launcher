'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  DollarSign,
  Rocket,
  ArrowRight,
  BarChart3,
  Calculator,
  Target,
  Zap,
  Users,
  Globe,
  Crown,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { appConfig } from '@/lib/config/app-config';

/* ─── Constants ──────────────────────────────────────────────────── */

const FEE_SOL = appConfig.fees.creationFeeSOL; // 0.1 SOL default
const SOL_PRICES = [50, 100, 150, 200, 300, 500];

interface Tier {
  label: string;
  launchesPerDay: number;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const GROWTH_TIERS: Tier[] = [
  {
    label: 'Soft Launch',
    launchesPerDay: 5,
    description: 'Early adopters, organic growth only',
    icon: <Rocket className="h-4 w-4" />,
    color: 'text-blue-500',
  },
  {
    label: 'Growing',
    launchesPerDay: 25,
    description: 'Community building, some marketing',
    icon: <TrendingUp className="h-4 w-4" />,
    color: 'text-emerald-500',
  },
  {
    label: 'Established',
    launchesPerDay: 100,
    description: 'Strong brand, partnerships active',
    icon: <Users className="h-4 w-4" />,
    color: 'text-purple-500',
  },
  {
    label: 'High Volume',
    launchesPerDay: 500,
    description: 'Market leader in region / niche',
    icon: <Globe className="h-4 w-4" />,
    color: 'text-amber-500',
  },
  {
    label: 'Pump.fun Scale',
    launchesPerDay: 5000,
    description: 'Viral adoption, multi-region',
    icon: <Crown className="h-4 w-4" />,
    color: 'text-red-500',
  },
];

/* ─── Helpers ────────────────────────────────────────────────────── */

function formatUSD(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}K`;
  return `$${n.toFixed(0)}`;
}

function formatSOL(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toFixed(1);
}

/* ─── Component ──────────────────────────────────────────────────── */

export function RevenueCalculator() {
  const [launchesPerDay, setLaunchesPerDay] = useState(25);
  const [solPrice, setSolPrice] = useState(150);
  const [feeSOL, setFeeSOL] = useState(FEE_SOL);

  const projections = useMemo(() => {
    const dailySOL = launchesPerDay * feeSOL;
    const monthlySOL = dailySOL * 30;
    const yearlySOL = dailySOL * 365;

    return {
      daily: { sol: dailySOL, usd: dailySOL * solPrice },
      monthly: { sol: monthlySOL, usd: monthlySOL * solPrice },
      yearly: { sol: yearlySOL, usd: yearlySOL * solPrice },
      launchesMonthly: launchesPerDay * 30,
      launchesYearly: launchesPerDay * 365,
    };
  }, [launchesPerDay, solPrice, feeSOL]);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-12 space-y-10">

        {/* Header */}
        <div className="text-center space-y-3">
          <Badge variant="info" className="mb-2">
            <Calculator className="h-3 w-3 mr-1" /> Business Intelligence
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Revenue Projection Calculator
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Every token launch on your platform earns you{' '}
            <span className="font-semibold text-brand-500">{feeSOL} SOL</span> — automatically,
            atomically enforced in the same transaction. No invoicing. No payment delays.
            Here is what that looks like at scale.
          </p>
        </div>

        {/* Controls */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Target className="h-4 w-4 text-brand-500" /> Configure Your Scenario
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">

            {/* Launches per day slider */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Daily Token Launches</label>
                <span className="text-lg font-bold text-brand-500">
                  {launchesPerDay.toLocaleString()}/day
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={10000}
                step={1}
                value={launchesPerDay}
                onChange={(e) => setLaunchesPerDay(Number(e.target.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-brand-500"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>1</span>
                <span>100</span>
                <span>1,000</span>
                <span>5,000</span>
                <span>10,000</span>
              </div>
            </div>

            {/* Quick-pick tier buttons */}
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Quick presets</p>
              <div className="flex flex-wrap gap-2">
                {GROWTH_TIERS.map((tier) => (
                  <button
                    key={tier.label}
                    onClick={() => setLaunchesPerDay(tier.launchesPerDay)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                      launchesPerDay === tier.launchesPerDay
                        ? 'border-brand-500 bg-brand-500/10 text-brand-500'
                        : 'border-border hover:border-brand-500/50 text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {tier.icon}
                    <span>{tier.label}</span>
                    <span className="text-muted-foreground">({tier.launchesPerDay}/d)</span>
                  </button>
                ))}
              </div>
            </div>

            {/* SOL price selector */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">SOL Price (USD)</label>
                <span className="text-sm font-medium">${solPrice}</span>
              </div>
              <div className="flex gap-2 flex-wrap">
                {SOL_PRICES.map((p) => (
                  <button
                    key={p}
                    onClick={() => setSolPrice(p)}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                      solPrice === p
                        ? 'border-brand-500 bg-brand-500/10 text-brand-500'
                        : 'border-border hover:border-brand-500/50 text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    ${p}
                  </button>
                ))}
              </div>
            </div>

            {/* Fee per launch */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Platform Fee per Launch</label>
                <span className="text-sm font-medium">{feeSOL} SOL (${(feeSOL * solPrice).toFixed(2)})</span>
              </div>
              <div className="flex gap-2 flex-wrap">
                {[0.05, 0.1, 0.15, 0.2, 0.25, 0.5].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFeeSOL(f)}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                      feeSOL === f
                        ? 'border-brand-500 bg-brand-500/10 text-brand-500'
                        : 'border-border hover:border-brand-500/50 text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {f} SOL
                  </button>
                ))}
              </div>
            </div>

          </CardContent>
        </Card>

        {/* Projections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              label: 'Daily Revenue',
              sol: projections.daily.sol,
              usd: projections.daily.usd,
              launches: launchesPerDay,
              period: 'per day',
              gradient: 'from-blue-500/10 to-blue-600/5',
              border: 'border-blue-500/20',
              accent: 'text-blue-500',
            },
            {
              label: 'Monthly Revenue',
              sol: projections.monthly.sol,
              usd: projections.monthly.usd,
              launches: projections.launchesMonthly,
              period: 'per month',
              gradient: 'from-emerald-500/10 to-emerald-600/5',
              border: 'border-emerald-500/20',
              accent: 'text-emerald-500',
            },
            {
              label: 'Annual Revenue',
              sol: projections.monthly.sol * 12,
              usd: projections.yearly.usd,
              launches: projections.launchesYearly,
              period: 'per year',
              gradient: 'from-brand-500/10 to-brand-600/5',
              border: 'border-brand-500/20',
              accent: 'text-brand-500',
            },
          ].map((col) => (
            <Card key={col.label} className={`bg-gradient-to-br ${col.gradient} ${col.border}`}>
              <CardContent className="pt-6 space-y-3">
                <p className="text-sm font-medium text-muted-foreground">{col.label}</p>
                <div>
                  <p className="text-3xl font-bold">{formatUSD(col.usd)}</p>
                  <p className={`text-sm ${col.accent} font-medium mt-0.5`}>
                    {formatSOL(col.sol)} SOL {col.period}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Rocket className="h-3 w-3" />
                  {col.launches.toLocaleString()} launches {col.period}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Comparison table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-brand-500" /> Growth Stage Projections at ${solPrice} SOL
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="text-left font-medium text-muted-foreground py-3 pr-4">Stage</th>
                    <th className="text-right font-medium text-muted-foreground py-3 px-3">Launches/Day</th>
                    <th className="text-right font-medium text-muted-foreground py-3 px-3">Daily</th>
                    <th className="text-right font-medium text-muted-foreground py-3 px-3">Monthly</th>
                    <th className="text-right font-medium text-muted-foreground py-3 pl-3">Annual</th>
                  </tr>
                </thead>
                <tbody>
                  {GROWTH_TIERS.map((tier) => {
                    const daily = tier.launchesPerDay * feeSOL * solPrice;
                    const monthly = daily * 30;
                    const annual = daily * 365;
                    const isActive = launchesPerDay === tier.launchesPerDay;
                    return (
                      <tr
                        key={tier.label}
                        className={`border-b border-border/30 cursor-pointer transition-colors ${
                          isActive ? 'bg-brand-500/5' : 'hover:bg-muted/30'
                        }`}
                        onClick={() => setLaunchesPerDay(tier.launchesPerDay)}
                      >
                        <td className="py-3 pr-4">
                          <div className="flex items-center gap-2">
                            <span className={tier.color}>{tier.icon}</span>
                            <div>
                              <p className="font-medium">{tier.label}</p>
                              <p className="text-xs text-muted-foreground">{tier.description}</p>
                            </div>
                          </div>
                        </td>
                        <td className="text-right py-3 px-3 font-mono text-xs">
                          {tier.launchesPerDay.toLocaleString()}
                        </td>
                        <td className="text-right py-3 px-3 font-medium">
                          {formatUSD(daily)}
                        </td>
                        <td className="text-right py-3 px-3 font-medium">
                          {formatUSD(monthly)}
                        </td>
                        <td className="text-right py-3 pl-3 font-bold text-brand-500">
                          {formatUSD(annual)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Revenue model explanation */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Zap className="h-4 w-4 text-brand-500" /> How Revenue Collection Works
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  icon: <DollarSign className="h-5 w-5 text-emerald-500" />,
                  title: 'Atomic Fee Enforcement',
                  desc: 'Platform fee is bundled into the same transaction as token creation. If the fee fails, the whole transaction fails. Zero leakage.',
                },
                {
                  icon: <Target className="h-5 w-5 text-blue-500" />,
                  title: 'Direct to Treasury',
                  desc: 'Fees go directly to your treasury wallet on-chain. No intermediary, no payment processor, no chargebacks.',
                },
                {
                  icon: <BarChart3 className="h-5 w-5 text-purple-500" />,
                  title: 'Real-Time Tracking',
                  desc: 'Admin dashboard shows live treasury balance, estimated launches, and revenue — all from on-chain data.',
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-3">
                  <div className="flex-shrink-0 mt-0.5">{item.icon}</div>
                  <div>
                    <p className="font-medium text-sm">{item.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pump.fun context card */}
        <Card className="border-brand-500/20 bg-gradient-to-br from-brand-500/5 to-background">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-brand-500/10 flex items-center justify-center">
                <Crown className="h-5 w-5 text-brand-500" />
              </div>
              <div className="space-y-2">
                <p className="font-semibold">Market Context: pump.fun earned $500M+ in fees</p>
                <p className="text-sm text-muted-foreground">
                  pump.fun processes ~40,000 token launches per day at 0.02 SOL each and has
                  generated over $500M in protocol revenue. This platform gives you the same
                  model — your own infrastructure, your own fees, your own treasury — without
                  the $0 entry point that attracts spam. A higher fee ({feeSOL} SOL) filters for
                  serious creators while maximising per-launch revenue.
                </p>
                <p className="text-xs text-muted-foreground">
                  Even at <strong>1% of pump.fun volume</strong> ({(40000 * 0.01).toLocaleString()} launches/day),
                  this platform would generate{' '}
                  <strong className="text-brand-500">
                    {formatUSD(40000 * 0.01 * feeSOL * solPrice)}/day
                  </strong>{' '}
                  ({formatUSD(40000 * 0.01 * feeSOL * solPrice * 365)}/year) at ${solPrice}/SOL.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="gradient" size="lg" asChild>
            <Link href="/launch">
              <Rocket className="mr-2 h-4 w-4" /> Try the Launch Wizard
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/admin">
              <BarChart3 className="mr-2 h-4 w-4" /> View Admin Dashboard
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/">
              <ArrowRight className="mr-2 h-4 w-4" /> Back to Homepage
            </Link>
          </Button>
        </div>

      </div>
    </div>
  );
}

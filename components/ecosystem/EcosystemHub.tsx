'use client';

import {
  ArrowRightLeft,
  BarChart3,
  Droplets,
  ExternalLink,
  Globe,
  Layers,
  Radio,
  Shield,
  Sparkles,
  Zap,
} from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { appConfig } from '@/lib/config/app-config';

interface EcosystemCardProps {
  icon: React.ReactNode;
  title: string;
  badge: string;
  description: string;
  features: string[];
  primaryAction?: { label: string; href: string; external?: boolean };
  secondaryAction?: { label: string; href: string; external?: boolean };
  gradient: string;
}

const ECOSYSTEM: EcosystemCardProps[] = [
  {
    icon: <Zap className="h-5 w-5" />,
    title: 'Jupiter',
    badge: 'Aggregator',
    description:
      'Best-price execution across all Solana DEXs. Swap, limit orders, DCA, and perps.',
    features: [
      'Multi-hop smart routing across 20+ DEXs',
      'MEV protection (Jito bundles)',
      'Limit orders & DCA',
      'Token-2022 compatible',
    ],
    primaryAction: { label: 'Swap on Jupiter', href: '/trade' },
    secondaryAction: {
      label: 'Jupiter API Docs',
      href: 'https://station.jup.ag/docs',
      external: true,
    },
    gradient: 'from-green-500/15 to-emerald-500/15',
  },
  {
    icon: <Droplets className="h-5 w-5" />,
    title: 'Raydium',
    badge: 'AMM V4',
    description:
      'Constant-product AMM with the largest TVL on Solana. First choice for meme coin pools.',
    features: [
      'Standard AMM pools (x * y = k)',
      'OpenBook V2 market integration',
      'AcceleRaytor launchpad',
      'Concentrated liquidity (CLMM)',
    ],
    primaryAction: { label: 'Add Liquidity', href: '/liquidity' },
    secondaryAction: {
      label: 'Raydium App',
      href: appConfig.ecosystem.raydium.appUrl,
      external: true,
    },
    gradient: 'from-blue-500/15 to-indigo-500/15',
  },
  {
    icon: <BarChart3 className="h-5 w-5" />,
    title: 'Meteora',
    badge: 'DLMM',
    description:
      'Dynamic Liquidity Market Maker — bin-based concentrated liquidity with dynamic fees.',
    features: [
      'Concentrated liquidity bins',
      'Dynamic fee adjustment',
      'Higher capital efficiency',
      'Alpha Vault for fair launches',
    ],
    primaryAction: { label: 'Add Liquidity', href: '/liquidity' },
    secondaryAction: {
      label: 'Meteora App',
      href: appConfig.ecosystem.meteora.appUrl,
      external: true,
    },
    gradient: 'from-cyan-500/15 to-teal-500/15',
  },
  {
    icon: <Layers className="h-5 w-5" />,
    title: 'Orca',
    badge: 'Whirlpool CLMM',
    description:
      'Concentrated liquidity whirlpools with tight spreads and efficient capital deployment.',
    features: [
      'Whirlpool concentrated liquidity',
      'Lower slippage for traders',
      'Fee tier optimisation',
      'Developer-friendly SDK',
    ],
    primaryAction: { label: 'Add Liquidity', href: '/liquidity' },
    secondaryAction: {
      label: 'Orca App',
      href: appConfig.ecosystem.orca.appUrl,
      external: true,
    },
    gradient: 'from-violet-500/15 to-purple-500/15',
  },
];

const INFRASTRUCTURE = [
  {
    icon: <Radio className="h-4 w-4" />,
    title: 'Helius RPC',
    status: appConfig.ecosystem.helius.rpcUrl ? 'Connected' : 'Not configured',
    statusColor: appConfig.ecosystem.helius.rpcUrl
      ? 'text-emerald-500'
      : 'text-muted-foreground',
    description: 'Priority RPC with webhooks, DAS API, and enhanced transaction support.',
  },
  {
    icon: <Sparkles className="h-4 w-4" />,
    title: 'Metaplex',
    status: 'Integrated',
    statusColor: 'text-emerald-500',
    description: 'Token metadata standard. On-chain name, symbol, image URI.',
  },
  {
    icon: <Shield className="h-4 w-4" />,
    title: 'Token-2022',
    status: 'Aware',
    statusColor: 'text-amber-500',
    description: 'Transfer fees, interest-bearing tokens, confidential transfers, and more.',
  },
  {
    icon: <Globe className="h-4 w-4" />,
    title: 'Pinata IPFS',
    status: 'Integrated',
    statusColor: 'text-emerald-500',
    description: 'Decentralised metadata & image hosting via IPFS.',
  },
];

export function EcosystemHub() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-brand-500/20 to-purple-500/20 flex items-center justify-center">
            <Globe className="h-5 w-5 text-brand-500" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Ecosystem</h1>
            <p className="text-sm text-muted-foreground">
              Full Solana ecosystem integration — swap, provide liquidity, and manage tokens
            </p>
          </div>
        </div>
      </div>

      {/* DEX Grid */}
      <div className="space-y-3">
        <h2 className="text-base font-semibold">DEX Integrations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ECOSYSTEM.map((item) => (
            <EcosystemCard key={item.title} {...item} />
          ))}
        </div>
      </div>

      {/* Infrastructure */}
      <div className="space-y-3">
        <h2 className="text-base font-semibold">Infrastructure</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {INFRASTRUCTURE.map((item) => (
            <Card key={item.title}>
              <CardContent className="pt-4 pb-4">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-lg bg-muted/50 flex items-center justify-center text-muted-foreground flex-shrink-0">
                    {item.icon}
                  </div>
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold">{item.title}</p>
                      <span className={`text-xs font-medium ${item.statusColor}`}>
                        {item.status}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <Card className="bg-gradient-to-r from-brand-500/5 to-purple-500/5 border-brand-500/20">
        <CardContent className="pt-6 pb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <p className="font-semibold text-sm">Ready to launch?</p>
              <p className="text-xs text-muted-foreground">
                Create your token, add liquidity, and start trading — all from one platform.
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="gradient" size="sm" asChild>
                <Link href="/launch">
                  <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                  Launch Token
                </Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href="/trade">
                  <ArrowRightLeft className="h-3.5 w-3.5 mr-1.5" />
                  Trade
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function EcosystemCard({
  icon,
  title,
  badge,
  description,
  features,
  primaryAction,
  secondaryAction,
  gradient,
}: EcosystemCardProps) {
  return (
    <Card className="group hover:border-brand-500/30 transition-colors">
      <CardHeader className={`bg-gradient-to-br ${gradient} rounded-t-lg`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-lg bg-background/80 flex items-center justify-center shadow-sm">
              {icon}
            </div>
            <CardTitle className="text-base">{title}</CardTitle>
          </div>
          <Badge variant="secondary">{badge}</Badge>
        </div>
        <CardDescription className="text-foreground/70">{description}</CardDescription>
      </CardHeader>
      <CardContent className="pt-4 space-y-4">
        <ul className="space-y-1.5">
          {features.map((f) => (
            <li key={f} className="text-xs text-muted-foreground flex items-start gap-2">
              <span className="text-brand-500 mt-0.5">•</span>
              {f}
            </li>
          ))}
        </ul>
        <div className="flex gap-2">
          {primaryAction && (
            <Button variant="outline" size="sm" asChild>
              {primaryAction.external ? (
                <a href={primaryAction.href} target="_blank" rel="noopener noreferrer">
                  {primaryAction.label}
                  <ExternalLink className="h-3 w-3 ml-1.5" />
                </a>
              ) : (
                <Link href={primaryAction.href}>{primaryAction.label}</Link>
              )}
            </Button>
          )}
          {secondaryAction && (
            <Button variant="ghost" size="sm" asChild>
              {secondaryAction.external ? (
                <a href={secondaryAction.href} target="_blank" rel="noopener noreferrer">
                  {secondaryAction.label}
                  <ExternalLink className="h-3 w-3 ml-1.5" />
                </a>
              ) : (
                <Link href={secondaryAction.href}>{secondaryAction.label}</Link>
              )}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

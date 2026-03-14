'use client';

import {
  ArrowRightLeft,
  BarChart3,
  BookOpen,
  Coins,
  Database,
  Droplets,
  ExternalLink,
  Globe,
  Key,
  Layers,
  Link2,
  Lock,
  Radio,
  Shield,
  Sparkles,
  Users,
  TrendingUp,
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

const ANALYTICS_PARTNERS: EcosystemCardProps[] = [
  {
    icon: <BarChart3 className="h-5 w-5" />,
    title: 'Birdeye',
    badge: 'Analytics',
    description:
      'Real-time token analytics, charts, and trading data for every Solana token. Auto-indexed.',
    features: [
      'Live price charts with TradingView',
      'Token holder distribution',
      'Transaction history & volume',
      'Wallet portfolio tracking',
      'API for programmatic access',
    ],
    primaryAction: {
      label: 'View on Birdeye',
      href: 'https://birdeye.so',
      external: true,
    },
    secondaryAction: {
      label: 'Birdeye API',
      href: 'https://docs.birdeye.so',
      external: true,
    },
    gradient: 'from-yellow-500/15 to-orange-500/15',
  },
  {
    icon: <TrendingUp className="h-5 w-5" />,
    title: 'DexScreener',
    badge: 'Charts',
    description:
      'Multi-chain DEX analytics. Tokens listed on Raydium or Meteora auto-appear on DexScreener.',
    features: [
      'Live pair charts',
      'Price alerts & watchlists',
      'New pair detection',
      'Social sharing embeds',
      'Free API access',
    ],
    primaryAction: {
      label: 'DexScreener',
      href: 'https://dexscreener.com/solana',
      external: true,
    },
    gradient: 'from-lime-500/15 to-green-500/15',
  },
];

const INFRASTRUCTURE_PARTNERS: EcosystemCardProps[] = [
  {
    icon: <Lock className="h-5 w-5" />,
    title: 'Jito',
    badge: 'MEV + Bundles',
    description:
      'MEV protection and transaction bundling. Ensures your launch transaction lands on-chain without front-running.',
    features: [
      'MEV-protected transaction bundles',
      'Priority fee optimization',
      'Tip routing for validators',
      'Block engine for critical txs',
    ],
    primaryAction: {
      label: 'Jito Labs',
      href: 'https://www.jito.wtf',
      external: true,
    },
    secondaryAction: {
      label: 'Jito SDK',
      href: 'https://github.com/jito-foundation/jito-ts',
      external: true,
    },
    gradient: 'from-red-500/15 to-rose-500/15',
  },
  {
    icon: <Lock className="h-5 w-5" />,
    title: 'Streamflow',
    badge: 'Vesting + LP Lock',
    description:
      'Token vesting, payroll, and LP token locking. Critical for project credibility and rug-pull prevention.',
    features: [
      'LP token locking (prove liquidity stays)',
      'Token vesting schedules',
      'Multi-recipient payroll',
      'Cliff + linear unlock',
    ],
    primaryAction: {
      label: 'Lock LP Tokens',
      href: 'https://app.streamflow.finance/vesting',
      external: true,
    },
    secondaryAction: {
      label: 'Streamflow SDK',
      href: 'https://docs.streamflow.finance',
      external: true,
    },
    gradient: 'from-sky-500/15 to-blue-500/15',
  },
  {
    icon: <Users className="h-5 w-5" />,
    title: 'Squads',
    badge: 'Multisig',
    description:
      'Multi-signature treasury management. Perfect for shared team wallets and DAO treasuries.',
    features: [
      'Multisig wallet for team funds',
      'Transaction approval workflows',
      'Role-based access control',
      'Solana Program Upgrades',
    ],
    primaryAction: {
      label: 'Create Multisig',
      href: 'https://squads.so',
      external: true,
    },
    gradient: 'from-amber-500/15 to-yellow-500/15',
  },
  {
    icon: <Coins className="h-5 w-5" />,
    title: 'Pyth Network',
    badge: 'Oracle',
    description:
      'High-fidelity price feeds from institutional market makers. Powers DeFi pricing across Solana.',
    features: [
      'Sub-second price updates',
      'SOL/USD and token price feeds',
      'Confidence intervals',
      'Cross-chain via Wormhole',
    ],
    primaryAction: {
      label: 'Price Feeds',
      href: 'https://pyth.network/price-feeds',
      external: true,
    },
    gradient: 'from-purple-500/15 to-fuchsia-500/15',
  },
];

const ECOSYSTEM_TOOLS: EcosystemCardProps[] = [
  {
    icon: <Link2 className="h-5 w-5" />,
    title: 'Wormhole',
    badge: 'Bridge',
    description:
      'Cross-chain messaging and token bridging. Move tokens between Solana, Ethereum, BSC, and 20+ chains.',
    features: [
      'Token bridge (Portal)',
      'Cross-chain messaging',
      'Solana ↔ EVM bridging',
      'Native token transfers (NTT)',
    ],
    primaryAction: {
      label: 'Bridge Tokens',
      href: 'https://portalbridge.com',
      external: true,
    },
    gradient: 'from-indigo-500/15 to-blue-500/15',
  },
  {
    icon: <BookOpen className="h-5 w-5" />,
    title: 'Bonfida / SNS',
    badge: 'Name Service',
    description:
      'Solana Name Service — register .sol domains for your token project. Human-readable wallet addresses.',
    features: [
      '.sol domain registration',
      'Reverse lookup (address → name)',
      'Token domain branding',
      'Sub-domains for team members',
    ],
    primaryAction: {
      label: 'Register .sol',
      href: 'https://www.sns.id',
      external: true,
    },
    gradient: 'from-teal-500/15 to-emerald-500/15',
  },
  {
    icon: <Users className="h-5 w-5" />,
    title: 'Realms / SPL Governance',
    badge: 'DAO',
    description:
      'On-chain governance for SPL tokens. Create a DAO around your token with proposal voting.',
    features: [
      'Token-weighted voting',
      'Proposal creation & execution',
      'Council + community governance',
      'Treasury management',
    ],
    primaryAction: {
      label: 'Create DAO',
      href: 'https://app.realms.today',
      external: true,
    },
    gradient: 'from-orange-500/15 to-red-500/15',
  },
  {
    icon: <Database className="h-5 w-5" />,
    title: 'Dialect',
    badge: 'Notifications',
    description:
      'On-chain messaging and notification protocol for Solana. Push alerts for token events.',
    features: [
      'Wallet-to-wallet messaging',
      'dApp notification threads',
      'Discord/Telegram/Email bridges',
      'Smart message triggers',
    ],
    primaryAction: {
      label: 'Dialect Docs',
      href: 'https://docs.dialect.to',
      external: true,
    },
    gradient: 'from-pink-500/15 to-rose-500/15',
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
  {
    icon: <Key className="h-4 w-4" />,
    title: 'SPL Token Program',
    status: 'Core',
    statusColor: 'text-emerald-500',
    description: 'Solana Program Library standard for fungible tokens.',
  },
  {
    icon: <Shield className="h-4 w-4" />,
    title: 'OpenBook V2',
    status: 'Referenced',
    statusColor: 'text-amber-500',
    description: 'On-chain order book. Required for Raydium AMM pool creation.',
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
            <h1 className="text-xl font-bold">Solana Ecosystem</h1>
            <p className="text-sm text-muted-foreground">
              Full ecosystem integration — 15+ partners across DEXs, analytics, infrastructure, governance, and bridges
            </p>
          </div>
        </div>
      </div>

      {/* DEX Grid */}
      <div className="space-y-3">
        <h2 className="text-base font-semibold flex items-center gap-2">
          <ArrowRightLeft className="h-4 w-4 text-brand-500" />
          DEX Integrations (4)
        </h2>
        <p className="text-xs text-muted-foreground">Swap, provide liquidity, and route trades across all major Solana DEXs.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ECOSYSTEM.map((item) => (
            <EcosystemCard key={item.title} {...item} />
          ))}
        </div>
      </div>

      {/* Analytics & Charts */}
      <div className="space-y-3">
        <h2 className="text-base font-semibold flex items-center gap-2">
          <BarChart3 className="h-4 w-4 text-brand-500" />
          Analytics & Charts (2)
        </h2>
        <p className="text-xs text-muted-foreground">Tokens launched here auto-appear on these platforms once a pool exists.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ANALYTICS_PARTNERS.map((item) => (
            <EcosystemCard key={item.title} {...item} />
          ))}
        </div>
      </div>

      {/* Infrastructure Partners */}
      <div className="space-y-3">
        <h2 className="text-base font-semibold flex items-center gap-2">
          <Shield className="h-4 w-4 text-brand-500" />
          Infrastructure & Security (4)
        </h2>
        <p className="text-xs text-muted-foreground">MEV protection, LP locking, multisig wallets, and price oracles.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {INFRASTRUCTURE_PARTNERS.map((item) => (
            <EcosystemCard key={item.title} {...item} />
          ))}
        </div>
      </div>

      {/* Ecosystem Tools */}
      <div className="space-y-3">
        <h2 className="text-base font-semibold flex items-center gap-2">
          <Layers className="h-4 w-4 text-brand-500" />
          Ecosystem Tools (4)
        </h2>
        <p className="text-xs text-muted-foreground">Bridges, naming, governance, and notifications for the broader Solana ecosystem.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ECOSYSTEM_TOOLS.map((item) => (
            <EcosystemCard key={item.title} {...item} />
          ))}
        </div>
      </div>

      {/* Core Infrastructure */}
      <div className="space-y-3">
        <h2 className="text-base font-semibold flex items-center gap-2">
          <Radio className="h-4 w-4 text-brand-500" />
          Core Infrastructure ({INFRASTRUCTURE.length})
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
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

      {/* Ecosystem Summary */}
      <Card className="bg-gradient-to-r from-brand-500/5 via-purple-500/5 to-emerald-500/5 border-brand-500/20">
        <CardContent className="pt-6 pb-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-brand-500">15+</p>
              <p className="text-xs text-muted-foreground">Ecosystem Partners</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-emerald-500">4</p>
              <p className="text-xs text-muted-foreground">DEXs Integrated</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-500">6</p>
              <p className="text-xs text-muted-foreground">Core Infra</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-amber-500">5+</p>
              <p className="text-xs text-muted-foreground">Governance & Tools</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <p className="font-semibold text-sm">White-Label Ready</p>
              <p className="text-xs text-muted-foreground">
                This entire ecosystem — DEXs, analytics, infrastructure — can be white-labeled under your brand. Custom domain, custom fees, custom branding.
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

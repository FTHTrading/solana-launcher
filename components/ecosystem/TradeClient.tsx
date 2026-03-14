'use client';

import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useSearchParams } from 'next/navigation';
import {
  ArrowRightLeft,
  ExternalLink,
  Globe,
  Zap,
  Shield,
  TrendingUp,
  Coins,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { WalletGuard } from '@/components/wallet/WalletGuard';
import { appConfig } from '@/lib/config/app-config';

const SOL_MINT = 'So11111111111111111111111111111111111111112';

interface DexRoute {
  name: string;
  logo: string;
  color: string;
  swapUrl: (inputMint: string, outputMint: string) => string;
  description: string;
  badge: string;
}

const DEX_ROUTES: DexRoute[] = [
  {
    name: 'Jupiter',
    logo: '/images/brand/logo-mark.png',
    color: 'from-green-500/20 to-emerald-500/20',
    swapUrl: (input, output) =>
      `${appConfig.ecosystem.jupiter.swapUrl}/${input}-${output}`,
    description:
      'Best execution — aggregates all Solana DEXs for optimal price routing across Raydium, Orca, Meteora, and 20+ more.',
    badge: 'Recommended',
  },
  {
    name: 'Raydium',
    logo: '/images/brand/logo-mark.png',
    color: 'from-blue-500/20 to-indigo-500/20',
    swapUrl: (input, output) =>
      `${appConfig.ecosystem.raydium.swapUrl}/?inputCurrency=${input}&outputCurrency=${output}`,
    description:
      'AMM V4 constant-product pools. Largest TVL on Solana for meme coin pairs.',
    badge: 'AMM V4',
  },
  {
    name: 'Orca',
    logo: '/images/brand/logo-mark.png',
    color: 'from-violet-500/20 to-purple-500/20',
    swapUrl: (input, output) =>
      `${appConfig.ecosystem.orca.appUrl}/swap?inputMint=${input}&outputMint=${output}`,
    description:
      'Whirlpool concentrated liquidity with tight spreads and low slippage.',
    badge: 'CLMM',
  },
  {
    name: 'Meteora',
    logo: '/images/brand/logo-mark.png',
    color: 'from-cyan-500/20 to-teal-500/20',
    swapUrl: (input, output) =>
      `${appConfig.ecosystem.meteora.appUrl}/swap/${input}-${output}`,
    description:
      'DLMM concentrated liquidity bins with dynamic fees for highest capital efficiency.',
    badge: 'DLMM',
  },
];

export function TradeClient() {
  const { connected } = useWallet();
  const searchParams = useSearchParams();
  const prefillMint = searchParams.get('mint') ?? '';

  const [tokenMint, setTokenMint] = useState(prefillMint);
  const [direction, setDirection] = useState<'buy' | 'sell'>('buy');

  if (!connected) {
    return (
      <WalletGuard
        icon={<ArrowRightLeft className="h-6 w-6 text-brand-500" />}
        title="Connect Your Wallet"
        description="Connect your Solana wallet to access swap routing across all major DEXs."
      >
        <></>
      </WalletGuard>
    );
  }

  const inputMint = direction === 'buy' ? SOL_MINT : tokenMint;
  const outputMint = direction === 'buy' ? tokenMint : SOL_MINT;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-brand-500/20 to-purple-500/20 flex items-center justify-center">
            <ArrowRightLeft className="h-5 w-5 text-brand-500" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Trade</h1>
            <p className="text-sm text-muted-foreground">
              Swap tokens across all Solana DEXs with best-price routing
            </p>
          </div>
        </div>
      </div>

      {/* Token input + direction */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <Input
            label="Token Mint Address"
            placeholder="Paste your token mint address..."
            value={tokenMint}
            onChange={(e) => setTokenMint(e.target.value)}
            hint="Enter the mint address of the token you want to trade"
          />

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Direction:</span>
            <div className="flex gap-1">
              <button
                onClick={() => setDirection('buy')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                  direction === 'buy'
                    ? 'bg-emerald-500 text-white border-emerald-500 shadow-lg shadow-emerald-500/25'
                    : 'border-border text-muted-foreground hover:border-emerald-500/50'
                }`}
              >
                Buy (SOL → Token)
              </button>
              <button
                onClick={() => setDirection('sell')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                  direction === 'sell'
                    ? 'bg-red-500 text-white border-red-500 shadow-lg shadow-red-500/25'
                    : 'border-border text-muted-foreground hover:border-red-500/50'
                }`}
              >
                Sell (Token → SOL)
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Jupiter Terminal Embed Zone */}
      <Card className="overflow-hidden border-brand-500/30">
        <CardHeader className="bg-gradient-to-r from-brand-500/5 to-purple-500/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-brand-500" />
              <CardTitle className="text-base">Jupiter Aggregator</CardTitle>
              <Badge variant="info">Best Price</Badge>
            </div>
            <Button
              variant="gradient"
              size="sm"
              disabled={!tokenMint || tokenMint.length < 32}
              onClick={() =>
                window.open(
                  `${appConfig.ecosystem.jupiter.swapUrl}/${inputMint}-${outputMint}`,
                  '_blank'
                )
              }
            >
              Open Jupiter
              <ExternalLink className="h-3 w-3 ml-1.5" />
            </Button>
          </div>
          <CardDescription>
            Jupiter scans all Solana DEXs simultaneously to find the best swap
            execution. One click — best price.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4 space-y-3">
          <Alert variant="info" title="Smart Routing">
            <p className="text-xs mt-1">
              Jupiter splits orders across Raydium, Orca, Meteora, and 20+ DEXs
              for optimal execution. It handles multi-hop routing, split trades,
              and MEV protection automatically.
            </p>
          </Alert>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <StatCard icon={<Globe className="h-4 w-4" />} label="DEXs" value="20+" />
            <StatCard icon={<Shield className="h-4 w-4" />} label="MEV Protection" value="Built-in" />
            <StatCard icon={<TrendingUp className="h-4 w-4" />} label="Price Impact" value="Optimised" />
            <StatCard icon={<Coins className="h-4 w-4" />} label="Token-2022" value="Supported" />
          </div>
        </CardContent>
      </Card>

      {/* DEX Direct Links Grid */}
      <div className="space-y-3">
        <h2 className="text-base font-semibold">Swap on Individual DEXs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {DEX_ROUTES.map((dex) => (
            <Card
              key={dex.name}
              className="group hover:border-brand-500/40 transition-colors"
            >
              <CardContent className="pt-4 pb-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-8 w-8 rounded-lg bg-gradient-to-br ${dex.color} flex items-center justify-center`}
                      >
                        <ArrowRightLeft className="h-4 w-4 text-foreground" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{dex.name}</p>
                        <Badge variant="secondary" className="text-[10px]">
                          {dex.badge}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {dex.description}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    disabled={!tokenMint || tokenMint.length < 32}
                    onClick={() =>
                      window.open(dex.swapUrl(inputMint, outputMint), '_blank')
                    }
                  >
                    Swap on {dex.name}
                    <ExternalLink className="h-3 w-3 ml-1.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick-trade tip */}
      <Card className="bg-muted/30">
        <CardContent className="pt-4 pb-4">
          <div className="flex items-start gap-3">
            <Zap className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
            <div className="text-xs space-y-1">
              <p className="font-medium">Pro tip: Use Jupiter for the best experience</p>
              <p className="text-muted-foreground leading-relaxed">
                Jupiter aggregates all DEXs and finds the cheapest route automatically.
                It supports limit orders, DCA, and perpetual trading. For single DEX
                liquidity provision, use the <a href="/liquidity" className="text-brand-500 underline underline-offset-2">Liquidity page</a>.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-border/50 bg-muted/30 px-3 py-2 text-center space-y-1">
      <div className="flex justify-center text-muted-foreground">{icon}</div>
      <p className="text-xs font-semibold">{value}</p>
      <p className="text-[10px] text-muted-foreground">{label}</p>
    </div>
  );
}

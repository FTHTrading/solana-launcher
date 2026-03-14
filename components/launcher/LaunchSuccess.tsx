'use client';

import Link from 'next/link';
import {
  ArrowRightLeft,
  CheckCircle2,
  Copy,
  Droplets,
  ExternalLink,
  LayoutDashboard,
  Rocket,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getExplorerTokenUrl, getExplorerTxUrl, appConfig } from '@/lib/config/app-config';
import { truncateAddress } from '@/lib/utils/utils';
import { useState } from 'react';

interface LaunchSuccessProps {
  mintAddress: string;
  txSignature: string;
  tokenName: string;
  tokenSymbol: string;
  onReset: () => void;
}

export function LaunchSuccess({
  mintAddress,
  txSignature,
  tokenName,
  tokenSymbol,
  onReset,
}: LaunchSuccessProps) {
  const [copied, setCopied] = useState<'mint' | 'tx' | null>(null);

  const copy = async (text: string, key: 'mint' | 'tx') => {
    await navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-8 text-center py-4 animate-fade-in">
      {/* Icon */}
      <div className="flex justify-center">
        <div className="h-20 w-20 rounded-full bg-emerald-500/10 flex items-center justify-center">
          <CheckCircle2 className="h-10 w-10 text-emerald-500" />
        </div>
      </div>

      {/* Title */}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Token Launched!</h2>
        <p className="text-muted-foreground">
          <strong>{tokenName}</strong> ({tokenSymbol}) is now live on Solana.
          Tokens have been minted to your wallet.
        </p>
      </div>

      {/* Addresses */}
      <div className="bg-muted/30 rounded-xl border border-border divide-y divide-border text-left overflow-hidden">
        {/* Mint address */}
        <div className="px-4 py-3 space-y-1">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Token Mint Address
          </p>
          <div className="flex items-center justify-between gap-2">
            <span className="font-mono text-sm break-all">{mintAddress}</span>
            <button
              onClick={() => copy(mintAddress, 'mint')}
              className="flex-shrink-0 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Copy className="h-4 w-4" />
            </button>
          </div>
          {copied === 'mint' && (
            <p className="text-xs text-emerald-500">Copied!</p>
          )}
        </div>

        {/* Tx signature */}
        <div className="px-4 py-3 space-y-1">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Transaction Signature
          </p>
          <div className="flex items-center justify-between gap-2">
            <span className="font-mono text-sm text-muted-foreground">
              {truncateAddress(txSignature, 8)}
            </span>
            <button
              onClick={() => copy(txSignature, 'tx')}
              className="flex-shrink-0 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Copy className="h-4 w-4" />
            </button>
          </div>
          {copied === 'tx' && (
            <p className="text-xs text-emerald-500">Copied!</p>
          )}
        </div>
      </div>

      {/* Explorer links */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Button variant="outline" size="sm" asChild>
          <a
            href={getExplorerTokenUrl(mintAddress)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            View Token on Solscan
          </a>
        </Button>
        <Button variant="outline" size="sm" asChild>
          <a
            href={getExplorerTxUrl(txSignature)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            View Transaction
          </a>
        </Button>
      </div>

      {/* Ecosystem Deep-Links */}
      <div className="text-left space-y-3">
        <p className="text-sm font-semibold">Next steps — go live now:</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Jupiter Swap */}
          <Card className="group hover:border-emerald-500/40 transition-colors">
            <CardContent className="pt-4 pb-4 flex items-start gap-3">
              <div className="h-8 w-8 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                <Zap className="h-4 w-4 text-emerald-500" />
              </div>
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="text-sm font-semibold">Trade on Jupiter</p>
                  <Badge variant="info" className="text-[10px]">Best Price</Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Swap across 20+ DEXs with best-price routing
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() =>
                    window.open(
                      `${appConfig.ecosystem.jupiter.swapUrl}/So11111111111111111111111111111111111111112-${mintAddress}`,
                      '_blank'
                    )
                  }
                >
                  <ArrowRightLeft className="h-3 w-3 mr-1.5" />
                  Open Jupiter
                  <ExternalLink className="h-3 w-3 ml-1.5" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Raydium Pool */}
          <Card className="group hover:border-blue-500/40 transition-colors">
            <CardContent className="pt-4 pb-4 flex items-start gap-3">
              <div className="h-8 w-8 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                <Droplets className="h-4 w-4 text-blue-500" />
              </div>
              <div className="space-y-1.5 flex-1 min-w-0">
                <p className="text-sm font-semibold">Create Raydium Pool</p>
                <p className="text-xs text-muted-foreground">
                  AMM V4 constant-product SOL/TOKEN pool
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() =>
                    window.open(
                      `${appConfig.ecosystem.raydium.poolUrl}/?inputCurrency=sol&outputCurrency=${mintAddress}`,
                      '_blank'
                    )
                  }
                >
                  <Droplets className="h-3 w-3 mr-1.5" />
                  Open Raydium
                  <ExternalLink className="h-3 w-3 ml-1.5" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Meteora Pool */}
          <Card className="group hover:border-cyan-500/40 transition-colors">
            <CardContent className="pt-4 pb-4 flex items-start gap-3">
              <div className="h-8 w-8 rounded-lg bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                <Droplets className="h-4 w-4 text-cyan-500" />
              </div>
              <div className="space-y-1.5 flex-1 min-w-0">
                <p className="text-sm font-semibold">Create Meteora Pool</p>
                <p className="text-xs text-muted-foreground">
                  DLMM concentrated liquidity bins
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() =>
                    window.open(
                      `${appConfig.ecosystem.meteora.poolUrl}?tokenMint=${mintAddress}`,
                      '_blank'
                    )
                  }
                >
                  <Droplets className="h-3 w-3 mr-1.5" />
                  Open Meteora
                  <ExternalLink className="h-3 w-3 ml-1.5" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Orca Pool */}
          <Card className="group hover:border-purple-500/40 transition-colors">
            <CardContent className="pt-4 pb-4 flex items-start gap-3">
              <div className="h-8 w-8 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                <Droplets className="h-4 w-4 text-purple-500" />
              </div>
              <div className="space-y-1.5 flex-1 min-w-0">
                <p className="text-sm font-semibold">Create Orca Pool</p>
                <p className="text-xs text-muted-foreground">
                  Whirlpool CLMM concentrated liquidity
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() =>
                    window.open(
                      `${appConfig.ecosystem.orca.poolUrl}?tokenMint=${mintAddress}`,
                      '_blank'
                    )
                  }
                >
                  <Droplets className="h-3 w-3 mr-1.5" />
                  Open Orca
                  <ExternalLink className="h-3 w-3 ml-1.5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional next steps */}
        <div className="rounded-xl border border-border bg-muted/20 p-4">
          <ul className="space-y-1.5 text-sm text-muted-foreground list-disc list-inside">
            <li>Share your mint address with your community</li>
            <li>List your token on <a href="https://solscan.io" target="_blank" rel="noopener noreferrer" className="text-brand-500 underline underline-offset-2">Solscan</a> or <a href="https://www.coingecko.com" target="_blank" rel="noopener noreferrer" className="text-brand-500 underline underline-offset-2">CoinGecko</a></li>
            <li>Use the <Link href="/dashboard" className="text-brand-500 underline underline-offset-2">dashboard</Link> to manage and monitor your token</li>
            <li>Set up <Link href="/post-launch" className="text-brand-500 underline underline-offset-2">post-launch automation</Link> for webhooks & notifications</li>
          </ul>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Button size="lg" variant="gradient" asChild>
          <Link href="/dashboard">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Go to Dashboard
          </Link>
        </Button>
        <Button size="lg" variant="outline" onClick={onReset}>
          <Rocket className="mr-2 h-4 w-4" />
          Launch Another Token
        </Button>
      </div>
    </div>
  );
}

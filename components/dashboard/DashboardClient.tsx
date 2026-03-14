'use client';

import { useCallback, useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight, Flame, Rocket,
  Settings2, Droplets, RefreshCw, ExternalLink,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { appConfig, getExplorerAccountUrl } from '@/lib/config/app-config';
import { truncateAddress } from '@/lib/utils/utils';
import { getWalletTokenAccounts, type TokenAccount } from '@/lib/solana/portfolio';
import { NetworkBanner } from '@/components/wallet/NetworkBanner';
import { SolBalanceCheck } from '@/components/wallet/SolBalanceCheck';

// =============================================
// DASHBOARD CLIENT
//
// In v1 the dashboard is wallet-state driven.
// Token history is read from the on-chain state.
//
// TODO: For persistent launch history, hook
// this up to the /api/launches endpoint backed
// by the database layer (Prisma / Supabase).
// =============================================

export function DashboardClient() {
  const { connected, publicKey } = useWallet();

  const [tokens, setTokens] = useState<TokenAccount[]>([]);
  const [loadingTokens, setLoadingTokens] = useState(false);
  const [tokenError, setTokenError] = useState<string | null>(null);

  const loadTokens = useCallback(async () => {
    if (!publicKey) return;
    setLoadingTokens(true);
    setTokenError(null);
    try {
      const accounts = await getWalletTokenAccounts(publicKey.toBase58());
      setTokens(accounts);
    } catch (e) {
      setTokenError('Could not load on-chain tokens. Check your RPC connection.');
      console.error(e);
    } finally {
      setLoadingTokens(false);
    }
  }, [publicKey]);

  useEffect(() => {
    if (connected && publicKey) loadTokens();
  }, [connected, publicKey, loadTokens]);

  const walletAddress = publicKey?.toBase58() ?? 'DemoWa11etAddress1111111111111111111111111';
  const walletUrl = getExplorerAccountUrl(walletAddress);

  return (
    <div className="space-y-6">
      {/* Network + balance */}
      <NetworkBanner />
      <SolBalanceCheck />

      {/* Wallet summary */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Connected Wallet
              </p>
              <p className="font-mono text-sm font-medium">{walletAddress}</p>
              <div className="flex items-center gap-2">
                <Badge variant="success">Connected</Badge>
                <Badge variant="devnet">{appConfig.solana.network}</Badge>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" asChild>
                <a href={walletUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-3.5 w-3.5 mr-1" />
                  Solscan
                </a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            href: '/launch',
            icon: <Rocket className="h-5 w-5 text-brand-500" />,
            bg: 'bg-brand-500/10',
            border: 'border-brand-500/20 hover:border-brand-500/40',
            label: 'Launch Token',
            desc: 'Create a new SPL token',
            cta: 'Start now',
            ctaClass: 'text-brand-500',
          },
          {
            href: '/dashboard/burn',
            icon: <Flame className="h-5 w-5 text-destructive" />,
            bg: 'bg-destructive/10',
            border: 'border-destructive/20 hover:border-destructive/40',
            label: 'Burn Tokens',
            desc: 'Reduce circulating supply',
            cta: 'Open tool',
            ctaClass: 'text-destructive',
          },
          {
            href: '/dashboard/manage',
            icon: <Settings2 className="h-5 w-5 text-orange-500" />,
            bg: 'bg-orange-500/10',
            border: 'border-orange-500/20 hover:border-orange-500/40',
            label: 'Manage Authority',
            desc: 'Revoke mint/freeze authority',
            cta: 'Open tool',
            ctaClass: 'text-orange-500',
          },
          {
            href: '/liquidity',
            icon: <Droplets className="h-5 w-5 text-sky-500" />,
            bg: 'bg-sky-500/10',
            border: 'border-sky-500/20 hover:border-sky-500/40',
            label: 'Add Liquidity',
            desc: 'Raydium & Meteora pools',
            cta: 'Open tool',
            ctaClass: 'text-sky-500',
          },
        ].map((action) => (
          <Card
            key={action.href}
            className={`group cursor-pointer hover:shadow-md transition-all ${action.border}`}
          >
            <CardContent className="pt-6">
              <Link href={action.href} className="block space-y-3">
                <div className={`h-10 w-10 rounded-lg ${action.bg} flex items-center justify-center`}>
                  {action.icon}
                </div>
                <div>
                  <p className="font-medium">{action.label}</p>
                  <p className="text-sm text-muted-foreground">{action.desc}</p>
                </div>
                <div className={`flex items-center text-xs font-medium ${action.ctaClass}`}>
                  {action.cta} <ArrowRight className="ml-1 h-3 w-3" />
                </div>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Token portfolio — live on-chain */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-semibold">Your Tokens</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={loadTokens}
            disabled={loadingTokens}
            className="h-7 px-2"
          >
            <RefreshCw className={`h-3.5 w-3.5 mr-1 ${loadingTokens ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        {tokenError && (
          <Card className="border-destructive/30">
            <CardContent className="pt-5 pb-5 text-center text-sm text-destructive">
              {tokenError}
            </CardContent>
          </Card>
        )}

        {!tokenError && loadingTokens && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="pt-6 space-y-3">
                  <div className="h-11 w-11 rounded-full bg-muted" />
                  <div className="h-4 w-24 rounded bg-muted" />
                  <div className="h-3 w-32 rounded bg-muted" />
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!tokenError && !loadingTokens && tokens.length === 0 && (
          <Card>
            <CardContent className="pt-6 pb-10 text-center space-y-3">
              <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mx-auto">
                <span className="text-xl">🪙</span>
              </div>
              <p className="font-medium">No tokens found</p>
              <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                Tokens with a non-zero balance will appear here automatically.
              </p>
              <Button variant="gradient" size="sm" asChild>
                <Link href="/launch">Launch Your First Token</Link>
              </Button>
            </CardContent>
          </Card>
        )}

        {!tokenError && !loadingTokens && tokens.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tokens.map((token) => (
              <Card key={token.mintAddress} className="hover:shadow-md transition-all">
                <CardContent className="pt-5">
                  <div className="flex items-start gap-3">
                    {token.imageUri ? (
                      <Image
                        src={token.imageUri}
                        alt={token.symbol ?? 'token'}
                        width={44}
                        height={44}
                        className="h-11 w-11 rounded-full object-cover border border-border"
                        unoptimized
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                      />
                    ) : (
                      <div className="h-11 w-11 rounded-full bg-brand-500/15 flex items-center justify-center shrink-0">
                        <span className="text-sm font-bold text-brand-500">
                          {(token.symbol ?? '??').slice(0, 2)}
                        </span>
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold truncate">{token.name ?? 'Unknown Token'}</p>
                      <p className="text-xs text-muted-foreground">{token.symbol ?? '—'}</p>
                      <p className="text-xs font-mono text-muted-foreground mt-0.5">
                        {truncateAddress(token.mintAddress)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">Balance</p>
                      <p className="text-sm font-semibold">
                        {token.uiAmount.toLocaleString('en-US', { maximumFractionDigits: token.decimals })}
                      </p>
                    </div>
                    <div className="flex gap-1.5">
                      <Button variant="outline" size="sm" className="h-7 px-2 text-xs" asChild>
                        <Link href={`/dashboard/manage/${token.mintAddress}`}>
                          <Settings2 className="h-3 w-3 mr-1" /> Manage
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" className="h-7 px-2 text-xs" asChild>
                        <Link href={`/liquidity?mint=${token.mintAddress}`}>
                          <Droplets className="h-3 w-3 mr-1" /> Liquidity
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

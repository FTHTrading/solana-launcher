'use client';

import { useCallback, useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { Connection, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import Link from 'next/link';
import {
  ShieldAlert, Wallet, TrendingUp, ExternalLink,
  RefreshCw, AlertTriangle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { appConfig } from '@/lib/config/app-config';
import { truncateAddress } from '@/lib/utils/utils';

const TREASURY_WALLET = process.env.NEXT_PUBLIC_TREASURY_WALLET ?? '';
const FEE_PER_LAUNCH_SOL = appConfig.fees.creationFeeSOL;

interface TreasuryStats {
  solBalance: number;
  estimatedLaunches: number;
  estimatedRevenue: number;
}

export function AdminClient() {
  const { connected, publicKey } = useWallet();
  const { setVisible } = useWalletModal();

  const [stats, setStats] = useState<TreasuryStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isAuthorized =
    connected &&
    publicKey &&
    TREASURY_WALLET &&
    publicKey.toBase58() === TREASURY_WALLET;

  const loadStats = useCallback(async () => {
    if (!TREASURY_WALLET) return;
    setLoading(true);
    setError(null);
    try {
      const connection = new Connection(
        appConfig.solana.rpcUrl,
        'confirmed'
      );
      const lamports = await connection.getBalance(
        new PublicKey(TREASURY_WALLET)
      );
      const solBalance = lamports / LAMPORTS_PER_SOL;

      // If we had a DB, we'd query launch count from there.
      // For now we derive an estimated launch count from the balance
      // (rough: assume most of the balance came from launch fees)
      const estimatedLaunches = Math.floor(solBalance / FEE_PER_LAUNCH_SOL);
      const estimatedRevenue = estimatedLaunches * FEE_PER_LAUNCH_SOL;

      setStats({ solBalance, estimatedLaunches, estimatedRevenue });
    } catch (e) {
      console.error(e);
      setError('Failed to load treasury balance. Check your RPC endpoint.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthorized) loadStats();
  }, [isAuthorized, loadStats]);

  if (!connected || !publicKey) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4 text-center">
        <div className="h-14 w-14 rounded-full bg-brand-500/10 flex items-center justify-center">
          <ShieldAlert className="h-6 w-6 text-brand-500" />
        </div>
        <h2 className="text-xl font-semibold">Admin Access Required</h2>
        <p className="text-muted-foreground max-w-sm text-sm">
          Connect the treasury wallet to access admin controls.
        </p>
        <Button variant="gradient" onClick={() => setVisible(true)}>
          Connect Wallet
        </Button>
      </div>
    );
  }

  if (!isAuthorized) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4 text-center">
        <div className="h-14 w-14 rounded-full bg-destructive/10 flex items-center justify-center">
          <AlertTriangle className="h-6 w-6 text-destructive" />
        </div>
        <h2 className="text-xl font-semibold">Unauthorized</h2>
        <p className="text-sm text-muted-foreground max-w-sm">
          Connected wallet{' '}
          <span className="font-mono">{truncateAddress(publicKey.toBase58())}</span>{' '}
          is not the treasury wallet. Only the treasury owner can access this page.
        </p>
        {!TREASURY_WALLET && (
          <Badge variant="warning">
            NEXT_PUBLIC_TREASURY_WALLET not set in .env
          </Badge>
        )}
      </div>
    );
  }

  const treasuryUrl = `https://solscan.io/account/${TREASURY_WALLET}${
    appConfig.solana.network === 'devnet' ? '?cluster=devnet' : ''
  }`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Treasury wallet:{' '}
            <span className="font-mono">{truncateAddress(TREASURY_WALLET)}</span>
            <Badge variant="success" className="ml-2">Authorized</Badge>
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={loadStats}
          disabled={loading}
        >
          <RefreshCw className={`h-3.5 w-3.5 mr-1 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {error && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Wallet className="h-4 w-4" /> Treasury Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="h-8 w-24 rounded bg-muted animate-pulse" />
            ) : (
              <div>
                <p className="text-2xl font-bold">
                  {stats ? stats.solBalance.toFixed(4) : '—'} SOL
                </p>
                <a
                  href={treasuryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-brand-500 hover:underline flex items-center gap-1 mt-1"
                >
                  View on Solscan <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <TrendingUp className="h-4 w-4" /> Est. Launches
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="h-8 w-16 rounded bg-muted animate-pulse" />
            ) : (
              <div>
                <p className="text-2xl font-bold">
                  {stats ? stats.estimatedLaunches.toLocaleString() : '—'}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  at {FEE_PER_LAUNCH_SOL} SOL per launch
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <TrendingUp className="h-4 w-4" /> Est. Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="h-8 w-20 rounded bg-muted animate-pulse" />
            ) : (
              <div>
                <p className="text-2xl font-bold">
                  {stats ? stats.estimatedRevenue.toFixed(2) : '—'} SOL
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  from launch fees collected
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Treasury details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Treasury Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { label: 'Treasury Address', value: TREASURY_WALLET, mono: true },
            { label: 'Network', value: appConfig.solana.network },
            { label: 'Fee Per Launch', value: `${FEE_PER_LAUNCH_SOL} SOL` },
            {
              label: 'Solscan Link',
              value: (
                <a
                  href={treasuryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-500 hover:underline flex items-center gap-1"
                >
                  Open explorer <ExternalLink className="h-3 w-3" />
                </a>
              ),
            },
          ].map((row) => (
            <div key={row.label} className="flex items-start justify-between py-2 border-b border-border/50 last:border-0">
              <span className="text-sm text-muted-foreground">{row.label}</span>
              {typeof row.value === 'string' ? (
                <span className={`text-sm font-medium ${row.mono ? 'font-mono text-xs' : ''} max-w-xs truncate`}>
                  {row.value}
                </span>
              ) : (
                <span className="text-sm">{row.value}</span>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quick nav */}
      <div className="flex gap-3 flex-wrap">
        <Button variant="outline" size="sm" asChild>
          <Link href="/dashboard">← Back to Dashboard</Link>
        </Button>
        <Button variant="outline" size="sm" asChild>
          <a href={treasuryUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-3.5 w-3.5 mr-1" />
            Full history on Solscan
          </a>
        </Button>
      </div>
    </div>
  );
}

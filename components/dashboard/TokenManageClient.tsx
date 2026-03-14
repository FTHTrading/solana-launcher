'use client';

import { useState, useEffect, useCallback } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import Link from 'next/link';
import {
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  Flame,
  Lock,
  RefreshCw,
  ShieldCheck,
  ShieldOff,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert } from '@/components/ui/alert';
import { getMintInfo, type MintInfo } from '@/lib/solana/portfolio';
import { revokeAuthority, type AuthorityKind } from '@/services/token-authority/revoke-authority.service';
import { getExplorerTxUrl, getExplorerTokenUrl } from '@/lib/config/app-config';
import { truncateAddress } from '@/lib/utils/utils';

interface TokenManageClientProps {
  mintAddress: string;
}

export function TokenManageClient({ mintAddress }: TokenManageClientProps) {
  const { connected, publicKey } = useWallet();
  const wallet = useWallet();
  const { setVisible } = useWalletModal();

  const [mintInfo, setMintInfo] = useState<MintInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Revoke state
  const [revoking, setRevoking] = useState<AuthorityKind | null>(null);
  const [revokeError, setRevokeError] = useState<string | null>(null);
  const [revokeSuccess, setRevokeSuccess] = useState<{ kind: AuthorityKind; sig: string } | null>(null);
  const [confirmKind, setConfirmKind] = useState<AuthorityKind | null>(null);

  const fetchMintInfo = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const info = await getMintInfo(mintAddress);
      setMintInfo(info);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load mint info');
    } finally {
      setLoading(false);
    }
  }, [mintAddress]);

  useEffect(() => {
    fetchMintInfo();
  }, [fetchMintInfo]);

  const handleRevoke = async (kind: AuthorityKind) => {
    setConfirmKind(null);
    setRevokeError(null);
    setRevoking(kind);
    try {
      const result = await revokeAuthority({
        wallet,
        mintAddress,
        authorityKind: kind,
        onProgress: () => {},
      });
      setRevokeSuccess({ kind, sig: result.txSignature });
      // Refresh mint info to reflect new state
      await fetchMintInfo();
    } catch (err) {
      const appErr = err as { userMessage?: string; message?: string };
      setRevokeError(appErr.userMessage ?? appErr.message ?? 'Revocation failed');
    } finally {
      setRevoking(null);
    }
  };

  if (!connected || !publicKey) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4 text-center">
        <h2 className="text-xl font-semibold">Connect Your Wallet</h2>
        <Button variant="gradient" size="lg" onClick={() => setVisible(true)}>Connect Wallet</Button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 gap-3 text-muted-foreground">
        <Loader2 className="h-5 w-5 animate-spin" /> Loading mint info...
      </div>
    );
  }

  if (error || !mintInfo) {
    return (
      <Alert variant="destructive" title="Failed to load token">
        {error ?? 'Unknown error'} —{' '}
        <button className="underline" onClick={fetchMintInfo}>retry</button>
      </Alert>
    );
  }

  const hasMintAuthority = !!mintInfo.mintAuthority;
  const hasFreezeAuthority = !!mintInfo.freezeAuthority;
  const isCreator =
    (mintInfo.mintAuthority === publicKey.toBase58()) ||
    (mintInfo.freezeAuthority === publicKey.toBase58());

  return (
    <div className="space-y-6">

      {/* Token header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Mint Address</p>
              <p className="font-mono text-sm font-medium break-all">{mintAddress}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge variant={hasMintAuthority ? 'warning' : 'success'}>
                  {hasMintAuthority ? 'Minting: ENABLED' : 'Minting: REVOKED ✓'}
                </Badge>
                <Badge variant={hasFreezeAuthority ? 'warning' : 'success'}>
                  {hasFreezeAuthority ? 'Freeze: ENABLED' : 'Freeze: REVOKED ✓'}
                </Badge>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={fetchMintInfo}>
                <RefreshCw className="h-3.5 w-3.5 mr-1.5" /> Refresh
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a href={getExplorerTokenUrl(mintAddress)} target="_blank" rel="noopener noreferrer">
                  Explorer <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mint info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Token Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-0">
          <div className="divide-y divide-border rounded-xl border border-border overflow-hidden">
            {[
              { label: 'Decimals', value: String(mintInfo.decimals) },
              { label: 'Total Supply (raw)', value: mintInfo.supply },
              {
                label: 'Mint Authority',
                value: mintInfo.mintAuthority ? truncateAddress(mintInfo.mintAuthority) : 'None (revoked)',
              },
              {
                label: 'Freeze Authority',
                value: mintInfo.freezeAuthority ? truncateAddress(mintInfo.freezeAuthority) : 'None (revoked)',
              },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between px-4 py-3">
                <span className="text-sm text-muted-foreground">{row.label}</span>
                <span className="text-sm font-mono font-medium">{row.value}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Success message */}
      {revokeSuccess && (
        <Alert variant="success" title={`${revokeSuccess.kind === 'mint' ? 'Mint' : 'Freeze'} authority revoked`}>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            <span>Transaction confirmed. View on{' '}
              <a href={getExplorerTxUrl(revokeSuccess.sig)} target="_blank" rel="noreferrer" className="underline">
                Solscan
              </a>
            </span>
          </div>
        </Alert>
      )}

      {/* Error */}
      {revokeError && (
        <Alert variant="destructive" title="Revocation failed">
          {revokeError}
        </Alert>
      )}

      {/* Authority actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Revoke Mint Authority */}
        <Card className="border-amber-500/20">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <ShieldOff className="h-4 w-4 text-amber-500" />
              </div>
              <div>
                <CardTitle className="text-sm">Revoke Mint Authority</CardTitle>
                <CardDescription className="text-xs">Fix the total supply forever</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-xs text-muted-foreground leading-relaxed">
              After revoking, <strong>no new tokens can ever be minted</strong>.
              The supply becomes permanently fixed. This is a strong trust signal
              for investors — it proves you cannot dilute the supply.
            </p>
            {!hasMintAuthority ? (
              <div className="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                <CheckCircle2 className="h-4 w-4" /> Already revoked
              </div>
            ) : confirmKind === 'mint' ? (
              <div className="space-y-2">
                <p className="text-xs font-semibold text-destructive">
                  ⚠️ This is permanent and irreversible. Are you sure?
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="destructive"
                    size="sm"
                    disabled={revoking !== null}
                    onClick={() => handleRevoke('mint')}
                  >
                    {revoking === 'mint' ? <><Loader2 className="h-3.5 w-3.5 mr-1 animate-spin" />Revoking...</> : 'Yes, Revoke Forever'}
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setConfirmKind(null)}>Cancel</Button>
                </div>
              </div>
            ) : (
              <Button
                variant="outline"
                size="sm"
                disabled={!isCreator || revoking !== null}
                onClick={() => setConfirmKind('mint')}
              >
                <ShieldOff className="h-3.5 w-3.5 mr-1.5" />
                Revoke Mint Authority
              </Button>
            )}
            {!isCreator && hasMintAuthority && (
              <p className="text-xs text-muted-foreground">
                Only the authority holder can revoke. Connected wallet does not hold this authority.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Revoke Freeze Authority */}
        <Card className="border-blue-500/20">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Lock className="h-4 w-4 text-blue-500" />
              </div>
              <div>
                <CardTitle className="text-sm">Revoke Freeze Authority</CardTitle>
                <CardDescription className="text-xs">Let holders trade freely</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-xs text-muted-foreground leading-relaxed">
              After revoking, <strong>no token account can ever be frozen</strong>.
              Holders can always sell or transfer their tokens. Another trust signal —
              it proves you cannot block trading for specific wallets.
            </p>
            {!hasFreezeAuthority ? (
              <div className="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                <CheckCircle2 className="h-4 w-4" /> Already revoked
              </div>
            ) : confirmKind === 'freeze' ? (
              <div className="space-y-2">
                <p className="text-xs font-semibold text-destructive">
                  ⚠️ This is permanent and irreversible. Are you sure?
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="destructive"
                    size="sm"
                    disabled={revoking !== null}
                    onClick={() => handleRevoke('freeze')}
                  >
                    {revoking === 'freeze' ? <><Loader2 className="h-3.5 w-3.5 mr-1 animate-spin" />Revoking...</> : 'Yes, Revoke Forever'}
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setConfirmKind(null)}>Cancel</Button>
                </div>
              </div>
            ) : (
              <Button
                variant="outline"
                size="sm"
                disabled={!isCreator || revoking !== null}
                onClick={() => setConfirmKind('freeze')}
              >
                <Lock className="h-3.5 w-3.5 mr-1.5" />
                Revoke Freeze Authority
              </Button>
            )}
            {!isCreator && hasFreezeAuthority && (
              <p className="text-xs text-muted-foreground">
                Only the authority holder can revoke this.
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Trust score card */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-brand-500" />
            <CardTitle className="text-base">Token Trust Score</CardTitle>
          </div>
          <CardDescription>
            Signals that make your token more trustworthy to buyers and DEX aggregators
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[
              {
                label: 'Mint authority revoked',
                done: !hasMintAuthority,
                description: 'Supply is permanently fixed',
              },
              {
                label: 'Freeze authority revoked',
                done: !hasFreezeAuthority,
                description: 'Holders can always sell',
              },
              {
                label: 'Metaplex metadata on-chain',
                done: true, // We always attach metadata
                description: 'Name, symbol, and image stored on-chain',
              },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-3 py-2 border-b border-border/50 last:border-0">
                <div className={`mt-0.5 h-4 w-4 rounded-full flex items-center justify-center flex-shrink-0 ${item.done ? 'bg-emerald-500/20' : 'bg-amber-500/20'}`}>
                  {item.done
                    ? <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                    : <AlertTriangle className="h-3 w-3 text-amber-500" />}
                </div>
                <div>
                  <p className="text-sm font-medium">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick links to other actions */}
      <div className="flex flex-wrap gap-3">
        <Button variant="outline" size="sm" asChild>
          <Link href="/dashboard/burn">
            <Flame className="h-3.5 w-3.5 mr-1.5 text-destructive" /> Burn Tokens
          </Link>
        </Button>
        <Button variant="outline" size="sm" asChild>
          <Link href={`/liquidity?mint=${mintAddress}`}>
            Add Liquidity
          </Link>
        </Button>
        <Button variant="outline" size="sm" asChild>
          <Link href="/dashboard">Back to Dashboard</Link>
        </Button>
      </div>
    </div>
  );
}

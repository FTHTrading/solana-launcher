'use client';

import { useState, useEffect, useCallback } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import {
  ArrowRightLeft,
  CheckCircle2,
  Copy,
  ExternalLink,
  Flame,
  Globe,
  Loader2,
  Shield,
  ShieldCheck,
  ShieldX,
  TrendingUp,
  Share2,
  Droplets,
  Link2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert } from '@/components/ui/alert';
import { appConfig, getExplorerTokenUrl, getExplorerAccountUrl } from '@/lib/config/app-config';
import { getPoolsForMint, type PoolInfo } from '@/services/liquidity/liquidity.service';
import Link from 'next/link';

interface TokenPageClientProps {
  mintAddress: string;
}

interface TokenOnChainInfo {
  mintAddress: string;
  supply: string;
  decimals: number;
  mintAuthority: string | null;
  freezeAuthority: string | null;
  isInitialized: boolean;
}

interface MetaplexMetadata {
  name: string;
  symbol: string;
  uri: string;
  image?: string;
  description?: string;
  externalUrl?: string;
  links?: {
    website?: string;
    twitter?: string;
    telegram?: string;
    discord?: string;
  };
}

export function TokenPageClient({ mintAddress }: TokenPageClientProps) {
  const { connected: _connected } = useWallet();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tokenInfo, setTokenInfo] = useState<TokenOnChainInfo | null>(null);
  const [metadata, setMetadata] = useState<MetaplexMetadata | null>(null);
  const [pools, setPools] = useState<PoolInfo[]>([]);
  const [copied, setCopied] = useState(false);

  const fetchTokenData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Fetch mint account info from RPC
      const rpcUrl = appConfig.solana.rpcUrl;
      const mintRes = await fetch(rpcUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 1,
          method: 'getAccountInfo',
          params: [mintAddress, { encoding: 'jsonParsed' }],
        }),
      });

      const mintJson = await mintRes.json();
      const mintData = mintJson?.result?.value?.data?.parsed?.info;

      if (!mintData) {
        setError('Token mint not found on-chain. Check the address and network.');
        setLoading(false);
        return;
      }

      setTokenInfo({
        mintAddress,
        supply: mintData.supply ?? '0',
        decimals: mintData.decimals ?? 0,
        mintAuthority: mintData.mintAuthority ?? null,
        freezeAuthority: mintData.freezeAuthority ?? null,
        isInitialized: mintData.isInitialized ?? false,
      });

      // Fetch Metaplex metadata (Token Metadata PDA)
      try {
        // Use the Metaplex metadata program to derive the PDA
        // For now, try fetching from on-chain metadata account
        const metadataRes = await fetch(rpcUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            jsonrpc: '2.0',
            id: 2,
            method: 'getAsset',
            params: { id: mintAddress },
          }),
        });
        const metadataJson = await metadataRes.json();
        const asset = metadataJson?.result;

        if (asset?.content) {
          const meta: MetaplexMetadata = {
            name: asset.content?.metadata?.name ?? 'Unknown',
            symbol: asset.content?.metadata?.symbol ?? '',
            uri: asset.content?.json_uri ?? '',
            image: asset.content?.links?.image ?? asset.content?.files?.[0]?.uri,
            description: asset.content?.metadata?.description,
            externalUrl: asset.content?.links?.external_url,
          };

          // If we have a JSON URI, fetch the off-chain metadata
          if (meta.uri) {
            try {
              const jsonRes = await fetch(meta.uri, {
                signal: AbortSignal.timeout(5_000),
              });
              if (jsonRes.ok) {
                const offChain = await jsonRes.json();
                meta.image = meta.image || offChain.image;
                meta.description = meta.description || offChain.description;
                meta.externalUrl = meta.externalUrl || offChain.external_url;
                meta.links = offChain.properties?.links;
              }
            } catch {
              // Non-fatal: off-chain metadata fetch failure
            }
          }

          setMetadata(meta);
        }
      } catch {
        // Non-fatal: metadata lookup failure
      }

      // Fetch pools
      try {
        const poolResults = await getPoolsForMint(mintAddress);
        setPools(poolResults);
      } catch {
        // Non-fatal
      }
    } catch {
      setError('Failed to fetch token data. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [mintAddress]);

  useEffect(() => {
    fetchTokenData();
  }, [fetchTokenData]);

  const copyAddress = () => {
    navigator.clipboard.writeText(mintAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-brand-500" />
        <span className="ml-3 text-muted-foreground">Loading token data...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto py-12 space-y-4">
        <Alert variant="destructive" title="Token Not Found">
          <p>{error}</p>
          <p className="mt-2 text-xs text-muted-foreground">
            Mint: {mintAddress}
            <br />
            Network: {appConfig.solana.network}
          </p>
        </Alert>
        <Button variant="outline" asChild>
          <Link href="/dashboard">← Back to Dashboard</Link>
        </Button>
      </div>
    );
  }

  const mintRevoked = !tokenInfo?.mintAuthority;
  const freezeRevoked = !tokenInfo?.freezeAuthority;
  const trustScore =
    (mintRevoked ? 1 : 0) +
    (freezeRevoked ? 1 : 0) +
    (metadata ? 1 : 0) +
    (pools.length > 0 ? 1 : 0);

  const trustLabel =
    trustScore >= 4
      ? 'High Trust'
      : trustScore >= 2
        ? 'Moderate Trust'
        : 'Low Trust';

  const trustColor =
    trustScore >= 4
      ? 'text-emerald-500'
      : trustScore >= 2
        ? 'text-amber-500'
        : 'text-red-500';

  const displaySupply = tokenInfo
    ? (
        BigInt(tokenInfo.supply) /
        BigInt(10 ** tokenInfo.decimals)
      ).toLocaleString()
    : '0';

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start gap-4">
        {metadata?.image && (
          <img
            src={metadata.image}
            alt={metadata.name}
            className="h-16 w-16 rounded-xl object-cover shadow-md"
          />
        )}
        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">
              {metadata?.name ?? 'Unknown Token'}
            </h1>
            {metadata?.symbol && (
              <Badge variant="secondary">{metadata.symbol}</Badge>
            )}
            <Badge
              variant={trustScore >= 3 ? 'success' : trustScore >= 2 ? 'warning' : 'destructive'}
            >
              {trustLabel}
            </Badge>
          </div>
          {metadata?.description && (
            <p className="text-sm text-muted-foreground max-w-lg">
              {metadata.description}
            </p>
          )}
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <code className="bg-muted px-1.5 py-0.5 rounded text-[11px]">
              {mintAddress.slice(0, 8)}...{mintAddress.slice(-6)}
            </code>
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={copyAddress}>
              {copied ? (
                <CheckCircle2 className="h-3 w-3 text-emerald-500" />
              ) : (
                <Copy className="h-3 w-3" />
              )}
            </Button>
            <a
              href={getExplorerTokenUrl(mintAddress)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-foreground transition-colors"
            >
              Solscan <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(shareUrl)}>
            <Share2 className="h-3.5 w-3.5 mr-1.5" />
            Share
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard label="Total Supply" value={displaySupply} icon={<TrendingUp className="h-4 w-4" />} />
        <StatCard label="Decimals" value={String(tokenInfo?.decimals ?? 0)} icon={<Globe className="h-4 w-4" />} />
        <StatCard
          label="Mint Authority"
          value={mintRevoked ? 'Revoked ✓' : 'Active'}
          icon={mintRevoked ? <ShieldCheck className="h-4 w-4 text-emerald-500" /> : <ShieldX className="h-4 w-4 text-amber-500" />}
        />
        <StatCard
          label="Freeze Authority"
          value={freezeRevoked ? 'Revoked ✓' : 'Active'}
          icon={freezeRevoked ? <ShieldCheck className="h-4 w-4 text-emerald-500" /> : <ShieldX className="h-4 w-4 text-amber-500" />}
        />
      </div>

      {/* Trust Score */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Trust Score
          </CardTitle>
          <CardDescription>On-chain verification of token safety signals</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">
                <span className={trustColor}>{trustScore}</span>
                <span className="text-muted-foreground text-lg">/4</span>
              </span>
              <Badge variant={trustScore >= 3 ? 'success' : 'warning'}>{trustLabel}</Badge>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <TrustItem label="Mint Authority Revoked" passed={mintRevoked} />
              <TrustItem label="Freeze Authority Revoked" passed={freezeRevoked} />
              <TrustItem label="On-Chain Metadata" passed={!!metadata} />
              <TrustItem label="Liquidity Pool Found" passed={pools.length > 0} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Liquidity Pools */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Droplets className="h-4 w-4" />
            Liquidity Pools ({pools.length})
          </CardTitle>
          <CardDescription>
            Active trading pairs found on Solana DEXs
          </CardDescription>
        </CardHeader>
        <CardContent>
          {pools.length === 0 ? (
            <div className="text-center py-6 space-y-3">
              <p className="text-sm text-muted-foreground">
                No liquidity pools found for this token.
              </p>
              <div className="flex justify-center gap-2">
                <Button size="sm" variant="outline" asChild>
                  <Link href={`/liquidity?mint=${mintAddress}`}>
                    <Droplets className="h-3.5 w-3.5 mr-1.5" />
                    Add Liquidity
                  </Link>
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {pools.map((pool) => (
                <div
                  key={pool.poolAddress}
                  className="flex items-center justify-between p-3 rounded-lg border bg-muted/30"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{pool.provider}</Badge>
                      <span className="text-sm font-medium">
                        {pool.price > 0 ? `$${pool.price.toFixed(6)}` : 'Price unavailable'}
                      </span>
                    </div>
                    <code className="text-[11px] text-muted-foreground">
                      {pool.poolAddress.slice(0, 8)}...{pool.poolAddress.slice(-6)}
                    </code>
                  </div>
                  <Button size="sm" variant="outline" asChild>
                    <a
                      href={getExplorerAccountUrl(pool.poolAddress)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button variant="outline" className="h-auto py-3 flex-col gap-1" asChild>
              <Link href={`/dashboard/manage/${mintAddress}`}>
                <Shield className="h-4 w-4" />
                <span className="text-xs">Manage</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto py-3 flex-col gap-1" asChild>
              <Link href={`/dashboard/burn?mint=${mintAddress}`}>
                <Flame className="h-4 w-4" />
                <span className="text-xs">Burn</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto py-3 flex-col gap-1" asChild>
              <Link href={`/trade?mint=${mintAddress}`}>
                <ArrowRightLeft className="h-4 w-4" />
                <span className="text-xs">Trade</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto py-3 flex-col gap-1" asChild>
              <Link href={`/liquidity?mint=${mintAddress}`}>
                <Droplets className="h-4 w-4" />
                <span className="text-xs">Liquidity</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Social Links */}
      {metadata?.links && Object.values(metadata.links).some(Boolean) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Link2 className="h-4 w-4" />
              Links
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {metadata.links.website && (
                <Button variant="outline" size="sm" asChild>
                  <a href={metadata.links.website} target="_blank" rel="noopener noreferrer">
                    <Globe className="h-3.5 w-3.5 mr-1.5" />
                    Website
                  </a>
                </Button>
              )}
              {metadata.links.twitter && (
                <Button variant="outline" size="sm" asChild>
                  <a href={metadata.links.twitter} target="_blank" rel="noopener noreferrer">
                    Twitter
                    <ExternalLink className="h-3 w-3 ml-1.5" />
                  </a>
                </Button>
              )}
              {metadata.links.telegram && (
                <Button variant="outline" size="sm" asChild>
                  <a href={metadata.links.telegram} target="_blank" rel="noopener noreferrer">
                    Telegram
                    <ExternalLink className="h-3 w-3 ml-1.5" />
                  </a>
                </Button>
              )}
              {metadata.links.discord && (
                <Button variant="outline" size="sm" asChild>
                  <a href={metadata.links.discord} target="_blank" rel="noopener noreferrer">
                    Discord
                    <ExternalLink className="h-3 w-3 ml-1.5" />
                  </a>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// ── Sub-components ──────────────────────────────────────────

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <Card>
      <CardContent className="pt-4 pb-4">
        <div className="flex items-center gap-2 text-muted-foreground mb-1">
          {icon}
          <span className="text-xs">{label}</span>
        </div>
        <p className="text-sm font-semibold truncate">{value}</p>
      </CardContent>
    </Card>
  );
}

function TrustItem({ label, passed }: { label: string; passed: boolean }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      {passed ? (
        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0" />
      ) : (
        <ShieldX className="h-3.5 w-3.5 text-amber-500 flex-shrink-0" />
      )}
      <span className={passed ? 'text-foreground' : 'text-muted-foreground'}>
        {label}
      </span>
    </div>
  );
}

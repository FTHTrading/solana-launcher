'use client';

import { useState, useEffect, useCallback } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import {
  ArrowRight,
  BarChart3,
  ExternalLink,
  Loader2,
  Plus,
  RefreshCw,
  Droplets,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { getPoolsForMint, type PoolInfo, type DexProvider } from '@/services/liquidity/liquidity.service';

interface LiquidityClientProps {
  initialMint?: string;
}

export function LiquidityClient({ initialMint = '' }: LiquidityClientProps) {
  const { connected } = useWallet();
  const { setVisible } = useWalletModal();

  const [mintInput, setMintInput] = useState(initialMint);
  const [pools, setPools] = useState<PoolInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<DexProvider>('raydium');

  const fetchPools = useCallback(async (mint: string) => {
    if (!mint.trim() || mint.trim().length < 32) return;
    setLoading(true);
    setSearched(false);
    try {
      const results = await getPoolsForMint(mint.trim());
      setPools(results);
    } catch {
      setPools([]);
    } finally {
      setLoading(false);
      setSearched(true);
    }
  }, []);

  useEffect(() => {
    if (initialMint) fetchPools(initialMint);
  }, [initialMint, fetchPools]);

  if (!connected) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4 text-center">
        <h2 className="text-xl font-semibold">Connect Your Wallet</h2>
        <p className="text-muted-foreground max-w-sm">
          Connect your Solana wallet to manage liquidity.
        </p>
        <Button variant="gradient" size="lg" onClick={() => setVisible(true)}>
          Connect Wallet
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Explainer */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Droplets className="h-5 w-5 text-brand-500 mt-0.5 flex-shrink-0" />
            <div className="space-y-1">
              <p className="font-medium text-sm">Liquidity Management</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Adding liquidity creates a trading pair for your token on a decentralised exchange.
                Users can then swap SOL for your token — this is what gives it a live price.
                Supported DEXs: <strong>Raydium AMM V4</strong> and <strong>Meteora DLMM</strong>.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pool lookup */}
      <div className="space-y-3">
        <div className="flex gap-2">
          <Input
            label="Token Mint Address"
            placeholder="Enter your token mint address..."
            value={mintInput}
            onChange={(e) => setMintInput(e.target.value)}
            hint="Paste the mint address from your launch success screen or dashboard"
          />
        </div>
        <Button
          variant="outline"
          onClick={() => fetchPools(mintInput)}
          disabled={loading || mintInput.length < 32}
        >
          {loading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Searching...</> : <><RefreshCw className="h-4 w-4 mr-2" />Find Existing Pools</>}
        </Button>
      </div>

      {/* Existing pools */}
      {searched && (
        <div className="space-y-3">
          <h2 className="text-base font-semibold">
            Existing Pools ({pools.length})
          </h2>
          {pools.length === 0 ? (
            <Card>
              <CardContent className="pt-6 pb-8 text-center space-y-2">
                <p className="text-muted-foreground text-sm">
                  No liquidity pools found for this token yet.
                </p>
                <p className="text-xs text-muted-foreground">
                  Create the first pool below to set the initial price.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {pools.map((pool) => (
                <PoolCard key={pool.poolAddress} pool={pool} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Create new pool */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold">Add Liquidity</h2>
          <div className="flex gap-2">
            {(['raydium', 'meteora'] as DexProvider[]).map((p) => (
              <button
                key={p}
                onClick={() => setSelectedProvider(p)}
                className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                  selectedProvider === p
                    ? 'bg-brand-500 text-white border-brand-500'
                    : 'border-border text-muted-foreground hover:border-brand-500/50'
                }`}
              >
                {p === 'raydium' ? 'Raydium AMM V4' : 'Meteora DLMM'}
              </button>
            ))}
          </div>
        </div>

        {selectedProvider === 'raydium' && (
          <RaydiumAddLiquidity mintAddress={mintInput} />
        )}
        {selectedProvider === 'meteora' && (
          <MeteoraAddLiquidity mintAddress={mintInput} />
        )}
      </div>
    </div>
  );
}

// ── Raydium UI ────────────────────────────────────────────────

function RaydiumAddLiquidity({ mintAddress }: { mintAddress: string }) {
  const [solAmount, setSolAmount] = useState('');
  const [tokenAmount, setTokenAmount] = useState('');

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <CardTitle className="text-sm">Raydium AMM V4</CardTitle>
          <Badge variant="info">Standard AMM</Badge>
        </div>
        <CardDescription>
          Creates a constant-product SOL/TOKEN pool. Users can swap at any time
          once the pool is live. ~0.4 SOL pool creation fee applies on mainnet.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert variant="warning" title="Prerequisites">
          <ul className="text-xs space-y-1 mt-1">
            <li>→ Token must have on-chain Metaplex metadata (done if launched here)</li>
            <li>→ You need an OpenBook v2 market for TOKEN/SOL first</li>
            <li>→ ~0.4 SOL for pool creation rent on mainnet</li>
          </ul>
        </Alert>

        <div className="grid grid-cols-2 gap-3">
          <Input
            label="SOL Amount"
            type="number"
            placeholder="e.g. 1.5"
            value={solAmount}
            onChange={(e) => setSolAmount(e.target.value)}
            hint="Initial SOL liquidity"
          />
          <Input
            label="Token Amount"
            type="text"
            placeholder="e.g. 500000000"
            value={tokenAmount}
            onChange={(e) => setTokenAmount(e.target.value)}
            hint="Initial token liquidity (raw units)"
          />
        </div>

        {solAmount && tokenAmount && (
          <div className="p-3 bg-muted/50 rounded-lg text-xs space-y-1">
            <p className="font-medium">Implied initial price</p>
            <p className="text-muted-foreground font-mono">
              1 {tokenAmount ? 'TOKEN' : '...'} ={' '}
              {solAmount && tokenAmount
                ? (parseFloat(solAmount) / parseFloat(tokenAmount)).toFixed(10)
                : '...'}{' '}
              SOL
            </p>
          </div>
        )}

        <div className="flex gap-2">
          <Button
            variant="gradient"
            disabled={!mintAddress || !solAmount || !tokenAmount}
            onClick={() => window.open(
              `https://raydium.io/liquidity/create-pool/?inputCurrency=sol&outputCurrency=${mintAddress}`,
              '_blank'
            )}
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Pool on Raydium
            <ExternalLink className="h-3 w-3 ml-1.5" />
          </Button>
        </div>

        <p className="text-xs text-muted-foreground">
          Opens Raydium pool creation with your token pre-filled.
          Full in-app pool creation with transaction builder is available as an upgrade.
        </p>
      </CardContent>
    </Card>
  );
}

// ── Meteora UI ────────────────────────────────────────────────

function MeteoraAddLiquidity({ mintAddress }: { mintAddress: string }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <CardTitle className="text-sm">Meteora DLMM</CardTitle>
          <Badge variant="info">Concentrated Liquidity</Badge>
        </div>
        <CardDescription>
          Dynamic Liquidity Market Maker — allows concentrated liquidity
          at specific price bins for higher capital efficiency.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert variant="info" title="DLMM Overview">
          <p className="text-xs mt-1">
            DLMM pools let you concentrate liquidity in a price range,
            earning more fees per SOL provided vs a standard AMM. Best for
            tokens with expected stable trading ranges.
          </p>
        </Alert>

        <div className="flex gap-2">
          <Button
            variant="outline"
            disabled={!mintAddress}
            onClick={() => window.open(
              `https://app.meteora.ag/dlmm/create?tokenMint=${mintAddress}`,
              '_blank'
            )}
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            Create DLMM Pool on Meteora
            <ExternalLink className="h-3 w-3 ml-1.5" />
          </Button>
        </div>

        <p className="text-xs text-muted-foreground">
          Full in-app DLMM pool creation with bin configuration is available as an upgrade.
        </p>
      </CardContent>
    </Card>
  );
}

// ── Pool card ────────────────────────────────────────────────

function PoolCard({ pool }: { pool: PoolInfo }) {
  const price = pool.price > 0
    ? pool.price < 0.00001
      ? pool.price.toExponential(4)
      : pool.price.toFixed(8)
    : 'N/A';

  const explorerUrl = pool.provider === 'raydium'
    ? `https://raydium.io/liquidity/increase/?mode=add&pool_id=${pool.poolAddress}`
    : `https://app.meteora.ag/dlmm/${pool.poolAddress}`;

  return (
    <Card>
      <CardContent className="pt-4 pb-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Badge variant={pool.provider === 'raydium' ? 'default' : 'info'} className="capitalize">
                {pool.provider}
              </Badge>
              <span className="font-mono text-xs text-muted-foreground">
                {pool.poolAddress.slice(0, 8)}...{pool.poolAddress.slice(-6)}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">Price: {price} SOL/token</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild>
              <a href={explorerUrl} target="_blank" rel="noopener noreferrer">
                Add Liquidity <ArrowRight className="h-3 w-3 ml-1" />
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

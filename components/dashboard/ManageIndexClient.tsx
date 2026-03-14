'use client';

import { useCallback, useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Search, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { getWalletTokenAccounts, type TokenAccount } from '@/lib/solana/portfolio';
import { truncateAddress } from '@/lib/utils/utils';

export function ManageIndexClient() {
  const { connected, publicKey } = useWallet();
  const router = useRouter();

  const [mintInput, setMintInput] = useState('');
  const [mintInputError, setMintInputError] = useState('');
  const [tokens, setTokens] = useState<TokenAccount[]>([]);
  const [loadingTokens, setLoadingTokens] = useState(false);

  const loadTokens = useCallback(async () => {
    if (!publicKey) return;
    setLoadingTokens(true);
    try {
      const accounts = await getWalletTokenAccounts(publicKey.toBase58());
      setTokens(accounts);
    } catch {
      setTokens([]);
    } finally {
      setLoadingTokens(false);
    }
  }, [publicKey]);

  useEffect(() => {
    if (connected && publicKey) loadTokens();
  }, [connected, publicKey, loadTokens]);

  function handleManualSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = mintInput.trim();
    if (!trimmed) {
      setMintInputError('Enter a mint address.');
      return;
    }
    // Basic base58 length check (Solana pubkeys are 32–44 chars)
    if (trimmed.length < 32 || trimmed.length > 44) {
      setMintInputError('That does not look like a valid Solana mint address.');
      return;
    }
    setMintInputError('');
    router.push(`/dashboard/manage/${trimmed}`);
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Manage Token Authority</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Revoke mint or freeze authority to increase token trust score and qualify for DEX listings.
        </p>
      </div>

      {/* Manual address entry */}
      <Card>
        <CardContent className="pt-6">
          <p className="text-sm font-medium mb-3">Enter mint address</p>
          <form onSubmit={handleManualSubmit} className="flex gap-3">
            <div className="flex-1">
              <Input
                placeholder="e.g. 7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU"
                value={mintInput}
                onChange={(e) => {
                  setMintInput(e.target.value);
                  setMintInputError('');
                }}
                error={mintInputError}
              />
            </div>
            <Button type="submit" variant="default">
              <Search className="h-4 w-4 mr-1.5" />
              Manage
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Wallet tokens */}
      <div>
        <p className="text-sm font-medium mb-3">
          Or pick from your wallet{' '}
          <span className="text-muted-foreground font-normal">
            ({tokens.length} token{tokens.length !== 1 ? 's' : ''} found)
          </span>
        </p>

        {loadingTokens && (
          <div className="grid gap-3">
            {[1, 2].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="pt-4 pb-4 h-16" />
              </Card>
            ))}
          </div>
        )}

        {!loadingTokens && tokens.length === 0 && (
          <Card>
            <CardContent className="pt-6 pb-6 text-center text-sm text-muted-foreground">
              No tokens with non-zero balance found in this wallet.
              You can still enter a mint address manually above.
            </CardContent>
          </Card>
        )}

        {!loadingTokens && tokens.length > 0 && (
          <div className="grid gap-3">
            {tokens.map((token) => (
              <Card
                key={token.mintAddress}
                className="hover:shadow-sm hover:border-orange-500/30 transition-all cursor-pointer"
              >
                <CardContent className="pt-4 pb-4">
                  <Link
                    href={`/dashboard/manage/${token.mintAddress}`}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      {token.imageUri ? (
                        <Image
                          src={token.imageUri}
                          alt={token.symbol ?? 'token'}
                          width={36}
                          height={36}
                          className="h-9 w-9 rounded-full object-cover border border-border"
                          unoptimized
                          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                        />
                      ) : (
                        <div className="h-9 w-9 rounded-full bg-orange-500/15 flex items-center justify-center shrink-0">
                          <span className="text-xs font-bold text-orange-500">
                            {(token.symbol ?? '??').slice(0, 2)}
                          </span>
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-sm">{token.name ?? 'Unknown Token'}</p>
                        <p className="text-xs text-muted-foreground font-mono">
                          {truncateAddress(token.mintAddress)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>
                        {token.uiAmount.toLocaleString('en-US', { maximumFractionDigits: 4 })}{' '}
                        {token.symbol ?? ''}
                      </span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <div className="pt-2">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard">← Back to Dashboard</Link>
        </Button>
      </div>
    </div>
  );
}

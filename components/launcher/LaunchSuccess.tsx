'use client';

import Link from 'next/link';
import { CheckCircle2, Copy, ExternalLink, LayoutDashboard, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getExplorerTokenUrl, getExplorerTxUrl } from '@/lib/config/app-config';
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

      {/* Next steps */}
      <div className="text-left rounded-xl border border-border bg-muted/20 p-4">
        <p className="text-sm font-medium mb-2">Next steps:</p>
        <ul className="space-y-1.5 text-sm text-muted-foreground list-disc list-inside">
          <li>Share your mint address with your community</li>
          <li>Add your token to a DEX for trading (coming soon)</li>
          <li>List your token on Solscan or CoinGecko</li>
          <li>Use the dashboard to view and manage your token</li>
        </ul>
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

'use client';

import { useState } from 'react';
import { CheckCircle2, Copy, ExternalLink, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getExplorerTxUrl, getExplorerTokenUrl } from '@/lib/config/app-config';
import { truncateAddress } from '@/lib/utils/utils';

// =============================================
// TRANSACTION RESULT CARD
//
// Reusable success / error state for any
// on-chain operation (launch, burn, revoke).
// Shows explorer links, copy-to-clipboard,
// and optional reset action.
// =============================================

interface TransactionResultCardProps {
  variant?: 'success' | 'error';
  title: string;
  description?: string;
  txSignature: string;
  mintAddress?: string;
  onReset?: () => void;
  resetLabel?: string;
  children?: React.ReactNode;
}

export function TransactionResultCard({
  variant = 'success',
  title,
  description,
  txSignature,
  mintAddress,
  onReset,
  resetLabel,
  children,
}: TransactionResultCardProps) {
  const [copied, setCopied] = useState<'mint' | 'tx' | null>(null);

  const copy = async (text: string, key: 'mint' | 'tx') => {
    await navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const isSuccess = variant === 'success';

  return (
    <Card>
      <CardContent className="pt-8 pb-8 space-y-5">
        {/* Icon + Title */}
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <div
              className={`h-14 w-14 rounded-full flex items-center justify-center ${
                isSuccess ? 'bg-emerald-500/10' : 'bg-destructive/10'
              }`}
            >
              {isSuccess ? (
                <CheckCircle2 className="h-7 w-7 text-emerald-500" />
              ) : (
                <XCircle className="h-7 w-7 text-destructive" />
              )}
            </div>
          </div>
          <p className="text-lg font-semibold">{title}</p>
          {description && (
            <p className="text-sm text-muted-foreground max-w-md mx-auto">{description}</p>
          )}
        </div>

        {/* Addresses */}
        <div className="bg-muted/30 rounded-xl border border-border divide-y divide-border text-left overflow-hidden">
          {/* Mint address (optional) */}
          {mintAddress && (
            <div className="px-4 py-3 space-y-1">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Token Mint Address
              </p>
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-sm break-all">{mintAddress}</span>
                <button
                  onClick={() => copy(mintAddress, 'mint')}
                  className="flex-shrink-0 text-muted-foreground hover:text-foreground transition-colors"
                  title="Copy mint address"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>
              {copied === 'mint' && (
                <p className="text-xs text-emerald-500">Copied!</p>
              )}
            </div>
          )}

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
                title="Copy transaction signature"
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
              href={getExplorerTxUrl(txSignature)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              View Transaction
            </a>
          </Button>
          {mintAddress && (
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
          )}
        </div>

        {/* Extra children (e.g. next steps) */}
        {children}

        {/* Reset action */}
        {onReset && (
          <div className="text-center">
            <Button variant="ghost" size="sm" onClick={onReset}>
              {resetLabel ?? 'Done'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

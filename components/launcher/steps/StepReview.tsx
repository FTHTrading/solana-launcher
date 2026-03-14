'use client';

import type { UseFormReturn } from 'react-hook-form';
import type { TokenFormData } from '@/lib/validation/token-schemas';
import { calculateFees } from '@/services/fees/fees.service';
import { formatNumber } from '@/lib/utils/utils';
import { ImageIcon } from 'lucide-react';
import { appConfig } from '@/lib/config/app-config';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

interface StepReviewProps {
  form: UseFormReturn<TokenFormData>;
  tosAccepted: boolean;
  onTosChange: (v: boolean) => void;
}

export function StepReview({ form, tosAccepted, onTosChange }: StepReviewProps) {
  const values = form.getValues();
  const fees = calculateFees();
  const imagePreview =
    values.image instanceof File ? URL.createObjectURL(values.image) : null;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Review Your Token</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Carefully review all details. Some values cannot be changed after launch.
        </p>
      </div>

      {/* Token identity */}
      <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/40 border border-border">
        <div className="h-16 w-16 rounded-xl flex-shrink-0 overflow-hidden border border-border bg-muted flex items-center justify-center">
          {imagePreview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={imagePreview} alt="" className="h-full w-full object-cover" />
          ) : (
            <ImageIcon className="h-6 w-6 text-muted-foreground" />
          )}
        </div>
        <div>
          <p className="font-semibold text-lg">{values.name}</p>
          <p className="text-sm text-muted-foreground font-mono">{values.symbol}</p>
          {values.website && (
            <a
              href={values.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-brand-500 hover:underline"
            >
              {values.website}
            </a>
          )}
        </div>
      </div>

      {/* Token config */}
      <div className="space-y-1">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Configuration
        </p>
        <div className="divide-y divide-border rounded-xl border border-border overflow-hidden">
          {[
            { label: 'Name', value: values.name },
            { label: 'Symbol', value: values.symbol },
            { label: 'Total Supply', value: formatNumber(values.totalSupply) },
            { label: 'Decimals', value: String(values.decimals) },
          ].map((row) => (
            <div key={row.label} className="flex items-center justify-between px-4 py-3">
              <span className="text-sm text-muted-foreground">{row.label}</span>
              <span className="text-sm font-medium font-mono">{row.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Social links */}
      {(values.twitter || values.telegram || values.discord) && (
        <div className="space-y-1">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Social Links
          </p>
          <div className="space-y-1">
            {values.twitter && (
              <p className="text-sm text-muted-foreground">
                Twitter:{' '}
                <a href={values.twitter} target="_blank" rel="noreferrer" className="text-foreground hover:underline">
                  {values.twitter}
                </a>
              </p>
            )}
            {values.telegram && (
              <p className="text-sm text-muted-foreground">
                Telegram:{' '}
                <a href={values.telegram} target="_blank" rel="noreferrer" className="text-foreground hover:underline">
                  {values.telegram}
                </a>
              </p>
            )}
            {values.discord && (
              <p className="text-sm text-muted-foreground">
                Discord:{' '}
                <a href={values.discord} target="_blank" rel="noreferrer" className="text-foreground hover:underline">
                  {values.discord}
                </a>
              </p>
            )}
          </div>
        </div>
      )}

      {/* Fee breakdown */}
      <div className="space-y-1">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          What You are Paying
        </p>
        <div className="rounded-xl border border-border overflow-hidden">
          <div className="divide-y divide-border">
            <div className="flex items-center justify-between px-4 py-3">
              <span className="text-sm text-muted-foreground">Platform fee</span>
              <span className="text-sm font-mono">{fees.platformFeeSOL} SOL</span>
            </div>
            <div className="flex items-center justify-between px-4 py-3">
              <span className="text-sm text-muted-foreground">Estimated network fee</span>
              <span className="text-sm font-mono text-muted-foreground">~{fees.estimatedNetworkFeeSOL} SOL</span>
            </div>
            <div className="flex items-center justify-between px-4 py-3 bg-muted/30">
              <span className="text-sm font-medium">Estimated total</span>
              <span className="font-mono font-bold">~{fees.totalEstimatedSOL.toFixed(3)} SOL</span>
            </div>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Network: <Badge variant="devnet" className="text-xs">{appConfig.solana.network}</Badge>
          {' '}• Treasury: <span className="font-mono">{fees.treasuryWallet ? fees.treasuryWallet.slice(0, 8) + '...' : 'Not configured'}</span>
        </p>
      </div>

      {/* Signing intent */}
      <div className="rounded-xl border border-border bg-muted/20 p-4 space-y-2">
        <p className="text-sm font-medium">You are about to sign transactions that will:</p>
        <ul className="space-y-1.5 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-brand-500 mt-0.5">→</span>
            Create a new SPL token mint on Solana {appConfig.solana.network}
          </li>
          <li className="flex items-start gap-2">
            <span className="text-brand-500 mt-0.5">→</span>
            Mint {formatNumber(values.totalSupply)} {values.symbol} to your wallet
          </li>
          <li className="flex items-start gap-2">
            <span className="text-brand-500 mt-0.5">→</span>
            Upload metadata and image to IPFS
          </li>
          <li className="flex items-start gap-2">
            <span className="text-brand-500 mt-0.5">→</span>
            Pay {fees.platformFeeSOL} SOL platform fee to the treasury
          </li>
        </ul>
      </div>

      {/* Terms and Risk Acceptance */}
      <div className="rounded-xl border border-border p-4 space-y-3">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Acknowledgements Required
        </p>
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={tosAccepted}
            onChange={(e) => onTosChange(e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-gray-300 accent-brand-500 cursor-pointer"
          />
          <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors leading-relaxed">
            I have read and agree to the{' '}
            <Link href="/terms" target="_blank" className="underline text-brand-500 hover:text-brand-600">
              Terms of Service
            </Link>
            {', '}
            <Link href="/risk-disclosure" target="_blank" className="underline text-brand-500 hover:text-brand-600">
              Risk Disclosure
            </Link>
            {', and '}
            <Link href="/privacy" target="_blank" className="underline text-brand-500 hover:text-brand-600">
              Privacy Policy
            </Link>
            {'. I confirm that creating tokens is legal in my jurisdiction, and I am solely responsible for any applicable regulatory compliance.'}
          </span>
        </label>
        {!tosAccepted && (
          <p className="text-xs text-amber-500">
            You must accept the terms before proceeding to launch.
          </p>
        )}
      </div>
    </div>
  );
}

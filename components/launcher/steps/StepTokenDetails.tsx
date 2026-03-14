'use client';

import type { UseFormReturn } from 'react-hook-form';
import type { TokenFormData } from '@/lib/validation/token-schemas';
import { Input } from '@/components/ui/input';
import { appConfig } from '@/lib/config/app-config';
import { TokenPresets } from '@/components/launcher/TokenPresets';

interface StepTokenDetailsProps {
  form: UseFormReturn<TokenFormData>;
}

export function StepTokenDetails({ form }: StepTokenDetailsProps) {
  const {
    register,
    formState: { errors },
    watch,
  } = form;

  const name = watch('name');
  const symbol = watch('symbol');
  const decimals = watch('decimals');
  const totalSupply = watch('totalSupply');

  // Token economics preview
  const supplyNum = (() => {
    try { return Number(BigInt(totalSupply || '0')); } catch { return 0; }
  })();
  const displaySupply = supplyNum > 0
    ? supplyNum.toLocaleString('en-US', { maximumFractionDigits: 0 })
    : null;
  const smallestUnit = decimals >= 0 && decimals <= 18
    ? (1 / 10 ** decimals).toFixed(Math.min(decimals, 9))
    : null;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Token Details</h2>
        <p className="text-sm text-muted-foreground mt-1">
          These values are stored on-chain and cannot be changed after launch.
        </p>
      </div>

      {/* Quick presets */}
      <TokenPresets form={form} />

      {/* Live preview badge */}
      {(name || symbol) && (
        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border">
          <div className="h-8 w-8 rounded-full bg-brand-500/20 flex items-center justify-center">
            <span className="text-xs font-bold text-brand-500">
              {symbol?.slice(0, 2) || '??'}
            </span>
          </div>
          <div>
            <p className="text-sm font-medium">{name || 'Your Token'}</p>
            <p className="text-xs text-muted-foreground">{symbol || 'SYMBOL'}</p>
          </div>
        </div>
      )}

      <div className="grid gap-4">
        <Input
          label="Token Name"
          placeholder="e.g. My Awesome Coin"
          error={errors.name?.message}
          hint={`Max ${appConfig.token.maxNameLength} characters. This is what users will see.`}
          required
          {...register('name')}
        />

        <Input
          label="Token Symbol"
          placeholder="e.g. MAC"
          error={errors.symbol?.message}
          hint={`Max ${appConfig.token.maxSymbolLength} characters. Uppercase only (e.g. BTC, SOL, DOGE).`}
          required
          {...register('symbol')}
          onChange={(e) => {
            e.target.value = e.target.value.toUpperCase();
            form.setValue('symbol', e.target.value, { shouldValidate: true });
          }}
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Decimals"
            type="number"
            min={appConfig.token.minDecimals}
            max={appConfig.token.maxDecimals}
            error={errors.decimals?.message}
            hint="Usually 6 or 9. This affects how tokens are divided."
            required
            {...register('decimals', { valueAsNumber: true })}
          />

          <Input
            label="Total Supply"
            type="text"
            inputMode="numeric"
            placeholder="e.g. 1000000000"
            error={errors.totalSupply?.message}
            hint="Total tokens to mint. Whole numbers only."
            required
            {...register('totalSupply')}
          />
        </div>
      </div>

      {/* Live economics preview */}
      {displaySupply && symbol && (
        <div className="rounded-xl border border-border bg-muted/30 p-4 space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Token Economics Preview
          </p>
          <div className="divide-y divide-border/50">
            {[
              { label: 'Total supply (wallet display)', value: `${displaySupply} ${symbol}` },
              { label: 'Decimals', value: String(decimals ?? 6) },
              { label: 'Smallest unit', value: smallestUnit ? `${smallestUnit} ${symbol}` : '—' },
              {
                label: 'Example: 1% of supply',
                value: supplyNum > 0
                  ? `${(supplyNum * 0.01).toLocaleString('en-US', { maximumFractionDigits: 0 })} ${symbol}`
                  : '—',
              },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between py-2">
                <span className="text-xs text-muted-foreground">{row.label}</span>
                <span className="text-xs font-mono font-medium">{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Info box */}
      <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-amber-800 dark:text-amber-300">
        <strong>Important:</strong> Token name, symbol, decimals, and mint address are
        permanent once deployed. Double-check everything before moving forward.
      </div>
    </div>
  );
}

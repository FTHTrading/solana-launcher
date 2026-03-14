'use client';

import type { UseFormReturn } from 'react-hook-form';
import type { TokenFormData } from '@/lib/validation/token-schemas';
import { Zap } from 'lucide-react';

interface LaunchPreset {
  id: string;
  name: string;
  emoji: string;
  description: string;
  values: Pick<TokenFormData, 'decimals' | 'totalSupply'>;
  badge?: string;
}

const PRESETS: LaunchPreset[] = [
  {
    id: 'meme-classic',
    name: 'Meme Classic',
    emoji: '🐸',
    description: '1 billion supply, 9 decimals. The standard meme coin template.',
    values: { decimals: 9, totalSupply: '1000000000' },
    badge: 'Most Popular',
  },
  {
    id: 'meme-trillion',
    name: 'Meme Maxi',
    emoji: '🚀',
    description: '1 trillion supply, 6 decimals. Maximum supply vibes.',
    values: { decimals: 6, totalSupply: '1000000000000' },
  },
  {
    id: 'community',
    name: 'Community Token',
    emoji: '🤝',
    description: '100 million supply, 6 decimals. Moderate supply for communities.',
    values: { decimals: 6, totalSupply: '100000000' },
  },
  {
    id: 'premium',
    name: 'Premium / Scarce',
    emoji: '💎',
    description: '21 million supply, 8 decimals. Bitcoin-inspired scarcity.',
    values: { decimals: 8, totalSupply: '21000000' },
  },
  {
    id: 'governance',
    name: 'Governance',
    emoji: '🏛️',
    description: '10 million supply, 0 decimals. Whole-unit voting tokens.',
    values: { decimals: 0, totalSupply: '10000000' },
  },
];

interface TokenPresetsProps {
  form: UseFormReturn<TokenFormData>;
}

export function TokenPresets({ form }: TokenPresetsProps) {
  const applyPreset = (preset: LaunchPreset) => {
    form.setValue('decimals', preset.values.decimals, { shouldValidate: true, shouldDirty: true });
    form.setValue('totalSupply', preset.values.totalSupply, { shouldValidate: true, shouldDirty: true });
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Zap className="h-3.5 w-3.5 text-brand-500" />
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Quick Presets — click to apply
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {PRESETS.map((preset) => (
          <button
            key={preset.id}
            type="button"
            onClick={() => applyPreset(preset)}
            className="relative text-left p-3 rounded-xl border border-border hover:border-brand-500/50 hover:bg-brand-500/5 transition-all focus:outline-none focus:ring-2 focus:ring-brand-500/30"
          >
            {preset.badge && (
              <span className="absolute -top-2 right-2 bg-brand-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                {preset.badge}
              </span>
            )}
            <div className="flex items-start gap-2">
              <span className="text-lg">{preset.emoji}</span>
              <div className="min-w-0">
                <p className="text-sm font-medium leading-tight">{preset.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{preset.description}</p>
                <p className="text-xs font-mono text-brand-500 mt-1">
                  Supply: {Number(preset.values.totalSupply).toLocaleString()} · Decimals: {preset.values.decimals}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

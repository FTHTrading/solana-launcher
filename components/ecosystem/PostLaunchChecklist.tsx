'use client';

import { useState } from 'react';
import {
  CheckCircle2,
  Circle,
  ArrowRight,
  ExternalLink,
  Shield,
  Flame,
  Droplets,
  Globe,
  Share2,
  Users,
  Lock,
  BarChart3,
  Bell,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface ChecklistItem {
  id: string;
  category: 'security' | 'liquidity' | 'community' | 'analytics' | 'growth';
  title: string;
  description: string;
  priority: 'critical' | 'recommended' | 'optional';
  actionLabel: string;
  actionHref: string;
  external?: boolean;
  icon: React.ReactNode;
}

const CHECKLIST: ChecklistItem[] = [
  // Security — do these first
  {
    id: 'revoke-mint',
    category: 'security',
    title: 'Revoke Mint Authority',
    description: 'Permanently fix your token supply. Required for DEX listings and trust. Once done, no one can ever mint more tokens.',
    priority: 'critical',
    actionLabel: 'Revoke Mint',
    actionHref: '/dashboard/manage',
    icon: <Shield className="h-4 w-4" />,
  },
  {
    id: 'revoke-freeze',
    category: 'security',
    title: 'Revoke Freeze Authority',
    description: 'Remove the ability to freeze token accounts. Required for DEX pool creation on Raydium.',
    priority: 'critical',
    actionLabel: 'Revoke Freeze',
    actionHref: '/dashboard/manage',
    icon: <Lock className="h-4 w-4" />,
  },
  {
    id: 'verify-metadata',
    category: 'security',
    title: 'Verify On-Chain Metadata',
    description: 'Confirm your token name, symbol, and image are correctly stored on-chain via Metaplex.',
    priority: 'critical',
    actionLabel: 'View on Solscan',
    actionHref: 'https://solscan.io',
    external: true,
    icon: <CheckCircle2 className="h-4 w-4" />,
  },

  // Liquidity — get tradeable
  {
    id: 'add-liquidity',
    category: 'liquidity',
    title: 'Add Initial Liquidity',
    description: 'Create a trading pair on Raydium or Meteora so users can buy/sell your token. This gives it a live price.',
    priority: 'critical',
    actionLabel: 'Add Liquidity',
    actionHref: '/liquidity',
    icon: <Droplets className="h-4 w-4" />,
  },
  {
    id: 'lock-lp',
    category: 'liquidity',
    title: 'Lock LP Tokens',
    description: 'Lock your liquidity provider tokens on Streamflow to prove the liquidity stays. Builds community trust.',
    priority: 'recommended',
    actionLabel: 'Lock on Streamflow',
    actionHref: 'https://app.streamflow.finance/vesting',
    external: true,
    icon: <Lock className="h-4 w-4" />,
  },
  {
    id: 'verify-pool',
    category: 'liquidity',
    title: 'Verify Pool on DexScreener',
    description: 'Once liquidity is added, your token auto-appears on DexScreener and Birdeye. Verify the listing.',
    priority: 'recommended',
    actionLabel: 'Check DexScreener',
    actionHref: 'https://dexscreener.com/solana',
    external: true,
    icon: <BarChart3 className="h-4 w-4" />,
  },

  // Community — build awareness
  {
    id: 'share-launch',
    category: 'community',
    title: 'Share Your Launch',
    description: 'Share your token page link on Twitter/X, Discord, and Telegram. Generate a shareable card.',
    priority: 'recommended',
    actionLabel: 'Token Page',
    actionHref: '/dashboard',
    icon: <Share2 className="h-4 w-4" />,
  },
  {
    id: 'register-sol-domain',
    category: 'community',
    title: 'Register a .sol Domain',
    description: 'Get a memorable .sol domain for your project via Bonfida/SNS. e.g. yourtoken.sol',
    priority: 'optional',
    actionLabel: 'Register Domain',
    actionHref: 'https://www.sns.id',
    external: true,
    icon: <Globe className="h-4 w-4" />,
  },
  {
    id: 'create-dao',
    category: 'community',
    title: 'Create a DAO (Optional)',
    description: 'Set up token-weighted governance via Realms. Let holders vote on proposals.',
    priority: 'optional',
    actionLabel: 'Create on Realms',
    actionHref: 'https://app.realms.today',
    external: true,
    icon: <Users className="h-4 w-4" />,
  },

  // Analytics
  {
    id: 'setup-webhook',
    category: 'analytics',
    title: 'Set Up Helius Webhook',
    description: 'Get real-time notifications for transfers, swaps, and whale activity on your token.',
    priority: 'recommended',
    actionLabel: 'Post-Launch Hub',
    actionHref: '/post-launch',
    icon: <Bell className="h-4 w-4" />,
  },
  {
    id: 'track-on-birdeye',
    category: 'analytics',
    title: 'Track on Birdeye',
    description: 'Monitor your token price, volume, holder count, and transaction history in real-time.',
    priority: 'recommended',
    actionLabel: 'View on Birdeye',
    actionHref: 'https://birdeye.so',
    external: true,
    icon: <BarChart3 className="h-4 w-4" />,
  },

  // Growth
  {
    id: 'burn-supply',
    category: 'growth',
    title: 'Consider a Token Burn',
    description: 'Burn a portion of supply to reduce circulating tokens and signal commitment to holders.',
    priority: 'optional',
    actionLabel: 'Burn Tokens',
    actionHref: '/dashboard/burn',
    icon: <Flame className="h-4 w-4" />,
  },
  {
    id: 'jupiter-listing',
    category: 'growth',
    title: 'Apply for Jupiter Strict List',
    description: 'Once your token has liquidity and volume, apply for Jupiter\'s strict list for wider visibility.',
    priority: 'optional',
    actionLabel: 'Jupiter Verification',
    actionHref: 'https://station.jup.ag/docs/get-your-token-on-jup',
    external: true,
    icon: <Sparkles className="h-4 w-4" />,
  },
];

const CATEGORIES = [
  { id: 'security', label: 'Security & Trust', icon: <Shield className="h-4 w-4" /> },
  { id: 'liquidity', label: 'Liquidity & Trading', icon: <Droplets className="h-4 w-4" /> },
  { id: 'community', label: 'Community & Branding', icon: <Users className="h-4 w-4" /> },
  { id: 'analytics', label: 'Analytics & Monitoring', icon: <BarChart3 className="h-4 w-4" /> },
  { id: 'growth', label: 'Growth & Optimization', icon: <Sparkles className="h-4 w-4" /> },
] as const;

const PRIORITY_COLORS = {
  critical: 'text-red-500',
  recommended: 'text-amber-500',
  optional: 'text-muted-foreground',
};

export function PostLaunchChecklist() {
  const [completedItems, setCompletedItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    setCompletedItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const totalItems = CHECKLIST.length;
  const completedCount = completedItems.size;
  const progress = Math.round((completedCount / totalItems) * 100);

  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <Card className="bg-gradient-to-r from-brand-500/5 to-emerald-500/5 border-brand-500/20">
        <CardContent className="pt-6 pb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-2">
              <h2 className="text-lg font-bold">Post-Launch Checklist</h2>
              <p className="text-sm text-muted-foreground">
                {completedCount} of {totalItems} steps completed
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-2xl font-bold text-brand-500">{progress}%</p>
                <p className="text-xs text-muted-foreground">Complete</p>
              </div>
              <div className="w-20 h-20 relative">
                <svg className="transform -rotate-90 w-20 h-20" viewBox="0 0 100 100">
                  <circle
                    cx="50" cy="50" r="40"
                    fill="none" stroke="currentColor"
                    strokeWidth="8" className="text-muted/30"
                  />
                  <circle
                    cx="50" cy="50" r="40"
                    fill="none" stroke="currentColor"
                    strokeWidth="8" className="text-brand-500"
                    strokeDasharray={`${progress * 2.51} ${251 - progress * 2.51}`}
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Checklist by Category */}
      {CATEGORIES.map(({ id, label, icon }) => {
        const items = CHECKLIST.filter((item) => item.category === id);
        const categoryCompleted = items.filter((item) => completedItems.has(item.id)).length;

        return (
          <Card key={id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  {icon}
                  {label}
                </CardTitle>
                <Badge variant={categoryCompleted === items.length ? 'success' : 'secondary'}>
                  {categoryCompleted}/{items.length}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {items.map((item) => {
                  const isDone = completedItems.has(item.id);

                  return (
                    <div
                      key={item.id}
                      className={`flex items-start gap-3 p-3 rounded-lg border transition-all ${
                        isDone
                          ? 'bg-emerald-500/5 border-emerald-500/20'
                          : 'bg-card hover:bg-muted/30 border-border'
                      }`}
                    >
                      <button
                        onClick={() => toggleItem(item.id)}
                        className="mt-0.5 flex-shrink-0"
                      >
                        {isDone ? (
                          <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                        ) : (
                          <Circle className="h-5 w-5 text-muted-foreground/40 hover:text-brand-500 transition-colors" />
                        )}
                      </button>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-medium ${isDone ? 'line-through text-muted-foreground' : ''}`}>
                            {item.title}
                          </span>
                          <Badge
                            variant="outline"
                            className={`text-[10px] ${PRIORITY_COLORS[item.priority]}`}
                          >
                            {item.priority}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{item.description}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex-shrink-0"
                        asChild
                      >
                        {item.external ? (
                          <a href={item.actionHref} target="_blank" rel="noopener noreferrer">
                            {item.actionLabel}
                            <ExternalLink className="h-3 w-3 ml-1" />
                          </a>
                        ) : (
                          <Link href={item.actionHref}>
                            {item.actionLabel}
                            <ArrowRight className="h-3 w-3 ml-1" />
                          </Link>
                        )}
                      </Button>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

import { appConfig } from '@/lib/config/app-config';
import { tenantConfig, getTenantFeeBreakdown } from '@/lib/config/white-label';
import type { FeeBreakdown, PricingTier, ReferralInfo } from '@/types';

// =============================================
// FEE SERVICE
//
// Centralizes all fee calculation logic.
// Supports: base fees, premium tiers, referral
// discounts, promo codes, and white-label splits.
// =============================================

export function calculateFees(tierId?: string, referral?: ReferralInfo): FeeBreakdown {
  const tier = tierId ? PRICING_TIERS.find((t) => t.id === tierId) : PRICING_TIERS[0];
  const baseFee = tier?.priceSOL ?? appConfig.fees.creationFeeSOL;

  // Apply referral discount if present
  const discount = referral ? (baseFee * referral.discountPercent) / 100 : 0;
  const finalFee = baseFee - discount;

  return {
    platformFeeSOL: finalFee,
    estimatedNetworkFeeSOL: appConfig.fees.estimatedNetworkFeeSOL,
    totalEstimatedSOL: finalFee + appConfig.fees.estimatedNetworkFeeSOL,
    treasuryWallet: appConfig.fees.treasuryWallet,
  };
}

/**
 * Calculate fees with white-label tenant split.
 * Returns both platform and tenant shares.
 */
export function calculateFeesWithSplit(tierId?: string, referral?: ReferralInfo) {
  const base = calculateFees(tierId, referral);
  const split = getTenantFeeBreakdown(base.platformFeeSOL);

  return {
    ...base,
    platformShareSOL: split.platformShareSOL,
    tenantShareSOL: split.tenantShareSOL,
    platformWallet: split.platformWallet,
    tenantWallet: split.tenantWallet,
    isWhiteLabel: tenantConfig.id !== 'default',
  };
}

/**
 * Get the pricing tier by ID.
 */
export function getPricingTier(tierId: string): PricingTier | undefined {
  return PRICING_TIERS.find((t) => t.id === tierId);
}

/**
 * Get all available pricing tiers.
 */
export function getAllPricingTiers(): PricingTier[] {
  return [...PRICING_TIERS];
}

// ── Pricing Tiers ───────────────────────────────────────────

export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'standard',
    name: 'Standard Launch',
    description: 'Create your SPL token with full metadata and dashboard access',
    priceSOL: 0.1,
    features: [
      'SPL token creation on Solana',
      'IPFS image + metadata upload',
      'On-chain Metaplex metadata',
      'Explorer links + dashboard',
      'Token burn flow',
      'Portfolio tracker',
    ],
  },
  {
    id: 'premium',
    name: 'Premium Launch',
    description: 'Everything in Standard plus authority controls and token page',
    priceSOL: 0.25,
    features: [
      'Everything in Standard',
      'Auto mint authority revocation',
      'Auto freeze authority revocation',
      'Trust score badge',
      'Generated /token/[mint] shareable page',
      'Post-launch checklist',
      'Priority in ecosystem discovery',
    ],
  },
  {
    id: 'featured',
    name: 'Featured Launch',
    description: 'Full package with liquidity routing and analytics',
    priceSOL: 0.5,
    features: [
      'Everything in Premium',
      'Featured placement on platform',
      'Auto-generated OG share card',
      'DEX routing setup assistance',
      'Launch analytics dashboard',
      'Discord + Telegram notification setup',
      '30-day post-launch support',
    ],
  },
];

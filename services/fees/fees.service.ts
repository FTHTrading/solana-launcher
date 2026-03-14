import { appConfig } from '@/lib/config/app-config';
import type { FeeBreakdown } from '@/types';

// =============================================
// FEE SERVICE
//
// Centralizes all fee calculation logic.
// Future: support pricing tiers, referrals,
// promo codes, and premium packages.
// =============================================

export function calculateFees(): FeeBreakdown {
  return {
    platformFeeSOL: appConfig.fees.creationFeeSOL,
    estimatedNetworkFeeSOL: appConfig.fees.estimatedNetworkFeeSOL,
    totalEstimatedSOL:
      appConfig.fees.creationFeeSOL + appConfig.fees.estimatedNetworkFeeSOL,
    treasuryWallet: appConfig.fees.treasuryWallet,
  };
}

// TODO: Future premium tier pricing
//
// export function calculatePremiumFee(tier: PricingTier, referral?: ReferralInfo): FeeBreakdown {
//   const base = tier.priceSOL;
//   const discount = referral ? (base * referral.discountPercent) / 100 : 0;
//   return {
//     platformFeeSOL: base - discount,
//     estimatedNetworkFeeSOL: appConfig.fees.estimatedNetworkFeeSOL,
//     totalEstimatedSOL: base - discount + appConfig.fees.estimatedNetworkFeeSOL,
//     treasuryWallet: appConfig.fees.treasuryWallet,
//   };
// }

// Sample pricing tiers (for future use — not active in v1)
export const PRICING_TIERS = [
  {
    id: 'standard',
    name: 'Standard Launch',
    description: 'Create your SPL token with metadata',
    priceSOL: 0.1,
    features: [
      'SPL token creation',
      'IPFS metadata upload',
      'Explorer links',
      'Token dashboard',
    ],
  },
  {
    id: 'premium',
    name: 'Premium Launch',
    description: 'Everything in Standard plus featured placement',
    priceSOL: 0.5,
    features: [
      'Everything in Standard',
      'Featured placement',
      'Mint authority revoke option',
      'Freeze authority revoke option',
      'Launch success share page',
    ],
  },
] as const;

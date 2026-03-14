// =============================================
// REFERRAL & AFFILIATE SERVICE
//
// Referral code system for tracking affiliate
// signups and configuring commission splits.
// Supports URL-based referral codes, persistent
// tracking, and fee discount application.
// =============================================

import type { ReferralInfo } from '@/types';

// ── Referral Code Storage ──────────────────────────────────
// In production, this would be backed by a database.
// For now, we use a static registry + URL param tracking.

export interface ReferralConfig {
  code: string;
  referrerWallet: string;
  referrerName?: string;
  discountPercent: number;       // Discount given to the referred user
  commissionPercent: number;     // Commission paid to the referrer
  maxUses?: number;              // Optional cap on uses
  usedCount: number;
  active: boolean;
  createdAt: Date;
  expiresAt?: Date;
}

// Sample referral registry (would be database-backed in production)
const REFERRAL_REGISTRY: Record<string, ReferralConfig> = {
  // Example:
  // 'LAUNCH10': {
  //   code: 'LAUNCH10',
  //   referrerWallet: 'ReferrerWalletAddressHere',
  //   referrerName: 'Launch Partner',
  //   discountPercent: 10,
  //   commissionPercent: 15,
  //   usedCount: 0,
  //   active: true,
  //   createdAt: new Date('2026-01-01'),
  // },
};

/**
 * Look up a referral code and return its configuration.
 * Returns null if the code is invalid, inactive, or expired.
 */
export function lookupReferralCode(code: string): ReferralConfig | null {
  const normalized = code.trim().toUpperCase();
  const config = REFERRAL_REGISTRY[normalized];

  if (!config) return null;
  if (!config.active) return null;
  if (config.expiresAt && config.expiresAt < new Date()) return null;
  if (config.maxUses && config.usedCount >= config.maxUses) return null;

  return config;
}

/**
 * Convert a ReferralConfig to the ReferralInfo type used by the fee system.
 */
export function toReferralInfo(config: ReferralConfig): ReferralInfo {
  return {
    code: config.code,
    referrerWallet: config.referrerWallet,
    discountPercent: config.discountPercent,
  };
}

/**
 * Apply a referral discount to a fee amount.
 */
export function applyReferralDiscount(
  baseFeeSOL: number,
  referral: ReferralInfo | null
): { finalFeeSOL: number; discountSOL: number; referral: ReferralInfo | null } {
  if (!referral) {
    return { finalFeeSOL: baseFeeSOL, discountSOL: 0, referral: null };
  }

  const discountSOL = (baseFeeSOL * referral.discountPercent) / 100;
  return {
    finalFeeSOL: baseFeeSOL - discountSOL,
    discountSOL,
    referral,
  };
}

/**
 * Calculate commission owed to a referrer.
 */
export function calculateReferrerCommission(
  feeCollectedSOL: number,
  referralCode: string
): { commissionSOL: number; referrerWallet: string } | null {
  const config = lookupReferralCode(referralCode);
  if (!config) return null;

  return {
    commissionSOL: (feeCollectedSOL * config.commissionPercent) / 100,
    referrerWallet: config.referrerWallet,
  };
}

/**
 * Extract referral code from URL search params.
 * Supports: ?ref=CODE, ?referral=CODE, ?r=CODE
 */
export function extractReferralFromParams(
  searchParams: URLSearchParams
): string | null {
  return (
    searchParams.get('ref') ||
    searchParams.get('referral') ||
    searchParams.get('r') ||
    null
  );
}

/**
 * Generate a referral URL.
 */
export function generateReferralUrl(
  baseUrl: string,
  referralCode: string
): string {
  const url = new URL(baseUrl);
  url.searchParams.set('ref', referralCode);
  return url.toString();
}

/**
 * Validate a new referral code format.
 */
export function isValidReferralCode(code: string): boolean {
  // 3-20 chars, alphanumeric + underscore + dash
  return /^[A-Za-z0-9_-]{3,20}$/.test(code.trim());
}

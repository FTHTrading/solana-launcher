import { describe, it, expect } from 'vitest';
import { calculateFees, PRICING_TIERS } from '@/services/fees/fees.service';

describe('calculateFees', () => {
  it('returns a valid fee breakdown', () => {
    const fees = calculateFees();
    expect(fees).toHaveProperty('platformFeeSOL');
    expect(fees).toHaveProperty('estimatedNetworkFeeSOL');
    expect(fees).toHaveProperty('totalEstimatedSOL');
    expect(fees).toHaveProperty('treasuryWallet');
  });

  it('total equals platform fee + network fee', () => {
    const fees = calculateFees();
    expect(fees.totalEstimatedSOL).toBeCloseTo(
      fees.platformFeeSOL + fees.estimatedNetworkFeeSOL,
      6
    );
  });

  it('all fees are non-negative', () => {
    const fees = calculateFees();
    expect(fees.platformFeeSOL).toBeGreaterThanOrEqual(0);
    expect(fees.estimatedNetworkFeeSOL).toBeGreaterThanOrEqual(0);
    expect(fees.totalEstimatedSOL).toBeGreaterThanOrEqual(0);
  });

  it('treasury wallet is a string', () => {
    const fees = calculateFees();
    expect(typeof fees.treasuryWallet).toBe('string');
  });
});

describe('PRICING_TIERS', () => {
  it('has at least one tier', () => {
    expect(PRICING_TIERS.length).toBeGreaterThan(0);
  });

  it('each tier has required fields', () => {
    for (const tier of PRICING_TIERS) {
      expect(tier.id).toBeTruthy();
      expect(tier.name).toBeTruthy();
      expect(tier.priceSOL).toBeGreaterThanOrEqual(0);
      expect(tier.features.length).toBeGreaterThan(0);
    }
  });
});

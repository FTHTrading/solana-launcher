import { describe, it, expect } from 'vitest';
import { truncateAddress, formatNumber, formatSOL, isValidUrl } from '@/lib/utils/utils';

describe('truncateAddress', () => {
  it('truncates a long address', () => {
    const addr = '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU';
    expect(truncateAddress(addr)).toBe('7xKX...gAsU');
  });

  it('returns short strings unchanged', () => {
    expect(truncateAddress('abc')).toBe('abc');
  });

  it('respects custom char count', () => {
    const addr = '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU';
    expect(truncateAddress(addr, 6)).toBe('7xKXtg...osgAsU');
  });
});

describe('formatNumber', () => {
  it('formats large numbers with commas', () => {
    expect(formatNumber('1000000000')).toBe('1,000,000,000');
  });

  it('handles zero', () => {
    expect(formatNumber(0)).toBe('0');
  });

  it('returns 0 for NaN input', () => {
    expect(formatNumber('not-a-number')).toBe('0');
  });

  it('handles decimal numbers', () => {
    expect(formatNumber(1234.56)).toBe('1,234.56');
  });
});

describe('formatSOL', () => {
  it('converts lamports to SOL with 4 decimals', () => {
    expect(formatSOL(1_000_000_000)).toBe('1.0000');
  });

  it('handles fractional lamports', () => {
    expect(formatSOL(50_000_000)).toBe('0.0500');
  });

  it('handles zero', () => {
    expect(formatSOL(0)).toBe('0.0000');
  });
});

describe('isValidUrl', () => {
  it('accepts valid https URLs', () => {
    expect(isValidUrl('https://example.com')).toBe(true);
  });

  it('accepts valid http URLs', () => {
    expect(isValidUrl('http://localhost:3000')).toBe(true);
  });

  it('rejects plain strings', () => {
    expect(isValidUrl('not-a-url')).toBe(false);
  });

  it('rejects empty strings', () => {
    expect(isValidUrl('')).toBe(false);
  });
});

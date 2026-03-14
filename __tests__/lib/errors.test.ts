import { describe, it, expect } from 'vitest';
import { createAppError, parseBlockchainError, errorMessage } from '@/lib/utils/errors';

describe('createAppError', () => {
  it('creates a structured error with user message', () => {
    const err = createAppError('WALLET_NOT_CONNECTED', 'internal detail');
    expect(err.code).toBe('WALLET_NOT_CONNECTED');
    expect(err.message).toBe('internal detail');
    expect(err.userMessage).toContain('connect your wallet');
  });

  it('attaches raw error when provided', () => {
    const raw = new Error('original');
    const err = createAppError('UNKNOWN', 'wrapped', raw);
    expect(err.raw).toBe(raw);
  });
});

describe('parseBlockchainError', () => {
  it('detects wallet rejection', () => {
    const err = parseBlockchainError(new Error('User rejected the request'));
    expect(err.code).toBe('WALLET_REJECTED');
    expect(err.userMessage).toContain('cancelled');
  });

  it('detects insufficient funds', () => {
    const err = parseBlockchainError(new Error('insufficient funds for rent'));
    expect(err.code).toBe('INSUFFICIENT_FUNDS');
  });

  it('detects transaction expired', () => {
    const err = parseBlockchainError(
      new Error('TransactionExpiredBlockheightExceededError')
    );
    expect(err.code).toBe('TRANSACTION_EXPIRED');
  });

  it('detects RPC errors', () => {
    const err = parseBlockchainError(new Error('503 Service Unavailable'));
    expect(err.code).toBe('RPC_ERROR');
  });

  it('falls back to UNKNOWN for unrecognized errors', () => {
    const err = parseBlockchainError(new Error('something weird happened'));
    expect(err.code).toBe('UNKNOWN');
  });
});

describe('errorMessage', () => {
  it('extracts message from Error objects', () => {
    expect(errorMessage(new Error('test'))).toBe('test');
  });

  it('returns strings directly', () => {
    expect(errorMessage('plain string')).toBe('plain string');
  });

  it('serializes objects', () => {
    const result = errorMessage({ key: 'value' });
    expect(result).toContain('key');
  });
});

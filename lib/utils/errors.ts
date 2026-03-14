import type { AppError, AppErrorCode } from '@/types';

// =============================================
// CENTRALIZED ERROR HANDLING
// Converts internal/blockchain errors into
// user-safe, structured AppError objects.
// =============================================

const USER_MESSAGES: Record<AppErrorCode, string> = {
  WALLET_NOT_CONNECTED: 'Please connect your wallet before continuing.',
  WALLET_REJECTED:
    'You cancelled the transaction. You can try again whenever you are ready.',
  INSUFFICIENT_FUNDS: `Your wallet doesn't have enough SOL to complete this action. Please add funds and try again.`,
  RPC_ERROR:
    'We had trouble connecting to the Solana network. Please try again in a moment.',
  UPLOAD_FAILED:
    'Failed to upload your token image. Please check your internet connection and try again.',
  METADATA_FAILED:
    'Failed to upload token metadata. Please try again.',
  MINT_FAILED:
    'Token creation failed on-chain. Your transaction was not submitted — you have not been charged. Please try again.',
  INVALID_INPUT:
    'Some of your token details are invalid. Please review the form and correct any errors.',
  BURN_FAILED:
    'Failed to burn tokens. The transaction was not submitted. Please try again.',
  TRANSACTION_EXPIRED:
    'The transaction took too long to confirm and expired. The network may be congested — please try again.',
  SIMULATION_FAILED:
    'Transaction simulation failed before sending. This usually means insufficient SOL or an invalid account. Please check your balance and try again.',
  UNKNOWN: 'An unexpected error occurred. Please try again or contact support.',
};

export function createAppError(
  code: AppErrorCode,
  message: string,
  raw?: unknown
): AppError {
  return {
    code,
    message,
    userMessage: USER_MESSAGES[code],
    raw,
  };
}

export function parseBlockchainError(error: unknown): AppError {
  const msg = errorMessage(error);

  if (msg.includes('User rejected')) {
    return createAppError('WALLET_REJECTED', msg, error);
  }

  if (
    msg.includes('insufficient funds') ||
    msg.includes('InsufficientFunds') ||
    msg.includes('0x1') // lamport shortage
  ) {
    return createAppError('INSUFFICIENT_FUNDS', msg, error);
  }

  if (
    msg.includes('block height exceeded') ||
    msg.includes('BlockheightBasedTransactionConfirmation') ||
    msg.includes('TransactionExpiredBlockheightExceededError')
  ) {
    return createAppError('TRANSACTION_EXPIRED', msg, error);
  }

  if (
    msg.includes('simulation failed') ||
    msg.includes('Simulation') ||
    msg.includes('0x1') // anchor simulation revert
  ) {
    return createAppError('SIMULATION_FAILED', msg, error);
  }

  if (
    msg.includes('503') ||
    msg.includes('429') ||
    msg.includes('Connection') ||
    msg.includes('timed out') ||
    msg.includes('socket hang up')
  ) {
    return createAppError('RPC_ERROR', msg, error);
  }

  return createAppError('UNKNOWN', msg, error);
}

export function errorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  try {
    return JSON.stringify(error);
  } catch {
    return 'Unknown error';
  }
}

import {
  PublicKey,
  Transaction,
} from '@solana/web3.js';
import {
  createBurnInstruction,
  getAssociatedTokenAddressSync,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token';
import type { WalletContextState } from '@solana/wallet-adapter-react';
import { getConnection } from '@/lib/solana/connection';
import { parseBlockchainError, createAppError } from '@/lib/utils/errors';

// =============================================
// TOKEN BURN SERVICE
//
// Burns SPL tokens from the connected wallet's
// associated token account.
// =============================================

export interface BurnTokenParams {
  wallet: WalletContextState;
  mintAddress: string;
  amount: string;      // integer string (raw units, before decimals)
  decimals: number;
  onProgress?: (step: string) => void;
}

export interface BurnTokenResult {
  txSignature: string;
  amount: string;
  mintAddress: string;
}

export async function burnTokens(
  params: BurnTokenParams
): Promise<BurnTokenResult> {
  const { wallet, mintAddress, amount, decimals, onProgress } = params;

  if (!wallet.publicKey || !wallet.signTransaction) {
    throw createAppError('WALLET_NOT_CONNECTED', 'Wallet not connected');
  }

  const connection = getConnection();
  const ownerPubkey = wallet.publicKey;
  const mintPubkey = new PublicKey(mintAddress);

  // Calculate raw token amount (apply decimals)
  const rawAmount = BigInt(amount) * BigInt(10 ** decimals);

  // Get the ATA for this mint + owner
  const tokenAccount = getAssociatedTokenAddressSync(mintPubkey, ownerPubkey);

  onProgress?.('Building burn transaction...');

  const burnIx = createBurnInstruction(
    tokenAccount,
    mintPubkey,
    ownerPubkey,
    rawAmount,
    [],
    TOKEN_PROGRAM_ID
  );

  const { blockhash, lastValidBlockHeight } =
    await connection.getLatestBlockhash('confirmed');

  const tx = new Transaction({
    recentBlockhash: blockhash,
    feePayer: ownerPubkey,
  });
  tx.add(burnIx);

  onProgress?.('Waiting for wallet signature...');

  let signedTx: Transaction;
  try {
    signedTx = await wallet.signTransaction(tx);
  } catch (err) {
    throw parseBlockchainError(err);
  }

  onProgress?.('Confirming burn on-chain...');

  let signature: string;
  try {
    const raw = signedTx.serialize();
    signature = await connection.sendRawTransaction(raw, {
      skipPreflight: false,
      preflightCommitment: 'confirmed',
    });

    const result = await connection.confirmTransaction(
      { signature, blockhash, lastValidBlockHeight },
      'confirmed'
    );

    if (result.value.err) {
      throw new Error(`Burn transaction failed: ${JSON.stringify(result.value.err)}`);
    }
  } catch (err) {
    throw parseBlockchainError(err);
  }

  return {
    txSignature: signature,
    amount,
    mintAddress,
  };
}

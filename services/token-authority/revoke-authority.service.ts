import {
  PublicKey,
  Transaction,
} from '@solana/web3.js';
import {
  createSetAuthorityInstruction,
  AuthorityType,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token';
import type { WalletContextState } from '@solana/wallet-adapter-react';
import { getConnection } from '@/lib/solana/connection';
import { parseBlockchainError, createAppError } from '@/lib/utils/errors';

// =============================================
// REVOKE AUTHORITY SERVICE
//
// Allows token creators to revoke mint authority
// and/or freeze authority from their SPL token.
//
// Revoking mint authority: token supply is forever
//   fixed. No more tokens can ever be minted.
//   This is a key "rug-proof" signal for meme coins.
//
// Revoking freeze authority: no account holding
//   the token can ever be frozen. Another trust signal.
//
// BOTH ARE IRREVERSIBLE. Users are warned in the UI.
// =============================================

export type AuthorityKind = 'mint' | 'freeze';

export interface RevokeAuthorityParams {
  wallet: WalletContextState;
  mintAddress: string;
  authorityKind: AuthorityKind;
  onProgress?: (step: string) => void;
}

export interface RevokeAuthorityResult {
  txSignature: string;
  mintAddress: string;
  revokedAuthority: AuthorityKind;
}

export async function revokeAuthority(
  params: RevokeAuthorityParams
): Promise<RevokeAuthorityResult> {
  const { wallet, mintAddress, authorityKind, onProgress } = params;

  if (!wallet.publicKey || !wallet.signTransaction) {
    throw createAppError('WALLET_NOT_CONNECTED', 'Wallet not connected');
  }

  const connection = getConnection();
  const ownerPubkey = wallet.publicKey;
  const mintPubkey = new PublicKey(mintAddress);

  const splAuthorityType =
    authorityKind === 'mint'
      ? AuthorityType.MintTokens
      : AuthorityType.FreezeAccount;

  onProgress?.(`Building ${authorityKind} authority revocation transaction...`);

  // Setting newAuthority to null permanently revokes the authority.
  const ix = createSetAuthorityInstruction(
    mintPubkey,
    ownerPubkey,
    splAuthorityType,
    null,           // null = revoke permanently
    [],
    TOKEN_PROGRAM_ID
  );

  const { blockhash, lastValidBlockHeight } =
    await connection.getLatestBlockhash('confirmed');

  const tx = new Transaction({ recentBlockhash: blockhash, feePayer: ownerPubkey });
  tx.add(ix);

  onProgress?.('Waiting for wallet signature...');

  let signedTx: Transaction;
  try {
    signedTx = await wallet.signTransaction(tx);
  } catch (err) {
    throw parseBlockchainError(err);
  }

  onProgress?.('Confirming revocation on-chain...');

  let signature: string;
  try {
    const rawTx = signedTx.serialize();
    signature = await connection.sendRawTransaction(rawTx, {
      skipPreflight: false,
      preflightCommitment: 'confirmed',
      maxRetries: 0,
    });

    // Re-broadcast loop (same pattern as token launch)
    let confirmed = false;
    const interval = setInterval(async () => {
      try {
        const status = await connection.getSignatureStatuses([signature]);
        const s = status.value[0];
        if (s && (s.confirmationStatus === 'confirmed' || s.confirmationStatus === 'finalized')) {
          confirmed = true;
          clearInterval(interval);
        } else {
          await connection.sendRawTransaction(rawTx, { skipPreflight: true });
        }
      } catch { /* ignore */ }
    }, 2_000);

    let confirmResult;
    try {
      confirmResult = await connection.confirmTransaction(
        { signature, blockhash, lastValidBlockHeight },
        'confirmed'
      );
    } finally {
      clearInterval(interval);
    }

    if (confirmResult.value.err) {
      throw new Error(`Revocation failed on-chain: ${JSON.stringify(confirmResult.value.err)}`);
    }
  } catch (err) {
    throw parseBlockchainError(err);
  }

  return {
    txSignature: signature,
    mintAddress,
    revokedAuthority: authorityKind,
  };
}

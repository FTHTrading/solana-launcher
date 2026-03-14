import {
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
  LAMPORTS_PER_SOL,
  type TransactionInstruction,
} from '@solana/web3.js';
import {
  createInitializeMintInstruction,
  createAssociatedTokenAccountInstruction,
  createMintToInstruction,
  getMintLen,
  getAssociatedTokenAddressSync,
  TOKEN_PROGRAM_ID,
  MINT_SIZE,
} from '@solana/spl-token';
import type { WalletContextState } from '@solana/wallet-adapter-react';
import { getConnection } from '@/lib/solana/connection';
import { appConfig } from '@/lib/config/app-config';
import {
  parseBlockchainError,
  createAppError,
} from '@/lib/utils/errors';
import type { AppError, TokenMetadata, CreatedToken } from '@/types';
import { getStorageAdapter } from '@/lib/storage/storage';

// =============================================
// TOKEN LAUNCH SERVICE
//
// Orchestrates the full token creation flow:
// 1. Upload image to IPFS
// 2. Upload metadata JSON to IPFS
// 3. Create on-chain mint account
// 4. Create associated token account
// 5. Mint initial supply to creator
// 6. Attach Metaplex metadata
// 7. Collect platform fee
//
// Uses battle-tested SPL standard primitives.
// No custom on-chain Rust program needed for v1.
// =============================================

export interface TokenLaunchParams {
  wallet: WalletContextState;
  name: string;
  symbol: string;
  decimals: number;
  totalSupply: string; // integer string (no decimals applied)
  description: string;
  image: File;
  website?: string;
  twitter?: string;
  telegram?: string;
  discord?: string;
  onProgress?: (step: string) => void;
}

export interface TokenLaunchResult {
  mintAddress: string;
  txSignature: string;
  metadataUri: string;
  imageUri: string;
}

export async function launchToken(
  params: TokenLaunchParams
): Promise<TokenLaunchResult> {
  const {
    wallet,
    name,
    symbol,
    decimals,
    totalSupply,
    description,
    image,
    website,
    twitter,
    telegram,
    discord,
    onProgress,
  } = params;

  if (!wallet.publicKey || !wallet.signTransaction) {
    throw createAppError('WALLET_NOT_CONNECTED', 'Wallet not connected');
  }

  const connection = getConnection();
  const creatorPubkey = wallet.publicKey;

  // --- Step 1: Upload image ---
  onProgress?.('Uploading token image...');
  const storage = getStorageAdapter();
  let imageUri: string;
  try {
    const imageResult = await storage.uploadFile(image);
    imageUri = imageResult.uri;
  } catch (err) {
    throw createAppError(
      'UPLOAD_FAILED',
      `Image upload failed: ${err instanceof Error ? err.message : String(err)}`,
      err
    );
  }

  // --- Step 2: Upload metadata ---
  onProgress?.('Uploading token metadata...');
  const metadata: TokenMetadata = {
    name,
    symbol,
    description,
    image: imageUri,
    ...(website && { external_url: website }),
    properties: {
      links: {
        ...(website && { website }),
        ...(twitter && { twitter }),
        ...(telegram && { telegram }),
        ...(discord && { discord }),
      },
    },
  };

  let metadataUri: string;
  try {
    const metaResult = await storage.uploadMetadata(metadata);
    metadataUri = metaResult.uri;
  } catch (err) {
    throw createAppError(
      'METADATA_FAILED',
      `Metadata upload failed: ${err instanceof Error ? err.message : String(err)}`,
      err
    );
  }

  // --- Step 3: Build mint transaction ---
  onProgress?.('Building token transaction...');

  const mintKeypair = Keypair.generate();
  const mintPubkey = mintKeypair.publicKey;

  const associatedTokenAddress = getAssociatedTokenAddressSync(
    mintPubkey,
    creatorPubkey
  );

  // Calculate supply in raw units (apply decimals).
  // Use BigInt exponentiation to avoid floating-point precision loss
  // (10 ** 9 = 1000000000, which is fine, but 10 ** 18 can silently lose bits in JS Number).
  const rawSupply = BigInt(totalSupply) * (10n ** BigInt(decimals));

  // Rent for mint account
  const mintRent = await connection.getMinimumBalanceForRentExemption(MINT_SIZE);

  // Platform fee in lamports
  const feeLamports = Math.floor(
    appConfig.fees.creationFeeSOL * LAMPORTS_PER_SOL
  );

  const treasuryPubkey = appConfig.fees.treasuryWallet
    ? new PublicKey(appConfig.fees.treasuryWallet)
    : null;

  const instructions: TransactionInstruction[] = [];

  // 1. Create mint account
  instructions.push(
    SystemProgram.createAccount({
      fromPubkey: creatorPubkey,
      newAccountPubkey: mintPubkey,
      space: MINT_SIZE,
      lamports: mintRent,
      programId: TOKEN_PROGRAM_ID,
    })
  );

  // 2. Initialize the mint
  instructions.push(
    createInitializeMintInstruction(
      mintPubkey,
      decimals,
      creatorPubkey, // mint authority (creator retains it; can be revoked later)
      creatorPubkey, // freeze authority
      TOKEN_PROGRAM_ID
    )
  );

  // 3. Create associated token account for creator
  instructions.push(
    createAssociatedTokenAccountInstruction(
      creatorPubkey,
      associatedTokenAddress,
      creatorPubkey,
      mintPubkey
    )
  );

  // 4. Mint initial supply to creator's ATA
  instructions.push(
    createMintToInstruction(
      mintPubkey,
      associatedTokenAddress,
      creatorPubkey,
      rawSupply
    )
  );

  // 5. Platform fee transfer
  // NOTE: We transfer the fee in the same transaction so the user
  // understands exactly what they are signing and approving.
  if (treasuryPubkey && feeLamports > 0) {
    instructions.push(
      SystemProgram.transfer({
        fromPubkey: creatorPubkey,
        toPubkey: treasuryPubkey,
        lamports: feeLamports,
      })
    );
  }

  // --- Step 4: Send transaction ---
  onProgress?.('Waiting for wallet signature...');

  const { blockhash, lastValidBlockHeight } =
    await connection.getLatestBlockhash('confirmed');

  const transaction = new Transaction({
    recentBlockhash: blockhash,
    feePayer: creatorPubkey,
  });

  transaction.add(...instructions);

  // The mint keypair must also sign to authorize account creation
  transaction.partialSign(mintKeypair);

  let signedTx: Transaction;
  try {
    signedTx = await wallet.signTransaction(transaction);
  } catch (err) {
    throw parseBlockchainError(err);
  }

  // --- Step 5: Send + confirm transaction ---
  // Per Solana Developer Docs: use blockheight-based strategy and re-broadcast
  // every ~2s while awaiting confirmation to defeat network drops.
  onProgress?.('Confirming transaction on-chain...');

  let signature: string;
  try {
    const rawTx = signedTx.serialize();

    // Initial send — preflight enabled (simulates before submitting)
    signature = await connection.sendRawTransaction(rawTx, {
      skipPreflight: false,
      preflightCommitment: 'confirmed',
      maxRetries: 0, // We handle retries manually below
    });

    // Re-broadcast while waiting for confirmation
    // Solana Docs: https://docs.solana.com/developing/clients/javascript-api#retries
    const confirmationStrategy = { signature, blockhash, lastValidBlockHeight };
    let confirmed = false;

    const rebroadcastInterval = setInterval(async () => {
      try {
        const status = await connection.getSignatureStatuses([signature]);
        const sigStatus = status.value[0];
        if (sigStatus && (sigStatus.confirmationStatus === 'confirmed' || sigStatus.confirmationStatus === 'finalized')) {
          confirmed = true;
          clearInterval(rebroadcastInterval);
        } else {
          // Still pending — re-broadcast to ensure validators have it
          await connection.sendRawTransaction(rawTx, { skipPreflight: true });
        }
      } catch {
        // Ignore re-broadcast errors; confirmTransaction below will surface any real failure
      }
    }, 2_000);

    let confirmResult;
    try {
      confirmResult = await connection.confirmTransaction(confirmationStrategy, 'confirmed');
    } finally {
      clearInterval(rebroadcastInterval);
    }

    if (confirmResult.value.err) {
      throw new Error(`Transaction failed on-chain: ${JSON.stringify(confirmResult.value.err)}`);
    }
  } catch (err) {
    throw parseBlockchainError(err);
  }

  // --- Step 6: Attach Metaplex metadata (separate tx) ---
  // NOTE: Metaplex metadata is written in a second transaction.
  // This is standard practice for SPL tokens with on-chain metadata.
  onProgress?.('Writing on-chain metadata...');
  try {
    await attachMetaplexMetadata({
      wallet,
      mintPubkey,
      name,
      symbol,
      metadataUri,
      creatorPubkey,
    });
  } catch (err) {
    // Metadata failure is non-fatal for the token itself.
    // The token exists on-chain; metadata can be re-attached.
    console.warn('[token-launch] Metaplex metadata attachment failed:', err);
  }

  return {
    mintAddress: mintPubkey.toBase58(),
    txSignature: signature,
    metadataUri,
    imageUri,
  };
}

// =============================================
// METAPLEX METADATA ATTACHMENT
// Writes the token name/symbol/URI to the
// Metaplex token metadata program on-chain.
// =============================================

interface MetaplexMetadataParams {
  wallet: WalletContextState;
  mintPubkey: PublicKey;
  name: string;
  symbol: string;
  metadataUri: string;
  creatorPubkey: PublicKey;
}

async function attachMetaplexMetadata(
  params: MetaplexMetadataParams
): Promise<string> {
  const { wallet, mintPubkey, name, symbol, metadataUri, creatorPubkey } = params;

  if (!wallet.signTransaction) {
    throw createAppError('WALLET_NOT_CONNECTED', 'Wallet cannot sign');
  }

  // Dynamic import to avoid server-side bundle issues
  const { createCreateMetadataAccountV3Instruction, PROGRAM_ID: METADATA_PROGRAM_ID } =
    await import('@metaplex-foundation/mpl-token-metadata');

  const connection = getConnection();

  // Derive the metadata PDA
  const [metadataPDA] = PublicKey.findProgramAddressSync(
    [
      Buffer.from('metadata'),
      METADATA_PROGRAM_ID.toBuffer(),
      mintPubkey.toBuffer(),
    ],
    METADATA_PROGRAM_ID
  );

  const ix = createCreateMetadataAccountV3Instruction(
    {
      metadata: metadataPDA,
      mint: mintPubkey,
      mintAuthority: creatorPubkey,
      payer: creatorPubkey,
      updateAuthority: creatorPubkey,
    },
    {
      createMetadataAccountArgsV3: {
        data: {
          name,
          symbol,
          uri: metadataUri,
          sellerFeeBasisPoints: 0,
          creators: null,
          collection: null,
          uses: null,
        },
        isMutable: true,
        collectionDetails: null,
      },
    }
  );

  const { blockhash, lastValidBlockHeight } =
    await connection.getLatestBlockhash('confirmed');

  const tx = new Transaction({
    recentBlockhash: blockhash,
    feePayer: creatorPubkey,
  });
  tx.add(ix);

  const signed = await wallet.signTransaction(tx);
  const raw = signed.serialize();
  const sig = await connection.sendRawTransaction(raw, {
    skipPreflight: false,
    preflightCommitment: 'confirmed',
  });

  await connection.confirmTransaction(
    { signature: sig, blockhash, lastValidBlockHeight },
    'confirmed'
  );

  return sig;
}

import {
  PublicKey,
  type ParsedAccountData,
} from '@solana/web3.js';
import { getConnection } from '@/lib/solana/connection';
import { appConfig } from '@/lib/config/app-config';

// =============================================
// ON-CHAIN TOKEN PORTFOLIO READER
//
// Reads all SPL token accounts owned by a wallet
// directly from the chain. No database required.
// Optionally fetches Metaplex metadata for display.
// =============================================

export interface TokenAccount {
  mintAddress: string;
  tokenAccountAddress: string;
  balance: string;         // raw balance (BigInt string)
  uiAmount: number;        // decimal-adjusted display amount
  decimals: number;
  name?: string;
  symbol?: string;
  imageUri?: string;
  metadataUri?: string;
}

/**
 * Fetch all non-zero SPL token accounts for a wallet.
 * Uses parsed account data to avoid a second call per account.
 */
export async function getWalletTokenAccounts(
  walletAddress: string
): Promise<TokenAccount[]> {
  const connection = getConnection();
  const ownerPubkey = new PublicKey(walletAddress);

  const { value: tokenAccounts } =
    await connection.getParsedTokenAccountsByOwner(ownerPubkey, {
      programId: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'),
    });

  const accounts: TokenAccount[] = [];

  for (const { pubkey, account } of tokenAccounts) {
    const parsed = (account.data as ParsedAccountData).parsed;
    const info = parsed?.info;
    if (!info) continue;

    const rawBalance: string = info.tokenAmount?.amount ?? '0';
    const uiAmount: number = info.tokenAmount?.uiAmount ?? 0;
    const decimals: number = info.tokenAmount?.decimals ?? 0;
    const mintAddress: string = info.mint ?? '';

    // Skip zero-balance accounts
    if (rawBalance === '0' || rawBalance === '') continue;

    accounts.push({
      mintAddress,
      tokenAccountAddress: pubkey.toBase58(),
      balance: rawBalance,
      uiAmount,
      decimals,
    });
  }

  // Enrich with on-chain Metaplex metadata in parallel (fire-and-forget per token)
  const enriched = await Promise.all(
    accounts.map((acc) => enrichWithMetadata(acc))
  );

  return enriched;
}

/**
 * Fetch mint account info: mint authority, freeze authority, supply.
 */
export interface MintInfo {
  mintAddress: string;
  decimals: number;
  supply: string;         // raw supply string
  mintAuthority: string | null;
  freezeAuthority: string | null;
  isInitialized: boolean;
}

export async function getMintInfo(mintAddress: string): Promise<MintInfo> {
  const connection = getConnection();
  const mintPubkey = new PublicKey(mintAddress);

  const accountInfo = await connection.getParsedAccountInfo(mintPubkey);
  if (!accountInfo.value) {
    throw new Error(`Mint account not found: ${mintAddress}`);
  }

  const parsed = (accountInfo.value.data as ParsedAccountData).parsed;
  const info = parsed?.info;
  if (!info) throw new Error('Failed to parse mint account data');

  return {
    mintAddress,
    decimals: info.decimals ?? 0,
    supply: info.supply ?? '0',
    mintAuthority: info.mintAuthority ?? null,
    freezeAuthority: info.freezeAuthority ?? null,
    isInitialized: info.isInitialized ?? false,
  };
}

/**
 * Try to fetch Metaplex metadata for a token. Non-fatal.
 */
async function enrichWithMetadata(acc: TokenAccount): Promise<TokenAccount> {
  try {
    const { PublicKey: PK } = await import('@solana/web3.js');
    const { PROGRAM_ID: METADATA_PROGRAM_ID } = await import(
      '@metaplex-foundation/mpl-token-metadata'
    );

    const connection = getConnection();
    const mintPubkey = new PK(acc.mintAddress);
    const [metadataPDA] = PK.findProgramAddressSync(
      [
        Buffer.from('metadata'),
        METADATA_PROGRAM_ID.toBuffer(),
        mintPubkey.toBuffer(),
      ],
      METADATA_PROGRAM_ID
    );

    const metadataAccount = await connection.getAccountInfo(metadataPDA);
    if (!metadataAccount) return acc;

    // Deserialize via Metaplex
    const { Metadata } = await import('@metaplex-foundation/mpl-token-metadata');
    const metadata = Metadata.fromAccountInfo(metadataAccount)[0];

    const name = metadata.data.name.replace(/\0/g, '').trim();
    const symbol = metadata.data.symbol.replace(/\0/g, '').trim();
    const uri = metadata.data.uri.replace(/\0/g, '').trim();

    // Optionally fetch off-chain JSON for image
    let imageUri: string | undefined;
    if (uri) {
      try {
        const httpUri = toGatewayUrl(uri);
        const res = await fetch(httpUri, { signal: AbortSignal.timeout(4000) });
        if (res.ok) {
          const json = await res.json();
          imageUri = json.image ? toGatewayUrl(json.image as string) : undefined;
        }
      } catch {
        // Non-fatal — image just won't show
      }
    }

    return { ...acc, name, symbol, metadataUri: uri, imageUri };
  } catch {
    return acc;
  }
}

function toGatewayUrl(uri: string): string {
  if (uri.startsWith('ipfs://')) {
    const cid = uri.slice(7);
    return `${appConfig.storage.pinataGateway}/ipfs/${cid}`;
  }
  return uri;
}

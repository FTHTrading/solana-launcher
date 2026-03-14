import { PublicKey } from '@solana/web3.js';

// =============================================
// LIQUIDITY SERVICE — RAYDIUM V4 + METEORA DLMM
//
// Architecture:
//   - add_liquidity_raydium(): full Raydium AMM V4 flow
//   - add_liquidity_meteora(): Meteora DLMM (concentrated)
//   - remove_liquidity(): remove LP position
//   - lock_lp(): Raydium or Streamflow LP lock
//
// Status:
//   Core program IDs and pool structures are wired.
//   Full transaction construction requires the pool creation
//   fee (~0.4 SOL on mainnet) and an initialized token/SOL
//   market on OpenBook v2.
//
//   For MVP demo: UI is complete, user inputs are validated,
//   and the program addresses are correct. The transaction
//   builder is stubbed with INTEGRATION_PENDING comments so a
//   subsequent sprint can slot in the Raydium SDK calls with
//   minimal structural changes.
//
//   See: https://docs.raydium.io/raydium/traders/raydium-sdk
//       https://docs.meteora.ag/integration/dlmm-sdk
// =============================================

// ── Program IDs ──────────────────────────────────────────────

export const RAYDIUM_AMM_V4_PROGRAM_ID = new PublicKey(
  '675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8'
);

// Raydium open-book market program (OpenBook v2 on mainnet)
export const OPENBOOK_PROGRAM_ID = new PublicKey(
  'srmqPvymJeFKQ4zGQed1GFppgkRHL9kaELCbyksJtPX'
);

// Meteora DLMM (Dynamic Liquidity Market Maker)
export const METEORA_DLMM_PROGRAM_ID = new PublicKey(
  'LBUZKhRxPF3XUpBCjp4YzTKgLccjZhTSDM9YuVaPwxo'
);

// ── Types ──────────────────────────────────────────────────

export type DexProvider = 'raydium' | 'meteora';

export interface AddLiquidityParams {
  provider: DexProvider;
  mintAddress: string;   // The token to pair
  solAmount: number;     // SOL side of the pair
  tokenAmount: string;   // Token side (raw units string)
  slippageBps?: number;  // Basis points, default 100 = 1%
}

export interface LiquidityPosition {
  poolAddress: string;
  lpMintAddress: string;
  tokenAmount: string;
  solAmount: number;
  provider: DexProvider;
  txSignature: string;
  createdAt: Date;
}

export interface PoolInfo {
  poolAddress: string;
  baseMint: string;
  quoteMint: string;  // usually SOL (So11111...)
  lpMint: string;
  baseReserve: string;
  quoteReserve: string;
  lpSupply: string;
  price: number;
  provider: DexProvider;
}

// ── Raydium AMM V4 ──────────────────────────────────────────

/**
 * Create a new Raydium AMM V4 pool and add initial liquidity.
 *
 * Prerequisites (must be met before calling):
 *  1. Token must have Metaplex metadata on-chain.
 *  2. An OpenBook v2 market must exist for TOKEN/SOL.
 *     Create with: https://raydium.io/create-market/
 *  3. Creator wallet must hold ≥ 0.4 SOL for pool creation rent.
 *
 * Integration status: PENDING — Raydium SDK v2 transaction builder
 * Integration point: install `@raydium-io/raydium-sdk-v2`, call
 *   `Raydium.load({ connection, owner: wallet.publicKey })` then
 *   `raydium.liquidity.createPool(...)`.
 */
export async function addLiquidityRaydium(
  params: AddLiquidityParams
): Promise<LiquidityPosition> {
  // INTEGRATION_PENDING: Raydium SDK V2
  // Steps when integrating:
  //   1. import { Raydium } from '@raydium-io/raydium-sdk-v2'
  //   2. const raydium = await Raydium.load({ connection, owner, disableFeatureCheck: true })
  //   3. const { transaction, poolId } = await raydium.liquidity.createPool({ ... })
  //   4. wallet.signAndSendTransaction(transaction)
  //   5. await connection.confirmTransaction(...)

  throw new IntegrationPendingError(
    'raydium',
    'Full Raydium AMM V4 pool creation requires @raydium-io/raydium-sdk-v2. ' +
    'The UI, validation, and pool parameters are ready. Drop the SDK in and call build().'
  );
}

// ── Meteora DLMM ────────────────────────────────────────────

/**
 * Create a Meteora DLMM concentrated liquidity position.
 *
 * Integration status: PENDING — Meteora DLMM SDK
 * Integration point: install `@meteora-ag/dlmm`, call
 *   `DLMM.create(connection, poolAddress)` then
 *   `dlmmPool.addLiquidityByStrategy(...)`.
 */
export async function addLiquidityMeteora(
  params: AddLiquidityParams
): Promise<LiquidityPosition> {
  // INTEGRATION_PENDING: Meteora DLMM SDK
  // Steps when integrating:
  //   1. import DLMM from '@meteora-ag/dlmm'
  //   2. const dlmmPool = await DLMM.create(connection, new PublicKey(poolAddress))
  //   3. const { transactions } = await dlmmPool.addLiquidityByStrategy({ ... })
  //   4. for (const tx of transactions) await wallet.signAndSendTransaction(tx)

  throw new IntegrationPendingError(
    'meteora',
    'Full Meteora DLMM integration requires @meteora-ag/dlmm. ' +
    'UI and parameters are ready. Drop the SDK in and call build().'
  );
}

// ── Pool Lookup ──────────────────────────────────────────────

/**
 * Look up existing pools for a mint address.
 * Uses Raydium public API v3 and Meteora API.
 */
export async function getPoolsForMint(mintAddress: string): Promise<PoolInfo[]> {
  const pools: PoolInfo[] = [];

  // Raydium API v3
  try {
    const raydiumRes = await fetch(
      `https://api-v3.raydium.io/pools/info/mint?mint1=${mintAddress}&poolType=all&poolSortField=default&sortType=desc&pageSize=10&page=1`,
      { signal: AbortSignal.timeout(6_000) }
    );
    if (raydiumRes.ok) {
      const json = (await raydiumRes.json()) as { data?: { data?: RaydiumPoolResponse[] } };
      const items = json?.data?.data ?? [];
      for (const item of items) {
        pools.push({
          poolAddress: item.id,
          baseMint: item.mintA.address,
          quoteMint: item.mintB.address,
          lpMint: item.lpMint.address,
          baseReserve: item.mintAmountA?.toString() ?? '0',
          quoteReserve: item.mintAmountB?.toString() ?? '0',
          lpSupply: '0',
          price: item.price ?? 0,
          provider: 'raydium',
        });
      }
    }
  } catch {
    // Non-fatal: pool lookup failure just shows empty state
  }

  // Meteora API
  try {
    const meteoraRes = await fetch(
      `https://dlmm-api.meteora.ag/pair/all_by_groups?token_mint=${mintAddress}&limit=10`,
      { signal: AbortSignal.timeout(6_000) }
    );
    if (meteoraRes.ok) {
      const json = (await meteoraRes.json()) as { groups?: MeteoraPoolResponse[] };
      const pairs = json?.groups?.flatMap((g) => g.pairs) ?? [];
      for (const pair of pairs) {
        pools.push({
          poolAddress: pair.address,
          baseMint: pair.mint_x,
          quoteMint: pair.mint_y,
          lpMint: pair.address, // Meteora uses position NFTs, not LP mint
          baseReserve: pair.reserve_x_amount?.toString() ?? '0',
          quoteReserve: pair.reserve_y_amount?.toString() ?? '0',
          lpSupply: '0',
          price: pair.current_price ?? 0,
          provider: 'meteora',
        });
      }
    }
  } catch {
    // Non-fatal
  }

  return pools;
}

// ── Error ────────────────────────────────────────────────────

export class IntegrationPendingError extends Error {
  provider: DexProvider;
  constructor(provider: DexProvider, message: string) {
    super(message);
    this.name = 'IntegrationPendingError';
    this.provider = provider;
  }
}

// ── Response type helpers (loose, API shapes) ────────────────

interface RaydiumPoolResponse {
  id: string;
  mintA: { address: string };
  mintB: { address: string };
  lpMint: { address: string };
  mintAmountA?: number;
  mintAmountB?: number;
  price?: number;
}

interface MeteoraPoolResponse {
  pairs: {
    address: string;
    mint_x: string;
    mint_y: string;
    reserve_x_amount?: number;
    reserve_y_amount?: number;
    current_price?: number;
  }[];
}

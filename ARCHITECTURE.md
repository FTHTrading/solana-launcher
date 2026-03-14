# Architecture

## System Overview

Solana Launcher is a Next.js full-stack application with a React frontend, Next.js API routes as a thin backend, and direct Solana blockchain interaction from the browser via the Wallet Adapter.

The general flow is:

```
Browser (React + Wallet Adapter)
    │
    ├── UI Layer (components/)
    │       ├── Wizard form (React Hook Form + Zod)
    │       └── Wallet connection (Wallet Adapter React UI)
    │
    ├── Service Layer (services/)
    │       ├── Token launch service
    │       ├── Token burn service
    │       └── Fee service
    │
    ├── Lib Layer (lib/)
    │       ├── Solana connection config
    │       ├── Storage abstraction (IPFS)
    │       ├── Analytics adapter
    │       ├── Validation schemas
    │       └── Error handling utilities
    │
    └── API Routes (app/api/)
            ├── POST /api/upload  (server-side image upload)
            └── POST /api/metadata (server-side metadata upload)

Blockchain (Solana)
    ├── SPL Token Program (mint creation, ATA, minting)
    └── Metaplex Token Metadata Program (on-chain metadata)

Storage (IPFS)
    └── Pinata (image + metadata JSON)
```

---

## Frontend Architecture

- **App Router** (Next.js 14) with two route groups: `(marketing)` for public pages and `(dashboard)` for the wallet-connected app
- **Component hierarchy** separates UI primitives (`components/ui`), layout (`components/layout`), feature components (`components/launcher`, `components/dashboard`), and provider wrappers (`components/wallet`, `components/providers`)
- **React Hook Form + Zod** handles form state and validation at every wizard step. Schemas live in `lib/validation/token-schemas.ts`
- **TanStack Query** is wired in via `ReactQueryProvider` and is available for any server-state needs
- **Custom hooks** (`useTokenLaunch`, `useBurnToken`) own the transaction lifecycle and expose clean `txState`, `progressStep`, `result`, and `error` to consuming components

---

## Blockchain Interaction Flow

### Token Creation

1. **Client browser** calls `services/token-launcher/token-launch.service.ts#launchToken()`
2. Service calls `getStorageAdapter().uploadFile(imageFile)` → uploads image to IPFS, gets `ipfs://CID` URI
3. Service calls `getStorageAdapter().uploadMetadata(metadata)` → uploads metadata JSON to IPFS
4. Service builds a single `Transaction` containing:
   - `SystemProgram.createAccount` → creates the mint account with rent-exempt lamports
   - `createInitializeMintInstruction` → initializes mint with user as mint + freeze authority
   - `createAssociatedTokenAccountInstruction` → creates user's ATA for this mint
   - `createMintToInstruction` → mints the whole initial supply to user's ATA
   - `SystemProgram.transfer` → sends platform fee to treasury wallet
5. Transaction is partially signed by the mint keypair (ephemeral), then sent to wallet for user signature
6. Signed transaction is broadcast and confirmed with `confirmTransaction`
7. Second transaction attaches Metaplex `CreateMetadataAccountV3` instruction to the mint's metadata PDA

### Token Burn

1. Client calls `services/token-burn/token-burn.service.ts#burnTokens()`
2. Service derives the user's ATA for the mint
3. Builds a transaction with `createBurnInstruction`
4. User signs and broadcasts

---

## Metadata Storage Abstraction

The `lib/storage/storage.ts` module exports `getStorageAdapter()` which resolves a `StorageAdapter` implementation based on `NEXT_PUBLIC_STORAGE_PROVIDER`.

```typescript
interface StorageAdapter {
  uploadFile(file: File): Promise<UploadResult>;
  uploadMetadata(metadata: TokenMetadata): Promise<MetadataUploadResult>;
}
```

Currently implemented: **Pinata** (production-ready).
Stubbed: **NFT.Storage** (can be wired in as an alternative).

To swap providers, set `NEXT_PUBLIC_STORAGE_PROVIDER` to a different value and implement that provider's adapter.

IPFS URIs are converted to HTTP gateway URLs using `toGatewayUrl()` in the storage module.

---

## Fee Flow

- `services/fees/fees.service.ts#calculateFees()` computes the full fee breakdown
- The platform fee is included as a `SystemProgram.transfer` instruction in the same creation transaction — it is atomic with token creation
- Fee is only charged when the token is successfully created (no partial charges)
- Treasury wallet and fee amount are environment-variable-controlled

Future: `PRICING_TIERS` and referral/promo logic stubs are documented in `fees.service.ts`.

---

## Error Handling Approach

All errors flow through `lib/utils/errors.ts`:

- `parseBlockchainError(err)` converts raw Solana/wallet errors to `AppError` with structured codes
- `AppError` contains both a technical `message` and a human-safe `userMessage`
- Every UI surface only displays `userMessage` to avoid confusing blockchain jargon
- `analytics.track({ name: '*_failure' })` fires on all errors so product can track failure modes

---

## Analytics Instrumentation Approach

`lib/analytics/analytics.ts` exposes a typed `analytics` singleton that wraps a swappable `AnalyticsAdapter`.

- In development: logs to console (zero noise, structured)
- In production: replace or extend `adapter` with PostHog, Mixpanel, Segment, or custom DB events via `setAnalyticsAdapter()`
- Events are typed as a discriminated union (`AnalyticsEvent`) to enforce consistent payload shape
- Event calls are wrapped in try/catch — analytics errors never crash the app

---

## Future Liquidity Integration Strategy

The architecture is designed for DEX integration to be added as a separate service layer:

```
services/
  liquidity/
    add-liquidity.service.ts   (Raydium / Meteora AMM)
    remove-liquidity.service.ts
    pool-info.service.ts
```

The token creation flow returns the mint address and ATA, which are the required inputs for pool creation. A post-launch "Add Liquidity" step can be added to the wizard as step 5 without changing the existing flow.

---

## Why Custom On-Chain Programs Were Not Used

For v1, all functionality is achieved using:
- The standard **SPL Token Program** (mint, ATA, mint-to, burn)
- The **Metaplex Token Metadata Program** (on-chain metadata account)

Reasons:
1. Both programs are audited, battle-tested, and universally supported by wallets and explorers
2. Custom programs add deployment cost, upgrade key management, and audit overhead not justified by v1 requirements
3. Standard primitives are sufficient for token creation, fee collection (SOL transfer), and metadata

If a custom program becomes warranted (e.g., escrow-based launch mechanics, bonding curves, on-chain revenue sharing), it should be documented as a separate `programs/` workspace using Anchor.

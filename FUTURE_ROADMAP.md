# Future Roadmap

This document captures planned extensions beyond the v1 MVP. Items marked ✅ are already built. Remaining items have architecture stubs in the codebase where noted.

---

## Phase 1 — Live Now (MVP)

All items below are built, tested, and deployed.

- [x] **Wallet connection** — Phantom + Solflare + Backpack adapters with auto-detection
- [x] **4-step token launch wizard** — Details → Branding → Supply → Review with Zod validation
- [x] **IPFS metadata upload** — Server-side Pinata upload with rate limiting
- [x] **Metaplex on-chain metadata** — Token name, symbol, image URI on-chain
- [x] **Atomic fee collection** — Platform fee enforced in the same transaction as the mint
- [x] **Token burn flow** — Select amount, confirm, on-chain supply reduction
- [x] **Mint authority revocation** — Permanently fix token supply
- [x] **Freeze authority revocation** — Remove ability to freeze wallets (DEX listing requirement)
- [x] **Token trust score** — Visual card showing revoked authorities + metadata status
- [x] **Portfolio dashboard** — Live on-chain token balances with images from RPC
- [x] **Launch presets** — Meme Classic, Meme Maxi, Community, Scarce, Governance
- [x] **Admin treasury dashboard** — Live SOL balance, estimated launches, estimated revenue
- [x] **Liquidity pool discovery** — Raydium V3 API + Meteora DLMM API real-time pool lookup
- [x] **DEX deep-link routing** — Raydium, Meteora, Orca, Jupiter pool creation links
- [x] **Implied price calculator** — SOL + token amounts → price per token
- [x] **Rate limiting** — Upstash Redis distributed, in-memory fallback
- [x] **Env validation** — Schema-based startup checks with placeholder detection, mainnet safety
- [x] **Structured logging** — JSON in production, human-readable in dev, async timing
- [x] **Network awareness** — Devnet/mainnet banner + low-SOL warnings
- [x] **Test coverage** — 32 passing vitest tests across 4 suites
- [x] **CI pipeline** — `npm run verify` → typecheck + test + build
- [x] **Legal & compliance** — Terms, Privacy, Risk Disclosure with Kuwait/GCC regulatory citations
- [x] **Health endpoint** — `/api/health` with env status, version, network info
- [x] **Homepage as proposal** — 9-section client-facing page mapping brief to implementation

---

## Phase 2 — Growth & Ecosystem (Complete)

All items below are built and integrated.

- [x] **Premium launch tiers** — Standard (0.1 SOL), Premium (0.25 SOL), Featured (0.5 SOL) with feature gating
  - Implementation: `services/fees/fees.service.ts`
- [x] **Referral + affiliate system** — Referral codes, commission tracking, discount stacking
  - Implementation: `services/referral/referral.service.ts`
- [x] **White-label multi-tenant system** — Branding, fee splits, domain routing, feature flags
  - Implementation: `lib/config/white-label.ts`
- [x] **Token page generator** — Dynamic `/token/[mint]` pages with trust score, on-chain data, pools
  - Implementation: `app/(dashboard)/token/[mint]/page.tsx`, `components/token/TokenPageClient.tsx`
- [x] **Ecosystem hub** — 15+ Solana partner integrations across 6 categories
  - DEX: Jupiter, Raydium, Meteora, Orca
  - Analytics: Birdeye, DexScreener
  - Infrastructure: Jito, Streamflow, Squads, Pyth
  - Tools: Wormhole, Bonfida/SNS, Realms, Dialect
  - Core: Helius, Metaplex, Token-2022, Pinata, SPL Token, OpenBook V2
  - Implementation: `components/ecosystem/EcosystemHub.tsx`
- [x] **Post-launch checklist** — 13-step guided flow: security → liquidity → community → analytics → growth
  - Implementation: `components/ecosystem/PostLaunchChecklist.tsx`
- [x] **Helius webhook monitoring** — Real-time transfer, whale, pool, swap, burn, authority change notifications
  - Implementation: `components/ecosystem/PostLaunchClient.tsx`
- [x] **4-DEX swap routing** — Jupiter, Raydium, Meteora, Orca deep-link trade routing
  - Implementation: `components/ecosystem/TradeClient.tsx`

---

## Phase 3 — On-Chain SDK & Expansion

Architecture prepared. These items require deeper SDK integration:

- [ ] **Raydium AMM V4 liquidity add/remove** — `@raydium-io/raydium-sdk-v2`
  - Integration points documented in `services/liquidity/liquidity.service.ts`
- [ ] **Meteora DLMM pool creation** — `@meteora-ag/dlmm`
  - Integration points documented in `services/liquidity/liquidity.service.ts`
- [ ] **Custom Rust on-chain programs** — For bespoke tokenomics, custom fee enforcement, or advanced pool mechanics
- [ ] **Launch analytics dashboard** — Conversion funnel, revenue tracking, Birdeye API integration
- [ ] **Multi-language support** — EN, AR, FR, HI, UR with full RTL support
- [ ] **Mobile-optimized PWA** — Progressive web app with wallet deep links
- [ ] **Launch success share card** — OG image generation for sharing on X/Twitter

---

## Technical Debt / Optimization

- [ ] Auto-fetch token decimals from mint account on burn form (currently hard-coded to 6)
- [ ] Persistent token portfolio from on-chain SPL token accounts (using `getParsedTokenAccountsByOwner`)
- [ ] Transaction retry with exponential backoff on RPC errors
- [ ] Optimistic UI updates with TanStack Query mutations
- [ ] Mobile wallet deep link support

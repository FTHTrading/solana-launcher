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

## Phase 2 — Native Liquidity Execution

Architecture prepared. UI, validation, and pool discovery are complete. These items require DEX SDK integration:

- [ ] **Raydium AMM V4 liquidity add/remove** — `@raydium-io/raydium-sdk-v2`
  - Integration points documented in `services/liquidity/liquidity.service.ts`
- [ ] **Meteora DLMM pool creation** — `@meteora-ag/dlmm`
  - Integration points documented in `services/liquidity/liquidity.service.ts`
- [ ] **Referral + affiliate system** — Referral codes with configurable commission splits
  - Types defined in `types/index.ts#ReferralInfo`
- [ ] **Premium launch tiers** — Standard / Premium / Featured packages
  - Stubs in `services/fees/fees.service.ts#PRICING_TIERS`
- [ ] **Promo codes / discounts** — Coupon system for fee discounts
- [ ] **Token page generator** — Auto-generated `/token/[mintAddress]` page with token details
- [ ] **Launch success share card** — OG image generation for sharing on X/Twitter
- [ ] **Post-launch checklist** — Guided "what to do next" flow after successful launch

---

## Phase 3 — Advanced Extensions

Optional enhancements for scale and differentiation:

- [ ] **Custom Rust on-chain programs** — For bespoke tokenomics, custom fee enforcement, or advanced pool mechanics. V1 is built on battle-tested SPL Token + Metaplex standards by design.
- [ ] **Launch analytics dashboard** — Conversion funnel, revenue, drop-off
- [ ] **Multi-tenant admin** — Feature flags, suspicious launch detection, platform config
- [ ] **White-label / public API** — Branded deployments for third-party operators
- [ ] **Custom domain + branding** — Per-deployment theming and domain routing
- [ ] **PostHog / Mixpanel integration** — Replace console analytics adapter
- [ ] **Persistent launch history** — Prisma + Supabase/Postgres for on-platform history feed

---

## Technical Debt / Optimization

- [ ] Auto-fetch token decimals from mint account on burn form (currently hard-coded to 6)
- [ ] Persistent token portfolio from on-chain SPL token accounts (using `getParsedTokenAccountsByOwner`)
- [ ] Transaction retry with exponential backoff on RPC errors
- [ ] Optimistic UI updates with TanStack Query mutations
- [ ] Mobile wallet deep link support

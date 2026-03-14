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

## Phase 3 — Multilingual UX Foundation (Complete)

Client-side internationalization shipped with persistent locale switching and RTL support.

- [x] **5-language UI support** — EN, AR (RTL), FR, HI, UR (RTL) with ~100 translation keys each
  - Implementation: `lib/i18n/translations/en.ts`, `ar.ts`, `fr.ts`, `hi.ts`, `ur.ts`
- [x] **Type-safe translation system** — `TranslationDictionary` interface with compile-time key validation
  - Implementation: `lib/i18n/types.ts`
- [x] **I18n provider + hook** — React Context with `useTranslation()`, SSR-safe hydration, localStorage persistence
  - Implementation: `lib/i18n/i18n-context.tsx`
- [x] **RTL support** — Dynamic `html dir` + `lang` attribute updates, CSS RTL utilities for margins, flex, text alignment
  - Implementation: `app/globals.css` (RTL section), `lib/i18n/i18n-context.tsx`
- [x] **Language switcher** — Dropdown with flags, native labels, active indicator
  - Implementation: `components/layout/LanguageSwitcher.tsx`
- [x] **Translated marketing surfaces** — Hero, section titles, steps, pricing, feasibility, FAQ, CTA, header, footer
  - Implementation: `app/(marketing)/page.tsx`, `site-header.tsx`, `site-footer.tsx`
- Commit: `61e9405`

---

## Phase 4 — Translation Coverage & RTL Polish

Extend i18n to all product flows and audit RTL visual parity.

- [ ] **Dashboard translation coverage** — Portfolio, token management, admin panels
- [ ] **Launch wizard translation** — All 4 steps, validation messages, presets, confirmation
- [ ] **Error + toast translation** — Validation errors, wallet rejection, RPC failures, success confirmations
- [ ] **Hardcoded string sweep** — Systematic audit for remaining English-only strings across all views
- [ ] **RTL visual QA** — Breakpoint-by-breakpoint audit of Arabic + Urdu layouts (icon direction, spacing, dropdowns, mixed LTR data)
- [ ] **Locale persistence across flows** — Language carries through auth, wallet, token creation, receipts
- [ ] **Mobile language switcher** — Responsive dropdown behavior on small screens

---

## Phase 5 — SEO-Grade Internationalization

Full search engine discoverability for multilingual audiences.

- [ ] **Locale-aware metadata** — `<title>`, `<meta description>`, Open Graph per language
- [ ] **`hreflang` tags** — Proper `<link rel="alternate" hreflang="...">` for all 5 locales
- [ ] **Canonical strategy** — Prevent duplicate content across language variants
- [ ] **Optional locale-prefixed routes** — `/ar/`, `/fr/`, `/hi/`, `/ur/` if targeting organic search traffic
- [ ] **Server-aware locale handling** — Cookie/header-based detection for SSR metadata
- [ ] **Launch success share card** — OG image generation with locale-aware text for social sharing

---

## Phase 6 — On-Chain SDK & Expansion

Architecture prepared. These items require deeper SDK integration:

- [ ] **Raydium AMM V4 liquidity add/remove** — `@raydium-io/raydium-sdk-v2`
  - Integration points documented in `services/liquidity/liquidity.service.ts`
- [ ] **Meteora DLMM pool creation** — `@meteora-ag/dlmm`
  - Integration points documented in `services/liquidity/liquidity.service.ts`
- [ ] **Custom Rust on-chain programs** — For bespoke tokenomics, custom fee enforcement, or advanced pool mechanics
- [ ] **Launch analytics dashboard** — Conversion funnel, revenue tracking, Birdeye API integration
- [ ] **Mobile-optimized PWA** — Progressive web app with wallet deep links

---

## Technical Debt / Optimization

- [ ] Auto-fetch token decimals from mint account on burn form (currently hard-coded to 6)
- [ ] Persistent token portfolio from on-chain SPL token accounts (using `getParsedTokenAccountsByOwner`)
- [ ] Transaction retry with exponential backoff on RPC errors
- [ ] Optimistic UI updates with TanStack Query mutations
- [ ] Mobile wallet deep link support

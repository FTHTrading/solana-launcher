# Future Roadmap

This document captures the full product trajectory — what is live, what shipped post-MVP, and what comes next. Every item uses explicit status labels so readers know exactly where things stand.

### Status Legend

| Label | Meaning |
|-------|---------|
| ✅ Built | Shipped, tested, deployed |
| 🟡 In Progress | Active development |
| 🧭 Designed | Scoped and specified, not yet started |
| 🧱 Stubbed | Architecture boundaries and integration points exist in code |
| 🧪 Experimental | Exploratory — approach not yet finalized |

---

## Phase 1 — Core Product (Live)

> **Business impact:** Trust + Conversion — proves the product works end to end.

All items below are built, tested, and deployed.

- ✅ **Wallet connection** — Phantom + Solflare + Backpack adapters with auto-detection
- ✅ **4-step token launch wizard** — Details → Branding → Supply → Review with Zod validation
- ✅ **IPFS metadata upload** — Server-side Pinata upload with rate limiting
- ✅ **Metaplex on-chain metadata** — Token name, symbol, image URI on-chain
- ✅ **Atomic fee collection** — Platform fee enforced in the same transaction as the mint
- ✅ **Token burn flow** — Select amount, confirm, on-chain supply reduction
- ✅ **Mint authority revocation** — Permanently fix token supply
- ✅ **Freeze authority revocation** — Remove ability to freeze wallets (DEX listing requirement)
- ✅ **Token trust score** — Visual card showing revoked authorities + metadata status
- ✅ **Portfolio dashboard** — Live on-chain token balances with images from RPC
- ✅ **Launch presets** — Meme Classic, Meme Maxi, Community, Scarce, Governance
- ✅ **Admin treasury dashboard** — Live SOL balance, estimated launches, estimated revenue
- ✅ **Liquidity pool discovery** — Raydium V3 API + Meteora DLMM API real-time pool lookup
- ✅ **DEX deep-link routing** — Raydium, Meteora, Orca, Jupiter pool creation links
- ✅ **Implied price calculator** — SOL + token amounts → price per token
- ✅ **Rate limiting** — Upstash Redis distributed, in-memory fallback
- ✅ **Env validation** — Schema-based startup checks with placeholder detection, mainnet safety
- ✅ **Structured logging** — JSON in production, human-readable in dev, async timing
- ✅ **Network awareness** — Devnet/mainnet banner + low-SOL warnings
- ✅ **Test coverage** — 32 passing vitest tests across 4 suites
- ✅ **CI pipeline** — `npm run verify` → typecheck + test + build
- ✅ **Legal & compliance** — Terms, Privacy, Risk Disclosure with Kuwait/GCC regulatory citations
- ✅ **Health endpoint** — `/api/health` with env status, version, network info
- ✅ **Homepage as proposal** — 9-section client-facing page mapping brief to implementation

---

## Phase 2 — Revenue, Distribution & Ecosystem (Complete)

> **Business impact:** Revenue + Retention — turns the product into a platform with monetization, affiliates, and post-launch stickiness.

All items below are built and integrated.

- ✅ **Premium launch tiers** — Standard (0.1 SOL), Premium (0.25 SOL), Featured (0.5 SOL) with feature gating
  - Implementation: `services/fees/fees.service.ts`
- ✅ **Referral + affiliate system** — Referral codes, commission tracking, discount stacking
  - Implementation: `services/referral/referral.service.ts`
- ✅ **White-label multi-tenant system** — Branding, fee splits, domain routing, feature flags
  - Implementation: `lib/config/white-label.ts`
- ✅ **Token page generator** — Dynamic `/token/[mint]` pages with trust score, on-chain data, pools
  - Implementation: `app/(dashboard)/token/[mint]/page.tsx`, `components/token/TokenPageClient.tsx`
- ✅ **Ecosystem hub** — 15+ Solana partner integrations across 6 categories
  - DEX: Jupiter, Raydium, Meteora, Orca
  - Analytics: Birdeye, DexScreener
  - Infrastructure: Jito, Streamflow, Squads, Pyth
  - Tools: Wormhole, Bonfida/SNS, Realms, Dialect
  - Core: Helius, Metaplex, Token-2022, Pinata, SPL Token, OpenBook V2
  - Implementation: `components/ecosystem/EcosystemHub.tsx`
- ✅ **Post-launch checklist** — 13-step guided flow: security → liquidity → community → analytics → growth
  - Implementation: `components/ecosystem/PostLaunchChecklist.tsx`
- ✅ **Helius webhook monitoring** — Real-time transfer, whale, pool, swap, burn, authority change notifications
  - Implementation: `components/ecosystem/PostLaunchClient.tsx`
- ✅ **4-DEX swap routing** — Jupiter, Raydium, Meteora, Orca deep-link trade routing
  - Implementation: `components/ecosystem/TradeClient.tsx`

---

## Phase 3 — Multilingual UX Foundation (Complete)

> **Business impact:** Global Reach — opens the product to Arabic, French, Hindi, and Urdu markets with proper RTL support.

Client-side internationalization shipped with persistent locale switching and RTL support.

- ✅ **5-language UI support** — EN, AR (RTL), FR, HI, UR (RTL) with ~100 translation keys each
  - Implementation: `lib/i18n/translations/en.ts`, `ar.ts`, `fr.ts`, `hi.ts`, `ur.ts`
- ✅ **Type-safe translation system** — `TranslationDictionary` interface with compile-time key validation
  - Implementation: `lib/i18n/types.ts`
- ✅ **I18n provider + hook** — React Context with `useTranslation()`, SSR-safe hydration, localStorage persistence
  - Implementation: `lib/i18n/i18n-context.tsx`
- ✅ **RTL support** — Dynamic `html dir` + `lang` attribute updates, CSS RTL utilities for margins, flex, text alignment
  - Implementation: `app/globals.css` (RTL section), `lib/i18n/i18n-context.tsx`
- ✅ **Language switcher** — Dropdown with flags, native labels, active indicator
  - Implementation: `components/layout/LanguageSwitcher.tsx`
- ✅ **Translated marketing surfaces** — Hero, section titles, steps, pricing, feasibility, FAQ, CTA, header, footer
  - Implementation: `app/(marketing)/page.tsx`, `site-header.tsx`, `site-footer.tsx`
- Commit: `61e9405`

---

## Phase 4 — Translation Coverage & RTL Polish

> **Business impact:** Global Reach + UX Quality — ensures non-English users get a complete, polished experience across every product flow, not just the marketing shell.

Extend i18n to all product flows and audit RTL visual parity.

- 🧭 **Dashboard translation coverage** — Portfolio, token management, admin panels
- 🧭 **Launch wizard translation** — All 4 steps, validation messages, presets, confirmation
- 🧭 **Error + toast translation** — Validation errors, wallet rejection, RPC failures, success confirmations
- 🧭 **Hardcoded string sweep** — Systematic audit for remaining English-only strings across all views
- 🧭 **RTL visual QA** — Breakpoint-by-breakpoint audit of Arabic + Urdu layouts (icon direction, spacing, dropdowns, mixed LTR data)
- 🧭 **Locale persistence across flows** — Language carries through auth, wallet, token creation, receipts
- 🧭 **Mobile language switcher** — Responsive dropdown behavior on small screens

---

## Phase 5 — SEO-Grade Internationalization

> **Business impact:** Organic Acquisition — makes the product discoverable in 5 languages through search engines, not just usable for visitors who already found it.
>
> **Dependency:** Requires Phase 4 translation parity and hardcoded string cleanup. SEO-grade i18n without full translation coverage creates awkward half-translated search surfaces.

Full search engine discoverability for multilingual audiences.

- 🧭 **Locale-aware metadata** — `<title>`, `<meta description>`, Open Graph per language
- 🧭 **`hreflang` tags** — Proper `<link rel="alternate" hreflang="...">` for all 5 locales
- 🧭 **Canonical strategy** — Prevent duplicate content across language variants
- 🧭 **Optional locale-prefixed routes** — `/ar/`, `/fr/`, `/hi/`, `/ur/` if targeting organic search traffic
- 🧭 **Server-aware locale handling** — Cookie/header-based detection for SSR metadata
- 🧭 **Launch success share card** — OG image generation with locale-aware text for social sharing

---

## Phase 6 — Liquidity & On-Chain Integrations

> **Business impact:** Product Depth + Retention — lets users manage liquidity natively instead of leaving the platform for Raydium/Meteora.
>
> These items are **not yet shipped**. The codebase includes service boundaries and documented integration points, but production support requires additional SDK implementation, testing, and mainnet validation.

- 🧱 **Raydium AMM V4 liquidity add/remove** — `@raydium-io/raydium-sdk-v2`
  - Integration points documented in `services/liquidity/liquidity.service.ts`
- 🧱 **Meteora DLMM pool creation** — `@meteora-ag/dlmm`
  - Integration points documented in `services/liquidity/liquidity.service.ts`

---

## Phase 7 — Platform Intelligence & Mobile

> **Business impact:** Conversion + Retention — gives operators actionable data and gives users a mobile-native experience.

- 🧪 **Launch analytics dashboard** — Conversion funnel, revenue tracking, Birdeye API integration
- 🧪 **Mobile-optimized PWA** — Progressive web app with wallet deep links
- 🧪 **Mobile wallet deep link support** — Direct open in Phantom/Solflare mobile apps

---

## Phase 8 — Custom On-Chain Programs

> **Business impact:** Developer Flexibility + Differentiation — enables bespoke tokenomics that cannot be built with standard SPL primitives.

- 🧪 **Custom Rust on-chain programs** — For bespoke tokenomics, custom fee enforcement, or advanced pool mechanics
- 🧪 **Advanced authority controls** — Programmatic mint schedules, conditional freezes, governance-gated actions
- 🧪 **Custom pool mechanics** — Non-standard AMM curves, bonding curves, or staged liquidity release

---

## Technical Debt & Reliability

> **Business impact:** Trust + Stability — reduces edge-case failures and improves the experience for power users.

- 🧭 Auto-fetch token decimals from mint account on burn form (currently hard-coded to 6)
- 🧭 Persistent token portfolio from on-chain SPL token accounts (using `getParsedTokenAccountsByOwner`)
- 🧭 Transaction retry with exponential backoff on RPC errors
- 🧭 Optimistic UI updates with TanStack Query mutations

---

## Recommended Next Build Order

The sequence below reflects business priority, technical dependency, and client value:

| Priority | Phase | Primary outcome |
|----------|-------|-----------------|
| 1 | **Phase 4** — Translation coverage & RTL polish | Complete multilingual UX |
| 2 | **Phase 5** — SEO-grade internationalization | Organic acquisition in 5 languages |
| 3 | **Phase 6** — Raydium / Meteora native liquidity | Product depth, reduce platform exits |
| 4 | **Technical debt** — Reliability upgrades | Trust + stability for power users |
| 5 | **Phase 7** — Analytics dashboard + PWA | Operator intelligence, mobile reach |
| 6 | **Phase 8** — Custom on-chain programs | Differentiation for advanced clients |

Phase 5 should not begin until Phase 4 is complete. All other phases can be parallelized if resourcing allows.

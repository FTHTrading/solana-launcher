# Changelog

All notable changes to **Solana SPL Token Launcher** are documented here.

---

## v0.3.0 — Multilingual UX Foundation (2025-06-14)

Phase 3 complete: client-side multilingual UX foundation shipped with persistent locale switching and RTL support.

### Added

- **5-language UI** — English, Arabic, French, Hindi, Urdu with full translation coverage across nav, hero, features, footer, and homepage sections
- **RTL layout support** — Automatic `dir="rtl"` on `<html>` for Arabic and Urdu, with CSS logical properties for bidirectional rendering
- **Persistent locale switching** — Language preference stored in `localStorage`, restored on reload, SSR-safe hydration guard
- **Dynamic `lang` / `dir` attributes** — `<html>` element updated on every locale change via React Context
- **Language switcher** — Inline selector in site header with flag + native-script labels

### Updated

- Translated all marketing surfaces — nav links, hero headlines, feature cards, CTA buttons, footer text (~100 keys per locale)
- Site header and footer refactored to consume `useI18n()` context

### Verified

- TypeScript strict — 0 errors across all new i18n modules
- Commit: `61e9405`

---

## v0.2.0 — Platform Features & Monetisation (2025-06-13)

Phase 2 complete: white-label engine, premium tiers, referral system, and ecosystem partnerships.

### Added

- **White-label configuration** — Branding, colours, domain, and fee overrides via `lib/config/white-label.ts`
- **Premium tier system** — Free / Pro / Enterprise plans with feature gates in `services/fees/fees.service.ts`
- **Referral engine** — Invite codes, commission tracking, payout logic in `services/referral/referral.service.ts`
- **Token management pages** — Mint, burn, freeze, revoke authority flows
- **15+ ecosystem partners** — Raydium, Jupiter, Birdeye, Helius, DexScreener, and more
- **Post-launch checklist** — Guided steps for liquidity, listing, and marketing

### Verified

- Commit: `f199c30`

---

## v0.1.0 — Core Token Launcher (2025-06-12)

Phase 1 complete: production-grade SPL token creation with metadata, IPFS upload, and live deployment.

### Added

- **SPL token creation** — Mint with configurable supply, decimals, and authorities via `@solana/spl-token`
- **Token Metadata Program v2** — On-chain name, symbol, URI via `@metaplex-foundation/mpl-token-metadata`
- **IPFS metadata upload** — Image + JSON pinned to Pinata with deterministic CID
- **Multi-step creation wizard** — React Hook Form + Zod validation, wallet connection, transaction signing
- **Solana wallet integration** — Phantom, Solflare, Backpack via `@solana/wallet-adapter`
- **Fee collection** — Platform fee on token creation, configurable per environment
- **Rate limiting** — Upstash Redis-backed per-wallet throttling
- **Health endpoint** — `/api/health` for uptime monitoring
- **Homepage** — 9-section Freelancer proposal response with live feature showcase

### Verified

- Deployed to Vercel at `launch.unykorn.org`
- Commits: `5ff99d8` → `30ebb50`

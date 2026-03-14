# Future Roadmap

This document captures planned extensions beyond the v1 MVP. Extension points are already stubbed in the codebase where noted.

---

## Phase 2 — Enhanced Launch Experience

- [ ] **Mint authority revoke** — one-click option post-launch to renounce mint authority, making token supply permanently fixed
- [ ] **Freeze authority revoke** — one-click to renounce freeze authority
- [ ] **Token page generator** — auto-generate a shareable `/token/[mintAddress]` page with token details and buy link
- [ ] **Launch success share card** — OG image generation for sharing your launch on X/Twitter
- [ ] **Post-launch checklist** — guided "what to do next" flow after a successful launch

---

## Phase 3 — Premium Launch Tiers

- [ ] **Pricing tiers** — Standard / Premium / Featured packages
  - Stubs in `services/fees/fees.service.ts#PRICING_TIERS`
- [ ] **Featured launches** — promoted placement on a public launch feed
- [ ] **Launch templates** — pre-configured token templates (meme, utility, governance)
- [ ] **Referral program** — referral codes with configurable commission splits
  - Types defined in `types/index.ts#ReferralInfo`
- [ ] **Promo codes / discounts** — coupon system for fee discounts

---

## Phase 4 — DEX Liquidity Integration

- [ ] **Raydium pool creation** — add initial liquidity post-launch
- [ ] **Meteora AMM** — alternative AMM integration
- [ ] **Liquidity management dashboard** — view pool stats, add/remove liquidity
- [ ] Architecture stubs documented in `ARCHITECTURE.md` under "Future Liquidity Integration"

---

## Phase 5 — Analytics & Admin

- [ ] **Launch analytics dashboard** — conversion funnel, revenue, drop-off
- [ ] **Admin panel stubs**:
  - Total fees collected
  - Recent launches feed
  - Flagged/suspicious launches
  - Platform config panel
  - Feature flags
- [ ] **PostHog / Mixpanel integration** — replace console analytics adapter
- [ ] **Persistent launch history** — Prisma + Supabase/Postgres for on platform history feed

---

## Phase 6 — Trust & Compliance

- [ ] **Allowlist / denylist system** — moderation layer for flagged token names
- [ ] **Terms acceptance flow** — explicit ToS acknowledgement before launch
- [ ] **Token reporting** — community flag mechanism
- [ ] **Jurisdiction notes** — region-aware risk warnings

---

## Technical Debt / Optimization

- [ ] Auto-fetch token decimals from mint account on burn form (currently hard-coded to 6)
- [ ] Persistent token portfolio from on-chain SPL token accounts (using `getParsedTokenAccountsByOwner`)
- [ ] Transaction retry with exponential backoff on RPC errors
- [ ] Optimistic UI updates with TanStack Query mutations
- [ ] Dark mode toggle (CSS variables and Tailwind dark mode are already wired)
- [ ] Mobile wallet deep link support

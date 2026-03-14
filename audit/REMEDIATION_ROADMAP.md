# Solana Launcher — Remediation Roadmap

**Audit Date:** 2025-07-15  
**Priority System:** P0 (Critical) → P1 (High) → P2 (Medium) → P3 (Low)

---

## Phase 1: Critical Fixes & Deployment Readiness (P0) — Weeks 1-2

> **Goal:** Fix blocking issues, deploy to a hosting provider.

### 1.1 Fix Package Version ⏱️ Done

- [x] Update `package.json` version from `0.1.0` to `1.0.0` ✅ IMPLEMENTED

### 1.2 Complete or Disable Liquidity Feature ⏱️ 2 hours (disable) / 40 hours (complete)

**Option A — Disable (recommended for now):**
- [ ] Mark liquidity UI as "Coming Soon" with disabled state
- [ ] Add informational toast when users try to add liquidity
- [ ] Keep pool lookup functional (read-only is valuable)

**Option B — Complete (future sprint):**
- [ ] Implement Raydium CLMM `addLiquidity` using SDK
- [ ] Implement Meteora DLMM `addLiquidity` using SDK
- [ ] Add LP token tracking
- [ ] Add position management

### 1.3 Add Test Framework ⏱️ 16 hours

- [ ] Configure Vitest (faster than Jest for Vite/Next.js)
- [ ] Write unit tests for `token-schemas.ts` (validation edge cases)
- [ ] Write unit tests for `errors.ts` (error mapping)
- [ ] Write unit tests for `fees.service.ts` (fee calculations)
- [ ] Write integration tests for `storage.ts` (mock Pinata)
- [ ] Write integration tests for `token-launch.service.ts` (mock Connection)
- [ ] Target: 50%+ code coverage on service layer
- [ ] Add test script to `package.json`

### 1.4 Deploy to Hosting Provider ⏱️ 4 hours

- [ ] Deploy to Vercel (recommended for Next.js)
- [ ] Configure environment variables
- [ ] Set up custom domain
- [ ] Verify all routes work in production
- [ ] Add health check endpoint

---

## Phase 2: Security & Infrastructure (P1) — Weeks 3-4

> **Goal:** Achieve defense-in-depth web security.

### 2.1 Add Security Headers Middleware ⏱️ 2 hours

- [ ] Create `middleware.ts` with CSP, X-Frame-Options, HSTS, etc.
- [ ] Test with https://securityheaders.com
- [ ] Add rate limit headers to API responses

### 2.2 Upgrade Rate Limiter ⏱️ 4 hours

- [ ] Replace in-memory rate limiter with Upstash Redis or Vercel KV
- [ ] Ensure persistence across server restarts
- [ ] Add per-route rate limit configuration

### 2.3 Add Image Magic Byte Validation ⏱️ 2 hours

- [ ] Install `file-type` package
- [ ] Validate file magic bytes server-side in `/api/upload`
- [ ] Reject files where magic bytes don't match declared MIME type

### 2.4 Set Up CI/CD ⏱️ 4 hours

- [ ] Create `.github/workflows/ci.yml`:
  - Lint, type-check, test on PR
  - Require all checks pass before merge
- [ ] Create `.github/workflows/deploy.yml`:
  - Auto-deploy `main` to production
  - Preview deploys on PR branches
- [ ] Add branch protection rules

### 2.5 Complete Storage Fallbacks ⏱️ 8 hours

- [ ] Implement NFT.Storage adapter (or remove from codebase)
- [ ] Add storage failover (try Pinata → fallback to NFT.Storage)
- [ ] Add IPFS gateway fallback URLs

### 2.6 Add Error Tracking ⏱️ 2 hours

- [ ] Integrate Sentry for error tracking
- [ ] Configure source maps
- [ ] Set up alert rules for error spikes

---

## Phase 3: Features & Data (P2) — Weeks 5-8

> **Goal:** Add data persistence, production analytics, and real metrics.

### 3.1 Add Database ⏱️ 16 hours

- [ ] Set up Supabase, PlanetScale, or Neon Postgres
- [ ] Create schema: launches, burns, revocations, users
- [ ] Record every token creation with metadata, tx signature, timestamp
- [ ] Replace estimated admin metrics with actual counts

### 3.2 Add Production Analytics ⏱️ 4 hours

- [ ] Implement PostHog or Mixpanel adapter (replace console adapter)
- [ ] Track: page views, wizard completions, launches, burns, errors
- [ ] Add funnel analysis for launch wizard

### 3.3 RPC Failover ⏱️ 4 hours

- [ ] Support multiple RPC endpoints in config
- [ ] Implement automatic failover with health checks
- [ ] Consider Helius or QuickNode for premium RPC

### 3.4 Upgrade Next.js ⏱️ 8 hours

- [ ] Upgrade from 14.2.16 to 15.x
- [ ] Address breaking changes (App Router stability improvements)
- [ ] Upgrade React 18 → 19

---

## Phase 4: Compliance & Polish (P3) — Weeks 9-10

> **Goal:** Legal readiness and professional polish.

### 4.1 Legal Documents ⏱️ 8 hours (legal review required)

- [ ] Create Terms of Service
- [ ] Create Privacy Policy
- [ ] Create full Risk Disclosure page (expand ComplianceBanner)
- [ ] Add KYC/AML considerations documentation

### 4.2 Accessibility ⏱️ 4 hours

- [ ] Run Lighthouse accessibility audit
- [ ] Add ARIA labels to wizard steps
- [ ] Add keyboard navigation support
- [ ] Add screen reader support for transaction progress

### 4.3 Transaction Simulation ⏱️ 4 hours

- [ ] Add `simulateTransaction` before `sendRawTransaction`
- [ ] Show simulation results to user before signing
- [ ] Catch errors before broadcast

---

## Implementation Status

| Fix | Status | Details |
|---|---|---|
| Fix package.json version to 1.0.0 | ✅ Implemented | This audit |
| All other items | ❌ Pending | See roadmap above |

---

## Estimated Total Effort

| Phase | Effort |
|---|---|
| Phase 1: Critical & Deployment | ~22 hours |
| Phase 2: Security & Infrastructure | ~22 hours |
| Phase 3: Features & Data | ~32 hours |
| Phase 4: Compliance & Polish | ~16 hours |
| **Total** | **~92 hours** |

---

*End of Remediation Roadmap — Solana Launcher*

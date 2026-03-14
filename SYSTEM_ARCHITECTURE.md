# System Architecture — Solana SPL Token Launcher

**Platform:** launch.unykorn.org
**Repository:** github.com/FTHTrading/solana-launcher
**Stack:** Next.js 14 · TypeScript (strict) · Tailwind CSS · Solana Web3.js · SPL Token · Metaplex · Pinata IPFS
**Deployment:** Vercel (edge) · Devnet default · Mainnet-ready
**Companion:** donk.unykorn.org (Donk AI — Cloudflare Workers)

---

## Table of Contents

1. [System Overview](#1-system-overview)
2. [Product Layers](#2-product-layers)
3. [User Flows](#3-user-flows)
4. [Operator Flows](#4-operator-flows)
5. [Revenue Model](#5-revenue-model)
6. [Technical Stack](#6-technical-stack)
7. [Route Map](#7-route-map)
8. [Demo Mode vs Live Mode](#8-demo-mode-vs-live-mode)
9. [Security & Compliance](#9-security--compliance)
10. [Expansion Surface](#10-expansion-surface)

---

## Document Map

This is the hub document. The repo contains specialized docs for each concern. Each entry includes a **when to read** note so you know which document to reach for in context.

### Getting Started

| Document | Purpose | When to read |
|----------|---------|--------------|
| [README.md](README.md) | Project overview, badges, deployment pipeline diagram | First time visiting the repo. Getting oriented. |
| [SETUP.md](SETUP.md) | Local dev setup — clone, install, env vars, first run | Setting up a local dev environment for the first time. |
| [DEPLOYMENT.md](DEPLOYMENT.md) | Vercel deployment, env config, production checklist | Deploying to production or configuring Vercel env vars. |

### Architecture & Standards

| Document | Purpose | When to read |
|----------|---------|--------------|
| **SYSTEM_ARCHITECTURE.md** | ← You are here. Full system map, layers, flows, revenue | Understanding the product end to end — features, revenue, flows. |
| [ARCHITECTURE.md](ARCHITECTURE.md) | Technical architecture — component tree, service layer, data flow | Modifying code and need to understand the component hierarchy. |
| [SYSTEM_STANDARD.md](SYSTEM_STANDARD.md) | Engineering quality gates (truth, structure, security, observability, resilience, documentation) | Contributing code — checking which standards apply to your change. |
| [SECURITY_NOTES.md](SECURITY_NOTES.md) | Wallet safety, transaction confirmation, env hygiene, rate limiting | Reviewing security posture or auditing wallet/transaction handling. |

### Roadmap & History

| Document | Purpose | When to read |
|----------|---------|--------------|
| [FUTURE_ROADMAP.md](FUTURE_ROADMAP.md) | Phase 1–8 feature roadmap with status labels and business impact | Planning next sprint, evaluating scope, or showing the product trajectory to a client. |
| [CHANGELOG.md](CHANGELOG.md) | Version history — v0.1.0 through v0.3.0 | Checking what changed between releases. |

### Sales & Proposal

| Document | Purpose | When to read |
|----------|---------|--------------|
| [BID_PROPOSAL.md](BID_PROPOSAL.md) | Freelancer bid — requirements matrix, phase roadmap, deliverables | Preparing or reviewing the client-facing scope and deliverables. |
| [FREELANCER_BID.md](FREELANCER_BID.md) | Copy-paste bid text, live URLs, demo walkthrough script | Submitting the bid or running a live demo for the client. |

### Audit & Review

| Document | Purpose | When to read |
|----------|---------|--------------|
| [audit/EXECUTIVE_SUMMARY.md](audit/EXECUTIVE_SUMMARY.md) | Audit executive summary | Quick health check — overall platform maturity and risk. |
| [audit/FULL_AUDIT_REPORT.md](audit/FULL_AUDIT_REPORT.md) | Complete audit report | Deep-dive audit review — covers every file, service, and pattern. |
| [audit/SECURITY_REVIEW.md](audit/SECURITY_REVIEW.md) | Security-focused review | Evaluating attack surface, auth, wallet safety, or rate limiting. |
| [audit/SMART_CONTRACT_REVIEW.md](audit/SMART_CONTRACT_REVIEW.md) | On-chain interaction review | Reviewing SPL token mint, fee, burn, or authority transactions. |
| [audit/INFRASTRUCTURE_SCORECARD.md](audit/INFRASTRUCTURE_SCORECARD.md) | Infrastructure health scorecard | Checking deployment, build, CI, and infra posture. |
| [audit/PLATFORM_ASSESSMENT.md](audit/PLATFORM_ASSESSMENT.md) | Platform maturity assessment | Evaluating overall platform readiness for production or expansion. |
| [audit/REMEDIATION_ROADMAP.md](audit/REMEDIATION_ROADMAP.md) | Prioritized fix plan | Deciding what to fix next based on severity and business impact. |
| [audit/IMPLEMENTED_FIXES.md](audit/IMPLEMENTED_FIXES.md) | Fixes applied from audit | Verifying which audit findings have been addressed. |

### Scripts

| File | Purpose | When to run |
|------|---------|-------------|
| [scripts/create-sample-devnet-token.mjs](scripts/create-sample-devnet-token.mjs) | Devnet proof script — creates a real SPL token for demo | Creating a live devnet token for client demos or testing. |
| [scripts/verify.sh](scripts/verify.sh) | Full verification pipeline (tsc → lint → test → build) | Before every commit — ensures nothing is broken. |

---

## 1. System Overview

The platform is a non-custodial token launch system built on Solana. It enables users to create, configure, brand, and deploy SPL tokens through a guided wizard — then manage, trade, and monitor them through an integrated operations surface.

The system operates in two concurrent layers:

### Presentation Layer

The entire platform is explorable without a wallet. Every page renders its full UI immediately. This makes the product demoable, pitchable, and client-friendly without requiring Phantom, Solflare, or any browser extension.

### Execution Layer

Solana wallet adapters, SPL token minting, metadata upload, fee routing, and on-chain authority management sit underneath the presentation surface. When a wallet is connected, every action becomes a real blockchain transaction.

This dual-layer architecture means the platform behaves like a **visible SaaS product** with **Web3 execution underneath** — not a gated dApp that hides behind a connect button.

---

## 2. Product Layers

The platform is organized into six functional layers, each serving a distinct role in the token lifecycle.

### 2.1 Acquisition Layer

**Purpose:** Attract, inform, and convert visitors into users.

| Surface | Route | Function |
|---------|-------|----------|
| Homepage | `/` | 9-section product showcase with proposal framing, feature matrix, trust signals, and CTA |
| Terms of Service | `/terms` | Legal framework, platform rules, liability scope |
| Privacy Policy | `/privacy` | Data handling, cookie policy, IPFS permanence disclosure |
| Risk Disclosure | `/risk-disclosure` | Kuwait CBK Circular No. 2/RB/336/2014, GCC/MENA regulatory context |

The homepage is structured as a conversion page. It answers three questions for any visitor:
- What does this platform do?
- How does the technology work?
- Why should I trust it?

### 2.2 Launch Layer

**Purpose:** Guide users through token creation from concept to on-chain deployment.

| Surface | Route | Function |
|---------|-------|----------|
| Token Launch Wizard | `/launch` | 4-step guided flow: Details → Branding → Supply → Review/Launch |

The wizard handles:
- Token name, symbol, decimals, total supply
- Image upload to IPFS via Pinata (server-side keys)
- Social links and description metadata
- Metaplex on-chain metadata attachment
- 5 launch presets (Meme Classic, Maxi, Community, Scarce, Governance)
- Terms of Service acceptance gate
- Network validation and SOL balance check
- Atomic fee collection in the same transaction as the mint

A non-technical user can launch an SPL token without writing code, managing keys, or understanding the Solana CLI.

### 2.3 Operations Layer

**Purpose:** Manage tokens after launch — portfolio, authority, supply controls.

| Surface | Route | Function |
|---------|-------|----------|
| Dashboard | `/dashboard` | Wallet summary, 4 quick-action cards, token portfolio from live RPC |
| Burn Tokens | `/dashboard/burn` | Permanent supply reduction with irreversibility warnings |
| Manage Authority (index) | `/dashboard/manage` | Token list + manual mint entry for authority management |
| Manage Authority (detail) | `/dashboard/manage/[mint]` | Per-token mint info, revoke mint authority, revoke freeze authority |

This layer exists because a real launcher doesn't stop at "token created." It also supports:
- Token governance actions (authority revocation)
- Lifecycle management (burn, supply control)
- Portfolio visibility (live on-chain balances)
- DEX listing preparation (freeze authority revocation is required by most DEXs)

### 2.4 Market Layer

**Purpose:** Connect launched tokens to the Solana trading ecosystem.

| Surface | Route | Function |
|---------|-------|----------|
| Trade / Swap | `/trade` | Swap routing across Jupiter, Raydium, Orca, Meteora with direction toggle |
| Liquidity | `/liquidity` | Pool discovery via Raydium V3 + Meteora DLMM APIs, DEX deep-links for pool creation |
| Ecosystem Hub | `/ecosystem` | 15+ Solana partner integrations (Birdeye, Jito, Pyth, DexScreener, etc.) |

This is the downstream path after token creation:
1. Create token
2. Manage token
3. Discover / create liquidity pools
4. Route trades across aggregators
5. List on ecosystem tools

### 2.5 Automation Layer

**Purpose:** Post-launch monitoring, notifications, and operational hooks.

| Surface | Route | Function |
|---------|-------|----------|
| Post-Launch | `/post-launch` | Webhook configuration, 4 notification channels (Discord, Telegram, Email, SMS/Donk AI), 6 Helius event types |

Event types monitored:
- Token transfers
- Whale alerts (configurable threshold)
- Pool activity
- Swap activity
- Token burns
- Authority changes

This turns the platform from a one-time creation tool into a **token operations surface** with awareness of on-chain activity.

### 2.6 Business Layer

**Purpose:** Platform administration and revenue visibility.

| Surface | Route | Function |
|---------|-------|----------|
| Admin Dashboard | `/admin` | Treasury balance, estimated launches, estimated revenue, Solscan deep-link |

The admin surface exposes the operator economy:
- Fee collection tracking (SOL balance of treasury wallet)
- Platform utilization estimates
- Revenue projection
- Network and configuration status

---

## 3. User Flows

### 3.1 Token Creator Flow

```
Visit homepage → Browse features → Click "Launch Token"
  → Step 1: Enter name, symbol, decimals, supply
  → Step 2: Upload image, add social links, description
  → Step 3: Review token economics and metadata
  → Step 4: Accept ToS → Sign transaction → Token live on-chain
  → Receive: mint address, tx signature, Solscan links
  → Navigate to: Dashboard, Manage, Liquidity, Trade
```

### 3.2 Token Manager Flow

```
Dashboard → See portfolio → Select token
  → View mint info (supply, authorities, decimals)
  → Revoke mint authority (permanently fix supply)
  → Revoke freeze authority (enable DEX listing)
  → Burn tokens (reduce circulating supply)
  → Check trust score
```

### 3.3 Liquidity Provider Flow

```
Liquidity page → Enter mint address → Search existing pools
  → View pool data (TVL, pair, provider)
  → Deep-link to create pool on Raydium / Meteora / Orca
  → Or deep-link to trade on Jupiter
```

### 3.4 Prospect / Demo Flow

```
Visit homepage → Click any page in navigation
  → See full UI for every feature (no wallet required)
  → Understand launch wizard, dashboard, management, trading, admin
  → Return to homepage → Contact / bid
```

---

## 4. Operator Flows

### 4.1 Platform Operator

The operator runs the launcher business. Their flow:

```
Deploy platform (Vercel) → Configure env vars:
  → NEXT_PUBLIC_TREASURY_WALLET (fee destination)
  → NEXT_PUBLIC_CREATION_FEE_SOL (fee amount, default 0.1)
  → NEXT_PUBLIC_SOLANA_NETWORK (devnet / mainnet-beta)
  → PINATA_JWT (IPFS upload credentials)
  → NEXT_PUBLIC_HELIUS_RPC_URL (optional, better RPC)

Monitor:
  → /admin → Treasury balance, launch estimates, revenue
  → Solscan → Direct treasury wallet inspection
```

### 4.2 White-Label Operator

The platform supports multi-tenant white-label configuration:

```
Configure tenant → Custom branding, domain, fee split
  → Feature flags per tenant
  → Independent treasury routing
  → Shared infrastructure, separate presentation
```

### 4.3 Referral Operator

Built-in referral system:

```
Generate referral code → Share link
  → Referred user launches token
  → Commission calculated on platform fee
  → Discount applied to referred user
  → Tracked per code
```

---

## 5. Revenue Model

### Fee Structure

| Event | Fee | Destination |
|-------|-----|-------------|
| Token launch | 0.1 SOL (configurable) | Treasury wallet |
| Network fees | ~0.01 SOL (Solana rent + tx) | Solana network |

### Revenue Path

```
User launches token
  → Transaction includes: mint + metadata + fee transfer
  → Platform fee goes to TREASURY_WALLET atomically
  → No second transaction needed
  → No custodial holding
  → Operator sees balance in /admin
```

### Tier System (Phase 2, built)

| Tier | Fee | Features |
|------|-----|----------|
| Standard | Base fee | Core launch features |
| Premium | Higher fee | Priority, analytics, extended metadata |
| Featured | Highest fee | Homepage placement, ecosystem promotion |

### Revenue Projections (visible in /admin)

The admin dashboard calculates:
- `estimatedLaunches = treasuryBalance / feePerLaunch`
- `estimatedRevenue = estimatedLaunches × feePerLaunch`

This gives the operator real-time visibility into platform utilization.

---

## 6. Technical Stack

### Core Framework

| Component | Technology |
|-----------|-----------|
| Framework | Next.js 14.2.16 (App Router) |
| Language | TypeScript (strict mode, zero errors) |
| Styling | Tailwind CSS 3.x + shadcn/ui components |
| Testing | Vitest (32 tests, 4 suites) |
| Linting | ESLint (Next.js config + TypeScript rules) |
| Build | `npm run verify` → tsc → lint → test → build |

### Blockchain

| Component | Technology |
|-----------|-----------|
| Network | Solana (devnet default, mainnet-ready) |
| Client | @solana/web3.js |
| Token | @solana/spl-token (SPL Token Program) |
| Metadata | @metaplex-foundation/mpl-token-metadata |
| Wallets | @solana/wallet-adapter-react (Phantom, Solflare, Backpack) |
| RPC | Configurable — Helius preferred, public fallback |

### Infrastructure

| Component | Technology |
|-----------|-----------|
| Hosting | Vercel (edge deployment) |
| Storage | Pinata (IPFS) — server-side JWT, never client-exposed |
| Rate Limiting | Upstash Redis (Vercel KV) with in-memory fallback |
| Domain | launch.unykorn.org |
| DNS | Cloudflare |

### API Routes

| Endpoint | Method | Purpose | Protection |
|----------|--------|---------|------------|
| `/api/upload` | POST | Upload token image to IPFS | Rate limited, server-side Pinata JWT |
| `/api/metadata` | POST | Upload token metadata JSON to IPFS | Rate limited, server-side Pinata JWT |
| `/api/health` | GET | System status check | Public |

### Service Layer

| Service | File | Responsibility |
|---------|------|---------------|
| Token Launcher | `token-launcher/token-launch.service.ts` | Mint creation, metadata, fee collection |
| Token Burn | `token-burn/token-burn.service.ts` | Permanent supply reduction |
| Authority Revoke | `token-authority/revoke-authority.service.ts` | Mint/freeze authority revocation |
| Fee Calculator | `fees/fees.service.ts` | Tier-based fee computation |
| Liquidity Discovery | `liquidity/liquidity.service.ts` | Raydium V3 + Meteora DLMM pool lookup |
| Referral System | `referral/referral.service.ts` | Code generation, commission tracking |

### i18n

| Language | Code | Direction |
|----------|------|-----------|
| English | `en` | LTR |
| Arabic | `ar` | RTL |
| French | `fr` | LTR |
| Hindi | `hi` | LTR |
| Urdu | `ur` | RTL |

---

## 7. Route Map

### Dashboard Group (`(dashboard)/`)

| Route | Page | Component |
|-------|------|-----------|
| `/admin` | Admin Dashboard | `AdminClient` |
| `/dashboard` | User Dashboard | `DashboardClient` |
| `/dashboard/burn` | Burn Tokens | `BurnTokenForm` |
| `/dashboard/manage` | Manage Authority (index) | `ManageIndexClient` |
| `/dashboard/manage/[mint]` | Manage Authority (detail) | `TokenManageClient` |
| `/ecosystem` | Ecosystem Hub | `EcosystemHub` |
| `/launch` | Token Launch Wizard | `TokenLaunchWizard` |
| `/liquidity` | Liquidity Management | `LiquidityClient` |
| `/post-launch` | Post-Launch Automation | `PostLaunchClient` |
| `/token/[mint]` | Public Token Page | `TokenPageClient` |
| `/trade` | Trade / Swap | `TradeClient` |

### Marketing Group (`(marketing)/`)

| Route | Page |
|-------|------|
| `/` | Homepage |
| `/terms` | Terms of Service |
| `/privacy` | Privacy Policy |
| `/risk-disclosure` | Risk Disclosure |

### API Group (`api/`)

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/health` | GET | System health |
| `/api/upload` | POST | IPFS image upload |
| `/api/metadata` | POST | IPFS metadata upload |

**Total: 18 routes (11 app pages + 4 marketing pages + 3 API endpoints)**

---

## 8. Demo Mode vs Live Mode

The platform currently operates in **demo mode** — all pages render their full UI without requiring a wallet connection.

### Demo Mode (current)

| Behavior | Detail |
|----------|--------|
| Wallet gates | Removed — all pages show full UI immediately |
| Token portfolio | Shows empty state with "Launch Your First Token" CTA |
| Admin dashboard | Loads treasury stats from RPC (if treasury wallet is configured) |
| Launch wizard | Displays full 4-step form — transaction signing requires wallet |
| Burn / Revoke | Forms visible — execution requires wallet |
| Trade / Liquidity | DEX routing and pool discovery visible — swaps open in external DEX |

### Live Mode (wallet connected)

| Behavior | Detail |
|----------|--------|
| Wallet state | Full wallet address displayed, balance checks active |
| Token portfolio | Live on-chain token balances from RPC |
| Launch wizard | Signs and submits real SPL token creation transaction |
| Burn | Executes permanent supply reduction on-chain |
| Revoke | Removes mint/freeze authority permanently |
| Admin | Full treasury visibility with authorized access |

### How to restore wallet gates

The wallet gate code was removed cleanly. To restore gating:
1. Re-add `WalletGuard` wrappers to components that need them
2. Re-add inline `if (!connected || !publicKey)` checks where appropriate
3. The `WalletGuard` component still exists at `components/wallet/WalletGuard.tsx`

The underlying wallet adapter infrastructure remains fully intact. Wallet connection, signing, and transaction submission all work when a wallet is connected.

---

## 9. Security & Compliance

### Non-Custodial Architecture

- Platform never holds user funds or tokens
- All transactions are signed client-side in the user's wallet
- Pinata JWT is server-side only — never exposed to the browser
- Fee collection is atomic — included in the same transaction as the mint

### Rate Limiting

- Upstash Redis rate limiting on all API routes
- In-memory fallback when Redis is unavailable
- Prevents abuse of IPFS upload endpoints

### Environment Validation

- Startup validation checks for all required env vars
- Placeholder detection (prevents deploying with example values)
- Missing var warnings in development, errors in production

### Legal Framework

- Terms of Service with platform liability scope
- Privacy Policy with IPFS data permanence disclosures
- Risk Disclosure citing Kuwait CBK Circular No. 2/RB/336/2014
- Compliance banner on every page
- ToS acceptance gate on the launch wizard

---

## 10. Expansion Surface

### Built but not yet wired

| Capability | Status | What exists |
|------------|--------|------------|
| On-chain liquidity pool creation | UI complete | Pool discovery, deep-links. SDK integration (Raydium V2 / Meteora DLMM) pending |
| Helius webhook processing | UI complete | Event type selection, channel config. Webhook receiver endpoint pending |
| Notification delivery | UI complete | 4 channels configured. Delivery infrastructure pending |
| Premium tier enforcement | Logic complete | Fee tiers defined. Checkout / upgrade flow pending |
| White-label multi-tenancy | Config complete | Branding, fee splits, domain routing defined. Tenant management UI pending |
| Referral tracking | Logic complete | Code generation, commission calculation. Dashboard + payout pending |
| Token page SEO | Page complete | `/token/[mint]` renders on-chain data. OG meta tags and indexing pending |

### Infrastructure ready for

- Database layer (Prisma / Supabase) for persistent launch history
- Analytics pipeline for launch tracking and conversion
- Mainnet deployment (one env var change: `NEXT_PUBLIC_SOLANA_NETWORK=mainnet-beta`)
- Custom domain per tenant (white-label)
- CI/CD pipeline (GitHub Actions → Vercel)

---

*Last updated: March 2026*
*Commit: 9d004aa — docs: add professional system architecture write-up*
*Verify: tsc ✓ · lint ✓ · 32 tests ✓ · 18 routes ✓ · 0 errors*
*Doc inventory: 15 markdown files + 8 audit reports + 2 scripts*

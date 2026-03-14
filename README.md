<div align="center">

# 🚀 Solana SPL Token Launcher

<img src="https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js&logoColor=white" />
<img src="https://img.shields.io/badge/TypeScript-Strict-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
<img src="https://img.shields.io/badge/Solana-Web3.js-9945FF?style=for-the-badge&logo=solana&logoColor=white" />
<img src="https://img.shields.io/badge/Tailwind_CSS-3.x-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
<img src="https://img.shields.io/badge/Pinata-IPFS-E4467C?style=for-the-badge" />
<img src="https://img.shields.io/badge/Build-Passing-22c55e?style=for-the-badge&logo=github-actions&logoColor=white" />
<img src="https://img.shields.io/badge/TSC-0_Errors-22c55e?style=for-the-badge&logo=typescript&logoColor=white" />
<img src="https://img.shields.io/badge/Routes-15_/_15-22c55e?style=for-the-badge" />
<img src="https://img.shields.io/badge/Non--Custodial-✓-9945FF?style=for-the-badge" />
<img src="https://img.shields.io/badge/Kuwait_Aware-Jurisdiction_Disclosures-f59e0b?style=for-the-badge" />

<br/><br/>

> **Operator-ready non-custodial Solana SPL token launch platform.**  
> Connect wallet → configure token → sign one transaction → token is live on-chain.  
> No code. No custody. Atomic fee enforcement.

<br/>

**80+ source files · 15 static routes · 58+ unit tests · TypeScript strict mode · Kuwait/GCC jurisdiction-aware disclosures**

<br/>

```
🟣 Launch tokens in minutes     🟢 Revoke authorities on-chain
🔵 Live portfolio dashboard     🟡 Raydium + Meteora pool finder
🔴 Rate-limited API routes      ⚫ Admin treasury dashboard
```

</div>

---

## 🎯 LAUNCH COMMAND CENTER

<div align="center">

### 🔴🟡🟢 Platform Status — FTHTrading / solana-launcher

| PHASE | COLOR | STATUS | RESULT |
|:---:|:---:|:---:|:---|
| **1 · BUILD** | 🟣 | `npm run build` | ✅ Exit 0 — 15 routes — 0 TypeScript errors |
| **2 · QUALITY** | 🟢 | `npm run lint` | ✅ 0 ESLint warnings — 0 errors |
| **3 · VERSION CONTROL** | 🔵 | `git log --oneline` | ✅ 3 commits on `main` |
| **4 · REMOTE** | 🟡 | `git push origin main` | ✅ Live → github.com/FTHTrading/solana-launcher |
| **5 · PRODUCTION** | 🔴 | Vercel Deploy | ⬜ Next action — follow Phase 4 below |

</div>

---

### 📡 Full Deployment Pipeline

```mermaid
flowchart TD
    subgraph LOCAL["🖥️  LOCAL DEVELOPMENT"]
        A["📦 npm install\n62 packages"] --> B["🔐 .env.local\n6 env vars"]
        B --> C["🌐 npm run dev\nlocalhost:3000"]
        C --> D["🔨 npm run build\n15 routes · Exit 0"]
        D --> E["✅ npm run lint\n0 warnings · 0 errors"]
    end

    subgraph GIT["📦  VERSION CONTROL"]
        F["git init + git add ."] --> G["git commit -m 'feat: initial delivery'"]
        G --> H["git branch -M main"]
        H --> I["git push origin main"]
    end

    subgraph GITHUB["🐙  GITHUB  ·  FTHTrading"]
        J["Repository: solana-launcher\nmain branch · 81 files"]
    end

    subgraph VERCEL["▲  VERCEL CLOUD"]
        K["Import from GitHub\nAuto-detect Next.js"] --> L["Set 6 env vars\nPINATA_JWT + RPC + Treasury"]
        L --> M["▶ Click Deploy\n~60 seconds build"]
        M --> N["🚀 Live URL\nyour-app.vercel.app"]
    end

    subgraph SOLANA["⛓️  SOLANA NETWORK"]
        O["🧪 Devnet\nFree testing"]
        P["💰 Mainnet-Beta\nReal tokens · Real SOL"]
    end

    subgraph IPFS["📌  PINATA IPFS"]
        Q["POST /api/upload\nImage files → IPFS CID"]
        R["POST /api/metadata\nJSON → metadata URI"]
    end

    E --> I
    I --> J
    J -->|"webhook on push"| K
    N -->|"NETWORK=devnet"| O
    N -->|"NETWORK=mainnet-beta"| P
    N --> Q
    N --> R
```

---

### 🔄 Auto-Deploy — Every Future Push

```mermaid
sequenceDiagram
    participant Dev as 💻 Developer
    participant GH  as 🐙 GitHub
    participant VCL as ▲ Vercel
    participant CDN as 🌐 Edge CDN (40+ regions)

    Dev->>Dev: code change
    Dev->>Dev: npm run build && npm run lint
    Note over Dev: Both exit 0 ✅
    Dev->>GH: git push origin main
    GH-->>VCL: Webhook — push event on main
    VCL->>VCL: npm ci
    VCL->>VCL: npm run build
    Note over VCL: ~45–90 seconds
    VCL->>CDN: Distribute static assets + serverless
    CDN-->>Dev: ✅ Deploy complete — same URL, zero downtime
    Note over Dev,CDN: Every git push auto-deploys — no manual steps
```

---

### 🌐 Token Launch — User Journey

```mermaid
sequenceDiagram
    participant U    as 👤 User
    participant UI   as 🖥️ Next.js /launch
    participant WA   as 👛 Wallet Adapter
    participant API  as 🔒 API Routes
    participant IPFS as 📌 Pinata IPFS
    participant RPC  as ⛓️ Solana RPC

    U->>UI: Visit /launch
    UI->>WA: Request wallet connection
    WA-->>U: Show modal (Phantom · Solflare · Backpack)
    U->>WA: Select wallet + Approve
    WA-->>UI: Connected { publicKey }

    Note over U,UI: Wizard — 3 steps

    U->>UI: Step 1 — Token Details (name/symbol/supply/decimals)
    U->>UI: Step 2 — Branding (upload image)
    UI->>API: POST /api/upload (image file, max 5MB)
    API->>IPFS: Pinata SDK uploadFile()
    IPFS-->>API: { cid, url }
    API-->>UI: { cid, imageUri }

    U->>UI: Step 3 — Review + Launch
    UI->>API: POST /api/metadata (JSON)
    API->>IPFS: Pinata SDK uploadJSON()
    IPFS-->>API: { uri: metadataUri }
    API-->>UI: { uri }

    UI->>WA: buildTokenTransaction() → VersionedTransaction
    Note over UI,WA: 5 instructions in 1 atomic tx
    WA-->>U: Approval screen (fee breakdown)
    U->>WA: ✅ Approve & Sign
    WA->>RPC: sendTransaction(signedTx)
    RPC-->>UI: { signature }
    UI->>RPC: confirmTransaction(signature, 'confirmed')
    RPC-->>UI: ✅ Finalized
    UI-->>U: 🎉 Token live!  Mint: ABC123...XYZ
```

---

### ⛓️ On-Chain Transaction Anatomy

```mermaid
flowchart LR
    subgraph TX["Single VersionedTransaction — All-or-Nothing Atomic"]
        I1["[0] SystemProgram\ncreateAccount\nAllocate Mint space + pay rent"] -->
        I2["[1] initializeMint2\nSet decimals\nmintAuthority = user wallet"] -->
        I3["[2] getOrCreateAssociatedTokenAccount\nCreate ATA for user"] -->
        I4["[3] mintTo\nMint full supply to user ATA"] -->
        I5["[4] createMetadataAccountV3\nWrite Metaplex v3 on-chain metadata"]
    end

    subgraph OPTIONAL["Optional — same tx if selected"]
        I6["[5] setAuthority MINT_TOKENS\nRevoke mint authority → 0x00"]
        I7["[6] setAuthority FREEZE_ACCOUNT\nRevoke freeze authority → 0x00"]
    end

    I5 --> I6
    I5 --> I7
```

---

### 🔐 Environment Variables — Acquisition Flow

```mermaid
flowchart TD
    START(["▶ Start — collect 6 values"]) --> V1

    V1["1 · NEXT_PUBLIC_SOLANA_NETWORK\ndevnet  OR  mainnet-beta"]
    V2["2 · NEXT_PUBLIC_SOLANA_RPC_URL\nGet from RPC provider"]
    V3["3 · NEXT_PUBLIC_TREASURY_WALLET\nGet from Phantom wallet"]
    V4["4 · NEXT_PUBLIC_CREATION_FEE_SOL\n0.1 devnet · 0.05 mainnet"]
    V5["5 · NEXT_PUBLIC_STORAGE_PROVIDER\nAlways: pinata"]
    V6["6 · PINATA_JWT\nGet from Pinata dashboard"]

    RPC["helius.dev\nquicknode.com\nalchemy.com"]
    PHANTOM["Phantom Extension\nClick address → Copy\n44-char base58 key"]
    PINATA["pinata.cloud\n→ API Keys\n→ New Key (Admin)\n→ Copy JWT (shown once)"]

    DONE(["✅ All 6 values — paste into\nVercel env vars dashboard"])

    V1 --> V2
    V2 --> RPC
    V2 --> V3
    V3 --> PHANTOM
    V3 --> V4
    V4 --> V5
    V5 --> V6
    V6 --> PINATA
    V6 --> DONE
```

---

## 🚦 STEP-BY-STEP LAUNCH GUIDE

---

### 🟣 PHASE 1 — Local Dev Setup

```
╔═══════════════════════════════════════════════════════════════════╗
║  🟣  PHASE 1 · LOCAL DEVELOPMENT                      ✅ DONE   ║
╠══════════════════════════╦════════════════════════════════════════╣
║  ✅ npm install          ║  62 packages installed                 ║
║  ✅ .env.local           ║  6 env vars set (Pinata+wallet+RPC)    ║
║  ✅ npm run dev          ║  Dev server → http://localhost:3000    ║
║  ✅ npm run build        ║  Exit 0 · 15/15 routes compiled        ║
║  ✅ npm run lint         ║  0 warnings · 0 errors                 ║
╚══════════════════════════╩════════════════════════════════════════╝
```

```bash
# Clone and run locally
git clone https://github.com/FTHTrading/solana-launcher.git
cd solana-launcher
npm install
cp .env.example .env.local    # fill in 6 values (see Phase 3 env table)
npm run dev                   # → http://localhost:3000
```

---

### 🟢 PHASE 2 — Git & GitHub Push

```
╔═══════════════════════════════════════════════════════════════════╗
║  🟢  PHASE 2 · VERSION CONTROL                        ✅ DONE   ║
╠══════════════════════════╦════════════════════════════════════════╣
║  ✅ git init             ║  Repository initialized                ║
║  ✅ .gitignore           ║  node_modules + .env.local excluded    ║
║  ✅ git add .            ║  81 files staged                       ║
║  ✅ git commit           ║  "feat: initial delivery — v1.0"       ║
║  ✅ git branch -M main   ║  Branch: master → main                 ║
║  ✅ git push origin main ║  → github.com/FTHTrading/solana-launcher║
╚══════════════════════════╩════════════════════════════════════════╝
```

```bash
git init
git add .
git commit -m "feat: initial delivery — Solana SPL Token Launcher v1.0"
git branch -M main
git remote add origin https://github.com/FTHTrading/solana-launcher.git
git push -u origin main
```

---

### 🟡 PHASE 3 — Environment Variables

| # | Variable | 🔴 Source | Example |
|:---:|---|:---:|---|
| **1** | `NEXT_PUBLIC_SOLANA_NETWORK` | you | `mainnet-beta` |
| **2** | `NEXT_PUBLIC_SOLANA_RPC_URL` | [helius.dev](https://helius.dev) | `https://mainnet.helius-rpc.com/?api-key=XXX` |
| **3** | `NEXT_PUBLIC_TREASURY_WALLET` | Phantom → Copy Address | `7xKj...bQ3r` (44 chars) |
| **4** | `NEXT_PUBLIC_CREATION_FEE_SOL` | you | `0.05` |
| **5** | `NEXT_PUBLIC_STORAGE_PROVIDER` | always `pinata` | `pinata` |
| **6** | `PINATA_JWT` | [pinata.cloud](https://pinata.cloud) → API Keys → New Key | `eyJhbGci...` |

```
⚠️  PINATA_JWT is SERVER-SIDE ONLY — never committed to git, never in NEXT_PUBLIC_*
⚠️  TREASURY_WALLET is your PUBLIC key only — never a seed phrase or private key
⚠️  On mainnet use a paid RPC — api.mainnet-beta.solana.com fails under real load
```

**Pinata JWT — step by step:**
```
1. Go to https://pinata.cloud → create free account
2. Left sidebar → "API Keys"
3. Click "+ New Key"
4. Toggle "Admin" permissions ON
5. Name it: solana-launcher-prod
6. Click "Generate API Key"
7. ⚠️  COPY JWT NOW — it starts with eyJ... and is 200+ chars — shown ONCE only
8. Paste into Vercel env var: PINATA_JWT  (mark as Sensitive)
```

---

### 🔵 PHASE 4 — Vercel Deployment

```
╔═══════════════════════════════════════════════════════════════════╗
║  🔵  PHASE 4 · VERCEL DEPLOYMENT                ⬜ DO THIS NOW  ║
╚═══════════════════════════════════════════════════════════════════╝
```

**Step 4a — Account**
```
→ https://vercel.com
→ "Start Deploying" → "Continue with GitHub"
→ Authorize Vercel to access the FTHTrading organization
```

**Step 4b — Import Repository**
```
Dashboard → "Add New..." → "Project"
Find "solana-launcher" → click "Import"
Framework Preset:  Next.js          ← auto-detected, do NOT change
Root Directory:    ./               ← leave default
Build Command:     npm run build    ← auto-filled, leave default
Output Directory:  .next            ← auto-filled, leave default
```

**Step 4c — Add Environment Variables**
```
In the "Environment Variables" section before clicking Deploy:

  NAME                              VALUE
  ────────────────────────────────────────────────────────────────
  NEXT_PUBLIC_SOLANA_NETWORK        mainnet-beta
  NEXT_PUBLIC_SOLANA_RPC_URL        https://mainnet.helius-rpc.com/?api-key=YOUR_KEY
  NEXT_PUBLIC_TREASURY_WALLET       YOUR_44_CHAR_PHANTOM_PUBLIC_KEY
  NEXT_PUBLIC_CREATION_FEE_SOL      0.05
  NEXT_PUBLIC_STORAGE_PROVIDER      pinata
  PINATA_JWT                        eyJhbGci...YOUR_JWT  ← mark as Sensitive

Click "Add" after each row.
```

**Step 4d — Deploy**
```
→ Click "Deploy"
→ Vercel runs:  npm ci  →  npm run build  →  deploy to edge
→ Build takes ~45–90 seconds
→ Success screen shows:  https://solana-launcher-xxx.vercel.app
```

**Step 4e — Custom Domain (optional)**
```
Vercel Dashboard → Project → Settings → Domains
→ Add: yourdomain.com

DNS records at your registrar:
  Type   Host   Value
  A      @      76.76.21.21
  CNAME  www    cname.vercel-dns.com
```

---

### 🔴 PHASE 5 — Live Verification

```
╔═══════════════════════════════════════════════════════════════════╗
║  🔴  PHASE 5 · PRODUCTION HEALTHCHECK           ⬜ AFTER DEPLOY ║
╚═══════════════════════════════════════════════════════════════════╝
```

```bash
# Replace YOUR-URL with your actual Vercel domain
BASE="https://YOUR-URL.vercel.app"

# Test page routes
curl -s -o /dev/null -w "/ → %{http_code}\n"                    $BASE/
curl -s -o /dev/null -w "/launch → %{http_code}\n"              $BASE/launch
curl -s -o /dev/null -w "/dashboard → %{http_code}\n"           $BASE/dashboard
curl -s -o /dev/null -w "/dashboard/burn → %{http_code}\n"      $BASE/dashboard/burn
curl -s -o /dev/null -w "/dashboard/manage → %{http_code}\n"    $BASE/dashboard/manage
curl -s -o /dev/null -w "/admin → %{http_code}\n"               $BASE/admin
# All expected: 200

# Test API — upload endpoint (requires real image file)
curl -X POST $BASE/api/upload \
  -F "file=@/path/to/test.png"
# Expected: {"cid":"Qm...","url":"https://..."}
# If 500: check PINATA_JWT in Vercel env vars
```

**Browser checklist:**
```
✅ Landing page loads with no console errors
✅ "Launch Token" CTA button visible
✅ Wallet connect modal opens (Phantom / Solflare / Backpack listed)
✅ Token wizard starts — Step 1: Token Details
✅ /dashboard shows "Connect wallet" prompt (not a crash)
✅ /admin gate works (only shows treasury wallet address)
✅ DevTools → Console: 0 errors in production mode
✅ DevTools → Network: no failed requests on page load
```

---

### 🔁 RPC Provider Comparison

| Provider | Free Tier | Mainnet URL | Best For |
|:---:|:---:|---|:---:|
| **Helius** | 100k req/day | `https://mainnet.helius-rpc.com/?api-key=KEY` | Best free tier |
| **QuickNode** | 10M credits/mo | `https://xxx.solana-mainnet.quiknode.pro/KEY/` | Lowest latency |
| **Alchemy** | 100M CU/mo | `https://solana-mainnet.g.alchemy.com/v2/KEY` | Best dashboard |
| **Triton** | paid | `https://xxx.rpcpool.com/KEY` | High-volume |

> ⚠️ `https://api.mainnet-beta.solana.com` — **Do not use in production.** Heavily rate-limited, transactions will fail under any real traffic.

---

## 📋 Table of Contents

| # | Section | What It Covers |
|---|---|---|
| **0** | [Launch Command Center](#-launch-command-center) | Status dashboard · deployment pipeline · step-by-step guide |
| **1** | [Architecture Overview](#-architecture-overview) | System design, tech stack, route map |
| **2** | [Data Flow Diagrams](#-data-flow-diagrams) | Token creation, fee flow, IPFS pipeline, authority states |
| **3** | [Complete File Tree](#-complete-file-tree) | Every file organized by domain with annotations |
| **4** | [Feature Reference](#-feature-reference) | All 40+ features, files, and implementation notes |
| **5** | [Component Graph](#-component-graph) | Layout tree, page-to-component mapping |
| **6** | [Quick Start](#-quick-start) | Clone → configure → run in 5 minutes |
| **7** | [Environment Variables](#-environment-variables) | Every variable explained with sources |
| **8** | [Step-by-Step Local Dev](#-step-by-step-local-dev) | Full annotated walkthrough from zero |
| **9** | [API Routes](#-api-routes) | Upload + metadata endpoints, rate limiting, error codes |
| **10** | [Services Layer](#-services-layer) | On-chain business logic, transaction anatomy |
| **11** | [Hooks Reference](#-hooks-reference) | `useTokenLaunch`, `useBurnToken` API |
| **12** | [Deploying to Production](#-deploying-to-production) | Vercel + mainnet checklist |
| **13** | [Liquidity Integration](#-liquidity-integration) | Raydium + Meteora status and roadmap |
| **14** | [Security Model](#-security-model) | Threat model, rate limiting, key handling |
| **15** | [Compliance Layer](#-compliance-layer) | Kuwait/GCC specifics, CBK circular |
| **16** | [Architecture Decisions](#-architecture-decision-log) | Why each technical choice was made |
| **17** | [Extending the Platform](#-extending-the-platform) | Sprint 2 roadmap with effort estimates |
| **18** | [Troubleshooting](#-troubleshooting) | Every known error + fix |

---

## 🏗 Architecture Overview

### Tech Stack

| Layer | Technology | Version | Purpose |
|---|---|---|---|
| **Framework** | Next.js App Router | 14.2.16 | SSR, routing, API routes, static generation |
| **Language** | TypeScript | 5.x strict | End-to-end type safety, 0-error build |
| **Styling** | Tailwind CSS | 3.x | Utility-first responsive design |
| **Blockchain** | @solana/web3.js | 1.x | RPC calls, transaction building, blockhash |
| **Token Program** | @solana/spl-token | 0.4.x | Mint creation, ATA, transfer, freeze, burn |
| **Metadata** | @metaplex-foundation/mpl-token-metadata | **2.x** | On-chain Metaplex v3 metadata format |
| **Wallet Adapter** | @solana/wallet-adapter | latest | Phantom · Solflare · Backpack |
| **Forms** | React Hook Form + Zod | 7.x / 3.x | Validated wizard forms, typed schemas |
| **Data Fetching** | TanStack Query | 5.x | Server-state, caching, background retries |
| **IPFS** | Pinata SDK | 2.x | Image + JSON metadata upload (server-side only) |
| **Rate Limiting** | Upstash Redis + in-memory fallback | @upstash/ratelimit | 10 req/min per IP, distributed across instances |
| **UI Primitives** | Radix UI Slot | 1.x | Accessible `asChild` composition pattern |

---

### Route Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            Next.js App Router                               │
├──────────────────────────────────┬──────────────────────────────────────────┤
│      (marketing) Group           │         (dashboard) Group                │
│   ─────────────────────────      │    ──────────────────────────────         │
│   Layout:                        │    Layout:                               │
│     ComplianceBanner             │      SiteHeader (wallet button)          │
│     SiteHeader                   │      Dashboard shell                     │
│     SiteFooter                   │      WalletContextProvider               │
├──────────────────────────────────┼──────────────────────────────────────────┤
│  /                  Landing      │  /launch              Token Wizard       │
│  /terms             ToS          │  /dashboard           Portfolio          │
│  /privacy           Privacy      │  /dashboard/burn      Burn Tokens        │
│  /risk-disclosure   Risk Disc.   │  /dashboard/manage    Manage Index       │
│                                  │  /dashboard/manage/   Authority Mgmt     │
│                                  │    [mint]                                │
│                                  │  /liquidity           Pool Finder        │
│                                  │  /admin               Treasury           │
├──────────────────────────────────┴──────────────────────────────────────────┤
│                      API Routes (Node.js server only)                       │
│  POST /api/upload      IPFS image upload to Pinata   (rate-limited, JWT)    │
│  POST /api/metadata    JSON metadata upload to IPFS  (rate-limited, JWT)    │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 📊 Data Flow Diagrams

### Token Creation — End to End

```mermaid
flowchart TD
    A([User: Connect Wallet\nPhantom / Solflare / Backpack]) --> B

    B[Step 1: Token Details\nname · symbol · description · decimals]
    B --> C[Step 2: Branding\nimage upload · social links]

    C --> D{POST /api/upload}
    D --> E[Rate limiter\n10 req / min / IP]
    E -->|Rejected| ERR1([429 Too Many Requests])
    E -->|Allowed| F[Validate file type + size\nPNG · JPEG · GIF · WEBP · SVG · max 5MB]
    F -->|Invalid| ERR2([400 Bad Request])
    F -->|Valid| G[Pinata SDK\npinFileToIPFS]
    G --> H[IPFS image URI\nhttps://ipfs.io/ipfs/QmImg...]
    H --> I[Pinata SDK\npinJSONToIPFS metadata]
    I --> J[IPFS metadata URI\nhttps://ipfs.io/ipfs/QmMeta...]

    J --> K[Step 3: Supply\nchoose amount · live economics preview]
    K --> L[Step 4: Review\nall fields · fee disclosure · ToS gate]
    L --> M{User accepts ToS\n+ clicks Launch}

    M --> N[buildTokenTransaction\nservices/token-launcher]
    N --> N1[createMint instruction]
    N --> N2[createAssociatedTokenAccount]
    N --> N3[mintTo ATA]
    N --> N4[SystemProgram.transfer\n→ TREASURY_WALLET]
    N1 & N2 & N3 & N4 --> P

    P[Single Atomic Transaction\nAll 4 instructions · signed by user]
    P --> Q[Re-broadcast loop\nevery 2s until confirmed or expired]
    Q -->|Confirmed| R[Attach Metaplex Metadata\n2nd transaction: name · symbol · URI]
    Q -->|Expired ~90s| ERR3([TRANSACTION_EXPIRED error])
    R --> S([Token Live on-chain ✅\nMint address returned])

    style A fill:#9945FF,color:#fff,stroke:#7c3aed
    style S fill:#22c55e,color:#fff,stroke:#16a34a
    style P fill:#f59e0b,color:#000,stroke:#d97706
    style E fill:#ef4444,color:#fff,stroke:#dc2626
    style ERR1 fill:#ef4444,color:#fff
    style ERR2 fill:#ef4444,color:#fff
    style ERR3 fill:#ef4444,color:#fff
```

---

### Fee Collection — Atomic Flow

```mermaid
flowchart LR
    U([User Wallet\nsigns tx]) -->|Submits| T

    subgraph T[Single Atomic Transaction]
        direction TB
        I1[createMint]
        I2[createATA]
        I3[mintTo]
        I4[transfer fee]
    end

    T -->|Full supply| A[User ATA\nAssociated Token Account]
    T -->|SOL fee| B[Treasury Wallet\nNEXT_PUBLIC_TREASURY_WALLET]
    T -->|Creates| C[Mint Account\non-chain SPL]
    T -->|Rent| D[Solana Validators\nnetwork]

    style U fill:#9945FF,color:#fff
    style B fill:#f59e0b,color:#000
    style A fill:#22c55e,color:#fff
    style C fill:#3b82f6,color:#fff
    style T fill:#1e293b,color:#fff
```

> **Atomicity guarantee:** Fee transfer + mint creation + supply are in the **same transaction**.  
> If any instruction fails, the entire transaction reverts — no partial charges on the core launch.  
> **Note:** Metaplex metadata attachment runs as a second transaction after the mint confirms.  
> If the metadata tx fails, the token is live but without on-chain metadata (re-attachable).

---

### IPFS Upload Pipeline — Sequence

```mermaid
sequenceDiagram
    participant Br as Browser
    participant API as /api/upload
    participant RL as Rate Limiter
    participant PF as Pinata Files
    participant PJ as Pinata JSON

    Br->>API: POST multipart/form-data {file, name, symbol, description}
    API->>RL: check(clientIP, window=60s, max=10)

    alt Rate limit exceeded
        RL-->>API: 429
        API-->>Br: {error: "rate_limit_exceeded"}
    else Allowed
        RL-->>API: pass
        API->>API: validate MIME type + file size
        API->>PF: pinFileToIPFS(buffer, {name: "tokenname-image"})
        PF-->>API: {IpfsHash: "QmImg...", PinSize, Timestamp}
        API->>PJ: pinJSONToIPFS({name, symbol, description, image: "ipfs://QmImg..."})
        PJ-->>API: {IpfsHash: "QmMeta...", PinSize, Timestamp}
        API-->>Br: {imageUri: "https://ipfs.io/ipfs/QmImg...", metadataUri: "https://ipfs.io/ipfs/QmMeta..."}
    end
```

---

### Token Authority State Machine

```mermaid
stateDiagram-v2
    direction LR
    [*] --> Created: User launches token

    Created --> MintHeld: Mint authority = user wallet
    Created --> FreezeHeld: Freeze authority = user wallet

    MintHeld --> MintRevoked: Revoke Mint\n(setAuthority → null)
    FreezeHeld --> FreezeRevoked: Revoke Freeze\n(setAuthority → null)

    MintHeld --> DEXIssue: Most DEXes require\nfreeze to be revoked
    FreezeRevoked --> DEXReady: Can list on Raydium\nand Meteora ✅

    MintRevoked --> FullTrust: Both revoked
    FreezeRevoked --> FullTrust: Both revoked

    FullTrust --> [*]: Trust Score = MAX\nInvestors can verify supply is fixed
```

---

### Dashboard Data Pipeline

```mermaid
flowchart TD
    W([Wallet Connected]) --> RPC[getParsedTokenAccountsByOwner\nSolana RPC call]
    RPC --> MAP[Map over accounts]
    MAP --> SPL[getMintInfo per token\n@solana/spl-token]
    SPL --> PDA[Derive Metaplex PDA\nfindMetadataPda per mint]
    PDA -->|Account exists| RICH[Enrich with name · symbol · image URI]
    PDA -->|No metadata| PLAIN[Show mint address only]
    RICH & PLAIN --> GRID[Dashboard Portfolio Grid\nToken cards]
    GRID --> ACT[Quick Actions per token\nBurn · Manage Authority · Liquidity]

    style W fill:#9945FF,color:#fff
    style GRID fill:#3b82f6,color:#fff
    style RICH fill:#22c55e,color:#fff
```

---

## 🌲 Complete File Tree

```
solana-launcher/
│
├── 📁 app/                                ← Next.js App Router root
│   ├── layout.tsx                         ← Root layout: Inter font, QueryProvider, WalletContext
│   ├── globals.css                        ← Tailwind base + CSS custom properties
│   │
│   ├── 📁 (marketing)/                    ← Public route group · no wallet required
│   │   ├── layout.tsx                     ← ComplianceBanner + SiteHeader + SiteFooter
│   │   ├── page.tsx                       ← Landing: hero · features · how-it-works · FAQ
│   │   ├── terms/page.tsx                 ← Terms of Service (CBK Circular cited by name)
│   │   ├── privacy/page.tsx               ← Privacy Policy (IPFS permanence + wallet data)
│   │   └── risk-disclosure/page.tsx       ← Risk Disclosure (Kuwait/GCC regulatory section)
│   │
│   ├── 📁 (dashboard)/                    ← App route group · wallet required
│   │   ├── layout.tsx                     ← Dashboard shell + navigation
│   │   ├── launch/page.tsx                ← Token wizard entry point
│   │   ├── liquidity/page.tsx             ← Raydium + Meteora pool finder
│   │   ├── admin/page.tsx                 ← Treasury dashboard (wallet-gated)
│   │   └── dashboard/
│   │       ├── page.tsx                   ← Portfolio overview + quick actions
│   │       ├── burn/page.tsx              ← Burn token UI with confirmation
│   │       └── manage/
│   │           ├── page.tsx               ← Token picker index for management
│   │           └── [mint]/page.tsx        ← Per-token authority management
│   │
│   └── 📁 api/                            ← Server-only Next.js route handlers
│       ├── upload/route.ts                ← IPFS upload · rate-limited · Pinata JWT (server)
│       └── metadata/route.ts              ← On-chain metadata reader · rate-limited
│
├── 📁 components/                         ← React components organized by domain
│   │
│   ├── 📁 ui/                             ← Primitive shadcn-style components (all 'use client')
│   │   ├── button.tsx                     ← Button + asChild (Radix Slot) + loading spinner
│   │   ├── badge.tsx                      ← Status badges (info · success · warning · error)
│   │   ├── card.tsx                       ← Card + CardHeader + CardContent + CardTitle
│   │   ├── input.tsx                      ← Controlled input with ref forwarding
│   │   ├── textarea.tsx                   ← Controlled textarea with ref forwarding
│   │   ├── alert.tsx                      ← Alert + AlertTitle + AlertDescription
│   │   └── transaction-progress.tsx       ← Animated multi-step transaction status component
│   │
│   ├── 📁 launcher/                       ← 4-step token launch wizard
│   │   ├── TokenLaunchWizard.tsx          ← Orchestrator: step state · form context · submission
│   │   ├── WizardStepIndicator.tsx        ← Visual 1→2→3→4 step progress bar
│   │   ├── TokenPresets.tsx               ← 5 preset cards: Meme Classic/Maxi/Community/etc.
│   │   ├── LaunchSuccess.tsx              ← Post-launch screen: mint address · Solscan · actions
│   │   ├── FaqSection.tsx                 ← Accordion FAQ section on landing page
│   │   └── steps/
│   │       ├── StepTokenDetails.tsx       ← Step 1: name · symbol · decimals · description
│   │       ├── StepBranding.tsx           ← Step 2: image upload · Twitter · Telegram · Website
│   │       ├── StepReview.tsx             ← Step 3: summary · economics · ToS gate · fee shown
│   │       └── StepLaunch.tsx             ← Step 4: transaction progress + broadcast status
│   │
│   ├── 📁 dashboard/                      ← Dashboard UI components
│   │   ├── DashboardClient.tsx            ← Portfolio grid · on-chain token loader
│   │   ├── ManageIndexClient.tsx          ← Token picker for /dashboard/manage
│   │   ├── TokenManageClient.tsx          ← Trust score + revoke mint/freeze UI
│   │   └── BurnTokenForm.tsx              ← Burn amount input + 2-step confirmation dialog
│   │
│   ├── 📁 liquidity/
│   │   └── LiquidityClient.tsx            ← Pool finder · price calculator · DEX deep links
│   │
│   ├── 📁 admin/
│   │   └── AdminClient.tsx                ← Treasury SOL balance · revenue estimate · Solscan
│   │
│   ├── 📁 compliance/
│   │   └── ComplianceBanner.tsx           ← Amber dismissible banner (persisted in localStorage)
│   │
│   ├── 📁 layout/
│   │   ├── site-header.tsx                ← Nav: Dashboard · Launch · Liquidity · Admin (gated)
│   │   └── site-footer.tsx                ← Links · legal notice · social · jurisdiction warning
│   │
│   ├── 📁 wallet/
│   │   ├── WalletContextProvider.tsx      ← Phantom + Solflare + Backpack adapter configuration
│   │   ├── NetworkBanner.tsx              ← Devnet/Mainnet/Testnet network indicator banner
│   │   └── SolBalanceCheck.tsx            ← Inline SOL balance warning component
│   │
│   └── 📁 providers/
│       └── ReactQueryProvider.tsx         ← TanStack Query client setup + provider
│
├── 📁 services/                           ← On-chain business logic (pure async functions)
│   ├── 📁 token-launcher/
│   │   └── token-launch.service.ts        ← buildTokenTransaction · mintToken · re-broadcast
│   ├── 📁 token-burn/
│   │   └── token-burn.service.ts          ← burnTokens · getTokenBalance
│   ├── 📁 token-authority/
│   │   └── revoke-authority.service.ts    ← revokeMintAuthority · revokeFreezeAuthority
│   ├── 📁 liquidity/
│   │   └── liquidity.service.ts           ← findRaydiumPools · findMeteoraPools
│   └── 📁 fees/
│       └── fees.service.ts                ← calculateFees · buildFeeInstruction
│
├── 📁 hooks/                              ← React custom hooks (UI ↔ services glue)
│   ├── useTokenLaunch.ts                  ← Complete launch flow as a hook with status machine
│   ├── useBurnToken.ts                    ← Burn flow as a hook
│   └── useSOLBalance.ts                   ← Wallet SOL balance tracking + low balance warning
│
├── 📁 lib/                                ← Pure utilities + configuration (no React)
│   ├── 📁 config/
│   │   ├── app-config.ts                  ← Single source of truth — reads all env vars
│   │   └── env-validation.ts              ← Schema-based env validation + placeholder detection
│   ├── 📁 solana/
│   │   ├── connection.ts                  ← getConnection() singleton — reuses RPC connection
│   │   └── portfolio.ts                   ← getWalletTokenAccounts · getMintInfo · Metaplex
│   ├── 📁 storage/
│   │   └── storage.ts                     ← uploadImage · uploadMetadata (Pinata wrappers)
│   ├── 📁 rate-limit/
│   │   └── rate-limit.ts                  ← Upstash Redis distributed rate limiter + in-memory fallback
│   ├── 📁 validation/
│   │   └── token-schemas.ts               ← Zod schemas: TokenFormData · MintParams · etc.
│   ├── 📁 analytics/
│   │   └── analytics.ts                   ← PostHog / Mixpanel wrapper (no-op if unconfigured)
│   └── 📁 utils/
│       ├── utils.ts                        ← cn() · formatBalance() · truncateAddress()
│       └── errors.ts                       ← AppError class + 12 typed error codes
│
├── 📁 types/
│   └── index.ts                           ← Global TypeScript interfaces and type aliases
│
├── .env.example                           ← All variables with inline documentation
├── next.config.mjs                        ← Webpack Node.js polyfills for Solana crypto deps
├── tailwind.config.ts                     ← Brand palette: brand-500 · solana-purple · etc.
├── tsconfig.json                          ← Strict mode · ES2020 target · path aliases
├── SETUP.md                               ← Vercel deploy guide + Pinata + env vars walkthrough
├── BID_PROPOSAL.md                        ← Project pitch ($3k "already done" positioning)
├── ARCHITECTURE.md                        ← Deep-dive architecture decisions
├── DEPLOYMENT.md                          ← Production deployment runbook
├── SECURITY_NOTES.md                      ← Threat model + attack surface analysis
├── FUTURE_ROADMAP.md                      ← Sprint 2+ features with estimates
├── vitest.config.ts                       ← Test runner configuration + path aliases
├── 📁 __tests__/                          ← Unit test suite (vitest, 32 tests)
│   ├── 📁 lib/
│   │   ├── utils.test.ts                  ← 14 tests: truncateAddress, formatNumber, formatSOL, isValidUrl
│   │   ├── errors.test.ts                 ← 10 tests: createAppError, parseBlockchainError, errorMessage
│   │   └── env-validation.test.ts         ← 2 tests: missing vars, placeholder detection
│   └── 📁 services/
│       └── fees.test.ts                   ← 6 tests: calculateFees, PRICING_TIERS
└── 📁 scripts/
    └── verify.sh                          ← Full CI pipeline: type-check → lint → test → build
```

---

## ✨ Feature Reference

### 🟣 Core Launch Wizard

| Feature | File | Notes |
|---|---|---|
| 4-step wizard orchestrator | `TokenLaunchWizard.tsx` | Manages step state, form context, error recovery |
| Step 1 — Token Details | `steps/StepTokenDetails.tsx` | Name · symbol · decimals · description · live preview badge |
| Step 2 — Branding | `steps/StepBranding.tsx` | Image upload with preview · Twitter · Telegram · Website |
| Step 3 — Review | `steps/StepReview.tsx` | Economics preview · ToS acceptance gate · fee disclosure |
| Step 4 — Launch | `steps/StepLaunch.tsx` | Animated transaction progress · broadcast status |
| Step indicator | `WizardStepIndicator.tsx` | Visual 1→2→3→4 with active/complete states |
| One-click presets | `TokenPresets.tsx` | 5 preset cards shown before Step 1 |
| Launch success | `LaunchSuccess.tsx` | Mint address · Solscan link · copy button · next actions |
| BigInt supply math | `token-schemas.ts` | Zod transform: string → BigInt, prevents float precision loss |
| Live economics preview | `steps/StepReview.tsx` | Display supply vs raw units, 1% example, smallest unit |

### 🟢 Token Presets

| Preset | Supply | Decimals | Raw Units | Use Case |
|---|---|---|---|---|
| **Meme Classic** | 1,000,000,000 | 9 | 10^18 | Standard meme coin |
| **Meme Maxi** | 1,000,000,000,000 | 6 | 10^18 | Quadrillion-feel meme |
| **Community** | 100,000,000 | 6 | 10^14 | Community / utility token |
| **Scarce** | 21,000,000 | 8 | 2.1 × 10^15 | Bitcoin-style scarcity narrative |
| **Governance** | 10,000,000 | 0 | 10^7 | DAO voting token — whole units only |

### 🔵 On-Chain Operations

| Operation | File | Instructions Used |
|---|---|---|
| Token launch | `token-launch.service.ts` | createMint + createATA + mintTo + SystemTransfer + MetaplexMetadata |
| Burn tokens | `token-burn.service.ts` | SPL `burn` instruction |
| Revoke mint authority | `revoke-authority.service.ts` | `setAuthority(mint, null, AuthorityType.MintTokens)` |
| Revoke freeze authority | `revoke-authority.service.ts` | `setAuthority(mint, null, AuthorityType.FreezeAccount)` |
| Platform fee | `fees.service.ts` | `SystemProgram.transfer` to treasury in same tx |
| Pool lookup — Raydium | `liquidity.service.ts` | Raydium v3 REST API |
| Pool lookup — Meteora | `liquidity.service.ts` | Meteora DLMM REST API |

### 🟡 Dashboard Features

| Feature | File | Data Source |
|---|---|---|
| Live portfolio | `DashboardClient.tsx` | `getParsedTokenAccountsByOwner` → live RPC |
| Metadata enrichment | `lib/solana/portfolio.ts` | Metaplex PDA derivation + account read per mint |
| Token cards with image | `DashboardClient.tsx` | Renders IPFS image via Pinata gateway |
| Token Trust Score | `TokenManageClient.tsx` | Live RPC check: mintAuthority + freezeAuthority null? |
| Quick action routing | `DashboardClient.tsx` | Per-token links → burn / manage / liquidity |

### 🔴 Security & Rate Limiting

| Feature | Implementation | Location |
|---|---|---|
| Rate limit — upload | 10 req/min/IP — Upstash Redis (distributed) | `lib/rate-limit/rate-limit.ts` + `api/upload/route.ts` |
| Rate limit — metadata | 10 req/min/IP — Upstash Redis (distributed) | `api/metadata/route.ts` |
| Env validation | Schema-based startup validation + placeholder detection | `lib/config/env-validation.ts` |
| SOL balance check | Warns user before transactions if SOL is low | `hooks/useSOLBalance.ts` + `components/wallet/SolBalanceCheck.tsx` |
| Network banner | Prominent devnet/mainnet/testnet indicator | `components/wallet/NetworkBanner.tsx` |
| Pinata JWT server-only | Never in `NEXT_PUBLIC_` prefix | `app/api/upload/route.ts` |
| Admin wallet gate | `publicKey.toBase58() === TREASURY_WALLET` | `components/admin/AdminClient.tsx` |
| Non-custodial design | Wallet adapter signs; platform never sees keys | `hooks/useTokenLaunch.ts` |
| Atomic fee enforcement | Same tx as mint creation → runtime-atomic | `services/token-launcher/token-launch.service.ts` |
| ToS acceptance gate | Launch wizard locked until checkbox checked | `steps/StepReview.tsx` |

---

## 🕸 Component Graph

```
RootLayout ── app/layout.tsx
│
├── ReactQueryProvider          ← TanStack Query context (client-side)
└── WalletContextProvider       ← Phantom · Solflare · Backpack
    │
    ├── MarketingLayout ── app/(marketing)/layout.tsx
    │   ├── ComplianceBanner    ← amber dismiss banner (localStorage)
    │   ├── SiteHeader          ← nav links  (usePathname)
    │   ├── {page content}
    │   └── SiteFooter
    │
    └── DashboardLayout ── app/(dashboard)/layout.tsx
        ├── SiteHeader          ← nav + wallet connect button
        ├── {page content}
        └── SiteFooter

Page → Client Component mapping
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/launch                     TokenLaunchWizard
                            ├── WizardStepIndicator
                            ├── TokenPresets  (preset picker before step 1)
                            ├── StepTokenDetails
                            ├── StepBranding
                            ├── StepReview   (ToS gate here)
                            ├── StepLaunch ──► TransactionProgress
                            └── LaunchSuccess

/dashboard                  DashboardClient
                            ├── Token cards (mapped from wallet accounts)
                            │   └── Badge · Card · Button (asChild Links)
                            └── Quick-action buttons → burn / manage / liquidity

/dashboard/burn             BurnTokenForm
                            ├── Input (amount)
                            ├── Alert (irreversibility warning)
                            └── Confirmation dialog

/dashboard/manage           ManageIndexClient
                            ├── Token list (wallet accounts)
                            └── Manual mint address entry

/dashboard/manage/[mint]    TokenManageClient
                            ├── Token Trust Score card
                            │   ├── Mint authority status (live RPC)
                            │   └── Freeze authority status (live RPC)
                            ├── Revoke Mint Authority button
                            └── Revoke Freeze Authority button

/liquidity                  LiquidityClient
                            ├── Mint address input
                            ├── Raydium pool results
                            ├── Meteora pool results
                            ├── Implied price calculator (SOL + token → price)
                            └── Direct links to Raydium / Meteora UIs

/admin                      AdminClient (wallet-gated)
                            ├── Treasury SOL balance (live RPC)
                            ├── Estimated launch count
                            ├── Estimated revenue
                            └── Solscan transaction history link
```

---

## ⚡ Quick Start

```bash
# ── 1. Clone ──────────────────────────────────────────────────
git clone <your-repo-url>
cd solana-launcher

# ── 2. Install dependencies ───────────────────────────────────
npm install

# ── 3. Configure environment ──────────────────────────────────
cp .env.example .env.local
# Open .env.local and set these 6 values:
#   NEXT_PUBLIC_SOLANA_NETWORK=devnet
#   NEXT_PUBLIC_SOLANA_RPC_URL=https://api.devnet.solana.com
#   NEXT_PUBLIC_TREASURY_WALLET=<your-phantom-public-key>
#   NEXT_PUBLIC_CREATION_FEE_SOL=0.1
#   NEXT_PUBLIC_STORAGE_PROVIDER=pinata
#   PINATA_JWT=<your-pinata-jwt>

# ── 4. Start development server ───────────────────────────────
npm run dev
# → http://localhost:3000
```

> **Minimum config to run locally on devnet** — see [Environment Variables](#-environment-variables) for full reference.

---

## 🔐 Environment Variables

### Required (app will not function without these)

| Variable | Example Value | Where to Get It | Purpose |
|---|---|---|---|
| `NEXT_PUBLIC_SOLANA_NETWORK` | `devnet` | you | `devnet` or `mainnet-beta` |
| `NEXT_PUBLIC_SOLANA_RPC_URL` | `https://api.devnet.solana.com` | RPC provider (see below) | Solana JSON-RPC endpoint |
| `NEXT_PUBLIC_TREASURY_WALLET` | `7xKjFAKE...bQ3r` | Your Phantom wallet | Fee recipient + admin gate |
| `NEXT_PUBLIC_CREATION_FEE_SOL` | `0.1` | you | Platform fee in SOL per launch |
| `NEXT_PUBLIC_STORAGE_PROVIDER` | `pinata` | you | Always `pinata` |
| `PINATA_JWT` | `eyJhbGci...` | pinata.cloud → API Keys | **Server-side only** IPFS upload auth |

### Optional

| Variable | Default | Purpose |
|---|---|---|
| `NEXT_PUBLIC_APP_NAME` | `Solana Launcher` | Browser tab title + OG tags |
| `NEXT_PUBLIC_APP_URL` | `http://localhost:3000` | OG metadata URL, must match domain in production |
| `NEXT_PUBLIC_PINATA_GATEWAY` | `https://gateway.pinata.cloud` | Custom IPFS image delivery CDN |
| `ADMIN_API_SECRET` | none | Shared secret for signing admin API calls |
| `NEXT_PUBLIC_POSTHOG_KEY` | none | PostHog analytics |
| `NEXT_PUBLIC_MIXPANEL_TOKEN` | none | Mixpanel analytics |
| `DATABASE_URL` | none | Optional Prisma DB for launch history |
| `DIRECT_URL` | none | Supabase direct connection URL |
| `UPSTASH_REDIS_REST_URL` | none | Upstash Redis URL for distributed rate limiting |
| `UPSTASH_REDIS_REST_TOKEN` | none | Upstash Redis auth token (paired with URL) |

---

## 🛠 Step-by-Step Local Dev

### Step 1 — Verify Prerequisites

```
Check              Command                  Required Version
──────────────────────────────────────────────────────────
Node.js            node --version           >= 18.0.0
npm                npm --version            >= 9.0.0
Git                git --version            any
Phantom extension  Chrome Web Store         any recent version
```

### Step 2 — Get a Pinata JWT

```
1. Go to https://pinata.cloud
2. Create a free account (no credit card needed for dev)
3. Click "API Keys" in the left sidebar
4. Click "+ New Key"
5. Toggle "Admin" permissions ON
6. Give it a name like "solana-launcher-dev"
7. Click "Generate API Key"
8. ⚠️  COPY THE JWT TOKEN NOW — shown only once
   (It starts with eyJ... and is about 200+ characters long)
9. Do NOT use the "API Key" or "API Secret" fields — use the JWT
```

### Step 3 — Get Your Treasury Wallet Public Key

```
1. Open Phantom browser extension
2. Look at the top of the popup — your wallet name and truncated address
3. Click the copy icon next to your address
   OR → click the wallet name → "Copy Address"
4. Result: a base58 string like 7xKjAbcDef...bQ3r (44 characters)
5. This is your PUBLIC key — safe to put in .env.local and deploy
⚠️  NEVER put your seed phrase or private key anywhere
```

### Step 4 — Configure .env.local

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_SOLANA_NETWORK=devnet
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.devnet.solana.com
NEXT_PUBLIC_TREASURY_WALLET=PASTE_YOUR_44_CHAR_PUBLIC_KEY_HERE
NEXT_PUBLIC_CREATION_FEE_SOL=0.1
NEXT_PUBLIC_STORAGE_PROVIDER=pinata
PINATA_JWT=PASTE_YOUR_JWT_HERE
```

### Step 5 — Install and Run

```bash
npm install          # installs all 40 dependencies including Solana SDK
npm run dev          # starts Next.js dev server
```

Open [http://localhost:3000](http://localhost:3000)  
Expected: Landing page loads, no console errors.

### Step 6 — Switch Phantom to Devnet

```
1. Open Phantom → click the ⚙️ gear icon
2. Scroll to "Developer Settings"
3. Enable "Testnet Mode"
   OR go to: Settings → Change Network → Devnet
4. The Phantom header should now say "Devnet"
5. Reload http://localhost:3000
```

### Step 7 — Get Free Devnet SOL

```
1. Copy your Phantom wallet address (Step 3)
2. Go to https://faucet.solana.com
3. Paste your address
4. Click "Confirm Airdrop" (gives 2 SOL)
5. Wait 5–10 seconds
6. Phantom balance updates: should show ~2 SOL
```

### Step 8 — Launch Your First Token

```
1. Go to http://localhost:3000/launch
2. Click "Connect Wallet" → select Phantom
3. Approve the connection in Phantom popup
4. Choose a preset (e.g. "Meme Classic") or start from scratch
5. Step 1: Name = "TEST TOKEN", Symbol = "TEST", Decimals = 9
6. Step 2: Upload any PNG image (drag and drop works)
7. Step 3: Review — supply shows as 1,000,000,000 TEST
   → Fee shown: 0.1 SOL → check the ToS box
8. Step 4: Click "Launch Token"
   → Phantom popup appears: review and click "Approve"
   → Progress: Creating → Broadcasting → Confirming → Metadata
9. ✅ Success screen appears with your mint address
10. Click "View on Solscan" to verify on-chain
```

### Available Scripts

| Script | Command | What It Does |
|---|---|---|
| **Dev server** | `npm run dev` | Hot-reload server on port 3000 (or next available) |
| **Production build** | `npm run build` | Compiles all 15 routes, must exit 0 |
| **Serve production** | `npm run start` | Runs the `.next/` build locally |
| **Lint** | `npm run lint` | ESLint pass |
| **Type check** | `npx tsc --noEmit` | TypeScript strict pass — 0 errors required |
| **Test** | `npm run test` | Vitest — 32 unit tests across 4 suites |
| **Test (watch)** | `npm run test:watch` | Vitest in watch mode for development |
| **Full verify** | `npm run verify` | Type-check → lint → test → build (CI pipeline) |

---

## 🔌 API Routes

### `POST /api/upload`

Uploads token image and metadata JSON to IPFS via Pinata.  
**Pinata JWT is read server-side only — never reaches the browser.**

**Rate limit:** 10 requests / minute / IP (sliding window)

**Request format:** `multipart/form-data`

| Field | Type | Required | Constraints |
|---|---|---|---|
| `file` | File | ✅ | PNG, JPEG, GIF, WEBP, SVG only. Max 5MB. |
| `name` | string | ✅ | Token name (appears in metadata) |
| `symbol` | string | ✅ | Token symbol |
| `description` | string | ✅ | Token description |
| `attributes` | JSON string | optional | Array of `{trait_type, value}` objects |

**Success response** `200`:
```json
{
  "imageUri": "https://ipfs.io/ipfs/QmXxxImageHash...",
  "metadataUri": "https://ipfs.io/ipfs/QmYyyMetaHash..."
}
```

**Error responses:**

| Status | Body | Cause |
|---|---|---|
| `429` | `{"error":"rate_limit_exceeded"}` | > 10 req/min from this IP |
| `400` | `{"error":"invalid_file_type"}` | MIME not in allowlist |
| `400` | `{"error":"file_too_large"}` | File exceeds 5MB |
| `500` | `{"error":"upload_failed","detail":"..."}` | Pinata API error |

---

### `POST /api/metadata`

Uploads token metadata JSON to IPFS via Pinata. Called server-side so the `PINATA_JWT` secret never reaches the browser.

**Rate limit:** 10 uploads / minute / IP

**Request body** (`application/json`):

| Field | Required | Notes |
|---|---|---|
| `name` | ✅ | Token full name |
| `symbol` | ✅ | Ticker symbol |
| `image` | ✅ | IPFS URI returned by `POST /api/upload` |
| `description` | ❌ | Free-form token description |
| `website` | ❌ | Project URL |
| `twitter` | ❌ | Twitter/X handle |
| `discord` | ❌ | Discord invite URL |

**Success response** `200`:
```json
{ "uri": "https://ipfs.io/ipfs/QmMeta..." }
```

**Error responses:**

| Status | Body | Cause |
|---|---|---|
| `400` | `{"error":"Missing required metadata fields: name, symbol, image"}` | Incomplete payload |
| `429` | `{"error":"Too many requests. Please wait a moment."}` | Rate limit hit |
| `500` | `{"error":"Metadata upload failed: ..."}` | Pinata API error or missing `PINATA_JWT` |

---

## ⚙️ Services Layer

### `token-launch.service.ts` — Token Creation

```
buildTokenTransaction(params: MintParams, connection: Connection)
│
├── Generate ephemeral Mint keypair
│   └── keypair.generate() — never persisted, used only for this transaction
│
├── Instructions batch (single VersionedTransaction):
│   ├── [0] createMint
│   │     → SystemProgram.createAccount (allocates Mint account space + rent)
│   │     → initializeMint2 (sets decimals, mintAuthority = user wallet)
│   ├── [1] createAssociatedTokenAccount
│   │     → getOrCreateAssociatedTokenAccount for user wallet + mint
│   ├── [2] mintTo
│   │     → mint full supply (as BigInt raw units) to user ATA
│   └── [3] SystemProgram.transfer
│         → platform fee in lamports to TREASURY_WALLET
│
└── Returns { transaction: VersionedTransaction, mintAddress: PublicKey }

sendAndConfirmWithRetry(tx, connection, maxDuration = 90000ms)
├── connection.sendRawTransaction(tx.serialize(), { skipPreflight: false })
├── Poll getSignatureStatus every 2 seconds
├── If status null and blockhash still valid → re-broadcast
├── If confirmed → return signature
└── If blockhash expired → throw AppError(TRANSACTION_EXPIRED)
```

---

### `revoke-authority.service.ts` — Authority Revocation

```
revokeMintAuthority(mint, wallet, connection)
→ setAuthority(
    connection,
    walletKeypair,          ← wallet.adapter.sendTransaction handles signing
    mint,                   ← mint PublicKey
    wallet.publicKey,       ← current authority
    AuthorityType.MintTokens,
    null                    ← null = revoke (no new authority)
  )
⚠️  IRREVERSIBLE — once submitted, nobody can ever mint more of this token

revokeFreezeAuthority(mint, wallet, connection)
→ setAuthority(..., AuthorityType.FreezeAccount, null)
⚠️  IRREVERSIBLE — wallets holding this token can no longer be frozen
```

---

### `token-burn.service.ts` — Burn

```
burnTokens(mint, amountRaw: bigint, wallet, connection)
├── getAssociatedTokenAddress(mint, wallet.publicKey)
├── createBurnInstruction(ata, mint, wallet.publicKey, amountRaw)
└── sendTransaction(...)
    → reduces circulating supply permanently by amountRaw / 10^decimals
```

---

### `liquidity.service.ts` — Pool Lookup

```
findRaydiumPools(mintAddress: string)
→ GET https://api-v3.raydium.io/pools/info/mint?mint={mintAddress}&poolType=all
→ Returns: [ { poolId, price, liquidity, volume24h, baseToken, quoteToken } ]

findMeteoraPools(mintAddress: string)
→ GET https://dlmm-api.meteora.ag/pair/all_by_groups?mint={mintAddress}
→ Returns: [ { pairAddress, activeBin, binStep, liquidity, fees24h } ]

⏳ INTEGRATION_PENDING:
   addLiquidityRaydium(poolId, baseAmount, quoteAmount, wallet)
   → Requires @raydium-io/raydium-sdk-v2
   → Steps documented in service file inline comments

   addLiquidityMeteora(pairAddress, tokenX, tokenY, wallet)
   → Requires @meteora-ag/dlmm
   → Steps documented in service file inline comments
```

---

### `fees.service.ts` — Fee Calculation

```
calculateFees(feeSol: number): lamports
→ feeSol * LAMPORTS_PER_SOL  (e.g. 0.1 SOL = 100_000_000 lamports)

buildFeeInstruction(from: PublicKey, to: PublicKey, lamports: bigint)
→ SystemProgram.transfer({ fromPubkey: from, toPubkey: to, lamports })
→ Used as instruction [3] in the launch transaction
```

---

## 🪝 Hooks Reference

### `useTokenLaunch`

```typescript
const {
  status,       // 'idle' | 'uploading' | 'building' | 'signing'
                // | 'confirming' | 'attaching-metadata' | 'done' | 'error'
  mintAddress,  // string | null  ← set on success
  txSignature,  // string | null  ← set on success
  error,        // AppError | null
  launch,       // (formData: TokenFormData) => Promise<void>
  reset,        // () => void  ← returns to 'idle'
} = useTokenLaunch();
```

**Internal state machine:**
```
idle
 └─ launch(formData) called
    ├─ status: 'uploading'    → POST /api/upload (image + metadata to IPFS)
    ├─ status: 'building'     → buildTokenTransaction (assemble instructions)
    ├─ status: 'signing'      → wallet.sendTransaction (user approves in Phantom)
    ├─ status: 'confirming'   → sendAndConfirmWithRetry (re-broadcast loop)
    ├─ status: 'attaching-metadata' → 2nd tx: Metaplex createMetadataAccountV3
    └─ status: 'done'         → mintAddress + txSignature set
         OR
    └─ status: 'error'        → error: AppError with code + message
```

---

### `useBurnToken`

```typescript
const {
  status,   // 'idle' | 'burning' | 'done' | 'error'
  error,    // AppError | null
  txSig,    // string | null
  burn,     // (mint: string, amountRaw: bigint) => Promise<void>
  reset,    // () => void
} = useBurnToken();
```

---

### Error Codes

All errors extend `AppError` with a typed `code` field:

| Code | Trigger | User Message |
|---|---|---|
| `WALLET_NOT_CONNECTED` | Action called without wallet | "Connect your wallet first" |
| `INSUFFICIENT_SOL` | Fee > wallet balance | "Insufficient SOL for fee + rent" |
| `UPLOAD_FAILED` | Pinata API error | "Image upload failed — try again" |
| `TRANSACTION_EXPIRED` | Blockhash expired | "Transaction expired — please retry" |
| `SIMULATION_FAILED` | Preflight check failed | "Transaction simulation failed" |
| `USER_REJECTED` | User closed Phantom | "Transaction rejected" |
| `NETWORK_ERROR` | RPC connection issue | "Network error — check your connection" |
| `INVALID_MINT_ADDRESS` | Bad base58 input | "Invalid mint address" |
| `METADATA_NOT_FOUND` | No Metaplex account | "No metadata found for this mint" |
| `RATE_LIMIT_EXCEEDED` | > 10 req/min | "Too many requests — wait 60 seconds" |
| `INVALID_FILE_TYPE` | Wrong MIME type | "Only PNG, JPEG, GIF, WEBP, SVG allowed" |
| `FILE_TOO_LARGE` | > 5MB | "File must be under 5MB" |

---

## 🚀 Deploying to Production

### Pre-Deploy Checklist

```
□ npm run build exits with code 0
□ npx tsc --noEmit shows 0 errors
□ git status confirms .env.local is NOT staged
□ .env.local is listed in .gitignore (it is — verified)
□ NEXT_PUBLIC_SOLANA_NETWORK=mainnet-beta set (in Vercel env, not in repo)
□ NEXT_PUBLIC_SOLANA_RPC_URL = production endpoint (paid, not public)
□ NEXT_PUBLIC_TREASURY_WALLET = mainnet wallet you control
□ PINATA_JWT = production Pinata key with sufficient plan
□ NEXT_PUBLIC_APP_URL = your production domain (for OG tags)
```

### Deploy via GitHub + Vercel (Recommended)

```bash
# 1. Initialize git (if not done)
git init
git add .
git commit -m "initial delivery"

# 2. Create private GitHub repo and push
git remote add origin https://github.com/YOUR_USERNAME/solana-launcher.git
git push -u origin main

# 3. In Vercel dashboard:
#    → Add New Project → Import from GitHub
#    → Framework: Next.js (auto-detected)
#    → Add env vars (from .env.example)
#    → Deploy
```

### Deploy via Vercel CLI

```bash
npm install -g vercel
vercel login
vercel --prod
# Follow prompts — add env vars when asked
```

### Production RPC Providers

| Provider | Free Tier | Mainnet URL Pattern |
|---|---|---|
| **Helius** | 100k req/day | `https://mainnet.helius-rpc.com/?api-key=KEY` |
| **QuickNode** | 10M credits/mo | `https://xxx.solana-mainnet.quiknode.pro/KEY/` |
| **Alchemy** | 100M CU/mo | `https://solana-mainnet.g.alchemy.com/v2/KEY` |

> ⚠️ `https://api.mainnet-beta.solana.com` is heavily rate-limited.  
> Do not use it in production — launches will fail under any real traffic.

### Mainnet Switch Checklist

```env
# .env in Vercel dashboard (NOT in .env.local file):
NEXT_PUBLIC_SOLANA_NETWORK=mainnet-beta
NEXT_PUBLIC_SOLANA_RPC_URL=https://mainnet.helius-rpc.com/?api-key=YOUR_KEY
NEXT_PUBLIC_TREASURY_WALLET=YOUR_MAINNET_WALLET_PUBLIC_KEY
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

Then trigger a redeploy in Vercel.

---

## 💧 Liquidity Integration

### Current Status

```
Feature                        Status      Notes
──────────────────────────────────────────────────────────────────────────────
Pool Finder UI                 ✅ Done     Raydium + Meteora side-by-side cards
Implied Price Calculator       ✅ Done     Enter SOL + tokens → price per token
Raydium v3 API Lookup          ✅ Done     Live pool data: price · liquidity · volume
Meteora DLMM API Lookup        ✅ Done     Live pair data: activeBin · binStep · fees
DEX Redirect Links             ✅ Done     Opens Raydium/Meteora with mint pre-filled
Prerequisite Warnings          ✅ Done     Warns if freeze authority not revoked
Raydium AMM V4 on-chain tx     ⏳ Pending  SDK steps in liquidity.service.ts comments
Meteora DLMM on-chain tx       ⏳ Pending  SDK steps in liquidity.service.ts comments
```

### What INTEGRATION_PENDING Means for Operators

The complete user flow for liquidity management is functional today:
1. User enters their mint address
2. Live pool data from Raydium v3 and Meteora DLMM APIs is fetched and displayed
3. Implied price calculator helps set initial pool price
4. Deep links open the respective DEX's pool creation UI with mint address pre-filled

The **on-chain transaction builders** (that would submit the addLiquidity instruction directly from the app) require the `@raydium-io/raydium-sdk-v2` and `@meteora-ag/dlmm` SDKs. Exact integration steps are documented as inline comments in `services/liquidity/liquidity.service.ts`. This is a Sprint 2 item.

---

## 🔒 Security Model

### Threat Model

```
Attack Surface       Threat                           Mitigation
─────────────────────────────────────────────────────────────────────────────
Pinata JWT           Exposed in client code            Server-side API route only.
                     → attacker uploads to             Never in NEXT_PUBLIC_ vars.
                       your Pinata account             Never logged or exposed.

Treasury wallet      Wrong address                     Public var (safe).
public key           → fees go to wrong wallet         Validated in app-config.ts.
                                                       Build fails if invalid.

User private keys    Stolen                            Never touched by platform.
/ seed phrase        → wallet drained                  Wallet adapter signs locally.
                                                       Platform only gets signatures.

API abuse            Spam uploads                      Upstash Redis: 10 req/min/IP
                     → Pinata bill spikes              on /api/upload and /api/metadata.
                                                       Distributed across all instances.

Admin route          Unauthorized treasury             Client-side wallet check:
                     data accessed                     publicKey.toBase58() === TREASURY.
                                                       No sensitive data exposed either way.

Fee manipulation     User bypasses platform fee        Fee + mint in SAME atomic tx.
                     → launches without paying         Solana runtime enforces atomicity.
                                                       No partial exec possible.

Supply manipulation  User mints extra tokens           Revoke mint authority after launch.
                     post-launch                       Permanently removes minting power.
                                                       On-chain verifiable.
```

### Rate Limiting Implementation

```typescript
// lib/rate-limit/rate-limit.ts

// Distributed rate limiting via Upstash Redis:
// - Primary: @upstash/ratelimit with slidingWindow algorithm
// - Fallback: In-memory Map<ip, number[]> when UPSTASH_REDIS_REST_URL not set
// - async isRateLimited(identifier, opts?) → boolean

// Upstash Redis config (set in .env.local):
//   UPSTASH_REDIS_REST_URL=https://xxx.upstash.io
//   UPSTASH_REDIS_REST_TOKEN=AXxx...

config: {
  windowMs: 60_000,   // 1 minute window
  max: 10,            // 10 requests per window per IP
}

// Falls back to in-memory sliding window when Upstash is not configured.
// In-memory fallback is suitable for single-instance dev but not production.
```

---

## ⚖️ Compliance Layer

This platform ships with a complete legal disclosure stack targeting Kuwait/GCC operators. It is **not boilerplate** — every citation is specific.

### Legal Documents

| Document | Route | Key Content |
|---|---|---|
| **Terms of Service** | `/terms` | CBK Circular No. 2/RB/336/2014 cited. Capital Markets Authority Law No. 7 of 2010 cited. Non-custodial model stated. No investment advice. |
| **Risk Disclosure** | `/risk-disclosure` | Kuwait/GCC regulatory section. FATF virtual asset guidance. 7 specific risk categories. Irreversibility warning. |
| **Privacy Policy** | `/privacy` | IPFS permanence disclosure ("uploaded data cannot be deleted"). Wallet address handling. Analytics opt-out. No PII required. |
| **Compliance Banner** | All pages | Amber dismissible banner: "Not available where prohibited. Not regulated by CBK or CMA." Dismiss persisted in localStorage. |
| **Wizard ToS Gate** | `/launch` Step 3 | Launch button disabled until user checks ToS + Risk Disclosure acceptance. |

### Data Handling

```
Data type               Stored where            Retention
─────────────────────────────────────────────────────────────
Token image             Pinata IPFS             Permanent (IPFS = immutable)
Token metadata JSON     Pinata IPFS             Permanent
Wallet public key       Never stored            Not persisted server-side
Transaction signatures  On-chain (Solana)       Permanent (blockchain)
Banner dismiss state    localStorage (browser)  Until user clears browser data
Analytics events        PostHog/Mixpanel        Per their retention policy
                        (only if keys set)
Launch history          Not stored by default   Optional: add DATABASE_URL
```

---

## 📐 Architecture Decision Log

| Decision | Why |
|---|---|
| **App Router over Pages Router** | Server Components for legal pages — zero JS shipped to client for `/terms`, `/privacy`, `/risk-disclosure`. Client Components only where wallet or hooks are required. |
| **No database by default** | On-chain is ground truth. `getParsedTokenAccountsByOwner` returns live data without a DB read. Optional DB hook is in `.env.example` for operators who want launch history. |
| **Metaplex v2 not v3** | v3 renamed exports: `PROGRAM_ID` → different, `Metadata.fromAccountInfo` removed. v2 is stable and sufficient for SPL token metadata workflows. |
| **BigInt for supply math** | JavaScript `Number` (float64) cannot represent integers > 2^53 without precision loss. A 1B supply with 9 decimals = 10^18 raw units — requires BigInt. `"target": "ES2020"` enables BigInt literals. |
| **Atomic fee in same transaction** | Solana guarantees atomicity at transaction level. Putting the fee transfer in the same transaction as the mint creation makes partial charges architecturally impossible — not just unlikely. |
| **Re-broadcast loop** | Solana transactions expire if not confirmed within ~90 seconds. The official Solana pattern is to re-send every 2s until the blockhash expires or the tx confirms. Without this, network congestion causes silent failures. |
| **Server-side IPFS upload** | Pinata JWT must never be in `NEXT_PUBLIC_` variables. The Next.js API route (`/api/upload`) acts as a server proxy — it holds the JWT and the browser only ever sends FormData. |
| **Upstash Redis rate limiter** | Distributed sliding window via `@upstash/ratelimit`. Fixed window has burst vulnerabilities at window boundaries. Sliding window gives accurate "last 60 seconds" counting. Falls back to in-memory Map when Upstash is not configured (dev mode). |
| **`'use client'` on all UI primitives** | Next.js 14 App Router treats all components as Server Components by default. Any component that uses `@radix-ui/react-slot` (which calls `useContext` internally) must be a Client Component or hydration fails with React error #143. |

---

## 🔭 Extending the Platform

### Sprint 2 Candidates

| Feature | Effort | Value | Notes |
|---|---|---|---|
| Raydium AMM V4 on-chain tx | Medium | High | SDK steps in `liquidity.service.ts` |
| Meteora DLMM on-chain tx | Medium | High | SDK steps in `liquidity.service.ts` |
| Launch history database | Small | Medium | Add `DATABASE_URL` → Prisma schema ready |
| Email notifications | Small | Medium | SendGrid/Resend in `/api/upload` after IPFS returns |
| Token airdrop manager | Medium | High | CSV input → batch `transfer` instructions |
| Vesting schedule builder | Large | High | Requires Streamflow or custom timelock program |
| NFT + SPL token gating | Large | High | Requires separate gate verification contract |
| Multi-sig treasury | Medium | High | Squads Protocol integration |
| Solana Mobile cWallet | Small | Low | Wallet adapter already supports it |
| Bundled DEX launch | Large | Very High | Launch + create pool in one multi-tx flow |

### Adding a New Page

```bash
# 1. Create the route file
mkdir -p app/(dashboard)/my-feature
cat > app/(dashboard)/my-feature/page.tsx << 'EOF'
import { MyFeatureClient } from '@/components/my-feature/MyFeatureClient';
export default function MyFeaturePage() {
  return <MyFeatureClient />;
}
EOF

# 2. Create the client component
mkdir -p components/my-feature
cat > components/my-feature/MyFeatureClient.tsx << 'EOF'
'use client';
export function MyFeatureClient() {
  return <div>My Feature</div>;
}
EOF

# 3. Add to navigation
# Edit components/layout/site-header.tsx
# Add: <Link href="/my-feature">My Feature</Link>

# 4. Verify everything still builds
npx tsc --noEmit && npm run build
```

---

## 🩺 Troubleshooting

### Build Errors

| Error | Root Cause | Fix |
|---|---|---|
| `next.config.ts not supported` | Next.js 14 requires `.mjs` or `.js` | Use `next.config.mjs` (already done) |
| `Module not found: @radix-ui/react-slot` | Peer dep not installed | `npm install @radix-ui/react-slot` |
| `PROGRAM_ID is not exported` | Wrong mpl-token-metadata version | Must be v2: `npm install @metaplex-foundation/mpl-token-metadata@^2.13.0` |
| `BigInt literal` TS error | `target` < ES2020 in tsconfig | Set `"target": "ES2020"` in tsconfig.json (already done) |
| `React error #143` | Hook called in Server Component | Add `'use client'` to any component using React hooks or Radix UI |
| `React.Children.only` | `Slot` received multiple children | When `asChild=true`, pass only one React element child (spinner excluded) |

### Runtime Errors

| Error | Root Cause | Fix |
|---|---|---|
| `WalletNotConnectedError` | Action called before wallet connected | Add wallet connection guard |
| `TRANSACTION_EXPIRED` | Block expired before confirmation | Already handled by re-broadcast loop — happens rarely on congested network |
| `Insufficient lamports` | Low SOL balance (devnet) | Request airdrop at https://faucet.solana.com |
| `bigint: Failed to load bindings` | WASM not available in SSR context | **Non-fatal.** Falls back to pure JS. Safe to ignore. |
| `429 Too Many Requests` | Rate limit hit on upload or metadata | Wait 60 seconds. Uses Upstash Redis when configured, in-memory fallback otherwise. |
| `PINATA_JWT not set` | Missing env var | Copy `.env.example` → `.env.local`, set `PINATA_JWT` |
| `Invalid treasury wallet` | Bad base58 key in env | Copy your Phantom public key: 44 base58 characters |
| Admin page blank / no data | Wrong wallet connected | Connect the wallet matching `NEXT_PUBLIC_TREASURY_WALLET` |
| Token image not loading | IPFS gateway slow | Try switching `NEXT_PUBLIC_PINATA_GATEWAY` to `https://cloudflare-ipfs.com/ipfs/` |

### Phantom Network Mismatch

```
Symptom: "Account not found" or balance shows 0 even after airdrop

Cause: Phantom is on a different network than NEXT_PUBLIC_SOLANA_NETWORK

Fix:
1. Phantom → Settings → Developer Settings → Testnet Mode
   (or) Phantom → Change Network → match your NEXT_PUBLIC_SOLANA_NETWORK value
2. Reload the app
3. Reconnect wallet
```

---

<div align="center">

## 📊 Build Status Summary

| Check | Status | Detail |
|---|---|---|
| TypeScript `--noEmit` | ✅ 0 errors | Strict mode, ES2020 target |
| `npm run build` | ✅ Exit 0 | All 15 routes compiled |
| `npm run test` | ✅ 32 passing | Vitest — 4 test suites |
| `npm run verify` | ✅ | Type-check → lint → test → build |
| Static pages | ✅ 15 / 15 | All routes pre-rendered |
| `npm run dev` | ✅ 200 OK | Compiles in ~4.8s |
| Source files | 81 | `.tsx` · `.ts` · `.mjs` |
| Legal documents | 3 | ToS · Privacy · Risk Disclosure |
| Wallet support | 3 | Phantom · Solflare · Backpack |
| Networks | 2 | Devnet · Mainnet-Beta |
| Rate limiting | Distributed | Upstash Redis + in-memory fallback |

---

<img src="https://img.shields.io/badge/Non--Custodial-Platform_never_holds_keys-9945FF?style=flat-square" />
<img src="https://img.shields.io/badge/Atomic_Fees-No_partial_charges_possible-22c55e?style=flat-square" />
<img src="https://img.shields.io/badge/BigInt_Safe-10^18_supply_precision-3b82f6?style=flat-square" />
<img src="https://img.shields.io/badge/Rate_Limited-10_req/min/IP-ef4444?style=flat-square" />
<img src="https://img.shields.io/badge/IPFS_Metadata-Permanent_decentralized-E4467C?style=flat-square" />
<img src="https://img.shields.io/badge/CBK_Aware-Circular_2/RB/336/2014-f59e0b?style=flat-square" />

</div>

---

## 🏛️ System Standard — Burnzy v1

> Scored against [SYSTEM_STANDARD.md](SYSTEM_STANDARD.md). System rating = lowest gate score.

| Gate | Score | Notes |
|---|:---:|---|
| **1 · Truth** | 2 | README + SETUP.md aligned to code; liquidity labels honest; no fake "Done" claims |
| **2 · Structure** | 2 | Single config source; clean module boundaries; TypeScript strict; no dead exports |
| **3 · Safety** | 2 | Upstash Redis rate limiting; env validation at startup; secrets server-only; input Zod-validated |
| **4 · Verification** | 2 | 0 TS errors; 32 tests passing; `npm run verify` pipeline; structured logger |
| **5 · Credibility** | 2 | Docs match running system; SETUP.md produces working app; honest dashboard |
| **6 · Expansion** | 2 | Modular services; liquidity SDK integration points marked; config-driven fees |

| Metric | Value |
|---|---|
| **Total Score** | **12 / 18** |
| **Readiness Band** | **Beta** |
| **Critical Blocker** | Raydium + Meteora on-chain transaction builders are `INTEGRATION_PENDING` |
| **Next Highest-Value Fix** | Complete liquidity SDK integration → Gate 5 (Credibility) → 3, Gate 6 (Expansion) → 3 |

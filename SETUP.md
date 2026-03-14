# Deployment & Setup Guide

Solana SPL Token Launch Platform — Vercel + Pinata + Phantom

---

## Prerequisites

| Requirement | Notes |
|---|---|
| Node.js ≥ 18 | https://nodejs.org |
| Git | https://git-scm.com |
| Phantom or Solflare wallet | Browser extension |
| Pinata account | Free tier: https://pinata.cloud |
| Vercel account | Free tier: https://vercel.com |

---

## 1. Clone & Install

```bash
git clone <your-repo-url>
cd solana-launcher
npm install
```

---

## 2. Environment Variables

Copy the example file and fill in values:

```bash
cp .env.example .env.local
```

### Required Variables

| Variable | Where to get it |
|---|---|
| `NEXT_PUBLIC_SOLANA_NETWORK` | `devnet` for testing, `mainnet-beta` for production |
| `NEXT_PUBLIC_SOLANA_RPC_URL` | See RPC section below |
| `NEXT_PUBLIC_TREASURY_WALLET` | Your Phantom wallet's public key (base58) |
| `NEXT_PUBLIC_CREATION_FEE_SOL` | Platform fee per launch (e.g. `0.1`) |
| `NEXT_PUBLIC_STORAGE_PROVIDER` | `pinata` (default) |
| `PINATA_JWT` | Pinata dashboard → API Keys → New Key → Admin |

### Optional Variables

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_APP_NAME` | Displayed in browser title + OG tags |
| `NEXT_PUBLIC_APP_URL` | Your production URL (for OG metadata) |
| `NEXT_PUBLIC_PINATA_GATEWAY` | Custom Pinata gateway URL |
| `ADMIN_API_SECRET` | Signs admin API requests (`openssl rand -base64 32`) |

Full annotated list is in `.env.example`.

---

## 3. Get a Pinata JWT

1. Go to https://pinata.cloud → Sign up / Log in
2. Navigate to **API Keys** → click **+ New Key**
3. Select **Admin** permissions
4. Copy the **JWT** (not the API key — the JWT)
5. Paste it as `PINATA_JWT=` in `.env.local`

> The JWT is server-only. It is used in the `/api/upload` route and never exposed to the browser.

---

## 4. Get Your Treasury Wallet Address

1. Open Phantom (or Solflare)
2. Click the wallet name at the top
3. Copy the public key — it looks like `7xKj...bQ3r`
4. Paste as `NEXT_PUBLIC_TREASURY_WALLET=` in `.env.local`

This wallet receives the platform fee on every token launch. It is **also** the only wallet allowed to access the `/admin` treasury dashboard.

---

## 5. RPC Endpoint

The default public RPC endpoints are rate-limited. For production use a paid endpoint:

| Provider | URL | Free tier |
|---|---|---|
| Helius | https://helius.dev | 100k credits/day |
| QuickNode | https://quicknode.com | 10M credits/month |
| Alchemy | https://alchemy.com | 100M CUs/month |

For devnet testing only, the default `https://api.devnet.solana.com` is fine.

---

## 6. Local Development

```bash
npm run dev
```

Open http://localhost:3000.

Switch Phantom/Solflare to **Devnet** and get free test SOL:
- https://faucet.solana.com

---

## 7. Deploy to Vercel

### Option A: GitHub Integration (recommended)

1. Push the repo to GitHub (private is fine)
2. Go to https://vercel.com → **Add New Project**
3. Import the GitHub repo
4. Vercel auto-detects Next.js — no build settings needed
5. In **Environment Variables**, add all required variables from step 2
6. Click **Deploy**

### Option B: Vercel CLI

```bash
npm install -g vercel
vercel login
vercel --prod
```

Follow the prompts. Add env vars when asked, or set them in the Vercel dashboard post-deploy.

---

## 8. Switching to Mainnet

1. Change `NEXT_PUBLIC_SOLANA_NETWORK=mainnet-beta`
2. Change `NEXT_PUBLIC_SOLANA_RPC_URL` to a production RPC endpoint (see step 5)
3. Ensure `NEXT_PUBLIC_TREASURY_WALLET` is a **mainnet** wallet you control
4. Switch Phantom to **Mainnet Beta**
5. Redeploy

> Fee amounts set in `.env.local` denominate in SOL. `0.1` = 0.1 SOL per launch.

---

## 9. Custom Domain

In the Vercel dashboard → project → **Domains** → add your domain.

Then update `NEXT_PUBLIC_APP_URL` to your production domain and redeploy.

---

## 10. Admin Dashboard

The `/admin` route is wallet-gated. Only the wallet matching `NEXT_PUBLIC_TREASURY_WALLET` can view it.

It shows:
- Live treasury SOL balance
- Estimated launch count and revenue
- Direct Solscan link for transaction history

---

## 11. Project Structure (Quick Reference)

```
app/
├── (marketing)/page.tsx     Landing page
├── (dashboard)/
│   ├── dashboard/           Portfolio + quick actions
│   ├── launch/              Token wizard
│   ├── liquidity/           Raydium + Meteora pool finder
│   └── dashboard/
│       ├── burn/            Token burn
│       └── manage/[mint]/   Revoke authority
├── admin/                   Treasury dashboard
└── api/
    ├── upload/              IPFS upload (server-side, Pinata JWT here)
    └── metadata/            Metadata read route

components/
├── launcher/                Multi-step wizard
├── dashboard/               Portfolio, manage, burn UIs
├── liquidity/               Pool finder, price calculator
├── admin/                   Admin treasury client
├── compliance/              Banner + legal pages
└── wallet/                  WalletContextProvider

services/
├── token-launcher/          Mint creation + Metaplex metadata
├── token-burn/              Burn service
├── token-authority/         Revoke mint/freeze
└── liquidity/               Raydium + Meteora pool lookup

lib/
├── config/app-config.ts     Single source of truth for all config
├── solana/portfolio.ts      On-chain portfolio reader
├── rate-limit/              Sliding window rate limiter
└── validation/              Zod schemas
```

---

## 12. Going Further

| Feature | Status | How to implement |
|---|---|---|
| Raydium AMM V4 on-chain | UI complete, SDK pending | See `services/liquidity/liquidity.service.ts` comments |
| Meteora DLMM on-chain | UI complete, SDK pending | See `services/liquidity/liquidity.service.ts` comments |
| Launch history DB | Optional | Add `DATABASE_URL` in `.env.local`, wire to Prisma |
| Email notifications | Optional | Add SendGrid/Resend in `/api/upload` route |
| Analytics | Optional | Uncomment PostHog or Mixpanel vars in `.env.example` |

---

## Support

For questions about this codebase, refer to:
- `README.md` — feature overview, how it works, legal note
- `lib/config/app-config.ts` — all configurable values
- `.env.example` — all environment variables with inline comments

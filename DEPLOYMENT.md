# Deployment

## Overview

The platform deploys as a Next.js application. The recommended production stack:

| Component | Provider |
|---|---|
| Frontend + API Routes | Vercel |
| IPFS Storage | Pinata |
| Database (optional, future) | Supabase postgres |
| RPC Node | Helius, QuickNode, or Alchemy |

---

## Environment Setup

Copy `.env.example` to `.env.local` for local development.

For production (Vercel), set all variables in **Settings → Environment Variables**.

### Required Variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SOLANA_NETWORK` | `devnet` or `mainnet-beta` |
| `NEXT_PUBLIC_SOLANA_RPC_URL` | Full RPC URL (not the public one for production) |
| `NEXT_PUBLIC_TREASURY_WALLET` | Your treasury wallet base58 pubkey |
| `NEXT_PUBLIC_CREATION_FEE_SOL` | Platform fee in SOL |
| `NEXT_PUBLIC_STORAGE_PROVIDER` | `pinata` |
| `PINATA_JWT` | Server-side Pinata JWT (secret) |
| `NEXT_PUBLIC_PINATA_GATEWAY` | Pinata IPFS gateway URL |

---

## Vercel Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

Or connect your GitHub repo on https://vercel.com/new for automatic CI/CD.

### Build Settings (Vercel)

- Framework: Next.js (auto-detected)
- Build Command: `npm run build`
- Output Directory: `.next` (auto-detected)
- Install Command: `npm install`

---

## Production Build (Local Test)

```bash
npm run build
npm run start
```

Visit http://localhost:3000 to test the production build locally.

---

## RPC Configuration

### Devnet (testing)
```env
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.devnet.solana.com
```

The public Devnet RPC is rate-limited. For sustained testing use Helius free tier:
```env
NEXT_PUBLIC_SOLANA_RPC_URL=https://devnet.helius-rpc.com/?api-key=YOUR_KEY
```

### Mainnet-Beta (production)

**Never use the public mainnet RPC for production.** It is severely rate-limited.

Recommended providers:
- **Helius** — https://helius.dev (generous free tier, great reliability)
- **QuickNode** — https://quicknode.com
- **Alchemy** — https://alchemy.com

```env
NEXT_PUBLIC_SOLANA_NETWORK=mainnet-beta
NEXT_PUBLIC_SOLANA_RPC_URL=https://mainnet.helius-rpc.com/?api-key=YOUR_KEY
```

---

## Devnet vs Mainnet Config Strategy

| Config | Devnet | Mainnet |
|---|---|---|
| `NETWORK` | `devnet` | `mainnet-beta` |
| `RPC_URL` | Public devnet or Helius devnet | Helius/QuickNode mainnet |
| `CREATION_FEE_SOL` | `0.1` (test SOL) | Real value (e.g. 0.1–1 SOL) |
| `TREASURY_WALLET` | Test wallet | Hardware wallet (Ledger) |
| Explorer Links | `?cluster=devnet` | No cluster param |

---

## Optional: Database (Supabase)

For launch history, analytics, and future admin features, add Supabase:

1. Create a project at https://supabase.com
2. Add to environment:
   ```env
   DATABASE_URL=postgresql://...
   DIRECT_URL=postgresql://...
   ```
3. Install Prisma: `npm install prisma @prisma/client`
4. Initialize: `npx prisma init`
5. Design your schema in `prisma/schema.prisma`
6. Run migrations: `npx prisma migrate dev`

The prisma folder is already included in the project structure (currently empty).

---

## Checklist Before Going Mainnet

- [ ] Switch `NEXT_PUBLIC_SOLANA_NETWORK` to `mainnet-beta`
- [ ] Configure a production-grade RPC endpoint
- [ ] Set treasury wallet to a hardware wallet pubkey
- [ ] Verify platform fee amount is correct
- [ ] Test IPFS upload with production Pinata JWT
- [ ] Run `npm run type-check` — zero errors
- [ ] Run `npm run build` — successful build
- [ ] Review `SECURITY_NOTES.md`
- [ ] Consult legal counsel regarding jurisdiction and compliance
- [ ] Enable HTTPS (automatic on Vercel)

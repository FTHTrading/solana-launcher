# Solana Launcher — Security Review

**Audit Date:** 2025-07-15  
**Classification:** ⚠️ CONDITIONAL PASS — Blockchain security is solid, web security needs hardening

---

## Summary

The Solana Launcher has a **split security profile:** blockchain interaction security is strong (7/10), following Solana best practices. Web application security has gaps (5/10) — no security headers, in-memory rate limiting, and no image magic byte validation.

---

## 1. Blockchain Security — ✅ SOLID

### 1.1 Key Protection

| Finding | Status | Evidence |
|---|---|---|
| Private keys never requested | ✅ | Wallet Adapter handles all signing |
| Private keys never stored | ✅ | No key storage code exists |
| `signTransaction` used correctly | ✅ | `sendRawTransaction` after wallet sign |
| Ephemeral mint keypair | ✅ | Generated fresh, used once, discarded |

### 1.2 Transaction Safety

| Finding | Status | Evidence |
|---|---|---|
| Transaction transparency | ✅ | All instructions visible pre-sign |
| `skipPreflight: false` | ✅ | Catches simulation failures |
| Blockhash confirmation | ✅ | Uses `lastValidBlockHeight` pattern |
| Error verification post-confirm | ✅ | Checks `result.value.err` |
| Fee atomicity | ✅ | Fee in same tx as mint operations |
| Re-broadcast safety | ✅ | Retries with backoff, checks for existing tx |

### 1.3 Authority Management

| Finding | Status | Evidence |
|---|---|---|
| Correct authority assignment | ✅ | User wallet gets mint + freeze authority |
| Revocation is permanent | ✅ | Sets to `null`, well-documented |
| Irreversibility warnings | ✅ | Plain-language user warnings |

### 1.4 SECURITY_NOTES.md Quality

The security documentation (`SECURITY_NOTES.md`) is **comprehensive and accurate**, covering:
- Wallet integration security model
- Transaction confirmation best practices
- Fee wallet handling (hardware wallet recommendation)
- Environment variable hygiene
- Input validation approach
- Metadata upload risks
- Phishing token awareness
- User education principles
- Dependency security

**This document exceeds the quality standard for most Web3 projects at this stage.**

---

## 2. Web Application Security — ⚠️ GAPS

### LAUNCH-SEC-001 — No Security Headers (HIGH)

**Location:** No middleware file exists

**Missing headers:**
| Header | Purpose |
|---|---|
| `Content-Security-Policy` | XSS prevention |
| `X-Frame-Options: DENY` | Clickjacking prevention |
| `X-Content-Type-Options: nosniff` | MIME sniffing prevention |
| `Referrer-Policy` | Privacy |
| `Permissions-Policy` | Feature restrictions |
| `Strict-Transport-Security` | HTTPS enforcement |

### LAUNCH-SEC-002 — In-Memory Rate Limiter (HIGH)

**Location:** `lib/rate-limit/rate-limit.ts`

Same in-memory `Map` pattern as donk-ai. Resets on server restart. Provides zero protection in production.

**Note:** The solana-launcher only has 2 API routes (upload and metadata), limiting the attack surface compared to donk-ai's 6 routes. However, these routes talk to Pinata (paid service), so unlimited uploads could incur costs.

### LAUNCH-SEC-003 — No Magic Byte Validation (MEDIUM)

**Location:** `app/api/upload/route.ts`

The upload route checks MIME type from the client-provided `Content-Type` header and file extension. A malicious actor could upload an HTML file with an image extension to attempt stored XSS (though IPFS gateways typically prevent this).

**Remediation:** Use `file-type` package to validate magic bytes server-side.

### LAUNCH-SEC-004 — No CORS (MEDIUM)

**Location:** API routes  
**Risk:** Cross-origin requests to `/api/upload` and `/api/metadata` are unrestricted.

### LAUNCH-SEC-005 — Treasury Wallet Exposure (INFORMATIONAL)

`NEXT_PUBLIC_TREASURY_WALLET` is intentionally public — this is correct. It's a *public key* and must be visible for transaction construction. The security posture on this is explicitly documented in `SECURITY_NOTES.md`.

---

## 3. Admin Authentication

### ✅ Wallet-Based Auth — GOOD

The admin panel at `/admin` uses wallet-based authentication:

```typescript
const isAuthorized =
  connected &&
  publicKey &&
  TREASURY_WALLET &&
  publicKey.toBase58() === TREASURY_WALLET;
```

This is a strong pattern:
- Only the treasury wallet holder can access admin
- No passwords to breach
- Authentication is cryptographic (wallet signature)
- Handles missing wallet, wrong wallet, and missing env var gracefully

**Note:** This is client-side only. An API-level admin check would also be needed if admin API routes are added in the future.

---

## 4. Dependency Risk

| Package | Version | Risk Notes |
|---|---|---|
| `@solana/web3.js` | `^1.95.4` | Stable, well-maintained |
| `@solana/spl-token` | `^0.4.9` | 0.x version — breaking changes possible |
| `@metaplex-foundation/mpl-token-metadata` | `^3.2.1` | Actively maintained |
| `@solana/wallet-adapter-*` | `^0.15.x` | 0.x — but widely used |
| `next` | `14.2.16` | Not latest but no known critical CVEs |
| `react` | `^18` | Stable |

**Recommendation:** Run `npm audit` regularly. Pin `@solana/spl-token` to avoid unexpected breaking changes.

---

## 5. Threat Model

| Threat | Risk | Mitigation |
|---|---|---|
| Token impersonation (fake USDC) | Medium | ComplianceBanner warns, but no name blacklist |
| Unlimited API uploads | Medium | Rate limiter ineffective (in-memory) |
| XSS via uploaded content | Low | IPFS gateways serve as separate origin |
| Transaction manipulation | Very Low | Wallet shows exact instructions before signing |
| Rug pull facilitation | Medium | Platform provides burn/revoke tools (good); no warnings about misuse |
| Treasury key compromise | Low | Hardware wallet recommended in SECURITY_NOTES |
| RPC manipulation | Low | Uses `skipPreflight: false` for simulation validation |

---

## Security Maturity Rating

| Domain | Rating |
|---|---|
| Blockchain auth | ✅ Strong (wallet-based) |
| Web auth | ⚠️ Client-side admin only |
| Transport security | ⚠️ No headers |
| Input validation | ✅ Zod schemas, comprehensive |
| Smart contract risk | ✅ None (uses system programs only) |
| Rate limiting | ❌ Ineffective |
| Secret management | ✅ Server-only secrets properly separated |
| Documentation | ✅ Above average (SECURITY_NOTES.md) |
| Dependency security | ⚠️ Unknown (no audit evidence) |

**Overall Security Posture:** Beta — Solid blockchain fundamentals, needs web hardening for production.

---

*End of Security Review — Solana Launcher*

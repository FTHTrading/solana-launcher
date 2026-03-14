# Security Notes

This document covers security considerations relevant to operating a Solana SPL token launcher platform.

---

## Wallet Integration

- **Never request private keys.** The Wallet Adapter (`@solana/wallet-adapter-react`) connects to the user's browser wallet. Private keys never leave the wallet and are never accessible to application code.
- **Only request `signTransaction` and `signAllTransactions`.** Do not use `sendTransaction` directly from the adapter unless the wallet requires it — prefer `sendRawTransaction` after `signTransaction` to maintain full visibility into what is being broadcast.
- **Transaction transparency.** Every transaction must be human-readable in the UI before the user signs. Users must see: what accounts are being created, what tokens are being minted, and exactly what fees are being paid.

---

## Transaction Confirmation

- Always use `confirmTransaction` with `blockhash` and `lastValidBlockHeight` to avoid false confirmation states (the old `subscribe` pattern can be unreliable).
- Use `commitment: 'confirmed'` for both `Connection` initialization and confirmation. `'finalized'` provides stronger safety but is slower.
- Always check `result.value.err` after confirmation — a non-null value means the transaction failed on-chain even if it was included in a block.

---

## Fee Wallet Handling

- The treasury wallet address (`NEXT_PUBLIC_TREASURY_WALLET`) is exposed to the browser as a public key — this is intentional and safe.
- The corresponding treasury wallet private key must never be stored in the application, environment variables, or any server code.
- Treasury wallet should use a hardware wallet (Ledger) with a dedicated key that is not used for other purposes.
- Monitor the treasury wallet regularly for unexpected incoming transactions or fee anomalies.

---

## Environment Variable Hygiene

- `.env.local` must never be committed to version control. It is in `.gitignore`.
- Server-only secrets (e.g., `PINATA_JWT`) must not be prefixed with `NEXT_PUBLIC_` — they are only accessible server-side.
- Rotate API keys regularly. Pinata JWTs can be scoped with limited permissions.
- `ADMIN_API_SECRET` must be a cryptographically random value (32+ bytes). Generate with: `openssl rand -base64 32`.

---

## Backend Input Validation

- All user-supplied data (token name, symbol, description, URLs) is validated with Zod schemas in `lib/validation/token-schemas.ts`.
- Validation runs both client-side (wizard) and server-side (API routes).
- File uploads are validated for MIME type and size server-side in `/api/upload`.
- Malicious file types (SVG with scripts, HTML disguised as images) must be rejected. MIME type checks are not sufficient alone — consider using `file-type` package server-side for magic byte validation in production.

---

## Metadata Upload Risks

- Users can upload arbitrary images. Do not serve uploaded images from your own domain with `Content-Type: text/html`. Use IPFS gateways directly.
- Token descriptions are stored as-is in metadata JSON. If you render descriptions in your UI, ensure they are properly escaped to prevent XSS (React escapes by default — do not use `dangerouslySetInnerHTML`).
- Do not trust IPFS URIs from external sources as safe content — for user-submitted URIs (e.g., custom metadata URI input), validate the format before rendering.

---

## Phishing and Malicious Token Warning Considerations

- Token launchers are frequently exploited to create phishing tokens (USDC look-alikes, fake SOL tokens, etc.)
- Consider adding a warning in the UI that encourages users to audit any token before interacting with it
- If implementing a public launch feed, do not imply endorsement of any listed token
- Platform should not be marketed in ways that could be perceived as an investment recommendation

---

## User Education

Non-technical users signing blockchain transactions may not understand:
- That transactions are irreversible
- What "mint authority" means
- Why they are paying fees
- What they are authorizing in their wallet

Every transaction flow in this platform includes a plain-language summary of what the user is signing, why, and what the resulting outcome is. This is not optional — it is a core product principle that reduces support requests and protects users from mistakes.

---

## Dependency Security

- Run `npm audit` regularly and address high/critical severity issues
- Pin major versions of Solana/SPL packages — breaking changes are common
- `@coral-xyz/anchor` and `@metaplex-foundation` packages should be kept up to date for security patches
- Lock file (`package-lock.json`) must be committed to version control

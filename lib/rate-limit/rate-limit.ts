// =============================================
// SIMPLE IN-MEMORY RATE LIMITER
//
// Keyed by IP address (or any string).
// Suitable for serverless (per-instance).
// For multi-region, replace with Upstash Redis.
// =============================================

interface RateLimitEntry {
  count: number;
  windowStart: number; // epoch ms
}

const store = new Map<string, RateLimitEntry>();

export interface RateLimitOptions {
  maxRequests: number;
  windowMs: number; // sliding window in milliseconds
}

export function isRateLimited(key: string, opts: RateLimitOptions): boolean {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now - entry.windowStart > opts.windowMs) {
    // Start fresh window
    store.set(key, { count: 1, windowStart: now });
    return false;
  }

  if (entry.count >= opts.maxRequests) {
    return true;
  }

  entry.count += 1;
  return false;
}

/**
 * Extract a usable key from Next.js request headers.
 * Falls back to a fixed key if no IP is available (dev mode).
 */
export function getIpKey(headers: Headers): string {
  return (
    headers.get('x-real-ip') ??
    headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    'unknown'
  );
}

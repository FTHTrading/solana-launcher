// =============================================
// PRODUCTION RATE LIMITER
//
// Upstash Redis for distributed rate limiting.
// Falls back to in-memory when UPSTASH_REDIS_REST_URL
// is not set (local dev / CI).
//
// Keyed by IP address (or any string).
// =============================================
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

interface RateLimitOptions {
  maxRequests: number;
  windowMs: number; // sliding window in milliseconds
}

// ── In-Memory Fallback ───────────────────────────────────────

interface RateLimitEntry {
  count: number;
  windowStart: number;
}

const memoryStore = new Map<string, RateLimitEntry>();

function isMemoryLimited(key: string, opts: RateLimitOptions): boolean {
  const now = Date.now();
  const entry = memoryStore.get(key);

  if (!entry || now - entry.windowStart > opts.windowMs) {
    memoryStore.set(key, { count: 1, windowStart: now });
    return false;
  }

  if (entry.count >= opts.maxRequests) {
    return true;
  }

  entry.count += 1;
  return false;
}

// ── Upstash Redis ─────────────────────────────────────────────

let _redis: Redis | null = null;
const _limiters = new Map<string, Ratelimit>();

function getRedis(): Redis | null {
  if (_redis) return _redis;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  _redis = new Redis({ url, token });
  return _redis;
}

function getUpstashLimiter(prefix: string, opts: RateLimitOptions): Ratelimit | null {
  const redis = getRedis();
  if (!redis) return null;

  const cacheKey = `${prefix}:${opts.maxRequests}:${opts.windowMs}`;
  let limiter = _limiters.get(cacheKey);
  if (!limiter) {
    const windowSec = Math.max(1, Math.ceil(opts.windowMs / 1000));
    const duration = `${windowSec} s` as Parameters<typeof Ratelimit.slidingWindow>[1];
    limiter = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(opts.maxRequests, duration),
      prefix: `rl:${prefix}`,
      analytics: false,
    });
    _limiters.set(cacheKey, limiter);
  }
  return limiter;
}

// ── Public API ────────────────────────────────────────────────

/**
 * Returns true if the key is over limit (should be blocked).
 * Uses Upstash Redis in production, falls back to in-memory in dev.
 */
export async function isRateLimited(key: string, opts: RateLimitOptions): Promise<boolean> {
  const prefix = key.split(':')[0] || 'api';
  const upstash = getUpstashLimiter(prefix, opts);

  if (upstash) {
    try {
      const { success } = await upstash.limit(key);
      return !success;
    } catch (err) {
      console.warn('[rate-limit] Upstash error, falling back to memory:', err);
    }
  }

  return isMemoryLimited(key, opts);
}

/**
 * Synchronous version — in-memory only. For legacy callers.
 * @deprecated Prefer async isRateLimited()
 */
export function isRateLimitedSync(key: string, opts: RateLimitOptions): boolean {
  return isMemoryLimited(key, opts);
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

/** Check whether Upstash Redis is configured */
export function isDistributedRateLimitEnabled(): boolean {
  return !!(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);
}

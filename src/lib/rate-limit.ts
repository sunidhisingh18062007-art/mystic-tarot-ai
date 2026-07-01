/**
 * Simple in-memory rate limiter.
 * Not suitable for multi-instance deployments — use Redis-based for production.
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

// Clean up expired entries every 60 seconds
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of store.entries()) {
    if (now > entry.resetAt) {
      store.delete(key);
    }
  }
}, 60_000);

interface RateLimitConfig {
  /** Time window in seconds */
  windowMs?: number;
  /** Maximum requests per window */
  max?: number;
}

interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetAt: number;
}

export function rateLimit(
  key: string,
  config: RateLimitConfig = {}
): RateLimitResult {
  const { windowMs = 60_000, max = 10 } = config;
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    // First request or window expired
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { success: true, remaining: max - 1, resetAt: now + windowMs };
  }

  if (entry.count >= max) {
    return { success: false, remaining: 0, resetAt: entry.resetAt };
  }

  entry.count++;
  return { success: true, remaining: max - entry.count, resetAt: entry.resetAt };
}

/**
 * Create a configured rate limiter for a specific route.
 */
export function createRateLimiter(config: RateLimitConfig = {}) {
  return (key: string) => rateLimit(key, config);
}

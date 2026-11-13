import 'server-only';
import { ApiError } from './errors';

/**
 * Best-effort in-memory limiter (per server instance).
 * For serverless / multi-instance production use Upstash Redis or similar.
 */
const hits = new Map();

export function getClientIp(req) {
  const fwd = req.headers.get('x-forwarded-for');
  return (fwd ? fwd.split(',')[0].trim() : req.headers.get('x-real-ip')) || 'unknown';
}

export function enforceRateLimit(req, bucket, limit, windowMs) {
  const key = `${bucket}:${getClientIp(req)}`;
  const now = Date.now();
  const entry = hits.get(key);
  if (!entry || entry.reset < now) {
    hits.set(key, { count: 1, reset: now + windowMs });
  } else {
    entry.count += 1;
    if (entry.count > limit) throw new ApiError(429, 'Too many requests. Please try again in a few minutes.');
  }
  if (hits.size > 5000) for (const [k, v] of hits) if (v.reset < now) hits.delete(k);
}

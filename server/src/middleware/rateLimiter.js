/**
 * Minimal in-memory rate limiter for the public contact endpoint —
 * no extra dependency required. Limits each IP to 5 submissions per
 * 10 minutes. For multi-instance deployments, swap this for a
 * Redis-backed limiter (e.g. rate-limiter-flexible) using the same interface.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;

const hits = new Map();

export function contactRateLimiter(req, res, next) {
  const key = req.ip || "unknown";
  const now = Date.now();
  const entry = hits.get(key);

  if (!entry || now - entry.start > WINDOW_MS) {
    hits.set(key, { start: now, count: 1 });
    return next();
  }

  if (entry.count >= MAX_REQUESTS) {
    return res.status(429).json({
      ok: false,
      message: "Too many submissions. Please try again later.",
    });
  }

  entry.count += 1;
  return next();
}

// Periodic cleanup so the map doesn't grow unbounded.
setInterval(
  () => {
    const now = Date.now();
    for (const [key, entry] of hits.entries()) {
      if (now - entry.start > WINDOW_MS) hits.delete(key);
    }
  },
  60 * 1000,
).unref();

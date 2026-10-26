---
title: Redis is not a caching strategy: TTL jitter, stampede control and cache keys
topic: backend/caching
tags: [redis, caching, performance, reliability, backend]
source: Backend-engineering reel (Aug 2026) plus standard practice
source_type: social
confidence: high
date: 2026-10-26
---

# Cache strategy beyond "add Redis"

## The point in one line
A cache that expires all its keys at the same moment causes a thundering-herd on the database; add jitter to TTLs, coalesce recomputation, and key every entry on tenant and authorization state.

## Rules
- **TTL jitter:** set `ttl = base + random(-j, +j)` (for a 12 h base, a few seconds to a couple of minutes of jitter) so keys warmed together do not expire together.
- **Stampede control:** when a hot key expires, let one request recompute while others serve the stale value or wait on a short lock (single-flight, "lock lease" of a few seconds).
- **Negative caching:** cache "not found" briefly so repeated misses do not hit the database.
- **Warm the hot set** on deploy or in the background rather than on the first user.
- **Key design:** include tenant id and anything that changes the response (locale, role, feature flags). Never cache a personalized response under a shared key.
- **HTTP layer:** `Cache-Control: private, no-store` for personalized responses; `Vary` on the headers that change output; CDN cache keys must include auth state.
- **Invalidate on write** for data users expect to see immediately; rely on TTL only for data that may lag.
- **Measure:** hit ratio, p99 latency with and without cache, database load during expiry windows.

## Caveats
- Jitter does not fix an undersized database; it only spreads load.
- Stale-while-revalidate is acceptable for catalog data, not for balances or permissions.

## Related
- skills/security-review (availability section; cache keys and tenant isolation)

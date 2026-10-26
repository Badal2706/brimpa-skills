---
title: What a free Cloudflare account can replace for a small site or app
topic: infra/cloudflare
tags: [cloudflare, hosting, free-tier, dns, workers, storage, security, small-business]
source: Social-media list of 25 free Cloudflare capabilities (Sept 2026), mapped to product names and checked against Cloudflare's free plan as of Oct 2026
source_type: social
confidence: medium
date: 2026-10-26
---

# Free Cloudflare account: capability map

## The point in one line
One free Cloudflare account covers hosting, DNS, TLS, CDN, serverless, storage, a SQL database, bot and DDoS protection, an auth gate for admin pages, cron jobs and analytics, which is enough to run most small client sites and APIs at zero infrastructure cost.

## Capability -> product (free plan as of Oct 2026; limits change, check the pricing page before promising a client)
| Need | Cloudflare product | Notes |
|---|---|---|
| Host a static site or blog | Pages | Git-connected builds, custom domains, free TLS |
| Run an API or serverless functions | Workers | Generous daily request allowance on free; CPU-time limits per request |
| Cron jobs | Workers Cron Triggers | Scheduled Workers |
| Key-value storage | Workers KV | Eventually consistent; good for config, sessions, feature flags |
| SQL database | D1 | SQLite-based; row-read/write daily limits on free |
| Store files, backups, images | R2 | S3-compatible object storage; free egress, monthly storage allowance |
| Resize/optimise images | Images (transformations) | Paid beyond a small allowance; Pages can also serve pre-optimised assets |
| Your own domain | Registrar + DNS | At-cost registration; DNS is free and fast |
| Free SSL/TLS | Universal SSL | Automatic certificates at the edge |
| Speed up worldwide | CDN + caching | Cache rules, tiered cache |
| DDoS protection, block bots | DDoS protection, Bot Fight Mode, WAF free managed rules | WAF custom rules limited on free |
| CAPTCHA on forms | Turnstile | Free, privacy-friendly, replaces reCAPTCHA |
| Lock an admin page behind login | Zero Trust Access | Free for a small number of users; SSO/OTP in front of any path |
| Expose a home server safely | Cloudflare Tunnel | No open inbound ports |
| Email for your domain, forward to Gmail | Email Routing | Receive/forward only; sending needs a provider |
| Receive webhooks | Workers | Verify signatures (see security-review skill) |
| Track traffic | Web Analytics | Privacy-first, no cookies |

## Caveats
- Free tiers have daily request, CPU and storage caps; a popular site can exceed Workers or D1 limits. Set budget alerts.
- Email Routing cannot send mail; pair with a transactional provider.
- Zero Trust free seats are limited (historically 50 users).

## Related
- skills/security-review (headers, rate limiting at the edge, webhook verification)
- skills/seo-geo-audit (performance and caching)

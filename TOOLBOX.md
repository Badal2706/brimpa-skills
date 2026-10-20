# Toolbox: open-source and free tools worth reaching for

Pointers collected alongside the skills. None are required by any skill. Check each project's license before shipping it inside a paid or closed product (AGPL in particular). Star counts and free tiers change; verified only as "existed and was active" in 2026.

## Build and infra

| Tool | What it is good for | Notes |
|---|---|---|
| Cloudflare free tier | Static hosting (Pages), Workers (serverless + cron), KV, D1 (SQL), R2 (object storage), Images resizing, DNS, SSL, CDN caching, DDoS and bot protection, Turnstile (CAPTCHA), Zero Trust Access (lock an admin page behind login), Tunnels (expose a home server safely), email routing to Gmail, Web Analytics | A single free account covers hosting, API, storage, auth gate and analytics for most small client sites |
| NVIDIA hosted inference (build.nvidia.com) | OpenAI-compatible endpoint for open models during prototyping | `base_url = https://integrate.api.nvidia.com/v1`, key from the site; free credits on signup with a per-minute rate limit. For production AI features default to the Claude API |
| Redis + cache strategy | Caching is not just "add Redis": add TTL jitter (randomize expiry by a few percent) so thousands of keys do not expire in the same second and stampede the database; warm hot keys; cache negative results briefly | Covered in security-review's availability section |

## Data, documents, scraping

| Tool | Good for |
|---|---|
| Scrapling | Python scraping with adaptive selectors, sessions, spiders, MCP server (see the web-scraping skill) |
| Crawl4AI | Turning sites into LLM-ready markdown; handles JS-heavy pages |
| Maxun | No-code point-and-click scraper that outputs APIs/spreadsheets |
| Browser Use | Agentic browsing: fill forms, navigate, extract on command |
| PaddleOCR | OCR of scans/PDFs into structured data (Apache-2.0) |
| Stirling PDF | Self-hosted PDF toolkit: merge, split, sign, OCR, redact |

## Marketing, CRM, content

| Tool | Good for |
|---|---|
| open-seo (every-app/open-seo) | Self-hosted keyword research, rank tracking, site audits, AI visibility |
| Twenty (twentyhq/twenty) | Open-source CRM |
| trycompai/crm | Agent-first open-source CRM |
| Postiz | Open-source social scheduler (works with agent-driven posting) |
| Pipecat | Open-source voice-agent framework; embeddable voice/chat widget |
| Kokoro TTS | Small, good open-source text-to-speech (voiceovers for the launch-video skill) |
| Krea | Image generation / enhancement for reference boards |

## UI testing and polish

| Tool | Good for |
|---|---|
| Boneyard | Generates pixel-accurate skeleton loading screens from your running UI |
| Mobile View (Chrome extension) | Preview a live site on several phone/tablet frames next to desktop |
| Rich Results Test, PageSpeed Insights, Search Console, Bing Webmaster Tools | Free validation for the seo-geo-audit skill |
| Avatar Lab (bible-strong) | Animated SVG mascots with React/web exports (AGPL-3.0; see brand-identity) |

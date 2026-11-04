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
| open-seo (every-app/open-seo) | Self-hosted keyword research, rank tracking, site audits, AI visibility. MIT, but every data tool needs a DataForSEO key (new accounts get $1, minimum top-up $50) or its $10/month hosted plan; AI prompt data is US-English only. Its methods are in seo-geo-audit's `search-console-and-tools.md`; the app is not pinned |
| `geo` audit CLI (Auriti-Labs/geo-optimizer-skill, pinned under `upstream/`) | Free, no-key AI-readiness audit: `uvx --from geo-optimizer-skill geo audit --url https://site --no-plugins`. Use its checks (snippet controls, canonicals, dates, crawler access, CDN challenge probe); ignore its 0-100 score and never run `geo fix --apply` (it writes FAQPage with invented answers and robots groups that drop existing Disallows) |
| mcp-gsc (AminForou/mcp-gsc, pinned under `upstream/`) | Free Search Console MCP server (`uvx mcp-search-console`; Google Cloud project + OAuth or service account). Leave `GSC_ALLOW_DESTRUCTIVE` unset. Procedures in seo-geo-audit's `search-console-and-tools.md` |
| treg.to | One token in front of 124 data providers for people search and email verification from an agent; pay per success, misses free, $1 to start. Read `knowledge/marketing/lead-enrichment-tools.md` (DPDP, TRAI and spam limits) before using it from India |
| Hyperswitch (juspay/hyperswitch) | Self-hostable payment orchestration: route across gateways, smart retries, PCI vault, cost reports, reconciliation. Apache-2.0, Rust; needs router + dashboard + Postgres + Redis, so not for the shared 1 GB droplet. For multi-gateway products only; a single clinic checkout uses one gateway directly. Notes: `knowledge/integrations/payments-orchestration-hyperswitch.md` |
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
| logo-design tools (kaankiziltug/logo-design-skill, pinned under `upstream/`) | `svg_audit.py`, `preview_sheet.py`, `export_variants.py`, `render_png.py`, `concept_sheet.py`, `presentation_board.py`: stdlib Python; PNG/ICO need one renderer (Edge or Chrome headless works on Windows). Run them from the pinned copy as described in brand-identity's `logo-construction.md`; never copy its 1,432 third-party SVG logos anywhere |
| unslop (heydamir/unslop, pinned under `upstream/`) | The original de-slop skill (CC BY 4.0); its `snapshot.mjs` saves a live page as one self-contained HTML plus a screenshot (Playwright; set `CHROME_PATH` on Windows) and `story.mjs` renders the 10-second "unslopping" square video (ffmpeg). Use the snapshot on client-owned sites only; our merged rules are in web-design and ui-ux |

## Video and motion

| Tool | Good for | Notes |
|---|---|---|
| NullMotion (blixvip/NullMotion) | Plays a finished motion ad above black-and-white per-section drafts and exports the breakdown as MP4 | Node 22, Chrome/Edge, MIT; the showcase clips are third-party ads, not MIT, so it is linked, not pinned. The draft-pass and breakdown-cut method is merged into launch-video |
| OpenMontage (calesthio/OpenMontage) | Agent-run video pipelines (explainer, screen demo, documentary montage) over Piper, Remotion, HyperFrames, FFmpeg and many paid generation APIs | **AGPL-3.0: reference only, never copy into this repo; offering it as a hosted service triggers the source-offer clause.** Remotion is free only for individuals and companies of up to 3 people (verify at remotion.dev). Take gsap, three.js and HyperFrames skills from their originals, not from its vendored copies |
| Open Generative AI (Anil-matcha/Open-Generative-AI; "Open-Higgsfield-AI" is a fork) | Self-hosted UI for AI image and video generation across many models | MIT, but it drives the paid MuAPI; "unlimited free videos" in the reels is false |

## Agent tooling and memory

| Tool | Good for | Notes |
|---|---|---|
| claude-mem (thedotmack/claude-mem) | Claude Code plugin that summarises every tool call into local SQLite/Chroma memory and injects it next session | Apache-2.0 open core; telemetry on by default; the observer model sees tool output, so exclude client repos. Not installed here; `knowledge/dev-tools/claude-code-memory.md` has the settings if that changes |

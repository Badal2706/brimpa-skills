---
title: Open-source and free tools worth reaching for (web, data, marketing, UI testing)
topic: dev-tools/catalog
tags: [tools, open-source, scraping, ocr, pdf, crm, seo, tts, ui-testing, mascot, ui-components, svg-backgrounds, public-apis, pentest, fine-tuning, whatsapp]
source: Collected from social-media tool roundups (2026) and verified to exist; licences noted where known
source_type: social
confidence: medium
date: 2026-10-26
---

# Tool catalog

Check each project's licence before shipping it inside a paid or closed product (AGPL in particular). Free tiers change.

## Data, documents, scraping
| Tool | Good for | Licence |
|---|---|---|
| Scrapling | Python scraping with adaptive selectors, sessions, spiders, MCP server (see skills/web-scraping) | BSD-3 |
| Crawl4AI | Sites to LLM-ready markdown; handles JS-heavy pages | see repo |
| Maxun | No-code point-and-click scraper that outputs APIs/spreadsheets | see repo |
| Browser Use | Agentic browsing: fill forms, navigate, extract | see repo |
| PaddleOCR | OCR of scans and PDFs into structured data | Apache-2.0 |
| Stirling PDF | Self-hosted PDF toolkit: merge, split, sign, OCR, redact | see repo |

## Marketing, CRM, content
| Tool | Good for |
|---|---|
| open-seo (every-app/open-seo) | Self-hosted keyword research, rank tracking, audits, AI visibility |
| Twenty (twentyhq/twenty) | Open-source CRM |
| trycompai/crm | Agent-first open-source CRM |
| Postiz | Open-source social scheduler |
| Pipecat | Voice-agent framework; embeddable voice/chat widget |
| Kokoro TTS | Small, good open-source text-to-speech (voiceovers for skills/launch-video) |
| Krea | Image generation/enhancement for reference boards |
| Evolution Go (evolution-foundation/evolution-go) | Self-hosted WhatsApp gateway (Go, whatsmeow). Unofficial protocol: ToS and ban risk, licence activation with heartbeats, notice clause. Internal or prototype use on a spare number only; client numbers use the official Cloud API. See integrations/whatsapp-api-options.md |
| linkgap.io, AnswerThePublic, GMBspy | Free backlink-gap report, question research, competitor GBP categories; see seo/on-page-quick-checklist.md |

## UI, testing and polish
| Tool | Good for |
|---|---|
| Boneyard | Generates skeleton loading screens from a running UI |
| Mobile View (Chrome extension) | Preview a live site on several phone/tablet frames beside desktop |
| Rich Results Test, PageSpeed Insights, Search Console, Bing Webmaster Tools | Free validation for skills/seo-geo-audit |
| Avatar Lab (bible-strong) | Animated SVG mascots with React/web exports (AGPL-3.0; see brand-identity mascot notes). Brimpa's own mascot is procedural three.js instead (method in the mascot-3d skill) |
| HyperFrames | HTML-rendered video (an alternative engine for skills/launch-video when its skills are installed) |

## UI components, motion and backgrounds (added 2026-10-30 from two Aug 2026 reels; checked on GitHub API / sites)
| Tool | Good for | Licence / cost |
|---|---|---|
| Watermelon UI (ui.watermelon.sh) | 600+ copy-paste landing-page/UI components ("built for designers") | Open source, free (per site) |
| Motion Primitives (ibelick/motion-primitives) | Animated React components (text effects, transitions) to copy-paste | MIT, ~6.9k stars |
| Haikei (haikei.app) | Generates unique SVG backgrounds: blobs, waves, gradients, layered shapes | Free web app, no signup for basic use |
| 21st.dev | Community React/Tailwind component registry; its MCP server brings search/generation into Claude Code (see dev-tools/agent-skills-ecosystem.md) | Free browsing; MCP needs an account |
| Manus (manus.im) | Hosted autonomous agent that builds apps/sites from a prompt | Paid tiers about $20-$200/month; free-tier status unclear. Meta's ~$2B acquisition (Dec 2025) was blocked by China in Apr 2026 and unwound; now independent. Not open source; client code and data go to a third party |

Use these as raw material inside a direction from skills/web-design, not as the design; copy-paste component kits are a common source of the tells in web/ai-slop-design-tells.md.

## Data sources for prototypes
| Tool | Good for | Licence |
|---|---|---|
| public-apis (public-apis/public-apis) | Curated list of free APIs by category (weather, finance, crypto, news, sports, movies, NASA, government data), with auth/HTTPS/CORS columns | MIT list, ~493k stars (2026-10-30) |
Check each API's own terms, rate limits and whether it is still alive before building on it; many listed APIs are hobby projects or dead links, and some need keys.

## Security and AI
| Tool | Good for | Licence |
|---|---|---|
| Strix (usestrix/strix) | AI pentest agents against a running staging app; see security/ai-security-scanners.md | Apache-2.0 |
| Soup (MakazhanAlpamys/Soup) | One-YAML LoRA fine-tuning; layer streaming fits 8B in ~3.3 GB VRAM; see ai/soup-fine-tuning-4gb-gpu.md | Apache-2.0 |

### What the reels got wrong
- "Manus: no coding needed, it just spits out backend apps": it generates code you still have to review, secure and host; it is a paid hosted agent, not a library.
- "Haikei is free to sign up": basic use needs no signup at all (per its site).
- public-apis "4,60,000 stars": about 4.93 lakh now; "everything free" is not true of every listed API.

## Video, motion and AI media (added 2026-11-04; checked on GitHub and the projects' own pages)
| Tool | Good for | Licence / catch |
|---|---|---|
| Open Generative AI (Anil-matcha/Open-Generative-AI; the viral "Open-Higgsfield-AI" is the Autom8AI fork of it) | A self-hosted web UI for AI image and video generation across many models (Flux, Kling, Veo, Sora, Seedance) in one studio | MIT, about 32k stars, active (Nov 2026). **Not free to run:** it is a front end for the MuAPI paid API (the README sells a $49/month white-label plan); the reel's "unlimited videos absolutely free" is false. Useful only if you already pay for generation |
| NullMotion (blixvip/NullMotion) | Studying how a motion-graphics ad is built: the finished film on top, one greyscale draft per section underneath, exported as one MP4 | MIT for the code; its showcase clips are other people's ads. Node 22, no npm install. The method is merged into launch-video |
| OpenMontage (calesthio/OpenMontage) | Agent-run video pipelines (explainer, screen demo, documentary montage) over Piper TTS, Remotion or HyperFrames, FFmpeg and many paid generation APIs | **AGPL-3.0**: read, never copy into an MIT repo; running a modified copy as a service for clients triggers the source-offer clause. Many of its skills are vendored copies of gsap-skills, threejs-skills and HyperFrames |
| claude-mem (thedotmack/claude-mem) | Persistent memory for Claude Code: every tool call summarised into local SQLite/Chroma and injected next session | Apache-2.0 open core; telemetry on by default; the observer model sees tool output, so exclude client repos. See dev-tools/claude-code-memory.md; not installed here yet |
| treg.to | One token in front of 124 data providers (people search, email find and verify) for agents; pay per success, misses free | Prepaid balance, $1 free; see marketing/lead-enrichment-tools.md for the DPDP and spam limits before using it from India |

## Infra and AI
See knowledge/infra/cloudflare-free-tier.md and knowledge/ai/free-inference-endpoints.md.

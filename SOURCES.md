# Sources: what was merged, what was used as-is, what was dropped

Compiled 2026-10-20. "Merged" means the content was read, deduplicated against other sources and rewritten into one or more skills here. "Linked" means the upstream skill is used as-is via its own installer and only a wrapper lives here. "Dropped" means nothing from it was kept, with the reason.

## Repositories

| Source | License | Treatment | Lands in |
|---|---|---|---|
| [cloudflare/security-audit-skill](https://github.com/cloudflare/security-audit-skill) | MIT | **Merged**: methodology (guidance vs full-audit, phases, verdicts, severity anchors, anti-patterns) and the per-category checks, rewritten as a defensive checklist | security-review, llm-app-security |
| [usestrix/strix](https://github.com/usestrix/strix) | Apache-2.0 | **Merged** the tool-independent knowledge only: tester inputs, impact ranking, coverage honesty, fix-by-class mapping, severity calibration, counter-evidence, LLM/agentic security notes. The 9 published skills are wrappers around the Strix CLI/cloud and were **not** copied | security-review, llm-app-security |
| [anthropics/skills](https://github.com/anthropics/skills) | Apache-2.0 | **Merged** frontend-design principles; **used as-is**: the Agent Skills spec/format and the skill-creator conventions that shaped this repo; brand-guidelines used as a pattern | web-design, ui-ux, brand-identity, repo layout |
| [pbakaus/impeccable](https://github.com/pbakaus/impeccable) | Apache-2.0 | **Merged**: modes (persuade/operate/read), craft floor, critique rubric, audit dimensions, typography/color/layout/motion rules, harden/onboard/adapt playbooks, the 61 detector rule names as a self-lint list. The CLI binary, browser extension, hooks and `.impeccable/` pipeline were **not** copied (they need the tool) | ui-ux, web-design, launch-video (timing table) |
| [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) | MIT | **Merged**: brief inference, house rules, laws of the craft, redesign protocol, app-screen rules, soft/minimalist/brutalist directions, brandkit board structure. Its inspector/lint scripts were **not** copied | web-design, ui-ux, brand-identity |
| [nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) | MIT | **Merged**: style catalog, palettes, font pairings, landing patterns, UX guideline categories, token architecture, brand references, logo guidance. Its CSV search scripts and font files were **not** copied | web-design, ui-ux, brand-identity |
| [AgriciDaniel/claude-seo](https://github.com/AgriciDaniel/claude-seo) | MIT (FLOW prompts CC BY 4.0) | **Merged** as the factual backbone, then **corrected** against Google's own docs where it had drifted; extensions (DataForSEO, Firecrawl, Ahrefs, etc.) are mentioned as optional tooling only | seo-geo-audit |
| [Varnan-Tech/opendirectory](https://github.com/Varnan-Tech/opendirectory) | MIT | **Merged** ~20 of 65 skills: human-tone, brand-alchemy, position-me, geo-gap-fixer, llms-txt-generator, schema-markup-generator, email-newsletter, producthunt-launch-kit, show-hn-writer, pricing-page-psychology-audit, linkedin-post-generator, tweet-thread-from-blog, outreach-sequence-builder, product-update-logger, noise-to-linkedin-carousel, store-listing-optimizer, reddit-post-engine, noise2blog. The rest (API-bound lead-gen, image generation, Composio posting) were **dropped** as out of scope | launch-marketing, seo-geo-audit |
| [D4Vinci/Scrapling](https://github.com/D4Vinci/Scrapling) | BSD-3-Clause | **Linked, not vendored.** The wrapper explains installation of the official `scrapling-official` skill and MCP server, the fetcher decision rules and the ethics gate. Reason: v0.5 (Oct 2026) had breaking changes; the upstream skill tracks the library | web-scraping |
| [morluto/rea](https://github.com/morluto/rea) | MIT | **Linked, not vendored.** `npx rea-agents setup` installs REA's own skill into `~/.claude/skills/reverse-engineer-anything`; a copy here would go stale and conflict. The wrapper keeps the evidence workflow and legal red lines | reverse-engineering |

## Web pages

| Source | Treatment | Lands in |
|---|---|---|
| [mavek.ai – AI recommendation poisoning](https://mavek.ai/blog/ai-recommendation-poisoning/) | **Merged** in full (definition, Microsoft Defender findings, "Injection Paradox" results table, spillover effect, user and brand defenses) | llm-app-security (references/recommendation-poisoning.md), seo-geo-audit (one rule) |
| [tasteskill.dev](https://www.tasteskill.dev/) | Used for the skill inventory and install commands only; content is the repo above | web-design |
| [motionsites.ai](https://motionsites.ai/) | **Dropped.** The page is a paid prompt library with no reusable design rules; nothing to merge beyond "animated backgrounds exist". Not referenced in any skill | — |

## PDFs in `PDFs/`

| File | Treatment | Lands in |
|---|---|---|
| `Security_checklist_prompt.txt` (6 prompts + authorization note) | **Merged** verbatim in spirit as the QUICK mode, each prompt sharpened with specifics | security-review |
| `dpdp-founder-guide.pdf` | **Merged**: 20 duties with citations, build checklist; dates reconciled with the notified DPDP Rules 2025 | dpdp-legal-compliance |
| `Launch-Film-With-Claude.pdf` | **Merged** as a product-agnostic method (beat timings, render(t) rule, pipeline, mix settings, QA). Product branding, voiceover lines and course promos **dropped** | launch-video |
| `Local-SEO-Guide-for-Clinics-HealersHype.pdf` | **Merged**: prerequisites, 7-step playbook, page structure, keyword map, JSON-LD and robots templates, 30-day plan, metrics. Service pitch **dropped**; the robots/llms.txt advice updated (Google does not use llms.txt) | seo-geo-audit |
| `MadeToScale_12_Landing_Page_Animations_Guide.pdf` | **Merged**: the 12 animation recipes as parameters + global motion rules. Agency marketing pages **dropped** | web-design (references/motion.md) |
| `Make-Your-Own-Mascot.pdf` | **Merged**: mascot card, Avatar Lab export/integration, placement and trigger rules, AGPL caution. Promos **dropped** | brand-identity (references/mascot.md) |

## Screenshots in `photoes/` (39 files)

Kept as checklists (rewritten, no account handles):

- DPDP codebase audit prompt → dpdp-legal-compliance workflow
- "20 legal must-haves before launch" → dpdp-legal-compliance launch checklist
- "19 security holes in a vibe-coded SaaS" and the 4-part Injection/Auth/Secrets/Config list → security-review QUICK mode
- Google Business Profile must-fill list; "can a vibe-coded site rank" SEO checklist; free SEO tools list → seo-geo-audit
- UX laws with side-by-side proofs (figure-ground, banner blindness, Parkinson's law, choice overload) → ui-ux references/ux-laws.md
- Redis + TTL jitter cache strategy → security-review availability section
- Cloudflare free-tier capability list; NVIDIA free inference endpoint setup → TOOLBOX.md

Kept as tool pointers only (TOOLBOX.md): Browser Use, Stirling PDF, Crawl4AI, PaddleOCR, open-seo, Twenty CRM, trycompai/crm, Boneyard skeleton loaders, Mobile View Chrome extension, Kokoro TTS, Krea, Postiz, Pipecat, Maxun.

Dropped as irrelevant: Kangen water reel, DoctorC order confirmation, DigitalOcean maintenance email, rental-yield formula, Windows-activation repo reel (not something to build on), Open Gym app, hospital-software module advert.

## What was already in the folder

`local-seo-audit-v1/` (my earlier plugin) is superseded by `seo-geo-audit`. Its audit-first discipline, anti-patterns, YMYL rules and launch checklist were carried over; its mid-2026 facts were re-verified and several corrected (see the "What changed" box in that skill).

## Added 2026-10-22: website psychology videos and research

| Source | Treatment | Lands in |
|---|---|---|
| 19 YouTube videos on website, landing-page, product-page, pricing and premium-brand psychology (Sam Crawford x4, Self-Made Web Designer, Code Munchies, Jennie Lakenan, Carson Scott, Dylan Bindrup, Matt Gray, orenmeetsworld, Omar Eddaoudi, Ryan Mathews, Flux Academy, ThrillX x2, BitBranding, Anton Zalis, Honest HVAC Marketing) | **Summarised** (Gemini summaries supplied by Badal, plus 15 auto-caption transcripts pulled with yt-dlp); cases and rules adapted, no transcript text reproduced, creator promos and sponsors dropped; video statistics labelled "as claimed in the source video" | luxury-web-design (bulk); the cheap always-on basics only in web-design, ui-ux, launch-marketing, brand-identity (each v1.1) |
| Academic and industry research on first impressions, aesthetics, luxury strategy, attention and persuasion (Lindgaard 2006/2011, Tuch 2012, Reinecke 2013, Tractinsky 2000, Fogg 2003, Moshagen & Thielsch VisAWI, NN/g, Baymard, web.dev case studies, Kapferer & Bastien, Kluge 2013, Hagtvedt & Patrick 2008, Pracejus 2006, Rao & Monroe 1989, Han/Nunes/Dreze 2010, Lynn 1991, Tuncer 2023, Mathur 2019, FTC 2022, Buell & Norton 2011, Loewenstein 1994, Iyengar & Lepper 2000 with Scheibehenne 2010, Bain/Altagamma 2025, McKinsey 2026) | **Cited** with evidence grades (strong / moderate / weak); a myths list records popular figures that do not trace to a source (the 50 ms misreading, "60,000x faster", 92%/88% review stats, Zeigarnik, "+80% video") | luxury-web-design references/evidence.md |

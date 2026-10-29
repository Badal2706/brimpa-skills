---
title: 30 tells that make a site look AI-generated ("vibecoded"), graded - and which ones are actually fine
topic: web/design-quality
tags: [web-design, ai-slop, vibe-coding, templates, typography, landing-page, review-checklist]
source: English reel (Aug 2026) "30 reasons your site looks vibecoded (give this to Claude/ChatGPT)", on-screen list transcribed; graded against skills/web-design/references/preflight.md and research/web-psychology-evidence.md
source_type: video
confidence: medium
date: 2026-10-30
---

# AI-slop design tells

## The point in one line
A page reads as AI-made when it stacks many default choices (purple-black gradients, Inter, three icon cards, bento grid, fake testimonials); any one tell is fine when it is a decision, but five or more defaults together signal "nobody designed this".

## Details
The 30 tells from the reel, grouped, with our grade (Avoid = drop unless brand-driven; Context = fine if chosen on purpose; Must-fix = real defect).

| # | Tell | Grade |
|---|---|---|
| 1 | Harsh gradients | Avoid |
| 2 | Lucide icons used everywhere unchanged | Context (fine set; restyle stroke/size, mix with real imagery) |
| 3 | Pure white background | Context |
| 4 | Rainbow colouring | Avoid |
| 5 | Drop shadow on everything | Avoid |
| 6 | Three feature cards in a row | Avoid as page structure |
| 7 | Emojis as icons | Avoid |
| 8 | Liquid glass as decoration | Avoid |
| 9 | Em dashes in copy | Avoid (copy tell) |
| 10 | Inter / Geist / Space Grotesk by default | Context |
| 11 | Coloured left stripe on cards | Avoid |
| 12 | Fake testimonials | Must-fix (deceptive; also consumer-law risk) |
| 13 | Bento grids | Context |
| 14 | Fake terminal window | Avoid unless a dev tool |
| 15 | "It's not X, it's Y" copy | Avoid (copy tell) |
| 16 | Checkmark bullets | Context |
| 17 | Three pricing tiers | Context (tiered pricing with a highlighted middle plan is evidence-backed; just not by reflex) |
| 18 | No real product demo/screenshots | Must-fix |
| 19 | One soft corner radius on everything | Avoid |
| 20 | Purple and black | Avoid |
| 21 | No skeleton loaders (blank or spinner while loading) | Must-fix for apps |
| 22 | Radial glowing orbs | Avoid |
| 23 | Dot-grid backgrounds | Avoid |
| 24 | Sparkle icons for "AI" | Avoid |
| 25 | Animated arrows on every link | Avoid |
| 26 | No Terms of Service | Must-fix where you sell or take sign-ups |
| 27 | No privacy policy | Must-fix (DPDP for any form that collects personal data) |
| 28 | Hover animations on everything | Avoid |
| 29 | Neon colours | Context |
| 30 | Basic pastel colours | Context |

Automated help: the impeccable skill ships a "slop detector" of 62 deterministic rules (no LLM, no API key) that can scan a rendered URL (`npx impeccable detect <url>`); see dev-tools/agent-skills-ecosystem.md.

## Example
Clinic site review: page has purple-to-blue hero gradient, Inter, three icon cards, sparkle "AI-powered booking", made-up patient quotes and no privacy policy. Must-fix first (remove fake quotes, add privacy policy and consent), then replace the gradient and card row with the clinic's real photos, doctor names and timings.

## Caveats
- This is a taste list from one creator, not research; several items are fine when chosen deliberately or when they are the client's brand.
- Must-fix items overlap with law (DPDP, consumer protection on fake reviews), not just taste.

### What the source got wrong
- Treats all 30 as equally bad; "three pricing tiers", "white background", "checkmark bullets" and popular fonts are not defects on their own.
- Mixes legal requirements (ToS, privacy policy) and functional defects (no skeleton loaders, no product demo) with aesthetics; those deserve higher priority than the rest.

## Related
- skills/web-design/references/preflight.md (our fuller anti-template list)
- web/landing-page-blueprints.md, research/web-psychology-evidence.md
- dev-tools/agent-skills-ecosystem.md (impeccable, taste-skill, emilkowalski/skills, ui-ux-pro-max)

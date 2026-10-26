---
title: Brimpa website build (Oct 2026): which skills and repos were used for what
topic: case-studies/brimpa-website
tags: [brimpa, astro, case-study, skills, gsap, threejs, mascot, real-use]
source: Build session report for the Brimpa website (mascot through round 5), shared by Badal on 2026-10-26
source_type: own
confidence: high
date: 2026-10-26
---

# Brimpa website build: skills and repos in real use

## The point in one line
The Brimpa site (Astro 5 with a procedural three.js mascot) was built with seven brimpa-skills plus GSAP, transitions.dev and three.js upstreams; security-review had not been run yet at the end of round 5.

## Skills from brimpa-skills
| Skill | Used for |
|---|---|
| brand-identity | Logo and colours into tokens; BRAND.md notes |
| web-design + luxury-web-design | Page direction, section layout, full-width colour bands, one mascot moment per page |
| ui-ux | Form states, keyboard focus, phone layouts, dark mode, the pill header's edge over black sections |
| launch-marketing | All copy, with AI-sounding words removed |
| seo-geo-audit | Titles and descriptions, structured data, sitemap, robots.txt, FAQ markup |
| dpdp-legal-compliance | Privacy notice, terms, consent line on the form, retention periods (marked for lawyer review) |
| security-review | Not run yet; planned before launch (a parity run on 2026-10-26 found an open mail relay in the contact form's "copy to sender" mail) |

## Upstream repos
| Repo | Used for |
|---|---|
| greensock/gsap-skills | GSAP and ScrollTrigger rules: headline intro, section reveals, drifting background shapes, process steps, counters |
| Jakubantalik/transitions.dev | Motion timings and easing, page-to-page fade, error shake on the form |
| DavidHDev/react-bits | Ideas only (site is not React; no code copied) |
| microsoft/playwright-cli | Checked, not needed (own Playwright scripts did screenshots and checks) |
| img2threejs, CloudAI-X/threejs-skills | Cloned during the mascot work |
| Brimpa Care and CylinderPro product repos | Facts for the product pages |

Other tools: Artifact skills for the mascot preview page; web search and page fetches for competitor research (`site/docs/competition.md`).

## Lessons worth carrying forward
- The mascot method is documented privately in the Brimpa.com project; its reusable logic (not the character, which stays private) is in the `mascot-3d` skill.
- Open issues found while documenting: OG images still carried old positioning copy; the project brief (CLAUDE.md) was stale; a few mascot documentation strings had drifted from the code.
- The brimpa.com domain was still GoDaddy-parked on 2026-10-26; the site is not deployed to it yet.

## Related
- skills/mascot-3d, skills/web-design, skills/luxury-web-design, UPSTREAM.md

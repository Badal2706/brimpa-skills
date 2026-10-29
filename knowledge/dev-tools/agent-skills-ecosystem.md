---
title: Agent skills ecosystem - find-skills, the npx skills CLI, vetting rules, and tools worth knowing (HyperFrames, agent-browser, api-anything, grill-me)
topic: dev-tools/agent-skills
tags: [agent-skills, skills-cli, find-skills, vetting, telemetry, hyperframes, agent-browser, api-anything, grill-me, mcp, claude-code, impeccable, taste-skill, ui-ux-pro-max, gstack, emilkowalski, 21st-dev, motion, framer-motion, motionsites, linkedin-skills, linkedin, marketing, archify, artemis, android-testing, hallmark, diagram-design, frontend-slides, scroll-world, website-cloner, stitch]
source: READMEs and SKILL.md files of vercel-labs/skills, vercel-labs/agent-browser, goodnight000/api-anything and mattpocock/skills (local clones, commits dated 2026-10-28/29), plus the heygen-com/hyperframes README and GitHub API, all read 2026-10-30; Archify, ARTEMIS and the ten "design skills" repos from their READMEs and the GitHub API (30 Oct 2026), prompted by four Oct 2026 reels
source_type: docs
confidence: high
date: 2026-10-30
---

# Agent skills ecosystem

## The point in one line
Third-party skills install with `npx skills add`, but a skill is instructions your agent will follow, so read its SKILL.md and licence before installing, never auto-confirm with `-y`, and turn off the CLI's telemetry if you do not want install events reported.

## The `npx skills` CLI (vercel-labs/skills, MIT, v1.7.4 as of 2026-10-30)
- Package manager for Agent Skills; directory at skills.sh. Needs Node.js 22.20+. Detects installed agents (Claude Code, Codex, Cursor, OpenCode and many more) and copies skills into each one's skills folder.
- Installs to the current project by default; `-g` installs to the user directory for all projects.
- Commands: `add <source>` (`--skill <name>` to take one skill, `-a <agent>` to target one agent), `find [query]`, `list`, `use <source>@<skill>` (run one skill without installing), `check`, `update`, `remove`, `init [name]`. `experimental_sync` / `experimental_install` are previews that may change without notice.
- `-y` / `--yes` skips every confirmation prompt; `--all` installs all skills to all agents without prompts. Do not use either: the prompts are where you see which skills and which agents are about to change.
- **Telemetry is on by default.** It collects anonymous usage data; repository and skill identifiers are sent for repos GitHub confirms are public (other source types may include identifiers too). Set `DISABLE_TELEMETRY=1` or `DO_NOT_TRACK=1` to switch it off. Trade-off: the same variables also switch off the CLI's security-audit requests, so do your own reading (below).

## find-skills (the CLI's own discovery skill)
Triggers on "find a skill for X", "is there a skill that can...". Its workflow: check the skills.sh leaderboard, then `npx skills find <query>`, then verify quality before recommending. Its vetting gates, which we keep:
1. Install count: prefer 1K+ installs; be cautious under 100.
2. Owner reputation: official or well-known owners (for example `vercel-labs`, `anthropics`, `microsoft`) over unknown authors.
3. GitHub stars: treat a source repo under 100 stars with scepticism.

Our additions:
- Always read the SKILL.md (and any scripts it runs) and the licence before installing. A skill can tell the agent to run commands, fetch URLs or send data.
- Never install with `-y` (find-skills' own install step suggests `-g -y`; drop the `-y`).
- Install one named skill (`--skill <name>`) rather than a whole multi-skill repo or plugin; whole sets can bring names that clash with built-ins or with this collection (see `skills/grill-plan/references/sources.md` on mattpocock/skills).
- Prefer `use` to try a skill once without installing it.

## Tools worth knowing (as of 2026-10-30)

| Tool | What it is | Licence | Notes |
|---|---|---|---|
| HyperFrames (heygen-com/hyperframes) | Write HTML, render video: compositions are HTML with timing attributes, animated with GSAP, CSS, Lottie, Three.js and others; each frame is seeked in headless Chrome and encoded with FFmpeg, so output is deterministic | Apache-2.0 | Needs Node.js 22+ and FFmpeg; renders locally by default (Docker and a self-deployed AWS Lambda option exist). Install as a Claude Code plugin (`claude plugin marketplace add heygen-com/hyperframes`, then `claude plugin install hyperframes@hyperframes`) or `npx skills add heygen-com/hyperframes`. HeyGen media generation is an optional path in its media skill, not required. Alternative engine for skills/launch-video. |
| agent-browser (vercel-labs/agent-browser) | Native Rust CLI that drives Chrome over the DevTools Protocol (CDP); `snapshot` returns an accessibility tree with refs (`@e2`) the agent clicks or fills, which keeps context small | Apache-2.0 | v0.41.0. `npm install -g agent-browser` then `agent-browser install` (downloads Chrome for Testing). `agent-browser mcp` runs an MCP server. Safety features are opt-in: `--content-boundaries`, `--max-output`, `--allowed-domains`, `--action-policy`, `--confirm-actions`. `--profile` reuses a signed-in Chrome; never do that with client accounts. |
| api-anything (goodnight000/api-anything) | Learns a site's own web request from two example inputs and replays it as plain HTTP; agents call it over MCP | MIT | v0.3.1, young (14 sites in its catalog). Sharing with its public catalog defaults to yes; turn it off with `api-anything setup --no-share --share-only` (or `setup --no-share` on first install). Searches still reach the catalog with sharing off. Never use client logins with it. Gated by the authorization step in skills/web-scraping. |
| grill-me / grilling (mattpocock/skills) | A relentless interview that maps a plan as a design tree and asks, round by round, only the questions whose prerequisites are settled, until there is a shared understanding | MIT | Our adapted version is skills/grill-plan (AskUserQuestion rounds, DECISIONS.md). Do not install the whole mattpocock plugin beside this collection; some names clash with built-ins (for example `code-review`). |
| Archify (tt-a1i/archify) | Skill that turns a description, or an agent's reading of a repository, into one self-contained interactive HTML diagram (architecture, sequence, agent workflow) with click-through nodes, path tracing ("highlight the cache-miss path"), themes and PNG/PDF export; also one-page "explainer" answers with numbered sources | **Apache-2.0** (reels showed MIT; the badge changed), ~91k stars on 2026-10-30, v3.2.0 (18 Oct 2026), repo created Apr 2026 | `npx skills add tt-a1i/archify -g`, then e.g. "Analyze this repository, then use archify to create a high-level runtime architecture diagram. Show 8-12 core components, one primary path, external dependencies and trust boundaries." Useful for onboarding to a client's inherited codebase and for architecture slides in proposals. The README has sponsor sections for third-party API resellers: ignore them; the diagram is written by your own agent. Diagrams are agent-authored from reading code, not traced from a running system, so check them against the code before showing a client. Added 2026-10-30 from two Hindi reels (Oct 2026). |
| ARTEMIS (google/artemis) | Lets an agent drive a real Android phone or emulator from natural language (tap, swipe, type, screenshots, Logcat); MCP server for Claude Code, Codex, Cursor, Antigravity; CLI, web console and Python SDK for test suites | Apache-2.0, ~15.6k stars, in the `google` GitHub org, created 13 Aug 2026 | `git clone https://github.com/google/artemis` then `.\start.bat` (Windows) or `./start.sh`; needs Python 3.12+, ADB, a phone with USB debugging. Its installer offers to write MCP config and a rules file into each detected IDE (for Claude Code `~/.claude/rules/artemis.md`): say no or read it first. First task installs an "Artemis Accessibility Helper" on the phone (remove with `uv run artemis helper uninstall`). Software is free; the vision model you point it at is not, and screenshots go to that provider, so use a test phone with no personal or patient data. Good fit: smoke-testing a client's Android app or PWA before release. Claims 99%+ on Google Research's AndroidWorld benchmark (its own figure). Added 2026-10-30 from an Oct 2026 reel. |

## Design and workflow skills promoted in reels (GitHub API and READMEs read 2026-10-30)

Sources: four reels (Aug 2026) pitching "premium website in one prompt" skills and an "engineering team in Claude"; stars and licences from the GitHub API, features from each README. Reel counts were stale; README numbers below win.

| Skill / repo | What it does | Licence, stars | Install | Notes |
|---|---|---|---|---|
| impeccable (pbakaus/impeccable) | Design vocabulary for agents: 24 commands (polish, bolder, critique, audit...) plus a slop detector of 62 deterministic rules (no LLM, no key); optional design hook scans every UI file the agent edits | Apache-2.0, ~95k | `npx impeccable install`, or `/plugin marketplace add pbakaus/impeccable` | `npx impeccable detect <url>` scans a rendered page. The installer offers a hook: read what it runs before saying yes |
| taste-skill (Leonxlnx/taste-skill) | Skills for art direction, reference images and a browser check; v2 "design-taste-frontend", v1 legacy, a GPT/Codex variant | MIT, ~105k | `npx skills add Leonxlnx/taste-skill --skill <name>` | Overlaps our web-design skill; mine ideas, do not install beside it by default |
| emilkowalski/skills | Animation and UI-detail rules from Vercel/Linear experience (easing choice, shadows vs borders, performance and UI cheatsheets) | MIT, ~51k | `npx skills add emilkowalski/skills` | The reel's "squeeze motion skill" is this repo (name misheard). Good source for web-design/references/motion.md |
| ui-ux-pro-max (nextlevelbuilder/ui-ux-pro-max-skill) | Searchable design database: 79 UI styles (50 active), 192 palettes tied to 192 product types, 74 font pairings, 34 landing patterns | MIT, ~142k | `/plugin install ui-ux-pro-max@ui-ux-pro-max-skill` or npm `ui-ux-pro-max-cli` (`uipro init --ai ...`) | Use npm `ui-ux-pro-max-cli`; old `uipro-cli` is stale. Reel figures (50 styles, 97 palettes, 57 pairings) were outdated |
| 21st.dev Magic / 21st MCP (21st-dev/magic-mcp) | MCP server to search 10,000+ React/Tailwind components and generate UI from the editor | ISC, ~6.3k | setup at 21st.dev/mcp | "Magic MCP is now the 21st MCP"; needs a 21st.dev account/API key; free-tier limits not checked |
| gstack (garrytan/gstack) | Garry Tan's (Y Combinator CEO) Claude Code setup: 23 opinionated slash-command tools acting as CEO, eng manager, designer, reviewer, QA (real browser), security officer (OWASP + STRIDE), release engineer | MIT, ~138k | `git clone ... ~/.claude/skills/gstack && ./setup` (needs Bun 1.4.2+, Node on Windows) | Its install prompt also edits CLAUDE.md to route all browsing through its `/browse` and to never use the Chrome extension tools; that overrides your own setup. Install per project, read `./setup` first |

| Motion (formerly Framer Motion; motiondivision/motion) | The React/JS animation library the agent writes animations with | MIT; npm `motion` and `framer-motion` both at 14.8.0 on 2026-10-30, same repo | `npm i motion`, import from `motion/react` | Added 2026-10-30 from a "4-tool Claude Code setup" reel that still calls it Framer Motion. New projects should install `motion`; `framer-motion` is the legacy name kept in sync |
| MotionSites (motionsites.ai) | Paid library of long website prompts (landing, portfolio, 3D) to paste into Lovable, Bolt, Cursor or Claude; has an MCP link | commercial; prices not on the home page (third-party listings conflict: about $149-239/yr or $239-349 lifetime) | copy a prompt | Our web-design motion reference already adapts the MIT parts of its Claude skill. A pasted prompt is someone else's design: it carries their AI tells; use as a reference, never as the brief |

The same reel's four-step recipe (install Claude Code, add Motion, add ui-ux-pro-max, paste a MotionSites prompt and describe the idea) is a reasonable starter for a personal demo, but it skips everything that makes a client site not look generated: real content and photos, a chosen direction, and the pre-flight. Our web-design skill covers motion (references/motion.md) and directions without the extra installs.

### "Top 10 Claude design skills" reel (Oct 2026), checked against the GitHub API on 2026-10-30
The reel ranks ten repos by stars ("4.7 lakh combined"). Current figures, and what each is for us:

| Reel rank | Repo | What it does (README) | Licence, stars 30 Oct | Our take |
|---|---|---|---|---|
| 10 | jakubkrehel/skills ("Interface Skills") | 14 skills: better-interface review (accessibility, layout, writing, type, colour, polish), better-typography, better-colors, better-accessibility (WCAG 2.2), interface-review of a branch or PR, state-machine and variant pages | MIT, ~9.1k | Strong reference for ui-ux reviews; `interface-review` on a PR is the idea worth borrowing |
| 9 | google-labs-code/stitch-skills | Skills and plugins for Google Stitch (design generator) via the Stitch MCP server; `npx plugins add ... --target claude-code` | Apache-2.0, ~8.6k | Only useful if you design in Stitch |
| 8 | oso95/scroll-world | Builds a scroll-scrubbed "fly through a 3D world" landing page | MIT, ~10.7k | **Needs paid video/image generation** (Monid CLI with balance, or Higgsfield credits) plus ffmpeg; not free, and heavy for clinic sites |
| 7 | Nutlope/hallmark (Together AI) | Anti-AI-slop design skill: 50 themes, builds from the page's job, lints the result in a real browser at eight widths, `/hallmark audit <path>` reports only | MIT, ~41.9k | Closest to our web-design pre-flight; mine its lint list (eyebrow above every heading, tracked capitals) |
| 6 | zarazhangrui/frontend-slides | HTML slide decks from scratch or from PPTX, style picked from visual previews | MIT, ~31.6k | Alternative to .pptx for pitch decks |
| 5 | cathrynlavery/diagram-design | Diagrams as one HTML+SVG file in your brand; **45** types (reel said 41); can pull palette and fonts from a site URL | MIT, ~62.9k (reel: 31.7k) | Pairs with Archify; good for client proposals |
| 4 | JCodesMore/ai-website-cloner-template | `/clone-website <url>` recreates a site as a Next.js app | MIT, ~37.9k | **Do not clone a third party's site for a client**: copy, images and distinctive design are copyrighted; use only for your own or a client's existing site (migration) or as a layout study |
| 3 | tt-a1i/archify | see table above | Apache-2.0, ~91k | |
| 2 | Leonxlnx/taste-skill | see table above | MIT, ~105k | |
| 1 | nextlevelbuilder/ui-ux-pro-max-skill | see table above | MIT, ~142k | |

What the reel got wrong: it is not a true star ranking (pbakaus/impeccable, ~95k, would sit at number 3 and is missing); stars were stale (diagram-design shown at 31.7k, now ~62.9k; hallmark 30.6k, now ~41.9k); "Interface Skills" is a review-and-build pack, not just "UI design review"; Scroll World's paid generation backends are not mentioned; Archify's "English in, diagram out" is right.

Rules we keep: these are popularity signals, not quality or safety checks; install one named skill at a time; prefer reading them as references for our own skills (web-design, ui-ux, grill-plan, security-review) over installing whole packs that clash with them.

## Marketing skills promoted in reels (GitHub API and README read 2026-10-30)

| Skill / repo | What it does | Licence, stars | Install | Notes |
|---|---|---|---|---|
| linkedin-skills (sergebulaev/linkedin-skills) | 12 LinkedIn skills: Post Writer (20 hook formulas + a founder angle library), Comment Drafter, Reply Handler, Post Audit, Humanizer, Hook Extractor, Content Planner (7-day plan), Engagement Monitor, Profile Optimizer, Employee Advocacy, Repurposer, Interviewer (keeps a "story bank" of your real numbers). Every skill drafts and waits for approval; nothing posts without your OK | MIT, ~5.4k (created Apr 2026, active Oct 2026) | `/plugin marketplace add sergebulaev/linkedin-skills` then `/plugin install linkedin-skills@linkedin-skills`; or `npx skills add sergebulaev/linkedin-skills` | Third-party (a content agency), not Anthropic. Optional add-ons are paid third-party services: Apify scrapers to read posts/comments/likers, Publora to auto-post, Pixfaro for images. **Reading LinkedIn through scrapers breaches LinkedIn's User Agreement** (no scraping or automated access) and puts the account at risk; use it paste-only. On Windows a plain clone loads no skills (symlinks) unless Developer Mode or junctions are used. Its voice rules overlap our launch-marketing skill; mine the hook formulas and the Interviewer/story-bank idea, keep our stricter rules |

Same author ships matching bundles for X, Instagram, YouTube, TikTok, Threads and Facebook. Treat as a reference for launch-marketing (LinkedIn hooks, 900-1,300 character posts, link in first comment), not as a replacement.

## Caveats
- Versions and flags above were read from the repos on 2026-10-30; these CLIs move fast. Re-check the README before quoting a flag.
- Install counts and stars are popularity signals, not safety checks; a popular skill can still change after you vet it, so re-read on update.
- Tools that drive a browser or replay requests are automated access: the web-scraping authorization gate applies whatever the tool.

## Related
- skills/web-scraping (agent-browser and api-anything, gated)
- skills/grill-plan
- skills/launch-video (HyperFrames as an alternative engine)
- dev-tools/open-source-tools.md
- research/2026-10-security-and-claude-skills-facts.md
- web/ai-slop-design-tells.md, security/ai-security-scanners.md (Strix skills)

### What the reels got wrong (design/workflow skills, Aug 2026)
- Credited "23 tools" to impeccable; that is gstack's count (impeccable has 24 commands).
- Stale counts: ui-ux-pro-max "50 styles, 97 palettes, 57 font pairings" (now 79/192/74); gstack "120,000 stars" (about 138k).
- "Premium website in one prompt" / "the entire engineering team": skills shape output, they do not replace a brief, real content and review.
- "Your Claude Code sites look AI-generated because you skip this four-tool setup" (Aug 2026 reel): installing more design tools does not remove AI tells; the tells come from defaults (layout, copy, gradients), and a pasted prompt library adds its own. "Framer Motion" is now published as Motion (`motion` package). "UI UX Max Pro" is ui-ux-pro-max.
- Repeat reel (Sep 2026) on impeccable, taste-skill and Kowalski's skills: "Taste Skill is trained on thousands of award-winning designs" - it is a set of prompt/instruction files; nothing is trained. "Neon's Taste Skill" is Leonxlnx/taste-skill. The claim that three skills make "killer designs in no time" has the same limits as above.
- Archify reels (Oct 2026): "75k stars" (about 91k on 30 Oct) and an MIT badge (now Apache-2.0); "a live simulation of your runtime" - the diagrams are interactive HTML authored by your agent from reading the code, not a trace of the running app; "comment to get the repo link" is a follow hook (the install line is on screen).
- ARTEMIS reel (Oct 2026): "Google gave Claude a phone" - it is a Google-org open-source tool that any MCP client can use, not a Claude feature; "completely free" ignores the model API cost and the screenshots sent to that provider.
- LinkedIn skills reel (Sep 2026): "an 11-skill pack" - the README now lists **12** (Interviewer added). "Checks your post on 5 AI detectors and shows a score so you know it will read as human" - the README says the Humanizer's multi-detector tester (GPTZero, Originality.ai, ZeroGPT, Sapling, Copyleaks) *documents how much detectors disagree* and explicitly **does not promise to beat detectors**. "Comments on others' posts on your behalf" - it drafts comments for you to approve and paste; auto-publishing needs a paid third-party API. "Completely free" - the skills are MIT, the optional data and posting services are paid. Its voice rule "cap em dashes at about 1 per 100 words" conflicts with our launch-marketing rule of zero em dashes in social copy; keep zero, since it costs nothing and readers still read em dashes as AI.

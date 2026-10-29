---
title: Agent skills ecosystem - find-skills, the npx skills CLI, vetting rules, and tools worth knowing (HyperFrames, agent-browser, api-anything, grill-me)
topic: dev-tools/agent-skills
tags: [agent-skills, skills-cli, find-skills, vetting, telemetry, hyperframes, agent-browser, api-anything, grill-me, mcp, claude-code]
source: READMEs and SKILL.md files of vercel-labs/skills, vercel-labs/agent-browser, goodnight000/api-anything and mattpocock/skills (local clones, commits dated 2026-10-28/29), plus the heygen-com/hyperframes README and GitHub API, all read 2026-10-30
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

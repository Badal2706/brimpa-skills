# Upstream repositories

The projects this collection was distilled from live under `upstream/` as **git submodules pinned to the commit we last read**. They are the originals, untouched, so we can diff them against newer versions and fold changes into our skills, and so anyone cloning this repo can read the full source of a rule.

- A plain `git clone` leaves `upstream/*` empty (fast, small). To fetch them: `git submodule update --init --depth 1` (about 280 MB).
- Claude Code, Claude Desktop and `npx skills add` ignore `upstream/`; only `skills/` is installable from this repo. Several upstream repos are also listed as plugins in our marketplace (see below) so they can be installed straight from their own GitHub.
- Update: `scripts/update-upstream.ps1` pulls the latest commit of each, prints what changed inside each project's skill folders since our pin, and leaves the review to you. After folding changes into our skills, commit the new pins.

| Submodule | Repo | License | Feeds | Installable on its own |
|---|---|---|---|---|
| upstream/security-audit-skill | cloudflare/security-audit-skill | MIT | security-review, llm-app-security | `/plugin install security-audit-skill@brimpa` |
| upstream/strix | usestrix/strix | Apache-2.0 | security-review, llm-app-security | `/plugin install strix@brimpa` (skills wrap the Strix CLI) |
| upstream/skills | anthropics/skills | Apache-2.0 (docs skills source-available) | web-design, ui-ux, brand-identity, repo format | `/plugin marketplace add anthropics/skills` |
| upstream/impeccable | pbakaus/impeccable | Apache-2.0 | ui-ux, web-design, luxury-web-design | `/plugin install impeccable@brimpa` (needs its CLI for live features) |
| upstream/taste-skill | Leonxlnx/taste-skill | MIT | web-design, ui-ux, brand-identity | `/plugin install taste-skill@brimpa` |
| upstream/ui-ux-pro-max-skill | nextlevelbuilder/ui-ux-pro-max-skill | MIT | web-design, ui-ux, brand-identity | `/plugin install ui-ux-pro-max@brimpa` |
| upstream/claude-seo | AgriciDaniel/claude-seo | MIT | seo-geo-audit | `/plugin install claude-seo@brimpa` |
| upstream/opendirectory | Varnan-Tech/opendirectory | MIT | launch-marketing, seo-geo-audit | `/plugin install opendirectory-gtm-skills@brimpa` or `npx @opendirectory.dev/skills` |
| upstream/Scrapling | D4Vinci/Scrapling | BSD-3-Clause | web-scraping | `npx skills add D4Vinci/Scrapling --skill scrapling-official` |
| upstream/rea | morluto/rea | MIT | reverse-engineering | `npx rea-agents setup` |
| upstream/threejs-skills | CloudAI-X/threejs-skills | MIT | (three.js reference for mascot and 3D work; not merged, used as-is) | `/plugin install threejs-skills@brimpa` or `npx skills add cloudai-x/threejs-skills` |

## Policy

- We **merge** knowledge into our skills when it is stable and we want it rewritten in our voice and verified (security checklists, design rules, SEO facts).
- We **link** (install upstream as-is) when the skill tracks a fast-moving tool or API (Scrapling, REA, three.js r186 API reference). `threejs-skills` is the model case: thirteen version-pinned API skills that would go stale if copied.
- Every merged rule is attributed in the skill's `references/sources.md`; licenses are reproduced in `NOTICE`.

## Parity promise

A merged skill must give output at least as good as the original on the same task. We check this with blind head-to-head runs recorded in `evals/parity/`. Where the original's strength is a tool (a CLI, MCP server, browser extension or validator script), our markdown carries the method and the judgement, and you install the original alongside for the automation; the marketplace lists those originals so both can be installed with one command each. If a run shows ours losing on any rubric line, the gap is folded into our skill and the pair is re-run.

## Pinned commits (2026-10-26)

See `git submodule status` for the authoritative list; the table above was pinned on 2026-10-26.

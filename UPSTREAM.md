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
| upstream/brag | latent-spaces/brag | MIT | launch-video (parity bar: Brag's Brimpa Care films; music-cue snap tolerances credited) | `/plugin install brag@brimpa` or `npx skills add https://github.com/latent-spaces/brag --skill brag-slim` |
| upstream/gsap-skills | greensock/gsap-skills | MIT | web-design motion, luxury-web-design signature moments, mascot-3d (Draggable pitfall); used for the Brimpa site's GSAP/ScrollTrigger work | `/plugin install gsap-skills@brimpa` or `/plugin marketplace add greensock/gsap-skills` |
| upstream/transitions.dev | Jakubantalik/transitions.dev | Transitions.dev licence (use in any project; tooling MIT; do not redistribute the library as a competing product) | web-design motion timings, page transitions, error shake; used for the Brimpa site | `npx skills add Jakubantalik/transitions.dev` |
| upstream/img2threejs | img2threejs/img2threejs | Apache-2.0 | mascot-3d (reconstructing an object from one reference image as procedural three.js, with quality gates) | `npx skills add img2threejs/img2threejs` |
| upstream/playwright-cli | microsoft/playwright-cli | Apache-2.0 | screenshot and check tooling for web-design pre-flight, launch-video captures, mascot stills (checked during the Brimpa build; own scripts were enough) | `npx skills add microsoft/playwright-cli` |
| (not pinned) | DavidHDev/react-bits | MIT + Commons Clause (no selling the library) | ideas only for animated components; 373 MB, so referenced, not pinned | browse https://github.com/DavidHDev/react-bits |

## Used in real builds

The Brimpa website (Oct 2026) used seven of our skills plus gsap-skills, transitions.dev, threejs-skills and img2threejs; details in `knowledge/case-studies/brimpa-website-build.md`.

## Policy

- We **merge** knowledge into our skills when it is stable and we want it rewritten in our voice and verified (security checklists, design rules, SEO facts).
- We **link** (install upstream as-is) when the skill tracks a fast-moving tool or API (Scrapling, REA, three.js r186 API reference). `threejs-skills` is the model case: thirteen version-pinned API skills that would go stale if copied.
- Every merged rule is attributed in the skill's `references/sources.md`; licenses are reproduced in `NOTICE`.

## Parity promise

A merged skill must give output at least as good as the original on the same task. We check this with blind head-to-head runs recorded in `evals/parity/`. Where the original's strength is a tool (a CLI, MCP server, browser extension or validator script), our markdown carries the method and the judgement, and you install the original alongside for the automation; the marketplace lists those originals so both can be installed with one command each. If a run shows ours losing on any rubric line, the gap is folded into our skill and the pair is re-run.

## Pinned commits (2026-10-26)

See `git submodule status` for the authoritative list; the table above was pinned on 2026-10-26.

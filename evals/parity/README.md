# Parity evals: our skills versus the upstream originals

Policy: a Brimpa skill that was distilled from an upstream repo must produce output **at least as good** as the original on the same task. Better is welcome; worse is a bug. This folder holds the pairs, the test tasks, and the results of blind comparisons.

## How a comparison is run

1. Two fresh agents get the same task text. One is pointed at our skill folder, the other at the upstream skill folder (under `upstream/`). Each may read anything inside its own skill or repo and nothing from the other.
2. Both save their deliverable to a workspace folder with a note of what they did and what they could not run (for example, upstream scripts that need a CLI or API key).
3. A third agent judges blind: it receives the two outputs as "A" and "B" without knowing which is ours, scores them on a task-specific rubric, and names a winner with reasons.
4. If ours loses on any rubric line, the missing strength is folded into our skill and the pair is re-run.

This is the blind-comparison method from Anthropic's skill-creator skill, applied across repos instead of across versions.

## Pairs

| Our skill | Upstream skill(s) | Test task | Tool-backed upstream features we cannot replicate in markdown (install the upstream for these) |
|---|---|---|---|
| seo-geo-audit | claude-seo `seo-audit` (+ its sub-skills) | Audit a live site's homepage and two pages; scored report with prioritised fixes | DataForSEO / Firecrawl / Ahrefs / GSC MCP extensions, Lighthouse automation |
| security-review | cloudflare security-audit (guidance mode) | QUICK review of a small site's source; findings with verdicts and fixes | Full-audit mode with coverage ledger validators (`validate-*.cjs`), multi-agent hunter pipeline |
| web-design | taste-skill `taste-skill` (v2), Anthropic `frontend-design`, impeccable | Design plan + one-page landing page for a given brief | taste-skill inspector/lint scripts (Node + Chrome); impeccable CLI, detector rules, live browser iteration |
| ui-ux | impeccable `critique` / `audit` playbooks | Critique of a given app screen | impeccable detector CLI and browser extension |
| launch-marketing | opendirectory `human-tone`, `position-me` | De-slop a homepage; positioning doc | opendirectory's Gemini/Composio-backed generation steps |
| brand-identity | ui-ux-pro-max `brand` | Brand kit for a brief | ui-ux-pro-max token scripts and CSV search |
| llm-app-security | strix `find-security-vulnerabilities-in-code` | Review an LLM feature design | the Strix CLI / cloud runner |
| web-scraping, reverse-engineering | Scrapling official skill, REA skill | n/a: ours are wrappers that install the upstream | everything (by design) |

Where an upstream feature depends on a CLI, API key or browser automation, parity means: our skill carries the method and the judgement, and the README/UPSTREAM tables tell you to install the upstream alongside for the automation. Both are installable from this marketplace.

## Results

See `results.md` (appended after each run).

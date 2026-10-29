---
title: AI security scanners for small teams - Claude Security plugin (source scan) and Strix (live pentest), and where each fits
topic: security/tools
tags: [security, claude-code, claude-security, strix, pentest, sast, dast, vibe-coding, sarif]
source: Two English reels (Aug 2026) on the Claude Security plugin and Strix; checked against code.claude.com/docs/en/claude-security (read 2026-10-30) and the usestrix/strix README and GitHub API (read 2026-10-30)
source_type: video
confidence: high
date: 2026-10-30
---

# AI security scanners: Claude Security plugin and Strix

## The point in one line
Run the Claude Security plugin for a deep, verified review of the source (and of each branch diff), and Strix for a live, sandboxed attack on a running staging copy; neither replaces deterministic scanners, and neither is "free" in tokens.

## Details

### Claude Security plugin (Anthropic, beta since 22 Jul 2026)
- Install inside Claude Code: `/plugin install claude-security@claude-plugins-official` (if the marketplace is missing: `/plugin marketplace add anthropics/claude-plugins-official`; if the plugin is not found: `/plugin marketplace update claude-plugins-official`), then `/reload-plugins` if asked.
- Needs: a paid plan, API access or a cloud provider (Bedrock / Google / Foundry); on Pro, enable Dynamic workflows in `/config`; `python3` 3.9+ on PATH; git for diff scans and patches. Windows supported.
- One command, `/claude-security`, three jobs: **Scan codebase**, **scan a set of changes** (branch diff, PR, single commit; committed changes only), **Suggest patches**.
- Scan effort: `low` (skips architecture map and threat model), `medium` (default), `high` (more hunting). Large repos: scan one area at a time (auth, API layer).
- Output: `CLAUDE-SECURITY-<timestamp>/` with `CLAUDE-SECURITY-RESULTS.md`, `.jsonl`, `.sarif` (CWE-classified, SARIF 2.1.0) and a revision stamp; the folder has its own `.gitignore`.
- Findings appear only after independent verifier agents agree. Patches go to `patches/F<n>.patch`, each reviewed by a separate agent (runs tests if present); **never applied automatically**: `git apply ...` one patch per PR.
- Scans are nondeterministic (two runs can differ) and count against plan usage; runs best in auto mode.
- Layering per Anthropic: security-guidance plugin (while Claude writes) -> `/security-review` (one pass on a branch) -> Claude Security plugin (deep on-demand) -> Code Review on PRs (Team/Enterprise) -> managed Claude Security (Enterprise) -> your CI scanners.

### Strix (usestrix/strix, Apache-2.0, about 72.7k stars on 2026-10-30)
- Autonomous AI pentest agents that run your app, attack it, and only report vulnerabilities they could actually exploit, with proof and suggested fixes.
- Needs Docker running and an LLM API key (any supported provider); first run pulls a sandbox image; results in `strix_runs/<run>`. Install: `curl -sSL https://strix.ai/install | bash` (or pipx/uv `strix-agent`). Has a GitHub Actions recipe and `npx skills add usestrix/strix` (nine skills).
- Our security-review skill already adapts several Strix checklists (see skills/security-review/references/sources.md).

## Example
Brimpa clinic booking app before launch: (1) `/claude-security` -> Scan codebase at `medium`, scoped to auth + booking API; (2) fix accepted findings one PR each; (3) deploy to staging with seeded fake patients; (4) run Strix against staging only; (5) keep Semgrep/gitleaks/dependency audit in CI. Re-run the plugin's diff scan on every risky branch.

## Caveats
- Only point Strix at systems you own or have written permission to test; never at production with real patient data, never at third-party APIs.
- LLM-based scanners miss things and vary run to run; treat a clean report as "nothing found this run", not "secure".
- Strix sends code/requests context to whichever LLM provider you configure; pick one acceptable for client code.

### What the source got wrong
- Claude Security reel: "six-step process" is right; "even Anthropic uses this internally and it is on their website" was not checked and does not matter. It omitted the paid-plan requirement and that patches are never auto-applied.
- Strix reel: "45,000 stars" was stale (about 72.7k now); "completely free" ignores LLM API costs and the Docker requirement; "attacks a whiteboard app" was just the demo.
- Second Strix reel (Hinglish, Sep 2026) repeats "45,000 stars" and "completely free", and adds "run a full security test before you ship anything": Strix tests a running app only; it does not replace the source scan, dependency audit and secrets scan above, and it must target staging, never production with real data.

## Related
- research/2026-10-security-and-claude-skills-facts.md (OWASP lists, Semgrep, gitleaks)
- skills/security-review, skills/llm-app-security

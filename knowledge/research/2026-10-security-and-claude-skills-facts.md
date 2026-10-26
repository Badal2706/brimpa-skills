---
title: Verified facts, Oct 2026: OWASP 2025 lists, password/CSP/cookie baselines, security tools, Agent Skills spec and Claude install paths
topic: research/security-claude
tags: [owasp, llm-security, agentic, csp, argon2, gitleaks, semgrep, agent-skills, claude-code, claude-desktop, verified]
source: Web research against primary sources on 2026-10-20; URL and date per claim; conflicts flagged
source_type: docs
confidence: high
date: 2026-10-26
---

# Web research: current security references + Claude Skills install/format

Research date: 2026-10-20. Every claim below carries a source URL and the date shown on (or inferred for) that source. Items marked **[UNVERIFIED]** could not be confirmed against a primary source; items marked **[CONFLICT]** have sources that disagree.

---

## A. Security references

### A1. OWASP Top 10:2025 (web applications)

**Status/date.** Presented 11 Nov 2025 at OWASP Global AppSec USA; the ranked list is final, while the long-form write-up was still "in preview" at launch. (The Register, 2025-11-11, https://www.theregister.com/2025/11/11/new_owasp_top_ten_broken/). The official site (https://top10.owasp.org/2025 — note `owasp.org/Top10/2025` now 308-redirects there) calls this the "8th installment" and does not print an RC/final label on the index page (fetched 2026-10-20).

**The ten categories** (official list page, https://top10.owasp.org/2025 ; one-liners and CWE counts from the Introduction, https://top10.owasp.org/2025/0x00_2025-Introduction/, fetched 2026-10-20):

| # | Category | One line | Change vs 2021 |
|---|---|---|---|
| A01:2025 | Broken Access Control | Users act beyond intended permissions (40 CWEs) | Stays #1; **SSRF (2021 A10) folded in** |
| A02:2025 | Security Misconfiguration | Insecure/incomplete configuration across the stack (16 CWEs) | Up from #5 |
| A03:2025 | Software Supply Chain Failures | Compromise of dependencies, build and distribution systems (5 CWEs) | **New**; expands 2021 A06 Vulnerable & Outdated Components |
| A04:2025 | Cryptographic Failures | Weak/missing crypto leads to data exposure (32 CWEs) | Down from #2 |
| A05:2025 | Injection | Untrusted input executed as commands/queries (38 CWEs) | Down from #3 |
| A06:2025 | Insecure Design | Flaws rooted in design, not implementation | Down from #4 |
| A07:2025 | Authentication Failures | Weak identity verification / session handling (36 CWEs) | Stays #7; **renamed** from "Identification and Authentication Failures" |
| A08:2025 | Software or Data Integrity Failures | Code/data not verified for integrity or trust | Stays #8 |
| A09:2025 | Security Logging & Alerting Failures | Events logged but not alerted on | Stays #9; **renamed** from "Logging and Monitoring Failures" (alerting emphasised) |
| A10:2025 | Mishandling of Exceptional Conditions | Poor error handling, logic errors, fail-open (24 CWEs) | **New** |

Summary of deltas, quoting the Introduction: "There are two new categories and one consolidation in the Top Ten for 2025."

### A2. OWASP Top 10 for LLM Applications (2025 edition, v2.0)

**Date.** Announced 17 Nov 2024 (press release datelined 19 Nov 2024) by the OWASP GenAI Security Project (https://genai.owasp.org/2024/11/17/owasp-reveals-updated-2025-top-10-risks-for-llms-announces-new-llm-project-sponsorship-program-and-inaugural-sponsors/). Still the current LLM list as of 2026-10-20 (https://genai.owasp.org/llm-top-10/ shows only translation updates dated 2025).

| ID | Name | One line |
|---|---|---|
| LLM01:2025 | Prompt Injection | User/third-party prompts alter model behaviour or output in unintended ways |
| LLM02:2025 | Sensitive Information Disclosure | Model or app leaks PII, secrets, proprietary data |
| LLM03:2025 | Supply Chain | Vulnerable models, datasets, adapters, plugins and platforms |
| LLM04:2025 | Data and Model Poisoning | Pre-training, fine-tuning or embedding data is tampered with |
| LLM05:2025 | Improper Output Handling | Model output insufficiently validated/sanitised before downstream use |
| LLM06:2025 | Excessive Agency | LLM systems granted more capability/permission/autonomy than needed (expanded for agents) |
| LLM07:2025 | System Prompt Leakage | System prompts expose secrets or internal logic (**new**) |
| LLM08:2025 | Vector and Embedding Weaknesses | RAG/embedding stores poisoned, leaked or bypassed (**new**) |
| LLM09:2025 | Misinformation | Confident false output relied on by apps/users |
| LLM10:2025 | Unbounded Consumption | Resource/cost exhaustion, model extraction (**expanded** from Denial of Service) |

Sources: https://genai.owasp.org/llm-top-10/ (fetched 2026-10-20); new/expanded flags from the Nov 2024 announcement above.

### A2b. OWASP Top 10 for Agentic Applications (2026 edition)

**Date.** Published 9 Dec 2025 by the OWASP GenAI Security Project (official resource page: https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ — page shows the date but the list is only in the downloadable PDF). The list below was cross-checked against two secondary summaries that agree exactly on names: Cycode (https://cycode.com/blog/owasp-top-10-agentic-applications/, 2026-07-21) and Giskard (https://www.giskard.ai/knowledge/owasp-top-10-for-agentic-application-2026, 2025-12-18). One-liners are paraphrased from Cycode; **treat the descriptions (not the names) as secondary-sourced**.

| ID | Name | One line |
|---|---|---|
| ASI01 | Agent Goal Hijack | Attacker redirects the agent's objective via content it reads (indirect prompt injection; EchoLeak-style) |
| ASI02 | Tool Misuse & Exploitation | Legitimate tools turned to harm via deceptive inputs, poisoned tool metadata or unsafe chaining |
| ASI03 | Identity & Privilege Abuse | Shared/long-lived/over-scoped credentials let a hijacked agent reach far more than its task |
| ASI04 | Agentic Supply Chain Vulnerabilities | Compromised frameworks, connectors, MCP servers, prompts, incl. components loaded at runtime |
| ASI05 | Unexpected Code Execution (RCE) | Natural language or untrusted strings reach interpreters/subprocesses outside intended bounds |
| ASI06 | Memory & Context Poisoning | False data planted in memory/retrieval/context shapes future behaviour long after injection |
| ASI07 | Insecure Inter-Agent Communication | Agent-to-agent messages lack authn/integrity/authz: spoofing, tampering, replay |
| ASI08 | Cascading Failures | One bad decision or compromise propagates through trusting agents/workflows |
| ASI09 | Human-Agent Trust Exploitation | Agent output manipulates people into unsafe approvals |
| ASI10 | Rogue Agents | Agents operate outside policy via compromise, misalignment or drift while appearing legitimate |

### A3. OWASP API Security Top 10 (2023)

Source: https://api-security.owasp.org/editions/2023/en/0x11-t10 (the old `owasp.org/API-Security/...` path 308-redirects here; fetched 2026-10-20).

1. API1:2023 Broken Object Level Authorization — every ID-based access needs an authz check.
2. API2:2023 Broken Authentication — flawed auth lets attackers steal tokens / impersonate.
3. API3:2023 Broken Object Property Level Authorization — missing checks on individual fields (excess data exposure / mass assignment).
4. API4:2023 Unrestricted Resource Consumption — no limits on compute, bandwidth, storage, paid third-party calls.
5. API5:2023 Broken Function Level Authorization — confusing role hierarchies expose admin/other-user functions.
6. API6:2023 Unrestricted Access to Sensitive Business Flows — business flows abused at scale by automation.
7. API7:2023 Server Side Request Forgery — API fetches user-supplied URIs without validation.
8. API8:2023 Security Misconfiguration — complex/poorly secured configuration.
9. API9:2023 Improper Inventory Management — unknown hosts/versions, exposed debug endpoints.
10. API10:2023 Unsafe Consumption of APIs — over-trusting third-party API data.

### A4. Best-practice specifics worth citing

**Password hashing** (OWASP Password Storage Cheat Sheet, https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html, fetched 2026-10-20):
- Argon2id preferred. Minimum: m=19 MiB (19456 KiB), t=2, p=1. Equivalents: 46 MiB/t=1, 12 MiB/t=3, 9 MiB/t=4, 7 MiB/t=5 (all p=1).
- scrypt fallback: N=2^17 (128 MiB), r=8, p=1 (or N=2^16/p=2 ... N=2^13/p=10).
- bcrypt (legacy only): work factor >= 10, and remember the 72-byte input limit.
- PBKDF2 (FIPS-140 only): PBKDF2-HMAC-SHA256 600,000 iterations; SHA512 220,000; SHA1 1,400,000 (legacy).
- Pepper: keep in vault/HSM, not beside hashes; pepper compromise requires password resets.

**JWT pitfalls** — the OWASP "JSON Web Token for Java Cheat Sheet" is the canonical reference (https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_for_Java_Cheat_Sheet.html). **[PARTIALLY VERIFIED]**: the page returned 404 on two URL variants during this research; the list below is from search snippets of that page plus standard practice:
- `alg: none` bypass: explicitly pin the expected algorithm in the verifier; never read `alg` from the token to choose a key.
- Key/algorithm confusion (RS256 public key used as HS256 secret): same fix — pin algorithm and key type.
- Token sidejacking: bind token to a random "fingerprint" stored in a hardened cookie (`HttpOnly; Secure; SameSite; __Host-`), with its SHA-256 hash as a claim.
- No built-in revocation: keep a short `exp` and a server-side denylist.
- Storage: avoid `localStorage` (XSS-readable); prefer `HttpOnly` cookie or session storage with fingerprint.
- Weak HMAC secrets: use >= 256-bit random keys; validate `exp`, `iss`, `aud`.
- Payload is only base64: never put secrets/PII in claims unencrypted.

**CSP baseline** (OWASP CSP Cheat Sheet, https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html, fetched 2026-10-20):
- Strict (nonce): `script-src 'nonce-{RANDOM}' 'strict-dynamic'; object-src 'none'; base-uri 'none';` (nonce regenerated per response; don't let middleware stamp nonces on every script tag).
- Strict (hash): `script-src 'sha256-{HASH}' 'strict-dynamic'; object-src 'none'; base-uri 'none';`
- Non-strict fallback: `default-src 'none'; script-src 'self'; connect-src 'self'; img-src 'self'; style-src 'self'; frame-ancestors 'self'; form-action 'self';`
- Add `frame-ancestors` separately for clickjacking; use `Content-Security-Policy-Report-Only` first; `report-to` + `Reporting-Endpoints` (declare `report-uri` too for compatibility); send on every response; `<meta>` delivery cannot carry `frame-ancestors`, `sandbox`, `report-to`.

**Cookie flags** (OWASP Session Management Cheat Sheet, https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html, fetched 2026-10-20):
- `Set-Cookie: __Host-SessionID=<value>; Secure; HttpOnly; SameSite=Strict; Path=/` (no `Domain`; `__Host-` requires Secure + Path=/ + no Domain). `SameSite=Lax` acceptable; never `None` without `Secure`; SameSite is defence-in-depth, not a CSRF-token replacement.
- Session ID >= 64 bits entropy from a CSPRNG (>= 128 bits if you generate your own; 160+ for tokens).
- Idle timeout 2–5 min (high value) / 15–30 min (low risk); absolute timeout e.g. 4–8 h; enforce server-side; invalidate on logout.

**CORS** (OWASP HTML5 Security Cheat Sheet, https://cheatsheetseries.owasp.org/cheatsheets/HTML5_Security_Cheat_Sheet.html, fetched 2026-10-20): allowlist exact origins; never reflect `Origin` unchecked; `Access-Control-Allow-Origin: *` only on endpoints with no sensitive data; do not rely on the `Origin` header alone for access control; CORS is not CSRF protection; preflight may be skipped for simple GET/POST so those need their own checks. (The "no wildcard with credentials" rule is browser-enforced; not on this page.)

**Rate limiting / resource limits** (OWASP API4:2023 "How to prevent", https://api-security.owasp.org/editions/2023/en/0xa4-unrestricted-resource-consumption/, fetched 2026-10-20): cap memory/CPU/restarts/file descriptors/processes via containers or serverless; max sizes for all parameters, payloads, uploads; per-client rate limits per time window, tuned per endpoint, stricter on sensitive ones; throttle sensitive ops (OTP validation, password recovery); server-side validation of pagination/record-count params; spending limits or billing alerts for third-party services; set execution timeouts.

**Secrets scanning**
- gitleaks (https://github.com/gitleaks/gitleaks, fetched 2026-10-20): `brew install gitleaks`; `gitleaks git -v /path/to/repo` (history), `gitleaks dir -v /path` (files), `cat f | gitleaks -v stdin`; SARIF: `gitleaks git -f sarif -r results.sarif`; baseline: `gitleaks git --baseline-path report.json --report-path findings.json`; `.gitleaksignore` fingerprints or inline `gitleaks:allow`; pre-commit hook via `repo: https://github.com/gitleaks/gitleaks` (example pins v8.24.2). **Note:** README now states Gitleaks is feature-complete / security-patches only and the maintainer is focusing on **Betterleaks** (https://github.com/betterleaks/betterleaks).
- trufflehog (https://github.com/trufflesecurity/trufflehog, fetched 2026-10-20): `brew install trufflehog` or `curl -sSfL https://raw.githubusercontent.com/trufflesecurity/trufflehog/main/scripts/install.sh | sh -s -- -b /usr/local/bin`; `trufflehog git https://github.com/org/repo --results=verified`; `trufflehog filesystem path/`; `trufflehog github --org=ORG --results=verified`; Docker `trufflesecurity/trufflehog:latest`. (`--only-verified` is the old flag; current docs use `--results=verified`.)

**Dependency audit per ecosystem**
- npm (https://docs.npmjs.com/cli/v11/commands/npm-audit, fetched 2026-10-20): `npm audit`, `npm audit --audit-level=high` (sets failure threshold only), `npm audit --omit=dev`, `npm audit --json`, `npm audit fix`, `npm audit fix --force` (SemVer-major; docs strongly discourage without a plan). Exit 0 only when no vulns at/above level.
- Python (https://github.com/pypa/pip-audit, fetched 2026-10-20): `python -m pip install pip-audit`; `pip-audit`, `pip-audit -r requirements.txt`, `pip-audit .` (pyproject/pylock), `pip-audit --fix [--dry-run]`, `--strict`, `-f json|cyclonedx-json|cyclonedx-xml|markdown`, `-s osv` to use OSV instead of PyPI advisory DB. (SARIF not listed in README.)
- Rust (https://github.com/rustsec/rustsec/tree/main/cargo-audit, fetched 2026-10-20): `cargo install cargo-audit` (`--features=fix` for `cargo audit fix`); `cargo audit`, `cargo audit fix --dry-run`, `cargo audit --file path/Cargo.lock`, `--ignore RUSTSEC-YYYY-NNNN`; uses RustSec advisory-db.
- Any ecosystem (osv-scanner, https://google.github.io/osv-scanner/usage/, fetched 2026-10-20): `osv-scanner scan -r ./project/`, `osv-scanner scan -L package-lock.json`, `osv-scanner scan image my-img:tag`, `--format json`, `--output-file`; Docker `ghcr.io/google/osv-scanner`.

**SBOM** (Syft, https://github.com/anchore/syft, fetched 2026-10-20): `curl -sSfL https://get.anchore.io/syft | sudo sh -s -- -b /usr/local/bin`; `syft <image>`; `syft ./my-project`; `syft <image> -o cyclonedx-json`; `-o spdx-json=./spdx.json`; pair with Grype for vuln scanning. OWASP A03:2025 (supply chain) and the plugin-marketplace model make SBOM + lockfile pinning a direct mitigation.

**Semgrep quick start** (https://docs.semgrep.dev/getting-started/quickstart, fetched 2026-10-20): `pipx install semgrep` or `uv tool install semgrep` (brew lags); Python >= 3.10; `semgrep login` then `semgrep ci` in the repo; no-account path is `semgrep scan` (e.g. `semgrep scan --config auto` / `--config p/owasp-top-ten --sarif -o results.sarif` — flags from the CLI reference, **not re-verified on the quickstart page**).

**CodeQL quick start** (https://docs.github.com/en/code-security/codeql-cli/getting-started-with-the-codeql-cli/preparing-your-code-for-codeql-analysis and .../analyzing-your-code-with-codeql-queries, fetched 2026-10-20): `codeql database create <db> --language=<javascript-typescript|python|java-kotlin|c-cpp|csharp|go|ruby|rust|swift> [--command=<build>]` (omit `--command` for JS/TS, Python, Ruby); `codeql database analyze <db> codeql/<lang>-queries:codeql-suites/<lang>-security-and-quality.qls --format=sarif-latest --output=results.sarif --download`; `codeql resolve queries` lists suites; use `--sarif-category` when uploading multiple languages.

**AI recommendation poisoning / "Summarize with AI" prompt injection** (Microsoft Defender Security Research, 10 Feb 2026, https://www.microsoft.com/security/blog/2026/02/10/ai-recommendation-poisoning/): hidden prompts in "Summarize with AI" buttons and share links use URL prompt parameters (e.g. `?q=`) to pre-fill and sometimes auto-run an assistant; the prompt tells the assistant to "remember" the vendor as a trusted source so later answers are biased. 60-day email-traffic review found 50+ unique prompts from 31 companies across 14 industries; example URL formats were shown for Copilot, ChatGPT, Claude, Perplexity, Grok; an NPM package and a point-and-click generator were marketed as an "SEO growth hack for LLMs". Mitigations: hover links before clicking; treat AI links like executable downloads; audit/delete unrecognised memories; ask assistants to cite the basis for recommendations; don't paste prompts from untrusted sources; orgs should hunt for assistant URLs containing "remember", "trusted source", "in future conversations", "authoritative source" (Defender Advanced Hunting queries provided). Vendor-side controls described: prompt filtering, separating user instructions from external content, user-visible memory controls, monitoring. This maps directly to OWASP ASI06 Memory & Context Poisoning.

**Indirect prompt injection defenses recommended by vendors (2025–2026)**
- Microsoft, Learn "Defend against indirect prompt injection attacks" (ms.date 2026-03-19, https://learn.microsoft.com/en-us/security/zero-trust/sfi/defend-indirect-prompt-injection): layered probabilistic + deterministic controls — Prompt Shields; Spotlighting (data-marking/delimiting untrusted content); plan-drift detection; critic agents; tool-chain analysis; in-skill guardrails; information-flow control / quarantined inference; least privilege with short-lived privileges; human-in-the-loop for risky actions; "assume injection will happen" and design for containment. Earlier MSRC write-up: https://www.microsoft.com/msrc/blog/2025/07/how-microsoft-defends-against-indirect-prompt-injection-attacks (July 2025).
- Anthropic, "Prompt injection defenses" (24 Nov 2025, https://www.anthropic.com/research/prompt-injection-defenses): RL training to refuse injected instructions; classifiers that scan all untrusted content entering context (hidden text, manipulated images, deceptive UI) and steer the model on detection; continuous red-teaming; reported ~1% attack success vs an adaptive best-of-N attacker. Support article "Using Claude in Chrome safely" (https://support.claude.com/en/articles/12902428-using-claude-in-chrome-safely, fetched 2026-10-20) adds: site permissions/allow-blocklists, blocked categories, confirmations for high-risk actions, a second classifier that checks each action before it runs, "Automatically approve" mode self-screens actions, and user advice (separate browser profile, manual-approve mode for sensitive tasks, stop if the agent drifts). **[CONFLICT]** that article cites "<0.08%" with Opus 4.8 while the Nov 2025 research post cites ~1%; a Gigazine report claims 0% — treat the 0% claim as unverified.
- OpenAI: no primary 2026 guidance page was located in this research. Secondary coverage (Oct 2025 Atlas launch) describes Watch Mode, Logged-Out Mode, isolated in-memory agent sessions, and the CISO calling prompt injection "unsolved"; one secondary source says Atlas was retired July–Aug 2026 with capabilities moved to the ChatGPT desktop app/Chrome extension. **[UNVERIFIED — secondary sources only]**.
- Academic 2026 trend worth a sentence: "memory-boundary" defenses (filters that re-check content after summarisation into persistent memory) and origin/provenance-tagged policy enforcement (e.g. arXiv 2607.29167, 2608.27496) — research signals, not vendor guidance.

---

## B. Claude Skills: format and installation

### B1. Agent Skills format spec (agentskills.io)

Source: https://agentskills.io/specification (fetched 2026-10-20). Reference implementation/validator: https://github.com/agentskills/agentskills/tree/main/skills-ref (`skills-ref validate ./my-skill`). Anthropic's repo mirrors the spec at `./spec` (https://github.com/anthropics/skills).

Directory layout:
```
skill-name/
├── SKILL.md       # required: YAML frontmatter + Markdown body
├── scripts/       # optional: executable code
├── references/    # optional: docs loaded on demand (REFERENCE.md, FORMS.md, domain files)
├── assets/        # optional: templates, images, data files
└── ...
```

Frontmatter fields:
| Field | Required | Constraints |
|---|---|---|
| `name` | Yes | 1–64 chars; lowercase a–z, 0–9, hyphens; no leading/trailing hyphen; no `--`; **must match parent directory name** |
| `description` | Yes | 1–1024 chars, non-empty; what it does AND when to use it, with trigger keywords |
| `license` | No | License name or bundled-file reference |
| `compatibility` | No | 1–500 chars; environment requirements only (product, packages, network) |
| `metadata` | No | Map of string→string (e.g. `author`, `version`); use unique key names |
| `allowed-tools` | No | Space-separated pre-approved tools, e.g. `Bash(git:*) Bash(jq:*) Read` — **Experimental**, support varies |

Body: no format restrictions; recommended sections are step-by-step instructions, input/output examples, edge cases. Progressive disclosure: metadata (~100 tokens) always loaded; SKILL.md body (<5000 tokens recommended) on activation; resources on demand. **Keep SKILL.md under 500 lines**; keep file references one level deep from SKILL.md, using relative paths.

Claude.ai-specific overlay (support article "How to create custom skills", https://support.claude.com/en/articles/12512198, fetched 2026-10-20): `description` limited to **200 characters** on claude.ai uploads; `name` 64 chars; an optional `dependencies` field (e.g. `python>=3.8`) is mentioned. **[CONFLICT]** claude.com/docs/skills/how-to says description up to 1,024 (spec limit); the support article says 200 — assume 200 to be safe for uploads. Claude Code adds many extra fields (see B2) but **uploads to claude.ai / Skills API accept only** `name`, `description`, `license`, `compatibility`, `metadata`, `allowed-tools`; any other field makes the upload fail (https://code.claude.com/docs/en/skills).

### B2. Installing custom skills in Claude Code

Source: https://code.claude.com/docs/en/skills (fetched 2026-10-20).

Where skills live:
| Scope | Path |
|---|---|
| Personal | `~/.claude/skills/<name>/SKILL.md` (all projects; **not** read by Cowork or cloud sessions) |
| Project | `.claude/skills/<name>/SKILL.md` (commit to share) |
| Nested | `<subdir>/.claude/skills/<name>/SKILL.md` |
| `--add-dir` | `.claude/skills/` inside the added directory |
| Plugin | `<plugin>/skills/<name>/SKILL.md`, invoked as `/plugin-name:skill-name` |
| Enterprise | managed settings directory |
| claude.ai account | synced into `~/.claude/skills/synced/` (read-only; disable with `syncClaudeAiSkills`) |

Install by hand: `mkdir -p ~/.claude/skills/my-skill` and write `SKILL.md`; picked up in the current session (run `/reload-skills` if you created a new top-level skills dir). Precedence on name clash: enterprise > personal > project. Reserved names: `synced`, `anthropic-skills*`. Validate with `claude plugin validate ~/.claude/skills` (v2.1.233+).

Claude Code frontmatter extras (all optional; only `description` recommended): `name` (defaults to dir name), `when_to_use`, `argument-hint`, `arguments`, `disable-model-invocation`, `user-invocable`, `allowed-tools`, `disallowed-tools`, `model`, `effort`, `context: fork`, `agent`, `background`, `hooks`, `paths`, `shell`, plus spec fields `metadata`, `license`, `compatibility`. Description + `when_to_use` combined truncated at 1,536 chars in the listing; listing budget is 1% of context (`skillListingBudgetFraction`). `` !`command` `` inlines shell output; `$ARGUMENTS` substitution.

Plugins and marketplaces (https://code.claude.com/docs/en/plugin-marketplaces, https://code.claude.com/docs/en/plugins/marketplace-reference, https://code.claude.com/docs/en/plugins-reference, https://code.claude.com/docs/en/plugins/publish — all fetched 2026-10-20):
- In-session: `/plugin marketplace add owner/repo` (also `owner/repo@ref`, a git URL, or a local path), `/plugin install name@marketplace`, `/plugin uninstall name@marketplace`, `/reload-plugins`. One-shot: `/plugin install name --marketplace owner/repo` (v2.1.275+).
- Shell: `claude plugin marketplace add <owner/repo|url|path>`, `claude plugin install name@marketplace` (or `--marketplace owner/repo`, v2.1.292+), `claude plugin list`, `claude plugin details <name>`, `claude plugin update name@marketplace`, `claude plugin validate [--strict] ./dir`, `claude --plugin-dir ./plugin` (one session), `--plugin-url <zip>`.
- Example from Anthropic: `/plugin marketplace add anthropics/skills` then `/plugin install example-skills@anthropic-agent-skills` (README, https://github.com/anthropics/skills). Official catalog: `/plugin marketplace add anthropics/claude-plugins-official`, `/plugin install skill-creator@claude-plugins-official`.
- Settings: `extraKnownMarketplaces` (user), `strictKnownMarketplaces` / `blockedMarketplaces` (admin policy).

`.claude-plugin/marketplace.json` (required: `name`, `owner.name`, `plugins[]` each with `name` + `source`):
```json
{
  "name": "my-marketplace",
  "description": "Plugins for my team",
  "owner": { "name": "Your Name", "email": "...", "url": "..." },
  "metadata": { "pluginRoot": "./plugins" },
  "plugins": [
    { "name": "my-first-plugin", "source": "./plugins/my-first-plugin", "description": "...", "version": "1.0.0", "category": "...", "tags": ["..."] },
    { "name": "other", "source": { "source": "github", "repo": "org/other", "ref": "v2.0.0", "sha": "<40-hex>" } },
    { "name": "mono", "source": { "source": "git-subdir", "url": "org/monorepo", "path": "tools/mono" } }
  ]
}
```
Source types: relative path (must start `./`, no `..`), `github`, `url` (any git URL), `git-subdir`, `npm`, `archive` (https zip + `sha256`), `command`. Marketplace `name` must be letters/digits/`.`/`_`/`-`; many reserved names (e.g. `claude-plugins-official`, `anthropic-*`, `npm`, `github`, `claudeai-*`). Entry `name` must equal the plugin's `plugin.json` `name`. Claude Desktop additionally rejects marketplace/plugin names over 128 chars and the names `org`, `org-provisioned`, `unknown`.

`.claude-plugin/plugin.json` (optional; only `name` required; kebab-case; names starting `claude-`, `anthropic-`, `cc-plugin-` are refused):
```json
{
  "name": "deploy-tools", "displayName": "Deploy Tools", "version": "1.2.0",
  "description": "...", "author": { "name": "Example Team", "email": "...", "url": "..." },
  "homepage": "https://...", "repository": "https://github.com/...", "license": "MIT",
  "keywords": ["deployment"], "defaultEnabled": true, "dependencies": ["secrets-vault"],
  "skills": ["./extra-skills/"], "commands": { "status": { "source": "./commands/status.md" } },
  "agents": ["./agents/reviewer.md"], "hooks": "./config/extra-hooks.json",
  "mcpServers": { "deploy-api": { "command": "node", "args": ["${CLAUDE_PLUGIN_ROOT}/server.js"] } },
  "userConfig": { "api_token": { "type": "string", "title": "API token", "description": "...", "sensitive": true } }
}
```
Standard layout: `.claude-plugin/plugin.json`, `skills/<name>/SKILL.md`, `commands/`, `agents/`, `hooks/hooks.json`, `.mcp.json`, `.lsp.json`, `bin/` (Claude Code only — claude.ai/Cowork refuse plugins with a top-level `bin/`), `settings.json`. A plugin with `SKILL.md` at its root and no `skills/` loads as a single skill. A `CLAUDE.md` at plugin root is ignored. Every component path must start with `./` and stay inside the plugin root.

**`npx skills add` (Vercel "skills" CLI / skills.sh)** — exists. Launched 20 Jan 2026 (https://vercel.com/changelog/introducing-skills-the-open-agent-skills-ecosystem); docs https://vercel.com/docs/agent-resources/skills (last_updated 2026-09-15); repo https://github.com/vercel-labs/skills (Node >= 22.20; README fetched 2026-10-20).
- `npx skills add <owner/repo>` (also URL or local path); `--skill <name>` for one skill from a multi-skill repo; `-g` installs to user dir instead of project; `-a claude-code` targets an agent; `-y` non-interactive; `-l` list without installing.
- Other commands: `npx skills find <query>`, `list`, `update`, `remove`, `check`, `init <name>` (scaffold), `use <source>@<skill>` (run without installing), `experimental_sync`.
- For Claude Code it writes to `.claude/skills/` (project) or `~/.claude/skills/` (`-g`) (https://github.com/vercel-labs/skills/blob/main/docs/agents.md). Supports ~79 agent targets.
- Discovery rules (docs/creating-skills.md): `SKILL.md` at repo root; `skills/` (and `skills/.curated|.experimental|.system`), plus `.claude/skills/`, `.agents/skills/` etc., walked up to 3 levels deep; `--full-depth` to search everywhere; it also reads `.claude-plugin/marketplace.json` / `plugin.json` to find declared skills, so a Claude Code marketplace repo is automatically `npx skills add`-compatible. `metadata.internal: true` hides a skill unless `INSTALL_INTERNAL_SKILLS=1`.
- Publishing: no publish step — any public GitHub repo with valid SKILL.md files is installable; skills.sh lists/ranks by installs (secondary sources; **[UNVERIFIED]** for exact ranking mechanics).

### B3. Installing custom skills in Claude Desktop app and claude.ai

Primary sources: support article "Using skills in Claude" (https://support.claude.com/en/articles/12512180-using-skills-in-claude, "updated over 3 weeks ago" as of 2026-10-20); https://claude.com/docs/skills/how-to; https://claude.com/docs/skills/overview; https://claude.com/docs/cowork/guide/plugins; https://claude.com/docs/plugins/overview; https://claude.com/docs/plugins/platform-support (all fetched 2026-10-20).

**Prerequisite — code execution toggle.** Free/Pro/Max: **Settings > Capabilities > "Code execution and file creation"** = ON. Team/Enterprise: an Owner enables it under **Organization settings > Plugins & skills > Policy** (Enterprise must enable both code execution and Skills; Team has it on by default). Without it skills appear greyed out.

**Exact upload steps (same in claude.ai web and the Claude Desktop app):**
1. Package the skill: folder named exactly as `name`; zip from the parent so the archive is `my-skill.zip → my-skill/SKILL.md` (`zip -r my-skill.zip my-skill/`; verify with `unzip -l`). One skill per zip; `SKILL.md` at the zip root is NOT recognised.
2. Open the left sidebar → **Customize** → **Skills** (the older path was Settings > Capabilities > Skills; current docs use Customize).
3. Click **+** → **+ Create skill** → **Upload a skill** → choose the ZIP.
4. The skill appears under **Your skills > Created by you**; toggle it **on** (row switch or switch at top of its page).
5. Use it: describe a matching task, or type `/` in the message box and pick the skill.
Common upload failures: zip over size limit (limit not published), folder name ≠ `name`, missing SKILL.md, invalid characters in name/description, or unsupported frontmatter fields (only `name`, `description`, `license`, `compatibility`, `metadata`, `allowed-tools`).
Alternatives: **Create skill** opens an in-app editor; "Edit with Claude" on skill files; on Pro/Max/Team the Mac desktop app can **record a skill in Cowork** (not on Windows, Free or Enterprise, per the support article).

**Plan differences. [CONFLICT]** support.claude.com says skills are available on Free, Pro, Max, Team, Enterprise; claude.com/docs/skills/overview says Pro, Max, Team, Enterprise. Safe statement: custom-skill upload works on all paid plans and (per the support article) Free. Free/Pro/Max: skills are private to the account, no sharing/publishing. Team/Enterprise: admins can provision org-wide; users can **Share** with specific people or **Publish to org** (if the admin allows "User-created skills", "Skill sharing", "Share with organization"); Enterprise adds group sharing, optional security scanning of third-party skills, and custom roles restricting "Create skills"/"Share skills with groups". HIPAA/regulated orgs have sharing off by default.

**Does Claude Desktop read `~/.claude/skills/`?** Partly. Cowork and cloud sessions do **not** read `~/.claude/skills/`; they load skills enabled on the claude.ai account, synced at session start and managed from **Customize** in the Desktop app. The Desktop app's **Code tab** is Claude Code, so it reads local skills like the terminal. **Desktop scheduled tasks run locally and DO load `~/.claude/skills/`.** Conversely, a terminal signed into claude.ai downloads account skills to `~/.claude/skills/synced/` (read-only). Source: https://code.claude.com/docs/en/skills.

**Cowork and plugins.** Cowork uses skills and plugins (chat does not load plugins' agents/hooks; Cowork does). Plugins page: **Customize > Plugins** → **Discover** (Anthropic directory; Pro/Max/Team/Enterprise) → **Install**; or **Add > Add marketplace** and enter `https://github.com/owner/repo` or `owner/repo` (GitHub, GitHub Enterprise, public GitLab/Bitbucket; private GitHub needs the Claude GitHub App); or **Add > Upload plugin** with a `.zip`/`.plugin` containing one `.claude-plugin/plugin.json`. "Check for updates" or "Sync automatically" per marketplace. Limits: plugin 200 MB uncompressed / 5,000 files; marketplace archive 512 MB; 500 plugins per marketplace; 25 self-added marketplaces per account per org. Installed plugins are account-scoped and appear in chat, Cowork and Claude Code (as `<name>@synced`, after `/reload-plugins`); plugins installed from the Claude Code CLI stay on that machine. Team/Enterprise owners can make plugins Not available / Available / Installed by default / Required, and sync an org marketplace repo from organization settings (https://claude.com/docs/plugins/admin).

Component support by surface (platform-support page): Skills — Chat, Cowork, Code; Commands — all (chat loads them as skills); Agents and Hooks — Cowork + Code only; remote MCP — all (via Connectors tab); local MCP/`.mcpb` — Cowork (local session) + Code; `bin/` — Code only, refused elsewhere; LSP/output styles/themes — Code only.

### B4. Publishing skills on GitHub for one-command install

Two complementary layouts (Claude Code docs https://code.claude.com/docs/en/plugins/publish and https://code.claude.com/docs/en/plugin-marketplaces; Vercel docs above):

**Minimal single-plugin repo** (install with `claude plugin marketplace add owner/repo && claude plugin install my-skills@owner-marketplace`, or in-session `/plugin install my-skills --marketplace owner/repo`):
```
repo/
├── .claude-plugin/
│   ├── plugin.json        { "name": "my-skills", "version": "1.0.0", "description": "...", "author": {"name": "..."} }
│   └── marketplace.json   { "name": "owner-marketplace", "owner": {"name": "..."}, "plugins": [{ "name": "my-skills", "source": "./" }] }
├── skills/
│   ├── skill-a/SKILL.md
│   └── skill-b/SKILL.md
├── README.md              # required for directory submission
└── LICENSE
```
This same repo is `npx skills add owner/repo` compatible (the CLI reads `skills/` and the `.claude-plugin` manifests), and can be added in Claude Desktop/claude.ai via **Customize > Plugins > Add > Add marketplace > owner/repo**, and in Cowork via **Customize > Plugins > Add marketplace**. Keep entry `name` == `plugin.json` `name`; bump `version` on every release (or omit it so the commit SHA is used); run `claude plugin validate --strict .` before pushing; optional `claude plugin tag --push`. Never rename a published plugin (use `renames` map). For the public Anthropic directory, submit at https://claude.ai/directory/manage (paid plan; review + security scan).

**Multi-plugin marketplace repo**: `.claude-plugin/marketplace.json` at root with `plugins/` subfolders each containing their own `.claude-plugin/plugin.json` and `skills/`; validate with `claude plugin validate ./`.

**skill-creator packaging recommendation** (https://raw.githubusercontent.com/anthropics/skills/main/skills/skill-creator/SKILL.md, fetched 2026-10-20): packaging is `python -m scripts.package_skill <path/to/skill-folder>`, producing a **`.skill` file** (a zip with the `.skill` extension) that claude.ai users download/upload; it only packages when a `present_files` tool exists (i.e. inside claude.ai/Cowork). Guidance: keep SKILL.md under 500 lines; reference files >300 lines get a table of contents; keep all "when to use" wording in the description (make it slightly "pushy" because Claude under-triggers); frontmatter `name` + `description` required, `compatibility` rarely needed; evals via `python -m scripts.run_loop` / `aggregate_benchmark`. For manual packaging, claude.com/docs/skills/how-to prescribes `zip -r my-skill.zip my-skill/` from the parent directory and validation with `skills-ref validate ./my-skill` or `claude plugin validate`.

---

## Flags summary
- **[CONFLICT]** Skills plan availability: Free included (support.claude.com) vs paid-only (claude.com/docs/skills/overview).
- **[CONFLICT]** claude.ai description limit: 200 chars (support article) vs 1,024 (claude.com how-to / spec).
- **[CONFLICT]** Claude-in-Chrome prompt-injection success rate: ~1% (Nov 2025 research) vs <0.08% (support article, Opus 4.8) vs 0% (Gigazine, unverified).
- **[PARTIAL]** OWASP JWT cheat sheet page 404'd on fetch; content from snippets + standard practice.
- **[UNVERIFIED]** OpenAI 2026 prompt-injection guidance and Atlas retirement (secondary only); skills.sh ranking mechanics; claude.ai zip size limit (third-party claims 50 MB; not in Anthropic docs).
- **[SECONDARY]** OWASP Agentic ASI one-line descriptions (names confirmed by two sources; official PDF not parsed).
- Note: Gitleaks README says the project is feature-complete and maintainers moved to Betterleaks.

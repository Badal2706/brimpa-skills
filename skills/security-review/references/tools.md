# Tools and standards mapping

Exact commands for the scanners this skill relies on, and the mapping from OWASP categories to the checklist sections. Commands and flags were checked against the projects' documentation as of Oct 2026; run `<tool> --help` if a flag has moved. Every tool below is a lead generator: a scanner hit is a candidate, never a confirmed finding (see `severity-and-reporting.md`).

Run scanners in a clean working copy or CI, never with production credentials in the environment, and store their output redacted (secret scanners print the secrets they find).

## Table of contents

1. [Secret scanning](#1-secret-scanning)
2. [Dependency audit per ecosystem](#2-dependency-audit-per-ecosystem)
3. [SBOM](#3-sbom)
4. [Static analysis: Semgrep](#4-static-analysis-semgrep)
5. [Static analysis: CodeQL](#5-static-analysis-codeql)
6. [Putting it in CI](#6-putting-it-in-ci)
7. [OWASP Top 10:2025 mapping](#7-owasp-top-102025-mapping)
8. [OWASP API Security Top 10 (2023) mapping](#8-owasp-api-security-top-10-2023-mapping)

## 1. Secret scanning

**gitleaks** (as of Oct 2026 the README states the project is feature-complete and receives security patches only; the maintainer's successor project is Betterleaks - check it if gitleaks stops matching new key formats).

```bash
brew install gitleaks                      # or download a release binary
gitleaks git -v /path/to/repo              # full git history
gitleaks dir -v /path/to/dir               # working files only (no history)
cat somefile | gitleaks -v stdin           # one stream
gitleaks git -f sarif -r results.sarif     # SARIF for code-scanning upload
gitleaks git --baseline-path report.json --report-path findings.json   # ignore a known baseline
```

Suppress true false positives with a `.gitleaksignore` file (fingerprints) or an inline `gitleaks:allow` comment - never by disabling a rule class. Pre-commit hook: add the `https://github.com/gitleaks/gitleaks` repo to `.pre-commit-config.yaml` pinned to a release tag.

**trufflehog**

```bash
brew install trufflehog
# or: curl -sSfL https://raw.githubusercontent.com/trufflesecurity/trufflehog/main/scripts/install.sh | sh -s -- -b /usr/local/bin
trufflehog git file://. --results=verified          # local repo history, only credentials that verify live
trufflehog git https://github.com/org/repo --results=verified
trufflehog filesystem ./path                        # files, including build output and images unpacked to disk
trufflehog github --org=ORG --results=verified      # whole organization (needs a token with read scope)
# Docker: docker run --rm -v "$PWD:/pwd" trufflesecurity/trufflehog:latest git file:///pwd --results=verified
```

`--results=verified` replaces the older `--only-verified` flag. "Verified" means the credential was checked against the provider and is live: treat every verified hit as an incident requiring rotation (steps in `fix-patterns.md`).

Also grep for the things scanners miss: `NEXT_PUBLIC_`, `VITE_`, `REACT_APP_`, `EXPO_PUBLIC_` variables holding server secrets; `-----BEGIN`; `service_role`; database URLs with embedded passwords; `.env` files inside container images (`docker history`, or unpack with `syft`/`dive`).

## 2. Dependency audit per ecosystem

**npm / pnpm / yarn**

```bash
npm audit                          # report
npm audit --audit-level=high       # exit non-zero only at high or above (threshold for CI gating)
npm audit --omit=dev               # production dependencies only
npm audit --json > audit.json
npm audit fix                      # semver-compatible fixes only
# npm audit fix --force applies major upgrades; the docs strongly discourage it without a plan and tests
npm ci                             # strict install from the lockfile (use in CI, never npm install)
```

pnpm: `pnpm audit`, `pnpm install --frozen-lockfile`. yarn: `yarn npm audit` (berry) or `yarn audit` (classic), `yarn install --immutable`.

**Python**

```bash
python -m pip install pip-audit
pip-audit                               # current environment
pip-audit -r requirements.txt           # a requirements file
pip-audit .                             # pyproject / lockfile in the project
pip-audit --fix --dry-run               # show what an automatic upgrade would do
pip-audit --strict                      # fail on any issue including skipped packages
pip-audit -f json                       # also: cyclonedx-json, cyclonedx-xml, markdown
pip-audit -s osv                        # query OSV instead of the PyPI advisory database
pip install --require-hashes -r requirements.txt   # strict install
```

**Rust**

```bash
cargo install cargo-audit               # add --features=fix for `cargo audit fix`
cargo audit                             # uses the RustSec advisory database
cargo audit fix --dry-run
cargo audit --file path/to/Cargo.lock
cargo audit --ignore RUSTSEC-YYYY-NNNN  # only with a written justification and a date
```

**Any ecosystem, lockfiles and container images: osv-scanner**

```bash
osv-scanner scan -r ./project/                 # recurse and detect lockfiles
osv-scanner scan -L package-lock.json          # one lockfile
osv-scanner scan image my-image:tag            # container image
osv-scanner scan -r . --format json --output-file osv.json
# Docker: ghcr.io/google/osv-scanner
```

Also covers Go (`go.mod`), Java/Kotlin (Maven/Gradle lockfiles), PHP (`composer.lock`), Ruby (`Gemfile.lock`), .NET and more. For Go specifically, `govulncheck ./...` adds reachability analysis.

Triage rule: for each advisory record package, installed version, fixed version, severity, whether the vulnerable function is reachable from this app, and the decision (upgrade / replace / accept with date and owner). Never leave an un-triaged High or Critical at launch.

## 3. SBOM

**syft** (pair with **grype** for vulnerability matching against the SBOM):

```bash
curl -sSfL https://get.anchore.io/syft | sudo sh -s -- -b /usr/local/bin
syft ./my-project                       # table output
syft my-image:tag -o cyclonedx-json > sbom.cdx.json
syft my-image:tag -o spdx-json=./sbom.spdx.json
grype sbom:./sbom.cdx.json              # scan the SBOM
```

An SBOM plus lockfile pinning is a direct mitigation for OWASP A03:2025 (Software Supply Chain Failures) and is what enterprise security questionnaires increasingly ask for. Regenerate it per release and attach it to the release artifact.

## 4. Static analysis: Semgrep

```bash
pipx install semgrep          # or: uv tool install semgrep   (Python >= 3.10)
semgrep --version
# No-account path:
semgrep scan --config auto                                   # auto-selects rules for detected languages
semgrep scan --config p/owasp-top-ten --sarif -o semgrep.sarif  # OWASP ruleset, SARIF output
semgrep scan --config p/security-audit --config p/secrets    # broader security + secrets rules
# With an account (adds cross-file taint analysis and PR comments):
semgrep login && semgrep ci
```

Ruleset names (`p/...`) are registry identifiers; confirm them with `semgrep scan --help` and the registry if one is not found. Semgrep findings are pattern matches: each one needs the source -> sink trace before it becomes a finding.

## 5. Static analysis: CodeQL

```bash
# Create a database (omit --command for JavaScript/TypeScript, Python and Ruby; compiled languages need the build command)
codeql database create ./codeql-db --language=javascript-typescript
codeql database create ./codeql-db --language=java-kotlin --command="./gradlew build"
# Languages: javascript-typescript, python, java-kotlin, c-cpp, csharp, go, ruby, rust, swift

# Analyze with the security-and-quality suite, SARIF output
codeql database analyze ./codeql-db \
  codeql/javascript-queries:codeql-suites/javascript-security-and-quality.qls \
  --format=sarif-latest --output=codeql.sarif --download

codeql resolve queries codeql/javascript-queries   # list available suites
# Use --sarif-category=<lang> when uploading results for several languages to one repository
```

CodeQL's taint-tracking queries are the strongest free source for injection and SSRF candidates; its authorization coverage is weak by nature, so IDOR/BFLA still need the manual actor x object matrix.

## 6. Putting it in CI

Minimum pipeline for a small team (run on every PR; fail the build on new Highs):

1. Strict install from the lockfile (`npm ci` / `--frozen-lockfile` / `--require-hashes`).
2. Secret scan on the diff (gitleaks or trufflehog) plus a weekly full-history scan.
3. Dependency audit (`npm audit --audit-level=high`, `pip-audit --strict`, `cargo audit`, or `osv-scanner`) with a triage file for accepted advisories.
4. SAST (Semgrep `--config auto` or CodeQL) with SARIF uploaded to the code-scanning view.
5. A header/cookie assertion test against a built preview (session cookie flags, CSP present, CORS not reflecting).
6. Pin every CI action to a commit SHA; give PR-triggered workflows read-only tokens and no deploy secrets.

## 7. OWASP Top 10:2025 mapping

As of Oct 2026, OWASP Top 10:2025 (presented Nov 2025) is the current web edition. Use it unless the user needs the 2021 edition for a specific compliance checklist, and label the report with the edition used. Changes from 2021: SSRF folded into A01; A03 Software Supply Chain Failures expands the old Vulnerable and Outdated Components; A10 Mishandling of Exceptional Conditions is new; Security Misconfiguration moved from #5 to #2; A07 renamed to Authentication Failures; A09 renamed to emphasise alerting.

| OWASP 2025 | Checklist sections | QUICK prompts | Typical tool lead |
|---|---|---|---|
| A01 Broken Access Control (incl. SSRF) | 3 Authorization, 4 (role-transition and step-token binding items), 5 (SSRF items), 15 (GraphQL/WebSocket authz) | 1, 4 | Manual actor x object matrix; CodeQL/Semgrep for SSRF sinks |
| A02 Security Misconfiguration | 7 Secrets and configuration, 11 Headers/CORS/CSP, 12 Cloud/CI, 9 (a resource bound that exists but is mis-set or disabled), 18 (mail authentication) | 9, 10 | Header assertion tests; rendered-config review |
| A03 Software Supply Chain Failures | 13 Supply chain | 6 | npm audit / pip-audit / cargo audit / osv-scanner, syft |
| A04 Cryptographic Failures | 10 Cryptography, 2 (token properties), 14 (backup key scope) | 2, 9 | Semgrep crypto rules; manual review |
| A05 Injection | 5 Input validation and injection, 16 (DOM XSS) | 4 | Semgrep, CodeQL taint queries |
| A06 Insecure Design | 4 Business logic, 3 (parallel paths), 9 (abuse controls; no bound on resource use by design, e.g. a limiter map that grows per key), 18 (open mail relay) | 1, 3 | Manual only; threat model |
| A07 Authentication Failures | 1 Authentication, 2 Sessions and tokens | 2, 3 | Semgrep JWT rules; manual |
| A08 Software or Data Integrity Failures | 13 (signatures, pinning), 15 (webhook signatures), 5 (deserialization) | 6, 10 | osv-scanner image scan; manual |
| A09 Security Logging and Alerting Failures | 8 Error handling and logging | 7 | Manual only; never "passed" from a black-box run |
| A10 Mishandling of Exceptional Conditions | 8 Error handling, 9 (cleanup on timeout/disconnect, retry ceilings, malformed-record quarantine), 3/7/12 (fail-closed items) | 7 | Semgrep; manual fail-open review |

Resource exhaustion and unbounded consumption are **not** A10, which covers fail-open branches, unhandled errors and missing cleanup on failure. Map unbounded consumption to A06 Insecure Design when the design has no bound, or A02 Security Misconfiguration when a bound exists but is mis-set or disabled, plus API4:2023 for APIs. A process crash on malformed input is A10.

## 8. OWASP API Security Top 10 (2023) mapping

Apply in addition to the web list for any REST, GraphQL or gRPC API.

| API Top 10 (2023) | Checklist sections | QUICK prompts |
|---|---|---|
| API1 Broken Object Level Authorization | 3 (object-level items) | 1 |
| API2 Broken Authentication | 1, 2 | 2 |
| API3 Broken Object Property Level Authorization (excess data exposure + mass assignment) | 3 (body-field override), 5 (schema validation), fix-patterns mass-assignment row | 1, 4 |
| API4 Unrestricted Resource Consumption | 9 Rate limiting and availability, 18 (send caps), fix-patterns section 10 | 3 |
| API5 Broken Function Level Authorization | 3 (function-level items) | 1 |
| API6 Unrestricted Access to Sensitive Business Flows | 4 Business logic, 9 (CAPTCHA, budgets) | 3 |
| API7 Server Side Request Forgery | 5 (SSRF items), 12 (metadata service), fix-patterns section 12 | 4 |
| API8 Security Misconfiguration | 7, 11, 12 | 9, 10 |
| API9 Improper Inventory Management | Scope and inputs (schema, versions), 3 (route shadowing), 7 (debug endpoints) | 10 |
| API10 Unsafe Consumption of APIs | 15 (webhooks, third-party data treated as untrusted), 5 (validation of upstream responses) | 10 |

For LLM-backed features the OWASP Top 10 for LLM Applications (2025) and the OWASP Top 10 for Agentic Applications (2026) apply; those are covered by the `llm-app-security` skill.

---
name: security-review
description: Pre-production / pre-launch application security review for web apps, APIs, mobile backends, SaaS and the cloud/CI around them. Use whenever the user asks for a security review, security audit, pentest-style check, hardening pass, OWASP Top 10 check, "is my app safe to launch", or is about to ship, deploy, go live or onboard real users (even if they never say "security"); also when they mention rate limiting, IDOR, auth bugs, leaked API keys or secrets, dependency vulnerabilities, file uploads, CORS, security headers, JWT, Supabase/Postgres RLS, webhooks, or a vibe-coded app going to production. Two modes - QUICK (30-60 min, ten pasteable prompts) and FULL (category-by-category review with evidence, severity calibration, counter-evidence checks and a written report). Defensive, audit-check level only. For LLM or agent features use llm-app-security; for privacy law and consent use dpdp-legal-compliance.
license: MIT
metadata:
  author: Brimpa
  version: "1.2"
  updated: "2026-10-30"
---

# Security Review (pre-production / pre-launch)

A defensive application-security review for web apps, APIs, mobile backends, SaaS products and the cloud/CI around them. It verifies controls and names the secure configuration. It never produces attack tooling, never probes production or shared infrastructure, and never reports a guess as a finding.

- **QUICK** - 30-60 minutes, ten pasteable prompts. For a solo-built or vibe-coded app the week before launch, a small client site with a login, or a re-check before a release.
- **FULL** - a systematic pass through every category with evidence, severity calibration, counter-evidence checks and a written report. For multi-tenant SaaS, anything handling health/finance/HR data, a customer security questionnaire, or the first review a codebase has ever had.

## How to run this

1. **Confirm authorization and environment.** Review only code and systems the user owns or is authorized to test. Prefer a local or staging environment with dummy data; production is read-only (config review at most). Say this out loud before the first check.
2. **Collect the inputs** in the table below. Ask for what is missing; never fabricate tenants, accounts or IDs. Most real bugs live behind login, so a review without test accounts covers only the marketing surface - say so if that is the situation.
3. **Pick the mode** (criteria below). QUICK is never a clean bill of health; its output must say what it did not cover.
4. **Map the app in ten minutes** before hunting: product and users, principals (anonymous, user, admin, tenant owner, service), entry points (HTTP routes, server actions, RPC/GraphQL, WebSockets, webhooks, jobs, CLI), tenancy model, where authorization is supposed to live, data classes (PII, payment, health, secrets) and which controls are deployment-side (proxy, CDN, IdP, cloud IAM) rather than in the repo. Write this as a one-page architecture note; every later verdict refers to it.
5. **Run the checks.** QUICK: the ten prompts in order. FULL: categories in priority order - unauthenticated surfaces first, then the boundaries protecting credentials, cross-tenant data, code execution and release authority, then the rest. Keep a coverage ledger: one line per category with `covered | finding | needs-validation | skipped (reason)`.
6. **Close every candidate** with a trace (entry point -> control -> sink -> effect), the counter-evidence checklist, and exactly one verdict: `confirmed`, `needs-validation`, or `not-a-finding`. Severity is assigned only after that, and only to confirmed items.
7. **Fix by class, not by payload**, in severity order, using the project's own helpers (ORM parameterization, auth middleware, framework CSRF). Run the verification gates in `references/fix-patterns.md` before calling anything fixed, including the user-visible side-effects gate: when a fix removes or changes behaviour, list the UI copy, success messages, docs and privacy text that still promise the old behaviour.
8. **Write the report** (template below), including what was not covered. Re-run QUICK before each later release and FULL again after changes to authentication, tenancy, payments or infrastructure.

## Scope and inputs

| Input | Why it matters | If missing |
|---|---|---|
| Repo root, commit/ref, languages and frameworks, how it is deployed | Source review is the cheapest, highest-yield step; deployment decides which controls are visible | Ask; note "worktree dirty" or "ref unknown" in the report |
| Authorization to test + target environment (local / staging / prod read-only) | Tests create and modify data | Do not run anything dynamic; source review only |
| API schema (OpenAPI, Postman, GraphQL SDL, `.proto`) | Turns endpoint guessing into enumeration; the biggest single coverage win | Enumerate from the router/source and say the list may be incomplete |
| **Two test tenants**, each with at least one user | IDOR/BOLA and tenant isolation can only be proven by reading tenant A's object as tenant B | Mark every authorization result "structurally incomplete" |
| A **low-privilege and a high-privilege** account | Proves function-level authorization (a user calling admin-only routes) | Same as above for admin functions |
| **Example object IDs** per principal (org, user, order, file) | ID-binding checks start immediately | Create them in the test tenants first |
| **Out-of-scope list** (payments, mass notification, destructive admin endpoints, third-party SSO, outbound email/SMS) | Avoids spending money or touching real users | Assume all of these are out of scope |
| Rate limits / WAF / CDN in front of the app | Explains blocked tests; these are deployment controls, not fixes | Treat their presence as unknown (`needs-validation`) |
| **Tenancy model and trust boundaries in the owner's words** ("tenant id comes from the JWT; flag any query filtering by object id without tenant id") | A reviewer cannot infer design intent reliably | Derive it from the code and ask the owner to confirm before reporting |
| Whether any feature calls an LLM, runs an agent, or uses RAG | Those need the `llm-app-security` skill in addition | Grep for provider SDKs and model endpoints |

**Execution safety (both modes).** Source inspection is read-only. Dynamic checks use dummy principals and fixtures in local/staging only, stop at the minimum effect that settles the question (a wrong return value, an unauthorized dummy record, a policy difference), and never continue into persistence, data extraction or availability testing against a shared service. Never spend paid API quota as part of a test. Record the exact test input and environment for every reproduced check. Keep tokens out of shell history and committed files; never paste a live secret into notes or the report.

## Choosing the mode

| Choose QUICK when | Choose FULL when |
|---|---|
| Single developer, one repo, launching soon | Multi-tenant SaaS or B2B with org/workspace boundaries |
| No payment/health/HR data beyond what a login implies | Payments, health, education, HR, legal or financial records |
| A previous FULL review exists and only features changed | First review ever, or auth/tenancy/payments/infra changed |
| Time budget is one sitting | A customer, investor or partner asked for a security report |
| User asks for "the checklist" or "the prompts" | User asks for "an audit", "a pentest", "a report" or "sign-off" |

If ambiguous, ask one question: "Does anyone other than you and your test accounts have data in this app yet?" Yes -> FULL.

## QUICK mode: the ten prompts

Run them in order; each prompt is self-contained and can be pasted into a coding agent that has the repository open. Expect each answer as a table of `location (file:line) -> what was checked -> verdict (ok / finding / needs-validation) -> fix`. Prompts 1-3 cover Authentication & Access, 4 and 8 Injection & Input, 5 Secrets & Tokens, 6-7 and 9-10 Config & Hygiene. After all ten: collect findings, apply the verdict and severity rules below, fix in severity order, then re-run prompts 1, 4 and 5 (they are where regressions hide).

**1. Authorization and IDOR (do this first - highest impact).**
> Review every protected endpoint, server action, RPC method, GraphQL resolver, WebSocket handler and background job for server-side authorization; the frontend is never the boundary. For each handler that accepts an object identifier (path, query, body, header, pagination cursor, relation fields like ownerId/orgId/projectId, and expand/include/fields knobs), confirm the object is loaded scoped to the authenticated user or tenant inside the query itself, not fetched by id and checked afterwards. Flag: list/search/export/bulk endpoints that do not apply the same filter as the detail endpoint; PATCH paths with weaker checks than PUT; body fields (tenantId, role, ownerId) that can override the principal; admin or feature-flagged routes whose only gate is a hidden button; if the database uses row-level security (Postgres/Supabase RLS), tables with RLS disabled, policies that cover only SELECT, and any service-role or admin key reachable from client code. Opaque IDs (UUIDs, signed URLs) are not authorization. Output a table: handler -> object -> where the check lives (file:line) -> verdict -> fix using the project's existing authorization helper.

**2. Authentication, sessions and tokens.**
> Review authentication end to end. Password storage: Argon2id (minimum m=19 MiB, t=2, p=1), or bcrypt with work factor >= 10 (mind its 72-byte input limit), or PBKDF2-HMAC-SHA256 with 600,000 iterations; never an MD5/SHA-family hash alone, always a per-user salt. Sessions and JWTs: algorithm pinned server-side, unsigned tokens rejected, exp/iss/aud enforced, no decode-without-verify path, HMAC secret at least 256 bits and not shared across dev/stage/prod, logout and password change actually invalidate, session id rotated on login and privilege change. Reset and magic links: CSPRNG token, single-use, expiring, bound to the user, URL built from a server-configured base URL (never the Host header), prior sessions invalidated on completion. MFA enrollment/disable requires fresh authentication. OAuth/OIDC callbacks validate state, nonce, PKCE (S256) and an exact redirect_uri. Test, seed and default credentials cannot authenticate in production. Login and reset responses reveal account existence only where that is already public. Output findings with file:line and the smallest fix.

**3. Rate limiting and abuse controls.**
> Add rate limiting appropriate to each endpoint type: stricter limits on authentication routes (login, signup, password reset, OTP/MFA verification, invite acceptance), moderate limits on public endpoints (contact and signup forms, search, anything that sends email/SMS or calls a paid API), looser limits on authenticated user actions. On auth routes combine per-IP and per-account limits with exponential backoff rather than a hard lockout, because a hard lockout lets anyone lock a victim out. Key limits on a dimension the client cannot choose (authenticated principal, or the client IP as set by your own ingress - never a client-supplied X-Forwarded-For). Per-IP keys are weak against IPv6, where one user controls at least a /64: key IPv6 clients on the /64 prefix, not the full address. An in-memory limiter resets on every restart or deploy and shares no state across instances or serverless invocations, so put limits that matter at the proxy/edge or in a shared store; the limiter must also stay bounded in memory (expiring counters, idle keys evicted, never a growing record of every rejected request). Make thresholds configurable, not hardcoded. Confirm the limit runs before expensive work (parsing, hashing, database, external calls); body, upload and field-count caps exist; paid or metered calls (email, SMS, LLM, cloud APIs) have per-request and per-tenant budgets; public forms have CAPTCHA or an equivalent abuse control; anything that sends email never sends user-supplied content to a user-supplied address, has a daily send cap, and strips CR/LF from header values. Before changing anything, list every public and auth endpoint with its current limit or "none".

**4. Input validation and injection.**
> Validate every input against a strict schema (type, length, format, allowed values) at the boundary and reject anything that does not match - do not merely sanitize or escape - and validate field names, keys and headers as strictly as values. Then trace untrusted input to dangerous sinks and confirm: every SQL/NoSQL query is parameterized, including ORDER BY, column names, JSON paths and NoSQL operator objects; no shell command, eval, template source or native deserializer receives user input; HTML output is contextually encoded and escape hatches (dangerouslySetInnerHTML, v-html, |safe, .html()) receive only sanitized content; user-controlled file paths are canonicalized and confined to a base directory; server-side fetches of user-supplied URLs (webhooks, link previews, importers, avatars) allowlist scheme and host and block private, link-local and cloud-metadata ranges after every redirect; redirect/next/return parameters are allowlisted; cookie-authenticated state-changing routes have CSRF protection (token, or strict SameSite plus Origin check). Output a table: input -> sink -> control present (file:line) -> verdict -> fix.

**5. Secrets and tokens.**
> Scan the complete codebase and git history for hardcoded API keys, tokens, passwords, JWT signing secrets, webhook secrets, database URLs and private keys (-----BEGIN blocks): run gitleaks or trufflehog and grep for provider key prefixes. Verify secrets are injected from environment variables or a secret manager; nothing sensitive ships to the frontend (NEXT_PUBLIC_/VITE_/REACT_APP_/EXPO_PUBLIC_ variables holding real secrets, public source maps exposing server code, service-role or admin keys in web bundles or mobile apps); .env*, credential files, *.pem and *.key are gitignored and dockerignored; tokens are not kept in localStorage where any XSS can read them; no default credentials remain. For every secret found in history: rotate it AND purge it - removing it from code without rotating leaves the leaked value valid. Refer to secrets by name and location only; never paste the value.

**6. Dependency vulnerabilities.**
> Run a dependency audit across every package manifest in the project (npm/pnpm audit, pip-audit, cargo audit, or osv-scanner for anything). List each vulnerable package with severity, whether the vulnerable code path is actually reachable from this app, and the fixed version; update or replace where safe, and never force major upgrades without a plan and a test run. Also confirm a lockfile is committed and CI installs strictly (npm ci, --frozen-lockfile, --require-hashes); no floating git refs, mutable image tags or unpinned CI actions; no abandoned packages in security-sensitive roles (auth, crypto, parsers, upload handling).

**7. Error handling and information leakage.**
> Review all error handling across the app. Users must never see stack traces, internal file paths, raw database errors, framework versions or raw exception messages - return a generic message plus a correlation ID and log the full detail server-side. Confirm debug mode, debug toolbars and verbose error pages cannot be switched on in production by an environment variable, query parameter or header; logs never contain passwords, tokens, reset links, card data or other users' private content (redaction lives in the logging layer); security events (login outcomes, MFA and role changes, token issue/revoke, exports, deletions, every admin action) are logged with principal, action, resource, outcome and time; "not found" and "no access" responses do not differ in a way that lets someone enumerate protected objects or accounts; malformed input yields a handled error, never a crash of a shared process.

**8. File upload safety.**
> Review any file upload functionality. Confirm file type is validated by content inspection plus an extension allowlist (never the client Content-Type alone); size is capped before buffering, with per-request count caps and per-tenant quotas; filenames are server-generated; uploads are stored outside the web root or in isolated object storage whose buckets are private by default, accessed through short-lived signed URLs bound to the object and the requester; uploaded files can never execute or render as active content on the application origin (HTML/SVG served with Content-Disposition: attachment or from a separate cookie-less origin with a restrictive CSP). Downloads authorize against the specific object and tenant; image, document and archive parsers run under resource limits; CSV/JSON imports are schema-validated and authorized per resulting record.

**9. Transport, headers, CORS and cookies.**
> Verify HTTPS everywhere (HTTP redirected, HSTS set, outbound clients verifying certificates - no verify=False or rejectUnauthorized: false in production) and review response headers and cookies against the baseline in references/fix-patterns.md: CORS allowlists exact origins server-side and never reflects an arbitrary Origin together with credentials; a Content-Security-Policy is enforced (nonce- or hash-based script-src, object-src 'none', base-uri 'none', frame-ancestors set); X-Content-Type-Options: nosniff and Referrer-Policy are present, COOP/CORP where cross-origin windows or embeds exist; session cookies carry Secure, HttpOnly, SameSite=Lax or Strict, Path=/ and the __Host- prefix; personalized responses are Cache-Control: private, no-store and cache keys include tenant and auth state. Report each header's current value, the target value and where it is set (framework middleware, reverse proxy, CDN).

**10. Production configuration and hygiene.**
> Audit production configuration: debug mode off; /debug, /admin, /metrics, /health, /env, GraphQL introspection and framework actuator endpoints removed, authenticated or network-restricted - an admin page behind an obscure URL is not protected and needs the same server-side authorization as any admin API; storage buckets private with no public listing; production source maps not publicly served (or free of secrets); incoming webhooks (payment providers, GitHub, messaging providers) verify the provider signature over the raw body with a timestamp or replay window before any processing, and outgoing webhook URLs pass the SSRF checks from prompt 4; admin actions are logged; the rendered production configuration (base plus overlays, env, flags) keeps authentication, TLS, tenant scoping and audit logging on with no development value winning; absent configuration fails closed (no allow-all CORS, auth mode or permission default). Output a pass/fail table with location and fix.

## FULL mode: categories and headline checks

Open `references/checklist.md` for the complete item list per category; the headline checks below are what to verify when time is short and what every report must mention. Skip a category only if the surface does not exist, and record the skip.

**1. Authentication** - one server-side verification point per credential type with no fail-open branch; reset, magic-link and invite tokens from a CSPRNG, single-use, expiring, user-bound, built from a server-configured base URL; MFA changes and identity linking require fresh authentication; OAuth/OIDC validates state, nonce, PKCE, exact redirect_uri, issuer and audience; the weakest recovery path is the effective strength.

**2. Sessions, tokens, JWT, API keys** - rotation on login and privilege change; logout/password change/revocation invalidate everywhere (sessions, refresh tokens, WebSockets, caches, legacy endpoints); JWT algorithm and key source pinned, `kid`/`jku`/`x5u` never used to fetch arbitrary keys, exp/nbf/aud/iss enforced; API keys resolved from a server record with constant-time compare and scopes from that record, not the request; tokens never in URLs, logs, bundles or error pages.

**3. Authorization, IDOR/BOLA, BFLA, tenant isolation** - object bound to tenant/owner inside the query, on every transport (REST, GraphQL resolver, WebSocket message, gRPC field, job, import); no weaker parallel path (UI vs API, v1 vs v2, batch vs single, PATCH vs PUT); body fields cannot override the principal; an actor x action matrix for admin functions tested with the low-privilege account; RLS enabled on every tenant table with policies for every verb; "empty array for another tenant" is confirmed as withheld data, not assumed.

**4. Input validation, injection, SSRF, path traversal** - parameterized queries everywhere including identifiers and NoSQL operators; no shell/eval/template-source/native-deserializer sink reachable from input; contextual output encoding with audited escape hatches; file paths canonicalized and contained; SSRF allowlist with private/link-local/metadata ranges blocked after redirects; prototype-key rejection in deep merges; stored data re-treated as untrusted in each new context.

**5. File uploads** - content-inspected type plus extension allowlist, size/count/quota caps before buffering, server-generated names, private storage, no active content served from the app origin, authorized downloads, parsers under resource limits, derived copies (thumbnails, search index) inherit the source ACL.

**6. Secrets and configuration** - nothing secret in source, history, images, bundles or mobile apps; runtime injection from a secret manager; debug impossible in production; rendered config per environment keeps auth, TLS, tenant scoping and audit logging on; absent config fails closed; found secrets rotated and purged.

**7. Error handling and logging** - generic errors plus correlation ID; no oracle between "not found" and "no access"; redaction in the logging layer; security events logged with principal/tenant/action/resource/outcome; audit logging cannot be disabled by an overlay; crypto and verification errors never fall through to success.

**8. Rate limiting, abuse, availability and production readiness** - earliest size/rate/concurrency gate before expensive work; limits keyed on non-client-chosen dimensions, with IPv6 keyed on the /64 prefix; limiter state at the edge or in a shared store rather than per-process memory that resets on restart and differs per instance, and bounded so rejected requests cannot grow it; aggregate and per-tenant quotas; bounded query depth, pagination, fan-out and regex complexity; retries with ceilings, jitter and circuit breakers; budgets on paid calls. Caching: Redis in front of the database is not a strategy by itself - give keys a base TTL plus a random jitter so a warm cache does not expire all at once and stampede the database, coalesce concurrent recomputes of the same key, key every cache entry on tenant and authorization state, and never cache personalized responses at the edge without `Vary` and `private, no-store` where appropriate.

**9. Cryptography and password storage** - Argon2id/scrypt/bcrypt/PBKDF2 at current parameters; CSPRNG for every token; constant-time comparisons; authenticated encryption (AES-GCM, ChaCha20-Poly1305) with unique nonces; signatures verified before payload use; TLS enforced inbound and verified outbound; crypto failures abort rather than degrade.

**10. Headers, CORS, CSP, cookies, CSRF** - exact-origin CORS allowlist, never reflected with credentials; CSRF token or strict SameSite plus Origin check on cookie-authenticated mutations (JSON and multipart included); enforced nonce/hash CSP; frame-ancestors; nosniff, Referrer-Policy, COOP/CORP; `__Host-` cookies; Host/X-Forwarded-* trusted only from your own ingress; cache keys include every input that changes the response.

**11. Cloud, containers, CI/CD** - dedicated least-privilege identity per workload; no caller-supplied identity headers trusted; no admin/debug/metrics ports exposed on rendered manifests; IMDSv2 or metadata egress blocked; non-root, read-only root filesystem, no host mounts or privileged mode for untrusted workloads; signed provider events validated; PR/fork-triggered workflows get no secrets or deploy authority; branch names and issue text never enter workflow shell unquoted; CI tokens scoped to repo, environment and duration.

**12. Supply chain and dependencies** - committed lockfile with integrity hashes and strict install; known-CVE scan triaged for reachability; private namespaces cannot be confused with public ones; base images and CI actions pinned by digest/SHA; checksums verified against a trusted root; published package or image contains only intended files.

**13. Data lifecycle, PII, backups** - per data class: write, read, cache, index, export, backup, delete and restore paths drawn with tenant marked at every edge; derived copies apply the source ACL and are invalidated on change; exports contain only what the requester may read; soft-delete predicates apply everywhere; retention documented and enforced in primaries, backups and logs; consent withdrawal and membership removal revoke sessions, caches and queued jobs. Legal obligations (notice, consent, breach notification) belong to `dpdp-legal-compliance`.

**14. Webhooks, queues, GraphQL, RPC** - network position is never authentication; incoming webhooks verified by signature over raw body with replay window and account match; every at-least-once consumer idempotent with tenant-scoped dedup; a message body cannot declare itself an admin event; GraphQL gates introspection, enforces depth/complexity/alias limits, authorizes per resolver and prevents batched queries from bypassing rate limits.

**15. Client-side, SPA and mobile clients** - no browser-controlled source reaches innerHTML or framework escape hatches; postMessage handlers check exact origins; no secrets or admin paths in the bundle; third-party scripts under SRI and CSP; storage cleared on logout and account switch; client-side gating always duplicated server-side; mobile apps keep tokens in platform secure storage, verify TLS properly, and treat deep links and WebView bridges as untrusted entry points - a mobile app is a frontend and gets no extra trust.

**16. AI, LLM and agent features** - if the app sends user or third-party content to a model, lets a model call tools, or does retrieval over user data, run the `llm-app-security` skill as well; this skill does not cover prompt injection, tool permissions or RAG authorization.

**17. Features that send email** (contact forms, invites, share-by-email, "send me a copy") - user-supplied content never goes to a user-supplied address (an open relay for phishing from your domain); acknowledgements to the submitter are fixed text; a daily send cap; a sending domain separate from the inbox that receives enquiries; SPF, DKIM and DMARC alignment checked or listed as not assessed; bounce and backscatter risk to sender reputation considered; CR/LF stripped from anything placed in a header (subject, from-name, reply-to). Items in `references/checklist.md` section 18.

## Evidence, verdicts and severity

Full rules, the counter-evidence checklist and the finding template are in `references/severity-and-reporting.md`; read it before writing any FULL-mode finding. The short form:

- **A finding needs a boundary and a result.** Name the lower-trust principal, the accepted input or action, the control that should have stopped it, the boundary crossed, the affected principal or resource, and a concrete observed (or owner-observable) effect. A missing best practice with no affected principal is a hardening note, not a finding.
- **Three verdicts, exactly one per candidate.** `confirmed` = complete trace plus a bounded local reproduction, or a complete source trace with the missing runtime proof named and confidence lowered. `needs-validation` = the repository proves the path up to one decisive fact only the owner or a fixture can settle (does the ingress strip X-Forwarded-For; does the CDN key on the cookie; does the IdP enforce audience) - record the exact question and a safe way to answer it; no severity. `not-a-finding` = you can complete the sentence "safe because `<control>` at `<file:line>` does `<what>` before `<sink>` on every reachable path", or the input is provably not attacker-controlled; "I could not find a caller" is a proof gap, not a not-a-finding.
- **What does not rule a candidate out:** generic trust in a library ("the ORM handles it"), a control on a different route, a control that runs after the effect, a control inside a try/except that swallows failure, one safe sibling call site, missing information, a WAF or operator-configurable filter, or "it's internal-only" (that lowers severity; it does not delete the finding).
- **Severity anchors** (confirmed items only; overall never exceeds demonstrated impact): **Critical** - unauthenticated code execution, full data-store access, arbitrary account takeover, trivially forgeable authentication, complete cross-tenant isolation failure. **High** - an explicit control fully defeated with real consequences: auth bypass, cross-tenant read/write, stored script affecting other users, authenticated code execution, SQL injection reaching real data, SSRF reaching internal services or metadata. **Medium** - a real boundary violation with limited blast radius or uncommon preconditions: CSRF on a meaningful action, limited stored XSS, authorization gaps on low-value objects. **Low / informational** - missing headers, cookie flags, verbose errors, self-XSS, open redirect alone, enumeration without demonstrated impact. The high/medium question: does it fully defeat an explicit control for an action with real consequences, or only weaken it? If you cannot state the concrete damage, the severity is lower than it feels.
- **Rank for the user by proven impact**: unauthenticated first, then cross-tenant or privilege escalation, then authenticated-only, then unproven observations, clearly labelled.
- **Coverage honesty**: "no findings" means nothing was proven in what was analyzed. Logging/alerting, supply-chain integrity and insecure design are never provable from a black-box run; say so instead of marking them passed.

## Report format

Use this structure for both modes (QUICK may collapse sections 4-6 into one table). Prose never changes a verdict or severity.

```
# Security review - <app> - <date> - <quick check | full review>
1. Scope: repo + ref, environment used, accounts/tenants used, schema source, out-of-scope list,
   categories skipped and why, what could not be assessed (e.g. "no second tenant: access control
   incomplete"; email authentication - SPF/DKIM/DMARC records; firewall and network exposure;
   built output (dist/) vs source; minified or generated files reviewed only by grep).
2. Posture summary (5 lines max): the strongest controls seen, the top 3 risks, launch recommendation
   (ship / ship after fixing listed Highs / do not ship).
3. Confirmed findings table: ID | Severity | Title | Boundary crossed | One-line observed result.
4. Per confirmed finding: location (file:line), lower-trust principal, trace entry -> control -> sink,
   conditions, bounded reproduction in the app's native interface (dummy data), observed result, impact,
   counter-evidence checked, smallest fix (invariant + change at the last trusted decision point +
   regression test), verification status, user-visible side effects (UI copy, success messages,
   docs, privacy text promising the old behaviour - updated or flagged).
5. Needs-validation table: Title | Trace | Exact blocker question | Bounded local check | Safe
   owner-observed check. No severity.
6. Hardening notes and positive patterns (not findings).
7. Coverage ledger: category -> covered / finding / needs-validation / skipped (reason).
8. Next steps: fix order, re-test plan, what to automate (secret scan, dependency audit, SAST in CI),
   written as plain actions.
```

The report is client-facing: never reference this skill's internals (prompt numbers, mode names, checklist section numbers) or unexplained jargon. "Re-run QUICK prompts 3, 5" becomes "after deploying, re-check the rate limits on the login and contact forms and re-run the secret scan".

The finding template with all fields is in `references/severity-and-reporting.md`; fix snippets and configuration baselines are in `references/fix-patterns.md`; exact tool commands are in `references/tools.md`.

## Anti-patterns (refuse or correct)

- Reporting an unverified pattern match or a scanner hit as a confirmed vulnerability; reporting a stronger effect than observed (a crash becomes "RCE"; "could matter if chained with three assumptions").
- Assigning severity to a `needs-validation` item, or quietly closing it to tidy the list. Downgrade, don't delete.
- Fixing the payload instead of the class: blocking one string instead of parameterizing the query, hiding an endpoint instead of authorizing it, patching one route instead of the shared helper, sanitizing after the value was already used.
- Removing a leaked secret from code without rotating it, or rotating without purging history and checking where else it was copied (CI logs, images, chat). Both, always, and record the rotation time.
- Pasting live secrets, tokens or other users' data into the report or chat.
- Shipping a fix that removes or changes behaviour (dropping a "copy to sender" email, adding a limit) while the form label, success message, docs or privacy text still promise the old behaviour.
- Writing internal instructions into the client's report ("re-run QUICK prompts 3, 5") instead of plain actions.
- Testing against production or any shared environment, stress-testing a live service, or spending paid API quota to "prove" a rate-limit gap.
- Treating a WAF, CDN rule, obscure URL, client-side check, or "the IDs are UUIDs" as the fix.
- Inventing low-severity filler so a clean run looks thorough, or presenting a budget-capped or no-test-account run as a completed assessment.
- Writing exploit payloads or attack walkthroughs. This skill describes what to verify and the secure configuration; if asked for working attack code or to test a system the user does not own, decline and offer the defensive check instead.

## When the user pushes back

- "It's just an MVP / nobody will attack us." Run the launch minimum anyway (prompts 1, 2, 3, 5 and 10 - authorization, auth, rate limits on auth routes, secrets, debug off). Those are the holes found by automated scanners within days of a DNS record appearing, not by targeted attackers.
- "Our WAF / Cloudflare / Vercel handles that." Deployment controls are real but invisible from the repo; record `needs-validation` with the exact question and still fix at source, because a proxy can be misconfigured or bypassed by a direct-to-origin path.
- "IDs are UUIDs, so IDOR is impossible." Unguessable is not unauthorized; IDs leak through exports, emails, logs, shared links and list endpoints. Keep the object-level check.
- "That severity feels too high / too low." Walk the anchors together; change the metric (privileges required, demonstrated impact), not the conclusion.
- "Just give me the fixes, skip the report." Fine for QUICK, but still deliver the coverage ledger line and the needs-validation questions, because they are the part the user cannot reconstruct later.

## Worked examples

**"Launching my Next.js + Supabase SaaS on Friday, can you check it?"** -> QUICK. Ask for two test accounts in two workspaces and confirm staging. Prompt 1 finds three tables with RLS disabled and a server action that reads `workspaceId` from the request body; prompt 5 finds the service-role key in a `NEXT_PUBLIC_` variable (confirmed High: any visitor can act as the database admin). Fix order: rotate the key, move it server-side, enable RLS with policies per verb, derive `workspaceId` from the session. Report says: "No second tenant with data existed for billing flows; billing authorization is needs-validation."

**"We need a security review before the hospital group's vendor questionnaire."** -> FULL. Health data, multi-tenant, external reader. Collect schema, two tenants, admin and staff accounts, out-of-scope list (SMS, payments). Run all categories; write the coverage ledger even for clean ones; hand the data-lifecycle and consent items to `dpdp-legal-compliance`; the report distinguishes confirmed findings from needs-validation questions for their hosting provider (metadata endpoint reachability, backup encryption scope).

**"Found an AWS key in an old commit. It's deleted now, are we fine?"** -> No: rotate first (new key, update the secret manager, deploy), review CloudTrail or the equivalent for use of the old key since the commit date, then purge history, invalidate the old key, and add a pre-commit secret scan plus a CI secret scan so it cannot recur. Steps are in `references/fix-patterns.md`.

**"Add rate limiting to my Express API."** -> Inventory endpoints by type first (auth, public, authenticated, webhooks, paid-call triggers), then apply tiered limits keyed on principal or ingress-set IP (IPv6 on the /64 prefix), held in a shared store or at the edge if the app runs more than one instance or restarts on deploy, exponential backoff on auth routes, configurable thresholds, and limits positioned before body parsing and hashing; add body-size caps at the same time.

## Hand-offs

- Any feature that calls an LLM, runs an agent, exposes tools/MCP or retrieves over user data: run `llm-app-security` for prompt injection, tool authority, RAG authorization and output handling.
- Privacy notices, consent, data-subject rights, breach-notification runbooks and India's DPDP obligations: `dpdp-legal-compliance`.
- Cookie banners, consent UI and error-page copy: `ui-ux`.

## Reference files

- `references/checklist.md` - read when running FULL mode, or when a QUICK prompt surfaces a category you need to go deeper on; the complete per-category checkbox list with defensive phrasing and severity hints.
- `references/severity-and-reporting.md` - read before writing any finding or assigning any severity; anchors, the three verdicts, the counter-evidence checklist, the finding template and the full report structure.
- `references/fix-patterns.md` - read when fixing anything; class -> correct fix mapping, verification gates, secret rotation steps, password hashing parameters, header/cookie/CORS/CSP/rate-limit/RLS/webhook/cache baselines.
- `references/tools.md` - read when you need an exact command; secret scanners, dependency audits per ecosystem, SBOM, Semgrep, CodeQL, the Claude Security plugin deep scan and an optional authorised dynamic test, and the OWASP Top 10:2025 and API Top 10 (2023) mapping to the categories above.
- `references/sources.md` - attribution for the upstream material this skill adapts.

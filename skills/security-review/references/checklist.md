# Pre-production security checklist (FULL mode)

A defensive self-review checklist. Each item says what to verify and the secure state to expect. Use it with the verdict and severity rules in `severity-and-reporting.md`.

How to use it:

- Skip sections whose surface you do not have, but record the skip in the coverage ledger.
- A failed item is not automatically a vulnerability. A missing header, flag or limit is a hardening note until you can name a lower-trust principal, a crossed boundary and a concrete result.
- Severity hints in brackets use the anchors from `severity-and-reporting.md`. `[Hardening]` means "not a finding unless impact is shown".
- Verify from source and bounded local tests (unit test, fixture, dummy tenant, rendered configuration). Never probe, stress or mutate shared or production environments to answer an item.

## Table of contents

1. [Authentication](#1-authentication)
2. [Sessions, tokens, JWT and API keys](#2-sessions-tokens-jwt-and-api-keys)
3. [Authorization, IDOR/BOLA, BFLA and tenant isolation](#3-authorization-idorbola-bfla-and-tenant-isolation)
4. [Business logic](#4-business-logic)
5. [Input validation, injection, SSRF and path traversal](#5-input-validation-injection-ssrf-and-path-traversal)
6. [File uploads and downloads](#6-file-uploads-and-downloads)
7. [Secrets and configuration](#7-secrets-and-configuration)
8. [Error handling and logging](#8-error-handling-and-logging)
9. [Rate limiting, abuse, availability and production readiness](#9-rate-limiting-abuse-availability-and-production-readiness)
10. [Cryptography and password storage](#10-cryptography-and-password-storage)
11. [Headers, CORS, CSP, cookies and CSRF](#11-headers-cors-csp-cookies-and-csrf)
12. [Cloud, IaC, containers and CI/CD](#12-cloud-iac-containers-and-cicd)
13. [Supply chain and dependencies](#13-supply-chain-and-dependencies)
14. [Data lifecycle, PII, retention and backups](#14-data-lifecycle-pii-retention-and-backups)
15. [Webhooks, queues, RPC and GraphQL](#15-webhooks-queues-rpc-and-graphql)
16. [Client-side and SPA](#16-client-side-and-spa)
17. [Mobile apps and backends](#17-mobile-apps-and-backends)
18. [Features that send email](#18-features-that-send-email)
19. [Launch-day minimum](#19-launch-day-minimum)

---

## 1. Authentication

- [ ] Every credential type (password, session, bearer token, API key, mTLS certificate, passkey, recovery token) has one identifiable server-side verification point with no decode-without-verify or fail-open branch. `[High if bypassable]`
- [ ] Login, step-up and recovery challenges are bound to the initiating session, principal, tenant, operation and expiry, are single-use, and UI, API, batch, mobile and resumed-flow routes enforce the same check.
- [ ] MFA enrollment, replacement, disablement, recovery-code generation and trusted-device creation require fresh authentication, so a first factor alone cannot change the second factor.
- [ ] Disabled or replaced MFA factors stop authorizing sessions immediately; a completed challenge upgrades only the session and account that started it.
- [ ] Passkeys/WebAuthn: registration binds challenge, RP ID, origin, credential, user handle and user-verification policy to the session; authentication verifies challenge, RP/origin, credential membership, signature and user presence.
- [ ] Linking an IdP, passkey, email, phone or device requires a current session, verified ownership of the new identity and callback state bound to the initiating account; unlink/relink and invite acceptance cannot collide on a verified identifier.
- [ ] Reset and recovery tokens come from a cryptographic RNG, are bound to user and action, expire, are single-use, invalidate prior tokens and active sessions on completion, and are rate-limited. `[High if a reset can take over another account]`
- [ ] Reset and magic-link URLs are built from a server-configured base URL, never from `Host` or `X-Forwarded-Host`.
- [ ] Support/admin recovery, backup codes, device migration and email/phone change require the same assurance as primary login; the weakest recovery path is the effective strength.
- [ ] OAuth/OIDC clients validate ID-token issuer, audience, signature and nonce, use session-bound `state`, require PKCE (S256), and bind the selected IdP across initial, retry, deep-link and account-link callbacks; an authorization server you run matches `redirect_uri` exactly.
- [ ] SAML consumers validate the signature on the exact element used as identity, reject unsigned fallbacks, disable external entities, and enforce validity window, audience/recipient, request correlation and replay state.
- [ ] mTLS or gateway-injected identity headers (`X-User-Id`, `X-Role`, `X-Organization-Id`) are accepted only from the terminating proxy, which strips client-supplied copies; direct-to-service paths verify tokens themselves. `[Medium-High]`
- [ ] Expired, revoked or missing certificates fail hard rather than falling back to bearer-only or anonymous mode.
- [ ] Login and reset responses, timing and status codes reveal no more than public account existence. `[Low]`
- [ ] Test, seed, example and default credentials cannot authenticate in production.

## 2. Sessions, tokens, JWT and API keys

- [ ] Session identifiers rotate on login, account switch, MFA completion, impersonation and privilege change; new sessions are never bound to a client-chosen identifier (no fixation). `[Medium]`
- [ ] Session IDs carry at least 64 bits of CSPRNG entropy (128 if generated by your own code); idle and absolute timeouts are enforced server-side (OWASP suggests idle 2-5 min for high-value apps, 15-30 min for low-risk; absolute 4-8 h).
- [ ] Logout, password change, revocation and account disable invalidate server sessions, refresh tokens, signed cookies, WebSocket state, caches and any legacy endpoint that still accepts the old identifier.
- [ ] JWT verification pins algorithm and key source server-side, rejects unsigned tokens, never lets the token's `alg` choose the verification behaviour, and never selects keys from `kid`, `jku`, `x5u` or inline `jwk` without a fixed allowlist (token-supplied key URLs are also an SSRF surface).
- [ ] JWT consumers enforce `exp`, `nbf`, `aud` and `iss` with tight clock-skew tolerance, reject tokens issued for another service even from a trusted issuer, enforce `typ` (ID tokens are not access tokens), and never decode-without-verify and then trust claims.
- [ ] HMAC secrets are at least 256 bits of random data, not reused across dev/stage/prod, tenants or services; JWKS rotation rejects retired keys and a missing `kid` does not fall back to "try every key".
- [ ] Authorization is re-derived server-side; `scope`/`roles` claims are not the sole authority for privileged actions.
- [ ] Refresh tokens rotate with reuse detection; long-lived tokens have a revocation path (short `exp` plus a server-side denylist or session store); refresh, delegation and token exchange cannot broaden scope or change audience.
- [ ] API keys resolve from a server-side record (prefix lookup plus constant-time full-secret compare); scope, tenant, environment and resource bindings come from that record, not request parameters; publishable and secret key types cannot be confused. `[High if a key reaches another tenant]`
- [ ] API-key revocation propagates through caches within an acceptable window and applies to bulk endpoints.
- [ ] Keys and tokens never appear in URLs, redirects, client bundles, logs, errors, build artifacts, `localStorage`, or responses readable by a lower-trust principal.
- [ ] Sensitive cookies set `Secure`, `HttpOnly` (unless JS must read them by design), an appropriate `SameSite`, the narrowest `Path`, no `Domain`, and the `__Host-` prefix; no broader sibling cookie can shadow them. `[Hardening unless a less-trusted origin can gain or replace the credential]`
- [ ] Impersonation and session-management endpoints are themselves object-level authorized (an IDOR there mints tokens for other users).
- [ ] Expiry, rate windows and scheduling behave correctly at exact boundaries and under clock skew.

## 3. Authorization, IDOR/BOLA, BFLA and tenant isolation

Governing invariants: authorization binds subject, action and the specific object on every request regardless of identifier opacity or transport; the actor is bound to the action at the service that performs it, not at the UI, gateway or a prior workflow step.

Object-level (IDOR / BOLA)

- [ ] Every authenticated endpoint also authorizes, checking the right permission for the right resource via the right mechanism rather than merely "a check exists". `[High for cross-tenant read/write]`
- [ ] Every read, update, delete, list, count and export loads the object scoped to the caller/tenant inside the query, key, path, policy or row-level control itself - not "fetch by id, then maybe check". A tenant column on a record is not isolation.
- [ ] Object references in paths, query, JSON bodies, form data, headers, cookies, JWT claims, GraphQL arguments, WebSocket messages and gRPC fields are all bound; relationship fields (`parentId`, `ownerId`, `accountId`, `tenantId`, `organizationId`, `teamId`, `projectId`) and projection knobs (`fields`, `include`, `expand`, `populate`) do not bypass resolver or serializer authorization; pagination cursors are bound to the caller.
- [ ] Request-body fields (tenant, owner, role, account ID) cannot override the scope derived from the authenticated principal.
- [ ] No parallel path to the same state change checks a weaker permission (UI vs API, v1 vs v2, batch vs single, import vs create, PATCH/JSON Patch vs PUT, admin vs background job); the effective policy is the weakest path.
- [ ] Bulk, batch, export, import, list, count and search operations enforce per-item authorization after selection and authorize download of the final artifact; list/search/suggest endpoints apply the same filters as detail endpoints (they are the usual ID seeders).
- [ ] Highest-value surfaces checked first: exports/backups/reports, messaging and notifications, audit logs and activity feeds, billing (invoices, payment methods), health/education/HR records, admin and impersonation tools, storage keys and signed URLs, background job and task results, multi-tenant containers.
- [ ] Job/task objects (`export/{jobId}`, `reports/{taskId}`, cancel/approve) are bound to their creator and tenant.
- [ ] Direct lookups, nested relations, background jobs, admin tools, imports, migrations and legacy routes apply the same tenant predicate; `unscoped`, service-role and raw clients are the usual gap.
- [ ] Row-level security (Postgres/Supabase RLS): enabled on every tenant-owned table; a policy exists for each verb (SELECT, INSERT, UPDATE, DELETE) and for the UPDATE `WITH CHECK` clause; policies derive identity from the session, not from a client-supplied column; views and functions run with the invoker's rights unless deliberately audited; the service-role key never reaches client code or client-triggered edge functions without its own authorization.
- [ ] Row-level policies, ORM default scopes, authorization filters and raw clients agree on joins, aggregates, views, transactions and error paths where request context may be missing.
- [ ] Cache keys, object paths, uniqueness constraints, search document IDs, temp files and dedup keys include tenant and environment so two principals cannot collide on one logical key.
- [ ] Object keys, attachment IDs, shared links and signed URLs bind operation, exact object, audience, expiry and tenant, and stop working when the ACL changes.
- [ ] Preview, draft and staging tokens are scoped to one item; drafts are not discoverable via search, feeds, sitemaps or listing endpoints.
- [ ] Search, filter, sort, count, uniqueness and error behaviour cannot act as an oracle for protected objects or hidden field values; error shape, status, size, ETag and timing do not differ between owned and foreign objects; HEAD/OPTIONS and conditional requests obey the same authorization. `[Low-Medium]`
- [ ] Hidden or undocumented parameters that widen scope (`include_deleted`, `as_user`, `owner_id`) are removed or admin-gated; `TODO: add auth` comments are resolved.
- [ ] Undelete, restore, rollback and cancellation re-apply current ownership and authorization rather than restoring prior state verbatim.
- [ ] Behaviour fails closed when config is missing, a flag is off, a dependency is down or the system is mid-migration.

Function-level (BFLA)

- [ ] An actor x action matrix exists (unauthenticated, basic, premium, staff/admin) and each privileged action (role changes, impersonation, invites, approve/void/refund, price overrides, exports, deletion, suspension, flag toggles, quota changes, 2FA reset) is denied to every lower role at the backend while the proper role succeeds.
- [ ] Feature gates and admin-only UI are mirrored by backend checks; hidden buttons and feature-flagged paths do not map to live unguarded endpoints; flag lookups do not default to enabled.
- [ ] No verb drift: GET never changes state; POST/PUT/PATCH share the same middleware; method-override headers or parameters do not reach a weaker chain.
- [ ] No route shadowing: legacy, alternate, mobile or versioned routes carry the same middleware as current ones (diff the middleware stacks).
- [ ] Content-type parity: JSON, form and multipart handlers run identical authorization; duplicate parameters, type variants (`123` vs `"123"`, arrays vs scalars) and aliases cannot select a weaker path.
- [ ] Background flows: job creation and finalize/approve steps re-check the actor; webhook and queue handlers that perform privileged actions verify the caller; replays of finalize endpoints re-validate.
- [ ] Multi-tenant admin actions are bound to the token's tenant, not a switchable header, subdomain or path selector; aggregate admin views enforce per-tenant authorization.
- [ ] Edge caches never cache authorization decisions across users or sessions.
- [ ] Verification standard: a lower-privileged principal cannot invoke the restricted action with identical inputs while the proper role can; removing client-side gates does not change backend behaviour; an empty array or null for another tenant's resource is confirmed as silent enforcement by comparing against the owner's view.

## 4. Business logic

Write down the invariants per workflow first: conservation of value (ledgers), uniqueness (idempotency), monotonicity (counters), exclusivity (one active subscription), and each state transition's pre/post-conditions.

- [ ] The server enforces preconditions on every transition; steps cannot be skipped, reordered or repeated via direct API calls (finalize before verify, refund before capture, cancel after ship).
- [ ] Prior steps cannot be replayed with altered parameters; step tokens (`paymentIntentId`, `approvalId`) are bound to principal and session and are single-use.
- [ ] Limits aggregate so a constrained action cannot be sliced into many sub-threshold actions.
- [ ] Hidden fields and client-computed totals, taxes, discounts and shipping are recomputed server-side from trusted sources.
- [ ] Alternate input shapes (arrays vs scalars, unexpected keys, null/empty/0/negative, scientific notation, overflow, precision loss) are rejected by schema validation before business logic.
- [ ] Create/apply/redeem/transfer operations are atomic (constraints, row locks or serializable transactions) so parallel identical requests cannot double-consume; check-then-act with business impact is guarded.
- [ ] Idempotency keys are scoped to principal + operation, persisted durably, and one user cannot reuse another's key; queue workers and retries are idempotent.
- [ ] Monetary math uses decimal types, a deliberate rounding policy and server-side bounds; cross-currency flows use consistent current rates for purchase and refund.
- [ ] Total refunds across all channels (UI, support tools, API) cannot exceed the captured amount; discount stacking, exclusivity, scope and once-per-user rules are enforced server-side and re-evaluated when the cart changes.
- [ ] Role transitions revoke stale capabilities immediately (no premium retention after downgrade, no admin endpoints after demotion).
- [ ] Verification standard: an invariant violation shown with side-by-side intended vs abused flows for the same principal, durable in the authoritative source, with unit loss x feasible repetitions quantified. Promotional behaviour explicitly allowed by policy is not a finding.

## 5. Input validation, injection, SSRF and path traversal

- [ ] Every input is validated against a strict schema (type, length, format, allowed values) and rejected on mismatch; field names, keys, headers and metadata are validated as strictly as values.
- [ ] Every SQL/NoSQL query is parameterized or built with a builder separating structure from data, including ORDER BY, LIMIT, column names, JSON paths and NoSQL operator objects. `[Critical if unauthenticated data-store access]`
- [ ] Shell commands are never built from untrusted input; subprocesses use an argument array, no shell, an allowlisted command and validated arguments.
- [ ] No `eval`, `exec`, `Function()`, `vm.runInContext`, dynamic `import()` or reflection dispatch receives attacker-influenced input.
- [ ] Templates render untrusted data as data (auto-escape on, no raw helpers on untrusted values); users never control template source or expressions.
- [ ] All HTML output of untrusted content is contextually encoded or passed through a maintained allowlist sanitizer; escape hatches (`dangerouslySetInnerHTML`, `v-html`, `|safe`, `.html()`) only receive trusted or sanitized content. `[High for stored XSS affecting other users]`
- [ ] Log, LDAP, XPath, header and search-index writes also encode or reject control characters and metacharacters; secondary-system injection counts.
- [ ] Deep-merge, path-assignment and query-string parsers reject `__proto__`, `constructor` and `prototype` keys.
- [ ] Stored data is re-treated as untrusted in each new context (field name as JSON path, slug as file path, escaped text re-rendered raw, string as URL, regex, template or policy).
- [ ] User-derived file paths are canonicalized and confirmed inside the base directory after symlink resolution, encoding normalization and null-byte rejection.
- [ ] Archive extraction rejects absolute paths, parent-directory components and escaping symlinks, and enforces size and count limits after decompression.
- [ ] Server-side fetches (webhooks, link previews, importers, avatars, callbacks, OIDC discovery, JWKS) allowlist scheme and destination, re-check after each redirect and DNS resolution, block private, link-local and cloud-metadata ranges, and use the same URL parser as the HTTP client. `[High if cloud metadata or internal APIs are reachable]`
- [ ] Untrusted data is never deserialized with native object deserializers (pickle, Java serialization, YAML full load, PHP unserialize, BinaryFormatter); safe formats or strict type allowlists are used.
- [ ] `redirect`, `return`, `next`, `url`, `goto` and `continue` parameters are validated against relative paths or an allowlist before redirecting.
- [ ] Untrusted data cannot reach `Location`, `Set-Cookie`, CSP or other response headers with CR/LF or control characters.
- [ ] Temp files use exclusive-create in a private directory; check-then-use file operations are descriptor-based.
- [ ] Regexes on untrusted input cannot backtrack catastrophically, or input length is bounded first.
- [ ] XML parsers have external entities and DTD processing disabled.

## 6. File uploads and downloads

- [ ] Uploads enforce a size cap before buffering, a per-request count cap and per-tenant quotas, re-checked after decompression or transformation.
- [ ] Stored filenames are server-generated or restricted to a safe character set; the storage path cannot escape the upload directory or tenant namespace.
- [ ] Content type is determined by inspection plus an extension allowlist, not the client `Content-Type`; HTML, SVG, executable and polyglot uploads cannot be served as active content from the application origin.
- [ ] Uploads are served with `Content-Disposition: attachment` or from a separate cookie-less origin with a restrictive CSP. `[High if stored script executes for other users]`
- [ ] Storage buckets are private by default with no public listing; access goes through short-lived signed URLs bound to object, operation, audience and expiry.
- [ ] Image, document, font and archive parsers run under resource limits with decompression amplification bounded at every stage.
- [ ] Downloads authorize the requester against the specific object and tenant.
- [ ] Derived copies (search index, thumbnails, previews, embeddings) carry the source ACL and are invalidated on delete or ACL change.
- [ ] Import files are treated as untrusted: schema-validated, authorized per resulting record, unable to overwrite existing resources or write into other tenants.
- [ ] `.gitignore` and build-context ignore rules exclude upload directories.

## 7. Secrets and configuration

- [ ] No passwords, API keys, tokens, signing secrets or `-----BEGIN` blocks in source or git history; `.env*`, `credentials.json`, `*.pem`, `*.key` are not committed; any secret found in history has been rotated and purged.
- [ ] `.gitignore`, `.dockerignore` and package `files`/ignore rules keep secrets, local config, fixtures and developer artifacts out of repos, images and packages.
- [ ] Secrets are injected at runtime from a secret manager or least-privilege mount, not image layers, build args, process arguments or environment shared with lower-trust workloads.
- [ ] No real secret is exposed through client-visible build variables (`NEXT_PUBLIC_`, `VITE_`, `REACT_APP_`, `EXPO_PUBLIC_`), production source maps, web bundles or mobile app binaries; "publishable" keys are public by design and documented as such.
- [ ] Debug/dev mode cannot be enabled in production via environment variable, query parameter, header or flag; debug toolbars and profilers are built out.
- [ ] `/debug`, `/admin`, `/test`, `/status`, `/health`, `/metrics`, `/env`, `/.env`, `/config`, GraphQL introspection, gRPC reflection and actuator endpoints are removed or authenticated and network-restricted; admin pages are protected by server-side authorization, not an obscure URL.
- [ ] The rendered configuration for every environment (base plus overlays, chart defaults, env vars, flags, per-region files) keeps authentication, TLS, tenant scoping and audit logging enabled; development values never win in production.
- [ ] Absent configuration defaults to secure (no allow-all fallback for CORS, auth mode, TLS verification or permission policy).
- [ ] Credential rotation or refresh failure fails closed rather than keeping a stale credential or dropping to a less-trusted identity mode.
- [ ] Public identifiers (key IDs, publishable keys, endpoint URLs) are distinguished from real secrets so review effort targets actual credentials.

## 8. Error handling and logging

- [ ] Production errors never include stack traces, internal paths, SQL text, framework versions or raw exception messages; clients get a generic message and a correlation ID. `[Low unless secrets or data leak]`
- [ ] Error messages, status codes, response sizes and timing do not distinguish "does not exist" from "no access" where that would be an oracle.
- [ ] Logs, traces, crash reports, metrics labels and analytics never contain credentials, tokens, passwords, reset links, card data or other users' private content; redaction lives in the logging layer.
- [ ] Log, trace and analytics sinks have access controls, retention and tenant separation no broader than the primary store for the data they receive.
- [ ] Log entries escape newlines and control characters from untrusted input.
- [ ] Dead-letter queues, error topics and operator diagnostic views redact secrets and cross-tenant payloads and are operator-only.
- [ ] Security events (login outcomes, MFA changes, role changes, token issue/revoke, exports, deletions, admin actions) are logged with principal, tenant, action, resource, outcome and time; audit logging cannot be disabled by an overlay; someone is alerted on the ones that matter (OWASP A09:2025 is about alerting, not just logging).
- [ ] Untrusted input reaching a parser or handler yields a handled error, not a panic, unhandled exception or process exit in a shared process. `[High for an unauthenticated remote stop of a shared service]`
- [ ] Crypto and verification errors never fall through to success or a no-crypto fallback; exceptional conditions (timeouts, partial failures, missing dependencies) fail closed (OWASP A10:2025).

## 9. Rate limiting, abuse, availability and production readiness

- [ ] The earliest size, rate and concurrency gate runs before expensive work (parsing, key lookup, hashing, decompression, external calls) so unauthenticated requests cannot impose large cost cheaply.
- [ ] Body, message, upload, field-count, header-size and nesting-depth caps exist at the edge and in the app, re-applied after every expansion stage.
- [ ] Rate limits are tiered by endpoint type (strict on login/signup/reset/OTP/invite, moderate on public forms, search and anything that sends email/SMS or calls a paid API, looser on authenticated actions), combine per-IP and per-account limits with exponential backoff rather than hard lockout on auth routes, and are configurable.
- [ ] Quotas key on a dimension the requester cannot choose (authenticated principal or tenant, ingress-set client IP), never a client-supplied header, route alias, key prefix or task ID; account switching, retries, reconnects and races cannot escape a budget.
- [ ] Per-IP limits account for IPv6: one subscriber usually controls at least a /64, so IPv6 clients are keyed on the /64 prefix, not the full address (IPv4-mapped addresses normalized first). A per-address IPv6 key gives one user an effectively unlimited supply of fresh identities.
- [ ] Limiter state matches the deployment model: an in-memory limiter resets on every restart, deploy or crash and keeps a separate count per instance, replica, serverless invocation or edge isolate, so the effective limit is `limit x instances` and zero just after a deploy. Limits that matter live at the proxy/edge or in a shared store with atomic increments and expiry; in-memory is acceptable only for a provably single long-lived process, and the report says so.
- [ ] The limiter's own memory is bounded: expiring fixed- or sliding-window counters rather than a per-key list that appends every request (rejected ones included); idle keys evicted and the key map size-capped, so a flood of distinct keys (rotating IPv6 addresses, random headers) cannot grow memory until the process dies.
- [ ] Aggregate limits accompany per-object limits; many small valid items cannot exhaust tenant- or process-wide state.
- [ ] Query depth, filter cardinality, pagination size, expansion fields, aggregation and downstream fan-out are bounded and validated server-side.
- [ ] Regex, nested parsing, recursive validation, graph traversal and template expansion have bounded complexity or bounded input.
- [ ] Buffers, streams, sessions, cache keys, subscriptions and pending jobs are cleaned up on disconnect, timeout, cancellation and partial parse; client disconnect propagates through database, network and worker layers.
- [ ] Retries use ceilings, jitter, circuit breakers and deduplication so one failing dependency cannot trigger a retry storm; a single malformed record is quarantined rather than blocking a shared queue.
- [ ] Paid or metered calls (email, SMS, LLM, cloud APIs) have per-request and per-tenant budgets plus provider-side spending alerts, and cannot loop unboundedly from one request.
- [ ] Public forms (contact, signup, comments) have CAPTCHA or an equivalent proportional abuse control; OTP validation and password recovery are throttled.
- [ ] Caching is a strategy, not just a Redis instance: keys carry a base TTL plus random jitter so a warm cache does not expire in one wave and stampede the database; concurrent recomputes of one key are coalesced (single-flight or lock) and stale-while-revalidate is used where correctness allows; every cache key includes tenant and authorization state; cache failure degrades to the database with its own limits rather than crashing.
- [ ] Health checks, readiness probes and timeouts exist for every dependency; the app starts and serves safely when the cache or a non-critical dependency is down.

## 10. Cryptography and password storage

- [ ] Passwords use Argon2id (minimum m=19 MiB, t=2, p=1), scrypt (N=2^17, r=8, p=1), bcrypt (work factor >= 10; 72-byte input limit) or PBKDF2-HMAC-SHA256 (600,000 iterations) with a per-user salt - never a plain or fast hash. A pepper, if used, lives in a vault/HSM, not beside the hashes.
- [ ] All security-critical random values (session IDs, tokens, nonces, keys, OTPs, correlation IDs that gate access) come from a CSPRNG.
- [ ] Token, HMAC, API-key and OTP comparisons are constant-time.
- [ ] Encryption uses authenticated modes (AES-GCM, ChaCha20-Poly1305) with unique nonces per key, never ECB, static IVs or unauthenticated CBC.
- [ ] Signatures and HMACs on cookies, webhooks, signed URLs and update metadata are verified before the payload is used, with the key or trust root independent of the payload's source.
- [ ] Key derivation uses a proper KDF with context separation; rotation keeps old ciphertext readable without reactivating revoked keys.
- [ ] Crypto failures (bad tag, bad signature, missing key) abort the operation rather than degrading to plaintext or skipped verification.
- [ ] TLS is enforced on every listener with HSTS; outbound clients verify certificates and hostnames; no `verify=False` / `rejectUnauthorized: false` reaches production.
- [ ] Backup and replica encryption keys and storage accounts have no broader identity or tenant scope than primary data.

## 11. Headers, CORS, CSP, cookies and CSRF

- [ ] CORS never reflects an arbitrary `Origin` with `Access-Control-Allow-Credentials: true`; allowed origins are exact server-side allowlist matches, not substring, prefix, suffix or unanchored regex; `*` only on endpoints with no sensitive data. `[High if credentialed cross-origin data or mutation results]`
- [ ] Cookie-authenticated state-changing endpoints use an anti-CSRF token, an effective same-site policy or strict Origin validation, including JSON, multipart, method-override and legacy routes; bearer-only endpoints are exempt. CORS is not CSRF protection; simple GET/POST skip preflight.
- [ ] WebSocket upgrades check `Origin` or require a channel-specific token when the cookie is the credential.
- [ ] An enforced CSP disallows inline and untrusted script (nonce or hash based with `'strict-dynamic'`), and restricts `object-src`, `base-uri` and `form-action`; it was rolled out via `Content-Security-Policy-Report-Only` first.
- [ ] Pages with state-changing actions set `frame-ancestors` (or `X-Frame-Options`). `[Hardening unless a sensitive action completes framed]`
- [ ] `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Cross-Origin-Opener-Policy` and `Cross-Origin-Resource-Policy` are set where cross-origin windows, embedded resources or sensitive URLs are involved.
- [ ] `Host`, `X-Forwarded-*`, `Forwarded`, `Origin` and `Referer` are trusted only when set by your own ingress, which overwrites rather than appends client copies; absolute URLs, tenant routing, callbacks and client-IP decisions use the sanitized values.
- [ ] Edge and application cache keys include every input that changes the response (host, scheme, selected cookies, normalized query, language/device headers, authorization state); personalized responses are `Cache-Control: private, no-store`; path-suffix cache deception is not possible.
- [ ] Any shared proxy or CDN cache in front of an authenticated route either bypasses the cache when a session cookie or `Authorization` header is present (nginx: `proxy_cache_bypass` and `proxy_no_cache` on `$cookie_<session>` and `$http_authorization`; the CDN equivalent is a bypass rule on that cookie or header) or puts the user in the cache key. A URL-only cache key there serves one user's page to the next: rate it High, and Critical when the cached responses carry health or other sensitive data of many users (the mass-exposure anchor in `references/severity-and-reporting.md` §4).
- [ ] Proxies and backends normalize `Content-Length`/`Transfer-Encoding`, reject conflicting framing headers and rely on a maintained proxy rather than custom HTTP parsing.
- [ ] Session cookies: `Secure; HttpOnly; SameSite=Lax|Strict; Path=/`, no `Domain`, `__Host-` prefix; never `SameSite=None` without `Secure`.

## 12. Cloud, IaC, containers and CI/CD

- [ ] Each workload runs under a dedicated identity limited to its specific operations and resources; no untrusted request or job input can select a resource outside that policy. `[High if a lower-trust input reaches an unauthorized cloud action]`
- [ ] Cross-account role assumption, token exchange and workload federation bind the trusted source account, audience, repository, namespace or workload (external ID or subject condition).
- [ ] The application never treats caller-supplied identity headers, tags, labels or account IDs as authorization unless provably set by the control plane or trusted proxy; cloud IAM and application authorization are separate checks.
- [ ] No ingress, service, security group, load-balancer annotation, port mapping or bind exposes admin, debug, metrics, node, control-plane or internal APIs to a lower-trust network, checked on the rendered manifest per environment.
- [ ] Backends behind a mesh or proxy accept forwarded identity only from that proxy, have no alternate port or health path bypassing it, and fail closed when the proxy is absent.
- [ ] Workloads cannot reach the metadata service with arbitrary URLs (IMDSv2 or hop limit enforced, egress filtered), complementing the SSRF controls in section 5.
- [ ] No lower-trust workload can request privileged mode, extra capabilities, host namespaces, host paths, device mounts, runtime sockets or mounted service-account tokens; containers run non-root with a read-only root filesystem and a seccomp profile. `[Hardening for bare settings; High if an operation crosses into the node or control plane]`
- [ ] Network, admission, secret and identity policies do not key on labels, annotations or namespaces a less-trusted principal can set.
- [ ] Bucket policies, object keys, CDN origins and signed URLs bind principal, operation, namespace, audience and expiry; list and version operations are restricted as tightly as reads and writes.
- [ ] Functions consuming provider events validate the signed envelope, subscription/topic, account, region and replay state before trusting body fields.
- [ ] Workflows triggered by pull requests, forks, issue comments or external events run contributor code without protected secrets, write tokens, deploy authority or privileged runners; privileged workflows require approval gates, environment protection and narrowed permissions.
- [ ] Branch names, commit messages, issue fields, artifact names and matrix values never enter workflow shell commands or expressions unquoted; they pass through environment variables.
- [ ] Caches, artifacts and workspaces from lower-trust jobs cannot be restored and executed or released by higher-trust jobs; keys and artifact identities are namespaced and digest-bound.
- [ ] CI tokens and deploy credentials are scoped to the repository, environment and duration needed; CI actions are pinned to a commit SHA.
- [ ] Behaviour when the mesh, admission controller, identity provider or secret store is unavailable is fail-closed and tested.

## 13. Supply chain and dependencies

- [ ] Dependencies are pinned by a committed lockfile with integrity hashes, installed strictly (`npm ci`, `--frozen-lockfile`, `--require-hashes`), and scanned for known CVEs with results triaged for reachability.
- [ ] Resolver configuration cannot confuse public and private namespaces (scoped registries, no public fallback for internal names, pinned mirrors).
- [ ] Builds consume only immutable inputs: no floating branches or tags, unverified submodules, unchecked tool downloads, remote includes, unpinned CI actions or base images by mutable tag (pin by digest).
- [ ] Checksums and signatures are validated against a trusted root independent of the download location; failed verification aborts the build.
- [ ] Generated sources (schemas, clients, vendored archives, binaries) regenerate reproducibly from reviewed inputs and match committed output.
- [ ] Test, review, signature and publication all refer to one immutable digest through every copy and repack; attestation consumers check the identity claims inside the attestation, not merely that a signature validates.
- [ ] Updaters authenticate version, product, platform, channel, target path, expiry and rollback state; installation is atomic with safe recovery.
- [ ] Plugins and extensions are confined to declared capabilities; install hooks run only after authenticity checks; package runners with auto-confirm and bare package names (`npx -y <name>`) are pinned to reviewed versions.
- [ ] The published package or image file list contains only intended release inputs; an SBOM (CycloneDX or SPDX) can be produced on request.
- [ ] Revoked key, failed download, missing attestation, partial release, rollback and registry outage paths are defined and fail closed.

## 14. Data lifecycle, PII, retention and backups

- [ ] For each protected record class you can draw the write, query, cache, index, event, export, backup, deletion and restore paths with principal and tenant marked at every edge.
- [ ] Derived copies (search, cache, embeddings, thumbnails, previews, feeds, replicas, analytics, logs, backups) apply the source ACL at retrieval and are invalidated when the source ACL or lifecycle changes.
- [ ] Exports, snapshots, reports and backups include only items the requester may read, exclude soft-deleted, private and secret content, and authorize download of the final artifact.
- [ ] Import and restore treat contents as untrusted, re-validate schema, ownership, ACL and uniqueness, and cannot overwrite existing resources or write into another tenant.
- [ ] Soft-delete predicates apply on direct lookup, search, relation traversal, object links, background processors and restore; soft-deleted identifiers cannot be re-registered while references remain.
- [ ] Membership removal, ACL update, consent withdrawal, secret revocation and role downgrade invalidate sessions, caches, subscriptions, queued jobs and materialized data.
- [ ] Deletion is idempotent and propagates tombstones to queued processors, retries, exports, analytics and generated artifacts so data is not recreated.
- [ ] Backup restore, undo, undelete and replica recovery re-authorize restored data, credentials, memberships and permissions against current policy.
- [ ] Migrations backfill tenant, ACL and lifecycle fields, avoid ID collisions, and keep old and new readers applying the same defaults during dual-write and rollback.
- [ ] Retention periods are documented per data class and enforced automatically across primary storage, backups, replicas, support snapshots and log/analytics sinks.
- [ ] PII and secrets are inventoried by field, classified, minimized and protected with encryption, access logging and retention appropriate to the class; legal notice, consent and breach-notification duties are handled with the `dpdp-legal-compliance` skill.
- [ ] Backups, cross-region replicas and restoration environments have identity and tenant scope no broader than production; support snapshots are access-controlled and expire.

## 15. Webhooks, queues, RPC and GraphQL

- [ ] "Internal" network position is never treated as authentication; the peer identity at every hop is named and mapped to the application principal by deterministic policy, not a caller-supplied field.
- [ ] Incoming webhooks are authenticated by the provider signature over the raw body and timestamp, replay is rejected by a timestamp window or nonce, and the event's account/audience matches your configuration before privileged handling; webhook handlers that reference objects (`invoice_id`) verify ownership before processing.
- [ ] User-configured outgoing webhook URLs pass the SSRF controls in section 5 and the configuring user is authorized for that resource.
- [ ] Authn/authz interceptors apply to unary methods, streams, individual stream messages, reflection, health, gateway-transcoded paths and compatibility services alike; streams and subscriptions re-check authorization when later items name different resources and stop after revocation.
- [ ] Authorization uses the authoritative envelope/transport identity; a conflicting tenant, subject or sender in the body cannot override it.
- [ ] Correlation IDs, reply queues and callback tokens are unpredictable and bound to peer, tenant, operation and lifecycle.
- [ ] Publishers and subscribers cannot select another tenant's topic, wildcard, consumer group, partition, reply queue or dead-letter route; broker ACLs and application namespace construction both enforce tenancy.
- [ ] A message body cannot declare itself an admin event, provider callback, replication record or migration instruction without an independently authenticated producer and event type.
- [ ] Unknown enum variants, missing discriminators, zero/default values, duplicate or unknown fields and compatibility mappings never reach code assuming a validated case or default privilege.
- [ ] Every at-least-once consumer is idempotent with deduplication keyed per tenant and operation and applied before mutation; stale or out-of-order messages are rejected by sequence/version checks; acknowledgement follows durable commit.
- [ ] GraphQL gates introspection in production, enforces depth, complexity and alias limits, applies field-level authorization at every resolver (including nested mutations and Relay global IDs after decoding), and prevents batched or persisted queries from bypassing rate limits or auth transforms.
- [ ] WebSocket channel names are not guessable per user; subscribe/publish authorization runs per message, not only at handshake.

## 16. Client-side and SPA

- [ ] No browser-controlled source (`location`, `document.referrer`, `window.name`, `postMessage` data, storage, cached content) reaches `innerHTML`, `outerHTML`, `document.write`, string-evaluating APIs, executable URLs or framework escape hatches unsanitized. `[High for script execution in a victim session]`
- [ ] User-controlled markup cannot inject `id`/`name` attributes that shadow globals or config objects later trusted by code (DOM clobbering).
- [ ] Every `message` handler checks `event.origin` against an exact allowlist before sensitive actions, and sensitive data is never posted to `*`.
- [ ] `window.open` and untrusted links use `noopener`; client-side navigation rejects `javascript:` and `data:` targets; COOP is set where opener relationships could be abused.
- [ ] Service-worker registration uses a fixed same-origin script with the intended scope; service-worker caches key on account and authorization state and are cleared on logout and account switch.
- [ ] Tokens, private responses and drafts in `localStorage`, `sessionStorage`, IndexedDB or Cache Storage are account-scoped, cleared on logout, and unreadable by less-trusted same-origin code (third-party scripts, widgets); session tokens prefer `HttpOnly` cookies.
- [ ] Protected cross-origin state cannot be inferred via load/error events, frame counts, redirects, timing or response size (XS-Leaks): CORP, COOP, `SameSite` cookies, `Sec-Fetch-Site` checks and uniform responses where a confidential predicate exists.
- [ ] The bundle contains no secret keys, internal URLs or flag-gated admin paths a user could enable; production source maps are not public or contain no server code.
- [ ] Third-party scripts load with Subresource Integrity under a restrictive CSP; origins with script access are minimal and reviewed.
- [ ] Client-side role gating and validation are duplicated server-side; the client is never the boundary.

## 17. Mobile apps and backends

Applies when a native or hybrid mobile app talks to the backend. The app is a frontend: everything in section 16 about "never the boundary" applies, plus:

- [ ] Tokens and refresh tokens are stored in platform secure storage (Keychain / Keystore), never in plaintext files, SQLite, shared preferences or logs; cleared on logout, account switch and device restore.
- [ ] Deep links, custom URL schemes, OAuth/magic-link/payment callbacks and share intents bind to the current session, account, provider, operation and one-time state, so another app cannot complete a flow it did not start.
- [ ] WebView-to-native bridges validate origin at call time and after every navigation, expose only allowlisted methods with normalized arguments, and require a gesture or confirmation for sensitive actions.
- [ ] TLS is verified properly (no disabled certificate checks in release builds); certificate pinning, if used, has a rotation plan.
- [ ] API keys embedded in the app are treated as public: backend authorization never relies on them; per-user tokens carry the actual authority.
- [ ] Backend endpoints used only by the app receive the same rate limiting, validation and authorization as web endpoints; a "mobile" route prefix is not a trust boundary.
- [ ] Push-notification payloads and local caches do not carry other users' data or secrets; notification deep links are authorized on open.

## 18. Features that send email

Applies to contact and enquiry forms, invites, share-by-email, notifications, password reset and any "send me a copy" option. Mail-authentication records live in DNS, not the repo: record them as checked or as not assessed, never as passed by default.

- [ ] User-supplied content is never sent to a user-supplied address. A form that emails the submitter "a copy" of their message, or accepts free-text recipients, is an open relay: anyone can send arbitrary text to anyone from your domain, which is phishing carrying your reputation. `[Medium; higher if volume is uncapped]`
- [ ] Acknowledgements to the submitter are fixed text from a template with no echoed user content (no message body, no submitted name or subject); the full submission goes only to the owner's inbox, configured server-side.
- [ ] The From address is always on your own sending domain; the submitter's address appears only as Reply-To on mail to your own inbox, after validation as a single address.
- [ ] A daily send cap exists per feature and in aggregate, alongside the endpoint's rate limit (section 9) and per-recipient limits, with an alert when the cap is hit; the provider's account limit is a backstop, not the control. The provider API key is server-side only and scoped to sending.
- [ ] Outbound mail uses a sending domain or subdomain separate from the inbox that receives enquiries, so a reputation hit or blocklisting on the sender does not also stop inbound mail.
- [ ] SPF, DKIM and DMARC are published and aligned with the visible From domain, with DMARC moving to `p=quarantine` or `p=reject` once aggregate reports are clean; if DNS was not reviewed, list it under "what could not be assessed".
- [ ] Bounce and backscatter risk is handled: mail to unverified or attacker-supplied addresses produces bounces and complaints that damage sender reputation; hard bounces and complaints suppress the address, and nothing auto-replies at volume to addresses that never confirmed.
- [ ] CR, LF and other control characters are stripped or rejected in anything placed in a mail header (subject, from-name, reply-to, recipient), and headers are built through the mail library's structured API, not string concatenation.

## 19. Launch-day minimum

If only one hour remains before launch, verify at least these and record the rest as not covered:

1. Server-side authorization on every API route and server action; RLS on every tenant table; no service-role key in client code.
2. Password hashing parameters, JWT verification settings, reset-token properties.
3. Rate limits on login, signup, reset, OTP and any endpoint that sends email/SMS or calls a paid API, held at the edge or in a shared store; CAPTCHA on public forms; email features send fixed-text acknowledgements only, never user content to a user-supplied address.
4. Secret scan of repo and history; nothing secret in client build variables; found secrets rotated and purged.
5. Debug mode off; admin, metrics and debug endpoints authenticated or removed; storage buckets private.
6. HTTPS enforced; CORS allowlist exact; session cookie flags; baseline headers.
7. Dependency audit with Highs and Criticals fixed or explicitly accepted with a date.
8. Error pages generic; admin actions logged.
9. Webhook signatures verified.

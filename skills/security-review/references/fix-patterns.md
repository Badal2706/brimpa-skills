# Fix patterns, verification gates and baseline configuration

Read this when fixing anything a review found. The rule throughout: fix the class, not the payload; prefer the framework's built-in defense; enforce at the last trusted decision point; prove the fix with a test that fails without it.

## Table of contents

1. [Vulnerability class to correct fix](#1-vulnerability-class-to-correct-fix)
2. [Fix discipline and verification gates](#2-fix-discipline-and-verification-gates)
3. [Leaked secret: rotate and purge](#3-leaked-secret-rotate-and-purge)
4. [Password hashing parameters](#4-password-hashing-parameters)
5. [JWT and session configuration](#5-jwt-and-session-configuration)
6. [Cookie baseline](#6-cookie-baseline)
7. [CORS baseline](#7-cors-baseline)
8. [Content Security Policy baseline](#8-content-security-policy-baseline)
9. [Other response headers](#9-other-response-headers)
10. [Rate limiting design](#10-rate-limiting-design)
11. [Object-level authorization and RLS](#11-object-level-authorization-and-rls)
12. [SSRF destination control](#12-ssrf-destination-control)
13. [File upload storage](#13-file-upload-storage)
14. [Webhook verification](#14-webhook-verification)
15. [Cache TTL jitter and stampede control](#15-cache-ttl-jitter-and-stampede-control)
16. [Error handling](#16-error-handling)

## 1. Vulnerability class to correct fix

| Class | Correct fix | Not a fix |
|---|---|---|
| SQL / NoSQL / command / template injection | Parameterization or structural separation **at the sink**; argument arrays without a shell; no user-controlled template source | Blocking one string, a WAF rule, "sanitizing" at the controller while the sink is reused elsewhere |
| XSS (stored, reflected, DOM) | Context-aware output encoding at render time plus an enforced CSP; audited escape hatches | Stripping `<script>` on input; relying on CSP alone |
| IDOR / BOLA | Object-level authorization in the handler or data layer: load the object scoped to the principal/tenant inside the query; RLS for tenant tables | Opaque IDs, hiding the endpoint, front-end checks, signed URLs without binding |
| BFLA (admin functions) | Role/permission check at the service that performs the action, via the shared authorization helper | Hidden buttons, feature flags, gateway-only checks |
| Authentication flaws | Fix the **server-side** verification (algorithm pinning, claim checks, token properties, fresh-auth for MFA changes) | Client-side changes, obscuring the login route |
| SSRF | Scheme and destination allowlist plus private/link-local/metadata range blocking, re-checked after redirects and DNS resolution; egress filtering | Denylisting a few hostnames, string-matching the URL |
| Path traversal | Canonicalize, then confirm containment inside the base directory after symlink resolution; server-generated names | Replacing `..` substrings |
| CSRF | Framework CSRF middleware (token) plus `SameSite` cookies and Origin validation | CORS configuration, custom-header checks alone for form posts |
| Secrets exposure | **Rotate the secret AND remove it from code and history**, then move it to a secret manager (section 3) | Deleting the line, force-pushing without rotation |
| Mass assignment / property-level authorization | Explicit allowlist of writable fields per role (DTO / serializer); never bind request bodies straight onto models | Denylisting `isAdmin` |
| Missing rate limits | Tiered limits keyed on principal or ingress-set IP, before expensive work; budgets on paid calls | A single global limit keyed on `X-Forwarded-For` |
| Verbose errors / debug on | Generic error plus correlation ID; debug impossible in production builds | Catching and re-throwing with the same message |
| Vulnerable dependency | Upgrade to the fixed version in the lockfile; replace abandoned packages; strict installs in CI | Suppressing the audit |
| Misconfigured CORS / headers | Exact-origin allowlist; header baseline set at one layer (framework middleware or ingress) and verified in a test | Reflecting Origin "temporarily" |
| Business-logic abuse | Server-side recomputation, atomic operations, idempotency keys scoped to principal + operation, state-machine preconditions | Client-side validation, UI disabling |

## 2. Fix discipline and verification gates

Before editing, establish from the code:

- The source -> sink path or the broken control.
- The attacker-controlled input and its preconditions.
- **The security invariant in one sentence** ("Only the owning tenant may read this record"; "The extracted path must stay inside the destination directory").
- The narrowest place the invariant can be enforced.
- The legitimate behaviour, public APIs and error semantics that must survive.
- The repository's existing helpers for this kind of control - reach for the codebase's own validator or authorization helper before inventing one.

Judge in this order and never trade an earlier property for a later one: (1) the current state is correctly classified (vulnerable, already safe, unproven); (2) the fix completely closes the boundary; (3) legitimate behaviour and compatibility are preserved; (4) repository checks pass; (5) repository conventions are followed; (6) the patch contains only what 1-5 require. "Minimal" means the smallest repository-native change that satisfies everything above, not the fewest lines.

Gates, in order; a failure at any gate disqualifies the fix:

1. **Applicability.** The diff contains nothing unrelated; the narrowest syntax/import/type check passes.
2. **Security closure.** Re-trace source -> control -> sink through the *patched* source and state precisely which step now fails ("the containment check rejects the path before it reaches `open()`, and `open()` is the only sink on this path"), not "the fix adds validation". Where a bounded reproduction existed, re-run it.
3. **Bypass review.** Re-read without leaning on the reasoning that produced the patch; trace changed branches from their callers; check equivalent sinks and sibling call sites of the same helper; consider at least one alternate input class (different encoding, content type, type variant, nested value, different HTTP verb or transport).
4. **Preserved behaviour.** Exercise the legitimate case through the same boundary.
5. **Repository checks.** Focused tests, then the owning package's tests, then formatter/linter/type checker. Confirm the new test **fails if the security change is removed** - a test that passes with and without the patch proves nothing.

What disqualifies a fix: it closes the specific payload but not the input class; it sanitizes at the wrong layer (after the value was already used, or in a helper other callers bypass); it relies on a caller passing the right flag or an operator-set config; it fails open (the new check sits inside a try/except that swallows failure, or returns "allowed" on error); it weakens authentication, authorization, tenant isolation, validation, sandboxing or logging to make something else pass; it silently accepts, truncates or reinterprets unsafe state instead of rejecting it; it drags in unrelated refactors.

If the gates cannot be passed, withhold the patch and give prose remediation, stating which gate could not be cleared. Do not patch an adjacent weakness as a consolation prize, and do not add speculative defense-in-depth to a path never proven reachable.

Order fixes critical -> high -> medium -> low. Re-test in the environment the finding came from and re-run the project's own test suite. Report per finding: severity, root cause, fix applied (file:line), verification result.

## 3. Leaked secret: rotate and purge

Removing a secret from code without rotating leaves the leaked value valid. Do both, in this order:

1. **Identify** the secret's type, owner system and blast radius (what it can read/write, which environments).
2. **Rotate first.** Create the new credential with least-privilege scope; put it in the secret manager or CI secret store; deploy; confirm the application works with the new value. Only then revoke the old one. (Revoking first causes an outage and tempts people to re-add the old value.)
3. **Review usage of the old credential** since the earliest exposure time (cloud audit trail, provider dashboards, API logs). Treat unexpected use as an incident, which may trigger breach-notification duties - see `dpdp-legal-compliance`.
4. **Purge** from git history (history-rewriting tool of your choice), force-push with the team informed, invalidate forks/clones you control, and check the other places it was copied: CI logs, container images and layers, build artifacts, issue trackers, chat, documentation, local `.env` files on shared machines.
5. **Prevent recurrence.** Add a pre-commit secret scan and a CI secret scan (commands in `tools.md`), move all secrets to runtime injection, add the secret's file patterns to `.gitignore` and `.dockerignore`, and set a rotation schedule.
6. **Record** the rotation time, who did it, and the review result. Never paste the old or new value into the report.

Token hygiene for the review itself: least-privilege scopes, never logged or committed, kept out of shell history (use environment files that are gitignored), rotated after the engagement.

## 4. Password hashing parameters

OWASP Password Storage Cheat Sheet, as of Oct 2026:

| Algorithm | Parameters | Notes |
|---|---|---|
| **Argon2id (preferred)** | Minimum m=19 MiB (19456 KiB), t=2, p=1. Equivalent options: 46 MiB/t=1, 12 MiB/t=3, 9 MiB/t=4, 7 MiB/t=5 (all p=1) | Use a maintained library binding |
| scrypt (fallback) | N=2^17 (128 MiB), r=8, p=1 (or N=2^16/p=2 down to N=2^13/p=10) | |
| bcrypt (legacy systems) | Work factor >= 10 | 72-byte input limit: pre-hashing or length caps need care; do not silently truncate |
| PBKDF2 (FIPS-140 contexts only) | PBKDF2-HMAC-SHA256 600,000 iterations; SHA-512 220,000; SHA-1 1,400,000 (legacy) | |

Always a per-user salt (the library handles it). A pepper, if used, lives in a vault/HSM, not beside the hashes; a pepper compromise requires password resets. Never store MD5/SHA-family hashes of passwords, even salted. Upgrade legacy hashes on next successful login.

## 5. JWT and session configuration

- Pin the algorithm and key per issuer in the verifier; never read `alg` from the token to choose behaviour; reject unsigned tokens; never let an asymmetric public key be used as an HMAC secret.
- Enforce `exp`, `nbf`, `iss`, `aud` (and `typ` where ID and access tokens could be confused); keep clock-skew tolerance small.
- `kid` is an untrusted lookup key into a fixed server-side key set; `jku`/`x5u`/inline `jwk` are ignored or restricted to a pinned allowlist with TLS validation.
- HMAC secrets: at least 256 bits of CSPRNG output, distinct per environment and service.
- Short access-token lifetime; refresh-token rotation with reuse detection; a server-side denylist or session store so logout and password change actually revoke.
- Store session tokens in `HttpOnly` cookies (section 6) rather than `localStorage`. Where a JWT must be used from JavaScript, OWASP's sidejacking mitigation is a random fingerprint in a hardened cookie with its SHA-256 hash as a claim.
- Never put secrets or sensitive PII in claims; the payload is only base64.
- Session IDs: at least 64 bits of entropy from a CSPRNG (128 if self-generated); rotate on login, MFA completion and privilege change; idle timeout 2-5 minutes for high-value apps or 15-30 minutes for low-risk, absolute timeout around 4-8 hours, both enforced server-side.

## 6. Cookie baseline

```
Set-Cookie: __Host-session=<value>; Secure; HttpOnly; SameSite=Lax; Path=/
```

- `__Host-` requires `Secure`, `Path=/` and no `Domain` attribute; it prevents subdomain cookies from shadowing the session cookie.
- `SameSite=Strict` for the most sensitive cookies; `Lax` is acceptable for the main session cookie; never `None` without `Secure`. SameSite is defense in depth, not a replacement for CSRF tokens.
- `HttpOnly` unless JavaScript must read the cookie by design (then it is not a session credential).
- No credential cookie on a parent domain shared with untrusted subdomains.

## 7. CORS baseline

- Maintain an exact-match allowlist of origins server-side (scheme + host + port). Compare whole strings; never substring, prefix, suffix or unanchored regex.
- Respond with `Access-Control-Allow-Origin: <the matched origin>` and `Vary: Origin`; never reflect an unmatched `Origin`.
- `Access-Control-Allow-Credentials: true` only together with an exact allowlisted origin, never with `*`.
- `Access-Control-Allow-Origin: *` only on endpoints that serve no sensitive data and need no credentials.
- CORS is not CSRF protection and is not access control: simple GET/POST requests skip preflight, so state-changing endpoints still need CSRF defenses and authorization.
- Absent CORS configuration must mean "no cross-origin access", not allow-all.

## 8. Content Security Policy baseline

OWASP CSP Cheat Sheet, as of Oct 2026.

Strict, nonce-based (preferred for apps that render HTML server-side):

```
Content-Security-Policy: script-src 'nonce-{RANDOM}' 'strict-dynamic'; object-src 'none'; base-uri 'none'; frame-ancestors 'self'; form-action 'self'
```

Regenerate the nonce per response with a CSPRNG; do not let middleware stamp the nonce onto every script tag it finds (that re-enables injected scripts).

Strict, hash-based (static builds):

```
Content-Security-Policy: script-src 'sha256-{HASH}' 'strict-dynamic'; object-src 'none'; base-uri 'none'; frame-ancestors 'self'; form-action 'self'
```

Non-strict fallback when nonces/hashes are not yet possible:

```
Content-Security-Policy: default-src 'none'; script-src 'self'; connect-src 'self'; img-src 'self'; style-src 'self'; frame-ancestors 'self'; form-action 'self'
```

Rollout: start with `Content-Security-Policy-Report-Only`, collect reports (`report-to` with a `Reporting-Endpoints` header; also declare `report-uri` for compatibility), then enforce. Send the header on every response. A `<meta>` tag cannot carry `frame-ancestors`, `sandbox` or `report-to`, so deliver CSP as a header.

## 9. Other response headers

| Header | Value | Purpose |
|---|---|---|
| `Strict-Transport-Security` | `max-age=<long>; includeSubDomains` (add `preload` only after confirming every subdomain serves HTTPS) | Force HTTPS |
| `X-Content-Type-Options` | `nosniff` | Stop MIME sniffing of uploads and scripts |
| `Referrer-Policy` | `strict-origin-when-cross-origin` (or stricter) | Keep URLs with tokens/IDs off third-party logs |
| `Cross-Origin-Opener-Policy` | `same-origin` | Isolate the browsing context from cross-origin openers |
| `Cross-Origin-Resource-Policy` | `same-origin` (or `same-site`) | Stop other origins from embedding sensitive resources |
| `X-Frame-Options` | `DENY` or `SAMEORIGIN` | Legacy clickjacking defense; `frame-ancestors` is authoritative |
| `Cache-Control` on personalized responses | `private, no-store` | Keep per-user data out of shared caches |
| `Content-Disposition` on user uploads | `attachment; filename="<server-generated>"` | Prevent rendering uploads as active content |

Set them in one place (framework security middleware or the ingress), then add a test that asserts their presence on a representative page and API response.

## 10. Rate limiting design

- Tier by endpoint type: strict on login, signup, password reset, OTP/MFA verification and invite acceptance; moderate on public forms, search and anything that sends email/SMS or calls a paid API; looser on authenticated actions; separate budgets for webhooks.
- On auth routes combine per-IP and per-account limits with exponential backoff rather than a hard lockout, so an attacker cannot lock legitimate users out.
- Key on something the client cannot choose: the authenticated principal or tenant, or the client IP as set by your own ingress (which overwrites any client-supplied `X-Forwarded-For`).
- Run the limiter before body parsing, password hashing, database lookups and external calls.
- Pair with request-size caps (body, upload, field count, header size, nesting depth), server-side validation of pagination and record-count parameters, execution timeouts, and per-request and per-tenant budgets plus provider-side spending alerts for paid services (OWASP API4:2023).
- Make thresholds configuration, not constants; log and alert on sustained limit hits per key.
- CAPTCHA or an equivalent on public forms is an abuse control, not a replacement for limits.

## 11. Object-level authorization and RLS

Pattern: load the object **through** the principal.

```
// Wrong: fetch by id, then check (or forget to check)
order = db.orders.find(orderId); if (order.tenantId != user.tenantId) deny();

// Right: the predicate is part of the query, in one shared helper
order = db.orders.findOne({ id: orderId, tenantId: user.tenantId }); if (!order) notFoundOrDenied();
```

- Put the tenant/owner predicate in a repository or data-layer helper that every handler, job and admin tool uses; ban `unscoped`/raw clients outside that helper via lint or review.
- Return the same status and body shape for "does not exist" and "not yours" when the resource's existence is itself sensitive.
- Validate batch and import payloads per element, including relationship fields (`ownerId`, `orgId`).

Postgres / Supabase row-level security (generic shape; adapt column and function names):

```sql
alter table orders enable row level security;
alter table orders force row level security;   -- applies to the table owner too

create policy orders_select on orders for select
  using (tenant_id = current_tenant_id());
create policy orders_insert on orders for insert
  with check (tenant_id = current_tenant_id());
create policy orders_update on orders for update
  using (tenant_id = current_tenant_id())
  with check (tenant_id = current_tenant_id());
create policy orders_delete on orders for delete
  using (tenant_id = current_tenant_id());
```

`current_tenant_id()` derives from the authenticated session (for Supabase, typically `auth.uid()` or a claim in `auth.jwt()`), never from a client-supplied column or header. Check: RLS enabled on every tenant table; a policy per verb; `with check` on insert and update; views and `security definer` functions audited; the service-role key only in trusted server code with its own authorization in front.

## 12. SSRF destination control

For any server-side fetch of a user-influenced URL (webhooks, link previews, importers, avatars, OIDC discovery, JWKS):

1. Parse with the same URL parser the HTTP client uses; allow only `https` (and `http` only if required).
2. Allowlist destinations where possible (known partner hosts); otherwise resolve DNS and reject private, loopback, link-local and cloud-metadata ranges for both IPv4 and IPv6.
3. Disable automatic redirects or re-validate every hop.
4. Pin the resolved IP for the connection to avoid re-resolution between check and use.
5. Enforce timeouts, response-size limits and no credentials on the outbound request.
6. Egress-filter the workload at the network layer and enforce IMDSv2 (or equivalent) so metadata is unreachable even if the application check fails.

## 13. File upload storage

- Validate type by content inspection plus an extension allowlist; cap size before buffering; cap count per request; quota per tenant.
- Generate the stored name server-side; keep the original name only as metadata.
- Store outside the web root or in object storage with buckets private by default and no public listing.
- Serve through short-lived signed URLs bound to the object, operation, requester and expiry, or through an authenticated download endpoint that checks object and tenant.
- Serve user content from a separate cookie-less origin with a restrictive CSP, or with `Content-Disposition: attachment` and `X-Content-Type-Options: nosniff`.
- Run image/document/archive processing under memory, CPU and time limits, ideally in an isolated worker.
- Propagate the source ACL to thumbnails, previews and search indexes; invalidate on delete.

## 14. Webhook verification

Incoming (payment providers, source-control hosts, messaging providers):

1. Read the **raw** request body before any JSON parsing; compute the provider's signature scheme over the raw bytes with the per-endpoint secret.
2. Compare in constant time; reject on mismatch before any processing.
3. Enforce the timestamp tolerance window the provider documents and deduplicate on event ID to reject replays.
4. Confirm the event's account/merchant/installation ID matches your configuration before acting.
5. Look up referenced objects (`invoice_id`, `customer_id`) scoped to the tenant the event belongs to.
6. Process idempotently; acknowledge only after durable commit.
7. Keep the endpoint off any CSRF middleware exemptions that also disable authentication, and give it its own rate budget.

Outgoing (user-configured URLs): apply section 12, sign your payloads with a per-destination secret and a timestamp so the receiver can verify, and let the configuring user set URLs only for resources they are authorized on.

## 15. Cache TTL jitter and stampede control

A cache in front of the database is not a production strategy by itself. When many keys were warmed at the same time with the same TTL they expire together, and the next wave of requests all miss and hit the database at once (a cache stampede).

- **Jitter the TTL**: `ttl = base_ttl + random(-j, +j)` with `j` a small fraction of the base (for a 12-hour TTL, offsets on the order of seconds to a couple of minutes spread expiry without hurting freshness).
- **Coalesce recomputes**: when a key misses, let one request recompute (single-flight / lock with a short lease) while others wait or serve stale.
- **Stale-while-revalidate** where correctness allows: serve the stale value and refresh in the background.
- **Key on identity**: include tenant, user or role and authorization state in every cache key that stores non-public data; never cache personalized responses at a shared edge without `Vary` and `Cache-Control: private, no-store` where appropriate.
- **Fail soft**: if the cache is down, fall through to the database with its own concurrency limit and timeouts rather than crashing or retry-storming.

```
function cached(key, baseTtlSeconds, compute):
    value = cache.get(key)
    if value != null: return value
    if lock.acquire(key, lease=5s):
        value = compute()
        cache.set(key, value, ttl = baseTtlSeconds + randomInt(-60, +60))
        lock.release(key)
        return value
    else:
        return waitForOrServeStale(key)
```

## 16. Error handling

- One error boundary per entry type (HTTP handler, job, consumer) that maps internal exceptions to a generic client message plus a correlation ID, and logs the full detail server-side with redaction applied in the logging layer.
- Production builds cannot enable debug pages or toolbars via env var, query parameter or header; verify in the rendered production configuration.
- "Not found" and "no access" share status and body shape where existence is sensitive.
- Validation errors are specific about the field and rule, never about internal structure or SQL.
- Crypto and verification failures throw and abort; no fallback to plaintext, skipped verification or "allowed" on exception.
- Security events are logged with principal, tenant, action, resource, outcome and time; someone is alerted on login anomalies, role changes and mass exports.

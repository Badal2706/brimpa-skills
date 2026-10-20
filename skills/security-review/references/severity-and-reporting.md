# Severity, verdicts and reporting

Read this before writing any finding or assigning any severity. Severity is a conclusion reached after reachability is established and the counter-evidence pass has run - never an opening position.

## 1. What counts as a finding

Every candidate must name all six:

1. The **lower-trust principal** (anonymous visitor, authenticated user, other tenant, low-privilege staff, compromised dependency).
2. The **accepted input or action**.
3. The **intended control** that should reject, bind, isolate, limit or revoke.
4. The **boundary crossed**.
5. The **affected principal or resource**.
6. A **concrete observed or owner-observable result** (an unauthorized dummy record returned, a policy difference, a wrong return value).

Not findings: a missing best practice with no affected principal, guessed deployment behaviour, a generic parser crash, self-impact (a user harming only themselves), and defense-in-depth gaps where another layer provably prevents the attack. Record these as hardening notes.

HTTP is one possible native interface, not the default. A library bug is shown with a function call, a parser bug with a fixture, a CLI bug with a command, an infrastructure bug with a rendered policy.

## 2. The three verdicts

Every candidate ends in exactly one. "I moved on" is not a verdict.

| Verdict | Meaning | Requirements | Severity? |
|---|---|---|---|
| **confirmed** | A real boundary failure | Complete trace entry point -> control -> sink -> effect, plus a bounded local reproduction with dummy data. A complete static trace whose runtime reproduction is genuinely out of reach may still be `confirmed` at **medium or low confidence** with the missing runtime proof named. | Yes |
| **needs-validation** | The repository proves the path up to one decisive fact that only the owner or a fixture can settle | The exact blocker question (does the ingress overwrite `X-Forwarded-For`; does the CDN cache key include the session cookie; does the IdP enforce `aud`; is this port reachable from the internet), plus at least one safe resolution: a bounded local fixture, or a non-destructive owner-observed check (read a config, a route table, an IAM policy). | **No** |
| **not-a-finding** | Disproved or inert | Either "safe because `<control>` at `<file:line>` does `<what>` before `<sink>` on every attacker-reachable path", or the input traced to a trusted origin, or the sink is inert in this context and you can say why, or a bounded test of the input that *should* work was blocked while a benign variant succeeded. Retain the record so the claim is not re-raised without new evidence. | No |

Rules:

- `needs-validation` is a prioritized lead, not a weak finding and not a parking place for "probably vulnerable". If you cannot name the input, the path, the missing or broken control and the effect, it is a non-finding, not a proof gap.
- A scanner hit with no trace, a "this pattern is usually dangerous" claim, or a candidate whose attacker-controlled input was never identified is not reportable under any verdict.
- Closure is not permanent: a `not-a-finding` whose named control does not cover a newly found path goes back to open.
- Where two reviewers (or two agent passes) are available, the one that validates a candidate should not be the one that found it, and should try to refute it.

## 3. Counter-evidence checklist (run before every verdict)

What does **not** rule a candidate out - none is sufficient alone:

- Generic trust in a library or helper ("it uses a well-known sanitizer", "the ORM handles it", "the framework escapes this"). Confirm *that* call with *those* arguments in *that* context. Escaping is context-specific: an HTML escaper does nothing in a JavaScript or attribute context; a SQL identifier quoter is not a value quoter; a path joiner is not a containment check.
- A control on a different path: middleware on the common route does not protect a sibling route, an internal caller, a batch/async job or an admin alias reaching the same sink.
- A control at the wrong time: validation after the redirect, canonicalization after the path is materialized, a containment check after extraction, an ownership check after the object was fetched and returned.
- A control that can fail open: hardening flags set inside a try/except that swallows failures, a parser feature a caller can override, an allowlist that is empty by default.
- A safe sibling: one correctly guarded call site says nothing about the others. Each reachable instance stands or falls on its own.
- Missing information: "could not find a caller / tell if deployed / stand up the service" is a proof gap, not proof of safety.
- Difficulty: a failed build or unavailable credentials produce a proof gap, not a clean mark.
- Operator configurability: "an operator could configure a filter", "documented", "off by default" are not controls. What ships and what is reachable is what matters.
- Being internal: internal-only, admin-only or authenticated-only reduces severity; it does not make the finding unreal.

What **does** rule a candidate out:

- A bounded test that demonstrably failed, and you understand why (not just "the response was 403").
- A control you can point at, at a location, that runs on every attacker-reachable path to the sink, before the effect, without a fail-open branch.
- A sink that is not actually dangerous in this context, with the reason stated.
- An input traced to a trusted origin rather than assumed.
- A negative control: the input that should work if the bug were real is blocked while a benign variant succeeds.

Before filing any finding:

1. **Argue the other side.** Build the strongest case that it is not exploitable or not as severe: the guard you might have missed, the deployment context, the precondition you assumed.
2. **Record what you checked** as counter-evidence - a real constraint and why it does not neutralize the finding, or the concrete list of things checked ("no validation, authorization check or rate limit on this path; tested authenticated and unauthenticated"), never just "none".
3. **Set confidence honestly.** Bounded reproduction against a running instance = high. Complete static trace you could not execute = at best medium, gap named.
4. **State what would move the severity** - the one concrete piece of evidence that would raise or lower it.

## 4. Severity anchors

Only `confirmed` records get severity. Overall severity never exceeds demonstrated impact. Rate the weakness you proved, not the worst case you can imagine reaching from it.

**Critical** - a realistic attacker gets decisive control or mass data access, with evidence:
- Unauthenticated code execution, or code execution reachable by any user on an internet-exposed surface.
- Full authentication bypass or trivially forgeable authentication (unsigned tokens accepted, signature not verified).
- Full data-store access or mass extraction of other users' or tenants' sensitive data.
- Takeover of arbitrary accounts.
- Compromise of signing keys, control-plane credentials or credentials granting broad infrastructure access.
- Complete cross-tenant isolation failure in a multi-tenant system.
- Push High to Critical when: no authentication required, internet reachable, zero user interaction, self-propagating, or the impact spans all tenants rather than one.

**High** - an explicit security control fully defeated with real consequences:
- Authentication bypass for a subset of accounts or flows; authenticated code execution.
- Privilege escalation across a real trust boundary (user to admin, tenant to tenant, read to write on protected objects).
- Object-level authorization failures exposing or modifying other users' sensitive data at scale.
- SQL injection or equivalent reaching real data.
- SSRF that demonstrably reaches internal services, cloud metadata or credentials.
- Stored script execution affecting other users.
- Unauthenticated remote stop of a shared service.
- Sensitive credential or PII exposure an attacker can actually reach.

**Medium** - a real boundary violation with limited blast radius, uncommon preconditions or a narrow resource set:
- Stored XSS in a limited context; reflected XSS requiring user interaction.
- CSRF on a meaningful state-changing action.
- Authorization gaps on lower-value objects.
- Information disclosure that materially aids a further attack.
- A finding whose high-impact version is blocked by a constraint you confirmed (internal-only exposure, a required privileged role, a narrow precondition).

**Low** - disclosure of non-secret internals, or effect requiring sustained effort for minimal gain:
- Missing security headers, cookie-flag issues, verbose errors.
- Self-XSS, or XSS requiring the victim to paste something.
- Open redirect with no credential or token leakage.
- Rate-limiting and enumeration issues without a demonstrated impact.
- Defense-in-depth gaps with no reachable exploitation path.

**Informational** - confirmed but minimal impact; mostly useful as a prerequisite inside a larger finding.

**The High/Medium discriminator:** does the result fully defeat an explicit control for an action with real consequences, or only weaken it? If you cannot state the concrete damage, the severity is lower than it feels.

**Chronically over-rated (needs unusual, demonstrated circumstances to exceed Medium):** self-XSS and clickjacking on non-sensitive actions; missing headers, cookie attributes and TLS nits; open redirect on its own; theoretical memory-safety issues with no reachable input; "could matter if chained with several unproven assumptions"; anything already requiring admin, shell or physical access; session weaknesses that require the attacker to already hold a victim secret (unless the same finding shows how to obtain it); enumeration that only confirms an account, domain or version exists.

**Downgrade, don't delete.** A constrained finding gets a lower severity, not a silent drop; the constraint is stated in the report. Missing evidence about deployment or exposure lowers *confidence*, not the severity floor: "I could not confirm this is internet-facing" is not "this is internal-only".

### Acceptance checklist for High or Critical (all must be true, else drop a level)

- [ ] The attack path is realistic and in scope - not lab-only, not dependent on an unproven prior compromise.
- [ ] The attacker position required is one an attacker can actually obtain, and the stated privileges/complexity reflect that honestly.
- [ ] The impact is material and demonstrated, not asserted; "broad read/write" means proven broad or systemic, not one record.
- [ ] The counter-evidence pass found no constraint that meaningfully limits exploitation, or you explained why the constraint does not hold.
- [ ] Reachability is concrete evidence, not an assumption about how the application is deployed.
- [ ] You would defend this rating in a client debrief with a firm's reputation on the line.

When a computed CVSS score and your intuition disagree, re-examine the metrics (usually privileges required, attack complexity or the impact triad was set optimistically). Fix the metric; do not override the result.

## 5. Ranking and coverage honesty

Rank for the reader by proven impact, not scanner severity:

1. Validated issues reachable **without authentication**.
2. Validated **cross-tenant or privilege-escalation** issues.
3. Validated issues needing an **authenticated** account.
4. **Unproven observations** (configuration, dependency, hardening notes), clearly labelled as such.

Deduplicate: one root cause exposing several paths is one finding with the strongest trace; independent missing controls are separate findings.

State plainly what was **not** tested or cannot be proven:

- Assets with no staging environment; categories a black-box run cannot reach; any run that hit its time or budget cap.
- Without a second tenant, authorization results are structurally incomplete - say so explicitly.
- Static-only findings with no running instance are described as unconfirmed.
- For authorization findings, confirm the response really contains the other tenant's data rather than an empty 200.
- "No findings" means nothing exploitable was proven in what was analyzed, not that the codebase is clean. A truncated run is not a completed assessment.
- A ledger of what was reviewed and cleared matters as much as the findings: a report that records only findings cannot tell the reader a clean area from an unvisited one.

What runtime testing can and cannot prove per OWASP Top 10:2025 category (as of Oct 2026):

| Category | Runtime/dynamic testing | Needs source, infrastructure or process review |
|---|---|---|
| A01 Broken Access Control (incl. SSRF) | Strong, **only with two tenants plus a privileged account** | Design intent of the authorization model |
| A02 Security Misconfiguration | Strong | Rendered configuration per environment |
| A03 Software Supply Chain Failures | Partial (version fingerprinting; dependency review with source) | Build and distribution integrity, provenance |
| A04 Cryptographic Failures | Partial (transport, leaked tokens in responses) | At-rest crypto, key management |
| A05 Injection | Strong | - |
| A06 Insecure Design | Partial (business-logic abuse where reachable) | Threat modelling, human review of intent |
| A07 Authentication Failures | Strong | - |
| A08 Software or Data Integrity Failures | Partial (deserialization, unsigned update paths) | CI/CD trust boundaries |
| A09 Security Logging and Alerting Failures | **Not testable from outside** | Review the logging and alerting pipeline; never mark passed |
| A10 Mishandling of Exceptional Conditions | Partial (forced errors, fail-open probes) | Exhaustive error-path review |

## 6. Finding template

```
ID: SR-<n>                      Verdict: confirmed | needs-validation | not-a-finding
Title: <what fails, for whom>   Severity: <critical|high|medium|low|informational> (confirmed only)
Confidence: high | medium | low
Class: <e.g. IDOR / BOLA>       Mapping: OWASP A01:2025, API1:2023
Fingerprint: <stable root-cause id, e.g. orders-api/getOrder/missing-tenant-predicate>

Location: <file:line> (and every sibling instance)
Lower-trust principal: <who>
Trace: entry point <route/function> -> propagation <steps> -> sink <query/call/render>
Intended control: <what should have stopped it, and where it actually lives>
Conditions: <authentication level, role, user interaction, configuration, data state, timing>
Reproduction (bounded, dummy data, app's native interface): <input / fixture / invocation>
Observed result: <factual output>
Impact: <who is affected, what they lose; one concrete sentence>
Counter-evidence checked: <controls looked for and why they do not apply; constraints that reduce severity>
What would move the severity: <one concrete piece of evidence>

Fix:
  Invariant (one sentence): <e.g. "Only members of the owning tenant may read an order">
  Smallest change at the last trusted decision point: <file, helper, diff summary>
  Regression test: <test that fails without the fix>
  Verification: <re-trace or re-run through the patched code; which step now fails>

needs-validation only:
  Blocker question: <the exact fact>
  Bounded local check: <fixture or test>
  Safe owner-observed check: <config/route/policy to read, non-destructive>
```

For `not-a-finding`, keep ID, title, claimed root cause, trace and the one-sentence reason ("safe because ... at ... before ...").

## 7. Report structure

Prose derives from the records and never changes a verdict, severity, blocker or impact.

1. **Scope and method.** Mode (QUICK/FULL), repository and commit ref (and whether the worktree was dirty), environment used, accounts and tenants used, schema source, out-of-scope list, categories skipped and why, time or budget limits hit, and a plain statement of what could not be assessed. State "source review and bounded local tests only; no production or shared systems were probed."
2. **Posture summary.** Five lines: strongest controls seen, top three risks, launch recommendation (ship / ship after fixing listed Highs / do not ship until Criticals are fixed).
3. **Confirmed findings table.** ID, severity, title, boundary crossed, one-line observed result. Sorted by severity then by impact rank.
4. **Per-finding detail** using the template above.
5. **Needs-validation table.** Title, trace, exact blocker question, bounded local next step, safe owner-observed check. No severity column.
6. **Hardening notes and positive patterns.** Not findings. Positive patterns matter: they tell the owner what to keep.
7. **Coverage ledger.** One row per category (and per subsystem in large apps): covered / finding / needs-validation / skipped with reason. For QUICK mode, one row per prompt.
8. **Next steps.** Fix order (critical, high, medium, low), re-test plan, what to automate in CI (secret scanning, dependency audit, SAST, lockfile enforcement), and when the next review is due (before next release for QUICK; after auth/tenancy/payments/infrastructure changes for FULL).

A clean run reports zero confirmed findings and its remaining limits without inventing low-severity filler.

## 8. Report hygiene

- Never include live secrets, tokens, session cookies or other users' real data. Refer to a secret by name and location and state that rotation is required.
- Use dummy principals and synthetic records in every reproduction description.
- Keep reproductions at the minimum effect; no persistence, exfiltration or availability steps, and no live-test guidance for `needs-validation` items.
- Date-stamp standards references (OWASP Top 10:2025, API Top 10 2023, OWASP cheat-sheet parameters as of Oct 2026) so a reader in a year knows what to re-check.

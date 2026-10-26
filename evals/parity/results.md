# Parity results

Method in README.md. Each pair: same task, fresh agents, one pointed at our skill and one at the upstream skill; a third agent judged the two reports blind as "A" and "B" and could verify claims against the live target.

## 2026-10-26, run 1

### seo-geo-audit vs claude-seo `seo-audit`
Task: audit https://brimpa.com (homepage plus two pages) for SEO and AI search; scored report, prioritised fixes, audit only.
Target state found by both: the domain is parked (114-byte JS redirect to a GoDaddy parking lander).

| Criterion | Ours | Upstream | Winner |
|---|---|---|---|
| Factual accuracy | 8 | 7 | ours, slight |
| Completeness | 8 | 9 | upstream, slight |
| Prioritisation / severity | 8 | 6 | ours, clear |
| Actionability | 7 | 9 | upstream, clear |
| Honesty about limits | 9 | 6 | ours, clear |
| Usefulness to owner | 7 | 7 | tie |
| **Overall** | | | **ours, slight** |

Why ours won: severities follow the root cause, unmeasured categories are excluded from the score, explicit KEEP/MODIFY/REMOVE/DO NOT TOUCH, "do not submit to Search Console until live", the training-opt-out in llms.txt correctly called a no-op, a post-launch AI measurement plan.
Why upstream was ahead on two lines: a "Failed if" check on nearly every action; more surface checks (lang, viewport and `user-scalable=no`, favicon, cert SAN and expiry, named security headers, discovery files, IndexNow, brand SERP intent, per-page on-page table). Upstream weaknesses: a headline score built on an estimated performance category, symptom findings rated Critical, internal tool names and a promotional footer in the client report.
**Action:** both upstream strengths folded into seo-geo-audit v1.1 (mandatory "Failed if" checks, check bank, added surface checks, per-page table, explicit scoring and hygiene rules).

### security-review vs cloudflare security-audit (guidance mode)
Task: pre-launch source review of an Astro site with a contact form, Pages functions, CSP and a web worker.
Both found the same confirmed Medium (contact form "copy to sender" is an open mail relay) and Low (rate-limiter map grows unbounded), the same deployment correction, no false positives.

| Criterion | Ours | Upstream | Winner |
|---|---|---|---|
| Accuracy | 9 | 9 | tie |
| Coverage | 9 | 8 | ours, slight |
| Severity / verdict discipline | 9 | 9 | tie |
| Actionability | 9 | 8 | ours, slight |
| Scope honesty | 9 | 9 | tie |
| Usefulness to a solo developer | 8 | 8 | tie |
| **Overall** | | | **ours, slight** |

Upstream-only catches: the success message that promises the email copy (must change with the fix), IPv6 /64 rotation and restart-reset of in-memory limiters, SPF/DKIM/DMARC and firewall in the not-assessed list. Ours had one OWASP mislabel (A10:2025) and internal mode/prompt names in the client report.
**Action:** folded into security-review v1.1 (UI side-effect check in fixes, IPv6 and restart realism for rate limits, email-sending checklist, scope prompts, client-language rule, OWASP mapping fix).

### web-design vs taste-skill (v2)
Task: one-page site for a two-dentist family clinic in Ahmedabad (invented brief; future runs use real projects). Judged on rendered screenshots at 320, 390 and 1440 px plus the HTML.

| Criterion | Ours | Upstream | Winner |
|---|---|---|---|
| First screen on a phone | 9 | 6 | ours, clear |
| Booking path | 9 | 7 | ours, clear |
| Visual distinctiveness and craft | 7 | 8 | upstream, slight |
| Trust and honesty | 7 | 4 | ours, clear |
| Accessibility and responsiveness | 8 | 7 | ours, slight |
| Weight and robustness | 9 | 4 | ours, clear |
| **Overall** | **~8.2** | **~6** | **ours, clear** |

Ours: what/where/open-now/how-to-book in the top 480 px, sticky call and WhatsApp bar, editable prefilled message, visible photo slots with shot specs, Gujarati wordmark and fonts, 44 KB page. Upstream: more memorable art direction (printed-menu treatments, receipt slip, giant phone number), JSON-LD Dentist schema, but invented dentist names, stock street photos leading the phone screen, placeholders hidden in HTML comments, 880 KB page.
Our defects: sample fees shown as real prices (marked only in a comment), hero WhatsApp button scrolled to the form instead of opening WhatsApp, empty photo slots dominating desktop, no structured data, long mobile form.
**Action:** folded into web-design v1.2 (visible sample markers, direct hero action, modest photo placeholders, LocalBusiness JSON-LD in the build, "one crafted artefact" rule with industry ideas, lean mobile forms).

### launch-video vs Brag (latent-spaces/brag, HyperFrames)
Method differs from the others: Brag's finished Brimpa Care job (plan, build scripts, composition, two rendered cuts) was used as the bar, capability by capability. 23 capabilities compared: before the fold-in ours had 1 yes, 11 partial, 11 no; after launch-video v1.2 all 23 are covered, with tested helper scripts (strongest-section finder matched Brag's music cue within 0.02 s; the pre-delivery checker flagged a true-peak overshoot in a delivered file). Deliberately not adopted: real-screen capture as default (privacy), -1 dBTP target (kept -1.5), baked poster on looping cuts, 28 px type floor (kept 26 px). A head-to-head render on a real project (Brimpa Care) is the next step.

---
name: dpdp-legal-compliance
description: Audit and implement privacy and legal compliance for apps and websites under India's DPDP Act 2023 and DPDP Rules 2025, plus the generic pre-launch legal checklist (privacy policy, terms, refund and cookie policies, consent banner, data deletion, unsubscribe, dark patterns, accessibility basics, business details, licensed assets). Use whenever the user mentions DPDP, privacy policy, cookie banner, consent, PII or personal data, data deletion or "right to be forgotten", grievance officer, breach notification, children's data, trackers or analytics SDKs, "is this legal", or is about to launch, ship or deploy a site or app that collects names, phone numbers, emails, health, payment or location data, even if they never say "legal" or "compliance". Also use when asked for a privacy notice, terms clause, breach runbook or consent-record design. Produces a codebase audit, implementation tasks on a compliance branch, DPDP_PROGRESS.md, and document templates marked "for lawyer review". Not legal advice.
license: MIT
metadata:
  author: Brimpa
  version: "1.1"
  updated: "2026-10-30"
---

# DPDP legal compliance

Audit a codebase for how it collects, stores, shares and deletes personal data, then implement the technical side of India's Digital Personal Data Protection Act, 2023 (the Act) and the DPDP Rules, 2025 (the Rules), together with the generic legal must-haves every public app or site needs before launch. The output is code changes on a branch, a progress file, and document drafts.

This skill is not legal advice. It produces engineering work and draft text for a lawyer to review; say this once in the final summary and mark every policy or notice you draft "DRAFT - for lawyer review".

## How to run this

1. **Scope the engagement.** Ask (or infer from the repo) what the product is, who the users are, whether any are under 18, whether health, financial or location data is involved, which third-party services are used, where servers run, and the launch date. Note the business's legal name, address and a named contact person; if unknown, add them to the open-questions list rather than inventing them.
2. **Branch and progress file.** Create branch `compliance/dpdp` (or the user's name); do not push. Create `DPDP_PROGRESS.md` at the repo root using the template in "Output format" and append a dated entry for every decision.
3. **Inventory personal data flows.** Find every collection point, storage location, third-party recipient and tracker (see "Data inventory"). Record field, purpose, lawful ground, storage, recipients, retention, deletion path. This table is the backbone of the notice, the consent purposes and the rights workflow, so do it before writing any copy.
4. **Classify.** Flag children (under 18), health or other high-harm data, data leaving India, data used to make decisions about a person, and any data the business holds only as a processor for someone else (then the client is the Data Fiduciary and most duties are theirs, but the contract and security duties are yours).
5. **Map obligations to dates.** Use the timeline and obligations table below. As of Oct 2026 most substantive duties are scheduled for 13 May 2027; build now, and state the date in the progress file so the owner knows what is live versus upcoming.
6. **Audit gaps.** Walk `references/dpdp-obligations.md` and `references/launch-legal-checklist.md`; mark each item Done / Partial / Missing / N/A with file paths as evidence.
7. **Implement in priority order:** standalone privacy notice page; per-purpose unticked consent plus consent records; gate non-essential trackers behind the banner; grievance contact in footer and notice; data-rights request form and backend workflow; withdrawal control; retention schedule and deletion jobs; `BREACH_RUNBOOK.md`; data-protection clause in Terms; processor contract checklist; children's flow if applicable. Open `references/templates.md` for each document.
8. **Flag security gaps** found along the way (plaintext secrets, no HTTPS, fail-open encryption, unverified captcha, no access logs, no backups). Record them; fix trivial ones; hand the rest to the `security-review` skill.
9. **Run the generic launch checklist** (refund policy, unsubscribe, dark patterns, fake reviews, alt text, contrast, keyboard, business details, licensed fonts and images).
10. **Close out.** Fill the summary sections of `DPDP_PROGRESS.md`: built, needs lawyer review, open items for the business owner, dates to watch. Report in chat using the "Final summary" format.

## Timeline (status as of Oct 2026)

| Instrument / phase | Date | Status |
|---|---|---|
| Act commencement notification G.S.R. 843(E); Rules notified G.S.R. 846(E) | 13 Nov 2025 | Done |
| Phase 1: Rules 1, 2, 17-21 (definitions, Data Protection Board, appeals to TDSAT) | 13 Nov 2025 | Live |
| Phase 2: Rule 4, Consent Manager registration (First Schedule) | 13 Nov 2026 | Upcoming |
| Phase 3: Rules 3, 5-16, 22, 23 (notice, security, breach, retention, contact, children, SDF, rights, cross-border) | 13 May 2027 | Upcoming; build now |
| MeitY proposal to shorten Phase 3 to 12 months (13 Nov 2026), floated Jan 2026 | - | Not notified as of 20 Oct 2026; watch MeitY |
| DPDP (Removal of Difficulties) Order, 2026, S.O. 5458(E) | 5 Oct 2026 (gazetted 7 Oct) | Clarificatory text fixes only |
| Data Protection Board chair and members | - | Appointment unverified as of Oct 2026; no complaint portal announced |
| Significant Data Fiduciary notifications | - | None found as of Oct 2026 |

Some secondary sources write 14 Nov 2026 / 14 May 2027; the gazette counts from 13 Nov 2025, so use the 13th. Because no Phase 3 duty is in force yet, penalties for them cannot be levied today, but a product shipped now will be live when they start, so treat 13 May 2027 as the deadline and 13 Nov 2026 as the prudent target.

## Obligations summary

Full text with Act/Rule citations, penalties and SDF extras is in `references/dpdp-obligations.md`; read it when auditing or when the user asks "what exactly does the law require". The short version:

| Duty | Cite | What the code must do | Live from |
|---|---|---|---|
| Lawful ground per purpose | Act s.4, s.6, s.7 | Record consent or a specific s.7 "legitimate use" per data category; s.7 is not blanket permission | 13 May 2027 |
| Standalone itemised notice | Act s.5, Rule 3 | Notice readable on its own (not a link to a long policy): itemised data, specific purposes and the goods/services enabled, how to withdraw, exercise rights and complain to the Board; English plus any of the 22 Eighth-Schedule languages on request | 13 May 2027 |
| Consent quality | Act s.6 | Free, specific, informed, unconditional, unambiguous, clear affirmative action; unticked boxes; per purpose | 13 May 2027 |
| Withdrawal | Act s.6, Rule 3 | As easy as giving consent; stop processing within a reasonable time; instruct processors to stop | 13 May 2027 |
| Security safeguards | Act s.8(5), Rule 6 | Encryption/masking/tokens, access control, logging with monitoring and review, backups, processor contract terms; keep logs and the related personal data at least 1 year | 13 May 2027 |
| Breach notification | Act s.8(6), Rule 7 | Without delay: plain-language notice to each affected person and initial notice to the Board; within 72 h: detailed Board report. No materiality threshold. CERT-In 6-hour incident reporting (2022 directions) is separate and already in force | 13 May 2027 |
| Retention and erasure | Act s.8(7), Rule 8, Third Schedule | Erase when purpose served or consent withdrawn unless law requires retention; Third Schedule 3-year default applies only to very large platforms (see reference) | 13 May 2027 |
| Contact person | Act s.13, Rule 9 | Publish on site/app and in every rights response the business contact of a person who can answer processing questions (DPO only if SDF) | 13 May 2027 |
| Rights and grievances | Act ss.11-14, Rule 14 | Publish how to request access, correction, erasure, nomination; identifiers needed; respond within a published period not exceeding 90 days | 13 May 2027 |
| Children (under 18) | Act s.9, Rules 10, 12 | Verifiable parental consent (identity/age already held, or voluntary details or a virtual token, e.g. via DigiLocker); no tracking, behavioural monitoring or targeted ads at children; Fourth Schedule exemptions for some classes such as clinical establishments (secondary source, verify) | 13 May 2027 |
| Persons with disabilities | Rule 11 | Lawful guardian consent | 13 May 2027 |
| Processors | Act s.8(1)-(2), Rule 6(1)(f) | Valid written contract with security terms; fiduciary stays liable | 13 May 2027 |
| Cross-border | Act s.16, Rule 15 | Default allowed; Central Government may restrict by order; none issued as of Oct 2026. Know where every vendor processes data | 13 May 2027 |
| SDF only | Act s.10, Rule 13 | India-resident DPO, DPIA and independent data audit every 12 months, algorithmic due diligence, localisation of specified categories | On notification |

Penalty ceilings (Act s.33 and Schedule, "may extend to", per contravention): security safeguards Rs 250 crore; breach notification Rs 200 crore; children's data Rs 200 crore; SDF duties Rs 150 crore; anything else Rs 50 crore. Appeals go to TDSAT. Do not quote any "cumulative" figure; none exists in the Schedule.

## Data inventory: where personal data hides

Search the repo, then confirm at runtime where you can. Record findings in the inventory table of `DPDP_PROGRESS.md`.

- **Forms and inputs:** `<input`, `<form`, `name=`, `type="email"|"tel"`, React Hook Form / Formik / Zod schemas, mobile form screens, chat or WhatsApp intake, contact and booking widgets, newsletter signups, lead-capture popups.
- **Schemas and models:** migrations, Prisma/Drizzle/SQLAlchemy/Mongoose models, columns such as name, phone, email, dob, address, aadhaar, pan, gender, diagnosis, prescription, ip, device_id, location, photo.
- **Server and API:** request bodies and query params, file uploads, webhooks (payment, WhatsApp, calendar), background jobs that email or message users, exports and CSV downloads.
- **Logs and analytics:** console/log statements containing request bodies or user objects, error trackers (Sentry etc.) capturing PII, session-replay tools, server access logs.
- **Third parties and SDKs:** `package.json`, `requirements.txt`, Gradle/Podfile, `<script src=`, tag managers, pixels (ads, social), analytics, maps, fonts served remotely (they send the visitor's IP), CDNs, payment gateways, CRM, email/SMS providers, cloud storage buckets, AI APIs that receive user text.
- **Secrets and config:** `.env*`, CI variables, hard-coded keys; note each key's vendor as a recipient of data.
- **Cookies and storage:** `document.cookie`, `Set-Cookie`, `localStorage`, `IndexedDB`, mobile keychain or shared prefs; split essential (session, CSRF, consent state) from non-essential (analytics, ads, A/B).
- **Children's signals:** age or DOB fields, "student", "parent", "guardian", school or paediatric content.

For each item record: field, purpose, lawful ground (consent / s.7 use), storage location, recipients, country of processing, retention, deletion path, owner. A field without a purpose is a data-minimisation finding: remove it or justify it.

## Consent UX rules

Consent must be free, specific, informed, unconditional and unambiguous with a clear affirmative action (Act s.6), and withdrawal must be as easy as giving it (Rule 3). Translate that into UI:

- One checkbox per purpose (e.g. "Appointment reminders by SMS", "Marketing emails", "Analytics cookies"), each unticked by default, each with a one-line plain-language purpose. Never bundle marketing into the service-necessary consent.
- Service-necessary processing (delivering the order, sending the receipt, the appointment itself) is typically an Act s.7 legitimate use rather than consent; do not ask for consent you would not honour if refused, because consent that cannot be declined is not consent.
- The notice is standalone: show the itemised data and purposes at the collection point (inline text, expandable panel or a dedicated short page), not only "By continuing you agree to our Privacy Policy".
- Reject and Accept get equal visual weight; no "Accept all" primary button with a grey "Manage" link. Avoid confirm-shaming copy ("No, I don't want to save money").
- Non-essential trackers do not load until the matching purpose is granted. Implement as: consent state in a first-party cookie or storage key; tag manager or script loader reads it; default denied. Verify with the network tab that no analytics or pixel request fires before consent.
- Withdrawal: a "Privacy settings" or "Manage consent" control reachable from the footer and account settings, same number of clicks as granting; on withdrawal, stop the processing, delete non-essential cookies, enqueue processor notifications, write a withdrawal record.
- Language: offer the notice in English plus the regional language of the user base (any of the 22 Eighth-Schedule languages) at least on request; structure notice text as translatable strings with a version key, not hard-coded JSX.
- Every grant or withdrawal writes a consent record (schema in `references/templates.md`): who, which purpose, which notice version and language, when, how, and the evidence. Keep records for the life of the processing plus the retention period in your schedule.
- Pre-existing data (collected before commencement) needs a notice "as soon as reasonably practicable": plan an email or in-app notice to the existing user base.

For the visual design of banners, settings pages and forms without manipulative patterns, hand off to the `ui-ux` skill.

## Data-rights and grievance handling

Rights under the Act: access to a summary of personal data and processing, including the other Data Fiduciaries and processors it was shared with (s.11); correction, completion, updating and erasure (s.12); grievance redressal (s.13); nomination of another person to act on death or incapacity (s.14).

Implement:

- A request form (or documented email route) that collects the identifier your system actually uses (customer ID, registered email or phone), the right being exercised, and free text. Verify the requester against the account (magic link or OTP to the registered contact) before releasing data.
- A back-office queue with status, assignee, due date and audit trail. Publish a response period in the notice; the Rules cap it at 90 days. Aim for far less; a clinic or small app can answer in days.
- Access response: export of the person's data categories, purposes, recipients and retention in a readable format, plus the contact person's details in every response (Rule 9). The Act has no data-portability right, so a machine-readable export is good practice, not a legal duty: never promise it as DPDP compliance (`references/dpdp-obligations.md` §4).
- Erasure: delete or anonymise across primary DB, backups on their rotation, search indexes, analytics user IDs, CRM and email tools; keep what another law requires (tax, medical records) and say so in the response. Log the erasure.
- Nomination: a settings field for nominee name and contact, or at least a documented manual process.
- Grievance contact: name or role, email, and postal address of the business, in the footer, the notice page, and account settings. Exhausting this route is required before a person can go to the Board, so make it work.

Open `references/templates.md` for the form fields, SLA table, response templates and grievance page text.

## Retention and deletion

- Write a retention schedule per data category with the legal basis for keeping it (e.g. tax records, clinical-establishment or EHR rules for medical records, which override erasure requests for their period). Put the schedule in the notice.
- Default rule: erase when the purpose is served or consent is withdrawn, unless law requires retention (Rule 8).
- Keep processing logs and the personal data they relate to for at least 1 year (Rule 6/8(3)).
- The Third Schedule 3-year inactivity erasure with 48-hour advance notice applies only to e-commerce entities with at least 2 crore registered Indian users, online gaming intermediaries with at least 50 lakh, and social media intermediaries with at least 2 crore. Smaller products set their own periods; a reasonable pattern is to borrow the inactivity-notice idea.
- Implement as scheduled jobs with dry-run output and a log line per deletion; test on a staging copy.

## Breach runbook summary

Write `BREACH_RUNBOOK.md` from the template in `references/templates.md`. Core timeline once anyone becomes aware of a breach:

1. Contain and preserve evidence; open an incident record with timestamps (the 72-hour clock runs from awareness).
2. CERT-In: report cyber incidents in the notified categories within 6 hours under the 2022 directions (already in force, separate from DPDP).
3. Without delay: concise plain-language notice to each affected person through their account or registered contact: nature, extent, timing and location of the breach; likely consequences for them; mitigation taken or proposed; safety measures they can take; business contact for queries.
4. Without delay: initial notice to the Data Protection Board with nature, extent, timing, location and likely impact.
5. Within 72 hours of awareness (extendable by the Board on written request): detailed report with updated facts, circumstances and reasons, mitigation, findings about the person who caused it, remedial measures to prevent recurrence, and a report of the notices sent to affected persons.
6. Post-incident: root cause, fixes, update the runbook; keep all records at least 1 year.

Every breach is notifiable; there is no materiality threshold in Rule 7. As of Oct 2026 the Board's filing channel is not announced; leave a placeholder and note that MeitY will publish it.

## Children and high-harm data

- A child is anyone under 18. If the product can reasonably be used by minors (schools, paediatric clinics, gaming, education, teen social), build an age step and a verifiable parental consent flow: verify the parent is an identifiable adult using identity or age details you already hold, details they volunteer, or a virtual token from an authorised entity such as DigiLocker. Record the verification method in the consent record.
- No behavioural tracking, profiling or targeted advertising directed at children; disable analytics and ad SDKs for accounts flagged as minors.
- The Act has no separate "sensitive data" category, but health, financial, biometric and location data raise the harm from any breach. Encrypt at rest, restrict access by role, and keep these fields out of logs, analytics and AI prompts. If AI features process personal data, hand off to the `llm-app-security` skill.

## Processors and cross-border

- List every vendor that touches personal data (hosting, DB, email/SMS, WhatsApp API, payment, CRM, analytics, error tracking, AI APIs, support desk). For each: data received, purpose, country, contract or DPA link, security terms present (yes/no), deletion on instruction (yes/no).
- WhatsApp messaging to clients or patients only through Meta's Cloud API or an official Business Solution Provider; unofficial gateways (whatsmeow, Baileys, Evolution API in Baileys mode) break WhatsApp's terms, risk a number ban and put an uncontracted processor in the data path, so they are a finding (`references/dpdp-obligations.md` §9).
- A vendor without a written contract covering security is a finding. Most SaaS vendors publish a DPA; link it and note it in `DPDP_PROGRESS.md` for the lawyer.
- Cross-border transfer is allowed by default; no restricting orders exist as of Oct 2026. Still record the processing country so the owner can react if an order lands, and prefer an Indian region when the vendor offers one at no cost.

## Generic launch legal checklist

Twenty items that apply to any public app or site regardless of DPDP, each with how to verify it in code, are in `references/launch-legal-checklist.md`; read it at step 9 or whenever the user asks "what do I need before launch". Headlines: privacy policy; terms of service; refund and cancellation policy; cookie policy; cookie consent banner; form consents; data minimisation; third-party SDK audit; no dark patterns; no hidden fees; no fake reviews; no unsupported claims; alt text; colour contrast; keyboard navigation; business details; age consent for children's data; unsubscribe link in every marketing email; licensed fonts and images; data deletion requests.

## Output format

### DPDP_PROGRESS.md (create at step 2, update continuously)

```markdown
# DPDP compliance progress

Status as of: YYYY-MM-DD | Branch: compliance/dpdp | Not legal advice; drafts marked for lawyer review.

## Scope
Product, users, children (Y/N), high-harm data (Y/N), SDF-likely (Y/N), launch date, business legal name/address/contact person (or OPEN).

## Personal data inventory
| # | Field | Collected at (file) | Purpose | Lawful ground | Stored in | Recipients (vendor, country) | Retention | Deletion path | Status |

## Obligations audit
| Duty | Live from | Status (Done/Partial/Missing/N/A) | Evidence (files) | Action |

## Launch legal checklist
| # | Item | Status | Evidence | Action |

## Decisions log
- YYYY-MM-DD: decision, reason, alternative rejected.

## Built in this pass
- file -> what it does

## Needs lawyer review
- document / clause -> why (jurisdiction, retention period, exemption claim, wording)

## Security gaps flagged
- finding -> severity -> handed to security-review (Y/N)

## Open items for the business owner
- legal name, address, contact person, retention periods, vendor contracts to sign, languages to support

## Dates to watch
- 13 Nov 2026 Consent Manager rules; 13 May 2027 substantive duties; MeitY acceleration notification; Board constitution and filing channel.
```

### Final summary (chat)

```
DPDP / legal compliance pass: <repo> (branch compliance/dpdp, not pushed)
Status as of <date>. Not legal advice; drafts marked for lawyer review.

Inventory: <n> personal-data fields, <n> third parties (<n> outside India), children: <Y/N>
Built: <bullet list of files and features>
Gated trackers: <list> now load only after consent (verified in network tab)
Gaps remaining: <bullets with severity>
Needs lawyer review: <bullets>
Open questions for you: <bullets>
Dates: substantive duties 13 May 2027 (possibly earlier if MeitY notifies acceleration); Consent Manager rules 13 Nov 2026
```

## Worked examples

**Clinic booking site (Next.js + Postgres, WhatsApp reminders, Google Analytics).** Inventory finds name, phone, DOB, symptoms in a booking form, GA loading on every page, WhatsApp API vendor, hosting in Singapore. Actions: standalone notice at the booking form in English and Gujarati; checkbox for WhatsApp reminders (unticked) separate from the booking itself (s.7 use); GA gated behind an analytics consent; retention schedule citing clinical-records rules (period marked for lawyer); DOB triggers a parental-consent step for under-18 patients with a note on possible Fourth Schedule exemption for clinical establishments (verify); footer grievance contact; `BREACH_RUNBOOK.md`; vendor table with DPA links.

**SaaS dashboard with a React marketing site.** Inventory finds signup email and company name, Stripe, Intercom chat, Hotjar session replay, Mailchimp. Actions: Hotjar and Intercom gated and masked for input fields; Mailchimp marketing consent unticked and separate from transactional email; unsubscribe link verified in every template; data-rights form wired to a support queue with a 30-day published SLA; Terms get a data-protection clause; refund policy page added because the pricing page promised "cancel anytime".

**Quick question: "Do I need a cookie banner?"** Answer from the rules: if only essential cookies (session, CSRF, consent state) are set, no consent banner is needed but the notice must still list them; if any analytics, ads or session-replay runs, gate it and show the banner. Offer to run the full audit.

## Anti-patterns: refuse or push back

- Do not fake consent: no pre-ticked boxes, no "consent" inferred from scrolling or continued use, no logging a consent record the user did not actively give, no back-dating records.
- Do not hide trackers: no loading analytics or pixels before consent "because the numbers matter", no renaming a tracker to pass as essential, no server-side tagging used to dodge the banner.
- Do not bundle: one consent for service plus marketing plus analytics is not specific.
- Do not make withdrawal harder than consent (email-only withdrawal when consent was one click).
- Do not invent business details, retention periods, lawyer-approved wording or a Board filing address; mark them OPEN.
- Do not write fake reviews, testimonials or unsupported health or financial claims into the site while you are in there.
- Do not present the drafts as legally sufficient; they are starting points for a lawyer.

## When the user pushes back

- "The law isn't in force yet, skip it." True for Phase 3 duties as of Oct 2026, but the product will be live when they start on 13 May 2027 (or earlier if accelerated), retrofitting consent records is far costlier than collecting them from day one, and existing data will need a notice anyway. Offer to ship the notice, consent records and tracker gating now and defer the rest with dates in the progress file.
- "Just add a privacy policy link." A link to a long policy does not meet the standalone, itemised notice requirement of Rule 3; the short inline notice costs a few lines of copy.
- "Pre-tick the marketing box, conversion drops otherwise." Pre-ticked consent is not consent under s.6; offer better placement and plain-language benefit copy instead.
- "We're too small for this." Penalty ceilings apply to any Data Fiduciary; only the Third Schedule retention defaults and SDF duties are size-based.

## Hand-offs

- `security-review`: encryption, access control, logging, backup and secret-handling findings (Rule 6 safeguards).
- `ui-ux`: consent banner, settings page and form design without dark patterns.
- `llm-app-security`: when AI features receive personal data (prompt logging, vendor retention, injection).
- `seo-geo-audit`: nothing to hand off; a gated analytics setup does not affect indexing.

## Reference files

- `references/dpdp-obligations.md`: read when auditing against the law or when asked what a specific section or rule requires; full duties with citations, dates, penalties, SDF extras, retention classes, Consent Manager conditions.
- `references/templates.md`: read when drafting any document; privacy notice outline, consent record JSON schema, data-rights form and SLA, grievance page text, breach runbook with Board and user notice templates, processor clause checklist, Terms data-protection clause.
- `references/launch-legal-checklist.md`: read at step 9 or for any "what do I need before launch" question; the 20 generic items with how to verify each in code.
- `references/sources.md`: upstream sources and licenses.

# Templates: notice, consent records, rights, grievance, breach runbook, contracts, Terms

Every document here is a DRAFT for lawyer review. Keep that banner in the generated file. Replace every `[PLACEHOLDER]`; never invent legal names, addresses, retention periods or filing addresses; leave them as placeholders and list them under "Open items for the business owner" in `DPDP_PROGRESS.md`. Status of the law as of Oct 2026: the duties these templates serve are scheduled to apply from 13 May 2027 (possibly 13 Nov 2026 if MeitY notifies the acceleration).

## Contents

1. Privacy notice outline (standalone, Rule 3)
2. Collection-point micro-notice and consent checkboxes
3. Consent record JSON schema
4. Consent events and withdrawal flow
5. Data-rights request form, verification and SLA
6. Response templates for rights requests
7. Grievance and contact page text
8. Retention schedule template
9. BREACH_RUNBOOK.md
10. Processor contract clause checklist
11. Terms of Service: data-protection clause outline
12. Cookie policy outline
13. Vendor and SDK register

---

## 1. Privacy notice outline (standalone, Rule 3)

File: `/privacy` page (web) or a Privacy screen in-app, plus a version string and a language switcher. Written in plain language; each section short enough to read on a phone. The notice must be understandable on its own, so do not rely on "see our Terms".

```markdown
<!-- DRAFT - for lawyer review. Version [1.0], effective [DATE]. Languages: English, [Hindi/Gujarati/...]. -->

# Privacy notice for [PRODUCT NAME]

[LEGAL ENTITY NAME] ("we"), [registered address], is the Data Fiduciary for the personal data described below.

## 1. What personal data we collect (itemised)
| Data | When we collect it | Why (purpose) | What it enables |
|---|---|---|---|
| Name, phone number | Booking form | To create and confirm your appointment | Appointment service |
| Date of birth | Booking form | To identify the right patient record and apply age rules | Appointment service |
| Email | Account signup | To secure your account and send receipts | Account access |
| Analytics cookies | When you accept them | To measure which pages work | Site improvement (optional) |
| [...] | | | |

## 2. Legal basis
We process service data because you asked for the service (legitimate use under section 7 of the DPDP Act). We process [marketing / analytics / reminders] only with your consent, which you can withdraw at any time.

## 3. Who we share it with
| Recipient | Role | Data | Country |
|---|---|---|---|
| [Hosting provider] | Processor | All stored data | [India/Singapore] |
| [WhatsApp API vendor] | Processor | Name, phone, appointment time | [...] |
| [Payment gateway] | Independent fiduciary | Payment details | India |
We do not sell personal data.

## 4. How long we keep it
See our retention schedule: [table or link to section]. We delete or anonymise data when the purpose ends or you withdraw consent, unless a law requires us to keep it (for example [medical-record / tax] rules: [PERIOD - lawyer to confirm]).

## 5. Your rights
You can ask for: a summary of your data and who we shared it with; correction or completion; erasure; and you can nominate someone to exercise these rights if you are unable to. Use the form at [/privacy/request] or email [privacy@domain]. We respond within [N] days (never more than 90).

## 6. Withdrawing consent
Open [Privacy settings] in your account or the [Manage consent] link in the footer; untick the purpose. Withdrawal takes the same number of steps as giving consent. It does not affect processing already done.

## 7. Children
Our service is [not intended for / available to] persons under 18. [If available:] we obtain verifiable consent from a parent or guardian before processing a child's data and we do not track or target advertising at children.

## 8. Security
We protect your data with encryption, access controls, logging and backups, and we require the same from our processors.

## 9. Contact and complaints
Questions and grievances: [NAME or ROLE], [email], [postal address], [phone, optional]. We acknowledge within [N] days and resolve within [N] days (max 90). If you are not satisfied after that, you may complain to the Data Protection Board of India [link to be added when the Board publishes it].

## 10. Changes
We will notify you of material changes by [email / in-app notice]. Previous versions: [link].
```

Also produce the same text as translatable strings (`privacyNotice.v1.en.json`, `privacyNotice.v1.hi.json`, ...) so the version and language can be written into consent records.

## 2. Collection-point micro-notice and consent checkboxes

Place directly above the submit button of every form that collects personal data. Each optional purpose is a separate unticked checkbox; service-necessary processing is stated, not asked.

```html
<!-- DRAFT - for lawyer review -->
<fieldset class="consent" data-notice-version="1.0" data-notice-lang="en">
  <p>
    We use your <strong>name, phone number and date of birth</strong> to book and confirm
    your appointment. Full details: <a href="/privacy">privacy notice</a>.
  </p>
  <label>
    <input type="checkbox" name="consent[reminders_whatsapp]" value="1">
    Send me appointment reminders on WhatsApp
  </label>
  <label>
    <input type="checkbox" name="consent[marketing_email]" value="1">
    Email me health tips and offers (about twice a month)
  </label>
  <p class="small">You can change these any time in Privacy settings. Withdrawing is as easy as ticking.</p>
</fieldset>
```

Rules: no `checked` attribute; no disabled submit until marketing is ticked; no "By continuing you agree" for optional purposes; the micro-notice text comes from the same versioned strings as the full notice.

## 3. Consent record JSON schema

Store one immutable row per consent event. Never update a row in place; write a new event and derive current state.

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "ConsentEvent",
  "type": "object",
  "required": ["id", "principal_ref", "purpose_id", "status", "notice_version", "notice_language", "occurred_at", "method", "source"],
  "properties": {
    "id": { "type": "string", "description": "UUID of this event" },
    "principal_ref": { "type": "string", "description": "Internal user ID or pseudonymous hash; never the raw phone/email" },
    "purpose_id": { "type": "string", "enum": ["service_core", "reminders_whatsapp", "marketing_email", "analytics_cookies", "ads_cookies", "session_replay", "ai_feature"], "description": "Stable purpose key; extend per product" },
    "status": { "type": "string", "enum": ["granted", "denied", "withdrawn", "expired"] },
    "notice_version": { "type": "string", "description": "Version of the notice text shown, e.g. 1.0" },
    "notice_language": { "type": "string", "description": "BCP 47 tag of the notice shown, e.g. en, hi, gu" },
    "notice_hash": { "type": "string", "description": "SHA-256 of the exact notice text shown; proves what was displayed" },
    "occurred_at": { "type": "string", "format": "date-time", "description": "UTC ISO 8601" },
    "method": { "type": "string", "enum": ["checkbox", "banner", "settings_toggle", "api", "consent_manager", "paper_form_scanned", "parental_flow"] },
    "source": { "type": "string", "description": "Page route, screen name or API endpoint" },
    "actor": { "type": "string", "enum": ["principal", "parent_guardian", "lawful_guardian", "nominee", "staff_on_request"] },
    "parent_verification": {
      "type": "object",
      "description": "Present only when actor is parent_guardian",
      "properties": {
        "method": { "type": "string", "enum": ["existing_identity_on_file", "voluntary_identity_details", "virtual_token_digilocker", "other_authorised_token"] },
        "reference": { "type": "string", "description": "Token or record reference, not the document itself" }
      }
    },
    "evidence": {
      "type": "object",
      "properties": {
        "ip_truncated": { "type": "string", "description": "IPv4 with last octet zeroed or IPv6 /48; minimised" },
        "user_agent_family": { "type": "string" },
        "request_id": { "type": "string" }
      }
    },
    "withdrawal_of": { "type": "string", "description": "ID of the granted event this withdraws, if status is withdrawn" },
    "processors_notified_at": { "type": "string", "format": "date-time", "description": "When downstream processors were instructed to stop, for withdrawals" },
    "retain_until": { "type": "string", "format": "date", "description": "Per retention schedule; at least one year after last processing" }
  }
}
```

Indexes: `(principal_ref, purpose_id, occurred_at desc)` for current-state lookups; `(occurred_at)` for the one-year log rule. Export: a function that returns a person's full consent history in a readable table for access requests.

## 4. Consent events and withdrawal flow

```
grant:    UI tick -> POST /consent {purpose_id, notice_version, notice_language} -> insert ConsentEvent(granted) -> set first-party consent cookie/state -> load gated scripts for that purpose
withdraw: Privacy settings untick -> POST /consent/withdraw {purpose_id} -> insert ConsentEvent(withdrawn, withdrawal_of) -> clear purpose cookies/storage -> stop jobs for that purpose -> enqueue processor instructions (unsubscribe at email vendor, delete analytics user ID, etc.) -> record processors_notified_at
```

Acceptance tests: no network request to any gated vendor before grant; withdrawal reachable in the same number of clicks as grant; a withdrawn purpose never fires again on reload; history exportable.

## 5. Data-rights request form, verification and SLA

Route: `/privacy/request` (web) or Account > Privacy > "Request my data". Also accept email at the published address and log it into the same queue.

Fields:

| Field | Required | Notes |
|---|---|---|
| Identifier we use | yes | Registered email or phone, or customer/patient ID. Say which ones you accept (Rule 14 requires publishing this) |
| Request type | yes | Access summary / Correct or update / Erase / Nominate / Withdraw consent / Other grievance |
| Details | optional | Free text; for correction, the new value |
| Acting for someone else? | yes | Self / Parent or guardian of a child / Lawful guardian / Nominee; attach basis |
| Declaration | yes | "The information I have given is accurate" (s.15 duties) |
| Preferred language for reply | optional | English or an Eighth-Schedule language |

Verification before any disclosure: send a one-time link or OTP to the registered email or phone on file; for staff-logged requests, record who verified and how. Do not release data to an unverified channel.

Queue record: `request_id, received_at, channel, type, principal_ref, verified_at, assignee, due_at, status (received / verified / in_progress / completed / rejected_with_reason), closed_at, notes`.

SLA to publish (choose numbers with the owner; the legal cap is 90 days):

| Step | Target |
|---|---|
| Acknowledge | within [2] working days |
| Verify identity | within [5] working days |
| Complete access / correction / withdrawal | within [15] days |
| Complete erasure (including processors and backup rotation note) | within [30] days |
| Hard cap | 90 days (Rule 14) |

## 6. Response templates for rights requests

Every response includes the contact person's business details (Rule 9).

```
Subject: Your privacy request [REQUEST_ID] - [type]

Hello [name],

We received your request on [date] to [access / correct / erase / nominate / withdraw consent].

[Access] Attached is a summary of the personal data we hold about you, the purposes, and the organisations we have shared it with:
- Data categories: [...]
- Purposes: [...]
- Shared with: [vendor - role - data - country] [...]
- Retention: [...]
- Your consent history: [attached]

[Correction] We have updated [field] from [old] to [new] on [date] and informed [processors] where relevant.

[Erasure] We have deleted or anonymised your data in our systems on [date] and instructed our processors to do the same. We have kept [records] because [law] requires us to retain them until [date]. Backups are overwritten on a [N]-day cycle.

[Withdrawal] We stopped [purpose] on [date]. This does not affect processing done before then.

[Rejected or partial] We could not complete this because [reason: identity not verified / legal retention / not your data]. You may [next step].

If you are not satisfied, reply to this message or write to our grievance contact below. Once our process is exhausted you may approach the Data Protection Board of India.

[CONTACT NAME or ROLE], [LEGAL ENTITY NAME]
[email] | [postal address] | [phone]
```

## 7. Grievance and contact page text

Place in the footer ("Privacy and grievances"), on the notice page, and in account settings.

```markdown
<!-- DRAFT - for lawyer review -->
## Data protection contact

For questions about how [PRODUCT] uses your personal data, or to raise a grievance:

[NAME or ROLE, e.g. "Data Protection Contact"]
[LEGAL ENTITY NAME]
[Postal address]
Email: [privacy@domain]
Phone: [optional]

We acknowledge grievances within [N] working days and aim to resolve them within [N] days; in all cases within 90 days. If you are not satisfied with our response after that period, you may complain to the Data Protection Board of India. [Board contact to be added when published.]
```

If the business is notified as a Significant Data Fiduciary, replace the contact with the India-resident Data Protection Officer.

## 8. Retention schedule template

| Data category | Purpose | Retention trigger | Period | Legal basis for keeping | Deletion method | Owner |
|---|---|---|---|---|---|---|
| Booking records (name, phone, slot) | Appointment | Appointment date | [N months] | Operational | Scheduled job, hard delete | [role] |
| Clinical notes / prescriptions | Treatment | Last visit | [PERIOD - lawyer to confirm under clinical-establishment / EHR rules] | Medical-record law | Archive then delete | [role] |
| Invoices | Tax | Financial year end | [PERIOD - lawyer to confirm] | Tax law | Archive then delete | [role] |
| Marketing consent and emails | Marketing | Withdrawal | Stop immediately; keep consent record 1 year after | Rule 6/8 logs | Vendor unsubscribe + local flag | [role] |
| Analytics identifiers | Site improvement | Consent withdrawal or [N] months inactivity | [N] | None (consent) | Vendor API delete | [role] |
| Access and processing logs | Security | Log write | at least 1 year | Rule 6(1)(e), Rule 8(3) | Rotation | [role] |
| Consent events | Proof | Last processing | at least 1 year after; longer if claims possible | Rule 6/8 | Never modified; purge by policy | [role] |
| Backups | Continuity | Snapshot | [N] days rotation | Operational | Rotation; note in erasure replies | [role] |

Implement each row as a scheduled job with a dry-run flag and a per-row log line.

## 9. BREACH_RUNBOOK.md

```markdown
# Personal data breach runbook (DRAFT - for lawyer review)

Applies to any unauthorised processing, accidental disclosure, acquisition, sharing, use, alteration, destruction or loss of access to personal data. There is no size threshold: every breach follows this runbook. Status as of Oct 2026: DPDP Rule 7 duties scheduled from 13 May 2027; CERT-In 6-hour reporting already applies.

## Roles
- Incident lead: [name/role, phone]
- Technical lead: [name/role]
- Communications (user notices): [name/role]
- Legal contact: [firm/name]
- Data protection contact (published): [name/role, email]

## Timeline (T0 = moment anyone in the organisation becomes aware)
| When | Action | Owner | Done (time) |
|---|---|---|---|
| T0 | Open incident record with T0 timestamp; start the log below | Incident lead | |
| T0 + 1 h | Contain: rotate credentials, revoke tokens, isolate systems, preserve logs and snapshots (do not wipe evidence) | Technical lead | |
| T0 + 6 h | CERT-In report if the incident falls in the notified categories (2022 directions) | Incident lead | |
| Without delay | Initial notice to the Data Protection Board (template B1) | Incident lead | |
| Without delay | Notice to each affected Data Principal via account or registered contact (template U1) | Communications | |
| T0 + 72 h | Detailed report to the Board (template B2), or written request for extension before the deadline | Incident lead + Legal | |
| T0 + 7 d | Post-incident review; remedial actions tracked; runbook updated | All | |
| Ongoing | Keep all incident records, notices and logs at least 1 year | Technical lead | |

## Facts to establish (fill as known; update the Board when they change)
- Nature of the breach (what happened): 
- Extent (which data, how many people, which systems): 
- Timing (when it started, when discovered, how discovered): 
- Location (systems, regions, vendors involved): 
- Likely impact on affected persons: 
- Cause and the person or process responsible (findings): 
- Mitigation taken / proposed: 
- Remedial measures to prevent recurrence: 
- Intimations sent to Data Principals (count, channel, time): 

## Where to send Board notices
As of Oct 2026 the Board has not published a filing channel. [Insert official address/portal when MeitY publishes it; until then record the attempt and send to the channel the Rules or Board specify at the time.]

## Template B1: initial notice to the Data Protection Board (without delay)
Subject: Intimation of personal data breach - [LEGAL ENTITY NAME]
1. Data Fiduciary: [legal name, address, contact person, email, phone]
2. Date and time we became aware: [UTC and IST]
3. Nature of the breach: [...]
4. Extent: [data categories], approx. [N] Data Principals, systems [...]
5. Timing and location of occurrence: [...]
6. Likely impact: [...]
7. Immediate measures taken: [...]
8. A detailed report will follow within 72 hours of awareness.

## Template B2: detailed report to the Board (within 72 hours)
Subject: Detailed report of personal data breach - [LEGAL ENTITY NAME] - ref [incident id]
1. Updated and detailed description (nature, extent, timing, location, likely impact)
2. Broad facts: events, circumstances and reasons leading to the breach
3. Measures implemented or proposed to mitigate risk
4. Findings regarding the person(s) who caused the breach
5. Remedial measures taken to prevent recurrence
6. Report of intimations to affected Data Principals: channel, date/time, number reached, copy of notice
7. Attachments: timeline, evidence index, vendor statements
8. Contact for follow-up

## Template U1: notice to affected Data Principals (without delay; concise, plain language; in the user's language)
Subject: Important: a security incident affecting your [PRODUCT] data

Hello [name],

What happened: On [date], [plain description, e.g. "an unauthorised person accessed a database that stores booking details"]. We discovered it on [date] and stopped it on [date].
What information was involved: [list, e.g. name, phone number, appointment dates]. [Not involved: passwords / payment card numbers, if true.]
What this could mean for you: [e.g. unexpected calls or messages pretending to be from us].
What we have done: [containment, password resets, vendor actions].
What you can do: [change your password; ignore messages asking for OTPs; we will never ask for payment by chat; contact your bank if ...].
Questions: [CONTACT NAME or ROLE], [email], [phone], [postal address].

We are sorry this happened. We have also informed the Data Protection Board of India as required.

## Incident log
| Time (UTC) | Event / decision | By |
|---|---|---|
```

## 10. Processor contract clause checklist

Use when reviewing a vendor DPA or drafting terms for a subcontractor. Tick each; a missing item goes to the lawyer list.

- Parties and roles: who is Fiduciary, who is Processor; subject matter, duration, nature and purpose of processing; data categories.
- Instructions: processor acts only on documented instructions; no use for its own purposes (training AI models included unless agreed).
- Security safeguards (Rule 6(1)(f)): encryption at rest and in transit, access control, logging and monitoring, backups, personnel confidentiality.
- Breach assistance: notify the Fiduciary without undue delay with the facts needed for the Fiduciary's "without delay" and 72-hour duties; cooperate in investigation.
- Sub-processors: list, prior notice of changes, flow-down of the same terms.
- Rights assistance: help with access, correction, erasure and withdrawal within the Fiduciary's SLA.
- Erasure and return: delete or return on instruction and at end of contract; certify; backup rotation period stated.
- Location: countries of processing and storage; notice of changes; ability to select an Indian region if required by a future order.
- Audit and information: right to request compliance information or audit reports.
- Log retention: processor keeps relevant logs at least 1 year or supplies them to the Fiduciary.
- Liability and indemnity for processor breach.
- Governing law and dispute resolution in India where possible.

## 11. Terms of Service: data-protection clause outline

```markdown
<!-- DRAFT - for lawyer review -->
## Personal data and privacy
1. Our Privacy Notice at [/privacy] explains what personal data we collect, why, who we share it with, how long we keep it and your rights. It forms part of these Terms only to the extent it describes our obligations; where it conflicts with these Terms, the Privacy Notice governs personal data.
2. Where we need your consent, we will ask for it separately and specifically. You can withdraw consent at any time through [Privacy settings]; withdrawal does not affect processing done before it.
3. You agree to provide accurate information and to update it when it changes, and not to impersonate another person or submit false details (section 15 of the DPDP Act).
4. If you create an account for or provide data about another person (including a child), you confirm you are entitled to do so and, for a child, that you are the parent or lawful guardian and have completed our verification step.
5. We engage service providers (listed in the Privacy Notice) under contracts that require them to protect your data. We remain responsible for their processing on our behalf.
6. We may transfer and process data outside India as described in the Privacy Notice, subject to any restriction the Government of India notifies.
7. To exercise your rights or raise a grievance, use [/privacy/request] or contact [contact person details]. We respond within [N] days and in all cases within 90 days.
8. Account deletion: you can delete your account at [path]. We erase or anonymise your data as described in the Privacy Notice, except what we must keep by law.
```

## 12. Cookie policy outline

Only needed if cookies or similar storage are used; can be a section of the notice.

| Cookie / key | Set by | Purpose | Essential? | Expiry | Consent purpose ID |
|---|---|---|---|---|---|
| `session` | us | Keep you signed in | yes | session | - |
| `csrf` | us | Security | yes | session | - |
| `consent` | us | Remember your choices | yes | 12 months | - |
| `_ga` | [Analytics vendor] | Measure page use | no | [vendor value] | analytics_cookies |
| `_fbp` | [Ads vendor] | Ad measurement | no | [vendor value] | ads_cookies |

Add: how to change choices (link to Manage consent), and that essential cookies cannot be disabled without breaking login.

## 13. Vendor and SDK register

Keep in `DPDP_PROGRESS.md` or `docs/vendors.md`.

| Vendor / SDK | Where loaded (file) | Role (processor / independent fiduciary) | Data received | Purpose ID | Country | Contract / DPA link | Security terms | Deletion on instruction | Gated behind consent | Status |
|---|---|---|---|---|---|---|---|---|---|---|
| Google Analytics | `app/layout.tsx` | processor | page views, pseudonymous ID, truncated IP | analytics_cookies | [...] | [link] | yes | API | yes | OK |
| WhatsApp API vendor | `lib/notify.ts` | processor | name, phone, slot | reminders_whatsapp | [...] | [link] | ? | ? | n/a (server) | Open: confirm DPA |
| Payment gateway | `app/checkout` | independent fiduciary | payment details | service_core | India | [link] | yes | n/a | n/a | OK |

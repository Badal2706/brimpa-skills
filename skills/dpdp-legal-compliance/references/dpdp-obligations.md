# DPDP Act 2023 and DPDP Rules 2025: obligations reference

Status as of 20 Oct 2026. Rule text was read from a public mirror of G.S.R. 846(E) (the official MeitY PDF was not fetchable at the time); the Fourth and Seventh Schedules were not read directly and are marked "secondary". This is an engineering reference, not legal advice; every claim about exemptions, retention periods or penalty exposure for a specific business needs a lawyer.

## Contents

1. Instruments and timeline
2. Key terms
3. Duties of every Data Fiduciary (with citations)
4. Rights of the Data Principal
5. Children and persons with disabilities
6. Security safeguards (Rule 6) in detail
7. Breach notification (Rule 7) in detail
8. Retention, erasure and the Third Schedule
9. Processors and cross-border transfer
10. Significant Data Fiduciary extras
11. Consent Managers
12. Penalties
13. What is unverified or secondary

---

## 1. Instruments and timeline

| Instrument | Reference | Date | Note |
|---|---|---|---|
| Digital Personal Data Protection Act, 2023 | Act No. 22 of 2023 | Assent Aug 2023 | Sections brought into force by notification |
| Act commencement notification | G.S.R. 843(E) | 13 Nov 2025 | Secondary but consistent across law-firm sources |
| DPDP Rules, 2025 | G.S.R. 846(E) under s.40 | 13 Nov 2025 | Draft was Jan 2025 |
| Corrigendum | G.S.R. 892(E) | 10 Dec 2025 | Secondary |
| Removal of Difficulties Order, 2026 | S.O. 5458(E) | 5 Oct 2026, gazetted 7 Oct 2026 | Two textual fixes: s.9(1) "child or of a person with disability"; s.10(2)(c)(ii) "audit" to "data audit". Clarificatory only |

Phased commencement (Rule 1):

| Phase | Date | Rules in force | Meaning for a product |
|---|---|---|---|
| 1 | 13 Nov 2025 (live) | 1, 2, 17-21 | Definitions; Data Protection Board proceedings, selection committee, members' terms, appeals to TDSAT |
| 2 | 13 Nov 2026 | 4 | Consent Manager registration opens (First Schedule). Optional for a small site |
| 3 | 13 May 2027 | 3, 5-16, 22, 23 | Notice, State processing, security safeguards, breach intimation, retention/erasure, contact information, children's and disability consent, SDF obligations, rights, cross-border, exemptions |

Acceleration: MeitY floated (stakeholder meeting 22 Jan 2026, comments by 4 Feb 2026) cutting the 18-month window to 12 months, i.e. Phase 3 on 13 Nov 2026, at least for SDFs, and making cross-border restrictions and information-call powers immediate. Not notified as of 20 Oct 2026. If it is notified, every "13 May 2027" below becomes "13 Nov 2026".

Data Protection Board: MeitY invited applications for Chairperson and four Members (6 May 2026, further notification 6 June 2026). No appointment confirmed as of Oct 2026; no complaint or breach-filing portal announced.

Some trackers write 14 Nov 2026 / 14 May 2027. The gazette counts from 13 Nov 2025; use the 13th.

## 2. Key terms

- **Data Principal**: the individual the data is about; for a child, includes the parent or lawful guardian; for a person with disability, includes the lawful guardian.
- **Data Fiduciary**: whoever alone or with others determines the purpose and means of processing. Your client's business, for its own users.
- **Data Processor**: processes on behalf of a Fiduciary (hosting, email vendor, analytics). The Fiduciary remains liable (Act s.8(1)).
- **Personal data**: any data about an individual who is identifiable by or in relation to it. The Act applies to digital personal data (and non-digital data later digitised) processed in India, and to processing outside India in connection with offering goods or services to persons in India.
- **Child**: under 18 years (s.2(f)).
- **Consent Manager**: a registered entity that lets a person give, manage, review and withdraw consent through an accessible, transparent, interoperable platform. A startup showing its own consent box is not one (ss.2(g), 6(7)-(9); Rule 4).
- **Significant Data Fiduciary (SDF)**: a Fiduciary or class notified by the Central Government based on volume and sensitivity of data, risk to rights, sovereignty, security, public order and similar factors (s.10). None notified as of Oct 2026.
- **Personal data breach**: any unauthorised processing or accidental disclosure, acquisition, sharing, use, alteration, destruction or loss of access that compromises confidentiality, integrity or availability.

## 3. Duties of every Data Fiduciary

All of these are scheduled to be enforceable from 13 May 2027 unless accelerated. Build now.

| # | Duty | Citation | Engineering translation |
|---|---|---|---|
| 1 | Process only for a lawful purpose with consent or a s.7 legitimate use | Act ss.4, 6, 7 | Inventory table has a lawful ground per field and purpose. Legitimate uses are specific (e.g. the person voluntarily provided data for a specified purpose and has not objected; employment; medical emergency; legal obligation); they are not a general "business interest" basis |
| 2 | Give notice before or at the time of requesting consent | Act s.5, Rule 3 | Standalone notice (readable without any other document), clear and plain language, containing at minimum: (i) itemised description of the personal data; (ii) specified purpose(s) and a specific description of the goods, services or uses enabled; (iii) link to the Fiduciary's website or app; (iv) how to withdraw consent with ease comparable to giving it; (v) how to exercise rights; (vi) how to complain to the Board |
| 3 | Notice for pre-existing data | Act s.5(2) | For data collected with consent before commencement, send the notice "as soon as reasonably practicable"; processing may continue until withdrawal |
| 4 | Consent quality | Act s.6(1) | Free, specific, informed, unconditional, unambiguous, clear affirmative action, limited to the specified purpose, only the data necessary for it |
| 5 | Language | Act ss.5(3), 6(3) | Person may access the notice and consent request in English or any of the 22 languages in the Eighth Schedule of the Constitution |
| 6 | Withdrawal | Act s.6(4)-(6), Rule 3 | Ease of withdrawal comparable to giving consent; consequences of withdrawal borne by the person; Fiduciary and its processors cease processing within a reasonable time unless retention is required by law |
| 7 | Consent through a Consent Manager | Act s.6(7)-(9), Rule 4 | Optional for the person; if used, the Fiduciary must be able to receive and act on consent signals from registered Consent Managers (interoperability). Registration opens 13 Nov 2026 |
| 8 | Overall responsibility | Act s.8(1) | Fiduciary is responsible for compliance for all processing done by it or by processors on its behalf, regardless of any agreement or the person's failure to perform duties |
| 9 | Engage processors only under a valid contract | Act s.8(2), Rule 6(1)(f) | Written contract for every vendor processing personal data; contract covers security safeguards |
| 10 | Accuracy | Act s.8(3) | Where data is used to make a decision affecting the person or is disclosed to another Fiduciary, ensure it is complete, accurate and consistent. Validation and correction paths |
| 11 | Technical and organisational measures | Act s.8(4) | Policies, access roles, access review, training, incident response: people and processes, not only code |
| 12 | Reasonable security safeguards | Act s.8(5), Rule 6 | See section 6 below |
| 13 | Breach intimation | Act s.8(6), Rule 7 | See section 7 below |
| 14 | Erase when purpose served or consent withdrawn | Act s.8(7), Rule 8 | See section 8 below |
| 15 | Publish contact information | Act s.8(9), s.13, Rule 9 | Prominently on website or app and in every response to a rights communication: business contact of the DPO (if SDF) or a person able to answer on the Fiduciary's behalf questions about processing. Also the grievance officer route under s.13 |
| 16 | Grievance redressal | Act s.13, Rule 14 | Readily available means of grievance redressal; respond within the published period, which must not exceed 90 days. Person must exhaust this route before approaching the Board |
| 17 | Rights handling | Act ss.11, 12, 14, Rule 14 | Publish the means (form, email, portal) and the identifiers (username, customer ID, registered email or phone) the person must provide; support nomination |
| 18 | Children and persons with disabilities | Act s.9, Rules 10-12 | See section 5 below |
| 19 | Cross-border | Act s.16, Rule 15 | See section 9 below |
| 20 | Cooperate with the Board; information calls | Act ss.27-28, 36 | Keep processing logs, consent records, breach records and decision records so you can answer an information request |

## 4. Rights of the Data Principal

| Right | Citation | What to build |
|---|---|---|
| Access to information | s.11 | On request: summary of personal data being processed and the processing activities; identities of all other Data Fiduciaries and Data Processors with whom data has been shared, with a description of the data shared; any other prescribed information. Export function plus vendor list from the inventory |
| Correction, completion, updating, erasure | s.12 | Edit-profile paths that cover downstream copies; erasure workflow across DB, backups on rotation, indexes, analytics IDs, vendors, unless retention required by law |
| Grievance redressal | s.13 | Published channel and SLA (max 90 days) |
| Nominate | s.14 | Field or process to record a nominee who may exercise rights on death or incapacity |
| Withdraw consent | s.6(4) | Equal-ease control; triggers processing stop and processor notification |

Duties of the Data Principal (s.15): comply with law, not impersonate, not suppress material information, not file false or frivolous complaints, provide only verifiably authentic information for correction or erasure. Penalty for breach up to Rs 10,000. Useful to cite in the rights form's declaration line.

## 5. Children and persons with disabilities

- Child = under 18 (s.2(f)). Before processing a child's personal data, obtain verifiable consent of the parent or lawful guardian (s.9(1)).
- Prohibited (s.9(2)-(3)): processing likely to cause detrimental effect on a child's well-being; tracking or behavioural monitoring of children; targeted advertising directed at children.
- Verification (Rule 10): adopt appropriate technical and organisational measures to ensure the consenting person is the parent and is an identifiable adult, using (a) reliable details of identity and age already available to the Fiduciary, or (b) details of identity and age voluntarily provided, or a virtual token mapped to those details issued by an entity entrusted by law or the Central Government, including a Digital Locker service provider (DigiLocker). The Rule's illustrations cover a parent who is already a registered user and one who is not.
- Persons with disabilities (Rule 11): consent of the lawful guardian, who must be verified as appointed under the relevant guardianship law.
- Exemptions (Rule 12, Fourth Schedule, secondary, not read directly): certain classes of Fiduciary (reported to include healthcare professionals and clinical establishments, educational institutions, creche and childcare providers) are exempt from parts of s.9 for specific purposes such as health services, education and safety monitoring; and tracking for specific purposes such as age verification or safety may be allowed. A clinic treating minors should have its lawyer confirm the exact scope before relying on it.
- Penalty ceiling for s.9 breaches: Rs 200 crore.

Engineering checklist: age or DOB step where minors are plausible; parental-consent flow with verification method recorded; separate consent record linking child account to the verified parent; feature flags that disable analytics, ads SDKs and behavioural features for minor accounts; no marketing to minor accounts.

## 6. Security safeguards (Rule 6) in detail

Rule 6(1) lists the minimum "reasonable security safeguards":

| Item | Rule 6(1) | Verify in code and infra |
|---|---|---|
| Encryption, obfuscation, masking or virtual tokens | (a) | TLS everywhere; at-rest encryption for the DB and backups; field-level encryption or tokenisation for high-harm fields; masking in logs and support UIs |
| Access control | (b) | Role-based access to data stores and admin panels; least privilege for service accounts; MFA for admins |
| Visibility: logs, monitoring, review | (c) | Access logs on personal-data stores; alerting on anomalous access; documented periodic access review |
| Continuity: backups | (d) | Tested backups; restore drill recorded; backups also encrypted |
| Retention of logs and data for one year | (e) | Logs and the personal data they relate to retained for at least one year (unless another law says otherwise) to enable breach detection and investigation |
| Processor contract terms | (f) | Every processor contract includes security safeguard obligations |
| Technical and organisational measures | (g) | Policies, training, incident response, access review cadence |

Failure to take reasonable safeguards carries the highest ceiling: Rs 250 crore. Hand the technical verification to the `security-review` skill; record the result in `DPDP_PROGRESS.md`.

## 7. Breach notification (Rule 7) in detail

Applies to every personal data breach; there is no harm or size threshold in the Rule.

On becoming aware of a breach, the Fiduciary shall:

1. **To each affected Data Principal, without delay**, through their user account or the registered mode of communication, in concise, clear and plain language:
   - description of the breach including its nature, extent, timing and location of occurrence;
   - likely consequences for the person;
   - measures implemented or proposed to mitigate risk;
   - safety measures the person may take to protect their interests;
   - business contact information of a person able to respond to queries.
2. **To the Board, without delay**: description of the breach including nature, extent, timing, location and likely impact.
3. **To the Board, within 72 hours of becoming aware** (or a longer period the Board allows on written request):
   - updated and detailed information on the above;
   - broad facts related to the events, circumstances and reasons leading to the breach;
   - measures implemented or proposed to mitigate risk;
   - findings regarding the person who caused the breach;
   - remedial measures taken to prevent recurrence;
   - a report of the intimations given to affected Data Principals.

Separate regime already in force: CERT-In directions of April 2022 require reporting of listed cyber-security incidents to CERT-In within 6 hours of noticing them, and 180-day log retention within India for ICT systems under those directions. Treat CERT-In and DPDP as two parallel checklists in the runbook.

Penalty ceiling for failing to notify: Rs 200 crore. Board filing channel: not announced as of Oct 2026; keep a placeholder in the runbook and watch MeitY.

## 8. Retention, erasure and the Third Schedule

- General rule (Act s.8(7), Rule 8): erase personal data, and cause processors to erase it, when the person withdraws consent or as soon as it is reasonable to assume the specified purpose is no longer being served, unless retention is necessary for compliance with any law.
- "Purpose no longer served" is presumed when the person neither approaches the Fiduciary for the purpose nor exercises rights for the period in the Third Schedule (for the classes listed there).
- Logs: keep personal data and the associated traffic and processing logs at least one year after the data was last processed to enable breach detection and investigation (Rule 8(3) read with Rule 6).

Third Schedule classes and defaults (apply only to these classes):

| Class | Threshold (registered users in India) | Default erasure | Advance notice |
|---|---|---|---|
| E-commerce entity | at least 2 crore | 3 years from the date the person last approached the Fiduciary for the purpose or exercised rights, or from Rules commencement, whichever is later | At least 48 hours before erasure, inform the person that data will be erased unless they log in, engage or exercise rights |
| Online gaming intermediary | at least 50 lakh | same | same |
| Social media intermediary | at least 2 crore | same | same |

Exceptions within those classes: data needed for the person to access their account and for any virtual tokens issued by or on behalf of the Fiduciary that can be used for money, goods or services.

A clinic, agency or small SaaS is below these thresholds. It should publish its own retention schedule grounded in the laws that bind it (tax and company records, clinical-establishment or EHR record-keeping for medical data, employment records) and otherwise erase when the purpose ends. Periods in the schedule are a lawyer-review item; do not invent them.

## 9. Processors and cross-border transfer

- Processors act only under a valid contract (s.8(2)); the contract must cover security safeguards (Rule 6(1)(f)); the Fiduciary remains liable (s.8(1)). On withdrawal or erasure the Fiduciary must cause processors to stop and erase (s.6(6), s.8(7)).
- Cross-border (s.16, Rule 15): transfer outside India is permitted by default; the Central Government may by general or special order restrict transfer to specified countries or impose requirements on making data available to a foreign State or entities under its control. No such orders found as of Oct 2026. Other Indian laws with stricter localisation (e.g. for payment system data) continue to apply (s.16(2)).
- SDF localisation (Rule 13(4)): the Central Government may specify categories of personal data, including traffic data, that an SDF must not transfer outside India. Not relevant until notified as an SDF and until categories are specified.

Engineering checklist: vendor table with country of processing; DPA or contract link per vendor; deletion-on-instruction confirmed; Indian region selected where offered.

## 10. Significant Data Fiduciary extras

Apply only on notification under s.10. None notified as of Oct 2026. If the product grows into a likely SDF (large user base, health or financial data at scale, profiling), plan for:

| Duty | Citation | Requirement |
|---|---|---|
| Data Protection Officer | s.10(2)(a) | Based in India, responsible to the board of directors or governing body, point of contact for grievances; contact details published (Rule 9) |
| Independent data auditor | s.10(2)(b) | Appointed to evaluate compliance |
| DPIA and data audit | s.10(2)(c), Rule 13(1)-(2) | Once in every period of twelve months; the auditor reports significant observations to the Board |
| Algorithmic due diligence | Rule 13(3) | Verify that algorithmic software used for processing is not likely to pose a risk to the rights of Data Principals |
| Localisation | Rule 13(4) | Categories specified by the Central Government not to leave India |

Penalty ceiling for SDF breaches: Rs 150 crore.

## 11. Consent Managers

Relevant only if the product wants to be one, or needs to accept consent signals from one.

- Registration opens 13 Nov 2026 (Rule 4; First Schedule).
- Part A conditions (summary): company incorporated in India; net worth not less than Rs 2 crore; sound financial and operational capacity; fit-and-proper management; independent certification of its platform; interoperable platform.
- Part B obligations (summary): act as a fiduciary to the Data Principal; data flowing through it must be unreadable to the Consent Manager; maintain consent records (given, denied, modified, withdrawn) and share them with the person; retain records for seven years or as agreed; no subcontracting of its obligations; publish ownership and conflict-of-interest information.
- Registration portal: not announced as of Oct 2026.

For an ordinary app: design consent records so that a future Consent Manager integration can import or receive them (purpose ID, notice version, timestamp, status), nothing more.

## 12. Penalties

Act s.33 and the Schedule. Wording is "may extend to"; the Board decides per contravention after inquiry, considering nature, gravity and duration, type of data affected, repetition, gains or losses avoided, mitigation and proportionality. Appeals go to TDSAT (Rule 21, live since 13 Nov 2025).

| Breach | Ceiling |
|---|---|
| Failure to take reasonable security safeguards (s.8(5)) | Rs 250 crore |
| Failure to notify the Board or affected Data Principals of a breach (s.8(6)) | Rs 200 crore |
| Children's data obligations (s.9) | Rs 200 crore |
| SDF obligations (s.10) | Rs 150 crore |
| Any other provision of the Act or Rules | Rs 50 crore |
| Data Principal duties (s.15) | Rs 10,000 |
| Breach of a voluntary undertaking (s.32) | up to the ceiling for the underlying breach |

A "Rs 500 crore cumulative for repeat offences" figure circulates in some summaries; it is not in the Schedule. Do not use it.

## 13. What is unverified or secondary

- Fourth Schedule (children's exemptions) and Seventh Schedule: not read from the primary text; descriptions above come from secondary summaries.
- G.S.R. 843(E) and G.S.R. 892(E) numbers: consistent across law-firm sources, official PDF not fetched.
- Whether the Data Protection Board Chairperson has been appointed (Sept-Oct 2026): unverified.
- Whether the 12-month acceleration will be notified: unknown; not gazetted as of 20 Oct 2026.
- Any Board filing address, portal or form for breach intimations: none published as of Oct 2026.

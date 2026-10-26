---
title: Hospital management system: module checklist
topic: domains/healthcare
tags: [hospital, hms, clinic, healthcare, modules, requirements, india]
source: Vendor advertisement listing modules (Aug 2026), rewritten as a neutral requirements checklist with additions from common HMS scope
source_type: social
confidence: medium
date: 2026-10-26
---

# Hospital management system (HMS): module checklist

## The point in one line
A full HMS is a set of role-based modules around the patient record; use this list to scope a build, compare vendors, or structure an app's navigation.

## Roles (each needs its own screens and permissions)
Doctor, Nurse, Pharmacist, Laboratorist, Accountant, Receptionist, Admin, Patient (portal).

## Modules
- **Front office:** appointments (OPD scheduling, walk-ins, queue/token display), registration, patient search and MRN.
- **OPD / IPD:** consultations, vitals, diagnosis, prescriptions; admissions, bed and ward management, transfers, discharge summaries.
- **Clinical records:** treatment history, allergies, documents and images, consent forms.
- **Pharmacy:** stock, batches and expiry, dispensing against prescriptions, purchase orders, GST invoicing.
- **Laboratory:** test catalog, orders, sample tracking, results entry and report PDF, reference ranges.
- **Billing and payments:** OPD/IPD bills, packages, insurance/TPA, advances and refunds, receipts, payment gateway, outstanding tracking.
- **Finance and accounts:** income/expense, ledgers, day book, tax reports.
- **HR:** staff records, roles, shifts and duty rosters, leave, payroll export.
- **Communication:** SMS, email and WhatsApp notifications for appointments, reports and payments; reminders.
- **Reports and dashboards:** census, revenue, doctor-wise OPD, lab TAT, pharmacy stock alerts.
- **Admin:** settings, audit log, backups, user management.

## Non-functional requirements that an HMS in India must carry
- DPDP compliance for patient data (consent, notice, retention per clinical-records rules, breach runbook): see skills/dpdp-legal-compliance.
- Security review before go-live (RLS or equivalent per role, audit logging of record access, file-upload safety for reports): see skills/security-review.
- Offline-tolerant front desk and printable artefacts (tokens, prescriptions, bills).
- Usability for dense operate screens (queues, beds, stock tables): see skills/ui-ux.

## Related
- skills/ui-ux (app-patterns), skills/security-review, skills/dpdp-legal-compliance

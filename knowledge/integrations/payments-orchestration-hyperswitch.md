---
title: Hyperswitch (Juspay) - open-source payment orchestration: what it is, what it needs to self-host, and when a Brimpa product should use it instead of one payment gateway
topic: integrations/payments
tags: [payments, hyperswitch, juspay, razorpay, cashfree, payu, upi, pci, vault, routing, reconciliation, rust, self-host, saas, hospital-billing]
source: GitHub repository metadata and README (juspay/hyperswitch, read 4 Nov 2026: Apache-2.0, about 45.7k stars, Rust, pushed the same day); Railway deployment templates for the stack and India-connector notes (third-party, unverified); no official connector list fetched
source_type: docs
confidence: medium
date: 2026-11-04
---

# Hyperswitch

## The point in one line
A self-hostable "payments switch" that sits between your product and several gateways (routing, retries, a PCI vault, cost reports, reconciliation); worth it for a multi-tenant product that must support more than one gateway or move between them, overkill for a single clinic site that only needs a Razorpay or Cashfree checkout.

## What it is (as published)
- Juspay's open-source payments platform, Apache-2.0, written in Rust; modules for intelligent routing across processors, revenue recovery (smart retries by BIN, region, method), a PCI-compliant vault for cards, tokens, wallets and bank credentials (bring-your-own-vault supported), cost observability (hidden fees, downgrades, penalties) and reconciliation. Offered as SaaS or self-host; a hosted sandbox needs no setup.
- Stack to self-host (from deployment templates): the router service, the control-center dashboard, Postgres and Redis. That is at least two stateful services plus two apps; not a fit for the 1 GB shared droplet that runs the client sites.

## India connectors (unverified)
Templates describe Razorpay as exposed for UPI only and Cashfree as covering more methods out of the box; PayU was not mentioned in what was read. Check the connector list in the repo (`crates/` connector modules or the docs) before promising any Indian method; UPI intent and collect flows, EMI and net banking differ per connector.

## When Brimpa would use it
- Brimpa Care billed through several gateways (a hospital group with its own PayU contract, another on Razorpay), with retries and one reconciliation view: yes, evaluate.
- A clinic website taking consultation fees: no; one gateway's hosted checkout with webhooks (see security-review for webhook signature checks) is simpler and cheaper to run.
- Any card storage: use the gateway's tokenisation or Hyperswitch's vault; never store PANs in the product database (PCI DSS scope).

## Caveats
- Orchestration adds an extra hop and an extra system to secure and monitor; the failure modes are yours.
- Pricing and feature boundaries between the open-source core and Juspay's hosted plans change; re-read the repo before quoting.
- DPDP: payment data is personal data; the consent notice must name the processors.

## Related
- integrations/whatsapp-api-options.md
- skills/security-review (webhooks, secrets, PCI scope notes), skills/dpdp-legal-compliance
- domains/hospital-management-modules.md (billing module)

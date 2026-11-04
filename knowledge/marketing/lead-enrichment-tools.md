---
title: Lead finding and email enrichment from an AI agent - waterfall enrichment, treg.to (pay per success, 124 providers), what it costs, and the DPDP/spam limits on using it from India
topic: marketing/outreach
tags: [lead-generation, enrichment, waterfall-enrichment, treg, apollo, hunter, tomba, claude-code, mcp, cold-email, dpdp, outreach, agency]
source: Hindi reel "1 billion contacts, straight inside Claude" (Oct 2026) promoting treg; checked 2026-11-04 on treg.to (home, pricing, privacy, llms.txt) and against general waterfall-enrichment vendor material; rewritten. Prices change; re-check before relying on them.
source_type: video
confidence: medium
date: 2026-11-04
---

# Lead enrichment from an agent

## The point in one line
"Waterfall" enrichment (ask provider A, then B, then C until an email is found and verified) works and costs under a rupee per found email through a metering layer such as treg.to; the limit is not the tool but what you may lawfully do with the result from India.

## What the reel says vs what treg.to says (4 Nov 2026)
| Reel | Site |
|---|---|
| "Treg: a Claude skill joining 114 providers (Apollo, Hunter, Tomba...)"; 1 billion contacts | "124 providers, 4,100+ endpoints"; described as an OpenRouter-style metering layer for agent tools and data, not a database of its own. Installed with a shell one-liner that adds a CLI and the treg skill to Claude Code; an MCP endpoint exists for hosted assistants |
| "No subscription; pay only for what is found; about Rs 0.84 (~$0.0089) per email; misses free" | Prepaid balance (first $1 free). Per-success tools: a miss costs $0.00; per-call tools charge every call. Listed rates start far lower ("from $0.00025/success" for people data; Hunter find-and-verify "from $0.0005/call"); the reel's Rs 0.84 is one worked example (27 leads -> 20 verified emails, about Rs 55), not a published flat rate. If you already pay Apollo or Hunter, you can route calls through your own key unmetered |
| "Claude searches provider after provider; verifies the email; builds the person's profile (company, role, mobile on request)" | Matches the waterfall pattern; mobile numbers are a separate, usually dearer, lookup |
| "Send small personal batches, not spam blasts" | Correct, and legally necessary (below) |

Operator: Superdesign Dev Pty Ltd (country not stated on the site); data processed in the US; the privacy policy has a GDPR legal-basis table but does not say where the people data comes from and has no consent statement for the people being looked up.

## How waterfall enrichment works (any vendor)
1. Start from a list (name + company, or a LinkedIn-style profile, or "marketing directors in New York").
2. Query the cheapest/most accurate provider first; on a miss, fall the query through the next providers.
3. Verify the email (SMTP/catch-all checks); keep only verified or "accept-all" with a flag.
4. Enrich: company size, role, location; optionally phone.
5. Pay per success (vendors report 80-90% find rates with a waterfall versus 50-65% for one provider; vendor-reported, unverified).

## Limits from India (read before using)
- **DPDP Act 2023**: a work email with a name is personal data. Buying or scraping it and emailing is processing without consent; the Act's "legitimate use" grounds do not cover cold marketing. Enforcement starts with the substantive duties (13 May 2027), but the obligation to have a lawful basis exists. Safer: public business contact points (info@, the clinic's listed number), inbound forms, referrals, and consented lists.
- **Sending**: cold *calls and SMS* to Indian numbers fall under TRAI's DND/UCC rules (registered telemarketer, consent); email has no India-specific anti-spam statute, but Gmail/Yahoo bulk-sender rules apply (authentication, one-click unsubscribe, complaint rate under 0.3%), and a burned domain hurts the real business (see infra/new-domain-launch-setup.md).
- **Abroad**: GDPR (EU/UK) needs a legitimate-interest assessment for B2B cold email and an opt-out in every message; CAN-SPAM (US) needs a physical address and working unsubscribe.
- Mobile numbers "on request" of people who never gave them to you: do not.

## For Brimpa
Enrichment is useful for *research* (who runs the hospital, which vendor they use), not for blasting. The sales motion that works for clinics is a visit, a referral or a WhatsApp message to the published business number with a specific observation about their site. See skills/launch-marketing (outreach signals) and business/sales-calls-and-startup-rules.md.

## Related
- skills/launch-marketing references/email-and-outreach.md
- skills/dpdp-legal-compliance
- infra/new-domain-launch-setup.md

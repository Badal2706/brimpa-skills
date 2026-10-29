---
title: WhatsApp automation for clients - official Cloud API pricing (India, Oct 2026) vs self-hosted unofficial gateways like Evolution Go
topic: integrations/whatsapp
tags: [whatsapp, cloud-api, evolution-go, whatsmeow, baileys, self-hosted, pricing, india, chatbot, crm, clinic, terms-of-service]
source: Hindi reel promoting Evolution Go as "self-hosted WhatsApp API, no per-message fees" (Aug 2026), checked against the evolution-foundation/evolution-go README and LICENSE (GitHub, read 2026-10-30), Meta's WhatsApp Business Platform pricing page (developers.facebook.com, read 2026-10-30), whatsmeow-node FAQ, and press coverage of Meta's general-purpose-chatbot ban (Oct 2025 to Jan 2026)
source_type: video
confidence: medium
date: 2026-10-30
---

# WhatsApp automation: official Cloud API vs self-hosted unofficial gateways

## The point in one line
Self-hosted gateways such as Evolution Go remove Meta's per-message fee by pretending to be a linked WhatsApp device, which breaks WhatsApp's terms and can get the number banned; for a client's clinic or business number use the official Cloud API, and keep unofficial gateways for internal tools on a throwaway number.

## Evolution Go (what the reel showed, verified on GitHub 2026-10-30)
- Repo: evolution-foundation/evolution-go. Go server; about 970 stars; created March 2026; last push 1 Oct 2026; part of the Evolution Foundation (also makers of the older Node "Evolution API").
- How it works: uses the **whatsmeow** library, which speaks the WhatsApp Web multi-device protocol. You pair it by scanning a QR code, exactly like linking WhatsApp Web. It is not Meta's API.
- Features (README): REST API with Swagger; real-time events over WebSocket, webhook, AMQP/RabbitMQ and NATS; media via MinIO/S3; optional PostgreSQL message storage; Docker image.
- **Licence is not plain Apache 2.0.** The LICENSE adds conditions: do not remove the logo/copyright in its frontend, and any project using it (including closed-source) must show a visible notice that Evolution Go is used; otherwise a commercial licence may be required.
- **It needs licence activation.** README: "Evolution Go requires a license to operate"; API endpoints return 503 until you complete a registration flow in its Manager UI, and it sends periodic heartbeats to keep activation. So "free, self-hosted, no strings" is not accurate; it phones home.

## Official route: WhatsApp Business Platform (Cloud API) pricing, verified on Meta's page 2026-10-30
- Billing is **per delivered template message** since 1 July 2025, by category (marketing, utility, authentication) and recipient country code. Messages users send you are free.
- **Service messages** (your replies inside the 24-hour customer-service window, human or third-party AI): 1,000 free per business number per month; Meta resumed charging beyond that tier from **1 Oct 2026**.
- **Utility templates inside an open service window** were free; **billable from 1 Oct 2026**.
- Click-to-WhatsApp ad entry: all categories free for 7 days (except Meta Business Agent replies).
- India: INR billing launched 1 Jan 2026; accounts with an India sold-to country must migrate to INR by **31 Dec 2026** (from 1 Jan 2027 Meta stops delivering for non-INR eligible accounts). Marketing rate rose 1 Jan 2026; authentication-international rose 1 Apr 2026.
- INR per-message rates are only in Meta's downloadable rate card. Third-party figures (not verified against the card): marketing about Rs 0.86-0.89, utility and authentication about Rs 0.115-0.13 per message, plus 18% GST. Check the rate card before quoting a client.
- **AI chatbots:** Meta's Business Solution terms bar general-purpose AI assistants (ChatGPT-style) as the product, effective 15 Jan 2026 for all businesses. Business-specific bots (appointment booking, support, order updates) remain allowed (press and vendor summaries; contract wording not read).

## Unofficial gateways: the risk (Evolution Go, Evolution API, Baileys, whatsapp-web.js, WPPConnect)
- Using an unofficial client violates WhatsApp's terms; the number can be banned, and a ban takes the account's normal chats with it.
- Ban triggers most often cited: bulk or unsolicited messages to people who have not messaged you, rapid sending, frequent re-pairing. Vendor claims of "2-8 weeks typical lifespan" or "68% of small Indian businesses banned within a year" are unverified marketing; do not repeat them.
- The risk is contractual (WhatsApp ToS), not criminal, but for a clinic it also touches DPDP: patient messages flow through a server you run plus a protocol Meta can cut off at any time.

## Decision rule for Brimpa projects
| Situation | Use |
|---|---|
| Client's real business or clinic number, appointment reminders, reports, payment links | Official Cloud API (direct or via a BSP); budget utility templates at about Rs 0.12-0.15 each incl. GST |
| Patient-facing chatbot (booking, FAQs, reports) | Official API; business-specific bot only; human handover |
| Internal alerts to the team, a personal side project, a prototype | Unofficial gateway acceptable on a separate, disposable number, low volume, no cold messaging |
| Marketing blasts to a bought list | Neither: illegal under DPDP consent rules and bannable everywhere |

## Example
A clinic sends 3,000 appointment reminders a month. Official route: 3,000 utility templates at roughly Rs 0.12 = about Rs 360 plus GST a month; patient replies and staff answers within 24 hours mostly fall in the 1,000 free service messages. The "saving" from an unofficial gateway is a few hundred rupees a month against the risk of losing the clinic's main number.

## Caveats
- Prices and free tiers changed three times in 2025-26; re-check the Meta pricing page and the India rate card before any proposal.
- Star counts and licence text as read on 2026-10-30.

## What the source got wrong
- "No per-message fees" is true only because it bypasses Meta; it omits the ToS breach and ban risk.
- "Clone the repo, run a couple of Docker commands, scan the QR and boom" omits the mandatory licence activation with heartbeats and the licence's notice requirement.
- Recommending it for "customer support, AI chatbot, CRM automation" on a business number is the exact use most exposed to bans; a general AI chatbot is also barred on the official API.

## Related
- dev-tools/open-source-tools.md
- domains/hospital-management-modules.md (patient communication)
- research/2026-10-seo-dpdp-facts.md (DPDP consent)
- skills/dpdp-legal-compliance

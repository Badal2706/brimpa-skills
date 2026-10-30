---
title: Three things to set up right after buying a domain - app on a subdomain, separate email subdomains (transactional vs marketing) with SPF/DKIM/DMARC, sitemap and Search Console
topic: infra/domains-email
tags: [domain, dns, cname, subdomain, email-deliverability, spf, dkim, dmarc, resend, transactional-email, marketing-email, sitemap, search-console, launch]
source: English reel "3 things to do after buying your domain" (Jul 2026, on-screen Resend docs and Search Console); checked 2026-10-30 against Resend's docs (subdomain and reputation-segmentation guidance, via search excerpts) and Gmail/Yahoo bulk-sender rules (Feb 2024); rewritten
source_type: video
confidence: high
date: 2026-10-30
---

# New domain: the launch-day DNS and email setup

## The point in one line
Put the marketing site on the root domain and the app on `app.` so they deploy separately, send app mail and marketing mail from two different subdomains so a spam complaint on one cannot hurt the other, and submit a sitemap.

## Steps
1. **Split site and app.** Root domain (`example.com`, `www`) points at the marketing site; add a CNAME `app` -> the app host (e.g. the Vercel/Render/Cloudflare target). Designers and marketers can then change the homepage without touching the app codebase or its deploys. It also keeps app cookies scoped to `app.` (set cookies without a `Domain` attribute so they do not leak to the marketing site and its third-party scripts).
2. **Two sending subdomains**, for example `mail.example.com` (or `notify.`) for transactional mail (sign-up, OTP, password reset, invoices, appointment reminders) and `news.example.com` (or `updates.`) for newsletters and campaigns. Add each in the email provider (Resend in the reel; same idea for SES, Postmark, Brevo) and publish the records it gives:
   - **SPF** (TXT, usually on a bounce/return-path subdomain the provider names),
   - **DKIM** (TXT or CNAME, the provider's selector),
   - **DMARC** (TXT at `_dmarc.example.com`; start with `v=DMARC1; p=none; rua=mailto:...` and move to `quarantine` then `reject` once reports are clean). Gmail and Yahoo have required SPF, DKIM and DMARC for bulk senders since February 2024, plus one-click unsubscribe on marketing mail.
   - Mailbox providers track reputation per domain and subdomain, so a bad marketing send on `news.` does not push OTPs on `mail.` into spam. Turn off open and click tracking on transactional mail.
3. **Index the site.** Generate `sitemap.xml` with every public, canonical page (not the app), verify the domain in Google Search Console with a DNS TXT record, submit the sitemap. Full launch list: seo/on-page-quick-checklist.md (launch-week section).

## Example (clinic site built by Brimpa)
`clinic.in` marketing site on Cloudflare Pages; `app.clinic.in` CNAME to the booking app; `mail.clinic.in` sends appointment confirmations and OTPs; `news.clinic.in` sends the monthly health newsletter (only to patients who consented, per DPDP). The root domain also gets a `p=reject` DMARC record and an SPF `-all` if it sends no mail, so nobody can spoof the clinic's name.

## Caveats
- Separate subdomains isolate *domain* reputation, not IP reputation; on a shared provider IP pool that is the provider's job.
- A brand-new subdomain has no reputation: send low volume first (warm up), especially for marketing.
- Do not point a CNAME at a host you later delete (dangling CNAME = subdomain takeover risk); remove DNS records when you retire a service.

## Related
- skills/security-review (email authentication, subdomain takeover)
- skills/seo-geo-audit (sitemap, Search Console)
- skills/dpdp-legal-compliance (consent for marketing mail, unsubscribe)
- seo/on-page-quick-checklist.md

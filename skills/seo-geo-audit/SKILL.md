---
name: seo-geo-audit
description: "Audit and improve a website for Google Search, local/Maps visibility and AI search (AI Overviews, AI Mode, ChatGPT, Perplexity, Claude): technical SEO, on-page, structured data/JSON-LD, Google Business Profile, NAP, reviews, Core Web Vitals, E-E-A-T, GEO/AEO, robots.txt and AI crawlers, sitemaps, page content audits, keyword research, featured snippets, link building, launch checklist, scored report. Use whenever the user asks for an SEO audit, 'why am I not ranking', 'get found on Google/Maps', schema markup, rich results, local SEO for a clinic, shop or service business, service or location pages, GBP setup, llms.txt, 'show up in ChatGPT/AI Overviews', Search Console errors, indexing problems, slow pages, or is about to launch, redesign or migrate a site, even if they never say 'SEO'. Audits first (KEEP / MODIFY / REMOVE / DO NOT TOUCH) and edits only after sign-off."
license: MIT
metadata:
  author: Brimpa
  version: "1.2"
  updated: "2026-10-30"
---

# SEO + GEO Audit

Audit first, report, then change only what needs changing. The goal is the strongest useful signals with the least complexity, not the most SEO files. Everything dated below is stated as of Oct 2026; re-check `developers.google.com/search` before asserting current behaviour, because guidance changes and blog posts lag.

## How to run this

1. **Gather inputs.** Live URL (or repo + staging URL), business type (local brick-and-mortar / service-area / online / publisher / SaaS / e-commerce), locations and languages, the 5-10 queries the owner wants to win, CMS or framework, and what access exists: Search Console, GA4, Google Business Profile ownership, hosting. Ask for missing items once; proceed with what you have.
   **Keyword step:** before recommending a page for any query, run the keyword deep-dive in `references/content-eeat.md` section 16 (intent, difficulty read from the SERP, volatility, zero-click impact, a 90-day plan) and keep only realistic targets.
2. **Declare depth.** Say which of these you can actually use: page fetch only; headless browser (rendered DOM, screenshots); PageSpeed Insights / CrUX; Search Console data; paid rank/backlink tools. Anything you cannot measure is reported as "not measured", never scored.
3. **Audit, do not edit.** Inspect the homepage and one page per template (service, location, article, product, contact), plus `robots.txt`, the sitemap(s), JSON-LD, `llms.txt` if present, and the GBP listing for local businesses. Respect robots.txt and rate limits when crawling (see the web-scraping skill for polite crawling). Work through `references/technical-checklist.md` first.
4. **Score.** One score per category with the weights in `references/report-template.md`, over measured categories only (an unmeasured category is left out of the total, never estimated into it), with the arithmetic printed. Scores are heuristics, not Google-internal signals.
5. **Report as KEEP / MODIFY / REMOVE / DO NOT TOUCH** with a priority (Critical / High / Medium / Low / Info) set by the root cause, the observation each finding rests on, the exact fix, and a mandatory `Failed if:` line on every finding: one command or observable condition (curl, `openssl s_client`, grep, Rich Results Test, a Search Console report). Ready-made checks are in `references/technical-checklist.md` section 17; the template is in `references/report-template.md`.
6. **Get sign-off** on the change list before touching code or the GBP listing. Flag anything that is irreversible (URL changes, category changes, deleting pages).
7. **Implement only approved items**, smallest change first: fix blockers (noindex, robots, canonical, redirects) before anything cosmetic.
8. **Validate.** JSON-LD parses and passes the Rich Results Test; exactly one H1 per page; no stray `noindex`; redirects resolve in one hop; sitemap returns 200 and lists only canonical 200 URLs; URL Inspection in Search Console shows the page as indexable.
9. **Set up the routine.** Capture a baseline (titles, canonicals, schema, CWV) so regressions are caught, and hand the owner the monthly routine from `references/local-seo.md` or the content cadence from `references/content-eeat.md`.

## What changed recently (as of Oct 2026)

- **FAQ rich results are gone** for every site since 7 May 2026 (docs removed June 2026). `FAQPage` markup is still valid schema.org and harmless; it earns nothing in Google Search. HowTo rich results went in Sept 2023, the sitelinks search box in Nov 2024, Course info / Estimated salary / Learning video / Special announcement / Vehicle listing in Sept 2025, Practice problem in Jan 2026.
- **Google's own AI-search guidance** (May 2026 guide, updated July 2026): no extra requirements or markup to appear in AI Overviews or AI Mode; a page only has to be indexed and snippet-eligible. Google Search does not use `llms.txt` (June 2026 note). Chunking content, rewriting for "AI phrasing" and AI-specific schema are listed by Google as misconceptions.
- **Spam policies now explicitly cover attempts to manipulate generative AI responses** in Search (May 2026). Back-button hijacking was added in April 2026. "Site reputation abuse" was renamed "site reputation policy" and EEA handling changed in Aug 2026.
- **AI-generated content guidance** (Oct 2026): manually fact-check and review everything AI wrote before publishing, explicitly including titles, meta descriptions, structured data and alt text. Mass AI pages without value are scaled content abuse.
- **Preferred sources:** readers can pick a site in Search settings; the badge shows in Top Stories and, since 27 May 2026, in AI Overviews and AI Mode. Domain or subdomain level only.
- **Google Business Profile:** public Q&A has been removed (API discontinued 3 Nov 2025; replaced by an AI "Ask" answer built from the profile, reviews, photos and website). Review-policy wording tightened in Feb and Apr 2026 (no offers to edit negative reviews, no staff quotas or kiosks). Verify wording at `support.google.com/contributionpolicy` before quoting it.
- **Core Web Vitals are unchanged**: LCP <= 2.5 s, INP <= 200 ms, CLS <= 0.1 at the 75th percentile. No new vital was added in 2025-2026; treat any "new CWV" claim as unverified.
- **Sitemaps:** Google ignores `<priority>` and `<changefreq>`; it uses `<lastmod>` only when it is consistently accurate. **IndexNow** is Bing/Yandex/Naver and friends, not Google.
- **Titles and descriptions** have no character limit, but Google rewrites titles that are half-empty, boilerplate, stale-dated, inaccurate or duplicate the site name.
- **Bing Webmaster Tools** gained an "AI Performance" report (Feb 2026) showing Copilot and Bing AI citations. **ChatGPT search** runs on a hybrid stack (OpenAI's own index plus Bing-derived data), so allow `OAI-SearchBot` and keep Bing Webmaster Tools verified; neither alone guarantees visibility.
- **`Google-Extended`** controls Gemini training and grounding in Gemini Apps / Vertex AI only; it does not opt a site out of AI Overviews or AI Mode, and it is not a ranking signal.

## Audit checklist (summary)

Full detail with thresholds lives in `references/technical-checklist.md` (read it for any crawl, index, speed or on-page work).

- **Crawl and index:** robots.txt (a 5xx on robots.txt stalls crawling of the whole site), no accidental `noindex`, self-referencing canonicals in the raw HTML, one canonical hostname with 301 from the others, no redirect chains, 404s are real 404s, key pages within 3 clicks of the homepage.
- **Sitemap:** HTTPS canonical 200 URLs only, <= 50,000 URLs / 50 MB per file, accurate `lastmod`, referenced from robots.txt and submitted in Search Console.
- **Rendering:** title, meta description, canonical, robots meta and JSON-LD present in the initial HTML (SSR/SSG); do not rely on client-side JS for them.
- **On-page:** one descriptive H1 that matches the title; unique title and description per page; primary topic in title, H1, URL slug, first 100 words and one image alt; logical H2/H3; descriptive internal anchors; `tel:` and WhatsApp links where the business takes calls.
- **Images:** alt on every meaningful image (decorative get `alt=""`), width/height set, WebP/AVIF with fallbacks, lazy-load below the fold only, never lazy-load the hero/LCP image.
- **Speed:** LCP / INP / CLS from field data (PageSpeed Insights or CrUX) on mobile; lab data only for debugging.
- **Structured data:** JSON-LD, the most specific type, only facts visible on the page, no retired types, validated.
- **Security and page experience:** HTTPS everywhere, no mixed content, no intrusive interstitials, no back-button hijacking, no hidden text or links.
- **Hygiene:** remove `meta keywords` (ignored by Google), placeholder URLs, staging hostnames, duplicate pages, orphan files.
- **Realistic keywords:** each target query has low difficulty for this site (read from the SERP, not a tool score), a clear intent the business can satisfy, and real demand (Keyword Planner ranges, Search Console impressions, the owner's enquiry log). Pivot from head terms the site cannot win to longer-tail and local variants.
- **Consolidation:** merge overlapping thin pages that chase the same intent into one stronger page; 301 each retired URL to it in one hop, update internal links and the sitemap (irreversible, so it needs sign-off; method in `references/content-eeat.md` section 10).
- **Surface checks** (one line each, detail in the technical checklist):
  - `<html lang>` present and matching the content language (Bing hint, WCAG 3.1.1).
  - Viewport meta present; `user-scalable=no` or `maximum-scale` below 5 blocks zoom, an accessibility fail as well as a mobile one.
  - Favicon and `apple-touch-icon` return `200` with real image bytes, not an HTML page.
  - TLS certificate SAN covers every served or linked host (bare and `www`); expiry date noted in the report.
  - Security headers listed by name, present or absent, not scored; configuration goes to security-review.
  - Discovery-file probes (`/llms.txt`, `/llms-full.txt`, `/.well-known/*`): optional, Info; absent is not a defect.
  - IndexNow: optional submission option for Bing/Yandex; Google does not support it (as of Oct 2026).
  - Brand SERP and intent: search the brand name, note the official site's position, look-alikes and whether the results match the intended intent.
  - Per-page on-page table: URL | title | description | H1 | canonical | robots | OG | JSON-LD types.

## Local SEO essentials

Open `references/local-seo.md` for the GBP 25-field checklist, citation tiers, review rules, service-page structure, the 7-step playbook, the 30-day plan and timelines.

- **NAP consistency is the highest-leverage item.** Name, address and phone must match character for character across the site, JSON-LD, GBP and every directory ("Shop 4" and "Shop No. 4" look like two businesses).
- **GBP outweighs the website for the map pack.** The primary category is the strongest single factor and a wrong one the strongest negative (Whitespark local ranking factors survey, 2026 edition; third-party). Then: verified status, hours (and holiday hours), 10+ real photos, services with descriptions, a 250-750 character description, weekly posts, and replies to every review.
- **Reviews:** steady velocity beats a one-time burst. Ask every customer in the same neutral way (a `g.page/r/...` link), never gate, never incentivise without disclosure, never buy. Reply within 48 hours. Health and legal businesses must not confirm or reveal anything about a reviewer.
- **Dedicated service pages** are the strongest local organic factor. One page per service with the city in the H1, >= 800 words of genuinely useful content, 5-8 real FAQs and a booking CTA. A single "Services" page ranks for nothing. Never doorway pages that only swap the city name (the "swap test").
- **Citations:** claim GBP, Apple Business Connect, Bing Places (feeds Copilot and parts of the ChatGPT stack), Facebook and the directories that already rank for the target query; in India also Justdial, Sulekha and the vertical directories (Practo, Lybrate for clinics). A missing free listing on a page that already ranks for "X in <city>" is usually the fastest win.
- **Link the site and the listing both ways:** GBP website field to the correct page; `hasMap` and `sameAs` in JSON-LD pointing to the listing's CID URL (`https://www.google.com/maps?cid=<CID>`); the same URL in the footer.

## AI search essentials

Open `references/ai-search.md` for the crawler table, the robots.txt template, llms.txt guidance, the Bing/ChatGPT/Perplexity notes, how to measure AI visibility, and the myths list.

- Google's position: optimising for AI Overviews and AI Mode "is still SEO". The eligibility floor is indexed + snippet-eligible. Both features fan out one query into many related searches, so pages that answer a specific sub-question well get cited even when they do not rank first.
- What helps: non-commodity, first-hand content that could not have come from anyone else; clear facts stated early in each section; visible author, dates and sources; good page experience; an accurate Business Profile and Merchant Center where relevant.
- What does not help: `llms.txt` (optional, harmless, not used by Google), AI-specific markup, chunked "answer blocks" for their own sake, keyword variants, fake brand mentions on forums.
- Featured snippets: no markup earns one; target one only when it shows on today's SERP and the page already ranks on page one. Formats, lengths and how snippets relate to AI Overview citation: `references/ai-search.md` section 13.
- Crawler policy, decided per purpose: allow `Googlebot` (Search + AI features), `OAI-SearchBot`, `Claude-SearchBot`, `PerplexityBot` for AI search visibility; `GPTBot`, `ClaudeBot`, `Google-Extended`, `Applebot-Extended`, `CCBot` are training/licensing decisions the owner makes; blocking them does not affect Google Search. Because of robots.txt group selection, a dedicated `User-agent:` group overrides `*`, so repeat the `Disallow` lines in every group. Many AI crawlers do not run JavaScript: serve content server-side.
- Measure with Search Console (AI-feature traffic is reported inside the "Web" search type; no separate verified AI report as of Oct 2026), Bing Webmaster Tools AI Performance, and a monthly share-of-voice probe: ask ChatGPT, Perplexity, Gemini and Claude the owner's 10-20 buyer prompts and log mentions and cited domains.
- Never hide instructions or text for AI systems inside pages (white text, HTML comments, `data-` attributes). Google's spam policy covers manipulating generative AI, and it backfires when surfaced. Prompt-injection defences for the owner's own AI products belong to the llm-app-security skill.

## Structured data rules

Open `references/structured-data.md` for the supported/retired tables, required properties, LocalBusiness subtype guidance, JSON-LD templates and validation steps.

- JSON-LD in the `<head>` (or early body), served in the initial HTML, `@context` = `https://schema.org`. One block per entity, or one `@graph`.
- Use the **most specific type**: `MedicalClinic`, `Dentist`, `Plumber`, `Restaurant`, never bare `LocalBusiness` or `Thing` when a subtype exists. `Attorney` is deprecated (use `LegalService` + `Person`).
- Mark up only what a human can see on that page. Missing data gets flagged as `MISSING_<field>` in the draft, never invented.
- **Self-serving reviews are ineligible.** `review` / `aggregateRating` on `LocalBusiness` or `Organization` only count on sites that publish reviews *about other* businesses. Show Google reviews on the page if you like; do not put them in your own schema. Fake or undisclosed incentivised reviews violate the review-snippet guidelines (July 2026).
- Retired types (`HowTo`, `FAQPage` for rich results, `SpecialAnnouncement`, `ClaimReview`, `Course info`, `EstimatedSalary`, `LearningVideo`, `VehicleListing`, Practice problem) are reported as Info, not Critical: do not add them, do not demand removal, do not promise AI benefit from them.
- `geo` coordinates with >= 5 decimal places; `name`, `address` and `telephone` identical to GBP; `openingHoursSpecification` identical to GBP hours; `priceRange` under 100 characters.
- Validate with the Rich Results Test (eligibility) and the Schema Markup Validator at `validator.schema.org` (syntax) before and after publishing.

## Content, E-E-A-T and YMYL

Open `references/content-eeat.md` for the E-E-A-T model, helpful-content signals, AI-content policy, spam policies, topic clusters, internal linking, links and authority, the conversion/copy lens, the page content audit mode, semantic gap analysis, the keyword deep-dive and the expert interview.

- Apply Google's Who / How / Why test: a visible author with credentials, how the content was produced (disclose AI assistance where readers would want to know), and whether it exists to help people rather than to attract clicks.
- Information gain is non-negotiable: first-hand photos, data, cases, process. "7 tips" that anyone could write is commodity content.
- Word counts are coverage floors, not targets: service page 800, blog post 1,500, location page 600, product 400, homepage 500. There is no ideal length; Google says so.
- **YMYL (health, legal, finance, safety):** accuracy outranks volume. Surface credentials, registration numbers, address, phone, hours, real photographs and a medical/legal disclaimer. Every clinical claim is reviewed by the practitioner before publishing. Refuse superlatives ("best", "No. 1", "guaranteed", "painless") unless independently verifiable; in India, medical advertising rules also restrict them. Never invent testimonials or attribute words to real named people.
- Freshness: show publish and last-updated dates; review evergreen pages at least yearly and YMYL pages when guidance changes. Do not fake dates; Google rewrites titles with stale dates and raters mark fake freshness down.
- **Page content audit mode** (one URL, "why does this page not rank"): read `references/content-eeat.md` sections 14-15. Fetch and read the top 3 ranking results in full before judging, never infer what an unfetched page covers, score seven dimensions, run the semantic gap analysis, and deliver a rewritten title, meta description, H1 and opening with character counts. Get first-hand material from the owner with the expert interview (section 17).
- **Links:** phase decision tree, verified anchor-text guidance, velocity red flags and tactic playbooks are in `references/content-eeat.md` section 11. Never request keyword-rich anchors in links the business places; Google names them link spam at any share.

## Anti-patterns to refuse

City-permutation or keyword-variant doorway pages; duplicate service pages per synonym; auto-generated articles at scale without review; keyword-stuffed filenames, alt text or business names; invented reviews, ratings or testimonials; schema for facts absent from the page; hidden text, links or instructions aimed at crawlers or AI; buying links or "500 backlinks" packages; keyword-rich anchors in guest posts, press releases or partner pages; reciprocal "link to me and I'll link to you" pages; expired-domain tricks; publishing third-party content on the owner's domain purely to borrow its rankings; copying another business's content; fake "last updated" dates; blocking crawlers after a staging site goes live; submitting a site to Search Console before it is publicly reachable.

## When the user pushes back

- "Just add FAQ schema, everyone says it helps AI." Explain the May 2026 retirement and Google's myth list; offer a visible FAQ section instead, which helps readers and query fan-out without the markup promise.
- "Put our 5-star rating in the schema." Explain self-serving review ineligibility and the manual-action risk; put the rating widget on the page and keep stars on GBP.
- "Make 40 city pages this week." Offer 4-5 real service pages now and two more per month, each with local proof (photos, staff, area-specific FAQs). Warn at 30+ location pages, hard stop at 50+ without evidence of a real presence in each.
- "Block all AI bots." Separate training crawlers (their call) from search crawlers (blocking removes them from ChatGPT/Claude/Perplexity answers) and remind them `Google-Extended` does not touch AI Overviews.
- "Guarantee page one in 30 days." Give the realistic timeline: map-pack movement typically 4-8 weeks after GBP/NAP fixes; competitive organic terms 3-6 months of consistent work. Anyone promising faster is buying links.

## Launch checklist (only after the domain is live)

Domain purchased -> HTTPS with a valid certificate and a single canonical hostname (301 the others) -> placeholder URLs, staging hostnames and `noindex` removed -> canonicals verified -> robots.txt allows crawling and names the sitemap -> sitemap valid -> JSON-LD passes the Rich Results Test -> mobile layout and tap targets checked -> PageSpeed Insights run on the 3 most important pages -> Search Console Domain property (DNS TXT) verified, sitemap submitted, key pages inspected -> Bing Webmaster Tools verified (import from Search Console), IndexNow key set if the CMS supports it -> GBP claimed, verified and owned by the business, not an agency -> NAP identical on site, schema, GBP, Apple, Bing, Facebook and top directories -> `tel:` / WhatsApp / form tested on a phone -> GA4 (or privacy-friendly analytics) with consent handling per the dpdp-legal-compliance skill -> baseline snapshot saved.

## Tools (all free)

Search Console, Bing Webmaster Tools, Google Keyword Planner, Google Trends, AlsoAsked, Ahrefs Webmaster Tools, PageSpeed Insights, Rich Results Test, Schema Markup Validator, Google Business Profile, the Place ID finder, and asking ChatGPT / Perplexity / Gemini / Claude who they recommend for the owner's queries. Paid rank, backlink and AI-visibility tools are optional; state when a finding depends on one.

## Report / output format

Use `references/report-template.md` for the full scorecard, weights, priority SLAs, action matrix and KEEP/MODIFY/REMOVE table. Minimum structure:

```
# SEO + GEO audit: <domain>  (<date>, depth: <fetch | browser | +PSI | +GSC>)
Health score: NN/100 (heuristic)  | Not measured: <categories>
Top 5 critical issues | Top 5 quick wins
## Scorecard (Technical 22 / Content 23 / On-page 20 / Schema 10 / CWV 10 / AI readiness 10 / Images 5)
   Arithmetic: (22x78 + 23x61 + ...) / <sum of measured weights> = NN
## Findings: KEEP / MODIFY / REMOVE / DO NOT TOUCH  (priority, root cause, observation, fix,
   "Failed if: <one command or observable condition>" on every finding)
## On-page table (one row per inspected page) and brand SERP note
## Local SEO (if applicable): GBP completeness, NAP matrix, reviews, service pages, citations
## AI search: crawler access, snippet controls, citability, measurement plan
## Action plan: Week 1 (Critical) / Weeks 2-3 (High) / Month 2 (Medium) / Ongoing
## Limitations: what this audit could not assess
```

Report rules: score only measured categories; severity follows the root cause (symptoms of one cause are grouped under it, not each rated Critical); every finding has a `Failed if:` line; the printed arithmetic must reproduce the total; no internal tool or skill names and no promotional footers in a client report (write "a security review", not a skill name).

## Worked examples

- **"Our dental clinic site is live but we get no calls."** -> Check GBP ownership, verification, primary category (`Dentist`), hours, photos, review flow; NAP across site/GBP/Justdial/Practo; one page per treatment; `Dentist` JSON-LD with CID link; Search Console Domain property; mobile CWV. Report, then execute the 30-day plan.
- **"Add schema so we show up in AI Overviews."** -> Explain the eligibility floor; audit indexability and snippet controls first; add `Organization` + the specific LocalBusiness subtype + `Article` where real; refuse `FAQPage`-for-AI; propose first-hand content and an author page instead.
- **"We rebuilt the site in Next.js; traffic dropped 60%."** -> Compare old and new URL inventories, check the 301 map, robots.txt (staging disallow left in?), `noindex` from the framework, canonicals in raw HTML, titles lost in client rendering, sitemap pointing at old URLs, hreflang if multilingual. Classify each as a Critical fix.
- **"Why doesn't our granite countertops page rank?"** -> Page content audit mode: read the page, search the query from the city, read the top 3 in full, score the seven dimensions, classify gaps (core / differentiator / commodity / opportunity), interview the showroom owner for finishes, sealing and real project numbers, and deliver the rewritten title, description, H1 and opening with character counts.
- **"Make us rank for 'plumber in <city>' in 20 suburbs."** -> One real page per service, one location page per suburb only where there is proof of presence; refuse the remaining permutations; GBP service areas limited to 20 named areas.

## Hand-offs

Security headers and HTTPS hardening: security-review. Consent for analytics and forms (India): dpdp-legal-compliance. Hero copy, layout and usability of the pages themselves: web-design and ui-ux. Launch announcements and content distribution: launch-marketing. Prompt injection and recommendation poisoning in the owner's own AI features: llm-app-security. Polite crawling of third-party sites: web-scraping.

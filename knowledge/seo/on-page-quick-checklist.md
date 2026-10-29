---
title: 18-point on-page SEO quick checklist (and where our skill covers each), plus launch-week discovery setup, free SEO tools, long-tail regex in Search Console, parasite-SEO verdicts and 10 terms
topic: seo/on-page
tags: [seo, on-page, checklist, search-console, core-web-vitals, schema, launch, bing, open-graph, search-generative-ai-control, preferred-sources, backlinks, gbp-categories, regex, long-tail, parasite-seo, site-reputation, scaled-content, glossary, hreflang, canonical, programmatic-seo, citation-share]
source: Instagram reel "$100k of on-page SEO advice in 23 seconds" (Oct 2026), mapped against skills/seo-geo-audit; launch-week section added 2026-10-30 from four Aug 2026 reels (5 post-launch steps, Search generative AI setting, preferred-sources badge, 5 free SEO tools) checked against Google blog/docs, Bing docs and tool sites; long-tail regex, parasite-SEO and ten-terms sections added 2026-10-30 from three Oct 2026 reels (regex checked on screen, Zenodo policy page, Google spam policies via research note)
source_type: social
confidence: medium
date: 2026-10-30
---

# 18-point on-page SEO quick checklist

## The point in one line
A fast pre-launch pass; every item is covered in depth by the seo-geo-audit skill except keyword choice by competition, which belongs to keyword research.

| # | Item | Covered in seo-geo-audit |
|---|---|---|
| 1 | Fix indexing errors in Search Console | yes (technical checklist, launch) |
| 2 | Fix Core Web Vitals | yes (LCP 2.5 s, INP 200 ms, CLS 0.1) |
| 3 | Fix orphan pages | yes |
| 4 | Add schema markup | yes (only facts visible on the page; FAQ rich results retired May 2026) |
| 5 | One H1, then H2s | yes |
| 6 | Write original content | yes (E-E-A-T, first-hand detail) |
| 7 | Get quality backlinks | yes (citations, local directories) |
| 8 | Fix broken links and 404s | yes (real 404s, no soft 404s) |
| 9 | Make JavaScript crawlable | yes (server-rendered head and content; AI crawlers do not run JS) |
| 10 | Fix keyword cannibalization | yes |
| 11 | Make it mobile friendly | yes (viewport, zoom allowed) |
| 12 | Add author bios | yes (named author pages) |
| 13 | Keep titles under 60 characters | convention only; Google states no fixed limit and truncates by width |
| 14 | Unique meta descriptions | yes |
| 15 | Merge thin pages | partly (thin/doorway pages refused); consolidate overlapping thin pages into one stronger page with 301s |
| 16 | Compress your images | yes |
| 17 | Match search intent | yes |
| 18 | Target low-competition keywords | not covered: a keyword-research step (pick terms you can rank for: low difficulty, clear intent, real volume) |

## Launch-week discovery setup (added 2026-10-30 from four Aug 2026 reels, checked against Google and Microsoft docs)

Order to do it in, the day the site goes live:
1. **Google Search Console**: verify the domain property (DNS), submit the sitemap, inspect the home page. Google can find a site through links, so submission is not strictly required, but it is the fastest route and the only way to see indexing errors.
2. **XML sitemap** listing every canonical, indexable URL; accurate `lastmod` only.
3. **Search Console > Settings > Search generative AI**: leave it on **Include** (the default) unless the client wants out of AI Overviews and AI Mode. Excluding removes all AI-feature traffic and impressions; Google says it is not used as a ranking signal for normal results.
4. **Open Graph + Twitter card tags** (`og:title`, `og:description`, `og:image` 1200x630, `og:url`) in the initial HTML, so WhatsApp, LinkedIn and Facebook previews work. Test by pasting the link into WhatsApp before handover.
5. **Bing Webmaster Tools**: import from Search Console in one click, submit the sitemap, enable IndexNow if the host supports it. Bing feeds Copilot and part of ChatGPT's search stack.
6. **Optional**: `llms.txt` (harmless; Google says it does not use it), a "Add us as a preferred source on Google" button for sites that publish news-like content.

### Free research tools from the same reels (checked 2026-10-30)
| Tool | What it gives | Limits / notes |
|---|---|---|
| Google Search Console | queries people used to find you, CTR, indexing | free, needs verification |
| AnswerThePublic | question-style searches around a seed term, for FAQ and service-page content | free tier about 3 searches a day (third-party figure); paid plans vary by source |
| linkgap.io | backlink gap: sites linking to a competitor but not to you, for outreach | free emailed report; analyses "500+ backlinks per site"; data source not disclosed, so cross-check |
| GMBspy (Chrome extension) | shows the Google Business Profile categories of any listing or the top local results | free, ~40k users; categories are a key local-ranking input; use it to pick the client's primary and secondary GBP categories |

### What the source got wrong (the four launch/AI-search reels)
- "Google doesn't find your website automatically; you must submit it": overstated. Google discovers sites through links; Search Console speeds it up and shows problems.
- "Without a sitemap Google doesn't know half your site exists": only true for sites with weak internal linking; still do it.
- "llms.txt is like a sitemap for ChatGPT, Claude, Gemini": no major AI search engine has said it reads llms.txt for ranking or citation; Google says it does not use it. Optional, not a launch requirement.
- "Turn this Search Console setting ON to get into AI Overviews": the setting is already Include by default; the only action is to not switch it to Exclude. Being included does not by itself make Google cite you.
- "Preferred sources badge works as a global ranking signal once enough people click it": Google documents it as a per-user preference that shows your site more for that user (Top Stories, and since May 2026 AI Overviews and AI Mode). No Google source calls it a global ranking signal; treat that claim as false. Also the creator's "I did it in five minutes" is fine: it is a JS button or a deeplink.
- "linkapp.io" (as heard) is **linkgap.io** on screen.

## Long-tail query mining in Search Console (added 2026-10-30 from an Oct 2026 reel)
1. Search Console > Performance > Search results > Add filter > Query > **Custom (regex)** > Matches regex, paste `^([^ ]+ ){3,}[^ ]+$` and apply. This keeps queries of **four or more words** (three or more word-plus-space groups, then a final word). Search Console uses RE2 syntax, which this pattern fits.
2. Turn on Average position, sort by impressions or clicks, and look for long queries where you sit around positions 5-20.
3. For one promising query: if no page answers it, write one with the query in the title, H1, URL slug and opening sentence; if a page is close, add an H2 section that answers it. Do not spin up a page per query variant (that becomes doorway/scaled content).
4. Variants: `^([^ ]+ ){5,}[^ ]+$` for six or more words (conversational and AI-style queries); add the Non-branded queries filter to drop brand searches.

Why it works: long queries are more specific and less contested, and many carry purchase intent ("root canal cost in Surat with insurance"). Caveat: Search Console hides rare queries for privacy, so long-tail totals are under-reported. Reel errors: "over four words" (the pattern keeps four and more); "nobody knows this" (regex filters have been in Search Console since 2021); "a bunch are searches AI is doing" is plausible (AI Mode traffic is reported under Web) but unmeasurable from this view. The closing course plug is omitted.

## "Parasite SEO" (Oct 2026 reel): what to keep and what is spam
The reel's five ways to rank "without touching your own site":
| Tactic | Verdict |
|---|---|
| Write "best X of 2027" now, before others | Fine if the page is genuinely updated and the year is honest; a fake future-dated listicle is thin content |
| Publish a "research paper" (e.g. "best mattresses for side sleepers") on Zenodo because ChatGPT cites it | **Do not.** Zenodo is CERN's research repository; its policy removes content outside research scope and revokes the DOI. A marketing piece dressed as research is deceptive, and Google's spam policies (May 2026) explicitly cover manipulating generative AI answers |
| Short LinkedIn articles (under ~330 words, answer in the first line) | Fine and useful under the founder's own name: answer-first writing is good practice. "330 words" and "LinkedIn is the most-cited domain for professional queries" come from third-party tracking studies shown on screen, not from Google |
| 20 Gamma slide decks, one per search ("best scheduling software for salons"), linking back | **Avoid.** Many near-identical pages made mainly to rank is scaled content abuse; hosting them on someone else's domain to borrow its signals is exactly Google's site reputation policy |
| Answer Reddit threads with a helpful reply that mentions your product | Fine only with disclosure and within each subreddit's self-promotion rules; undisclosed promotion gets removed and banned. The tool the creator uses to find threads is a plug, omitted |
Rule: earn mentions on trusted sites as yourself (LinkedIn articles, genuine answers, guest posts with real expertise); never publish content on a third-party host mainly to borrow its ranking signals. See research/2026-10-seo-dpdp-facts.md (spam policies, verified 28 Aug 2026). "Page one in two weeks" is a promise no one can make.

## Ten terms worth knowing (from a "10 SEO terms, pro edition" quiz reel, Oct 2026)
| Term | Meaning | Practical rule |
|---|---|---|
| hreflang | `<link rel="alternate" hreflang="en-in" href="...">` tags linking language/country versions both ways | Only for multi-language or multi-country sites; each version lists all others and itself |
| Canonicalization | Telling Google which URL is the real one among duplicates (tracking parameters, http/https, trailing slash, case) | `rel="canonical"` to the clean URL; Google treats it as a strong hint, not a command |
| Crawl depth | Clicks from the home page to a page | Keep money pages (services, locations) within about 3 clicks via menus and hubs; a heuristic, not a Google rule |
| JavaScript rendering | Content that exists only after JS runs | Google renders later; most AI crawlers do not run JS at all. Ship key content in the server HTML |
| Link equity | Ranking value a link passes | Link from your strongest pages to the pages that earn money, with descriptive anchor text. Nofollow is a hint, not a hard zero |
| Search intent mismatch | Ranking the wrong page type for the query (a product page for a "best X" query) | Match the page type Google already ranks |
| SERP features | AI Overview, featured snippet, People also ask, local pack, videos | For a clinic, the local pack (Google Business Profile) often outranks blue link #1 on a phone |
| Knowledge graph | Google's database of entities and their links | Same name, address, phone and facts everywhere; Organization/LocalBusiness schema with `sameAs` |
| Programmatic SEO | Many pages from one template plus a dataset ("dentist in {city}") | Only with real, unique data per page; city-name swaps are doorway pages |
| Citation share | How often AI answers cite you versus competitors for a fixed prompt set | Track the same prompts weekly; useful but no standard tool or definition yet |
The reel itself only lists the terms and asks viewers to comment for definitions (engagement hook); the definitions above are from its on-screen cards, checked against our seo-geo-audit skill.

## Related
- skills/seo-geo-audit
- research/2026-10-seo-dpdp-facts.md (A3: AI features, Search generative AI control, preferred sources; A8: Bing)

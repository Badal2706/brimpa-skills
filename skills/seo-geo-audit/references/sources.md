# Sources and attribution

This skill is MIT licensed. It merges and adapts material from the sources below; wording was rewritten and facts were re-checked against primary documentation as of 2026-10-20 (v1.2 additions re-checked 2026-10-30). Where a claim comes only from a third-party study, the skill text names the study and its date.

## Primary documentation (public docs, cited)

| Source | Used for |
|---|---|
| Google Search Central: Structured Data Gallery, search-gallery (updated 2026-10-16); changelog `developers.google.com/search/updates` | supported vs retired rich results, FAQ retirement (May 2026), Practice problem, Sept 2025 retirements |
| Google: Review snippet guidelines | self-serving review ineligibility; fake/incentivised review guideline (July 2026) |
| Google: Local business structured data (updated Dec 2025) | required/recommended LocalBusiness properties, geo precision, priceRange |
| Google: "AI features and your website" (Dec 2025) and "Optimizing your website for generative AI features on Google Search" (May 2026, updated July 2026) | AI Overviews / AI Mode guidance, misconceptions list, controls, Search Console reporting |
| Google: Google common crawlers and user-triggered fetchers (updated 2026-10-15) | Google-Extended semantics, Googlebot |
| Google: Preferred sources (updated 2026-09-18) | preferred-source badge in AI features |
| Google: Spam policies (updated 2026-08-28) | policy list, site reputation policy, back-button hijacking, generative-AI manipulation |
| Google: Using generative AI content (updated 2026-10-01); Creating helpful, reliable, people-first content | AI-content fact-check guidance, Who/How/Why test |
| Google: Title links (Dec 2025), Snippets (Apr 2026) | no length limits, rewrite triggers, "read more" guidance |
| Google: Build and submit a sitemap (updated 2026-07-08) | lastmod, priority/changefreq ignored, limits |
| Google: JavaScript SEO basics; structured data with JavaScript (Dec 2025) | rendering rules |
| web.dev: Web Vitals (updated Oct 2024) | LCP / INP / CLS thresholds, 75th percentile |
| OpenAI: Overview of OpenAI crawlers (`developers.openai.com/api/docs/bots`) | GPTBot, OAI-SearchBot, ChatGPT-User semantics |
| Anthropic: "Does Anthropic crawl data from the web" support article | ClaudeBot, Claude-SearchBot, Claude-User |
| Perplexity: Perplexity crawlers (`docs.perplexity.ai/guides/bots`) | PerplexityBot, Perplexity-User |
| Apple: About Applebot (support.apple.com/119829) | Applebot, Applebot-Extended |
| Microsoft Bing Webmaster blog (Feb 2026) | AI Performance report |
| Google Business Profile help and contribution policy (`support.google.com/contributionpolicy`) | review policy; Q&A removal and 2026 policy changes were reported by secondary sources and are flagged as such in the text |
| schema.org | type and property vocabulary; `Attorney` deprecation |
| RFC 9309 (Robots Exclusion Protocol) | group selection rule |
| WCAG 2.2 | 24x24 px target size; 1.4.4 Resize Text (zoom-blocking viewport); 3.1.1 Language of Page (`<html lang>`) |
| Google: Define a favicon to show in search results | favicon size (multiple of 48x48 px), crawlability |
| Google: Managing multi-regional and multilingual sites | Google ignores code-level language markup such as `lang` |
| Lighthouse `meta-viewport` audit | `user-scalable=no` / `maximum-scale` below 5 flagged |
| CA/B Forum ballot SC-081 (2025) | 200-day maximum public TLS certificate lifetime from 15 Mar 2026 |
| Chrome UX Report API docs | `records:queryRecord` field-data check |
| Google: Featured snippets and your website (updated 2025-12-10) | no markup earns a snippet, no minimum length, `nosnippet` / `data-nosnippet` / `max-snippet` behaviour (v1.2) |
| Google: Spam policies, link spam section (updated 2026-08-28); Qualify your outbound links (updated 2025-12-10); "A reminder about links in large-scale article campaigns" (Search Central blog, 25 May 2017) | optimised anchors in guest posts and press releases as link spam, link exchanges, `rel="sponsored"` for paid links (v1.2 anchor-text and tactic guidance) |
| Google: Redirects and Google Search (updated 2026-04-14) | permanent redirects as a canonical signal (v1.2 consolidation rule) |
| Google: Creating helpful, reliable, people-first content (updated 2026-10-05); Google Discover (updated 2026-03-09); Title links (updated 2025-12-10) | information-gain and expertise questions, Discover image size, no title length limit (v1.2 page content audit) |
| John Mueller, anchor-text percentages "not indicative of quality" (Search Engine Roundtable, 9 Oct 2018); Mueller and Gary Illyes on link acquisition speed (reported by Search Engine Journal); Google staff statements, cited as reported | no ideal anchor ratio; velocity treated as a diagnostic, not a factor |

## Open-source skills and repositories

| Source | License | What was taken |
|---|---|---|
| AgriciDaniel/claude-seo (v2.4.2) | MIT (FLOW prompts CC BY 4.0, not reused) | adapted: category checklists, health-score weights, priority levels, "score only what was measured", active/retired structured-data table, LocalBusiness subtype tables, 25-field GBP checklist, NAP/citation tiers, review rules, E-E-A-T weighting convention, coverage floors, cluster and drift rules, programmatic and hreflang gates, crawler taxonomy, llms.txt evidence posture, backlink data-sufficiency gate |
| Varnan-Tech/opendirectory (position-me, geo-gap-fixer, llms-txt-generator, schema-markup-generator) | MIT | adapted: LIFT / Hick's law / PAS / fluff-test teardown lens and separate scorecard; share-of-voice rubric (mention rate, average rank, win rate, citation share) and citation gap list; llms.txt format and placement table; `MISSING_field` convention and framework injection points. Its FAQPage/HowTo/"llms.txt is critical" claims were dropped as contradicted by Google documentation |
| Blind head-to-head of this skill against AgriciDaniel/claude-seo on the same site (Oct 2026) | n/a (internal evaluation) | v1.1: mandatory `Failed if:` check on every finding, check bank, surface checks (html lang, viewport zoom, favicon, TLS SAN, discovery-file probes, brand SERP, per-page on-page table); wording original |
| inhouseseo/superseo-skills v0.2.1 (https://github.com/inhouseseo/superseo-skills), skills page-audit, semantic-gap-analysis, keyword-deep-dive, expert-interview, linkbuilding, featured-snippet-optimizer | Apache-2.0 (NOTICE: "SuperSEO Skills, Copyright 2026 InhouseSEO"; reproduced in the repo `NOTICE`) | v1.2, rewritten in our own words and re-checked against Google documentation: page content audit order (read the top 3 in full, never infer an unfetched page), seven-dimension page scorecard and rewritten-elements deliverable with character counts, semantic gap inventory with core / differentiator / commodity / opportunity classes, EAV triples and expert verb fields, SERP-signal difficulty rubric, volatility levels, zero-click framing, 90-day plan, expert interview core questions, page-type question bank, vague-answer probes and knowledge-document structure, link phase decision tree and edge cases, velocity pattern list, tactic playbooks, snippet query-format table and the snippet/AI Overview 2x2. Rejected as contradicted by Google or unsourced: "audit against what works, not Google's docs", hard title (60) and meta (140/160) character caps, `FAQPage`/`HowTo` schema for snippets or AI citations and the "3.2x" FAQ citation uplift, the branded 40-55% / exact-match 3-5% anchor "budget" as a target, paid and reciprocal link tactics, building links to guest posts, podcast "tours", dofollow and DR claims, and First Page Sage CTR curves |
| Badal Patel, local-seo-audit v1 (this collection's predecessor) | MIT | kept: audit-first KEEP/MODIFY/REMOVE/DO NOT TOUCH order of work, verify-against-primary-sources rule, anti-patterns, YMYL rules, launch checklist; all dated facts updated |

## Other material

| Source | License / status | What was taken |
|---|---|---|
| HealersHype, "Rank Your Clinic #1 on Google: Local SEO Implementation Guide (2026)" (PDF, personal copy) | summarised and adapted, not reproduced | prerequisites, 7-step playbook with done-when gates, CID link method, one-page-per-treatment structure, keyword map, Search Console routine, MedicalClinic JSON-LD shape, 30-day rollout, monthly routine, metrics table, eight mistakes, realistic timelines; generalised beyond clinics; llms.txt and FAQPage advice revised to current Google guidance |
| Instagram tips (various creators), transcribed | summarised as checklists | GBP must-fill list; vibe-coded site SEO checklist; free SEO tools list including asking assistants who they recommend |
| Whitespark Local Search Ranking Factors (2026 edition), BrightLocal Local Consumer Review Survey (2026), Sterling Sky review-velocity case studies, Ahrefs brand-mention study (Dec 2025) | third-party studies | cited by name and date only where used; treated as directional, not as Google rules |
| Ahrefs anchor-text study (384,614 pages, updated Apr 2020); Ahrefs SERP-features study (1M US desktop SERPs, July 2025); Ahrefs AI Overview CTR study (300,000 keywords, Feb 2026); Seer Interactive AIO CTR update (Nov 2025); SparkToro/Datos zero-click study (2024); Semrush and A.J. Ghergich featured-snippet length study (about 1.4M snippets, 2018-era); Advanced Web Ranking CTR study (monthly) | third-party studies (v1.2) | cited by name and date in `references/content-eeat.md` sections 11 and 16 and `references/ai-search.md` section 13; directional, not Google rules; no CTR-by-position table is reproduced |

## Cross-references

Sibling skills in this collection: security-review, llm-app-security, dpdp-legal-compliance, ui-ux, web-design, launch-marketing, web-scraping.

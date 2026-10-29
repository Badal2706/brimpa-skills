# AI search reference (AI Overviews, AI Mode, ChatGPT, Perplexity, Claude, Copilot)

State as of Oct 2026. Primary sources: Google's "AI features and your website", "Optimizing your website for generative AI features on Google Search" and "Featured snippets and your website"; OpenAI, Anthropic, Perplexity and Apple crawler docs. Re-read them before quoting; this area moves monthly.

## Contents

1. [What Google actually says](#1-what-google-actually-says)
2. [Google's misconceptions list](#2-googles-misconceptions-list)
3. [Controls: what limits appearance in AI features](#3-controls-what-limits-appearance-in-ai-features)
4. [Crawler table](#4-crawler-table)
5. [robots.txt template](#5-robotstxt-template)
6. [llms.txt status and optional template](#6-llmstxt-status-and-optional-template)
7. [Bing, ChatGPT, Perplexity, Claude, Apple](#7-bing-chatgpt-perplexity-claude-apple)
8. [Preferred sources and other Google citation surfaces](#8-preferred-sources-and-other-google-citation-surfaces)
9. [Citability: what to do on the page](#9-citability-what-to-do-on-the-page)
10. [How to measure AI visibility](#10-how-to-measure-ai-visibility)
11. [GEO myths and the honest version](#11-geo-myths-and-the-honest-version)
12. [Hidden instructions and manipulation](#12-hidden-instructions-and-manipulation)
13. [Featured snippets vs AI Overviews](#13-featured-snippets-vs-ai-overviews)

---

## 1. What Google actually says

- "There are no additional requirements to appear in AI Overviews or AI Mode, nor other special optimizations necessary." The only requirement: the page is indexed and eligible to show with a snippet.
- "You don't need to create new machine readable files, AI text files, or markup to appear in these features."
- Optimising for generative AI features "is still SEO". AEO/GEO are other names for the same work.
- Both features use **query fan-out**: one question becomes several related searches, and the answer links to "a wider and more diverse set of helpful links" than classic Search. AI Overviews and AI Mode may use different models, so their links differ. AI Overviews only appear when Google judges them additive.
- What to invest in: non-commodity content created by the people who know the topic ("avoid content that could originate from anyone"); supporting images and video of your own; good page experience; accurate Business Profile and Merchant Center data (products and services can appear in AI responses from there).
- Traffic from AI features is reported in Search Console's Performance report under the **Web** search type. Google has not published a separate verified AI-citations report as of Oct 2026; treat claims of one as unverified unless you see it in the property.
- AI agents (bookings, purchases) are a growing surface; Google references the Universal Commerce Protocol for merchants. Only relevant to e-commerce already on Merchant Center.

## 2. Google's misconceptions list

Google's guide names these as things you can ignore:
- `llms.txt` or other machine-readable AI files: "Google Search itself doesn't use them" (changelog note June 2026: "won't affect rankings either way").
- Chunking content into "AI-sized" blocks: "There's no ideal page length."
- Rewriting content with AI-specific phrasing or chasing long-tail variants.
- Manufacturing brand mentions on blogs, forums or videos.
- AI-specific structured data: there is no special schema for AI. Normal structured data still earns rich results.

## 3. Controls: what limits appearance in AI features

| Control | Effect |
|---|---|
| `robots.txt` Disallow for `Googlebot` | removes the site from Search and from AI Overviews / AI Mode |
| `noindex` | page not indexed, so not eligible anywhere |
| `nosnippet` | no snippet, so the page cannot appear in AI features (they require snippet eligibility) |
| `max-snippet:N` | caps the text Google can show from the page, including in AI features |
| `data-nosnippet` attribute | excludes a section from snippets and AI answers while the page stays eligible |
| `Google-Extended` (robots.txt) | opts content out of Gemini model training and grounding in Gemini Apps / Vertex AI "Grounding with Google Search"; **does not** affect Search, AI Overviews or AI Mode, and is not a ranking signal |

Use `data-nosnippet` for content you want indexed but not quoted (pricing tables you change often, legal text). Do not use `nosnippet` on pages you want cited.

## 4. Crawler table

Decide access by purpose (search index vs model training vs user-triggered fetch), not by vendor. Group selection in robots.txt means each named group must repeat the general `Disallow` lines.

| Token | Owner | Purpose | Blocking it means | robots.txt |
|---|---|---|---|---|
| `Googlebot` | Google | Search, AI Overviews, AI Mode | gone from Google entirely | honoured |
| `Google-Extended` | Google | control token (no own UA): Gemini training + grounding in Gemini Apps/Vertex | no effect on Search or AI features | honoured |
| `OAI-SearchBot` | OpenAI | ChatGPT search index | "will not be shown in ChatGPT search answers"; change applies in about 24 h | honoured |
| `GPTBot` | OpenAI | training foundation models | content not used for training; no effect on ChatGPT search | honoured |
| `ChatGPT-User` | OpenAI | fetch when a user asks about a URL | not a crawler; robots "may not apply" | not guaranteed |
| `OAI-AdsBot` | OpenAI | ad landing pages only | n/a | n/a |
| `Claude-SearchBot` | Anthropic | Claude search quality index | may reduce visibility in Claude search results | honoured |
| `ClaudeBot` | Anthropic | training | not used for training; supports `Crawl-delay` | honoured |
| `Claude-User` | Anthropic | user-initiated fetch | per doc, honours robots | honoured |
| `PerplexityBot` | Perplexity | Perplexity search index ("not used for AI foundation models") | not cited in Perplexity | honoured |
| `Perplexity-User` | Perplexity | user-action fetch | "generally ignores robots.txt" | ignored |
| `Applebot` | Apple | Spotlight, Siri, Safari search; may also feed Apple models | gone from Apple search surfaces | honoured |
| `Applebot-Extended` | Apple | control token: training of Apple foundation models | no effect on Apple search inclusion; `nosnippet` separately limits use as AI context | honoured |
| `Bingbot` | Microsoft | Bing index, Copilot, part of the ChatGPT stack | gone from Bing and Copilot | honoured |
| `CCBot` | Common Crawl | open datasets used for training by many | licensing decision | honoured |
| `Bytespider` | ByteDance | training | compliance reported inconsistent; no official doc; block at WAF if needed | unverified |
| `Google-CloudVertexBot` | Google | site-owner-requested Vertex crawls | n/a unless you use it | honoured |

Practical defaults: allow `Googlebot`, `Bingbot`, `OAI-SearchBot`, `Claude-SearchBot`, `PerplexityBot`, `Applebot`. Training tokens (`GPTBot`, `ClaudeBot`, `Google-Extended`, `Applebot-Extended`, `CCBot`) are the owner's licensing decision; say plainly that blocking them has no effect on Google Search and does not stop ChatGPT/Claude/Perplexity from citing the site. Report training, search and user-triggered access on separate lines in the audit.

Many AI crawlers do not execute JavaScript. Content that only exists after hydration is invisible to them; this is the strongest technical argument for SSR/SSG on marketing pages.

Verified-bot authentication (Web Bot Auth, HTTP Message Signatures) is emerging for agents; CDNs expose "verified bots" lists. If a WAF or bot-protection product is in front of the site, make sure it does not challenge the search crawlers above with CAPTCHAs.

## 5. robots.txt template

```
# https://www.example.com/robots.txt  (reviewed 2026-10-20)

User-agent: *
Allow: /
Disallow: /admin/
Disallow: /cart/
Disallow: /thank-you/
Disallow: /search?

# AI search crawlers: allowed so the site can be cited in AI answers.
# Each named group must repeat the Disallow lines (RFC 9309 group selection).
User-agent: OAI-SearchBot
Allow: /
Disallow: /admin/
Disallow: /cart/
Disallow: /thank-you/

User-agent: Claude-SearchBot
Allow: /
Disallow: /admin/
Disallow: /cart/
Disallow: /thank-you/

User-agent: PerplexityBot
Allow: /
Disallow: /admin/
Disallow: /cart/
Disallow: /thank-you/

# Model-training crawlers: owner's decision. Example below ALLOWS them.
# To opt out of training, change "Allow: /" to "Disallow: /" in these groups only;
# this does not affect Google Search, AI Overviews, AI Mode, or the search bots above.
User-agent: GPTBot
Allow: /
Disallow: /admin/

User-agent: ClaudeBot
Allow: /
Disallow: /admin/

User-agent: Google-Extended
Allow: /

User-agent: Applebot-Extended
Allow: /

Sitemap: https://www.example.com/sitemap.xml
```

Never put private paths in robots.txt as a security measure (it is a public map); put them behind authentication. Do not add `Crawl-delay` for Googlebot (ignored).

## 6. llms.txt status and optional template

- Not used by Google Search (two Google docs). OpenAI, Anthropic and Perplexity control crawling via robots.txt and do not document consuming third-party `llms.txt`. Measured bot traffic to `/llms.txt` is negligible (independent log studies in 2025-2026). Where it does matter: developer documentation consumed by AI coding agents, and Lighthouse's "Agentic Browsing" lab audit, which checks for a valid file.
- Posture: report presence as Info; zero citation weight; generate on request with this banner in the audit: "Optional. Google does not use this file; no major answer engine confirms using it. Harmless, one hour of work, never a substitute for indexable pages."
- If generated, follow the llmstxt.org shape: `# Site name` (H1, required), a blockquote of 1-3 factual sentences, H2 sections each with `- [Title](absolute https URL): factual description`; only sections that exist; no marketing adjectives; no social/legal/CDN URLs; under 5,000 words; verify every link resolves. Place it at the web root (`public/` in Next.js/Astro/Nuxt, `static/` in SvelteKit/Hugo, repo root in Jekyll).

```
# Example Chest Clinic
> Pulmonology clinic in Indirapuram, Ghaziabad. Dr. Example Name, MD (Pulmonary Medicine), 14 years of practice. Treats asthma, COPD and sleep apnea. Open Mon-Sat 10:00-21:00. Appointments: +91XXXXXXXXXX.

## Treatments
- [Asthma treatment](https://www.example-clinic.in/asthma-treatment-indirapuram/): diagnosis, inhaler therapy, follow-up plans
- [Sleep apnea](https://www.example-clinic.in/sleep-apnea-indirapuram/): home sleep studies, CPAP titration

## About
- [Dr. Example Name](https://www.example-clinic.in/doctors/dr-example/): qualifications, registration, experience
- [Contact and directions](https://www.example-clinic.in/contact/): address, hours, map
```

## 7. Bing, ChatGPT, Perplexity, Claude, Apple

- **Bing Webmaster Tools**: verify (import from Search Console), submit the sitemap, enable IndexNow if the CMS supports it. The **AI Performance** report (public preview since Feb 2026) shows citations across Copilot, Bing AI summaries and partner integrations; it counts citations, not clicks, and does not name ChatGPT.
- **ChatGPT search**: a hybrid stack (OpenAI's own index and cached content plus Bing-derived data, especially in deep-research modes). Requirements: `OAI-SearchBot` allowed, server-rendered content, Bing index coverage. Do not claim Bing alone guarantees ChatGPT visibility or that OpenAI no longer uses Bing; neither is documented.
- **Perplexity**: own crawler and index (`PerplexityBot`); cites several sources per answer and favours authoritative, recently updated pages; Reddit and Wikipedia are heavily cited (third-party measurements).
- **Claude**: `Claude-SearchBot` for search quality; `Claude-User` fetches when a user asks. Allow both for visibility.
- **Apple**: `Applebot` powers Siri/Spotlight/Safari suggestions; Apple Business Connect supplies local data; `Applebot-Extended` only controls training.
- **GA4**: AI assistant referrals (chatgpt.com, perplexity.ai, claude.ai, gemini.google.com, copilot.microsoft.com) show as referral traffic; build a channel group for them. It undercounts (many answers are read without a click) and excludes AI Overviews/AI Mode, which arrive as google / organic.

## 8. Preferred sources and other Google citation surfaces

- **Preferred sources**: readers choose sites in Search settings (`google.com/preferences/source`). Chosen sites get a "preferred" badge in Top Stories and, since 27 May 2026, in AI Overviews and AI Mode. Works at domain or subdomain level, not for a `/blog/` folder. Google provides an "add as preferred source" button snippet and deep link; publishers can place it on the site and in newsletters. Google reports preferred sources are clicked more often (Google statement, third-party reported). Not a ranking lift for everyone else.
- Other surfaces: "Highly cited" labels for original reporting, community perspectives (forums, first-hand accounts), inline links, link carousels. A "Search profile badge" guide was added in Sept 2026 for creators who link their profile.
- Appearance in all of these is governed by the same controls as section 3; there is no separate opt-in.

## 9. Citability: what to do on the page

These are the practices consistent with Google's guide and with how answer engines quote pages. None is a trick; each also helps human readers.

- Lead each section with the answer: a clear definition or direct statement in the first two or three sentences, then detail. Question-form H2/H3 where readers ask questions.
- Specific facts with sources and dates: numbers, prices, durations, names, locations. Vague copy is not quotable.
- First-hand evidence: your own photos, data, case results, process descriptions. Google's example of the right kind of page: "Why we waived the inspection and saved money: a look inside the sewer line" rather than "7 tips for first-time homebuyers".
- Visible authorship: byline, credentials, profile page with `Person`/`ProfilePage` markup, `sameAs` to professional registries and LinkedIn; publication and update dates.
- Comparison tables and ordered lists where the content is a comparison or a procedure.
- Entity clarity: consistent name, `Organization`/LocalBusiness schema, `sameAs` to Wikidata/Wikipedia where an entry exists, consistent NAP.
- Freshness program: review and update key pages; recently updated pages are cited more often (third-party studies; direction, not a rule).
- Server-side rendering and fast pages so non-JS crawlers see everything.
- Brand presence where assistants look: directories, review sites, YouTube, Reddit threads where genuine participation is welcome. Earned mentions, not planted ones.
- Do not: build "answer blocks" of a prescribed word count, repeat the question in the answer for its own sake, or publish `FAQPage` markup for AI benefit.

## 10. How to measure AI visibility

1. **Search Console**: impressions and clicks from AI features sit in the Web search type; watch total impressions for key pages and query count growth, since AI answers link to more diverse pages.
2. **Bing Webmaster Tools AI Performance**: citations across Copilot and Bing AI surfaces.
3. **GA4 referral channel** for assistant domains (undercounts).
4. **Share-of-voice probe (monthly, same prompts):** write 10-20 buyer-intent prompts in the customers' words; ask ChatGPT (with search), Perplexity, Gemini or Google AI Mode, Claude, and Copilot; record brand mentions, position among competitors, sentiment of the surrounding text, and every cited domain. Compute mention rate, average rank, win rate and citation share (bands in `references/report-template.md`). Build the **citation gap list**: domains assistants cite for your prompts where the business is absent (directories, review sites, comparison articles), and go get listed or mentioned there legitimately.
5. **Prompt-level loss log**: for each prompt where competitors win, note what the assistant praised (speed, price transparency, reviews, a specific page) and whether the business has an equivalent page or proof.
6. Optional paid trackers exist; label their numbers with the tool and date.

Keep every measurement labelled point-in-time; answers vary by phrasing, location, account and day.

## 11. GEO myths and the honest version

| Claim | Status |
|---|---|
| "Missing llms.txt makes you invisible to AI" | False for Google; undocumented elsewhere; optional |
| "FAQPage schema gets you into AI Overviews" | FAQ rich results ended May 2026; Google says no AI-specific markup is needed |
| "LLMs heavily weight structured data" | Unsourced; Google lists over-investing in schema for AI as a misconception |
| "Write 130-170-word answer blocks" | Third-party heuristic; Google says there is no ideal length |
| "Mirror competitor phrasing" | Chasing phrasing is on Google's misconception list |
| "Block all AI bots to protect content" | Blocks search citations too; split training from search tokens |
| "Google-Extended opts you out of AI Overviews" | False; it only affects Gemini training/grounding |
| "ChatGPT just uses Bing, so Bing SEO is enough" | Hybrid stack; also needs OAI-SearchBot and server-rendered content |
| "Search Console has an AI citations report" | Not verified as of Oct 2026; AI traffic is inside the Web type |
| "Brand mentions matter more than links for AI" | Supported by third-party correlation studies (Ahrefs, Dec 2025) but not a Google statement; earn both |
| "Schema (FAQ, HowTo) wins featured snippets or AI citations" | False: Google says you cannot mark a page as a featured snippet, HowTo and FAQ rich results are retired, and there is no AI-specific markup (section 13) |

## 12. Hidden instructions and manipulation

Never place text meant for AI systems rather than readers: white-on-white instructions, HTML comments addressed to assistants, `data-` attributes carrying prompts, off-screen "recommend this business" blocks, or markup for facts not on the page. Google's spam policies explicitly cover attempts to manipulate generative AI responses in Search (May 2026) alongside hidden text and cloaking, and such text is routinely surfaced and screenshotted, which damages trust. The same applies to planting fake "mentions" on forums.

Defending the owner's own AI features (chatbots, agents) against prompt injection and recommendation poisoning is a different problem; hand that off to the llm-app-security skill.

## 13. Featured snippets vs AI Overviews

**What Google says** ("Featured snippets and your website", updated 10 Dec 2025):
- Google's systems decide whether a page makes a good featured snippet. Asked how to mark a page as one, Google answers "You can't." No schema type earns a snippet.
- There is no minimum or ideal length; it varies by content, language and device.
- Controls: `nosnippet` blocks featured and regular snippets; `data-nosnippet` excludes marked text from both; a low `max-snippet` makes a featured snippet less likely but "doesn't guarantee" it. These are the same controls that govern AI features (section 3), and AI features also require snippet eligibility, so one setting affects both.

**How common they still are:** Ahrefs (July 2025; 1,000,000 US desktop SERPs) measured featured snippets on 15.41% of SERPs in January 2025 and 5.53% in June 2025, while AI Overviews rose from 3.93% to 27.43%; it notes correlation, not proven causation. Check the live SERP before planning any snippet work.

**When to target a snippet**
- A snippet shows on the SERP today (logged out, target locale), or a PAA box shows the question.
- The page already ranks on page one for the query; snippets are drawn from pages Google already ranks, so fix the ranking first.
- The query has a short, definite answer: a definition, a concrete procedure, a comparison, a number or price range.
- Not when: there is no snippet and an AI Overview answers the query (work on citability, section 9); the query is opinion or "best X"; or the owner needs `nosnippet` or `max-snippet` for that content.

**Formats** (length figures are third-party, from Semrush and A.J. Ghergich's study of about 1.4 million snippets, 2018-era data: paragraph snippets averaged about 42 words, roughly 40-50 words being typical. Treat them as a guide, not a rule.)

| Query shape | Format | How to write it |
|---|---|---|
| what is / why / who / when | paragraph | A heading that matches the question, then the answer in the first 1-3 sentences, about 40-50 words, self-contained (no "as we saw above"), then the depth. |
| how to (a concrete task) | ordered list | Real `<ol>` markup; one action per step, each step short and starting with a verb; long lists get cut with "More items", so keep the core steps together. |
| types / signs / options | unordered list | Real `<ul>`; short parallel items. |
| X vs Y, prices, specs | table | Real `<table>` with header cells; a few rows; short cells; units in the header. |

**How this relates to AI Overview citation**
- Both draw only on indexed, snippet-eligible pages, and the same habits serve both and the reader: answer first under a matching heading, self-contained sections, specific facts with sources and dates.
- AI Overviews and AI Mode then fan one query out into related searches and link "a wider and more diverse set of helpful links" (Google), so a page answering a sub-question well can be cited without ranking first for the main query. A snippet is one page's text for one query; AI citation rewards covering the sub-questions across a page or a small cluster.
- Do not carry snippet length rules over to AI answers: Google lists "AI-sized" chunking and AI-specific markup as misconceptions (section 2). Do not add `FAQPage` or `HowTo` markup for either surface (both rich results are retired).
- Traffic from both shows in Search Console under the Web search type; there is no separate snippet report.

| | No AI Overview | AI Overview present |
|---|---|---|
| **Snippet present** | Target the snippet: one answer block, rewrite only that section. | Write the snippet-ready block, and cover the sub-questions for citation. |
| **No snippet** | Answer the PAA questions visibly on the page; win the ranking first. | Citability (section 9) and sub-question pages; skip snippet work. |

**Process:** quote the current snippet text and its holder; find where your page answers the question; rewrite only that block (heading, answer, then depth) and leave the rest of the page alone; wait 2-4 weeks before changing it again (heuristic); judge by the query's clicks and CTR in Search Console.

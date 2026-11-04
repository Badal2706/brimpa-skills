# Search Console workflows, rank checks and free tools

Procedures that use Search Console data (by hand, by export, or through the free `mcp-gsc` MCP server pinned under `upstream/mcp-gsc`), plus conventions for live rank checks, the local rank grid, and the two free CLIs worth running as a second pass. Everything here is a method; the numbers labelled "heuristic" are ours, not Google's.

## Contents
1. Search Console API facts that change how you read the data
2. Cannibalisation: finding it in query x page data
3. Content opportunities: striking distance vs CTR under-performers
4. Indexing triage with URL Inspection
5. Period-over-period alerts without false drops
6. Measuring crawler activity from logs
7. Live rank-check conventions
8. Local rank grid (map pack)
9. Shortlist, choose, then size the benefit
10. Free tools: `geo` audit CLI and `mcp-gsc` (what to trust, what to ignore)

## 1. Search Console API facts
- Search Analytics returns at most **25,000 rows per request**, sorted by clicks only; paginate with `startRow`. If you take the default 1,000 rows you lose exactly the high-impression, zero-click rows you are looking for.
- Rare queries are anonymised, so query totals never sum to page totals.
- Data for the last 2-3 days is partial. Use `dataState=final` (or exclude the last 3 days) for any comparison.
- Page-level **index counts** come from the Search Console UI (Pages report); the API has no indexing report, only per-URL inspection (about 2,000 inspections per property per day; re-check Google's current quota page).
- Custom regex filters use RE2 (see the long-tail pattern in `content-eeat.md` §16).
- A Domain property (DNS TXT) covers http/https/www/subdomains; URL-prefix properties do not.

## 2. Cannibalisation in Search Console
1. Export query x page for the last 3 months (max rows), drop branded queries.
2. Candidate: a non-branded query where **two or more URLs each take at least ~15% of its impressions** and both average inside the top 20 (heuristic thresholds).
3. Check week by week whether the ranking URL flips; a stable split between a home page and a service page is usually a double listing, not a problem.
4. Not cannibalisation: pages that serve different intents for the same words (a "granite price" guide and a "granite" catalogue page).
5. Resolve with the SERP-overlap rule in `content-eeat.md` §9-10: merge with a 301, re-target one page, or fix internal anchors. Use `rel=canonical` only for true duplicates, never between two pages that both deserve to exist.
6. Rank cases by impressions at stake; report the top five.

## 3. Content opportunities: two buckets, two fixes
Pull page x query with impressions, clicks, CTR and position for 3 months, then split:
- **Striking distance**: average position 8-20 and impressions above the site's median for that period. Fix with depth (sub-question sections, data, photos), internal links from stronger pages, and intent match. A title rewrite does not move a page-2 ranking.
- **CTR under-performers**: positions 1-7 with CTR below the site's **own** CTR for that position band (compute it from the export; do not use a generic "3%" or "5%" constant). Fix with the title and meta description, and check what the SERP shows around you (ads, local pack, AI Overview) before blaming the title.
- Estimated gain = impressions x (the site's own CTR at the target position - current CTR). Label it an estimate; it is not traffic.
- The "pages with high impressions and almost no clicks" sort in the UI (Pages > sort by impressions) is the quick version of the same idea; export those pages' queries and read which sub-questions the page never answers. Add the missing sections to the existing page before writing a new one.

## 4. Indexing triage
1. Sample: every sitemap URL on a small site; on a large one, each page template, pages with zero impressions in 90 days, and anything published in the last month. Do **not** sample only the top pages by impressions (they are indexed by definition).
2. Inspect each (UI, or `batch_url_inspection` in `mcp-gsc`, 10 URLs per call) and record `coverageState`, `googleCanonical` vs `userCanonical`, `crawledAs`, `lastCrawlTime`, `robotsTxtState`, `indexingState`, and rich-result issues.
3. Act by state:
   - *Discovered, currently not indexed*: internal links and crawl demand; is the page linked from anything that gets crawled?
   - *Crawled, currently not indexed*: quality or duplication; thin or near-duplicate pages, consolidate.
   - *Duplicate, Google chose different canonical*: compare the two canonicals; fix the signal that disagrees (redirects, hreflang, internal links, sitemap).
   - *noindex*, *blocked by robots.txt*, *soft 404*: blockers; fix and request indexing.
   - *Page with redirect*: fine if intended; otherwise the sitemap is stale.
4. Re-inspect after the fix and record the date; "Indexed after the fix" is the check in the bank.

## 5. Period-over-period alerts
- Compare equal weekday spans (28 days vs the previous 28, aligned on weekday), and add year-over-year for seasonal businesses.
- Exclude the last 3 days or use final data; otherwise every weekly report shows a fake drop.
- Alert on a >20% drop **only above a volume floor** (say 20 clicks or 500 impressions in the base period); small numbers swing.
- Report by page and by query; a page-level drop with stable queries usually means a ranking URL swap or an indexing event.

## 6. Crawler activity from logs
Step 0 of any AI-visibility measurement: count hits per crawler token (Googlebot, Bingbot, GPTBot, OAI-SearchBot, ClaudeBot, Claude-SearchBot, PerplexityBot, Applebot) on the key URLs per month from server or CDN logs. **Verify** claimed bots before trusting counts: Googlebot and Bingbot by reverse DNS, OpenAI and Perplexity against their published IP ranges; spoofed user agents are common. A page no AI crawler ever fetches cannot be cited; that is a technical finding, not a content one.

## 7. Live rank-check conventions
- Count organic listings only; write positions as "#11 (page 2)".
- Check to depth 20; an unseen URL is "not in the first 20". A failed lookup is "unknown", never "absent".
- Log query, country, language, device, date and the URL that matched.
- Re-run the decisive queries before writing the report; if two same-day checks disagree, show both in brackets. That is normal variation, not a trend.
- For local queries, check from the business location (browser geolocation override, or a phone on site), logged out, incognito.

## 8. Local rank grid (map pack)
1. Confirm the storefront coordinate first (the pin in Google Maps, 7 decimals).
2. Run a 3x3 grid (5x5 only for a wide service area) with 1-2 km spacing in Indian cities, for 1-3 non-brand queries, logged out, with geolocation set to each point. Paid grid tools do the same; the manual version is free and good enough for a quarterly check.
3. Record the pack position at each point; count not-found as 21 and print "20+". Average across keywords.
4. Read each empty point against how many local results came back; a sparse pack means little demand there, not invisibility.
5. Name the #1 business at each point and explain drop-offs by rival proximity; then do the head-to-head in `local-seo.md` §7 (categories, review count and recency, reply rate, hours, photos, claimed status, website link to the right location page). Category and claim problems outrank posting cadence.

## 9. Shortlist, choose, size
1. Shortlist 5-10 candidate actions drawn from at least three kinds: an under-performing page, demand with no page, a winner to protect, an access or indexing defect, a next-step conversion fix.
2. Lead the report with 1-3 of them. Every other candidate gets a "What else we checked" row with a real reason, plus one sentence on why the runner-up lost.
3. Never rewrite a page that already ranks near the top for its target; protect it.
4. Size the benefit honestly: name the mechanism (new ranking, higher position, better CTR), size it against the query cluster minus current clicks, state the click-share assumption, use "total potential visits" when there is no baseline, and never invent a conversion rate.
5. Before sending: a second pass (another agent, or a fresh self-review) argues for the strongest rejected candidate and checks that every diagnosis survived somewhere in the report.
6. Page families: enumerate them from the sitemap, not the crawl sample; in each family read the best and worst performer; flag families whose pages only swap a city or product name into shared copy (the doorway "swap test", now with data).

## 10. Free tools
**`geo` audit CLI** (`upstream/geo-optimizer-skill`, MIT, Python 3.10+, no key): `uvx --from geo-optimizer-skill geo audit --url https://site.example --no-plugins`. Useful as an automated second pass for: snippet controls, canonical conflicts, date markup, JS-dependence heuristic, crawler access and a CDN challenge probe. Ignore its score (9 of 100 points ride on llms.txt and non-standard "AI discovery" files that no engine documents) and **never run `geo fix --apply`**: its fixer writes FAQPage JSON-LD with placeholder answers and robots groups that drop existing Disallow lines. Its citations command needs a model API key; skip it.

**`mcp-gsc`** (`upstream/mcp-gsc`, MIT, Python 3.11+, `uvx mcp-search-console`): a free MCP server over the Search Console API; needs a Google Cloud project with the API enabled and either OAuth (browser login) or a service account added as a property user. Leave `GSC_ALLOW_DESTRUCTIVE` unset. Tools that map to this file: `get_search_analytics` / `get_search_by_page_query` / `get_advanced_search_analytics` (sections 2-3), `compare_search_periods` (5), `inspect_url_enhanced` / `batch_url_inspection` / `check_indexing_issues` (4), sitemap tools (technical-checklist §4). Its bundled skills are thin and use naive thresholds; use the procedures above instead.

**OpenSEO** (every-app/open-seo, MIT) is a self-hostable Semrush alternative whose keyword, SERP, local and AI-visibility data all need a DataForSEO key (from $50) or its $10/month hosted plan; its AI prompt data is US-English only. Listed in TOOLBOX, not pinned; the methods worth having are already in this file and in `ai-search.md` §10.

Sources: method items adapted and rewritten from AminForou/mcp-gsc (MIT), every-app/open-seo (MIT) and Auriti-Labs/geo-optimizer-skill (MIT); see `sources.md`.

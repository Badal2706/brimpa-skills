# Report template, scoring and priorities

Scores are audit heuristics (weights adapted from the claude-seo project), not Google signals. Print what was measured and what was not; a category you did not measure is "not measured", never a number.

## Health score weights (0-100)

| Category | Weight | What feeds it |
|---|---|---|
| Technical SEO | 22 | crawlability, indexability, canonicals, robots, sitemap, redirects, JS rendering, HTTPS |
| Content quality | 23 | Who/How/Why, information gain, E-E-A-T signals, freshness, YMYL compliance, thin/duplicate pages |
| On-page | 20 | titles, descriptions, H1/headings, internal links, keyword map / cannibalisation, local signals on page |
| Structured data | 10 | correct specific types, required properties, validation, parity with page and GBP, no retired types relied on |
| Core Web Vitals | 10 | field LCP/INP/CLS on mobile for key templates |
| AI search readiness | 10 | indexable + snippet-eligible, crawler access by purpose, SSR, citability, authorship, measurement in place |
| Images | 5 | alt coverage, dimensions, formats, weight, lazy-loading, LCP image handling |

Per-category score = share of applicable checks passed, pulled down by severity (any Critical in a category caps it at 40; any High caps it at 70). Weighted sum over measured categories only, re-normalised to 100, with the list of unmeasured categories printed next to the score.

Local businesses get a second score, **Local visibility (0-100)**: GBP signals 25, reviews and reputation 20, local on-page 20, NAP and citations 15, local schema 10, local links and authority 10. GBP completeness itself is scored with the 25-field checklist in `references/local-seo.md`.

Optional **Conversion and copy lens** (from the position-me teardown method), five dimensions 0-100 reported separately and never mixed into the health score: visual hierarchy (LIFT: value, relevance, clarity, anxiety, distraction, urgency; Hick's law for choices per screen), copywriting (problem-agitate-solve in the hero, verbs in CTAs, microcopy), content actionability (fluff test), technical SEO and schema, AI/answer-engine parseability.

## Priority levels and SLAs

| Priority | Meaning | Fix by |
|---|---|---|
| Critical | blocks indexing, violates a spam policy, breaks the site for users, or exposes the owner (fake reviews, hidden text, YMYL misinformation) | immediately |
| High | significantly affects rankings or conversions on key pages | within 1 week |
| Medium | optimisation opportunity | within 1 month |
| Low | nice to have | backlog |
| Info | aware, no action (retired schema present, `priority` in sitemap) | none |

## Finding record (one per issue)

```
### <ID> <short title>                     Priority: <Critical|High|Medium|Low|Info>
Verdict: KEEP | MODIFY | REMOVE | DO NOT TOUCH
Where: <URL(s) or template>
Observation: <what was actually seen; include the raw value, e.g. "<title>Home</title>", "robots.txt returns 503">
Why it matters: <one sentence, cite the Google doc or the user impact>
Fix: <exact change; code or GBP field>
Depends on / unblocks: <other IDs>
How we know it failed: <the check to run after the fix, e.g. "URL Inspection still shows Excluded by noindex after 7 days">
Leading indicator: <what to watch, e.g. impressions for the page in GSC>
Evidence level: <measured | inferred | third-party study (name, date) | not measured>
```

KEEP = correct, leave it (say why, so nobody "optimises" it later). MODIFY = keep the element, change the value. REMOVE = delete (unused files, duplicate schema blocks, meta keywords, doorway pages). DO NOT TOUCH = working but fragile or outside scope (payment flows, legal pages, tracking that compliance depends on, redirects from an old domain).

## Full report skeleton

```
# SEO + GEO audit: <domain>
Date: <YYYY-MM-DD> | Depth: <fetch | browser | +PSI/CrUX | +Search Console | +paid tools> | Pages inspected: <n>
Business type: <local brick-and-mortar | service-area | online | publisher | e-commerce | SaaS> | Vertical: <...> | Markets/languages: <...>

## 1. Executive summary
Health score: NN/100 (heuristic). Not measured: <categories>.
Local visibility: NN/100 (if applicable). GBP completeness: NN/100.
Top 5 critical issues:
Top 5 quick wins (under 1 hour each):
What is already good (KEEP):

## 2. Scorecard
| Category | Weight | Score | Status | Key evidence |
(Technical 22 / Content 23 / On-page 20 / Schema 10 / CWV 10 / AI readiness 10 / Images 5)

## 3. Findings
### 3.1 Technical  ### 3.2 On-page  ### 3.3 Structured data  ### 3.4 Content and E-E-A-T
### 3.5 Core Web Vitals  ### 3.6 Images  ### 3.7 AI search  ### 3.8 Local SEO (if applicable)
(finding records as above)

## 4. KEEP / MODIFY / REMOVE / DO NOT TOUCH table
| ID | Element | Verdict | Priority | One-line fix | Owner |

## 5. Local SEO detail (if applicable)
GBP 25-field completeness table | NAP matrix (site / schema / GBP / Apple / Bing / Facebook / top directories) |
Review health (count, rating, last review date, response rate, gaps > 3 weeks) | Service and location page inventory | Citation gaps

## 6. AI search detail
Crawler access table (Googlebot, OAI-SearchBot, Claude-SearchBot, PerplexityBot, training bots) | Snippet controls in use |
Citability notes per key page | Share-of-voice baseline (prompts, mentions, cited domains) | Measurement plan

## 7. Action plan
Week 1 (Critical): ...
Weeks 2-3 (High): ...
Month 2 (Medium): ...
Ongoing (monthly routine): ...

## 8. Limitations
What this audit could not assess and why (no Search Console access, no field CWV data, GBP not visible, no backlink data, ...).
```

## Action matrix (compact alternative for small sites)

| Severity | Category | Problem | Fix | Effort | Evidence |
|---|---|---|---|---|---|
| Critical | Technical | robots.txt `Disallow: /` left from staging | remove line, resubmit sitemap, inspect 10 URLs | 10 min | measured |
| High | Local | GBP primary category "Doctor" instead of "Pulmonologist" | change category, keep "Doctor" as secondary | 5 min | measured |
| Medium | On-page | 14 service pages share the description "Contact us today" | write page-specific descriptions with price-from / area | 2 h | measured |

Never fill an "expected ROI" column with invented percentages. If a third-party study is the basis, name it and its date; otherwise describe the expected effect qualitatively.

## Share-of-voice table (AI visibility baseline)

| Prompt | ChatGPT | Perplexity | Gemini / AI Mode | Claude | Our rank | Domains cited |
|---|---|---|---|---|---|---|
| "best pulmonologist in Indirapuram" | mentioned (#2) | not mentioned | mentioned (#1) | not mentioned | 1.5 | practo.com, justdial.com, example-clinic.in |

Summary metrics (geo-gap-fixer rubric): mention rate = prompts with a brand mention / prompts; average rank = mean first-mention position among tracked brands; win rate = share of prompts where the brand is first; citation share = brand-domain citations / all citations. Bands (heuristic): mention rate 80-100 excellent, 50-79 good, 20-49 weak, below 20 critical; citation share 20%+ strong, 5-19 moderate, under 5 weak. Point-in-time only; re-run monthly with the same prompts.

## Scorecard rendering (plain text)

```
Technical SEO        [########--]  78
Content quality      [######----]  61
On-page              [#######---]  72
Structured data      [####------]  40  (Critical: Product block invalid JSON)
Core Web Vitals      [not measured: no CrUX data, lab only]
AI search readiness  [########--]  80
Images               [#####-----]  55
```

No emojis in reports. Plain language, exact values, every number with its source.

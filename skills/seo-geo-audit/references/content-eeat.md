# Content, E-E-A-T and policy reference

State as of Oct 2026. Primary sources: Google's "Creating helpful, reliable, people-first content" (updated 5 Oct 2026), "Using generative AI content" (updated Oct 2026), spam policies (updated 28 Aug 2026), "Qualify your outbound links", Search Quality Rater Guidelines (latest confirmed edition 11 Sept 2025). Sections 11 and 14-17 adapt methods from inhouseseo/superseo-skills (Apache-2.0), rewritten and re-checked against Google's documentation; see `references/sources.md`.

## Contents

1. [The Who / How / Why test](#1-the-who--how--why-test)
2. [E-E-A-T model and signals](#2-e-e-a-t-model-and-signals)
3. [YMYL rules](#3-ymyl-rules)
4. [AI-generated content policy](#4-ai-generated-content-policy)
5. [Spam policies (2026)](#5-spam-policies-2026)
6. [Helpful-content signals and warning signs](#6-helpful-content-signals-and-warning-signs)
7. [Page-type coverage floors](#7-page-type-coverage-floors)
8. [Freshness](#8-freshness)
9. [Topic clusters and internal linking](#9-topic-clusters-and-internal-linking)
10. [Content briefs and information gain](#10-content-briefs-and-information-gain)
11. [Links and authority](#11-links-and-authority) (phase tree, anchor text, velocity red flags, tactic playbooks)
12. [Conversion and copy lens](#12-conversion-and-copy-lens)
13. [Traffic drops and Google updates](#13-traffic-drops-and-google-updates)
14. [Page content audit mode](#14-page-content-audit-mode)
15. [Semantic gap analysis](#15-semantic-gap-analysis)
16. [Keyword deep-dive](#16-keyword-deep-dive)
17. [Expert interview method](#17-expert-interview-method)

---

## 1. The Who / How / Why test

Before scoring any page, answer Google's three questions:
- **Who** made it: a visible byline and bio with relevant credentials (required on YMYL pages); a business page names the people behind it.
- **How** it was made: process shown where it adds trust (tests performed, data gathered, cases treated); disclose AI assistance when readers would reasonably want to know.
- **Why** it exists: to help the reader, not primarily to attract search visits. Pages written to a word count, into niches without expertise, or mass-produced to catch queries fail this.

## 2. E-E-A-T model and signals

E-E-A-T is the rater framework (Experience, Expertise, Authoritativeness, Trust); it is not a direct ranking score and Google publishes no weights. Trust is "the most important member of the family". For a consistent audit, weight it Trust 30 / Expertise 25 / Authoritativeness 25 / Experience 20 (an audit convention, not Google's numbers; do not use an equal split).

| Dimension | Evidence on the site |
|---|---|
| Experience | original photos and video, first-person accounts, before/after with consent, case notes, data the business collected itself |
| Expertise | named authors with credentials and registration numbers, accurate and sourced claims, reviewer line on medical/legal/financial pages, depth that matches the question |
| Authoritativeness | citations from other sites, press mentions, awards, memberships, speaking, an entity presence (consistent name, Wikidata/Wikipedia where legitimate), profile pages with `sameAs` |
| Trust | contact details and physical address, privacy policy and terms, HTTPS, pricing transparency, visible reviews, corrections and update history, no deceptive design, secure payments and clear refund terms for e-commerce |

Score bands (heuristic): 90-100 exceptional, 70-89 strong, 50-69 moderate, 30-49 weak, 0-29 very low. Improvement order by band: under 30 -> contact/about page, author identity, HTTPS, remove deception; 30-49 -> bios, first-hand content, external mentions, testimonials on page; 50-69 -> original research, topic clusters, recognition, process documentation; 70-89 -> freshness program, author presence off-site, video; 90+ -> maintain.

## 3. YMYL rules

Your Money or Your Life topics (health, medical, legal, financial, safety, civic information; the Sept 2025 rater guidelines expanded the civic category) are held to the highest standard.

- A qualified author or reviewer on every page; name, qualification, registration number, link to a profile page with `Person`/`ProfilePage` markup.
- Every clinical, legal or financial claim is checked by the practitioner before publishing; cite guidelines or primary sources where readers would want them.
- A clear disclaimer that content is informational and not a substitute for consultation; emergency guidance where relevant.
- No superlatives or guarantees ("best", "No. 1", "100% safe", "painless", "guaranteed results") unless independently verifiable; Indian medical-advertising rules (and professional-conduct regulations) restrict such claims for practitioners; similar rules exist for lawyers.
- No fabricated testimonials, no attributing words to real people, no stock photos presented as the clinic or team, no invented statistics.
- Patient or client stories only with documented consent and de-identification.
- Prices, hours, addresses and credentials must be current; stale YMYL pages are a trust problem, not just a freshness one.
- Purely AI-generated, unreviewed content on YMYL topics is rated Lowest by raters. Treat it as a Critical finding.

## 4. AI-generated content policy

- Using AI to research, outline, draft or structure is acceptable. What matters is whether the result is helpful, original and accurate, and whether it meets the spam policies.
- Google's instruction (doc updated Oct 2026): **manually fact-check and review all AI-generated content** for accuracy and trustworthiness before publishing, explicitly including titles, meta descriptions, structured data and image alt text.
- Many pages generated mainly to capture rankings, with little value, are **scaled content abuse** regardless of whether a human, an AI or a mix produced them. Automated transformations (synonymising, spinning, unreviewed machine translation) count.
- Consider disclosing how content was produced where readers care; label AI-generated product images and text in Merchant Center as its policies require.
- Low-quality markers to flag: generic phrasing with no specifics, repeated structure across pages, no author, no first-hand detail, errors a practitioner would catch, filler transitions. Cleaning AI tells is cosmetic; the fix is adding real information.
- Do not launder third-party content through rewriting tools; that is scraping plus scaled abuse.

## 5. Spam policies (2026)

Headings in Google's spam policies (updated 28 Aug 2026): cloaking, doorway abuse, expired domain abuse, hacked content, hidden text and link abuse, keyword stuffing, link spam, machine-generated traffic, malicious practices, misleading functionality (including back-button hijacking, added Apr 2026), scaled content abuse, scraping, site reputation policy (renamed from "site reputation abuse"), sneaky redirects, thin affiliation, user-generated spam. The introduction now states that spam includes attempts to manipulate generative AI responses in Google Search (May 2026).

Definitions worth quoting correctly:
- Scaled content abuse: "many pages are generated for the primary purpose of manipulating search rankings"; AI by itself is not a violation.
- Expired domain abuse: an expired domain "purchased and repurposed primarily to manipulate search rankings".
- Site reputation policy: "third-party content is published on a host site mainly because of that host's already-established ranking signals". Outside the EEA such pages can receive a manual action; inside the EEA they are treated as separate from the main domain, with a reconsideration and dispute process (Aug 2026 change). Treat it as a risk everywhere.
- Doorway abuse: pages or sites created to rank for specific queries that funnel users to the same destination (city-swap pages are the local version).

Reported ranking updates in 2025-2026 (third-party trackers, consistent across them): core updates in March and May 2026, a Discover-focused core update in Feb 2026, spam updates in March, June, August and September 2026 (described by Google as targeting scaled content abuse). Google also notes that smaller core updates happen between announced ones. There is no separate "helpful content update" any more; it was folded into core systems in March 2024.

## 6. Helpful-content signals and warning signs

Signals that a page is people-first: it answers the question the title promises; it shows evidence of first-hand experience; it leaves the reader feeling they learned enough to achieve their goal; it would be at home in a printed magazine or a professional's handout; it is written in the language of the audience; it is complete without padding.

Warning signs Google lists: writing to a word count, entering topics without expertise because they are trending, summarising what others say without adding value, promising answers that do not exist, faking freshness, mass-producing pages across many topics, changing dates without changing content.

Readability (not a ranking factor, but a usability one): sentences around 15-20 words, paragraphs of 2-4 sentences, a table of contents for long pages, plain words over jargon except where the audience expects the term.

## 7. Page-type coverage floors

Word counts are coverage floors (the minimum it usually takes to cover the topic), never targets; Google confirms there is no ideal length.

| Page type | Floor | Notes |
|---|---|---|
| Homepage | 500 | who, what, where, proof, next step |
| Service / treatment page | 800 | structure in `references/local-seo.md` |
| Location page (primary / secondary) | 600 / 500 | 60% / 40% unique content minimum |
| Blog post or guide | 1,500 | pillar pages 2,500-4,000; cluster posts 1,200-1,800 |
| Product page | 400 | unique description >= 200 words, not the manufacturer's copy |
| Category page | 400 | intro + links to all children |
| About / team page | 400 | credentials, photos, history |
| Landing page (campaign) | 600 | can be `noindex` if duplicative |
| FAQ hub | 800 | 8-15 real questions |
| Glossary entry (programmatic) | 200+ | each must stand alone |

Programmatic or templated content: flag below 300 words; require 30-40% genuinely unique content between any two pages; warn at 100 unreviewed pages, hard stop at 500; roll out in batches of 50-100 with 2-4 weeks of monitoring; sample 5-10% for human review.

## 8. Freshness

- Show the publication date and a last-updated date when a page is materially revised. Never bump dates cosmetically; Google rewrites titles with obsolete dates and raters mark fake freshness down.
- Review cadence: news within hours or days; product pages when specs or prices change; service pages quarterly; evergreen guides yearly; YMYL pages whenever guidance, law or prices change.
- Flag pages on fast-moving topics not updated in 12 months. For AI citation, recently updated pages are cited more often (third-party studies; direction, not a rule).

## 9. Topic clusters and internal linking

- Hub-and-spoke: one pillar page per topic (2,500-4,000 words), 2-5 clusters of 2-4 posts each, every spoke linking to the pillar and the pillar linking to every spoke, 2-3 sibling links per post, 0-1 cross-cluster link, every post with >= 3 incoming internal links, reachable from the pillar in two clicks.
- No two pages share a primary phrase. Decide merge vs separate by SERP overlap: if the top 10 results for two phrases share 7-10 URLs, one page; 4-6, same cluster; 2-3, interlink across clusters; 0-1, separate. Do not cluster by word similarity.
- Anchor text: descriptive, varied; no single anchor more than ~40% of links to a page; links in body copy, not only in navigation.
- Service businesses: the pillar is the service page; spokes are condition/problem explainers, cost guides, "what to expect" pages, comparisons between options, and local context pages (all real).
- Schema: pillar `Article` + `BreadcrumbList` (+ `ItemList` of spokes); spokes `Article` with `isPartOf` the pillar.
- Cluster scorecard: coverage of planned posts, link density >= 3 per post, zero orphans, zero cannibalisation, pillar links 100%.

## 10. Content briefs and information gain

For each new or improved page: the search intent (informational / commercial / transactional / local), the primary phrase and 2-3 secondary ones, the top-ranking pages and what they cover, the gaps (topics missing, depth missing, quality missing), the business's **unique input** (data, cases, photos, expert quotes, process), the sections with a one-line purpose each, 3-5 internal links with anchor text, schema per page type, author and reviewer, publish and review dates.

Rules: suggest only sections the business can credibly deliver (relevance rule); hub pages must link every real child page (structure rule); information gain is mandatory ("not more detail, something others do not have"); the fluff test on every draft: delete any sentence that could appear on a competitor's page unchanged without loss. Fill the gaps with the method in section 15 and the unique input with the interview in section 17.

Consolidation: when two or more thin pages target the same intent (their top-10 results overlap heavily, per section 9, or Search Console shows them swapping for the same queries), merge them into one stronger page. Move the best material into the surviving URL, 301 each retired URL to it in one hop (Google treats a permanent redirect as a signal that the target should be canonical), update internal links and the sitemap to the survivor, and keep the retired URLs out of the sitemap. Redirect only to a page that genuinely replaces the old one; Google staff have said redirects to an unrelated page (typically the homepage) can be treated as soft 404s. This is an irreversible change, so it needs sign-off.

## 11. Links and authority

- Links still matter; local and vertical relevance beats raw volume. Earn 2-4 (local business) to 5-10 (larger sites) quality links a month through directories and associations, partners, local press, community events, data or tools worth citing, expert commentary.
- Never buy link packages, PBNs, comment spam, footer links from unrelated sites, or "guest post" networks; never use expired domains for authority.
- Brand mentions without links correlate with AI visibility at least as strongly as links do (third-party, Ahrefs Dec 2025); earn both through the same activities.
- Backlink audits: report a numeric score only when at least 4 of 7 factors are measured (referring domains, quality distribution, anchor naturalness, toxic share, velocity, follow ratio, geographic relevance); otherwise print "insufficient data". Heuristic flags: exact-match anchors above ~15% of the profile (High; the ~5% review band is in 11.2); one domain above 10% of links; 10x new links in a week (negative SEO or a bought burst); 50% lost in a month. Disavow only for manual actions, clear negative SEO or identified PBNs.
- What Google names as link spam (spam policies, updated 28 Aug 2026): buying or selling links for ranking; excessive link exchanges or partner pages that exist only to cross-link; advertorials whose links pass ranking credit; "links with optimized anchor text in articles, guest posts, or press releases distributed on other sites"; keyword-rich or hidden links in widgets; sitewide footer or template links spread across sites; low-quality directory or bookmark links; forum comments with optimised links. Paid and sponsored links are fine when qualified with `rel="sponsored"` (or `nofollow`).

### 11.1 Phase decision tree (which tactics fit this site)

Classify from signals you can observe for free, and name the ones you actually checked; anything you could not verify is "not measured", not guessed.

| Signal | Foundation | Growth | Authority |
|---|---|---|---|
| Age (earlier of WHOIS registration and first Wayback snapshot) | under 12 months | 1-3 years | 3+ years |
| Indexed pages (`site:` order of magnitude only; it is imprecise) | under ~20 | ~20-500 | 500+ |
| Brand search result | no panel, look-alikes rank | small company card, own site first | full knowledge panel |
| Earned press or trade mentions, last 12 months (paid press-release syndication does not count) | none | a few, niche | regular |
| Active official profiles linked both ways and in `sameAs` | 0-2 | 3-4 | all relevant ones |
| Third-party authority metric (only if already available; name tool and date) | low | middle | high |

Decide: take the phase most signals support; when they split, take the lower one, because tactics for a stronger phase fail on a weaker site (nobody books an unknown brand for a podcast) while the reverse only wastes a little time. Edge cases: a new site for an established brand inherits the parent's phase; an old domain with thin content and no mentions is still Foundation; a narrow B2B or medical specialist cited by trade bodies counts as Authority for tactic choice even without a panel; a relaunched dormant brand is Growth.

Most local businesses (a clinic, a stone showroom) live in Foundation or Growth permanently, and that is fine: their useful links are local and vertical, not volume.

| Phase | Do first | Not yet |
|---|---|---|
| Foundation | real profiles and citations (GBP, Apple Business Connect, Bing Places, LinkedIn, Facebook, the vertical directories), identical NAP, `sameAs`, chamber or trade-association membership, supplier and manufacturer dealer pages, one or two pages worth linking to | outreach campaigns, PR, podcasts |
| Growth | competitor link gap, resource pages, expert contributions to publications the audience reads, local press, data-led PR | large co-research projects |
| Authority | partnerships and co-research, podcasts and speaking, recurring data studies | mass directory submissions |

### 11.2 Anchor text (verified version, as of Oct 2026)

- Google publishes no ideal anchor-text ratio, and John Mueller said in 2018 that anchor-text percentages are "not indicative of quality" (reported by Search Engine Roundtable). What Google does publish is the spam-policy line above: optimised anchors in articles, guest posts or press releases distributed on other sites are link spam. The risk is who controlled the anchor, not a percentage.
- Rule for every link the business places or can influence (guest articles, press releases, directory and partner descriptions, sponsor pages, widgets): use the brand name, the plain URL, or let the editor choose. Never request a keyword-rich anchor, at any share.
- Reading an existing profile (audit heuristic, not a Google rule): naturally earned profiles are dominated by brand, URL and generic anchors. Ahrefs' anchor-text study (384,614 pages, updated Apr 2020) found the median exact-match share among top-ranking pages was zero and noted practitioner advice of roughly 1-5%. Bands: exact-match up to ~5% is normal; ~5-15% is Medium, so check whether those links were placed or earned; above ~15% is High and is investigated as a likely link scheme or a legacy campaign. Exact-match anchors on links the site itself placed are a finding at any share.
- Third-party "safe distribution" tables (for example branded 40-55%, URL 15-20%, generic 15-20%, partial 10-15%, exact 3-5%) have no published dataset behind the split. Do not use them as targets, and never build links to "spend" an exact-match budget.
- If the profile is over: stop asking for keyword anchors; remove or get qualified (`rel="sponsored"`/`nofollow`) the placed links you control; check Search Console > Manual actions (a manual action needs a reconsideration request after cleanup); disavow only for a manual action or clear spam you cannot get removed. Do not commission "dilution links"; that is the same scheme in reverse.

### 11.3 Velocity and pattern red flags (diagnostic)

Google staff have said the speed of link acquisition is not itself a factor (Mueller, reported by Search Engine Journal; Gary Illyes has called "link velocity" a made-up term); whether the links are natural is. Treat these patterns as symptoms to investigate, not as penalties for speed:

- A new or small site jumping from a handful of new referring domains a month to dozens with no launch, press or viral explanation.
- New links clustered in one country or TLD unrelated to the market.
- Many new links with identical or keyword-rich anchors.
- Sitewide footer, sidebar or template links; links from widgets.
- Linking sites with no real audience, or several sharing a theme, host and registration pattern (network signature).
- Bursts from low-quality directories, bookmarking sites, forum signatures or comment sections.
- Sharp drops: 50% of links lost in a month, or a site that earned links steadily going silent (check for a broken page, a removed partner page, or a scared-off partner).

Track monthly without paid tools: a sheet with date found, linking page, domain, country, link type, anchor, anchor category (brand / URL / generic / partial / exact), follow attribute, placed or earned. Under ~500 referring domains a spreadsheet is enough; Ahrefs Webmaster Tools and Search Console's Links report cover the business's own site free.

### 11.4 Tactic playbooks (short)

Each playbook is legitimate only when the link would exist without the ranking motive. Pitches are short, specific and personal; follow up once.

- **Citations and directories (Foundation).** Claim the directories that already rank for the target query, the vertical ones (Practo and Lybrate for clinics; Justdial, Sulekha and IndiaMART-style trade directories for suppliers), chambers and trade associations. Same NAP character for character; 20-30 curated listings beat hundreds of junk ones. Paying for a listing for its traffic is fine; a link bought for ranking must carry `rel="sponsored"`. Detail lives in `references/local-seo.md`.
- **Official profiles and entity consistency (Foundation).** Create only profiles the business will keep active, complete them, cross-link them from the site and list them in `sameAs`. Wikidata or Wikipedia only where the business meets their notability rules; creating promotional entries gets them deleted. Most of these links are nofollow; the value is a consistent entity, not link equity.
- **Competitor link gap (Growth; needs a backlink tool for competitor data).** Find domains linking to two or more competitors but not to you; open the linking page, not just the domain; skip paid, network and comment links; tag each as directory, resource page, editorial, news or community and work from easiest to hardest.
- **Resource pages (Growth).** Search operators such as `[topic] intitle:resources`, `[topic] inurl:links`, `[topic] "useful links"`. Qualify: maintained in the last year, relevant, not a 500-link dump. Pitch one specific page that fills a gap on their list.
- **Expert contributions (Growth).** Write for publications the customers actually read, for those readers, with at most one link in a brand or editor-chosen anchor. Never as a scaled campaign (Google's May 2017 reminder on large-scale article campaigns; spam policies). A placement given in exchange for payment or a swap carries `rel="sponsored"` or `nofollow`. Do not build links to your own guest posts.
- **Data-led PR (Growth and Authority; replaces "skyscraper").** "A longer version of the top article" no longer earns links. Original data does: a local price survey, anonymised aggregate outcomes, a calculator, a yearly report. Then contact the people who cited the outdated source.
- **Partnerships (Authority, or earlier for local).** Suppliers, manufacturers' dealer locators, integration partners, architects and builders whose project pages feature the work, hospitals or universities listing a doctor's affiliation, co-hosted events. Links that come from a real relationship are natural; "link to me and I'll link to you" pages are not.
- **Podcasts, interviews and speaking (Authority, or any time for a strong expert).** Shows and events the audience follows; the show-notes link is a bonus, the reputation and mentions are the point. No booking "tours" to manufacture a burst.

Never: PBNs, link packages, paid links without `rel="sponsored"`, comment or forum-signature links, widget links, reciprocal-link pages, expired-domain redirects, or "build links to the links".

## 12. Conversion and copy lens

A page can rank and still fail the reader. Run this teardown on the homepage, the top service page, pricing/booking and one article, with screenshots at mobile (375 px) and desktop (1366 px). Report it separately from the SEO score; hand detailed redesign work to the web-design and ui-ux skills.

- **LIFT:** value proposition clear in the first screen; relevance to the query that brought the visitor; clarity of copy and layout; anxiety reducers (credentials, reviews, prices, guarantees, privacy); distractions removed (carousels, competing CTAs, popups); urgency only when real.
- **Hick's law:** fewer choices per screen; one primary CTA; secondary CTA visually quieter ("ghost" button).
- **Eye flow:** F-pattern for text-heavy pages, Z-pattern for landing pages; headings scannable; whitespace used to group.
- **PAS hero:** problem the visitor has -> why it matters now -> the specific solution and next step. Rewrite the hero on the spot when it opens with the company name or a slogan.
- **Microcopy:** verbs in buttons ("Book a consultation", not "Submit"), reassurance next to forms, phone and WhatsApp visible on mobile.
- **Fluff test:** strike every sentence that gives no information a competitor could not also claim.
- **Three lateral content ideas:** pieces only this business could publish (its data, its cases, its neighbourhood).
- **Wedge question:** what does this business do that the top three competitors do not, and does the page say it in the first screen?

## 13. Traffic drops and Google updates

Before attributing a change to an algorithm update: list confirmed updates in the window (Search Status Dashboard), the site's own deploys and content changes, tracking changes, and seasonality. A date overlap is a hypothesis, never proof. Note that Search Console reported an impressions/CTR/position logging issue for parts of 2025-2026 (reported by third parties; verify in the data anomalies page) before trusting year-over-year comparisons. Then check: indexing (coverage drops), templates (lost titles, canonicals, schema), speed, lost links, SERP feature changes (AI Overviews on the queries), and competitor moves.

## 14. Page content audit mode

Use this when the owner asks about one page ("why does this page not rank", "audit this service page", "improve this article") rather than the whole site. It is a content audit against the live competition, reported separately from the site health score. Scores are heuristics for consistency between audits, not Google signals.

**Order of work**

1. **Read the page in full** (rendered if it relies on JavaScript). Record title, meta description, H1, H2/H3 outline, word count, author and reviewer, published and updated dates, JSON-LD types, internal and external links, images and whether they are original.
2. **State the primary query** in one sentence with your reasoning (title, H1, opening, and Search Console queries when available). Confirm with the owner if it is ambiguous.
3. **Read the competition before judging.** Search the query in the target locale (for local intent, as a searcher in that city). Note SERP features (AI Overview, featured snippet, People Also Ask, local pack, video). Fetch and read the **top 3 organic results in full**. If one will not fetch, use the next result down and say so. Never infer what an unfetched page covers from its title, snippet or URL; a gap list built on a guessed page is worthless. Per competitor: format, approximate length, angle, subtopics, E-E-A-T evidence, what it does better, where it is weak.
4. **Content identity.** What the page is for (inform, compare, book, buy), the searcher's intent and awareness stage, the SERP's dominant format, and any mismatch between what the page claims and how it is built (a "guide" title on a sales page, a listicle where the SERP wants a calculator).
5. **Score the seven dimensions** below, each 0-10, with the evidence and exact location for every deduction.
6. **Run the semantic gap analysis** (section 15) against the three competitors.
7. **Write the deliverables.**

**Scorecard**

| # | Dimension | What it means | How to score (anchors) |
|---|---|---|---|
| 1 | Information gain | Something the top results do not have: the business's own data, cases, photos, prices, process, a clear position. Google asks whether content provides "substantial value when compared to other pages in search results". | 9-10: two or more substantive things none of the top 3 has. 5-6: one minor addition or a better arrangement of known facts. 0-3: restates what ranks. |
| 2 | Semantic depth | Coverage of the topic's entities, their attributes with specific values, the verbs practitioners use, the follow-up questions a reader has, the subtopics competitors cover. | Quick checks (heuristic caps): fewer than 5 domain-specific verbs, or fewer than 3 specific values (numbers, measurements, named settings, thresholds) in a 500-word stretch, caps the score at 5. Each core gap from section 15 costs 1-2 points. |
| 3 | E-E-A-T | Demonstrated, not declared; use the section 2 weights. | 30-second check: count datable first-hand observations (a number with a date, a named project, an original photo, a mistake and its fix). 3+ means Experience is likely strong; 0-1 means it is absent whatever the bio says. Schema claiming expertise the text never shows is a Trust deduction. |
| 4 | Structure and time-to-value | How fast the reader gets the answer the title promises; whether headings and first sentences alone carry the message; heading hierarchy; readability (section 6); language errors. | Deduct when the first useful answer is below the first screen, headings are vague, or a reader skimming the H2s gets nothing. List every spelling or factual error with its location. |
| 5 | On-page | Title, H1, URL and body first; then H2/H3 and internal anchors; then alt text and emphasis. Schema and the meta description change how the result looks and its click-through rather than its ranking. | Fix in that order (audit convention): one weak title outweighs ten missing alt texts. Titles and descriptions have no character limit (Google's title-link doc); judge accuracy, distinctiveness and the reason to click, and note likely truncation, but do not fail a page on length. Snippet-ready answer blocks where the SERP shows a snippet (`references/ai-search.md` section 13). |
| 6 | Engagement and discoverability | Will the reader stay and continue (answers follow-ups, links the next step), mobile reading, Open Graph and share image, Discover readiness (images at least 1200 px wide with `max-image-preview:large`, per Google's Discover doc). | Score observable things only; dwell time and pogo-sticking are "not measured" without analytics. |
| 7 | Conversion | Only when the page has a business goal: value clear in the first screen, one primary CTA repeated logically, proof next to the CTA, low friction, no fake urgency. Section 12 holds the full lens. | Pages without a conversion goal get "n/a", excluded from the total. |

Total: the sum of scored dimensions over (10 x the number scored), printed as a percentage with the arithmetic. Band it as in section 2 (90+ exceptional down to under 30 very low).

**Deliverables**

```
# Page content audit: <URL>  (<date>, query: "<primary query>", locale)
Content identity: <2-3 sentences: purpose, intent, format match>
Competitive position: <what the top 3 do better (one line) | the biggest gap we can own (one line)>
Competitors read: <URL 1> | <URL 2> | <URL 3>   (not fetched: <URL, reason>)
## Scorecard: 7 rows, score, evidence with location; total and arithmetic
## Semantic gaps (section 15 table)
## Top 5 quick wins: "change X FROM '...' TO '...' because ..."
## Top 5 strategic improvements (more work, biggest advantage)
## Rewritten elements (count characters including spaces; Google may still rewrite them)
Title (NN chars): ...            Alternative title (NN chars): ...
Meta description (NNN chars): ...
H1 (NN chars): ...
Opening paragraph (NN words, NNN chars): ...
Corrections: <each factual error, quoted, with the corrected text and its source>
## Needs owner input: <facts, photos, numbers only the business can supply>
```

Quality gate before sending: the competitors were actually read; at least 3 specific gaps (not "add more depth"); every recommendation is a concrete rewrite or addition; YMYL claims in rewrites are flagged for practitioner review; no invented numbers, reviews or credentials. With Search Console data (impressions, position, CTR) weight the fixes by impact; without it, by the page's prominence (navigation, inbound links) and the severity of the finding.

## 15. Semantic gap analysis

The method behind dimension 2 and the brief for what to add. It compares coverage, not keyword counts. Google publishes no entity checklist, so treat this as a way to find what a reader of the top results would expect and not find here.

1. **Inventory each page** (yours and the top 3 you read): entities (products, materials, conditions, procedures, standards, places, organisations, people), the attributes discussed for each, the specific values given, the practitioner verbs used, the H2/H3 outline, and the depth of each topic (mention / paragraph / full section).
2. **Three columns:** covered by us | covered by competitors, not us | covered only by us (protect this column when adding depth).
3. **Classify every gap:**

| Class | Criteria | Action |
|---|---|---|
| Core | in 3 of 3 competitors, treated as a real section in at least 2, central to the query's intent | must add; nothing else compensates |
| Differentiator | in 1-2 of 3 at paragraph depth or more, and the pages that have it rank above the ones that do not | add if it serves this audience |
| Commodity | mentioned by all, shallowly, with no link to position | one sentence, or skip |
| Opportunity | in 0 of 3, an expert would expect it, and there is demand evidence (People Also Ask, related searches, forum questions, what customers ask the owner) | own it; often the lead section; usually comes from the expert interview (section 17) |

Edge cases: a topic every competitor mentions shallowly, which a reader still cannot act on after reading all three, is an opportunity rather than a commodity. A core topic covered shallowly everywhere gets a paragraph, not a chapter.

4. **Entity-attribute-value (EAV) triples** for core and opportunity gaps: the facts the page should state, written `[entity] [attribute] [value]`. Values come from the owner, a test sheet, a guideline or a cited source, never invented. Granite showroom: `[Absolute Black granite] [finishes stocked] [polished, honed, leathered]`, `[countertop slab] [thicknesses offered] [from the price list]`, `[sealing] [interval for this stone] [from the supplier's data sheet]`. Clinic: `[spirometry] [patient preparation] [the clinic's own instructions]`. Generalists describe qualitatively ("granite is durable"); experts give the value.
5. **Expert verb field.** Practitioners use verbs generalists do not: a stone fabricator calibrates, hones, flames, leathers, book-matches, resins, seals and templates; a pulmonologist auscultates, titrates, steps down therapy, rules out and refers. Build the field from the SERP: verbs in practitioner-written pages that are missing from thin aggregator pages. Use it as a floor for the draft, not a stuffing list.

Output table: `Gap | Class | Add to section | Depth (sentence / paragraph / section) | Source of the facts (owner / document / cited source)`, then the EAV list, the unique angle to keep, and the additions in priority order with a two-line description each.

Ignore keyword density of variants, padding for completeness, and "cover everything Wikipedia covers".

## 16. Keyword deep-dive

Run this before building or rewriting a page for a query. The aim is to **target realistic keywords**: low difficulty for this site, a clear intent the business can satisfy, and real demand.

1. **Read the SERP** for the keyword in the target locale: top 10 skimmed, top 3 read in full (the section 14 rule applies: nothing inferred from unfetched pages). Note the features present: AI Overview (and who it cites), featured snippet (format, holder), People Also Ask, local pack, video, images, shopping, Top Stories, sitelinks.
2. **Intent:** informational / commercial investigation / transactional / navigational / local, plus the dominant format. On a mixed SERP, pick the angle with the most room and say why.
3. **Difficulty from SERP signals.** Tool difficulty scores use different formulas and disagree with each other; read the SERP instead. One point per signal:
   1. Wikipedia, a government or an institutional domain in the top 10.
   2. More than five major brands or national publishers in the top 10.
   3. Every top-5 result is long and well structured.
   4. The featured snippet is held by a top-3 major brand.
   5. An AI Overview is present.
   6. Every top-5 result has a named author with visible credentials.
   7. The top 3 contain original data or research.
   8. The top 10 shows active maintenance (recent update dates on most results).
   9. A dedicated niche specialist holds a top-3 position.
   10. National aggregators or marketplaces fill the top 3 (Justdial, Practo, IndiaMART, Amazon) on a local or product query.

   0-3 Easy (a focused single page can work); 4-6 Moderate (needs a better page than the mid-pack plus a small cluster); 7-10 Hard (cluster, original data and authority). Between bands, pick the harder. **Skip, or pivot to a longer-tail variant,** when Wikipedia holds the top 3 for a general definition; forums or Reddit fill the top 10 (searchers want discussion); official bodies own a regulatory or health-guideline query; it is a news-cycle SERP; product pages own a non-brand query and the business has none; or the query is informational, carries an AI Overview, and there is no realistic way to be cited.
4. **Volatility** (heuristics; no rank tracker needed):
   - Stable: mixed publication years in the top 10, few year tags in titles, no Top Stories, and a Wayback snapshot from 6 months ago shows the same leading URLs. Invest in depth; review yearly.
   - Moderate: freshness tags on 2-3 leaders; the same URL set, but positions 3-10 shuffle. Plan quarterly refreshes.
   - Turbulent: every top-5 result carries a recent update date or year tag, many dated within 90 days. Commit to monthly updates or do not target.
   - Untrackable: Top Stories and news publishers dated within two weeks. Target an evergreen angle instead.
   - For the owner's own ranking page, Search Console position over 4 weeks: about +/-2 is stable, +/-5 or more is turbulent. If you cannot tell, say so and plan as Moderate.
5. **Zero-click impact** (third-party studies, cited by name and date; direction, not constants):
   - SparkToro with Datos clickstream data (2024): 58.5% of US and 59.7% of EU Google searches ended without a click.
   - Ahrefs (Feb 2026; 300,000 keywords, aggregated Search Console desktop data, Dec 2023 vs Dec 2025): an AI Overview correlated with a 58% lower click-through rate for the top-ranking page.
   - Seer Interactive (Nov 2025; 3,119 informational queries across 42 organisations, June 2024 to Sept 2025): organic CTR on queries with an AI Overview fell 61%, queries without one fell 41%, and pages cited in the AI Overview earned about 35% more organic clicks than uncited ones, which Seer says it cannot prove is causal.
   - Local-intent queries split clicks with the map pack, so the GBP listing matters as much as the page.
   - Rate zero-click risk Low / Medium / High. A High-risk informational query can still be worth it for brand exposure, for a cluster that earns citations across the fan-out, or for the transactional tail behind it; otherwise drop it.
   - CTR by position: do not paste an old curve. Use the owner's own Search Console CTR by position for similar queries; failing that, a current third-party curve (for example Advanced Web Ranking's monthly CTR study, built from anonymised Search Console data), labelled third-party with its month.
6. **Demand check:** volume ranges from Keyword Planner, impressions in Search Console, Google Trends seasonality, People Also Ask and autocomplete presence, and the owner's own enquiry log (what callers actually say). A small local volume with booking intent beats a large informational one.
7. **90-day plan** (timelines are heuristics):
   - Days 1-14: fix eligibility (indexing, canonical, intent mismatch); rewrite title and description for the click; add the core gaps; link to the page from 3+ relevant internal pages.
   - Days 15-45: build or rebuild the page with the expert interview (section 17), original photos and data, and snippet-ready blocks where the SERP shows a snippet; publish and inspect the URL in Search Console.
   - Days 46-90: 1-3 supporting pages answering the sub-questions searchers and AI fan-out ask; earn 1-3 relevant links or mentions (section 11); review Search Console weekly and improve queries sitting in positions 5-15; a second iteration around day 60.
   - Expectation by band: Easy, top 10 plausible within 90 days; Moderate, movement into the top 20 and top 5 in 6-12 months; Hard, 12-24 months and an authority plan.

Output: `Keyword | intent | difficulty band (points) | volatility level | SERP features | zero-click risk | verdict (pursue / pivot to <variant> / skip)`, then the top-3 read, the gaps, the 90-day plan, and two title options and one description with character counts.

## 17. Expert interview method

The fastest route to Experience and information gain is the owner's own knowledge: the showroom owner who has seen which stones crack, the doctor who knows what patients misunderstand. Run this before writing a service page, guide or case study, and feed the result into the brief (section 10) and the opportunity gaps (section 15).

**How to run it**

- Ask 2-4 questions, one at a time, and follow up before moving on (broad question, then narrower probes on whatever they said). Three deep answers beat eight shallow ones.
- Pick at least one question that surfaces a non-obvious take, one that forces a specific example, and one about failure or scope.
- Interview in the language the person answers in and keep their words and verbs; translate only for publication.
- Write answers down verbatim and mark what may be quoted.
- Consent and YMYL: patient or client stories only with documented consent and de-identification; no confidential client details; every clinical, legal or financial claim reviewed by the practitioner before publishing (section 3).

**Core questions**

1. "What do most people get wrong about <topic>?"
2. "Give me one specific example: a client, a project, a number."
3. "What surprised you when you actually did this?"
4. "Who should not follow this advice, and why?"

**By page type**

- How-to or process: "What step do people skip?" "What goes wrong first?" "How do you know it was done right?"
- Comparison or selection: "Which would you recommend to a friend, and why?" "What does the brochure leave out?" "When would you recommend neither?"
- Case or project: "Start with the result: what changed, by how much, over what time?" "What did you try first that failed?" "What did the client say when they saw it?"
- Opinion: "What did you believe five years ago that you no longer do?" "What do you tell clients that you would never post online?"

**Vertical banks**

- Stone or tile showroom: "Which stone do customers choose and later regret, and why?" "How do you tell a good slab from a bad one in the yard?" "What do installers most often get wrong: sealing, joints, sub-floor, edge profiles?" "Which finish do you recommend for a kitchen versus outdoors, from your own installs?" "What moves the price per square foot this season?" "Walk me through one recent project: size, stone, problem, result." "What do architects ask that homeowners do not?"
- Doctor or clinic: "What do patients most often misunderstand at the first visit?" "Which piece of online advice causes the most harm you see?" "When should someone come in today rather than wait?" "What happens in a first consultation, step by step, and how long does it take?" "Who is not a candidate for <treatment>?" "What has changed in how you treat this in the last few years?"

**Rescuing a vague answer**

"It depends" -> "In the most recent case, what did it depend on?" | "a few years ago" -> "Which year?" | "a client of ours" -> "What kind of business, how big?" | "a lot" -> "Roughly how many?" | "it worked well" -> "What changed, in numbers?"

**Knowledge document (hand-off to the writer)**

```
# Expert knowledge: <topic>
Interviewee: <name, role, credentials/registration> | Date: <date> | Consent notes: <...>
## Key insight: the non-obvious take, in their words
## Specific examples and data points: number + unit + date + source for each
## Experience: what worked, what failed, what surprised them
## Scope and limits: who this is wrong for; when the advice breaks
## Their vocabulary: verbs and terms they used (feeds section 15, step 5)
## Quotes approved for publication: verbatim, approved yes/no
## To verify before publishing: claims needing a document, test sheet or guideline
```

Test before hand-off: every bullet has a proper noun or a number with a unit; deleting "many", "often" and "usually" still leaves something standing; the scope section says who the advice is wrong for. If stripping the owner's specifics would leave an article that still works, the interview has not done its job; ask one more follow-up.

# Content, E-E-A-T and policy reference

State as of Oct 2026. Primary sources: Google's "Creating helpful, reliable, people-first content", "Using generative AI content" (updated Oct 2026), spam policies (updated Aug 2026), Search Quality Rater Guidelines (latest confirmed edition 11 Sept 2025).

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
11. [Links and authority](#11-links-and-authority)
12. [Conversion and copy lens](#12-conversion-and-copy-lens)
13. [Traffic drops and Google updates](#13-traffic-drops-and-google-updates)

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

Rules: suggest only sections the business can credibly deliver (relevance rule); hub pages must link every real child page (structure rule); information gain is mandatory ("not more detail, something others do not have"); the fluff test on every draft: delete any sentence that could appear on a competitor's page unchanged without loss.

## 11. Links and authority

- Links still matter; local and vertical relevance beats raw volume. Earn 2-4 (local business) to 5-10 (larger sites) quality links a month through directories and associations, partners, local press, community events, data or tools worth citing, expert commentary.
- Never buy link packages, PBNs, comment spam, footer links from unrelated sites, or "guest post" networks; never use expired domains for authority.
- Brand mentions without links correlate with AI visibility at least as strongly as links do (third-party, Ahrefs Dec 2025); earn both through the same activities.
- Backlink audits: report a numeric score only when at least 4 of 7 factors are measured (referring domains, quality distribution, anchor naturalness, toxic share, velocity, follow ratio, geographic relevance); otherwise print "insufficient data". Heuristic flags: exact-match anchors above ~15% of the profile; one domain above 10% of links; 10x new links in a week (negative SEO or a bought burst); 50% lost in a month. Disavow only for manual actions, clear negative SEO or identified PBNs.

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

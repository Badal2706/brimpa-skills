# Local SEO reference

For any business that serves customers in a place: clinics, dentists, salons, restaurants, shops, plumbers, lawyers, coaching centres, agencies with a local client base. The clinic example runs through because health is the strictest case (YMYL); generalise the nouns. State as of Oct 2026.

## Contents

1. [Prerequisites (do these first)](#1-prerequisites-do-these-first)
2. [Google Business Profile: 25-field checklist](#2-google-business-profile-25-field-checklist)
3. [Categories, service areas, attributes](#3-categories-service-areas-attributes)
4. [NAP and citations](#4-nap-and-citations)
5. [Reviews: policy and routine (2026)](#5-reviews-policy-and-routine-2026)
6. [Service and location pages](#6-service-and-location-pages)
7. [The 7-step playbook with done-when gates](#7-the-7-step-playbook-with-done-when-gates)
8. [30-day rollout](#8-30-day-rollout)
9. [Monthly routine](#9-monthly-routine)
10. [Metrics that matter](#10-metrics-that-matter)
11. [Realistic timelines](#11-realistic-timelines)
12. [Eight mistakes that undo everything](#12-eight-mistakes-that-undo-everything)
13. [Local AI search notes](#13-local-ai-search-notes)

---

## 1. Prerequisites (do these first)

Tick all six before any optimisation; it takes an afternoon and saves months.

1. **GBP claimed and verified**, owned by the business (owner account), not by an agency or an ex-employee's Gmail. Video verification is the common path now.
2. **NAP identical everywhere** (character for character): website, JSON-LD, GBP, Apple, Bing, Facebook, every directory. "Shop 4" vs "Shop No. 4", "Rd" vs "Road", a landline on one and a mobile on another all count as mismatches.
3. **The business owns its domain and hosting** and can edit the `<head>`. Recover it from the freelancer today if not.
4. **The site loads fast on a phone on mobile data** (LCP <= 2.5 s target; "under 3 seconds" is the plain-language version). Most "near me" searches are on phones.
5. **A real phone number and a WhatsApp link on every page**, one tap away.
6. **A Google account the business controls** for Search Console, Analytics and GBP.

The single most common mistake: running ads for years while the site has no city name, no service pages and no schema. Ads stop when payment stops; rankings keep delivering. Fix the foundation first.

## 2. Google Business Profile: 25-field checklist

Score each field 2 (optimised), 1 (present), 0 (missing); 50 points normalised to 100. Interpretation (heuristic): 90-100 excellent, 75-89 good, 50-74 needs work, 25-49 poor, below 25 critical. Verified status is not visible through APIs; check it in the dashboard or mark "manual check required".

**Critical (8)**
1. Primary category: the most specific one that is true (`Pulmonologist`, not `Doctor`; `Dental clinic` vs `Dentist` depending on entity).
2. Additional categories: 3-5 that are genuinely offered; no stuffing.
3. Business name: the real-world name only; no city, keywords or taglines (a policy violation and a suspension risk).
4. Address: exact, matches the website; suite/shop numbers consistent. Service-area businesses hide the address and set areas.
5. Phone: a local number (not toll-free only), identical to the site and schema.
6. Website URL: the homepage or the matching location page, with no tracking parameters that break canonicals.
7. Hours: accurate, plus holiday and special hours; "open now" at the time of search matters for the pack.
8. Verified status.

**Important (8)**
9. Description: 250-750 characters, plain language, services + localities, no URLs or promotions.
10. Services: each service added with a description (and price range where appropriate).
11. Products (retail) with prices and photos.
12. Photos: 10+ real photos across exterior, interior, team, work, logo and cover; no stock.
13. Photo recency: something new within the last 30 days.
14. Attributes: accessibility, payments, amenities, identity attributes where true.
15. Service areas (service-area businesses): named cities, localities or postcodes, up to 20; not whole states or countries.
16. Menu / services / booking link as applicable (Reserve with Google is category-gated).

**Supplementary (9)**
17. Posts: at least one per week.
18. A post within the last 7 days.
19. Appointment / booking link.
20. Social profile links.
21. Logo uploaded.
22. Cover photo chosen deliberately.
23. At least one short video.
24. Owner responses to 80%+ of reviews, all recent ones within 48 hours.
25. Contact options: WhatsApp or SMS link where available (native GBP chat ended in July 2024; if both are added, only the text option shows). **Q&A is no longer a field**: public Q&A was removed and replaced by an AI "Ask" answer built from the profile, reviews, photos and website, so answers now come from items 9-13 and from FAQ content on the site.

Vertical weighting (heuristic): restaurants double the menu field; healthcare doubles services and weights hours and attributes 1.5x; home services double service areas; retail doubles products and photos.

Things to flag: duplicate listings at the same address (merge them; a strong negative), a wrong primary category (the strongest negative factor), an agency as the primary owner, a `.business.site` URL still in use, and a profile linked to a different page than the one the schema and footer point to.

## 3. Categories, service areas, attributes

- Find the right primary category by searching the target query in Maps and reading the categories the top three listings use; pick the most specific true one. Change categories only with sign-off; they can trigger re-verification.
- Secondary categories broaden eligibility but dilute nothing; do not add categories for services the business does not offer.
- Service-area businesses (SAB): hide the address if customers are not received there; up to 20 named areas; the website should still show the registered address for trust and schema, or omit `streetAddress` in schema if it is hidden on GBP.
- Attributes: identity attributes have a small targeted effect; general attributes are informational but feed the AI "Ask" answers, so fill them truthfully.

## 4. NAP and citations

**Audit method:** build a matrix with one row per source (website footer, contact page, JSON-LD, GBP, Apple Business Connect, Bing Places, Facebook, Instagram bio, top vertical directories, aggregators) and columns Name / Address / Phone / Website / Hours / Categories. Severity (heuristic): name mismatch Critical, address High, phone Medium, hours Low. Fix the website and GBP first (they are the two Google compares), then everything else.

**Citation tiers**
- Tier 1 (always): Google Business Profile, Apple Business Connect (Siri, Apple Maps), Bing Places (Copilot and part of the ChatGPT stack), Facebook, Yelp where the market uses it.
- Tier 2 (general): BBB (US), Yellow Pages, Foursquare, Nextdoor, local chambers of commerce, trade associations. India: Justdial, Sulekha, IndiaMART (B2B), MapmyIndia/Mappls, Asklaila where still indexed.
- Tier 3 (aggregators that feed others): Data Axle, Foursquare/Factual, Neustar/TransUnion (mainly US/EU); India relies more on the directories directly.
- Vertical directories: healthcare (Practo, Lybrate, Credihealth, Healthgrades/Zocdoc in the US, NPI and state boards in the US, state medical council listings in India); legal (Avvo, Justia, FindLaw, Martindale in the US; bar council listings); home services (Thumbtack, Angi in the US; UrbanCompany listings where applicable); food (Zomato, Swiggy, TripAdvisor, OpenTable); property (99acres, MagicBricks, Housing in India; Zillow, Realtor.com in the US); automotive (Cars.com, CarDekho, CarWale).
- Fastest win: search the target query and claim every free listing on directory pages that already rank on page one. Link each profile to the relevant service page where the directory allows it, not always the homepage.
- Keep a sheet: date, source, profile URL, NAP matched (Y/N), target page, login owner.

**Does GBP need to link to the strongest organic page?** Link it to the page that best represents the location (homepage for one location, the location page for many). A reported pattern (third-party, Sterling Sky) suggests linking the strongest organic page can make it harder to hold both pack and organic positions; it is not Google guidance, so mention it, do not enforce it.

## 5. Reviews: policy and routine (2026)

**Policy (verify wording at `support.google.com/contributionpolicy` before quoting):**
- No review gating (asking only happy customers, or pre-screening with a survey).
- No incentives, discounts or gifts for reviews; no "leave a review for a free check-up".
- No offers (refunds, upgrades) in exchange for editing or removing a negative review (prohibited-content wording updated Feb 2026).
- No staff quotas or contests, no asking customers to name staff, no scripted text, no on-premises review kiosks or standing-over-the-shoulder pressure (clarified Apr 2026, reported second-hand).
- Uniform, neutral asks to every customer are fine. Enforcement in 2026 includes temporarily disabling new reviews on a profile, unpublishing reviews, and a consumer-facing warning on the profile.
- US businesses are also under the FTC Consumer Review Rule (civil penalties per violation); Indian businesses under consumer-protection rules on misleading advertisements. Fake reviews are never worth it.

**Clinics and lawyers:** never confirm or deny that a reviewer was a patient or client, never discuss their case in a reply, even when the review is false. Reply generically ("We take feedback seriously; please contact us at ...") and use the reporting flow. Confidentiality law (HIPAA in the US; professional ethics and DPDP in India) applies to replies.

**Routine**
- Ask every customer the same way at the same moment (after the visit, by WhatsApp or SMS, with the `g.page/r/<id>/review` short link from the GBP dashboard, or a QR code at the desk that opens the same link).
- Aim for steady velocity with no gaps longer than 2-3 weeks (an illustrative case study, not a Google threshold; what Google rewards is recency, quantity, rating and sentiment together).
- Reply to every review within 48 hours; thank, address, invite offline. Replies feed the AI summary of the business.
- Watch for fake-review signals on your own and competitor profiles (clusters on one day, single-review accounts, identical wording, a 5-star spike with no marketing) and report them.
- Consumers mostly weigh reviews from the last three months and increasingly filter at 4+ or 4.5+ stars (BrightLocal consumer review survey, 2026 edition; third-party). Recency matters more than the all-time count.
- Collect on more than one platform (Google first; then Practo/Justdial/Facebook/Zomato as relevant), because AI assistants read those too.

## 6. Service and location pages

"Google ranks pages, not businesses." A single "Services" page listing fourteen treatments ranks for none of them.

**Page structure that works (service or treatment page)**
1. URL: `/asthma-treatment-indirapuram/` or `/services/asthma-treatment/` (city in the slug where it reads naturally; be consistent).
2. H1: the service plus the location, as a human would say it.
3. First 100 words: what the service/condition is, who provides it here, where you are.
4. Body: what it involves, options, what a first visit looks like, duration/recovery, cost transparency where possible, who it is not for.
5. Provider credentials block: qualification, registration number, years, volumes. The E-E-A-T signal; heavily weighted for medical content.
6. Proof: real photos of the premises and team, area-specific testimonials shown on the page (not in schema), case snippets with consent.
7. FAQs: 5-8 real questions the front desk actually gets, answered in 2-4 sentences each, as visible content (no FAQ rich result exists any more).
8. Booking CTA: phone (`tel:`), WhatsApp, form; above the fold and again at the end.
9. Internal links: to related services, the provider's profile, the location page, and back to the hub.
10. Schema: `Service` with `provider` -> the LocalBusiness `@id`; `BreadcrumbList`.

**Done when:** every service the business wants to be found for has its own URL, its own H1, >= 800 words of genuinely useful content and a working booking CTA.

**Priority:** start with the 4-5 most profitable and most searched services; publish them properly; add two per month. Ten excellent pages beat forty thin ones.

**Keyword map (one row per page; a phrase never appears in two rows):**

| Page | Primary (1) | Secondary (2-3) | Supporting (3-4) |
|---|---|---|---|
| Homepage | pulmonologist in <city> | chest specialist <city>, lung doctor <city> | best pulmonologist <city> |
| /asthma-treatment | asthma treatment <city> | asthma specialist <city> | asthma doctor near me |
| /sleep-apnea | sleep apnea treatment <city> | sleep study <city> | snoring treatment doctor |

Primary phrase placements: title (front), H1, first 100 words, URL slug, meta description, one image alt. Then write for the reader; related terms ("breathlessness", "spirometry") do more than repetition.

**Location pages (multi-location or multi-area)**
- Only for places with real presence: an address or a documented service history, staff, local photos, local reviews, area-specific FAQs, directions and landmarks, local partners.
- The swap test: if you can swap the city name and the page still reads fine, it is a doorway page. Google's core updates have removed entire site sections built this way.
- Uniqueness floors (heuristic): primary location 600 words with 60%+ unique content; secondary/service-area pages 500 words with 40%+ unique; service pages 800 words, fully unique.
- Gates: warn at 30+ location pages (enforce 60%+ unique); hard stop at 50+ without evidence of real presence in each.
- Architecture: `/services/<service>/`, `/locations/<city>/`, optional `/locations/<city>/<service>/` only where both are real; `/about/`, `/team/<person>/`, `/reviews/`, `/gallery/`, `/blog/`, `/contact/`.
- Each location page: its own LocalBusiness subtype block with `@id`, `geo`, hours, phone, `hasMap`; a lazy-loaded map embed; the store locator rendered server-side with crawlable links.

## 7. The 7-step playbook with done-when gates

Do them in order. Steps 1-4 are the foundation; 5-7 separate the business from every other one in the pin code. Do not move on until the gate is honestly true.

**Step 1: Connect the Business Profile to the website (1-2 h).**
Find the CID: open Google Maps on desktop, search the exact business name + locality, click the listing, view page source, search `ludocid`; the long number after it is the CID. Confirm `https://www.google.com/maps?cid=<CID>` opens the listing. (Google's Place ID Finder confirms you have the right listing; the dashboard's "Ask for reviews" link is a separate short URL for review requests.) Place the CID URL in the footer address block on every page, on a "Find us on Google" button on the contact page, in `hasMap` and `sameAs` in the schema, and in Instagram/WhatsApp Business profiles and email signatures. Set the GBP website field to the matching page.
*Done when:* the CID URL opens the exact listing in a fresh tab, and the same URL is in the footer and the schema.

**Step 2: One page per service (1-3 weeks).** Structure in section 6.
*Done when:* every target service has its own URL, H1, >= 800 useful words, FAQs and a working CTA.

**Step 3: One intent per page, at most 6-7 phrases (2-4 h).** Build the keyword map; no phrase in two rows; six placements per page.
*Done when:* the sheet exists and every page carries its primary phrase in all six placements.

**Step 4: Search Console set up properly (1 h).** Add a **Domain property** (DNS TXT), not a URL-prefix property, so http/https/www/non-www are covered. Submit the sitemap. Open Indexing > Pages: every service page must be "Indexed"; fix "Not indexed" before anything else. Use URL Inspection and "Request indexing" once per new page. Check Core Web Vitals. Link GA4 so queries can be tied to enquiries.
*Done when:* Domain property verified, sitemap processed without errors, every service page indexed.

**Step 5: LocalBusiness schema (2-3 h).** Most specific subtype (clinics: `MedicalClinic` or `Physician`/`Person` for individual doctors) on the homepage and contact page; `Service` on service pages; `ProfilePage`/`Person` on each provider bio. Every value matches what a human sees and what GBP says. Never put the business's own `aggregateRating` in its schema. Validate with the Rich Results Test. Templates in `references/structured-data.md`.
*Done when:* the Rich Results Test returns the block with no errors, and CID link, address and hours match GBP exactly.

**Step 6: robots.txt (and optional llms.txt) (1-2 h).** robots.txt must allow the site, name the sitemap, and state the AI-crawler policy by purpose (template in `references/ai-search.md`). A single wrong line can remove a site from Google; this happens after rebuilds. `llms.txt` is optional: a plain-text summary of who you are and what you offer that costs an hour; Google does not use it and no major engine confirms using it, so never let it replace steps 1-5.
*Done when:* robots.txt loads, contains no accidental Disallow on important paths, and Search Console's robots.txt report shows no errors.

**Step 7: Local links and citations (ongoing).** Priority order: vertical directories with identical NAP and links to the relevant service page; professional bodies and association listings (IMA chapters, speciality associations, alumni directories, registration councils for clinics; bar councils for lawyers; trade bodies for others); hospitals, partner venues or suppliers that list you; local press, resident-association newsletters, camps and workshops you run, school or corporate sessions; genuine expert commentary for journalists. Avoid paid packages, PBNs, comment spam, anything sold as "500 backlinks". Rhythm: 2-4 quality links a month, consistently; a spike of fifty in a week looks bought. Track date, source, target page, anchor text, NAP matched.
*Done when:* a live link sheet, at least ten completed directory/association profiles with identical NAP, and a monthly outreach routine assigned to a named person.

## 8. 30-day rollout

| Week | What gets done | Owner |
|---|---|---|
| 1 | Prerequisites checklist. Claim/verify GBP; fix ownership. Fix NAP everywhere. Find the CID and place it in the footer. Search Console Domain property + sitemap. | Owner + developer |
| 2 | Keyword map. Pick the top 5 services. Write and publish the first two service pages with FAQs and CTAs. Provider bio page with credentials. | Writer + owner/practitioner |
| 3 | LocalBusiness subtype schema on home and contact; `Service` and `Person` blocks; validate. Publish robots.txt (and llms.txt if wanted). Fill GBP: categories, services, description, 10+ photos, hours, attributes. | Developer |
| 4 | Complete 10 directory/association profiles with identical NAP. Publish two more service pages. Request indexing. Start the review ask routine. Set up the tracking sheet and the baseline snapshot. | Marketing / front desk |

## 9. Monthly routine

- Publish two new service, condition or area pages (real ones).
- Earn 2-4 genuine local links or citations.
- Post weekly on GBP; add new photos monthly; reply to every review within 48 hours.
- Search Console: pages with impressions but no clicks -> rewrite title and description; queries ranking 5-15 -> improve those pages first; new "Not indexed" pages -> fix within weeks.
- Re-check mapped keyword positions from an incognito search in the business's city and log movement; re-run the AI share-of-voice prompts.
- Re-validate schema after any template change; compare against the baseline snapshot.
- Quarterly: NAP matrix re-check, duplicate-listing check, hours/holiday update, prune pages that never got impressions or merge them.

## 10. Metrics that matter

| Metric | Where | Cadence |
|---|---|---|
| Local pack position for the 5 core queries (from the business's area) | incognito search / rank tool | monthly |
| Organic position and impressions for mapped queries | Search Console Performance | monthly |
| Calls, direction requests, website clicks from GBP | GBP Performance tab | monthly |
| Enquiries from organic (forms, calls, WhatsApp) | GA4 events, call tracking, WhatsApp tags | monthly |
| New reviews, average rating, response time | GBP | weekly |

Rankings are a means. A business ranking sixth that converts twelve enquiries a month beats one ranking second that converts three. Track enquiries above everything else.

## 11. Realistic timelines

- Map-pack movement often shows within 4-8 weeks of fixing GBP and NAP.
- Page-one organic positions for competitive service queries typically take 3-6 months of consistent execution; longer in dense metro competition.
- Anyone promising page one in 30 days is buying links or lying.

## 12. Eight mistakes that undo everything

1. Changing the phone number or address without updating every listing.
2. Letting an agency own the GBP; losing the asset when you part ways.
3. Buying reviews; Google removes them and repeat offences suspend the profile.
4. Duplicate GBP listings splitting signals; find and merge.
5. A site rebuild without 301 redirects wiping years of authority overnight.
6. Leaving the staging `Disallow`/`noindex` on after launch; check on launch day.
7. Copying another business's content; ranks for nothing and, in medicine, is a credibility risk.
8. Stopping after two months; the businesses that win are the ones that did not stop.

## 13. Local AI search notes

- Google's AI Overviews and AI Mode draw on the same local data (GBP, reviews, website) as the pack; Google's own guide says an accurate Business Profile helps visibility in AI responses.
- ChatGPT does not read GBP. Its local answers come from its hybrid index (own crawl plus Bing-derived data) and from directories and review sites it cites (Yelp, TripAdvisor, Justdial/Practo in India, Reddit threads). Hence: Bing Places + Bing Webmaster Tools, complete directory profiles, and content on the owner's site that states services, areas and prices plainly.
- Perplexity cites authority sources per answer; Apple Maps/Siri use Apple Business Connect plus Yelp; Alexa uses Bing Places and aggregators.
- Monthly probe: ask each assistant the 10-20 buyer prompts ("best <service> in <locality>", "<service> near <landmark> open on Sunday", "<service> cost in <city>") and log which businesses and domains are cited; fix the gaps you can (missing listings, missing prices, missing service pages).

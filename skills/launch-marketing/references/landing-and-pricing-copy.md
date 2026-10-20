# Landing page, service page and pricing copy

Use when writing or reviewing a homepage, a product landing page, a client's service page, or a pricing page. Works on a live URL, a screenshot, pasted HTML or a wireframe. Zero emojis in the review; read the whole page (header, hero, body, footer, about, pricing, at least one blog post or case study) before judging.

## 1. Two lenses for review

### LIFT (page-level)
- **Clarity:** can a first-time visitor say what this is and who it is for within five seconds of the hero? Cover the logo: could this page belong to a competitor?
- **Relevance:** does the page match the intent that brought them (ad, search query, referral)?
- **Distraction:** competing CTAs, carousels, three equal-weight buttons. Hick's law: more choices, slower decisions. One primary action per screen, one ghost secondary at most.
- **Anxiety:** trust signals next to friction points (pricing, signup, booking form, payment): guarantee, "no card", privacy line, real reviews, credentials.
- Also: whitespace, F-pattern or Z-pattern reading flow, and whether the eye lands on the headline first.

### PAS (copy-level)
- **Problem (headline):** states what it is and who it is for, or names the pain in the reader's phrase. Rewrite generic ones on the spot.
- **Agitation (subhead):** bridges headline to CTA by agitating one specific pain with a consequence ("Stop losing leads to a 6-second load time").
- **Solution (CTA + proof):** high-contrast button with an action verb ("Start building", not "Submit"); secondary lower-friction ghost CTA; proof element adjacent.

Example rewrite for an agency: "Stop losing leads to slow load times. We build sub-second React apps." plus CTA "See three sites we rebuilt".

## 2. Section-by-section copy

Order for a product landing page: hero -> proof strip -> problem -> how it works (3-4 steps, each a concrete action) -> differentiators (2-3 pillars, each with the enabling feature and an outcome) -> case study or testimonial -> pricing -> FAQ -> final CTA. For a local-business page: hero -> services (plain names, what happens in a visit, price range if the client allows) -> who you will see (real names, real credentials, photos) -> reviews (verbatim, sourced) -> location, hours, how to book -> FAQ -> final CTA.

Rules per section:
- **Hero:** see the formula in SKILL.md. H1 under 8 words preferred; no kicker/eyebrow label above it; no full-sentence h1 filling the viewport.
- **Proof strip:** real logos with permission, or a single real quote, or a real number with a label. Empty beats "trusted by thousands".
- **Problem:** 2-3 short paragraphs in the reader's words; no bullets; one consequence they recognise.
- **How it works:** numbered, each step a verb the user performs plus what they see ("Connect your repo. You get a preview URL in 40 seconds.").
- **Differentiators:** write as outcome first, mechanism second ("Deploys you don't think about: every push gets an isolated environment"). Resist the rule of three if you only have two.
- **Case study / testimonial block:** headline leads with the number ("Acme cut reporting time by 80%"); three metrics, each number + short label + one line of context; the hero metric visually dominant; quote under 40 words with name, title, company; confirm approval before publishing.
- **FAQ:** 3-6 questions phrased the way a person would type them into search or ask an assistant ("Do you take insurance?", "Does it work with a monorepo?"); 2-4 sentence factual answers; this doubles as FAQPage schema input and as text an answer engine can quote. Avoid marketing voice here; answer engines strip it and quote plain statements.
- **Final CTA:** repeat the primary CTA with the same words; add the trust line.
- **Meta:** title tag up to 60 characters including the brand; meta description 140-160 characters stating what and who for, ending with the action.

### Fluff test for any paragraph
Delete it if (a) it could run unchanged on a competitor's site, (b) it contains no noun specific to this product, this customer or this place, and (c) removing it loses nothing a reader needs to act.

### Copy tells of AI-generated pages
Buzzword headlines; "X. No Y." or "Not a feature. A platform." cadence repeated three or more times; eight or more em dashes on a page; "theater" framing ("Welcome to the future of..."); numbered section labels (01/02/03) with no real sequence; an eyebrow label over every heading; the hero-metric block (big number, small label, three supporting stats) with illustrative numbers. Remove or replace with real content.

## 3. Writing for answer engines (GEO) without breaking the copy

Marketing fluff is stripped before an LLM quotes a page, so the parts you want cited must be dense and factual: precise definitions, specific statements ("Opens 8 am to 9 pm Monday to Saturday"; "Supports Postgres 13+ and MySQL 8"), a short neutral "what is X" paragraph, and an FAQ whose questions match how users prompt. Keep it in its own sections so the persuasive copy stays persuasive. Technical plumbing (llms.txt, sitemap, JSON-LD for Organization/LocalBusiness, FAQPage, Product/SoftwareApplication, Article, BreadcrumbList) belongs to the seo-geo-audit skill; this skill supplies the text.

## 4. Pricing page: 12 psychology principles

Score each Pass / Needs work / Missing when auditing; apply when writing. Each principle must be used honestly; the ones marked (honesty gate) are only allowed when literally true.

1. **Anchoring.** Show the highest-priced plan first or most prominently so the others feel reasonable.
2. **Decoy effect.** Design the middle tier so the top tier looks like the better deal (or the middle tier, if that is the one you want sold).
3. **Loss-aversion framing.** Pair gain language with what they keep or lose ("Keep your deploy history", "Lose access to analytics after the trial"). No fake loss.
4. **Feature-vs-value naming.** Tier descriptions sell outcomes ("Close more deals") above the feature list ("10 seats").
5. **Social-proof placement.** Logos, quotes or user counts sit beside the tiers, not on another page. Real ones only.
6. **Urgency / scarcity (honesty gate).** Countdown, limited seats, "offer ends" only with a real deadline or real limit.
7. **Plan naming.** Aspirational names that mirror the customer's stage (Starter / Growth / Scale, or Solo / Clinic / Group) over Basic / Pro / Enterprise.
8. **CTA copy per tier.** Action plus outcome ("Start growing, free") not "Sign up"; the same verb across tiers unless the tier genuinely differs ("Talk to us" for enterprise).
9. **Trial vs freemium framing.** State clearly which it is, what the limit is, what happens at the end. Confusion here costs more than any discount.
10. **Price endings.** 9-endings (Rs 499, $49) read as value; round numbers (Rs 5,000, $100) read as premium. Choose on purpose and be consistent.
11. **Visual hierarchy of tiers.** The recommended plan is highlighted (badge, border, size) and labelled why ("Most clinics pick this").
12. **Guarantee and trust signals.** Money-back guarantee, "No credit card required", security or payment badges next to the CTA.

### Audit report format

```
Pricing page audit: <URL>   (date)   Overall: n/12
For each principle: status | What we found (1-2 sentences quoting the page) | Suggestion (specific rewrite)
Top 3 quick wins:
  Current: "<exact copy>"  ->  Rewrite to: "<copy>"  ->  Why: <one-sentence mechanism>
```
Quick wins cite actual page copy; scores reflect only what is literally present. Example quick wins: "Get started" -> "Start shipping faster, free"; add three real customer logos under the tiers; add "30-day money-back guarantee. No questions asked." under each CTA.

## 5. Review report format (full page teardown)

1. **Executive summary:** the plain truth in five lines: what the moat appears to be, what is failing first.
2. **Scorecard (0-100 overall)** with sub-scores: visual hierarchy (LIFT/Hick), copywriting (PAS), content quality (fluff test), technical SEO and schema (from seo-geo-audit if run), answer-engine readability.
3. **Page-by-page teardown:** homepage hero with an exact rewrite; clutter; lower-fold trust; funnel pages (about, pricing, booking) and their friction.
4. **Content analysis:** fluff test results and three hyper-specific content ideas competitors have missed.
5. **Action matrix:** Severity | Category | Problem | Fix | Expected effect. State the effect qualitatively unless you have data from this site; do not invent percentage lifts.
6. Offer next steps: rewrite a secondary page, draft the FAQ, or hand schema and llms.txt to seo-geo-audit.

## 6. Local-business specifics (clinics, salons, tutors, agencies)

- Headline pattern: service + place + the one thing that differentiates ("Dental implants in Satellite, Ahmedabad, by an implantologist with 15 years of cases"). Only claim credentials you have seen.
- The primary CTA is whatever the client actually answers fastest (WhatsApp, phone, booking widget). Say what happens: "We confirm your slot within business hours."
- Prices: if the client will not publish them, publish a range or "from"; "contact for pricing" with nothing else raises anxiety.
- Reviews: copy from the client's real listing with the platform named; link to it. Do not paraphrase into marketing voice.
- Regulated claims (medical outcomes, "guaranteed results", "best doctor in the city") are a legal risk in India and most countries: refuse them and offer process claims instead ("same-day consultation", "treatment plan explained before you pay").
- Consent and privacy text on booking forms: see the dpdp-legal-compliance skill.

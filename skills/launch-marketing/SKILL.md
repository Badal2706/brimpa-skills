---
name: launch-marketing
description: Positioning, messaging and launch copy for products and client websites. Writes and reviews landing-page and hero copy, taglines, value propositions, pricing pages, Product Hunt, Show HN, Reddit, LinkedIn and X launch posts, newsletters, onboarding and outreach emails, changelogs, app-store listings and product names, and strips AI-sounding "slop" from existing copy. Use whenever the user asks to write, rewrite, shorten, punch up or review any marketing or website text (headline, hero, about page, service page for a clinic or small business, product description, announcement, cold email, email sequence, release notes), asks "does this sound like AI?" or "make this sound human", wants to launch, announce or ship something publicly, needs a name or tagline, or is building a site for a client and needs the words, even if they never say "marketing" or "copy". Pure guidance; no external APIs needed.
license: MIT
metadata:
  author: Badal Patel
  version: "1.0"
  updated: "2026-10-20"
---

# Launch marketing: positioning, messaging and launch copy

Copy that works is specific, written to one person, and traceable to something true. Most marketing copy fails before the first word because nobody decided who it is for and what the alternative is. So this skill runs positioning first and only then writes words. It serves two jobs: a solo developer or small team launching a product, and a developer writing the words for a client's website (clinic, salon, agency, local shop). The same rules apply; the channels differ.

Reference files (open only the one you need):
- `references/human-tone.md`: read when rewriting or auditing copy that sounds generic or AI-written; holds all 18 slop patterns with before/after, the full banned-word list and the audit process.
- `references/positioning-and-naming.md`: read when the user has no positioning yet, says "people don't get what we do", or needs a product/brand name.
- `references/landing-and-pricing-copy.md`: read when writing or reviewing a homepage, landing page, service page or pricing page; PAS, LIFT, section-by-section copy, the 12 pricing-psychology principles.
- `references/launch-channels.md`: read when preparing Product Hunt, Show HN, Reddit, LinkedIn, X, a carousel, a changelog or an app-store listing; limits, timelines and benchmarks per channel.
- `references/email-and-outreach.md`: read when writing a newsletter, launch email, onboarding sequence or cold outreach; subject-line formulas, HTML email rendering rules, the 7 outreach signals, cadence and breakup.
- `references/sources.md`: attribution for everything above.

## How to run this

1. **Intake in one message.** Ask for everything missing at once, then proceed with what you get. Minimum: (a) what it is and how it works, in plain nouns; (b) who feels the pain most; (c) what they use today instead (competitor, spreadsheet, a cousin who "does websites", nothing); (d) the brand vibe as 3-4 voice attributes; (e) proof that actually exists: numbers, named customers, quotes with permission, credentials; (f) price and what is free; (g) which assets are needed and the launch date. If `docs/icp.md` or a positioning doc exists in the project, load it and skip the questions it already answers.
2. **Positioning before words.** Work Dunford's five components in order: competitive alternatives, unique provable attributes, value (feature to benefit to value), target customer triggers, market category. Output the positioning doc (template below). For a local-business client this takes ten minutes and still matters: the alternative is usually "the clinic down the road" or "putting it off".
3. **Messaging hierarchy.** Write the four levels: one-liner (7-12 words, names the outcome), elevator pitch (3-4 sentences; this becomes the homepage headline and subhead), proof narrative, deep dive. Define voice as IS / IS NOT pairs.
4. **Page copy.** Hero by PAS (headline says what it is and who it is for; subhead agitates one specific pain; CTA says what happens next). Then sections, proof, pricing, FAQ. Use `references/landing-and-pricing-copy.md`.
5. **De-slop pass.** Run every asset through the 18 patterns and the banned-word list in `references/human-tone.md`. Replace every vague claim with a specific or a `[fill in: ...]` placeholder. Count characters and words where a channel has limits.
6. **Channel assets.** One asset per channel, each native to that channel's norms (a Show HN body is not a LinkedIn post). Use `references/launch-channels.md` and `references/email-and-outreach.md`.
7. **Launch calendar.** Lay the assets on a 30-day plan (teaser, assets, final prep, launch day, day 2). Stagger channels; Hacker News and Reddit penalise vote rings and same-day cross-posting.
8. **Post-launch loop.** Changelog entry and "what shipped" pack after each release; results post on day 2; outreach triggered by real buying signals; revise the hero after reading what real users said in comments and support tickets.

Present each deliverable with a short self-QA block (limits met, banned words zero, placeholders listed). Do not present drafts that fail their own checklist.

## Universal copy rules

- **Never invent specifics.** Every number, customer name, quote, award, review count and credential must come from the user or from material they supplied. Where proof is missing, write `[fill in: real customer name]` and say so. Fabricated testimonials and invented statistics are the one hard line in this skill; they are also, for Indian clients, a consumer-protection problem (misleading advertising), not just a taste problem.
- **One reader.** Write to a specific person in a specific situation ("a dentist who gets 40 WhatsApp enquiries a day and loses half of them"). Delete "whether you're a solo dev or an enterprise team".
- **Specific beats vivid.** "Cut deploy time from 40 min to 8" beats "ship faster". "Open till 9 pm on weekdays" beats "convenient hours". If a sentence could sit on any competitor's site, cut or sharpen it.
- **Say what it is.** Use plain nouns: "a reverse proxy that swaps AI providers without code changes", "a physiotherapy clinic in Vastrapur". Avoid "serves as", "represents", "a comprehensive solution for".
- **Active voice, short sentences, one purpose per sentence.** "It catches errors before production" not "Errors are caught before they reach production."
- **No em dashes, no semicolons in social copy, no hashtags** on Product Hunt, X, LinkedIn or HN (the carousel caption is no exception). No markdown on LinkedIn: it renders literally.
- **Hooks and headlines never start with "I", "We" or "Our"** and must work standalone before any "see more" cut.
- **Openers to delete on sight:** "I hope this finds you well", "I came across your profile", "Excited/thrilled to announce", "After months of hard work", "A thread on", "In this post I will".
- **Closers:** end on something real (what happens next, a question, a pointer). Never "the future is bright", "in conclusion", "thanks for reading". One closer type per asset: a question or a CTA, not both.
- **Honest caveat where trust matters.** Maker comments, HN bodies, Reddit posts and case studies each name one thing the product does not do. It reads as competence; commenters will find it anyway.
- **Hedging:** state what you know ("customers typically cut costs 30-40%; it depends on how over-provisioned you are"), not stacked qualifiers ("could potentially help reduce by up to possibly 40%").

### Banned-word summary

Cut these on sight; the full list and the reasoning per word live in `references/human-tone.md`:
streamline, empower, transform, revolutionize, reimagine, unlock, elevate, supercharge, next-generation, next-level, cutting-edge, state-of-the-art, world-class, best-in-class, industry-leading, enterprise-grade, seamless, robust, powerful, innovative, game-changing, groundbreaking, transformative, disruptive, leverage, utilize, harness, synergy, delve, deep dive, holistic, comprehensive, actionable, crucial, pivotal, paradigm, journey, landscape, testament, tapestry, delightful, solution (as a noun for the product), thrilled / excited / pleased to announce, touch base, circle back, move the needle, low-hanging fruit, bandwidth, end-to-end, best-of-breed. Rule of thumb: if it appears on every SaaS homepage, it carries no information.

## Hero formula

Headline + subhead + primary CTA + secondary CTA + one proof element. Keep the three of them answering, in order: what is this, who is it for, why should I believe you.

- **Headline (under 8 words preferred, 12 max):** what it is and who it is for, or the outcome in the audience's own phrase. Pull phrases from real reviews, Reddit threads and support tickets rather than inventing them. "Export without crashing" beats "For users who need reliable exports".
- **Subhead (1-2 sentences):** agitate one specific pain and bridge to the CTA. Not a second headline, not a feature list.
- **Primary CTA:** see CTA rules below.
- **Secondary CTA (ghost style):** lower friction than the primary ("See a 2-minute demo", "Read the docs"). Only one secondary; more choices lower click-through (Hick's law).
- **Proof element:** a named customer, a real number, a real quote under 40 words with name and title, or a credential. If none exists yet, leave the slot empty rather than "trusted by thousands".

Before/after: "Our platform serves as a comprehensive solution that empowers development teams to streamline their workflows" becomes "It replaces your deploy scripts with a single CLI command. Most teams get it running in an afternoon."

## CTA rules

- One primary CTA per asset. Action verb plus benefit, 3-5 words: "Save my seat", "Get the guide", "Start shipping faster, free", "Book a Tuesday slot".
- The label says what happens next, not the gesture: "Book a demo" becomes "See it on your repo in 20 min"; "Try it free" says how long, what is included, whether a card is needed ("14 days, all features, no card").
- Never "Learn more", "Get started", "Submit", "Click here", "Reach out".
- Same action, same words everywhere: if the button says "Book appointment" in the hero, it does not say "Schedule a visit" in the footer.
- Put a trust line next to high-anxiety CTAs (pricing, signup, booking): "No credit card", "Cancel any time", "30-day money-back guarantee", "Your number is only used to confirm the booking".

## Social proof rules

- Name customers only with permission; otherwise describe the customer type precisely ("backend teams at three Series A fintechs").
- Quotes: exact words, under 40 words, with name, title and company (or first name and city for consumers). Confirm the customer approved the quote before it ships.
- Numbers: lead with them in case-study headlines ("Acme cut reporting time by 80%"); each number carries a label and one line of context.
- Reviews on a client site come from the client's real Google/Practo/JustDial listing, copied verbatim, with the source stated. Never write "sample" reviews that look real, even as placeholders; use obvious `[fill in: review]` markers instead.
- Vague proof ("trusted by thousands", "industry leaders") is worse than no proof. Remove it.

## UX copy (where it overlaps with marketing)

Controls and messages on the site or in the product follow the same discipline:
- Buttons and links name a specific verb plus object and describe what will happen ("Save changes", "Download invoice PDF"), not the gesture ("Click here").
- Same noun and verb for the same concept everywhere; keep a small terminology glossary for the project.
- Errors answer three questions: what failed, why (when known), how to recover. No internal codes as the primary message; never promise a cause the system cannot know. Keep the user's input.
- Placeholders are examples, not labels; labels stay visible.
- Confirmation buttons name the action ("Delete 3 invoices"), never Yes/No/OK.
- Copy uses the product's own language; generic whimsy ("Oopsie!") is worse than neutral clarity, especially around payment, privacy, deletion and blocked work.
- AI-written copy tells on a page: buzzword headlines, aphoristic cadence ("X. No Y." / "Not a feature. A platform.") repeated three or more times, em-dash saturation, "theater" framing, an oversized full-sentence h1 filling the viewport, a kicker/eyebrow label above every heading. Remove them.

## Per-channel rules (one paragraph each; details in the references)

- **Product Hunt:** 5 tagline options under 60 characters (verb + what it does + differentiator; no product-name start, no superlatives, no period, no question). Description 280-500 characters, third person, present tense, no links, no competitor names, "free" only if permanently free. Maker comment 300-400 words posted within 60 seconds of going live: origin story, what it does with one technical detail, specific persona, one honest caveat, one specific question. Launch 12:01 AM Pacific, Tuesday to Thursday, clicked manually; reply to every comment within 2 hours; ask people to try it and give feedback, never to upvote; vote rings get listings buried.
- **Show HN / HN:** title is the whole game: target under 40 characters, ceiling 60; a story (actor, action, stakes) over a topic; first person where honest; no marketing adjectives; en dash between name and what it does. Use the "Show HN:" prefix only when there is a working demo and the implementation is the interesting part, and always draft a plain-title alternative. Body only when engineers will ask how it works: 150-300 words, "I built X because Y", one real engineering decision, current state, invitation for questions, no links or bullets. Post Tuesday to Thursday 8-10 AM US Eastern, answer every comment for the first 2 hours, do not share the HN link elsewhere for 24 hours.
- **Reddit:** read the subreddit rules and this week's top posts before drafting. 90/10: ninety percent of the account's history is genuine participation, and the post adds value with the product removed. First person ("I built..."), 150-400 words, link only in a first comment under 100 words if rules allow. Scrub filler intensifiers, hedges and "Try X today" sentences; run the three-persona review (sceptical practitioner, moderator, target reader). Stagger cross-posts across days.
- **LinkedIn:** hook under the ~210-character "see more" cut, never opening with "I" or "excited". 900-1,300 characters, paragraphs of 1-3 lines, no markdown, no hashtags, 0-3 emojis as separators at most, links in the first comment ("link in the first comment"), end with a question or a CTA, not both. Product-launch arc: outcome hook, specific problem, what it does plus differentiator in one line, proof point if real, one CTA.
- **X thread:** 7-10 numbered tweets, one idea each, under 280 characters including the "3/8" prefix, hook is the most surprising specific, URL only in the final CTA tweet, one CTA type, contractions, no hashtags. Draft one alternative hook in a different format.
- **Carousel (LinkedIn/Instagram):** thesis first, then 5-9 slides with roles (Cover, Problem, Reframe, Insight, Framework, Example, Proof, Takeaway, CTA), one idea per slide, visual direction per slide, a caption that adds context rather than summarising, no hashtags.
- **Newsletter / launch email:** one topic, one audience, one CTA. Hero headline under 8 words that never starts with I/We/Our, body 250-400 words in 1-3 line paragraphs, CTA button 3-5 words. Three subject lines of 40-60 characters from the formulas plus a preheader that resolves just enough. Table-based inline-styled HTML, 600px wide, one unmissable element; send a test to yourself.
- **Outreach:** every message opens about them and names the specific signal (fundraise, hiring, public frustration, launch, job change, event, content engagement). Email under 100 words with two subject variants under 8 words and no question marks; 4-6 touches over 10-14 days alternating channels; each follow-up adds something new; breakup in 3-4 sentences with no guilt.
- **Changelog:** newest first; one of New / Improved / Fixed / Under the hood per item; past tense; user-facing benefit plus where to find it; never invented metrics. Content pack: one-liner under 20 words, 3-5 tweet thread, LinkedIn "We shipped N things" post closing on an observation, email "What shipped this week: X + Y" of 50-100 words.
- **App stores (as of Oct 2026):** iOS title 30, subtitle 30, promotional text 170, description 4,000, keywords 100 characters comma-separated without spaces; Google Play name 30, short description 80, full 4,000. No competitor trademarks in title, subtitle or keywords; no "Free" in titles; first three bullets answer the three biggest complaints about the alternative; only claim features that ship.

## Output formats

### Positioning doc (save as `docs/positioning.md`; also seed `docs/icp.md`)

```
# Positioning: <product or business>   (date)
Competitive alternatives: <what they do today if we did not exist, incl. "nothing">
Unique attributes: <provable things the alternatives cannot match>
Value: <feature -> benefit -> value, 2-4 rows>
Target customer + triggers: <who loves it, pays full price, refers; the situation that makes them look>
Market category: <frame of reference; what it sets price expectations against>
One-liner (L1, 7-12 words): ...
Elevator pitch (L2, 3-4 sentences): ...
Proof narrative (L3): <a customer like you, the struggle, what we did, the result; or "none yet">
Voice: <attr> IS <...> / IS NOT <...>  (3-4 rows)
Evidence log: <where each claim came from: interview, review, analytics, "founder assertion, unverified">
Open items: <[fill in: ...] placeholders still outstanding>
```

### Landing copy doc (save as `docs/copy/<page>-<date>.md`)

```
# <Page> copy   (date)
## Hero
H1 (n words): ...
Subhead: ...
Primary CTA: ...   Trust line: ...
Secondary CTA: ...
Proof element: ... (source)
## Sections (in order)
### <Section name>: purpose in one line
H2: ...   Body: ...   (visual direction if any)
## Pricing (if any): tiers, names, anchor, recommended plan, CTA per tier, guarantee line
## FAQ (3-6; phrased the way a person would ask, factual 2-4 sentence answers)
## Meta: <title tag <=60 chars> / <meta description 140-160 chars>
## Self-QA: banned words 0 | em dashes 0 | CTAs consistent | placeholders: [...]
```

### Launch kit checklist (save as `docs/launch/kit-<date>.md`)

```
Positioning doc approved        [ ]   Hero + page copy live            [ ]
Readiness: README/quickstart, pricing page, support address, analytics  [ ]
Assets: gallery images (5), demo video 60-90s, OG image                 [ ]
PH: 5 taglines, description (chars: __), maker comment (words: __), promo comment, 4 emails [ ]
HN: title (chars: __) + plain alt, body or "title sufficient"            [ ]
Reddit: subreddit list, rules read, post + first comment per sub        [ ]
LinkedIn post + 3 first-comment options | X thread + alt hook           [ ]
Newsletter: subject A/B/C + preheader, HTML tested in Gmail/Outlook/Apple Mail [ ]
Calendar: D-30 teaser, D-20..D-8 assets, E1 (D-7), E2 (D-1), launch day (12:01 AM PT), E3, day-2 results + E4 (+48h) [ ]
Post-launch: changelog pack, outreach angle blocks for 2-3 signals      [ ]
```

## Worked examples

1. **"Make our homepage sound less like AI."** Read the whole page, identify the reader (say, ops leads at 20-200-person logistics firms), scan for the 18 patterns, rewrite with specifics the user supplied (or placeholders), deliver: rewrite, audit notes (what changed and why, pattern by pattern), fill-ins list. If the page has no positioning underneath ("empowers teams everywhere"), say so and offer step 2 before polishing further.
2. **Clinic website for a client.** Intake: services, location, hours, doctors and their real credentials, what patients ask on the phone, real reviews with source. Positioning: alternative is the nearby clinic or delaying care; unique attributes are provable (same-day slots, a named specialist, 20 years in the area). Hero: "Physiotherapy in Vastrapur, same-week appointments" / subhead about the specific pain (knee, back, post-surgery) / CTA "Book a slot on WhatsApp" with trust line "We reply within business hours". FAQ in patients' own phrasing. Hand design to web-design and schema/NAP/Google Business Profile to seo-geo-audit.
3. **"We launch on Product Hunt next Tuesday."** Confirm positioning exists; build the kit in order: 5 taglines with char counts, description with count, maker comment with word count and one caveat, promo comment, 5-7 launch tweets, LinkedIn post, 4 emails, hour-by-hour day plan in PT, and the HN plain title held for a different day.
4. **"Write a cold email to agencies who might resell this."** Ask which signal exists (none is a weak start: suggest finding hiring posts or public complaints first). Write the angle block (signal, insight, bridge, opener, ask under 10 words), then a 6-touch sequence with word counts and two subjects per email; only `{{first_name}}` stays as a variable.

## Anti-patterns / refuse

- Refuse to write fake reviews, fake testimonials, invented user counts, fake "as seen in" logos, countdown timers that reset, or "only 3 spots left" when it is not true. Offer the honest version: real early-user quotes, "launched in October 2026", a real deadline.
- Refuse to name competitors negatively in Product Hunt listings or app-store metadata, or to claim a competitor's flaw as your strength without a shipped feature behind it. Contrast the experience, not the brand ("all-inclusive, no hidden fees").
- Refuse vote rings and upvote asks on HN and PH; they get listings buried and accounts flagged.
- Do not pad to a word count. A 9-word hero and a 60-word HN body that say something beat long drafts that say nothing.
- Do not promise "SEO" from copy alone; hand measurable search work to seo-geo-audit.
- Do not emit HTML emails into chat; save to a file and summarise.

## When the user pushes back

- "Just make it sound exciting." Exciting to the reader means specific to the reader; offer a version with one concrete outcome in the headline and let them compare.
- "Everyone says 'seamless'." That is the reason to cut it: the word identifies nobody. Replace with the thing that is actually seamless ("no SDK, one DNS change").
- "We don't have numbers yet." Fine: say what it does and who it is for, leave proof slots empty, and set a reminder to collect two numbers in the first month. Empty beats fabricated.
- "Add hashtags, our last post had them." Explain the reach trade-off briefly, then do what they ask if they still want them; it is their account. Never fabricate claims under pressure, though; that line holds.

## Hand-offs

- Page layout, type, colour and responsive design of the pages this copy goes into: see the web-design skill. Usability of app screens, dashboards and forms: ui-ux.
- Technical SEO, schema (LocalBusiness, FAQPage, Product), llms.txt, Google Business Profile and NAP consistency: seo-geo-audit.
- Logo, wordmark, palette and visual identity once a name is chosen: brand-identity. Launch video and demo clips: launch-video.
- Consent, privacy notices and DPDP wording on signup and booking forms: dpdp-legal-compliance.

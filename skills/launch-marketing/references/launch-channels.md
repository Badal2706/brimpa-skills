# Launch channels: rules, limits, timelines, benchmarks

Contents
1. Readiness and channel choice
2. Product Hunt
3. Hacker News (Show HN and plain titles)
4. Reddit
5. LinkedIn
6. X threads
7. Carousels
8. Changelog and "what shipped" packs
9. App-store listings (ASO)
10. 30-day launch calendar
11. Post-launch loop

Platform limits and benchmarks are stated as of Oct 2026; re-check a platform's own docs before a launch.

## 1. Readiness and channel choice

Before any channel: README or quickstart that works on a fresh machine; install and examples; license; pricing page or a clear "free while in beta"; a support address; analytics on the landing page; an OG image; 5 gallery images; a 60-90 second demo video (captions, no voiceover needed). Build a supporter list of people who will genuinely try it (the source kits aim for 200+); a "notify me" page helps.

Channel fit: Product Hunt rewards polish and an existing audience; HN rewards technical substance and punishes marketing; Reddit rewards community history; LinkedIn rewards operator stories; X rewards specific hooks and threads. Local-business clients mostly skip all of these: their launch is Google Business Profile, WhatsApp broadcast to existing patients, a neighbourhood post, and the email/SMS list (see seo-geo-audit for the profile work).

## 2. Product Hunt

Critical rules: taglines under 60 characters; description under 500 characters; no unverifiable factual claims; never name competitors; say "free" only if permanently free (otherwise "Free to start" / "Free tier available").

**Inputs to collect:** product name; one-sentence technical description; primary use case and target user; key differentiator; pricing; open source or not; launch date; promo code; 2-3 honest reasons it is worth trying. Read the first 80 lines of the README if there is one.

**Gallery (1270x760 px PNG/JPG, max 8):** 1 hero (product in use, no text overlay); 2 feature demo (the "aha" action); 3 before/after split; 4 social proof (a real quote or stat); 5 technical differentiator (diagram or benchmark). CLI tools use annotated terminal screenshots.

**Taglines:** formula `[action verb] + [what it does] + [differentiator]`, under 60 characters including spaces, no trailing period, no hashtags, do not start with the product name, no superlatives (best, fastest, easiest, most powerful), no questions. Produce five with character counts: outcome-first ("Ship docs without leaving your codebase"), problem-first ("No more copy-pasting between Figma and code"), technical ("SQLite to shareable web app in one command"), comparison-free alternative ("Git-native code review that works inside VS Code"), plain English ("Turns any RSS feed into a daily email digest").

**Description (280-500 characters):** sentence 1 what it does and who for; sentence 2 key feature or technical approach; sentence 3 optional pricing/availability. Present tense, third person or imperative (no "I"/"we"), no hype adjectives, no links, no list formatting; "Open source and self-hostable" if true.

**Maker comment (300-400 words, first person, posted within 60 seconds of going live):** opening 2-3 sentences of real origin story; what it does in 3-5 sentences with one specific technical detail; who it is for in 2-3 sentences with a specific persona ("if you're a solo dev who deploys on Friday afternoons and dreads..."); an honest caveat (what it does not do); a specific question inviting feedback. Tone: a thoughtful HN comment, practitioner to peers. Killers: "Hi PH! Thrilled to share...", "best solution for...", not replying for two hours, asking for upvotes. Promo codes go in a separate comment within 5 minutes, with an expiry; lifetime deals perform well.

**Kit order:** taglines + recommendation; description + count; maker comment; 5-7 launch-day tweets (under 280 each, no hashtags, first tweet is the hook); LinkedIn post 150-300 words; four emails under 150 words each with subjects under 50 characters: E1 existing users (one week before), E2 newsletter (day before), E3 day-of (12:01 AM PT), E4 follow-up (48 hours after, results and thanks).

**Hunter or self-hunt:** if three or more of these are true, approach a hunter at least two weeks ahead, framed as sharing something they would want to know rather than a favour: under 500 followers in the target audience; no existing user base; first launch with no audience; a top hunter already uses the product. Technical product plus a personal dev brand points to self-hunting.

**Timing and benchmarks (source data, Oct 2026):** launch 12:01 AM Pacific, clicked manually (not scheduled); the first four hours decide the front page; Tuesday to Thursday carry the most traffic; avoid holiday weeks and major conference days. Upvote ladder quoted by the source kit: 50-100 listed; 200-400 front page; 500-800 top five; 800+ Product of the Day; 1,500+ Product of the Week contender. First-hour velocity beats totals (100 in hour one outperforms 400 over 24 hours). Vote rings (asking friends, Discord or Slack groups to upvote) get listings buried.

**Hour by hour (PT):** 12:01 go live; 12:02 maker comment; 12:05 promo/context comment; 12:15 X thread; 12:30 LinkedIn post and personal DMs to the ten most engaged supporters; 1:00 reply to first comments; 7:00 morning peak, check ranking; 9:00 send E3 if held; 12:00 midday replies and a "midday update" tweet if trending; 17:00 evening peak, final push; 23:59 screenshot placement. Reply to every comment within two hours all day. Day 2: E4, results post, reply to overnight comments.

## 3. Hacker News

**What the data says (sample of 250 top posts, April 2026, per the source skill):** title length is the strongest predictor (under 40 characters averaged 248 points; 40-59: 192; 60-79: 150; 80+: 131), so target under 40 and treat 60 as the ceiling. Body text did not change scores (90% had none), so write one only for genuinely interesting technical detail. The "Show HN:" prefix correlated with lower scores (average 94 vs 186+), so use it only when it is honest and useful, and always draft a plain-title alternative. First-person titles outperformed; question titles drove comments rather than upvotes; the highest titles were stories, not topics (actor + action + stakes: "Someone bought 30 WordPress plugins and planted a backdoor in all of them").

**Workflow:**
1. Ask two things: optimising for score or for comments? One-sentence technical description with no adjectives.
2. Post type: plain title (default); Show HN (working demo, builder present, implementation is the interesting part); Ask HN (discussion); Tell HN (verifiable disclosure).
3. Three title variants with character counts: shortest (under 35), story angle, technical angle. Flag anything over 60. No marketing adjectives (fast, simple, powerful, lightweight unless a literal spec); specific over general ("30 WordPress plugins" over "popular CMS plugins"); year in brackets for old material; en dash for "Name – what it does". Strip: tool/app/platform/solution/service, "for developers", "open source" (say it in the body).
4. Body only if engineers will ask "how does this work?".
5. Body structure (150-300 words, under 200 is better): line 1 "I built X because Y" (never "Introducing X"); the real honest reason ("I was annoyed that..." beats "Developers often struggle with..."); how it works with specific tech choices, trade-offs and one interesting engineering decision; current state (open source? free? alpha? solo? how long?); an invitation ("Happy to answer questions about the implementation"). First person, no bullets, headers, bold or links, no marketing words, never ask for upvotes or signups.
6. Self-check: title under 60, no adjectives, story not topic, no exclamation marks; body opens "I built..." or "For the past N months...", names one architecture decision, under 300 words, closes with a feedback invite; Show HN has a plain alt; comments goal uses a question or divisive framing, score goal uses a statement.
7. Output: recommended title + two alternates; body or "Not recommended, title is sufficient"; posting notes.

**Posting notes:** best window Tuesday to Thursday, 8-10 AM US Eastern; respond to every comment in the first two hours; do not share the HN link anywhere else for 24 hours (HN penalises vote rings); resubmit only after 3-6 months with significant changes and acknowledge the original. HN's own rules: exact "Show HN:" prefix; must be something you made; works-in-progress and betas are fine; not more than once every few months; no upvote requests.

Strong signals in the thread: a specific technical explanation in the first comment; the builder answering quickly and in depth; an unusual technical decision; honest limitations; a clear target user; open source, or a reason it is not. Weak: "built in a weekend", vague category ("productivity tool"), screenshots without explanation, press-release prose.

Title patterns that still work when kept short: capability ("Datasette – Instantly publish SQLite databases to the web"), problem minus the annoying part ("Coolify – Self-hosted Heroku alternative with no vendor lock-in"), built-with ("Bun – a fast all-in-one JavaScript runtime built in Zig"), outcome for a user ("Fly.io – Deploy app servers close to your users"), experiment frame ("Tauri – Electron alternative using system webview").

## 4. Reddit

Critical: never post without reading the subreddit's rules; no product links in the body (first comment only, if allowed); the **90/10 rule**: 90% of the account's history is genuine contribution, and the post adds value even if the product is removed.

**Prep:** read the rules, this week's top posts and the sidebar. Note whether top titles are questions or statements, tech-led or outcome-led, personal or impersonal. Match the subreddit type: technical practitioner (specifics, "I did X and learned Y"), startup/builder (story, metrics, lessons), general tech (news angle, contrarian), career (question format), niche tool (deep technical, benchmarks).

**Draft:** first person for project posts ("I built...", "I made..." perform best); title under 300 characters; body 150-400 words; no marketing language, no em dashes. First comment under 100 words: "Link for those who want to check it out: [URL]. Happy to answer questions about [technical thing]."

**Scrub:** filler intensifiers, hedges, throat-clearing, connector words, "This ensures that", and the instant-delete sentences listed in `human-tone.md`.

**Three-persona review before posting** (each quotes the exact triggering text or says "clean"): the sceptical practitioner (which line feels promotional, which claim causes an eye-roll); the moderator (which rule is at risk); the target reader (would they upvote without using the product? where do they stop reading?).

**Subreddit notes (general; re-read each sub's rules):** r/SideProject: build story, honest numbers, link in comment. r/startups: lesson not product, 200-400 words, traction numbers. r/devops: technical depth, benchmarks, zero patience for marketing. r/programming: link post with an interesting angle. r/ExperiencedDevs: acknowledge weaknesses before commenters do. r/indiehackers: revenue transparency, "month N" updates. r/webdev: friendly, "I built X, here's how".

Anti-patterns: identical cross-posts on the same day; friends upvoting; sockpuppet replies; product URL as the post URL; "I need feedback" when you want users; missing flair. Post weekday mornings US; reply to every comment in the first hour.

## 5. LinkedIn

**Style:** active voice; short sentences, one idea each; no em dashes; no semicolons; no hashtags; no markdown (it renders literally); address the reader as "you"; no setup or wrap-up language; data and examples over vagueness. The forbidden words from `human-tone.md` apply with extra weight here (delve, embark, game-changer, unlock, skyrocket, tapestry, "remains to be seen", "ever-evolving", "in conclusion").

**Draft and paste only.** Write the post; the founder pastes and publishes it by hand. Never connect scrapers, browser-automation agents or unofficial posting or messaging tools to a LinkedIn account: the User Agreement (s.8.2, effective 3 Nov 2025, checked Oct 2026) bars software that scrapes the Services and "bots or other unauthorized automated methods" to message, post, comment, like or share, and the account is what gets restricted. LinkedIn's own scheduler is fine.

**Story bank first.** Before drafting founder posts, collect a short bank of real specifics from the founder: numbers with dates (clients, hours saved, prices, before/after figures), named moments (the first client, a mistake and its fix), and what they will not share. Use only those specifics in posts; where the bank has nothing for a claim, cut the claim or ask, never fill it with a plausible number. Em dashes stay at zero here, as everywhere in social copy, even where a LinkedIn-specific skill allows about one per 100 words: this collection's rule wins.

**Workflow:** state the single most interesting thing in the input (from the story bank); define audience, goal, core insight (one sentence) and proof; choose a format: operational story ("We cut X from Y to Z"), case study (lead with the result), contrarian opinion, framework post, build-in-public ("Month N building X: an honest observation"); write 3 hook variants labelled by formula with character counts; write the full post using hook 1; write a spicier variant (one or two sentences sharpened, not longer); write 3 first-comment options (source link + context; follow-up question; related resource).

**Hook (must work before the ~210-character "see more" cut; never starts with "I"):** contrarian; specific result; mistake or lesson; framework reveal; provocative question (sparingly). Avoid: "I'm excited to share", "Big announcement!", "Thrilled to announce", "We are pleased to", "Just shipped".

**Format:** URLs in the first comment (body says "link in the first comment") because outbound links are down-ranked; paragraphs of 1-3 lines with a blank line between, never four or more consecutive lines; split any sentence that needs two commas; 900-1,300 characters is the sweet spot (500 minimum, 3,000 maximum); emojis 0-3 as separators only; end with a question or a CTA, never both; no "Let me know your thoughts!".

**Arcs:** founder/ship (hook, context, action, surprise, takeaway, closing question); insight (claim, assumption, evidence, implication, question); **product launch** (hook = outcome for the user, not the feature; specific problem; what it does plus differentiator in one line; proof point such as a beta result or quote, skipped if none; one CTA, e.g. "Link to try it in the first comment"); tutorial summary (hook, why it matters, 3-5 numbered one-line steps, takeaway, CTA or question).

Specificity swaps: "saved time" -> "saved 4 hours a week"; "dramatically faster" -> "cut from 47 minutes to 4"; "customers asked" -> "3 of our top 10 customers requested it"; "improved performance" -> "p95 latency 1.2 s to 180 ms". Example hook: "6 months of building in silence. Then 400 signups in 48 hours."

## 6. X threads

7-10 tweets, one insight each, under 280 characters including the "1/8 " numbering; always numbered; no hashtags, em dashes, semicolons or markdown; contractions; no URLs except in the final CTA tweet; no tweet starts with "I" except in story style; no invented data.

Styles: data/insight, how-to, story/journey (first person allowed), hot take. Hook formats: specific stat, bold claim, question, before/after ("3 months ago our API took 1.2 s. Now 90 ms."), counterintuitive claim. Never open with "A thread on...", "Let me share", "Quick thread:". Inside a tweet, at most two line breaks. The CTA tweet is exactly one of: link ("Full post in the replies"), engagement ask, follow (only if the handle is given), or "retweet the first tweet". Output: the thread, the CTA tweet, one alternative hook in a different format. For a Product Hunt day, post the thread within 30 minutes of going live.

## 7. Carousels (LinkedIn, Instagram)

Extract the distilled thesis, the audience angle and the goal (educate, provoke, summarise, convert, inspire); document assumptions if the input is thin. Plan 5-9 slides with roles, write 3 hooks labelled by pattern, one idea per slide with a visual direction, then a caption that adds context rather than summarising. No hashtags (the source carousel kit asked for 3-5; every other channel rule in this collection bans them, and the caption reads better without).

Hook patterns: contrarian ("Stop prioritising features. Here's why the best teams ship less."); mistake ("Your devtool doesn't have a feature problem. It has a use-case problem."); operator lesson ("We spent 6 months building the wrong API. 5 red flags we missed."); framework ("The 4-step framework we use to write docs developers read"); teardown ("Stripe's documentation is a masterclass. 5-minute teardown."); pattern break (extreme brevity: "Nobody cares about your features.").

Slide roles: Cover (hook, minimal text, do not reveal the answer); Problem (status quo and why it hurts, with empathy); Reframe ("Instead of X, think Y"); Insight (one declarative sentence plus 1-3 bullets); Framework (steps or a named method); Example (quick case or before/after); Proof (hard numbers, logos, quotes, never "many companies"); Takeaway (TL;DR, nothing new); CTA (one specific action tied to the topic, never "like, subscribe, comment").

Quality bar: one idea per slide; no duplicated points; no paragraph slides; intentional flow (Problem -> Reframe -> Insight -> Framework); the three hooks genuinely differ; the caption complements rather than repeats.

## 8. Changelog and "what shipped" packs

Inputs: free text, local git commits (`git log --since="7 days ago"` is the usual window), or PR titles. Show what you found and confirm before transforming; drop test, CI and docs-only commits as noise.

**Changelog rules:** newest entry first; translate technical language to the user-facing benefit and where to find it; never invent metrics; past tense (Added, Fixed, Improved); exactly one category per item from New / Improved / Fixed / Under the hood (the last only when developer-relevant; omit empty sections); label with the user's version, else a semver increment (patch for fixes, minor for features), else "Week of Month Day, Year".

```
## Week of April 23, 2026
### New
- **Dark mode**: toggle in Settings > Appearance. Works across all views.
### Fixed
- **CSV export**: no longer truncates files over 10,000 rows.
```

**Content pack:** one-liner under 20 words covering the 1-2 biggest items ("Dark mode, faster API, and a fix for the export bug."); tweet thread of 3-5 (T1 "We shipped N things this week." or the biggest feature; one item per tweet, 1-2 sentences; optional last tweet with the changelog link; active voice "Dark mode is live", no recap tweet); LinkedIn post 150-400 words, founder voice "We shipped", hook under 150 characters, one paragraph per item (what it does, then why it matters), skip under-the-hood items, close with a question or observation rather than a CTA; email with subject "What shipped this week: [biggest] + [one more]" and a 50-100 word body of 3-4 bullets.

## 9. App-store listings (ASO)

Limits as of Oct 2026 (verify in App Store Connect and Play Console before submitting): iOS title 30 characters, subtitle 30 (use it as an action hook), promotional text 170 (shown above the fold, editable without a release), description 4,000 (no HTML; bullets with a plain character), keywords 100 characters comma-separated with no spaces. Google Play: app name 30, short description 80 (the most important field on Android), full description 4,000.

Rules: never a competitor's trademark in title, subtitle, promo text or keywords (a hint in the long description is tolerated: "Switching from the green elephant app?"); no "Free" or "$0" in titles; only claim features that are shipped.

Positioning method: take the top three complaint clusters about the alternative (see `positioning-and-naming.md`, complaint mining) and map each to a specific feature you have. **Contrast the experience, not the brand:** "powerful but bloated" versus "fast and simple"; "nickel-and-diming" versus "all-inclusive, no hidden fees". Write benefits over features ("Includes offline sync" becomes "Keep working on the subway. True offline mode means you never lose a note."). The first three bullets of the promo text or short description answer the three biggest pains. Output: gap analysis (pain -> antidote x3), iOS listing, Play listing, three sentences on why it works.

## 10. 30-day launch calendar

- **Day 30-21, teaser:** build-in-public post about the problem (not the product); identify 3-5 potential hunters and supporters; start the supporter list; put up a "notify me" page; write the positioning doc if it does not exist.
- **Day 20-8, assets:** five gallery images, demo video, all copy drafted and de-slopped (PH kit, HN title, Reddit posts per sub, LinkedIn, X thread, emails, changelog template). Send E1 to existing users on day 8.
- **Day 7-2, final prep:** E2 to the newsletter on day 2; personal messages to supporters (not a mass blast); schedule nothing that must be manual (PH go-live, HN post); dry-run the listing preview; maker comment saved ready to paste; pick the separate day for HN (not the PH day, so links and traffic do not look coordinated).
- **Day 1, launch:** the hour-by-hour PT plan above; E3 immediately; reply to every comment within two hours; ask for feedback, never upvotes.
- **Day 2:** E4 with results and thanks; results post on LinkedIn/X; reply to overnight comments; log what people misunderstood (that is next week's hero rewrite).
- **Days 3-14:** HN on its own day (Tue-Thu morning ET); Reddit posts staggered one subreddit per day; changelog pack for the first fixes.

## 11. Post-launch loop

Each release: changelog entry and content pack. Each week for the first month: read every comment, support message and churn reason; collect two real numbers and one quotable sentence (with permission). Revise the hero and FAQ from that language, not from new adjectives. Outreach only on real signals (see `email-and-outreach.md`). Resubmit to HN or re-launch on PH only after a substantial change, months apart.

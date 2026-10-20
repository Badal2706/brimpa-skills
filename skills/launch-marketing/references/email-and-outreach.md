# Email: newsletters, launch and onboarding sequences, cold outreach

Contents
1. Newsletter and launch email
2. Subject lines and preheaders
3. HTML email rendering rules
4. Onboarding sequence
5. Launch email sequence (4 emails)
6. Cold outreach: the 7 signals
7. Outreach cadence, channel rules, objections, breakup
8. Self-QA

## 1. Newsletter and launch email

**Intake, one message:** topic; audience (role, company size, how they know you); the one primary CTA. Optional: brand colour, platform (Loops, Mailchimp, Beehiiv, Resend, other), length, personalisation, whether a plain-text version is needed. Missing answers take defaults: 500-700 words, editorial style, one-time send, three subject lines, plain-text yes.

**Before drafting, name the one unmissable element** (a stat, a quote, a single CTA card, a hero image) so the design has an anchor. The "unforgettable test": state in one sentence what a reader would describe three hours later; if you cannot, the anchor is not strong enough.

**Structure (pick from):** header, hero, intro, main content, image block, stat callout, secondary section, product CTA, sponsor block, quick links, footer. Present the numbered list and confirm before writing.

**Per-section copy rules:**
- Hero headline under 8 words, outcome-focused, never starting with I/We/Our.
- Hero hook 1-2 sentences: a problem or a curiosity gap.
- Intro 2-3 sentences; contractions fine.
- Main content 250-400 words, scannable: bold key phrases, 1-3 line paragraphs, step cards or bold callouts instead of wall-to-wall bullets.
- Stat callout under 20 words, styled as a pull quote; only real data.
- Product CTA section 2-3 sentences about what changes for them, not "check out our product".
- CTA button text 3-5 words, action verb + benefit: "Read the full breakdown", "Save my seat", "Get the guide".
- Footer at most three lines plus the unsubscribe link.
- Banned: powerful, seamless, game-changing, leverage, innovative, unlock, transform, elevate, cutting-edge, robust; no em dashes.

**Email design slop to avoid:** white background plus a lone coloured button; a centred hero on a gradient; all-Inter/Arial with no display face; no visual anchor; brand colour on four or more elements; bullet lists everywhere; "Click here" / "Learn more" buttons; a footer longer than three lines. Brand colour appears in at most three places (a thin top strip, a callout border, a category label), never on body text, headlines, button background or section backgrounds.

## 2. Subject lines and preheaders

40-60 characters; no all-caps; avoid FREE, exclamation marks, dollar signs, "urgent", "click now" (spam filters and readers both punish them). The preheader is a second subject line that resolves just enough to earn the open. Always present A/B/C with a recommendation.

Ten formulas:
1. Curiosity gap: "What [audience] gets wrong about [topic]" (educational, warm lists).
2. Direct benefit: "How to [outcome] in [timeframe or condition]" (how-to, conversion).
3. Number/list: "[N] [topic] [patterns / lessons / mistakes]" (curated, research).
4. Question: "Is [common belief] actually true?" (contrarian, readers with strong priors).
5. Insider access: "What we learned from [experience]" (founder newsletters).
6. Specific stat: "[stat] changed how I think about [topic]" (only with real data inside).
7. Contrarian: "Why [popular opinion] is wrong" / "Stop [behaviour]" (sparingly).
8. Personal story: "I [did thing]. Here's what happened."
9. Name drop: "How [known company] [outcome]" (only if the content covers them).
10. Urgency: "[Event] [ends / starts] [time]" (only when true).

Picker by audience: B2B SaaS/GTM 1, 3, 6, 9; founder 5, 8, 1, 7; consumer 2, 4, 10, 8; developer 3, 6, 2, 4; educational 1, 3, 4, 6; product launch 10, 2, 9. For a clinic newsletter: 2, 4, 1 ("How to tell a sprain from a fracture at home").

## 3. HTML email rendering rules (summary)

Email clients are not browsers; Outlook on Windows renders with Word's engine. So:
- Table layout only; inline styles only; no classes, flexbox, grid, `position`, `float`, CSS variables, `min-height`/`max-height`. A `<style>` block is allowed only for optional media queries, with inline fallbacks.
- Every `<table>` carries `cellpadding="0" cellspacing="0" border="0"`. Container 600 px wide: both `width="600"` and `style="max-width:600px"`.
- Every coloured `<td>` sets both `bgcolor="..."` and inline `background-color`. `border-radius` goes on `<td>`, not on `<a>`.
- Buttons are a table + td with `bgcolor`; Outlook ignores `display:block` on `<a>`. Big tappable buttons, not text links, for the main action.
- Padding on `<td>`, not margin. Section padding around 40 px vertical, 32 px horizontal; spacing from a fixed set (8/16/20/24/32/40/52/64 px).
- Set font-size, line-height, colour and family on every text element. Sans stack: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif`; serif headlines: Georgia. Type scale: H1 28-36 px / 700 / 1.2; H2 20-24 px; body 15-16 px / 1.6-1.7 / #333; meta 12-13 px / #888. Keep at least a 2:1 size step between hierarchy levels.
- Images hosted (no base64), `alt` text, `border="0"`, `display:block`, `max-width:100%`. Avoid background images (VML workaround only if critical).
- Mobile media queries and dark mode are progressive enhancements; the email must read without them. Single column.
- Unsubscribe link in the footer with the platform's variable: Loops `{{unsubscribe_url}}` / `{{first_name}}`; Mailchimp `*|UNSUB|*` / `*|FNAME|*` (and `mc:edit` on editable cells); Beehiiv `%%unsubscribe_url%%` / `%%first_name%%`; Resend `{unsubscribeUrl}`; generic: leave `[UNSUBSCRIBE_URL]` with a comment.
- Test in Gmail (web and app), Apple Mail and Outlook 2016+ before sending. Save HTML (and the .txt fallback) to a file; never paste full HTML into chat.

Send checklist: replace `CTA_URL`, company name and postal address, verify the unsubscribe variable, confirm the brand colour appears at most three times, send a test to yourself.

## 4. Onboarding sequence (product signups)

Goal: get the user to the first real outcome, not to read about features. Five emails over the first two weeks is a sensible default; stop the sequence as soon as the user reaches the activation event.

1. **Welcome (immediately):** one sentence on what they signed up for, one action that produces the first outcome in under ten minutes, a real reply-to address. Subject formula 2 ("How to get your first deploy running in 10 minutes"). Under 120 words.
2. **The first win (day 1-2, or triggered if the action has not happened):** the single most common place people stall, and the two-step fix. One screenshot or GIF at most.
3. **Why it works (day 4):** one mechanism, explained plainly, with a real number if you have one ("the median team's first green build takes 7 minutes"). No feature tour.
4. **Proof and a nudge (day 7):** one customer story in three sentences (with permission) and the CTA to the next outcome. Subject formula 9 or 6.
5. **Decision (day 12-14, trials only):** what ends when the trial ends, what they keep, the price, one CTA. Loss framing only where true ("your 14 preview environments are deleted 7 days after the trial").

Rules: each email has one CTA; the button says the outcome ("Connect my repo"); plain-text or lightly styled beats a designed newsletter here; segment by whether the action happened rather than by calendar if the platform allows; never "just checking in".

## 5. Launch email sequence (4 emails)

Each under 150 words, subject under 50 characters, one CTA:
- **E1, existing users, one week before:** what is coming, why it matters to them specifically, how they can help (try it on day one, tell one colleague). Never "support us" without saying how.
- **E2, newsletter, the day before:** the launch time in their time zone, the one-sentence pitch, the direct link.
- **E3, day of (12:01 AM PT on a Product Hunt day):** the link, the one thing to try, the promo code if any, a request for honest feedback (not upvotes).
- **E4, 48 hours after:** results in real numbers, the three most useful pieces of feedback and what you are changing, thanks by name where permitted.

## 6. Cold outreach: the 7 signals

Only `{{first_name}}` may remain a template variable; no `[Company Name]` brackets in a finished sequence. Read `docs/icp.md` and any account notes first; otherwise ask four questions (what the product does; who is targeted; the main problem in the buyer's words; the differentiator versus what they use today). Write the **angle block** before any message: Signal / Insight / Bridge / Opener (names the specific trigger; "I saw your company recently raised funding" is rejected as too vague) / Ask (under 10 words).

| Signal | Insight | Opener pattern | Ask | Timing |
|---|---|---|---|---|
| Post-fundraise (under 30 days) | Money plus pressure to deploy it | "Congrats on the [size] [stage]. [The scaling problem that usually follows]" | "Worth 15 minutes to see if we can shorten ramp?" | Fast: days 1, 2, 4, 7, 10; first touch within 48 h |
| Hiring (5+ roles in one function) | Where they hire is where they hurt | "Noticed [co] is hiring [N] [roles]. That growth in [function] usually creates [bottleneck]" | Tie to the bottleneck | First touch within the week |
| Competitor displacement (public frustration) | Highest intent | "Saw your [post] about [competitor] and [frustration]" | "Can I show you what [similar team] built instead?" | Within 24 h |
| Product launch | Launches need what you provide | "Congrats on launching [product]. [What launches need]" | "Do you have that wired up already?" | 2-4 week window |
| Content engagement | They raised their hand | Reply publicly first, then: "You commented on our post about [topic]. My guess is [interpretation]" | "Am I close?" | Same week |
| Event follow-up | Shared context | Start on LinkedIn; reference the specific thing they said | One question | Within 48 h |
| Job change (under 60 days) | First-90-days mandate | "Congrats on the move to [co]. Your background in [area] maps to [problem]" | "Is that on your roadmap for the first 90 days?" | Within 2 weeks |

## 7. Cadence, channel rules, objections, breakup

**Cadence:** 4-6 touches over 10-14 days; at least two days between touches; never the same channel twice in a row; every follow-up adds something new (a resource, a new angle, proof), never "just following up"; the last touch is a breakup. Default: D1 email, D3 LinkedIn, D7 email (new angle or case study), D9 phone (talk track plus voicemail), D12 email (objection), D14 breakup email.

**Email:** body under 100 words (state the count); subject under 8 words, no question marks, two variants per email; first sentence about them; one ask; sign off with first name only. Subject patterns by touch: T1 signal-specific; T2 value-led outcome; T3 social proof or objection (name a company they know); breakup low-pressure ("Closing the loop").

**LinkedIn:** connection note under 300 characters, no pitch in it, context plus one question; DM is a shorter email. **Phone:** opener under 20 words; a 3-5 bullet talk track (context, value, ask); voicemail 20-25 seconds (name, company, one sentence why, callback number); call once.

**Objection pre-emption, woven into existing touches (no separate message):**
- "We already have a tool": acknowledge their tool by name and position as the next step ("Most teams using [X] add us when [gap]"), at T3.
- "Not the right time": the signal is the timing; say so at T1.
- "Too expensive": anchor to a number they care about (headcount cost, hours, revenue) at T3 or T5, never at T1.
- "Need to involve others": offer a shareable one-pager or recorded walkthrough proactively at T2 or T3.

**Breakup (3-4 sentences):** no guilt ("I know you're busy", "I've sent a few emails"), no asking why they did not reply, no "is there a better person". Template: "{{first_name}}, I'll stop reaching out so I'm not cluttering your inbox. If [situation] changes, I'd be glad to reconnect. I'll leave it with you; my contact is below."

Banned in outreach, beyond the universal list: synergy, touch base, circle back, ping, loop in, alignment, bandwidth, deep dive, low-hanging fruit, move the needle, scalable, end-to-end, best-of-breed, and all pleasantries ("hope this finds you well", "Happy Monday", "Just wanted to").

For a local-business client the same structure applies to B2B referrals (a physio writing to orthopaedic surgeons, a web studio writing to accountants): the signal is a real event (new practice, new location, a public review complaining about something you solve), the ask is small, and the breakup is polite.

## 8. Self-QA

Newsletter: headline under 8 words and not starting with I/We/Our; CTA 3-5 words; no em dashes; no banned words; one dominant element; type steps at least 2:1; brand colour at most three places; all styles inline; every table has the three zero attributes; 600 px set twice; footer unsubscribe present; subject lines A/B/C 40-60 characters with preheader; test sent.

Outreach: every message starts about them; signal named in T1; only `{{first_name}}` as a variable; email under 100 words with the count stated; LinkedIn under 300 characters with the count stated; phone opener under 20 words; no banned words; no "just following up"; each follow-up adds new value; no channel twice in a row; at least two objections pre-empted; breakup 3-4 sentences. Save to `docs/sequences/<signal>.md`.

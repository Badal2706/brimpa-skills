# Article templates: five page types, written so every number is traceable

Use these when a client site or Brimpa's own blog needs an article that should rank and still read as honest. Each template has the same shape: a **details block** the author fills in first, an **outline step that stops for approval**, **writing rules**, and a **pre-finish check**. The "Writing Rules" referred to below are the universal copy rules and the de-slop pass in `SKILL.md` and `human-tone.md`; the page-type coverage floors, information-gain rule and schema per page type are in `seo-geo-audit/references/content-eeat.md` §7 and §10.

Why this shape: the model cannot know prices, results, step counts or which items you compared. If the details block is thin, the article will be thin; the template refuses to pad it.

## Shared rules (all five)
- Only facts from the details block. Anything else is `[fill in: ...]` or "unverified".
- Dates next to every price, rate, ranking or feature claim ("Rs 180/sq ft, checked Nov 2026").
- Disclose the relationship to anything recommended (own product, affiliate, partner, none) near the top.
- One reader, one search intent, answer in the first screen.
- Outline first, stop, get approval, then write. Count characters for title and meta.
- Pre-finish check is a list the author can tick, not a paragraph.

---

## 1. How-to guide (instructional searches: "how to ...")

**Details block**
- Keyword: `how to ...`
- Reader's starting point: skill level, tools they already have
- Requirements: tools, access, time, cost
- Steps, one per line: number, action, expected result, common mistake, fix
- Screenshots or examples, each tagged with the step it belongs to
- How to check the whole task worked

**Outline:** steps as action headings ("Verify the domain in Search Console", not "Verification"). Stop for approval.

**Write**
- Requirements before step one.
- Each step: one action, then the result the reader can see, so they know it worked.
- The common mistake and its fix sit under the step where it happens.
- Each screenshot under its own step.
- No steps the reader's starting point does not need; no steps that are not in the details.
- End with a short "check it worked" section.
- FAQs only from questions raised in the details.

**Pre-finish check:** step count matches the details; flag any step without an expected result.

## 2. List article (readers choosing from options: "best X for Y")

**Details block**
- Keyword
- Reader's goal: what they will do with the list
- Selection criteria: how the items were chosen
- Items, one per line: number, name, key facts, best for, limitation, source, date checked
- Ordering logic: what ranks one above another
- Relationship to any item: own product / affiliate / none
- Internal links and CTA: URL, anchor text, wording

**Outline:** includes the title with the **real** item count. Stop for approval.

**Write**
- Selection criteria in the first third; disclosure near the top.
- Same structure for every item: what it is, best for, limitation, one supporting fact from the details, source.
- Order by usefulness to the reader's goal, explained in two sentences before the list.
- Only the supplied items; the number in the title equals the number of items; no filler to reach a round number.
- Date next to every price or feature; never invent prices, features, rankings or ratings.
- Close with "how to choose by reader type", no new facts.

**End with:** a table of all items with best-for and limitation, for scanning.

## 3. Case study (a client win with every number traceable)

**Details block**
- Client: name, industry, size, approval to be named yes/no
- Starting situation: problem, baseline numbers, date
- What we did: steps in order, tools, timeline
- Results: for each metric, before, after, date range, data source
- Other changes during the period that could have affected results
- Client quote: approved wording, if any
- Lesson: what a reader can apply
- CTA wording

**Outline:** challenge, approach, results, lesson, with one line per section naming which detail it uses. Stop.

**Write**
- Open on the most specific true detail of the starting situation.
- Every result with baseline, timeframe and data source, ideally a table.
- Explain the steps well enough that a reader learns something without hiring us.
- Name the client only with approval; otherwise anonymise every identifying detail.
- The quote word for word, or no quote.
- Never round results up, stretch timelines, or credit an outcome to a step that did not cause it.
- One honest sentence on what we cannot claim credit for (from "other changes").
- The lesson is advice, not a summary.

**Pre-finish check:** list every number in the draft with the details line it came from; flag any that cannot be traced. For clinics: no patient data, no before/after health claims; results are operational (bookings, missed calls, review count).

## 4. Comparison post (buyers ready to choose: "X vs Y")

**Details block**
- Comparison keyword
- Reader types (solo user, small team, agency; or solo clinic, 20-bed hospital, chain)
- Comparison criteria
- Options, one per line: name, pricing, key features, strengths, weaknesses, best for, source, date checked
- Relationship to any option
- CTA wording

**Outline:** stop for approval.

**Write**
- Disclosure in the first three paragraphs.
- Open with a short verdict **by reader type**; no single winner for everyone.
- Every option on the same criteria in one table; date next to each price and feature.
- Our own product's weaknesses as plainly as the competitors'.
- A "who should pick which" section.
- No invented features or prices; an unverified cell says "Unverified".
- Neutral tone; "best overall" only if the details support it.

**Pre-finish check:** list every "Unverified" cell for the author to fill before publishing.

## 5. Problem-solution post (problem keywords; the product is the fix only where it is)

**Details block**
- Problem keyword
- Reader's situation and pain in their own words (description or real quotes)
- Root cause
- Common fixes people try and why each falls short
- Fixes that need no product
- Our product: what it does, who it suits, who it does not suit
- Proof: customer results with numbers, features, screenshots
- CTA wording

**Outline:** marks which section explains the cause, which gives the free fixes, and where the product first appears. Stop.

**Write**
- Open with the problem in the reader's words.
- Cause before any fix.
- At least three genuinely useful fixes that need no product.
- Introduce the product only at the step where it does the job better, and pair every mention with a piece of supplied proof.
- A section that reads naturally as "who this is not right for", from the "does not suit" details.
- Calm tone; no exaggerating the problem; no claim beyond the proof.
- Soft CTA; nothing new in the conclusion.

**Pre-finish check:** count the product mentions; confirm each has proof beside it; list any that do not.

---

## Which template for which keyword
| Intent signal in the query | Template | Schema (facts visible on the page only) |
|---|---|---|
| how to, steps, setup, fix | How-to guide | Article (HowTo rich results are retired; markup earns nothing) |
| best, top, options, tools | List article | Article + ItemList |
| results, case, "how [client] got" | Case study | Article |
| vs, versus, or, compare, alternative | Comparison | Article (+ Product only for real products with real offers) |
| why does, keeps, not working, problem | Problem-solution | Article |

Source: the five-template structure follows a widely shared "blog prompt cheat sheet" (Instagram, Nov 2026), rewritten with our own rules; see `sources.md`.

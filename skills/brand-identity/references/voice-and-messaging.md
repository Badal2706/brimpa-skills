# Voice and messaging summary

Enough voice definition that every surface, including model-generated copy, sounds like one
company. Full positioning, naming and launch copy belong to the `launch-marketing` skill; this
file produces the compact section of BRAND.md that other skills read first.

Contents

1. Voice vs tone
2. Define the traits (voice chart)
3. The four dials
4. Tone by context
5. Prohibited terms and tells
6. UX writing rules that are part of the brand
7. Voice tests and sample rewrites
8. Messaging summary (value proposition, key messages, pitch)
9. BRAND.md voice section template
10. Hand-off to launch-marketing

---

## 1. Voice vs tone

Voice is the personality and stays constant; tone is how the voice adapts to the moment. A warm
brand is celebratory in a success toast and steady in a payment-failed message, but it is the same
brand in both. Define voice once; define tone per context.

## 2. Define the traits (voice chart)

Choose three to five traits. Each trait gets a boundary ("confident, not arrogant") because the
boundary is what makes the trait usable; "friendly" alone produces exclamation marks.

| Trait | Means | We do | We do not |
|---|---|---|---|
| Plain-spoken, not blunt | short words, concrete nouns | "Your report is ready." | "Your analytics artefact has been successfully generated!" |
| Knowledgeable, not condescending | explain once, precisely | "Takes about 2 minutes." | "Simply click the obvious button." |
| Warm, not gushing | notice the person | "Thanks for waiting." | "We're SO excited you're here!!!" |
| Confident, not overselling | state what is true | "Works offline." | "Revolutionary offline-first paradigm." |

Derive traits from the discovery answers (personality adjectives, audience situation), not from a
list of nice words. A clinic's traits come from how a good receptionist talks; a developer tool's
from how a good senior colleague reviews a PR.

## 3. The four dials

Mark where the brand sits and the range it never leaves.

```
Formal    |----x-----------|  Casual
Simple    |--x-------------|  Complex
Serious   |--------x-------|  Playful
Reserved  |-----x----------|  Expressive
```

Legal and payment surfaces move toward formal and reserved; social and onboarding move toward
casual and expressive; nothing moves past the range.

## 4. Tone by context

| Context | Tone shift | Example |
|---|---|---|
| Marketing / landing | benefit-led, concrete, one idea per sentence | "Book, remind and bill from one screen." |
| Onboarding | guiding, one next action, honest time estimates | "Step 1 of 3. About two minutes." |
| Product UI labels | neutral verbs, sentence case, consistent nouns | "Save changes", not "Submit" |
| Support | steady, specific, no blame | "The invoice did not send because the email bounced. Try this address." |
| Errors | what failed, why if useful, how to recover; never apologise in a loop, never joke about money, privacy, deletion or blocked work | "Payment failed. Your card was declined by the bank. Try another card or retry in a minute." |
| Success | brief and certain; proportional to the effort | "Published." / after a long task: "Import done. 412 contacts added." |
| Empty states | what will be here, why it matters, how to start | "No patients yet. Add your first patient or import a CSV." |
| Legal / consent | formal, complete, still plain | "We store your data in India. You can delete it any time from Settings." |

## 5. Prohibited terms and tells

Start the list with the words that generated drafts reach for, then add the client's own
(industry jargon they hate, competitor slogans, words that overpromise in a regulated field).

- Buzzwords: streamline, empower, supercharge, unlock, world-class, enterprise-grade,
  next-generation, cutting-edge, revolutionary, best-in-class, seamless, synergy, leverage (as a
  verb), robust, holistic, game-changing, delight (as a promise).
- Cadence tells: "X. No Y." / "Not a feature. A platform." three times on a page; a headline that
  is one full sentence filling the viewport; em-dash saturation (more than about one per 500
  characters); "theatre" framing ("Welcome to the future of...").
- UI tells: "→" appended to every link; tracked ALL-CAPS eyebrow above every heading; meta strings
  joined with middle dots; "WORD — fragment" labels.
- Regulated-field cautions: clinics and health products avoid "cure", "guaranteed", "painless";
  finance avoids "guaranteed returns"; anything legal avoids "100% compliant". Put the exact words
  in BRAND.md with a reason each.

## 6. UX writing rules that are part of the brand

- Write from the user's side: name things by what they understand, not how the system is built
  ("Reminders", not "Notification webhooks").
- Active voice, plain verbs, sentence case. One job per string.
- A CTA says what happens: "Save changes", "Send invoice", "Book appointment". The same action
  keeps its name through the flow ("Publish" -> "Published").
- Same noun for the same thing everywhere (pick "patient" or "client", never both).
- Numbers, dates and currency formatted the way the audience reads them (for India: `₹1,20,000`,
  `20 Oct 2026`).
- Errors and empty states are directions, not moods.

## 7. Voice tests and sample rewrites

Four tests for any sentence: Does it sound like us? Could a competitor say it word for word? Does
the audience care about this sentence? Is it consistent with the last thing we published?

Sample rewrites (keep two or three real ones in BRAND.md; they teach faster than rules):

| Before | After | Why |
|---|---|---|
| "Leverage our cutting-edge platform to streamline your workflow." | "Book, remind and bill from one screen." | concrete, benefit, no buzzwords |
| "Oops! Something went wrong :(" | "Could not save. Check your connection and try again." | what failed, how to recover |
| "Unlock your potential with AI-powered insights!" | "See which days you lose the most appointments." | specific, provable |

## 8. Messaging summary

Keep this short; depth lives in launch-marketing.

- Value proposition (one line, fill the template then compress it):
  "For {audience} who {need}, {brand} is the {category} that {key benefit}. Unlike {alternative},
  it {differentiator}."
- Three key messages, each with a proof point. Where no proof exists yet, write "proof needed";
  never invent a statistic, testimonial or customer name.

| Message | Audience need | Proof |
|---|---|---|
| {message} | {need} | {number, case, demo, or "proof needed"} |

- 10-second pitch: one sentence that makes a stranger ask a question.
- Tagline (if one exists; naming and tagline work is launch-marketing's).

Message tests: clear (no jargon), differentiated (competitors cannot say it), credible (provable),
compelling (audience cares), consistent (fits the voice).

## 9. BRAND.md voice section template

```markdown
## Voice and messaging

Traits: {trait, not opposite}; {trait, not opposite}; {trait, not opposite}
Dials: formal {2/5} · simple {1/5} · playful {3/5} · expressive {2/5}

| Context | Tone | Example |
|---|---|---|
| Marketing | | |
| Onboarding | | |
| Support | | |
| Errors | | |
| Success | | |

Prohibited: {term} ({reason}); {term} ({reason}); ...
Preferred terms: {"patient" not "client"}; {"appointment" not "slot"}

Value proposition: {one line}
Key messages: 1. {…} (proof: {…}) 2. {…} (proof: {…}) 3. {…} (proof: {…})
10-second pitch: {…}
Positioning and naming: see {path to launch-marketing output}
```

## 10. Hand-off to launch-marketing

Give launch-marketing the voice chart, the prohibited list and the messaging summary; take back
the final positioning statement, name decisions and tagline, and link to them from BRAND.md
instead of copying, so there is one place to change them.

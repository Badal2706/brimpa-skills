# UX copy: interface text that does one job each

Words are design content. Write the whole interaction path (label, helper, error, success, empty state) in plain text before markup, and read it as a path, not as isolated strings.

## Contents

1. Principles
2. Naming things
3. Buttons and CTAs
4. Labels, helper text, placeholders
5. Errors
6. Empty states
7. Success, confirmations, notifications
8. Destructive actions and confirmations
9. Tone
10. Headlines and supporting lines (pages)
11. Internationalisation
12. Banned patterns
13. Verify

## 1. Principles

- Each written element does exactly one job. If the heading explains the state, the intro adds new information or disappears.
- Message hierarchy per state: the one fact needed now; the next action; supporting context that changes the decision; tone for the moment.
- Write from the user's perspective, in the product's own language, as short as possible without losing meaning or recovery.
- Voice is consistent; tone adapts to the moment (stress, risk, success, urgency).
- Say each idea once. Cut every sentence in half, then look again.

## 2. Naming things

- Name by what users understand, not how the system is built: "Notifications", not "Webhook config"; "Patients", not "Records"; "Waiting on the customer", not "Status: pending_external".
- One noun per concept across the whole product; keep a small glossary and do not vary words for literary effect. "Appointment" is not also "booking" and "visit".
- Words of the trade in labels, filters and empty states ("Off sick", "Due on the 28th", "Discharged") make a screen belong to its product.
- Specific nouns and real numbers beat adjectives: "ships in a week" over "fast delivery"; "38 seats" over "intimate".

## 3. Buttons and CTAs

- Specific verb plus object: "Save changes", "Book a table", "Download for Mac", "Delete 3 photos". Never "Submit", "OK", "Yes", "Continue" when a specific verb exists.
- One to three words. Sentence case. The primary action keeps one name everywhere in the flow; the confirmation echoes it ("Publish" -> "Published").
- Labels describe what will happen, not the gesture ("Next: payment", not "Click here").
- Include the consequence when it matters: "Pay 1,200", "Send to 48 patients".
- One primary per screen; a secondary is a text or outlined button; one arrow glyph at most, on the primary, if the style uses arrows at all.
- Button width from padding, not a fixed width: German runs about 30% longer than English.

## 4. Labels, helper text, placeholders

- Persistent label above (or beside) every field. Placeholders are examples ("name@clinic.com"), never labels, and disappear on typing.
- Helper text answers the implicit question ("We text appointment reminders to this number"), never restates the label. Show it before the error would occur: format and eligibility requirements up front.
- Explain why information is requested only when it is not obvious (date of birth on a medical form is obvious; on a newsletter sign-up it is not).
- Required/optional marked consistently; when most fields are required, mark the optional ones.
- Link text makes sense out of context ("View invoice 1042", not "click here"). Icon-only controls get an accessible name that matches any visible tooltip.

## 5. Errors

Every error answers three questions: what failed; why, when known and useful; how to recover or what alternative remains.

- Specific: "Email is missing @" rather than "Invalid input"; "Card declined by your bank. Try another card or contact them." rather than "Payment error".
- Placed at the source (below the field, inside the block that failed), announced (`role="alert"` or `aria-live="assertive"` for blocking errors), and never blocking the rest of the interface when one component fails.
- Preserve user input. Never wipe a form.
- No internal codes as the primary message; a code may follow in small text for support ("Error 5021"). Do not promise causes or resolutions the system cannot know ("Our servers are down" when it may be the user's network).
- Status mapping: 400 validation with the field named; 401 "Sign in to continue" with the return path kept; 403 why and how to get access; 404 what was looked for and a way back; 429 "Too many attempts. Try again in 2 minutes."; 500 a plain sentence plus Retry and a support path; offline "You're offline. Changes are saved on this device and will sync."
- Tone near loss, money, privacy, deletion, access loss or blocked work: warm and plain; no jokes, no exclamation marks, no apology theatre ("Oops!", "Something went wrong :(").
- Data block errors on dashboards: "Couldn't load deployments. Last updated 09:14." with a Retry text button, inside the block.

## 6. Empty states

Distinguish the five kinds; each gets its own copy.

| Kind | Say | Example |
|---|---|---|
| First use | What will be here, why it matters, the first action (and a template if one exists) | "No patients yet. Add your first patient or import a CSV." |
| User cleared everything | Light confirmation and the way to add again | "Inbox zero. New messages will appear here." |
| No results | Echo the query, suggest a change, offer to clear filters | "No invoices match 'Smith' in March. Clear filters" |
| No permission | Why, and how to get access | "Only admins can see billing. Ask Priya or request access." |
| Error | What happened and retry | "Couldn't load appointments. Retry" |

- Next action before personality. An empty side panel on a dashboard can fill with reference data ("Nothing has sold out yet today" above last Sunday's sell-out times) rather than a dashed box in 400px of white.
- An empty section keeps its frame and header; one sentence spans the block.

## 7. Success, confirmations, notifications

- Confirm the completed outcome in the action's own word: "Saved", "Invoice sent to 3 clients". Mention the next consequence only if it changes what the user should do ("Sent. They'll get it after 9:00 in their time zone.").
- Routine success is brief and quiet (a "Saved" stamp beside the control, a toast that auto-dismisses after 3-5 seconds). Success proportional to effort: a first publish may celebrate modestly; the hundredth save must not.
- Toasts are for transient, non-actionable feedback; anything that needs a decision is inline or a dialog, never a toast that disappears. On Android, a snackbar may carry one action (Undo); never a toast for an actionable message.
- Loading text names the operation ("Importing 240 rows...") with a time estimate when long; never fake progress.
- Live counts: one atomic status message ("3 items in cart"), not a stream of "updated".

## 8. Destructive actions and confirmations

- Name the object and the consequence: "Delete 'Q3 report'? This removes it for all 6 members and can't be undone."
- The confirming button names the action ("Delete report"), the other is "Cancel". Never Yes/No/OK.
- Prefer undo over confirmation when recovery is safe (archive, remove from list, move). Confirm only for irreversible or high-consequence actions; a confirmation on every action trains people to click through.
- Type-to-confirm only for the rare catastrophic case (delete organisation), with the exact string shown.

## 9. Tone

- Conversational, plain verbs, sentence case, no filler, no marketing in the interface. Match the audience's register without flattening terms they know (clinicians know "triage"; do not translate it).
- Delight only where effort was spent, waiting can inform, an empty state can orient, an error needs empathy, or mastery can be rewarded. Generic whimsy is worse than neutral clarity. Never delay or block the task for a flourish.

## 10. Headlines and supporting lines (pages)

- Every headline fits two lines at every width; about 32 characters (4-6 words) survives a phone at a confident size, up to about 42 if the phone size drops to the mid-30s. Section headings two to five words.
- One supporting sentence of at most about 22 words that says concretely what it is and for whom; never a restatement of the headline.
- Shapes that work: the name; what it is ("Furniture for small rooms"); the claim a competitor could not sign; the instruction ("Understand your money"); the place or moment.
- Shapes to avoid: the mad-lib ("The AI-powered platform for modern teams"); the tricolon ("Fast. Simple. Secure."); the correction ("It's not just X, it's Y"); "X, reimagined"; "Welcome to"; "Meet"; a question nobody asked; the headline that needs a colon with the brand name.
- Never invent proof: customers, quotes from named people, press logos, user counts, ratings, benchmarks. Where a testimonial section is demanded and no real one exists, use plainly fictional sample content and flag it in the report.

## 11. Internationalisation

- Complete, translatable strings; no concatenated fragments ("You have " + n + " items"); structured variables with real plural rules from an i18n library, not `count !== 1 ? 's' : ''`.
- Budget 30-40% expansion; German about 30% longer; CJK shorter but taller; RTL mirrors direction (and directional icons with `[dir="rtl"] .arrow { transform: scaleX(-1) }`).
- Dates, numbers and currency via `Intl.DateTimeFormat` / `Intl.NumberFormat` (or the platform equivalents); never hand-formatted.
- Alt text conveys information; decorative images get empty alt. Screen-reader names match visible labels so voice control works.

## 12. Banned patterns

- Buzzwords: streamline, empower, supercharge, unlock, unleash, elevate, seamless, effortless, robust, cutting-edge, next-generation, world-class, enterprise-grade, all-in-one, blazing fast.
- Aphoristic cadence three or more times ("X. No Y." / "Not a feature. A platform.").
- Em dash as a habit; one or two on a page read as writing, ten read as a model.
- Explainer captions that narrate the design ("A clean, minimal layout for...") and sublines that describe the interface ("This page shows...").
- Editorial labels pretending to be sections ("Field notes", "Our philosophy", "Quietly trusted by"); "Step 1" labels duplicating numbers; furniture text ("Est. 2024", coordinates, "Scroll to explore", fake photo credits, "Available for work" with a dot).
- Greetings with emoji as page titles; "Welcome back, Alex" over a work screen (a noun title instead; a greeting suits a personal home only).
- Apologetic or jokey error copy; "Oops"; "Something went wrong" with nothing else.
- All caps longer than three words; styled single accent words inside headlines.

## 13. Verify

- Comprehension without hidden knowledge: a first-timer understands each state.
- Actionability at every error, empty state and decision point.
- Factual accuracy: no claims the product cannot keep.
- Scannability at target widths and 200% zoom; long names, expansion, pluralisation and dynamic values tested.
- Accessible names and announced changes present; tone fits the moment.
- Read the path end to end as the user, not string by string.

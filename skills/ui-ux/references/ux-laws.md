# UX laws, each with one rule and one example

Use these to explain a recommendation, not to decorate a report. Each entry: the law, why it holds, the rule, an example you can show.

## Hick's law

Decision time grows with the number and complexity of choices.
Rule: fewer, grouped choices at each decision point; <= 4 visible sibling options, the rest behind "More"; one recommended option highlighted.
Example: a pricing page with three plans and a "Most popular" badge converts better than seven columns; a toolbar with 1 primary and 2 secondary buttons plus an overflow menu beats 9 equal buttons.

## Fitts's law

Time to reach a target depends on its distance and size.
Rule: make frequent targets big and close to where the pointer or thumb already is; use screen edges and corners (infinite width on desktop); never make a destructive and a primary button the same size next to each other.
Example: on a phone, put the primary action in the bottom third; on desktop, a full-width "Save" at the bottom of a form, and the "Delete account" link small and far from it.

## Miller's law and Cowan's revision

Short-term memory holds about 7 (plus or minus 2) chunks; later research (Cowan 2001) puts the comfortable working limit at about 4.
Rule: chunk everything: <= 4 items per visual group, <= 5 top-level navigation items, phone numbers and codes in groups, no screen that requires remembering a value from the previous screen.
Example: a 16-digit card number shown as four groups of four; a wizard that keeps the chosen plan visible on the payment step instead of making the user remember it.

## Jakob's law

Users spend most of their time on other products, so they expect yours to work the same way.
Rule: use the platform's conventions and the category's established patterns for navigation, controls and gestures; spend novelty on the product's unique mechanism, not on how a dropdown works.
Example: a cart icon top right, a search box top centre, swipe-back on iOS, system Back on Android; a "reinvented" date picker costs more than it earns.

## Tesler's law (conservation of complexity)

Every process has a minimum complexity that cannot be removed, only moved between the system and the user.
Rule: move complexity to the system: compute, default, infer, remember. The user should type only what the system cannot know.
Example: detect card type from the first digits instead of a "card type" dropdown; derive the time zone from the browser; pre-fill the invoice with last month's lines.

## Parkinson's law

Work expands to fill the time available for it.
Rule: fill in what you already know; shrink every task to its irreducible inputs. Each keystroke saved is time the task cannot take.
Example: a delivery address by postcode lookup took 7 keystrokes instead of 30 typed; a sign-up that asks for email first and everything else later.

## Choice overload

Past a point, more options reduce decisions, because every extra option is one more comparison.
Rule: show fewer options up front; progressive disclosure for the rest; curated defaults and "recommended" markers.
Example: the jam study (Iyengar & Lepper, 2000): of 100 shoppers who stopped, 3 bought from 24 flavours and 30 bought from 6.

## Doherty threshold

Productivity rises when system and user respond to each other quickly; the classic threshold is about 400ms.
Rule: acknowledge every action within 100-150ms; show progress for anything over about 400ms, with a time estimate when it runs long; use optimistic updates with rollback where safe; debounce search input around 300ms so the system keeps up without flicker.
Example: a button goes to its pressed state immediately, shows a spinner in place at 400ms, and the table row appears optimistically while the request completes.

## Peak-end rule

People judge an experience by its most intense moment and its end, not the average.
Rule: design the peak (the first real success, the moment the data appears) and the ending (the confirmation, the receipt, the "what next"); remove emotional valleys at high-stakes moments with reassurance.
Example: a checkout that ends with a clear confirmation, order number, and "what happens next" is remembered as good even if the form was long; a flow that ends on a spinner is remembered as broken.

## Zeigarnik effect

Unfinished tasks stay in mind more than finished ones.
Rule: show progress on multi-step and setup flows ("3 of 5 done", a setup checklist at its true percentage); let users leave and return without loss; never show a progress bar that lies.
Example: "Complete your setup, 67%" with the remaining two steps named; a draft badge on an unfinished form.

## Von Restorff effect (isolation effect)

An item that differs from its neighbours is remembered and noticed.
Rule: one thing stands out per screen; if everything is highlighted, nothing is. Spend colour and weight on the primary action, the selected item and the one finding.
Example: one filled primary button in a toolbar of text buttons; a single red mark on the overdue row instead of red on every negative number.

## Aesthetic-usability effect

People perceive attractive interfaces as more usable and are more tolerant of minor problems in them.
Rule: polish buys patience, not forgiveness for broken flows. Use it to earn trust at first contact, then make sure the task works, because the effect disappears the moment a user is blocked.
Example: a beautifully typeset form with inline errors that wipe the input still loses the user at the second attempt.

## Figure-ground (Gestalt)

The eye splits every screen into a figure in front and ground behind.
Rule: dim what is behind the focus. A modal backdrop at about 70% opacity drops the page's own text from roughly 17:1 to about 2.5:1 contrast so there is one thing to look at; the same applies to focus mode in editors and to the selected pane in a split view.
Example: "Delete 3 photos? You can't undo this." over a 70% scrim versus the same dialog over a fully legible page.

## Banner blindness

People learn to skip anything that looks like an ad; bright boxes at the top get filtered out first (Benway & Lane, 1998).
Rule: don't make important things look like ads. Set critical notices in the content's own style and position, close to what they concern.
Example: "Card ending 4421 - Expires Friday - Update" as a line under the balance got looked at; "CARD EXPIRES FRIDAY! Tap to update now" in a coloured banner above it got zero looks in the demonstration.

## Proximity and common region (Gestalt)

Things close together, or inside one boundary, are read as related.
Rule: group by spacing before borders or cards; the gap between groups is clearly larger than any gap inside a group; a related label and field sit closer to each other than to the next pair.
Example: a form with 8px label-to-field and 16-24px between fields reads as pairs without any boxes.

## Postel's law (robustness)

Be liberal in what you accept, conservative in what you send.
Rule: accept input in the forms people naturally produce (spaces in card numbers, phone numbers with or without country code, pasted values with whitespace) and normalise it; be strict and consistent in what the interface shows back.
Example: an OTP field that accepts a pasted 6-digit code with spaces; a date field that accepts "15/3" and shows "15 Mar 2026".

## Goal-gradient effect

Motivation increases as people approach a goal.
Rule: show distance to completion, and give a head start when honest (two of five setup steps already done by signing up).
Example: a progress indicator on a 4-step onboarding with step 1 already complete after account creation.

## Serial position effect

The first and last items in a list are remembered best.
Rule: put the most important navigation items first and last (home, and account or settings); the middle is for the rest.
Example: a bottom tab bar with Home first and Profile last.

## Law of similarity

Elements that look alike are read as the same kind of thing.
Rule: same action, same control, same name everywhere; links look like links, buttons like buttons; one icon family at one stroke weight. If the Save button looks different in two places, one is wrong.

## Using the laws in a review

Cite the law in one clause next to the finding: "The 12 equal filter buttons (Hick) hide the two people use; show those two and put the rest under Filters." Do not open a report with theory. The finding, the impact and the fix come first; the law is the reason.

# Critique rubric: how to review a screen

Judge the rendered result (screenshots at every width it ships at, every reachable state), never the code: you will read your intentions into code. If a problem shows in a screenshot, it is real whatever the code says. Review in a fresh context where possible; the build thread inherits its own optimism.

## Contents

1. Before you score
2. Nielsen's ten heuristics, with check-for lists and 0-4 scoring
3. Rating bands
4. Severity P0-P3
5. Cognitive-load checklist
6. Personas
7. Specificity and emotional journey
8. Implementation audit (five dimensions)
9. Report template
10. Feedback voice and questions
11. Fix order and when to stop

## 1. Before you score

- One second, then five: glance and look away. What did you see? There should be one answer. Then five seconds as a stranger: what is this, who is it for, what do I do next?
- Squint: the screen should reduce to two or three masses with clear size differences; many similar masses means nothing leads.
- Cover the product name: could this screen belong to a competitor or another industry unchanged? (Judge this before any tool output.)
- Follow the left edges: a composed screen has two or three x positions reused on purpose.
- Walk the primary task end to end with mouse, keyboard and touch; drive every reachable state (empty, loading, error, long content, 0 and 1000 items).
- Note what produced the evidence (emulated viewport, which engine, synthesized touch) and what stayed untested.

## 2. Nielsen's ten heuristics (0-4 each; total out of 40)

Score 4 only for genuinely excellent; most real interfaces land at 20-32. Mark 7 and 10 n/a on Persuade or Experience surfaces when they do not apply and renormalise by percentage.

| # | Heuristic | Check for |
|---|---|---|
| 1 | Visibility of system status | Loading indicators; confirmation of save/submit/delete; progress on multi-step; current location visible; inline validation; freshness of data |
| 2 | Match between system and real world | Familiar terms, the trade's words; logical order; recognisable icons and metaphors; natural reading flow; units and formats the audience uses |
| 3 | User control and freedom | Undo/redo; Cancel on forms and dialogs; a way back to safety; clear filters, search and selection; escape from long processes; drafts survive leaving |
| 4 | Consistency and standards | One term per concept; same action, same result and same control; platform conventions; visual and interaction consistency across screens |
| 5 | Error prevention | Confirmations only for destructive actions; constrained inputs (pickers, selects, masks); smart defaults; clear labels; autosave and draft recovery; disabled double submit |
| 6 | Recognition over recall | Options visible; contextual help; recent items and history; autocomplete; labelled icons (no icon-only nav); context from the previous step kept on screen |
| 7 | Flexibility and efficiency | Keyboard shortcuts; command palette; bulk actions; recents and favourites; customisation; power features that do not complicate the basic path |
| 8 | Aesthetic and minimalist design | Only necessary information; clear hierarchy; purposeful colour and emphasis; no decorative clutter; focused layouts; density matched to use |
| 9 | Help users recognise, diagnose and recover from errors | Plain language; specific ("Email is missing @"); actionable; near the source; non-blocking; input preserved; no internal codes as the message |
| 10 | Help and documentation | Searchable; contextual (tooltips, hints, tours); task-focused; concise; reachable without leaving context; help in consistent locations |

Scoring guide per heuristic: 0 absent or actively harmful; 1 present in places, fails on the main path; 2 works on the main path, gaps elsewhere; 3 consistent with minor gaps; 4 exemplary, including edge states.

## 3. Rating bands

| Total /40 | Band | By percentage when n/a applied |
|---|---|---|
| 36-40 | Excellent | >= 90% |
| 28-35 | Good | >= 70% |
| 20-27 | Acceptable | >= 50% |
| 12-19 | Poor | >= 30% |
| 0-11 | Critical | < 30% |

## 4. Severity P0-P3

| Level | Meaning | Timing |
|---|---|---|
| P0 Blocking | Prevents task completion, loses data, or misleads about state | Fix immediately |
| P1 Major | Significant difficulty, or a WCAG AA violation | Fix before release |
| P2 Minor | A workaround exists; friction | Next pass |
| P3 Polish | No real impact on tasks | When convenient; keep these few |

Test: "Would a user contact support about this?" means at least P1. A colour-only status, a kebab-buried primary action, a form that wipes input on error and a 1.4:1 disabled button are all P1 or worse.

## 5. Cognitive-load checklist

Three loads: intrinsic (structure it: steps, scaffolding, progressive disclosure, grouped decisions); extraneous (eliminate: confusing nav, unclear labels, clutter, inconsistent patterns, unnecessary steps); germane (support: consistent patterns, confirming feedback, onboarding through action).

Eight checks (count failures: 0-1 low, 2-3 moderate, 4+ critical):
1. Single focus: one primary thing per screen.
2. Chunking: <= 4 items per visual group.
3. Grouping: related things grouped by proximity, border or shared background.
4. Visual hierarchy obvious in a squint.
5. One thing at a time: no parallel decisions demanded.
6. Minimal choices: <= 4 visible options at any decision point; the rest disclosed.
7. Working memory: nothing must be remembered from a previous screen (Cowan 2001: <= 4 items comfortable, 5-7 pushing, 8+ overloaded).
8. Progressive disclosure: advanced options hidden until relevant.

Common violations and fixes: wall of options (group, highlight the recommended one); memory bridge (keep the earlier choice visible); hidden navigation (breadcrumbs, active states, progress); jargon barrier (plain language, define inline); visual noise (one primary, 2-3 secondary, rest muted); inconsistent pattern (same action, same UI); multi-task demand (sequence the steps); context switch (co-locate the information).

## 6. Personas

Walk the screen as 2-3 of these, chosen by surface type, plus 1-2 derived from the real audience (a receptionist between calls, a surgeon with gloves on, a parent on a bus).

| Persona | Red flags | Tests |
|---|---|---|
| Alex, impatient power user | Forced tutorials; no keyboard path; unskippable slow animations; one-at-a-time where batch is natural; redundant confirmations for low-risk actions | Core task under 60 seconds? Shortcuts? Skip onboarding? Esc closes dialogs? |
| Jordan, confused first-timer | Icon-only nav; jargon; no visible help; ambiguous next step; no success confirmation | First action clear in 5 seconds? Icons labelled? Help at decision points? Back and undo everywhere? |
| Sam, accessibility-dependent | Click-only interactions; missing or invisible focus; colour-only meaning; unlabelled fields and buttons; time limits; custom components breaking screen-reader flow | Full keyboard pass; screen reader announces states; 200% zoom; contrast; reduced motion |
| Riley, stress tester | Silent failures; errors exposing internals or leaving broken state; empty states with no guidance; data loss on refresh; inconsistent behaviour | 0 and 1000 items; very long text; emoji; RTL; paste from a spreadsheet; refresh mid-flow; two tabs |
| Casey, distracted mobile user | Actions at the top of the screen; no state persistence; typing where selection would do; heavy assets; tiny or close targets | Thumb zone; throttled 3G; autocomplete; 44x44pt targets; interrupted and resumed |

Selection by surface: landing or marketing -> Jordan, Riley, Casey. Dashboard or admin -> Alex, Sam. E-commerce or checkout -> Casey, Riley, Jordan. Onboarding -> Jordan, Casey. Data-heavy -> Alex, Sam. Form-heavy or wizard -> Jordan, Sam, Casey.

## 7. Specificity and emotional journey

- Specificity verdict: could an unrelated product use this screen unchanged? For app screens the cure is product substance (name and scope in the shell, the one finding under the title, words of the trade, one element only this product has), not decoration. For pages, hand the visual question to `web-design`.
- Emotional journey: find the peak (first success, the data appearing) and the end (confirmation, receipt, what next); find the valleys (waiting without information, an error at the payment step) and add reassurance at high-stakes moments. People remember the peak and the end (peak-end rule).

## 8. Implementation audit (five dimensions, 0-4 each, out of 20)

Bands: 18-20 Excellent, 14-17 Good, 10-13 Acceptable, 6-9 Poor, 0-5 Critical.

1. Accessibility: contrast under 4.5:1; reduced-motion handling (flag a global `0.01ms` kill, flashing, motion that blocks focus or reading); missing ARIA; keyboard (focus indicators, tab order, traps); semantic HTML (heading order, landmarks, divs as buttons); alt text; forms (labels, error messaging, required indicators).
2. Performance: layout thrashing; expensive animations (layout properties, unbounded blur/filter/shadow, dropped frames); missing lazy loading or unoptimised assets; `will-change` overuse; bundle size; unnecessary re-renders; unvirtualised long lists. Targets: LCP < 2.5s, INP < 200ms, CLS < 0.1; test on a low-end Android and throttled 3G.
3. Theming: hard-coded colours instead of tokens; broken dark mode; inconsistent tokens; values that do not update on theme change.
4. Responsive: fixed widths; touch targets under 44x44; broken touch on custom controls; horizontal page scroll; text scaling breaks; missing breakpoints; hover-only functions.
5. Implementation integrity: design-system drift (same button built three ways); repeated shortcuts; misleading or decorative content; structure interchangeable with an unrelated product; console errors; layout shift.

Native (iOS/Android) audit replaces the five with: Accessibility (VoiceOver/TalkBack labels and order, text scaling, targets, Reduce Motion, contrast); Performance (startup, unvirtualised lists, main-thread jank, wasted re-renders, image decoding, app weight); Appearance and theming (hard-coded colours, dark mode, Dynamic Color fallback, off-platform materials); Platform conformance (broken system gestures, inset violations, off-platform nav, web-shaped controls, icon drift); Adaptivity (stretched phone layouts on tablets, orientation, keyboard/IME, multitasking, foldables).

## 9. Report template

```
UX REVIEW: <surface> (<mode>) - <date>
Evidence: <widths/devices/engines/states exercised; what was not tested>

Health score
| # | Heuristic | 0-4 | Note |
| 1 | Visibility of system status | | |
| 2 | Match with the real world | | |
| 3 | User control and freedom | | |
| 4 | Consistency and standards | | |
| 5 | Error prevention | | |
| 6 | Recognition over recall | | |
| 7 | Flexibility and efficiency | | (n/a allowed) |
| 8 | Aesthetic and minimalist | | |
| 9 | Error recovery | | |
| 10 | Help and documentation | | (n/a allowed) |
Total: xx/40 -> <band>
Cognitive load: x/8 failed -> <low/moderate/critical>
Implementation audit (if code): A11y x/4, Perf x/4, Theming x/4, Responsive x/4, Integrity x/4 -> xx/20
Specificity verdict: <could another product use this unchanged? why>

Overall impression (2-3 sentences)

What works (2-3 bullets, specific)

Priority issues (3-7)
[P0] <what, exactly where> - <why it matters / who it blocks> - <fix>
[P1] ...
[P2] ...

Persona red flags
- Alex: ...
- Sam: ...

Minor observations (P3, brief)

Questions for the owner (2-4, concrete options, referencing findings)
- "The day's no-shows are the screen's finding; should they lead under the title, or stay in the table with a filter?"
```

For a build hand-off instead of a review: surface and mode; the screen's one question and most frequent job; states built; breakpoints and devices checked; sample data to replace; checks not run.

## 10. Feedback voice and questions

- Direct and specific: "the Save button", not "some elements"; "the supporting line starts 40px left of the headline's edge", not "alignment could be better".
- Say what is wrong and why it matters, then the fix. Cut "consider exploring".
- Prioritise ruthlessly; do not soften a P0 with three compliments.
- Questions to the owner are few (2-4), concrete, and reference specific findings with options, never "what do you think?".
- Useful prompts when stuck: "What if the primary action were more prominent?" "Does this need to feel this complex?" "What would a confident version of this screen look like?"

## 11. Fix order and when to stop

Fix in this order; later items cannot rescue earlier ones: (1) blocked tasks, data loss, misleading state, inaccessible paths; (2) missing states; (3) hierarchy and the screen's question; (4) composition (edges, gutters, holes); (5) typography and figures; (6) colour discipline; (7) detail (focus, small alignments, mobile refinements); (8) motion.

Run at most three rounds of critique -> fix the top three -> re-check. Stop early when a round finds nothing a stranger would notice. If the third round still scores below Good, say so plainly with the remaining problems listed; do not round up, and never report a fix-list score as whole-surface approval.

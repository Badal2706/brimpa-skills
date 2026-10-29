---
name: ui-ux
description: Usability and interaction design for any screen - web apps, dashboards, admin panels, SaaS products, internal tools, mobile and desktop apps, and website pages. Covers hierarchy, navigation, forms, tables and data display, loading/empty/error states, accessibility (WCAG AA), responsive and adaptive layout, UX copy, design tokens and dark mode, and structured UX critique (Nielsen heuristics scored 0-4, P0-P3 issues). Use whenever the user builds or reviews a UI, asks "is this usable", "improve the UX", "review my dashboard / form / settings page / checkout", wants a design system, tokens, dark mode, a mobile layout, skeleton loaders, empty states, better error messages or onboarding, or says a screen feels cluttered, confusing, dense, or "off" - even if they never say "UX". Also use before shipping any app screen. For the visual direction and aesthetics of marketing websites, hand off to web-design.
license: MIT
metadata:
  author: Brimpa
  version: "1.2"
  updated: "2026-10-30"
---

# UI/UX: usability, interaction and states for apps and pages

This skill makes screens usable, independent of visual style. It applies to the app a clinic's receptionist works in all day as much as to the website a patient reads once. It decides hierarchy, navigation, forms, data display, states, copy, accessibility, responsive behaviour and tokens, and it produces a structured critique when asked to review.

Visual direction (the "world" of a marketing page, type and colour choices as expression) lives in `web-design`. Brand tokens come from `brand-identity`. This skill takes those as inputs and makes the result work.

## How to run this

1. **Identify the surface and its mode.** Name the surface (landing page, settings screen, order table, checkout, onboarding, docs page, mobile list) and pick one mode from the *requested surface*, not the product: **Persuade** (visitor decides and acts), **Operate** (visitor completes a task), **Read** (visitor understands something), **Experience** (visitor is inside the work). A tool's landing page is Persuade; its dashboard is Operate; its docs are Read. Read `references/modes-and-surfaces.md` when the surface is mixed or you are unsure which rules win.
2. **Gather product truth.** Who uses it, how often, on what device, under what conditions (a nurse on a phone between patients, an accountant at a 27-inch monitor). What is the one job of this screen and what data does it show, with realistic magnitudes (a new account has 1, 6 or 9 of something, not 10,000). Ask at most 2-3 questions per round; assert your likely reading and invite correction. Never ask for CSS values.
3. **Shape before build.** Write the screen's one question ("Which deploy broke?", "Who is waiting for a reply?") and list its blocks as answers to the next questions, one line each. Delete blocks with no question. Name the most frequent job and put its control one click from the first screen. Decide the navigation model and the save model (autosave vs explicit Save) once per view.
4. **Build to the craft floor** (section below) without announcing the checklist. Use the platform's standard controls. Build every state (default, hover, focus, active, disabled, loading, empty, error, success) as you go, not afterwards. Operate screens take from the brand only type, palette, density and one signature move, never the layout or the navigation model.
5. **Critique the rendered result**, not the code: screenshots at the widths it ships at (at least 390, 768, 1440 on web; every device class on native). Score with the Nielsen 10 (0-4 each), run the cognitive-load checklist, walk it as 2-3 personas. Read `references/critique-rubric.md` for the full method and report template.
6. **Audit the implementation** when code exists: accessibility, performance, theming, responsive, integrity (5 dimensions, 0-4 each). Checks are in `references/accessibility-responsive.md`.
7. **Polish in triage order:** (1) broken or blocked tasks, data loss, misleading state, inaccessible paths; (2) missing loading/empty/error/success/disabled/permission states; (3) flow, hierarchy, responsive, design-system drift; (4) visual and motion inconsistency; (5) code cleanup. Do not perfect one corner while the rest sits below the bar.
8. **Harden:** extremes (very long and very short text, 0 and 1000+ items, emoji, RTL, large numbers), every error class (offline, timeout, 400/401/403/404/429/500), i18n expansion, concurrency (double submit, stale data). Patterns in `references/app-patterns.md`, section 12.
9. **Onboard:** first run, empty states and the path to the first real success ("aha moment"). Skippable, teaches at point of need, never a forced tour. Patterns in `references/app-patterns.md`, section 11.
10. **Report** in the format below, with every number you measured and every check you did not run named as not run.

## The craft floor

Minimum bar for any shipped UI. A pinned brief overrides it; habit does not.

**Verify on the built result**
- Contrast: body and placeholder text >= 4.5:1; large text, controls, icons and focus indicators >= 3:1. On coloured surfaces tint secondary text from that hue, never grey (grey on colour reads as washed out and usually fails contrast).
- Type: web body >= 16px (iOS Safari force-zooms focused inputs under 16px); 14px only for genuinely secondary text; interactive text never under 11px; prose measure 45-75ch; line height 1.5-1.7 for body (1.3 is the floor); headings separated from body by at least 1.25x; more space above a heading than below it.
- Spacing: tight within groups, generous between them, one documented scale on a 4px base; >= 8px (ideally 12-16px) inside bordered or coloured containers; body text never within 16px of the viewport edge (12px at <= 480px).
- States: every interactive component has default, hover, focus, active, disabled, loading, error, success; every data region has loading, empty, error. Skeletons for loading content, not spinners mid-content.
- Keyboard and focus: every action reachable by keyboard, visible `:focus-visible` ring, logical tab order, no traps, Esc closes overlays, focus returns to the trigger.
- Overlays escape clipping ancestors (`<dialog>`, the popover API, `position: fixed`, or a portal). An absolutely positioned menu inside `overflow: hidden` gets cut off.
- Motion: 100-150ms for immediate feedback, 150-300ms routine state change, 300-500ms layout/overlay/view transition; exit faster than entrance; natural deceleration such as `cubic-bezier(0.16, 1, 0.3, 1)`, never bounce or elastic by reflex; a `prefers-reduced-motion` path that keeps meaning (remove spatial movement, keep opacity and state changes), not a global `0.01ms` kill.
- Browser surfaces themed from the palette: text selection, caret, focus ring, scrollbars, underline offset, tabular numerals. Defaults belonging to no design system are the cheapest signal that a page was assembled rather than built.
- Copy: controls name their action; errors name the problem and the recovery; the product's own words, not the template's ("Patients", not "Items").
- Real content at every breakpoint; flex and grid children get `min-width: 0` so long tokens cannot blow the layout.

**Refuse by default** (the brief's own words can earn any of them)
- A modal for a task that needs neither interruption nor protected focus; exhaust inline and progressive alternatives first.
- Placeholders standing in for labels; floating labels on dense forms.
- Icon-only navigation without labels or accessible names; emoji or Unicode glyphs standing in for an icon system.
- Cards nested in cards; a hairline border plus a wide soft shadow on the same card (declare elevation once: border or shadow).
- Colour as the only channel for status, selection or error.
- Hover as the only way to reach a function (touch has no hover).
- Fixed-width buttons sized to English labels (`w-24`); use padding so German fits.
- Disabled controls faded to illegibility (the 1.4:1 grey Save button); disabled still reads and, where possible, says why.
- Confirmation buttons labelled Yes/No/OK/Submit; confirmation names the action and the object ("Delete 3 photos").
- Fake progress, invented proof, lorem ipsum, "Acme", "John Doe", round vanity totals, totals that do not add up.

## Twelve rules for app screens (Operate)

Drawn from measured product screens (a 2026 study of 23 real desktop product screens) plus tested house rules; numbers are medians unless stated. Full detail in `references/app-patterns.md`.

1. **The biggest thing answers the screen's one question.** Largest block, largest figure, first in reading order. A screen whose finding sits in a 14px caption at the bottom of a card reads as flat.
2. **Everything the brief names shows its header and first rows on the first screen** (1440x900). Cap overview lists at 4-6 rows with "View all"; time-sensitive blocks (bills due, failed deploy, SLA breach) come before long tables.
3. **The most frequent job is one click away:** a primary button in the title row, an action on the row that needs it. A screen with no control for its main job is a report, not a tool. One filled primary per screen, usually near-black; 12 of 23 studied screens have none.
4. **Noun title at 24px/600, not a greeting;** no hero header, no emoji, no figure at 48px or more on an app screen. One optional grey second line about the data (the finding, the period), never about the interface.
5. **Colour goes on data, status and the one primary action, not chrome.** The sidebar sits on the page ground (0 of 17 light screens had a dark or saturated sidebar); active nav item is a neutral grey pill, or brighter text on dark. Coloured pixels about 3% of the screen.
6. **KPIs are type, not tiles:** label over value, value 24-30px at 400-600 (about 1.7x the label), one container split by 1px dividers. No icon in a coloured circle, no sparkline (0 of 23). The lead figure is at least 1.3x its siblings. Deltas 12-14px with the window in words ("vs prior 30 days"); colour says *good or bad*, not up or down (a rise in errors is negative); zero or undefined change is grey ("+4 (new)").
7. **Tables are rules and alignment:** 12px grey sentence-case headers, no header band, no zebra; numbers right-aligned in tabular figures with fixed decimals per metric and thousands separators; identity column widest and never the one truncated; one status mark per row; one action column only when most rows carry it; "1-50 of 1,284" with the header kept in view on full list screens; no pagination under a 5-row overview.
8. **One chart answers one question with one series and one hue;** 3-5 faint horizontal gridlines, no y-axis line, round even ticks with the top tick above the maximum, flat x labels never rotated, straight segments (smoothing invents values), no legend for a single series, legends list only series with data, every swatch is the mark it explains. Annotate the spike that matters with its cause. Draw empty charts (zero line, missing bars), never a "No data" picture.
9. **States are honest:** a real zero prints as "0" / "$0"; missing is a grey dash at caption size; counts recompute per filter; an empty section keeps its frame and header plus one sentence and the first action; loading is the final layout with grey bars at each value's real size, no layout shift when data lands; errors stay inside the block that failed with what failed, when the data was last good and Retry.
10. **Density is three settings moved together:** row pitch, padding and type size. Sparse (homes, settings): rows 56-92px, body 14-16px. Medium (analytics, lists): rows 44-56px. Dense (monitoring, long sessions): 13px body, 28-42px rows, with generous outer air. Never shrink the type and keep the padding.
11. **The grid's arithmetic closes:** one gutter value, one left edge from title to last row, cards in a row share a bottom edge, column count chosen from the item count (four KPIs get four columns; a lone card spans). A card stretched over a blank band and an orphan cell beside 800px of nothing are the commonest failures.
12. **The product has a face:** its mark and name at the top of the shell, the scope (workspace, clinic, project) as a switcher or breadcrumb, words of the trade in labels and empty states ("Waiting on the patient", "Due on the 28th"), one element only this product has. A screen whose product cannot be named from the screenshot is a template.

## Eight rules for pages (Persuade / Read)

1. A stranger can say in 5 seconds what this is, who it is for and what to do next, from the first screen, with the title in the one `h1`.
2. One primary action as a real button on the first screen, named for what it does ("Book a consultation", not "Submit" or "Learn more"); a second action is a text link. One or two actions per screen or section in total: five equal calls to action freeze the visitor (decision fatigue) and the page converts to nothing. The flow's last step (the booking form, the pay button) defines the memory of the visit; test it first, on a phone, and make its confirmation a deliberate peak.
3. Every headline fits two lines at every width (about 32 characters survives a phone at a confident size); the detail goes to a one-sentence supporting line of at most about 22 words.
4. Reading column 45-75ch at >= 16px, left-aligned by default, running text in full ink (soft grey body reads unfinished); centre at most one moment.
5. Equal outer margins at every width; no blank stretch taller than about half a screen; no section huddled in one half with the other half empty.
6. Every section the visitor came for has its own heading and a place in the nav; no section without a claim and its proof. Never invent proof (customers, quotes, reviews, counts, logos).
7. Read mode: the frame (masthead, rail, section openers, code and table setting) can carry character; the reading column stays calm; wayfinding (where am I, where next) survives every step; monospace only for code.
8. Important notices styled like content, not like ads (banner blindness); important things that look like promos get skipped.

## States checklist (every screen)

| State | Must show | Must not |
|---|---|---|
| Loading | Final layout as skeleton at real sizes; label the operation; determinate progress when known; when work is long, the real named steps as they run ("Comparing 212 fares..."); keep old values on refresh | Spinner mid-content; shimmer that shifts layout; invented progress, steps or pauses |
| Empty, first use | What will be here, why it matters, the first action, optional template | Illustration with "No data yet" and no action |
| Empty, user cleared / no results | Light touch; "No results for X", suggest a different query, clear filters | Treating it as first use |
| No permission | Why, and how to get access | A blank screen or a 403 code |
| Error | What failed, when data was last good, Retry; inside the block that failed; preserve user input | Full-screen banner for one failed block; internal codes as the message; wiped forms |
| Success | Confirm the outcome in the action's own word ("Published") ; next step only if it changes what to do | Celebration for a routine save |
| Disabled | Still legible (>= 3:1), says why when not obvious | Opacity faded past readability |
| Stale | Freshness stamp with refresh | Silent old data |

Status-code mapping: 400 validation, 401 sign in, 403 permission, 404 not found, 429 slow down with when to retry, 500 generic plus a support path.

## Forms essentials

- Persistent label above (or beside) the field, 14px/500; placeholders are examples. Required marked consistently (text "(required)" or asterisk explained once); if most fields are required, mark the optional ones instead.
- Correct `type` and `inputmode` (email, tel, numeric) and `autocomplete` tokens (`given-name`, `postal-code`, `one-time-code`); allow paste and password managers everywhere, including OTP and password fields.
- Validate on blur for most fields, on input only after a first error; errors below the field, specific ("Email is missing @", not "Invalid input"), linked with `aria-describedby`, `aria-invalid="true"`; on failed submit put a focusable error summary at the top and move focus to it.
- Both client-side and server-side validation. Preserve input on every error. Disable the submit while in flight (prevents double submit) and show the result.
- Shrink the task: fill in what you already know (postcode lookup, saved addresses, prior values), selection over typing on mobile, smart defaults. A 30-key address becomes 7 keys with a postcode lookup.
- Fewer options up front, grouped, with a recommended choice; a 24-option grid converts worse than 6 (jam study, 3% vs 30%).
- Destructive actions: name object and consequence, prefer undo over confirmation when recovery is safe, confirmation button names the action. Autosave or draft recovery for anything long.
- Multi-step: show "Step 2 of 4", allow Back without loss, keep context visible so nothing must be remembered from the previous step.

## Data display essentials

- Numbers: tabular figures (`font-variant-numeric: tabular-nums`; check the face actually has them), right-aligned in columns, fixed decimals per metric (money 2, percent 1-2, counts 0), thousands separators, a sign on every change, units as a smaller grey suffix, no space after a currency sign. Dates ISO and right-aligned when compared, relative ("Today", "6 days") for recency. IDs in monospace truncated to about 8 characters with a copy control.
- Choose the form from the question: trend over time = line; compare categories = sorted bars; part of whole (<= 5 parts) = thin ring or 100% stacked bar; distance to target = progress bar with both ends labelled at the true ratio; drift from target per part = bullet; how much of a plan = plan track with overrun past the end; few numbers = no chart at all.
- Dashboards: the answer figure leads; evidence beside the answer (a spike annotated with its cause beats a second chart); a forecast is dashed and labelled; short histories drawn honestly; red is a signal, not a texture (one red mark per object).
- Status pills: pale tint with dark text of the same hue, 11-12px minimum, one per row; saturated fill with white text only for the one call to action and only while it is rare.
- Tables on phones become two-line rows below about 640px (identity and key number on line 1, the other fields in 13px grey on line 2, one action at right); a table that must stay a table scrolls inside its own frame with the first column fixed; the page never scrolls sideways.

## Navigation patterns per platform

| Platform | Top level | Hierarchy | Self-contained task | Notes |
|---|---|---|---|---|
| Web app, desktop width | Labelled sidebar 224-240px (rows 32px on 34px pitch) or top bar + side nav; <= 5-7 top-level items | Breadcrumbs for 3+ levels; tabs within a view; URL updates on every view and state change | Inline or side panel first; dialog only for interruption | Icon rail only when the product has <= 5 destinations and needs the width, always with tooltips and accessible names; nav items are other screens, never anchors into one long page |
| Web app, phone | 48px top bar with the screen name and a menu opening a full sheet, or bottom bar of 4-5 destinations with short labels | Push detail, Back returns to the list at its scroll position | Bottom sheet instead of dropdown | Actions at the bottom of the thumb zone; one row of filter chips above a list |
| iOS | Tab bar, 2-5 sections (sections, never actions) | Navigation stack, large title collapsing to inline | Sheet, Cancel/Done, swipe-to-dismiss unless data loss | Edge-swipe back never disabled; safe-area insets; 44x44pt targets; Dynamic Type |
| Android | Navigation bar 3-5 destinations on compact width, rail or drawer on expanded | System and predictive Back always work | Bottom sheet, dialog only for interrupting decisions | Edge-to-edge with window insets; 48x48dp targets with 8dp between; sp units |
| Desktop app | Sidebar or toolbar plus menus; keyboard shortcuts and a command palette for power users | Breadcrumbs or tabs | Panels and inspectors over modals | Hover info, context menus, drag and drop, multi-select are expected |

Show location always: active state, breadcrumbs, step indicator. Cross-platform apps still owe each platform its idioms (a Material app on iPhone still owes safe areas, Reduce Motion and edge-swipe back).

## Accessibility floor (WCAG 2.2 AA)

Contrast 4.5:1 text / 3:1 large text, controls, icons, focus indicators. Semantic HTML (buttons are `<button>`, headings in order, landmarks). Every input labelled; icon-only controls have `aria-label`. Keyboard: everything operable, visible focus ring at least a 2px perimeter with 3:1 against adjacent colours, focus never hidden under sticky bars (`scroll-padding-top`), skip link. Dynamic changes announced (`aria-live="polite"` for status, `role="alert"` for errors; one atomic message such as "3 items in cart"). Targets >= 24x24 CSS px on web (44pt iOS, 48dp Android). Drag actions have a non-drag alternative. Works at 200% zoom and with text spacing increased. Colour never the only channel. Time limits extendable. Reduced motion honoured. Authentication allows password managers and paste; offers passkeys or OAuth. Details, testing tools and native specifics in `references/accessibility-responsive.md`.

## Responsive and adaptive floor

Mobile-first with `min-width` queries; content-driven breakpoints (three usually suffice: 640/768/1024); test at 320, 375, 414, 768, 1024, 1440. Detect input, not screen size: `@media (hover: hover) and (pointer: fine)` for hover affordances; never rely on hover for a function. Safe areas: `viewport-fit=cover` plus `padding: max(1rem, env(safe-area-inset-bottom))`. Use `dvh`, not `vh`, for full-height layouts on mobile. Adaptation restructures (collapse sidebar, table to rows, master-detail to push) rather than scaling pixels. Emulators miss touch, CPU, fonts and browser chrome: test on at least one real iPhone and one real Android; name what produced the evidence (emulated viewport, which engine; Chromium is not Safari). The "Mobile View - Mobile Simulator & Preview" Chrome extension previews several device frames beside the desktop view and is a quick first pass, not a substitute for devices.

## UX copy rules

Specific verb plus object on every control ("Save changes", "Delete 3 photos"); the same noun and verb for the same concept everywhere ("Publish" then "Published"). Errors answer what failed, why when known, how to recover; no internal codes as the primary message; no apology theatre; no jokes near loss, money, privacy or blocked work. Empty states invite the first action. Helper text answers an implicit question rather than restating the label. Sentence case, active voice, plain words the audience knows, complete translatable strings (no concatenated fragments, real plural rules). Name things by what users understand, not how the system is built ("notifications", not "webhook config"). Full guidance and banned patterns in `references/ux-copy.md`.

## Design tokens (summary)

Three layers: primitives (`--color-blue-600`, `--space-4`) -> semantic (`--color-primary`, `--color-border`, `--spacing-section`) -> component (`--button-bg`, `--input-focus-ring`). Components consume semantic or component tokens, never primitives. Dark mode overrides semantic tokens only; it is designed (surface elevation by lightness, reduced chroma, contrast re-checked), never inverted. Naming `--{category}-{item}-{variant}-{state}`. Read `references/design-tokens.md` when creating or auditing a token system, wiring tokens to Tailwind or CSS variables, or adding dark mode.

## UX laws (quick index)

Hick (fewer, grouped choices), Fitts (big, close targets; edges and corners), Miller/Cowan (<= 4 items per chunk in working memory), Jakob (users expect your app to work like the ones they already use; convention beats ergonomics for where the menu lives), Tesler (complexity moves to the system, not the user), Doherty (respond within 400ms or show progress), Peak-end (design the peak and the ending), Zeigarnik (unfinished steps nag: show progress), Von Restorff (one thing stands out only if everything else does not), Aesthetic-usability (polish buys patience, not forgiveness for broken flows), Figure-ground (dim what's behind the focus, about 70% backdrop), Banner blindness (don't make important things look like ads), Parkinson (fill in what you already know), Choice overload (fewer options up front), Labor illusion (name the real steps of a long wait, never invented ones). Each with a rule and an example in `references/ux-laws.md`.

## Report / output format

For a critique or audit, produce exactly this:

```
UX REVIEW: <surface> (<mode>) - <date>
Evidence: <screenshots at widths / devices / what was not tested>

Health score
| Heuristic | 0-4 | Note |
| 1 Visibility of status | | |
| ... (all 10; n/a allowed on Persuade/Read for 7 and 10) | | |
Total: xx/40 -> band (36-40 Excellent, 28-35 Good, 20-27 Acceptable, 12-19 Poor, 0-11 Critical)
Cognitive load: x/8 checks failed (0-1 low, 2-3 moderate, 4+ critical)
Specificity verdict: could another product use this screen unchanged? yes/no, why

What works (2-3)
Priority issues (3-7), each:
  [P0|P1|P2|P3] <what, where> - why it matters - fix
Persona red flags (2-3 personas)
Minor observations
Questions for the owner (2-4, concrete options)
```

P0 blocks task completion (fix now); P1 significant difficulty or a WCAG AA failure (fix before release); P2 has a workaround (next pass); P3 polish. "Would a user contact support about this?" means at least P1. Be direct: "the Save button", not "some elements"; say what is wrong and why it matters; no "consider exploring".

For a build, report: surface and mode; the screen's one question and most frequent job; states built; breakpoints and devices checked; sample data that must be replaced; checks not run.

## Worked examples

- **"Review my clinic admin's appointments page."** Operate. Screenshots at 390/768/1440. Finding: the day's no-shows (the screen's finding) sit in a grey caption; the primary action "New appointment" is in a kebab; status is colour-only; table has zebra and uppercase headers; no empty state for a day with no bookings. Report: 24/40 Acceptable; P0 none; P1 colour-only status, kebab-buried primary action, no error state when the schedule fails to load; P2 zebra and headers, left-aligned times; P3 greeting with emoji. Fixes in that order.
- **"Build a settings page for our SaaS."** Operate. One view per area (General, Members, Billing, Notifications), each with the area name as the `h1`; label column beside a panel; one save model per view (autosave with a quiet "Saved" stamp, or one Save per panel); a preview of what each setting produces (the invite email as it will arrive); destructive actions last in their own section with the consequence in words and a confirmation naming the object; disabled plan-gated controls stay legible with the reason.
- **"Our checkout form drops people."** Persuade/Operate boundary. Shrink the task: postcode lookup, `autocomplete` tokens, saved addresses, selection over typing, mobile keyboards via `inputmode`; show total and steps ("Step 2 of 3") so nothing is a surprise; inline specific errors that keep the input; one primary button named "Pay 1,200" with the amount; guest checkout before account creation. Measure with the five-second test and the keystroke count before and after.
- **"Make the dashboard look less generic."** Hand the visual world to `web-design` only if it is a marketing surface; for the app itself the fix is product substance, not style: name the product and scope in the shell, put the one finding under the title, move colour off the chrome onto the main data element, replace four icon tiles with one divided KPI strip, choose density to match an eight-hour session, use the words of the trade in labels.

## Anti-patterns / refuse

- Shipping a screen that only works with full data; a screen is half built until empty, loading and error exist.
- A modal as the first thought; a confirmation dialog for every low-risk action (use undo).
- Forced tours, unskippable onboarding, tooltips re-shown to returning users.
- Scroll-jacking, parallax or auto-rotating carousels without controls; auto-play with sound.
- Icon-only toolbars with no labels; custom scrollbars and reinvented form controls; a web app's navigation ported to a native app.
- Dark mode as a mechanical inversion; status colour on a zero change; red as texture.
- Inventing proof, statistics, customers or progress. Illustrative data is labelled as such.
- Claiming a check (device test, screen reader pass, contrast) you did not run.

## When the user pushes back

- "Just make it pretty, skip the states": build the states anyway, they are most of the usability; offer to do them after the primary path if time is short, and list them as open in the report.
- "Our users are power users, they don't need labels": power users want speed, which means keyboard shortcuts, bulk actions and density, not ambiguity; keep labels, add shortcuts.
- "The brand wants the sidebar in brand purple": the brief wins on colour, but keep the active state, contrast (4.5:1 on the purple) and state colours working; show the cost in a side-by-side.
- "Accessibility later": the floor items (labels, focus, contrast, keyboard) cost minutes now and days later; do them now and defer only the enhanced items.

## Reference files

- `references/modes-and-surfaces.md` - read when deciding Persuade/Operate/Read/Experience for a surface, or when a product site and an app screen share one request.
- `references/app-patterns.md` - read when building or reviewing any app screen: shells, tables, long lists and virtualisation, filters, bulk actions, forms, file uploads, wizards, dashboards, settings, states, offline queues, permissions, notifications, onboarding, keyboard, density, AI features.
- `references/ux-laws.md` - read when you need the reason behind a rule or an example to show a stakeholder.
- `references/critique-rubric.md` - read before any UX review: Nielsen check-for lists, scoring, cognitive-load checklist, personas, report template.
- `references/accessibility-responsive.md` - read when auditing or implementing accessibility, responsive or native adaptation, and for the testing tools.
- `references/design-tokens.md` - read when creating or auditing tokens, dark mode, or wiring tokens to Tailwind/CSS/native.
- `references/ux-copy.md` - read when writing or rewriting interface text, errors, empty states and CTAs.
- `references/sources.md` - attribution for the material this skill draws on.

Hand-offs: `web-design` for visual direction of marketing pages; `brand-identity` for brand tokens and voice; `security-review` for anything in an auth, payment or permissions flow beyond its usability; `llm-app-security` for the safety side of AI features whose UI you design here; `seo-geo-audit` when a Read or Persuade page also needs to rank.

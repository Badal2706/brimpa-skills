# App patterns: the Operate world

Patterns for screens people work in: dashboards, admin, analytics, settings, inboxes, lists, detail pages, builders, wallets. Measurements marked "study" come from a 2026 study of 23 real desktop product screens (1440-1512px wide; 17 light, 6 dark) and are medians unless stated; "house rule" marks guidance from testing beyond that study.

## Contents

1. The run for an app screen
2. Shells and navigation
3. Page title, filters, date range
4. KPIs and deltas
5. Charts
6. Tables and lists
7. Filters, search, bulk actions, selection
8. Forms, wizards and settings
9. Dashboards: composition and density
10. States: empty, zero, loading, error, stale
11. Onboarding and activation
12. Hardening: errors, concurrency, extremes, i18n
13. Permissions UI
14. Notifications, toasts, banners
15. Keyboard and power-user features
16. Overlays: dialogs, sheets, popovers, drawers
17. AI features in product UI
18. Phone and tablet adaptation of app screens
19. Tells of generated dashboards

## 1. The run for an app screen

1. **Inventory the data and the jobs** (8-12 lines): the objects and their fields with units; realistic magnitudes (how many, typical amounts, ranges, how values move over a day/month/year, how small a new account really is); the people (who opens it, how often, on what device); the jobs (approve, reply, pay, ship, invite) and which comes up most; the product's own things (name, mark, scope, the people in it, objects recognised by sight).
2. **Write the data itself** as a small JSON/JS file the screen renders from: believable names, amounts that add up, dates in order, a unit on every figure, totals computed from rows never typed separately. A fact shown twice is one variable. Every relative figure names its baseline in the same phrase ("45 m earlier than last Sunday"). Add assertions for figures that must agree and read the console.
3. **Name the screen's one question** ("Did today's sales come in?") and its **one finding** (the fact that most needs attention). The question decides what is biggest, what comes first and what is left out. Put the finding where it is read first (the line under the title or the subline of the headline figure), next to the action it drives.
4. **List the blocks** as answers to the next questions, one line each; delete any block without a question. Everything the brief names shows its header and first rows on the first screen at 1440x900. The most frequent job is one click away. Show the evidence beside the answer.
5. **Build the shell first, empty**, at 1440 and 390: sidebar or rail, top bar if any, canvas and gutters, title row. Write the grid arithmetic in a comment (columns, gutter, the sum that lands cards on the canvas edges).
6. **Put in the data**, formatted per section 6.4, charts drawn to section 5, labels in the product's words. No placeholder data.
7. **Build the states** (section 10) for every block and every row and control. A screen that only works with full data is half built.
8. **Check and critique** the screenshots at 1440, 768 and 390 with the seven questions in section 9.3; fix the worst three; at most three rounds.
9. **Report**: each screen's one question, the face and signature element, sample data to replace, checks allowed and why.

App screens have no motion floor. Motion is feedback (press, hover, focus, a menu opening, a row arriving); nothing performs an entrance.

## 2. Shells and navigation

### 2.1 Shell archetypes (study)

| Shell | What it is | Use for |
|---|---|---|
| Open plane | Labelled sidebar on the page ground, no top bar; canvas fluid with 24-64px gutter or a centred column | Most tools |
| Tinted frame, white sheet | Sidebar and top bar share one tinted ground (#f6f6f6-#f9fbfc); the page on a white sheet inset 8px, radius 10-16, 1px edge, no shadow | B2B analytics, developer platforms |
| Ruled T-frame | 210-240px sidebar and 64px top bar on one ground, divided by 1px rules; workspace switcher at the bar's right end | Dark tools, monitoring |
| Icon rail | 50-60px rail, 15-18px icons on a 34-49px pitch, saves about 180px | Only with <= 5 destinations and a need for width; tooltip and accessible name on every icon |
| No sidebar | 46-48px top bar over a centred 1088-1208px column | Reports, viewers, products with few destinations |

No studied light screen puts a dark or saturated sidebar against a light canvas. Dark screens use one ground everywhere, divided by 1px rules of #161616-#232323 or nothing.

### 2.2 Sidebar (study)

- Width 224-240px (range 210-292). Rows: 32px hit area on a 34px pitch (roomy: 40-52px on 42-60px). Icons 16px outline at about 1.5px stroke; labels 14px/400 in ink or #4b4d4f-#63666e, 8-10px after the icon.
- Active item: neutral grey pill (radius 8, fill about #e9e9e9-#ededed, inset 8-14px) on light; brightness alone on dark (#bbb -> #fff). A coloured left bar appeared once in 23.
- Groups: sentence-case grey labels at 12-13px (never uppercase) or hairlines; utilities (settings, help) pushed to the bottom; workspace switcher at the top; user row at the bottom.
- House rules: the product's mark and name at the top, the scope as a switcher or breadcrumb. Counts only on queues that need action, with the noun clear ("Requests 5"). Labels by default. Nav items are other screens, never anchors into one long page. Settings spanning areas open one view per area with the area's name as `h1`.

### 2.3 Top bar

Default none (9 of 23 have none). If present, 44-51px on light chrome or 64px with a rule, and it holds something real: search (about 548x32 centred, with a shortcut hint), the workspace switcher, or the page or object name. A top bar left mostly empty is a defect.

### 2.4 Right rail, pinned columns, floating buttons

A right rail (fixed 384px in a `1fr 384px` grid, 24px gap) only for a stable secondary stream (recent items, details of the selected object). A pinned left column to keep a total in view. No floating button unless it is the screen's one primary action and covers nothing at any width.

### 2.5 Wayfinding

Active state always visible; breadcrumbs for 3+ levels; URL updates on every view and state change (deep linking, shareable filters); browser and system Back restore the previous view and scroll position; sticky headers offset by `scroll-padding-top` so anchored focus is not hidden.

## 3. Page title, filters, date range

- One `h1` per screen: a noun ("Analytics", "Overview", the object's name) at 24px/600-700 (study range 18-48). When a breadcrumb names the page, its last item is the `h1` at 16px.
- Optional second line: one 14-16px grey sentence about the data (the finding, the period, the scope), never about the interface.
- Right of the title: real actions only; a freshness stamp ("Updated 09:14", with refresh) when data is periodic. One filled primary per screen, usually near-black; secondary white with a 1px border; tertiary text.
- Date range at page level or per card, never both. Scope controls on the left (date first, then filters), utility and refresh on the right. Control height in title and filter rows 32-36px; one height per row.
- Underline tabs sit on a full-width 1px rule, indicator 2px. A segmented control is as wide as its options; full width only below about 480px.
- 24px from the title row to the first card.

## 4. KPIs and deltas

- Default: one container split by 1px dividers into equal columns; label (12-14px grey, sentence case) above value (24-30px, 400-600; bold for money only); value about 1.7x the label. Or no KPI row at all, each headline number in the card that explains it.
- Count matches the grid (four KPIs, four columns). Nothing at 48px or above. No icon in a coloured circle, no sparkline, no tinted tile. Units as a smaller grey suffix. An info icon beside the label is fine.
- The answer figure leads: 30-36px and at least 1.3x its siblings. One figure, one place: do not repeat a KPI in a legend or as a panel title.
- KPIs may double as chart series tabs or list filters: the selected one carries a 2px rule or active fill; the others keep an ink value (grey reads as disabled).
- Deltas: optional; 12-14px, never larger than the label; the window in words ("vs prior 30 days"); colour only the number or set the whole delta grey; colour says good or bad (latency, errors, cost, churn and time-to-reply are better when they fall); zero or undefined change is grey ("+4 (new)", a short grey dash); never ">999%" or a green "+0".

## 5. Charts

### 5.1 Which form for which question

| Question | Form |
|---|---|
| Is it moving over time? | One line; area fill of 15% or less if any |
| How much per period? | Columns, square corners (or 4px top radius) |
| How is it distributed? | Histogram with equal bins |
| Who ranks? | Sorted horizontal bar list |
| What share? | Thin ring or 100% stacked bar with 2px seams, <= 5 parts, total in the centre or beside |
| How far to target? | Progress bar, both ends labelled, fill at the true ratio, no stub at zero |
| How much of the plan is used? | Plan track: spent filled, committed lighter, overrun past the end in the negative colour |
| Drift from target per part? | Bullet: bar with a 1px tick at the target |
| Where? | Map with a list beside it carrying the magnitudes |
| Which way did it flow? | Diverging columns above and below one zero line, axis signed and captioned |
| Who is away when? | Timeline of people by day, each kind of booking its own mark |
| Few numbers | No chart; the numbers, and "View more" |

A forecast is dashed after today with the end value labelled. A flat series with one event gets at most two-thirds width and about 140px height, or a capped range with the off-scale peak labelled. Do not give one point the screen's largest plot.

### 5.2 Axes, gridlines, marks (study)

- One series per chart is the norm, three the most; switch metrics with a control instead of overlaying lines. Plots about 195px tall, aspect 1.8-5.2.
- Gridlines horizontal only, 3-5, 1px solid about #e5e5e5 on light, #2b2b2b on #111. No y-axis line; the baseline is the one heavier line. Dashed lines only in chart grids and empty slots.
- Y ticks 4-7 at 12px grey, round even steps, top tick above the maximum, integers for counts, zero as baseline for bars and counts. Never without a scale. Axis text no larger than the data.
- X labels 4-8, flat, never rotated, first and last pulled inside the plot, one regular step that lands on the end; time on a time scale, not a categorical axis.
- Lines 2px straight segments; no markers except a hover dot. Bars square-cornered; stacked segments split by a 1-2px seam.
- One hue per chart; the accent on the screen's main data element; neutrals for the rest; one subject keeps one hue across the screen; more than four hues on a screen is a defect. Status colours are for status.
- Legends: none for a single series; otherwise <= 5 items as dot plus 12-14px grey label in the card header, or a small table (dot, name, value, change); only series with data; every swatch is the mark it explains, scaled down.
- Rings only for 3-5 parts not already listed beside them; thin strokes (3-8px); no slice labels.
- Tooltips: plain text or a plain box, label and value on one line.
- Annotate the event that matters: a 1px marker and 12px label naming the cause ("Deploy a3f09c1"); reference lines (budget, SLO) 1px dashed with the label at the end. Labels never collide; lay them out after fonts load.
- Short and empty histories drawn honestly: flat zero line, missing bars for empty periods, no padded range, no "No data" picture.
- Colour is never the only code in data: lightness, shape, label, pattern or position also carry it; check with a deficiency simulator.

## 6. Tables and lists

### 6.1 Rows (study)

Single-line data rows about 45px (36-53); two-line rows with media about 72px (media height plus 24-32px); key-value rows 21-32px. Line 2 of a two-line cell sits about 21px below, one size smaller, grey; two-line labels need at least a 40-44px pitch. Overview lists show 2-5 rows.

### 6.2 Header

12px, regular weight, grey, sentence case; no fill band; a rule under it only as the strongest line in the table; header row 36-40px. Numeric headers right-aligned and flush with their values. A sort glyph on the active column only. Keep the header in view while a long table scrolls (`position: sticky; top: 0`).

### 6.3 Dividers

No zebra. Either no row dividers (rely on pitch or 2-8px gaps between filled rows) or 1px rules 3-7% darker than the surface (#ededed-#f4f4f4 on white; #161616 on #000). One extent per screen.

### 6.4 Figures and alignment

- Numbers right-aligned in tabular figures; fixed decimals per metric (money 2, percent 1-2, counts 0); thousands separators; abbreviate only in capacity lines ("12.7k of 20.0k"); a sign on every change; no space after a currency sign.
- Identity column widest (a third to a half) and never the one cut off; shorten names editorially (drop the shared issuer, "Ltd") and use the same short name at every width.
- One right edge per row or card. Two measures stack in one cell (count over its percentage, date over time) on one right edge.
- Dates ISO and right-aligned when compared; relative words for recency. IDs monospace, truncated to about 8 characters with an ellipsis and a copy control 12px after.
- Truncate to one line with an ellipsis, never break inside a word; essential text is wrapped, stacked, resized or given a visible full-detail path rather than truncated away.
- An edited cell shows that it changed (a dot or tinted border) and the baseline is named.

### 6.5 Ink, status, media, actions

- Only the identity and the key number get primary ink; the rest grey. Missing value: grey dash. Real zero: printed. The sign lives in the text, not the colour; no red on every negative.
- Status pills 16-24px tall, text 11-12px/500, a pale tint with dark text of the same hue (positive #dcfae5/#04250e, negative #ffedea/#831c1e, notice #fffbeb with #fde68a border and #92400e text); neutral states as monochrome chips with a glyph; one status mark per row; `flex: none; white-space: nowrap` so a chip is never squeezed. A saturated fill with white text only for the one call to action and only while under about a fifth of visible rows carry it.
- Media: 16px logos in dense rows; 24-32px avatars; one fixed media slot so text starts on one edge; circles for people, small radius for artwork.
- Row actions: none, or one kebab at the far right; a trailing action column only when most rows carry the action; when a row needs doing, its action is a visible ghost button or ink text action in one fixed trailing column at the same pitch for every row. Hover and selected: a 1px outline at 6px radius, or in a list that drives a detail pane the `--active` fill of the nav pill so it cannot be confused with focus.
- Overview lists: no pagination; cap rows, "View all", state the total. Full list screens: total above the table, header kept in view, page or load more with the range shown ("1-50 of 1,284"); virtualise past a few hundred rows.
- Lists that carry data: row fill as the bar only in one-figure ranking lists; inline bars thin and grey unless they are the main series; a key-value well for details; a feed as row cards with a relative date on the right.

## 7. Filters, search, bulk actions, selection

- Filters read as a sentence in one row ("Date | Jun 14 - Jul 13 | Daily"); scope on the left; applied filters visible as removable chips with a "Clear all"; counts (tabs, "12 open") recompute from the current view. Filters live in the URL.
- Search: one box, 30-36px, shortcut hint, predictions as the user types (debounced about 300ms), "No results for X" with suggestions and a clear-filters action; never a blank table.
- Selection: checkboxes only where bulk actions exist (18px, 2px stroke, 3px radius); select-all selects the visible page and offers "Select all 1,284"; a selection bar replaces the toolbar with the count and the actions ("3 selected: Approve, Assign, Export"), Esc clears.
- Bulk actions name the count and the consequence ("Approve 3 that fit"); long operations show determinate progress and partial results ("2 of 3 approved; 1 failed: no slot free"); undo where safe.
- Sorting on one column at a time by default; a sort glyph on the active column only; sort and filter state persisted per user per view.
- Saved views (filter plus sort plus columns) for lists used daily; column chooser and density toggle for power users.

## 8. Forms, wizards and settings

### 8.1 Fields (study plus house rules)

- Label above the field, 14px/500, 8-10px gap; no floating labels; placeholders as examples only.
- Inputs 38-40px tall in forms (radius 6-10); filter and toolbar controls 32px; one control height per context. Inputs white with a 1px #e5e7eb border even on grey panels; a leading icon at 14px.
- Spacing: 24px from a description to the first label; 16px between fields; 16px to the Save button. Related short fields (postcode and city) may share a row; otherwise one column, because a two-column form breaks the reading order and the tab order.
- Joined input and action (read-only link plus Copy) share one border.
- Toggles 28x16 to 33x20; the on colour is a semantic green or near-black, not the brand accent; a toggle applies immediately (otherwise use a checkbox and Save).
- Disabled controls stay legible and say why (a plan-locked panel stays readable with a strip above it; a 30% opacity wash is a defect).
- Constrain input in markup: `type`, `inputmode`, `autocomplete`, `maxlength`, `pattern`, `min`/`max`, `required`; pickers and selects over free text where values are finite; selection over typing on mobile.
- Validate on blur; on input only after a first error; errors below the field linked via `aria-describedby` and `aria-invalid`; a focusable error summary at the top after a failed submit with links to each field; never block submission while a hint could do; preserve input.
- Submit: disable while in flight, show loading in place, then the result; keep the button label while loading ("Saving...").
- Password: show/hide toggle, paste allowed, password managers allowed, the rules shown before typing and ticked as met; passkeys or OAuth offered.

### 8.2 Wizards

- Only when steps are genuinely sequential or long; otherwise one page with sections.
- "Step 2 of 4" with step names; Back never loses input; the context chosen earlier stays visible; a review step before anything irreversible; save-and-exit for long flows; the primary button names the next step ("Next: payment") and the last names the outcome ("Place order").
- Each step one decision or one group of related fields; progress at its true ratio.
- The last step is the memory (peak-end): the final form, the pay button and the confirmation decide how the whole flow is remembered. Test the final step first on a phone and on desktop; its confirmation names what was received and what happens next and when ("Order 1042 confirmed. Ships Tuesday; tracking by email.").

### 8.3 Settings

- One view per area (General, Members, Billing, Notifications), each with the area's name as `h1`; never one long page scroll-spied from the sidebar.
- Layout: a label column (about 450px: 16px/500 title and 14px grey description) beside a panel (about 700px, tinted #fafafa, radius 16, padding 16, no border, no shadow); sections split by a full-width 1px rule with 32px above and below; narrow containers stack label over field.
- Switch rows: 14px/500 title, optional status badge, 14px grey description, toggle at the right centred on the title line.
- One save model per view: every control saves itself with a quiet "Saved" stamp, or one Save per panel at the bottom right; never a mix. Unsaved changes prompt before leaving.
- Show what the setting produces beside it (the invite email, the notification as it arrives, the next invoice).
- Destructive actions last, in their own section, as text or outlined button in the negative colour, consequence in words, confirmation naming the object.
- Plan-gated features: readable panel plus a 48px strip with the upgrade action; the control never silently missing.

### 8.4 Pricing table and plan picker

Applies to the public pricing page (Persuade) and to the plan picker in Billing settings (Operate); the rules are the same.
- Three tiers, four at most; more is a comparison task nobody finishes (Hick). Order them by price so the first number anchors the rest; the recommended tier is the one most buyers should choose, usually the middle.
- One recommended tier stands out (Von Restorff): a "Most popular" or "Recommended" label and a filled border or tinted ground; the others plain. Never highlight two.
- Show the price, or "Starting at" with what moves it (seats, volume), the billing period beside it, and an annual/monthly switch that recomputes every figure. "Contact us" only on a tier that genuinely needs a conversation, never on all of them; a hidden price reads as a trap and loses the qualified buyer with the unqualified one.
- Features chunked, not listed (Miller/Cowan): group under 3-4 category headings; each tier shows only what it adds ("Everything in Basic, plus..."), never the full list again; the full matrix lives below or behind "Compare all features". The first line of each tier says who it is for ("For one clinic", "For groups of 2-10").
- One button per tier, named for what happens next ("Start free trial", "Upgrade to Pro", "Talk to sales"), the same height in every column; the current plan says "Current plan" and is not a button.
- The guarantee or cancellation terms in one line under the buttons; never invented proof.
- Phone: tiers stack with the recommended one first, each collapsed to name, price, who it is for and its button, with "What's included" as an accordion.

## 9. Dashboards: composition and density

### 9.1 Canvas and grid (study)

- Fluid canvas with about 29px side padding (24 or 36-40 common), content about 1204px wide; or centred at 1100-1250px. Title 20-36px below the canvas top.
- One gutter value horizontally and vertically (mixed 16/24 gutters are flagged). One left edge from title to last row. Row rules may bleed 7-8px past the text column.
- Column count from item count; a lone card spans; cards in a row share a bottom edge; a stretched card stretches only when it has content (pin only an action or a total to its foot; a legend stays under its chart); narrow blocks (<= 5 columns or <= 6 rows) run to about 760px and pair with the next block instead of spanning 1300px.
- Spacing on a 4px base: card gap 16px, card padding 20px, section gap 24-64px, control height 32-34px. Radius bimodal: tight 4-8px or soft 16-24px, chosen once; nested radii step down. A border or a tone step, never both border and shadow; shadows for what floats.

### 9.2 Density

Three settings moved together: row pitch, padding, type size.
- Sparse (6-25 data points; homes, settings, one object): padding 20-24px, rows 56-92px, body 14-16px.
- Medium (25-50; analytics overviews, finance homes, lists): rows 44-56px, padding 16-24px.
- Dense (about 120; research, monitoring, eight-hour sessions): 13px body, 28px list rows, 42px table rows, with generous outer air (wide gutters, 64px between bands, 32px card padding).
Offer a density toggle (comfortable/compact) on list-heavy tools. Placed space reads as calm; leftover space (a column empty in every row, a mostly empty top bar, a card stretched to its neighbour) reads as unfinished. Design for the data the account has now as well as the data it will have.

### 9.3 Critique questions for an app screen

1. Is the screen's question answered by the biggest thing on it, read first? Is the largest figure the one the title row's sentence is about?
2. Does every block share the screen's edges? Any dead strip, card stopping short, orphan cell, stretched card with a blank band?
3. Is colour only on data, status and the one primary action, with the main data element carrying the hue? Does the product's face show on the first screen?
4. Do the numbers add up and line up digit for digit? Every fact shown twice agrees; every relative figure names its baseline.
5. Does every zero look like a zero and every missing value like a dash? Does every count badge sit on a queue that needs action?
6. Does every legend swatch match its mark; does any caption have to explain which bars are which; does any label collide?
7. On the phone, is navigation folded away and does each block still answer its question?

## 10. States: empty, zero, loading, error, stale

- A real zero prints in the normal style ("$0", "0.00%"); it may dim to grey when the caption beside it becomes the next step.
- Missing or not applicable: a grey dash at caption size; never "--" at value size (reads as loading).
- Counts follow the view and so does the frame: a filtered block shrinks to its rows with its row-mate top-aligned, or keeps a fixed number of rows with one empty-state sentence.
- An empty section keeps its frame and header, adds one sentence spanning the block (`grid-column: 1 / -1`) in a 1px dashed box about 38px tall, or a bordered box with an add link. An empty side card fills with reference data. An empty chart is drawn (zero line, missing bars).
- First run (whole screen empty): keep the frame and title; put the first action where the data will appear; a setup checklist at its true percentage.
- Loading (house rule): the final layout with each value replaced by a flat grey bar at its real size (a 24px value gets a 24px bar; rows keep their pitch), labels and headers shown at once, no shimmer gradient, no layout shift when data lands; `aria-busy="true"` on the region and one polite announcement. A refresh keeps old values and updates the freshness stamp. When the wait is real and long (more than about a second: a search across sources, a report, an import, a payment authorisation), name the step actually running ("Reading 3 sources... Comparing 212 fares... Rendering") and show determinate progress when the total is known; visible real work is trusted more than a blank wait, and more than an instant result the user cannot quite believe (labor illusion, Buell & Norton 2011). Never fabricate steps, pauses or progress: the steps named are the ones running, the bar lands when the data does, and a fast result is shown at once. Tools such as Boneyard (open source) generate skeletons from the rendered UI so the skeleton matches the real layout instead of being hand-measured.
- Error (house rule): inside the block that failed, never a full-screen banner; one sentence with what failed and when the data was last good ("Couldn't load deployments. Last updated 09:14.") and a Retry text button; the negative colour only on a small icon or in the pill pair.
- Stale or static: a freshness stamp with refresh; a snapshot that cannot refresh says so in one quiet notice (#fffbeb, 1px #fde68a border, 12px #92400e text); a notice tint is never a ground.
- Limits and usage: a bar at the true ratio with both ends labelled ("12.7k of 20.0k").
- Red is a signal, not a texture: one red mark per object at most; the same flags are not repeated on a board beside the list.

## 11. Onboarding and activation

- The job is to reach the moment that proves the product is worth the user's time (the "aha": first appointment booked, first report generated), not to teach the product. Define the aha, the user's experience level, motivation, time budget and the success metric before designing.
- Principles: show, don't tell (real functionality, not a tutorial mode); optional (skip, never block); front-load value (the 20% that delivers 80%); context over ceremony (teach at point of need; empty states are onboarding; tooltips at point of use); respect intelligence.
- Welcome: value, what they will accomplish, honest time estimate, skip. Account setup: minimal fields, explain why, smart defaults, social or passkey sign-in. Core concepts: 1-3 at most, interactive, "Step 1 of 3". First success: a real accomplishment on pre-populated examples or templates, modest celebration, next steps.
- Tooltips: at the relevant moment, pointing at the element, brief plus benefit, dismissable with "don't show again". Tours: 3-7 steps, skippable, replayable from help, workflow-focused ("Create a project", not "This is the project button"), on sample data. Never re-show to returning users; persist dismissals.
- Help: contextual links, a shortcut reference (a `Ctrl/Cmd+K` hint in search), a searchable centre, `?` icons at decision points. Keep contact and help in consistent locations across screens.
- Measure: time to first success, completion and skip rates, where people drop.

## 12. Hardening: errors, concurrency, extremes, i18n

- Extremes: very long and very short text, emoji, RTL, accents, large numbers, 0 and 1 and 1000+ items, 50+ options in a select, no data at all. CSS: `.truncate` (overflow hidden, ellipsis, nowrap), `.line-clamp` (`-webkit-line-clamp: 3`), `overflow-wrap: anywhere` for long tokens, `min-width: 0` on flex/grid children, `hyphens: auto` for narrow columns.
- Errors: offline, slow, timeout; 400/401/403/404/429/500; validation; permission; rate limit. Core content visible without JS where feasible; a failed script must never hide the page (no content at opacity 0 waiting for a reveal). One failing component never blocks the whole interface (error boundaries per block).
- Concurrency: disable the button while loading; idempotent submits (a request id) so a retry does not duplicate; optimistic updates with rollback and a visible failure; conflict handling when two tabs or two people edit (last-writer-wins with a notice, or a merge prompt); refresh mid-flow keeps drafts (local storage or server drafts); multiple tabs do not corrupt state.
- Interrupted gestures on custom sliders, drag surfaces and scroll strips: a second pointer mid-drag keeps the first or ends cleanly; on `pointercancel`, `lostpointercapture`, release outside, or `blur` clear drag state and release capture; set `touch-action` on pointer drag surfaces; the next tap works without reload.
- Memory and timers: clean listeners, cancel subscriptions, clear timers, abort requests on unmount; debounce search about 300ms, throttle scroll about 100ms.
- i18n: 30-40% expansion budget (German about 30% longer); logical properties (`margin-inline-start`, `padding-inline`); RTL mirrors directional icons; `Intl` for dates, numbers and currency; real plural rules; UTF-8 everywhere; dates stored in UTC, shown in the user's zone with the zone named when it matters.
- Test matrix: manual (extreme data, two languages including one RTL, offline, throttled 3G, a screen reader, keyboard only, an old browser); automated (unit edge cases, integration error scenarios, E2E on critical paths, a regression per confirmed gesture fix, visual regression, axe or WAVE in CI).

## 13. Permissions UI

- States: no view (explain why and how to request access, never a bare 403), no edit (read-only with a visible reason and who can change it), partial (hidden fields named as hidden, not silently missing), expired (what expired and how to renew).
- Show the current role and scope where actions depend on it ("You're viewing as Billing admin for Clinic A"). Disable, do not hide, actions a user could gain by role, with the reason on hover and focus; hide only what the role must never know exists.
- Requests for access go to a named person or a queue, with confirmation and a status the requester can see.
- Sharing and role dialogs name the consequence ("Editors can delete records"), default to the least privilege, and list who currently has access.
- Audit trails for sensitive changes: who, what, when, visible to admins. For the security side of these flows (authorisation checks, session handling) hand off to `security-review`.

## 14. Notifications, toasts, banners

- Toasts: transient, non-actionable, auto-dismiss after 3-5 seconds, pause on hover and focus, one at a time stacking downward, announced via `aria-live="polite"`. An Undo action is the one exception for actionable toasts (and on Android, a snackbar).
- Inline notices: for anything the user must act on or that persists (a failed sync, a plan limit), placed where the problem is, styled as content, dismissable only if the problem is not blocking.
- Banners: rare, one at a time, for account-wide facts (billing failed, maintenance window); never for marketing inside a work tool; never styled like an ad (banner blindness).
- Badges and counts: only on queues that need action; the noun clear; cleared when the queue is seen or handled.
- In-app notification centre: grouped by object, newest first, read/unread state synced across devices, each item deep-links to the object, a "mark all read" action, preferences one tap away.
- Dialogs for interrupting decisions only; a dialog that only says "Done" is a toast.

## 15. Keyboard and power-user features

- Everything operable by keyboard with a visible focus ring; logical tab order matching the visual order; Esc closes the topmost overlay and clears a selection; Enter activates the primary action in a focused form; arrow keys move within composite widgets (menus, tabs, grids, listboxes) with roving tabindex.
- Shortcuts: a command palette (`Ctrl/Cmd+K`) for navigation and actions; single-key shortcuts only when focus is not in a text field; `?` opens a shortcut sheet; shortcuts listed next to menu items; never override browser or OS essentials (`Ctrl/Cmd+T`, `W`, `L`, `R`).
- Tables and lists: `j`/`k` or arrows to move, Space to select, Shift-click for ranges, Enter to open, a visible row focus distinct from selection.
- Bulk and batch where one-at-a-time is unnatural; recents and favourites; saved views; customisable columns; a density toggle; export in the user's format (CSV, PDF) with the current filters applied.
- Efficiency features never complicate the basic path: the first-timer sees the simple interface; shortcuts and palettes are discoverable, not required.

## 16. Overlays: dialogs, sheets, popovers, drawers

- Choose the lightest container that works: inline edit or expansion > popover > side drawer or sheet > dialog > full-screen. A dialog is for interruption or protected focus; "modals are usually laziness; exhaust inline and progressive alternatives first."
- Dialogs: `<dialog>` or an ARIA dialog with `aria-labelledby`; focus moves in on open and returns to the trigger on close; focus trapped; Esc and the backdrop close it unless there is unsaved work (then ask); max width about 32rem for forms; actions bottom right (primary last on web, platform order on native), the confirming button named for the action; a backdrop at about 50-70% opacity (figure-ground).
- Sheets (mobile): from the bottom, draggable, with a grab handle, one task; swipe-to-dismiss unless data loss; respect the keyboard inset.
- Side drawers: for detail or edit of a selected row without losing the list; width 384-480px; the list remains visible and interactive or clearly dimmed, never both ambiguous.
- Popovers, menus, tooltips: use the popover API or a portal so `overflow: hidden` ancestors cannot clip them; position with collision detection; menus open on click or Enter, not hover only; tooltips appear on hover and focus, never carry essential information, and never on disabled elements without a focusable wrapper.
- z-index scale declared once (dropdown 1000, sticky 1100, modal 1200, popover 1300, tooltip 1400 or the project's equivalent); understand what creates a stacking context (`transform`, `filter`, `opacity < 1`, `will-change`).

## 17. AI features in product UI

- Label AI-generated content clearly and persistently (a badge or line, not a one-time toast); never present it as a verified fact.
- Stream long responses token by token with a stop control; show what the system is doing ("Reading 3 documents...") rather than a bare spinner; keep the user's input visible and editable.
- Give feedback controls (thumbs up/down, regenerate, edit) and a path to the human or source ("Based on invoice 1042"); show confidence or uncertainty in words when the model is unsure.
- Never auto-apply AI output to records without a review step; show diffs for suggested changes; undo always available; the user owns the final action.
- Empty and error states for AI: what it can do (three concrete prompts), what it cannot, what happens to the data entered. For prompt injection, data leakage and abuse handling, hand off to `llm-app-security`.

## 18. Phone and tablet adaptation of app screens

- Navigation folds: the sidebar becomes a 48px top bar with the screen's name, a menu button opening a full-screen sheet (nav, switcher, account) and at most one action; or a bottom bar of four or five destinations with short labels. An icon rail becomes that bottom bar. A sidebar taking more than 30% of a phone's width is a defect.
- Margins 16-20px; targets at least 44px tall; data and labels at 14px, sublines no smaller than 12px. The title stays at 20-24px; header actions move into a kebab except the one primary.
- Filters collapse to one row of chips or a Filters sheet; tabs scroll sideways inside their own row, never the page; the first list row starts in the top 60% of the screen.
- KPIs: a 2-column grid or a label-left value-right list; never four squeezed columns; an odd last cell takes the full width.
- At most one row of controls above a chart; charts full width, 160-200px tall, 3-4 x labels, legend dots above; the y ticks keep their own lane so a tick never sits on the line.
- Tables become two-line rows below about 640px (identity and key number on line 1, the brief's other fields in 13px grey on line 2, one action at right); fields move to line 2, never dropped; a table that must remain a table scrolls inside its own frame with the first column fixed; the page never scrolls sideways.
- Row actions become text actions or one compact trailing button, with one filled bulk action for the list.
- When a strip collapses, drop the item least relevant to the screen's main action, not the last in source order. Blocks that carry an action move up as a one-line summary row ("5 items low - Review"), never under twenty rows.
- Several panes (list and detail, inbox): one region at a time; choosing a row pushes the detail; Back returns to the list at its scroll position.
- Settings stack the label column above its panel; a right rail moves under the main column or into a tab; builders show the work read-only with the palette as a bottom sheet if editing stays.
- Tablet (641-1100px) is its own band: sidebar folds to the top bar, tables keep four or five columns with secondary fields as sublines, two narrow panels stack once either would be under about 340px, two-column forms and master-detail are appropriate; touch and pointer both expected.
- Thumb zone: primary actions in the bottom third; destructive actions out of it. Persist state across backgrounding; respect the on-screen keyboard (IME) inset; test at 390px every round, on a real device before shipping.

## 19. Tells of generated dashboards

| Tell | Replace with |
|---|---|
| Dark navy sidebar with a coloured active pill and left bar | Sidebar on the page ground; neutral grey pill, or brighter label on dark |
| "Welcome back, Alex" with a waving hand | A noun title at 24/600 |
| Four KPI cards each with an icon in a tinted circle, a green "+12.5%" and a sparkline | One container split by hairlines, label over value; a delta in words with its window; the trend in its own chart |
| KPI values at 36-48px bold in the brand colour | 24-30px at 400-600 in ink |
| Gradient area chart, smoothed spline, a dot on every point | 2px straight line, no fill or <= 15%, no markers |
| Rainbow palette, a hue per bar | One hue per chart; the accent on the main data element; <= 4 hues on a screen |
| Gridlines every 20px, axes on both sides, a legend for one series | 3-5 faint lines, no y-axis line, no legend for a single series |
| Fat donut with slice labels and a big total in the hole | Thin ring, legend as a table with values |
| Cards with 16-24px radius plus 1px border plus large soft shadow | Border or tone step; no shadow; one radius family |
| Zebra table under uppercase tracked headers, checkbox, avatar, chip and kebab on every row | Rules and alignment; 12px grey headers; one status mark; actions only where needed |
| Left-aligned proportional numbers | Right-aligned tabular figures, fixed decimals |
| Saturated status chips with white text | Pale tint with dark text of the same hue |
| Accent on every button, tab and link | Near-black primary, accent on data |
| Top bar with search, bell and avatar on every screen, or left mostly empty | No top bar, or one that carries something real |
| Export, Share and a date picker clustered by the title | Real actions only; a freshness stamp |
| Placeholder people, round vanity totals, growth on a week-old account | The product's own data at its real size, totals summed from rows |
| Pagination under a five-row list | Capped rows and "View all" |
| Equal four-up grid whatever the data, orphan cells, stretched cards | Column count from item count; spans that land on the same lines |
| Illustration and "No data yet" in an empty chart | The zero line drawn, one sentence in the frame, the first action |
| A screen that names no product and offers no action | The product's mark and scope in the shell; the main job one click away |

A screen with every tell removed and nothing in their place is a tidy template. What fills the space is the product: its own data at real size, the screen's one question answered by its biggest block, and a grid whose sums close.

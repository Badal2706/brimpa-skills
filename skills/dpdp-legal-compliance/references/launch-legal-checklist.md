# Launch legal checklist: 20 must-haves and how to verify each in code

Generic items that apply to any public app or website, independent of the DPDP timeline. Run after the DPDP audit (SKILL.md step 9) or on its own when someone asks "what do I need before launch". For each item: why it matters, how to check the codebase, what "done" looks like. Mark each Done / Partial / Missing / N/A in `DPDP_PROGRESS.md`. Document drafts are for lawyer review; this is not legal advice.

| # | Item | Quick check |
|---|---|---|
| 1 | Privacy policy / notice | Page exists, linked from footer and every form, itemised, versioned |
| 2 | Terms of service | Page exists, linked at signup/checkout, has data-protection clause |
| 3 | Refund and cancellation policy | Exists if anything is sold; matches what checkout and pricing copy promise |
| 4 | Cookie policy | Table of cookies and storage keys with purpose and expiry |
| 5 | Cookie consent banner | Only if non-essential cookies/trackers; gated loading verified in network tab |
| 6 | Form consents | Unticked, per-purpose boxes; micro-notice above submit |
| 7 | Data minimisation | Every field has a purpose; no "nice to have" collection |
| 8 | Third-party SDK audit | Vendor register complete; each SDK justified, gated and under contract |
| 9 | No dark patterns | Equal Accept/Reject, no false urgency, easy cancel, no nagging, no sneaking |
| 10 | No hidden fees | Total shown before the final confirm; no pre-selected add-ons |
| 11 | No fake reviews | Every testimonial traceable to a real, consenting person; no generated reviews |
| 12 | No unsupported claims | Health, financial, "No. 1", "guaranteed" claims have evidence or are removed |
| 13 | Alt text | Meaningful images have alt; decorative ones have empty alt |
| 14 | Colour contrast | 4.5:1 body, 3:1 large text and UI components (WCAG 2.2 AA) |
| 15 | Keyboard navigation | Every action reachable by Tab/Enter/Esc; visible focus; no traps |
| 16 | Business details | Legal name, address, contact, grievance contact visible |
| 17 | Age consent for children's data | Age step and verifiable parental consent where minors are plausible |
| 18 | Unsubscribe link in emails | Every marketing email; one-click; honoured promptly |
| 19 | Licensed fonts and images | Licence recorded for each font, icon set, photo, illustration |
| 20 | Data deletion requests | Self-serve or documented path; erasure actually propagates |

---

## 1. Privacy policy / notice

Why: required by DPDP (standalone notice, Rule 3) and by app stores, ad networks and payment providers as a condition of service.

Check: `grep -ril "privacy" src app pages public` finds a page; footer component links to it; every form and the signup flow link to it; the page has a version and effective date; content matches the inventory (no "we may collect" boilerplate for data you do not collect, and nothing missing that you do collect). Mobile apps: store listing privacy URL resolves to the same page.

Done: `/privacy` published from the template in `references/templates.md`, versioned, in English plus the user base's regional language, marked for lawyer review.

## 2. Terms of service

Why: sets the contract, limits liability, states governing law, carries the data-protection clause and account-deletion terms.

Check: page exists; agreement is captured at signup or checkout by an affirmative action (an unticked checkbox or an explicit button labelled with the action, not a hidden footnote); version and date stored with the account record so you can prove which terms applied.

Done: `/terms` with the data-protection clause outline from `references/templates.md`; `terms_version_accepted` stored per user.

## 3. Refund and cancellation policy

Why: anything sold online needs stated refund, cancellation and delivery terms; payment gateways and consumer-protection rules expect them; mismatches between pricing copy ("cancel anytime") and actual behaviour are the usual complaint.

Check: search pricing, checkout and emails for promises ("free trial", "cancel anytime", "money back"); confirm each has a matching policy line and a working path in the product (a cancel button that cancels). Subscription: show renewal price, date and how to cancel before the first charge.

Done: `/refunds` (or a section of Terms) linked from checkout; cancel path tested; renewal reminder email exists.

## 4. Cookie policy

Why: tells people what is stored on their device; needed for the consent banner to be "informed".

Check: list every `Set-Cookie`, `document.cookie`, `localStorage`/`sessionStorage`/IndexedDB key and mobile storage key; classify essential vs non-essential; match to third-party SDKs.

Done: cookie table (name, who sets it, purpose, essential?, expiry, consent purpose ID) published in the notice or a `/cookies` page.

## 5. Cookie consent banner

Why: DPDP consent must be specific and affirmative; a banner is only needed when non-essential trackers exist.

Check: with a fresh profile, open the site with the network tab recording; before any click, no request should go to analytics, ads, session-replay or social pixel domains. Inspect the tag manager or script loader for default-denied state. Confirm Reject is as prominent as Accept, "Manage" lets each purpose be toggled, and a choice persists in a first-party cookie or storage key.

Done: scripts load only after their purpose is granted; banner copy from the notice strings; choice revisitable via footer "Manage consent".

## 6. Form consents

Why: consent per purpose, unticked, with a micro-notice at the collection point (Act s.6, Rule 3).

Check: `grep -rn "checked" --include=*.tsx --include=*.html --include=*.vue` for pre-ticked boxes; find forms where marketing is bundled into "I agree to the Terms"; confirm each optional purpose has its own box and the submit button is not blocked by optional boxes.

Done: micro-notice plus separate boxes; consent events written on submit.

## 7. Data minimisation

Why: Act s.6(1) limits consent-based processing to data necessary for the purpose; fewer fields mean less breach exposure and less to delete.

Check: for each form field and DB column ask "which purpose needs this". Common offenders: date of birth where age bracket would do, full address for a digital product, gender, Aadhaar or PAN uploads without a legal need, "how did you hear about us" required fields, precise geolocation.

Done: unnecessary fields removed or made optional with a stated purpose; inventory updated.

## 8. Third-party SDK audit

Why: each SDK is a data recipient and a processor contract requirement; many default to collecting more than you think (device IDs, IP, session replay of typed text).

Check: list dependencies (`package.json`, lockfiles, `requirements.txt`, Gradle/Podfile, `<script src>` tags, tag-manager containers). For each: what it receives, whether it is loaded before consent, whether input fields are masked for session replay, where it processes data, whether a DPA exists, whether it can delete a user on request. Remove SDKs nobody uses.

Done: vendor register (template in `references/templates.md`) complete; unused SDKs removed; replay tools masking inputs.

## 9. No dark patterns

Why: manipulative UI invalidates consent (not "free" or "unambiguous") and India's consumer-protection regulator issued guidelines on dark patterns in 2023 that name practices such as false urgency, basket sneaking, confirm shaming, forced action, subscription traps, interface interference, bait and switch, drip pricing, disguised ads and nagging (verify the current text).

Check: countdown timers not tied to a real deadline; "Only 2 left" without stock data; pre-selected add-ons; cancel flows longer than signup; guilt-trip decline copy; consent banners with a hidden or low-contrast Reject; repeated nag modals after a decline; ads styled as content.

Done: each pattern removed or backed by real data; the `ui-ux` skill can redesign the affected flows.

## 10. No hidden fees

Why: drip pricing is a named dark pattern and the top cause of chargebacks.

Check: trace the checkout: is the final total (taxes, delivery, convenience fees) visible before the user commits? Are optional extras unticked? Does the pricing page match what the gateway charges?

Done: total shown on the first summary step; no pre-selected paid extras; price tests in CI if the pricing logic is in code.

## 11. No fake reviews

Why: fabricated or paid-undisclosed reviews are deceptive practice. For reference, the US FTC rule on fake reviews (effective 21 Oct 2024) carries civil penalties up to USD 53,088 per violation; India has a standard for online consumer reviews (BIS IS 19000:2022) and consumer-protection rules against misleading ads.

Check: search for hard-coded testimonial arrays and seed data; each testimonial needs a real person, their consent to be quoted, and the original source. Generated avatars plus generic names are a red flag. Aggregate ratings must come from real review data.

Done: unverifiable testimonials removed; remaining ones have a consent record; any incentivised review disclosed.

Hard line: never generate reviews or testimonials, even as placeholders that "will be replaced later".

## 12. No unsupported claims

Why: health, financial and comparative claims ("cures", "guaranteed returns", "No. 1 in India", "doctor recommended") need substantiation; for clinics, advertising rules for medical practice are stricter still.

Check: grep marketing copy for superlatives, percentages, "guarantee", "clinically", "approved", "certified"; ask for the evidence or remove. Replace absolute claims with specific, provable statements.

Done: claims list with evidence links in `DPDP_PROGRESS.md`; unsupported ones rewritten.

## 13. Alt text

Why: accessibility baseline; also a legal expectation for public-facing services in many jurisdictions and a store-review item.

Check: `grep -rn "<img" | grep -v "alt="` and framework image components without `alt`; icons that convey meaning need an accessible name; decorative images use `alt=""`. Run an automated checker (axe, Lighthouse accessibility) and read the results.

Done: zero missing-alt findings; alt text describes function or content, not "image".

## 14. Colour contrast

Why: WCAG 2.2 AA: 4.5:1 for body text, 3:1 for large text, 3:1 for UI components, icons and focus indicators. Consent banners and legal links are frequent failures (grey text on grey).

Check: run the automated checker; manually check the consent banner, footer legal links, placeholder text, disabled states, text over images, and both light and dark themes.

Done: all text and controls meet the ratios; colour is never the only signal (errors also have text or an icon).

## 15. Keyboard navigation

Why: people who cannot use a mouse must still be able to consent, decline, pay and delete their account.

Check: Tab through signup, consent banner, checkout, settings and the data-rights form: logical order, visible focus ring, Esc closes modals, no focus trap in the banner, custom dropdowns and toggles operable with arrow keys and Space/Enter. `div` or `span` acting as buttons without `role` and key handlers are findings. Touch targets at least 24x24 CSS px (WCAG 2.2 AA).

Done: every interactive element reachable and operable; focus returns sensibly after modals close.

## 16. Business details

Why: users and regulators must be able to identify and reach the entity; the DPDP contact person (Rule 9) and grievance route (s.13) belong here; e-commerce rules also expect the seller's legal name, address and grievance officer to be displayed.

Check: footer or About/Contact page shows legal entity name, registered or business address, email, phone (if any), GST or registration number where applicable, and the data-protection contact. Mobile apps: the same in Settings > About.

Done: details present and identical across site, app, invoices and the privacy notice. If unknown, list as OPEN for the owner; do not invent.

## 17. Age consent for children's data

Why: under 18 is a child under DPDP; verifiable parental consent and no tracking or targeted ads (Act s.9).

Check: does the product plausibly reach minors (education, gaming, paediatrics, family plans, teen social)? If yes: is there an age step; a parental-consent flow with a verification method; feature flags that disable analytics and ads for minor accounts; no marketing to minor accounts? If the product is adults-only, is that stated in Terms and does the signup say so?

Done: flow implemented or an explicit "not for under-18s" statement with a reasonable age check; see SKILL.md "Children and high-harm data".

## 18. Unsubscribe link in emails

Why: every marketing email needs a working opt-out; consent withdrawal must be as easy as giving it; major mailbox providers require one-click unsubscribe for bulk senders (RFC 8058 `List-Unsubscribe` headers) and prompt honouring; US CAN-SPAM requires honouring within 10 business days.

Check: open every marketing template (code and provider dashboard) for an unsubscribe link or the provider's merge tag; confirm `List-Unsubscribe` and `List-Unsubscribe-Post` headers on bulk mail; send a test and click it; confirm the flag suppresses future sends and writes a consent withdrawal event. Transactional emails (receipts, OTPs, appointment confirmations) do not need an unsubscribe but must not carry marketing.

Done: link present in all templates; headers set; suppression verified end to end; withdrawal recorded.

## 19. Licensed fonts and images

Why: fonts, icon sets, stock photos and illustrations each carry a licence; commercial use of an unlicensed asset is a straightforward claim.

Check: list font files and `@font-face`/CDN font loads; list images in `public/`, `assets/` and CMS uploads; for each record the source and licence (Google Fonts OFL, purchased licence number, Creative Commons variant with attribution requirement, client-supplied with rights confirmed). Remove assets lifted from search results or competitor sites. Self-host fonts where the licence allows, which also avoids sending visitor IPs to a font CDN before consent.

Done: `ASSETS_LICENSES.md` (or a section in the progress file) listing every asset and licence; unlicensed assets replaced.

## 20. Data deletion requests

Why: erasure is a DPDP right (s.12) and app stores require an account-deletion path for apps with accounts.

Check: is there a "Delete my account" control or a published request route? Trace what deletion does: primary DB rows, files in storage buckets, search indexes, analytics user IDs, CRM and email vendor records, support-desk tickets, backups (rotation period), caches. Verify legally required records are retained and the user is told. Confirm a deletion log entry is written and the confirmation email is sent.

Done: self-serve deletion or a documented route in the notice; propagation tested on staging; response template from `references/templates.md` in use.

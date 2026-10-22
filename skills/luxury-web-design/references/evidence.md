# Evidence: what the research supports, what it does not, and what nobody has tested

Every rule in this skill carries a grade. Use the grade when you speak to a client: a strong rule can be stated as a fact; a moderate rule as "the best evidence says"; a weak rule as a practitioner's rule of thumb; a video claim as "as claimed in the source video". Compiled 2026-10-22 from the research notes in `references/sources.md`; re-verify the industry figures yearly.

## Contents

1. Grading scale
2. Evidence-ranked rules (strong / moderate / weak)
3. The first-impression studies, read correctly
4. Myths and overclaims not to repeat
5. Gaps: what has never been tested
6. Citation index

## 1. Grading scale

- **Strong**: controlled study or meta-analysis, replicated.
- **Moderate**: a single controlled study, a large industry audit, or a vendor A/B test with a stated method.
- **Weak**: survey, opinion, trend report, or an inference from a lab result to a web page.
- **As claimed in the source video**: a case or number stated by a practitioner in one of the nineteen videos; useful as a worked example, never as a statistic.

## 2. Evidence-ranked rules

### Strong

1. Keep visual complexity low and the layout skeleton recognisable: unusual styling on a conventional structure. Both complexity and prototypicality affect appeal within 50 ms; complexity is processed first [TUCH12]; complexity and colourfulness computed from a screenshot predict appeal, peaking at moderate values [REINECKE13]; complexity also hurts search and recall [BAUGHAN20].
2. Use restrained colourfulness; near-monochrome with one accent tests better with older and more educated raters [REINECKE13].
3. The appeal judgement forms before anything is read and is stable, so the first viewport must look finished with no layout shift [LINDGAARD06][TUCH12]; CLS improvements have moved revenue in A/B tests [WEBDEV-CWV, moderate].
4. Looking good buys perceptual forgiveness for usability friction, but the measured effect on performance is small (g about 0.2-0.3) [TRACTINSKY00][THIELSCH19]. Never use it to excuse a broken flow.
5. Art or painterly imagery beside a product raises its perceived luxury, whatever the art shows; dilutes with repetition and depends on cultural fit [HAGTVEDT08].
6. Keep logos small and infrequent: louder branding correlates with lower price, and the wealthiest, least status-anxious buyers pay a premium for discretion [HAN10].
7. Price is a quality cue (meta-analysis of 36 studies) [RAO89]; higher stated prices raised reported and neural pleasantness for identical wine (Plassmann et al. 2008).
8. Genuine scarcity raises perceived value when the thing can be possessed, is useful and transferable [LYNN91].
9. Showing the work raises perceived value and tolerance for waiting; the effect disappears when results are poor [BUELL11].
10. Retrospective judgement follows the peak and the end, not the average or the duration [PEAKEND]; the web transfer is inferential.
11. The isolated item in a similar context is remembered better; difference, not loudness, drives it [VONRESTORFF33 via Hunt 1995].
12. Processing fluency: easy perception is liked; large, high-contrast, well-leaded type and clear figure-ground read as quality; put slowness in pacing, not legibility [REBER04].
13. Pictures are remembered better than words [PICSUP]; colour photographs were not remembered better than black-and-white in the 2025 re-analysis.
14. Zeigarnik does not replicate as a memory effect; only the tendency to resume an interrupted task holds (Ovsiankina) [ZEIGARNIK27 meta-analysis 2025]. A strong negative.
15. VisAWI is a validated instrument; simplicity and craftsmanship are the facets that most track overall appeal and the ones a premium page should maximise [VISAWI].

### Moderate

16. White space is decoded as prestige, elegance and trustworthiness because of its advertising history; it works as costly signalling [PRACEJUS06].
17. Luxury homepages share darker grounds, a full-screen stage image, a horizontal nav and far fewer elements, and that style raised perceived uniqueness and conspicuousness in a lab experiment; no field test on conversion exists [KLUGE13].
18. Fake urgency lowers perceived benevolence and user experience in a controlled store experiment; limited-time notices raise perceived scarcity without raising purchase intention; supply scarcity helps only buyers high in need for uniqueness [TUNCER23 and related]. Fake timers and false low-stock are catalogued at scale and named deceptive by a regulator [MATHUR19][FTC22].
19. Choice overload exists only under conditions: complex sets, hard tasks, uncertain preferences, effort-minimising goals [CHERNEV15]; the raw mean effect is near zero [SCHEIBEHENNE10]. Curate for first-time, uncertain, high-stakes buyers; connoisseurs can take a range.
20. People scan; the F-pattern is the default when cues are weak and NN/g calls it a design failure; strong headings produce layer-cake scanning [NNG-F]. About 57% of viewing time is above the fold and 74% within two screenfuls [NNG-SCROLL].
21. Auto-forwarding carousels reduce visibility and annoy; change panels on user action only [NNG-AUTOFWD]. Stronger animation raises how often an element is fixated, not how long [ATTN-ANIM, weak-moderate].
22. Core Web Vitals and revenue move together in every published A/B case (Vodafone +8% sales with 31% better LCP; Rakuten 24 +53% revenue per visitor with CLS cut 93%); vendor-reported, single companies [WEBDEV-CWV].
23. Reviews move purchase likelihood most at low counts and for higher-priced goods; purchase likelihood peaks at 4.0-4.7 stars, not 5.0 [SPIEGEL17]. Placement evidence (beside the action, beside the price) is practitioner lore.
24. Luxury sites score well on homepages and product pages (photography, detail, services as facts) and badly on search, filters, out-of-stock paths, delivery dates and small tap targets [BAYMARD-LUX].
25. "Design look" was the most-cited credibility cue (46% of comments) in a large but non-representative study; credibility follows notice-then-interpret [FOGG03].
26. Curiosity is strongest with partial knowledge: a specific detail opens a gap; a vague teaser does not [LOEWENSTEIN94].

### Weak or opinion

27. The anti-laws of luxury marketing (no comparison, no discounting, friction at purchase, communicate to many and sell to few, price shown without justification) are practitioner doctrine without controlled tests, consistent with the signalling studies above [KAPFERER09][OKONKWO09].
28. Star ratings and review counts are off-register for true luxury; press, advisors and client letters substitute [KAPFERER09][HAN10 by inference].
29. 3D and AR product viewers correlate with higher conversion in vendor data; selection-biased [Shopify 2022].
30. Autoplay hero video has no independent controlled evidence either way; it costs LCP; WCAG 2.2 SC 2.2.2 requires a pause control for motion over five seconds.
31. Trend lists for 2026 (scrollytelling, kinetic type, lightweight 3D, broken grids) report no measured effect; one rates kinetic type "selective use only".
32. Awwwards winners show peer-rated craft, not conversion; most are brand films or agency sites.
33. Everything the nineteen videos claim as a number (the 51% lift from removing below-the-fold content, the doubled conversion from doubling hero content, the 47-of-60 survey, the 30% rate rise after a copy rewrite, the "ten times more sales" from six jams) is as claimed in the source video; use as a worked example only.

## 3. The first-impression studies, read correctly

**Lindgaard et al. 2006** flashed real homepages for 500 ms (studies 1-2) and 50 ms (study 3) and had participants rate visual appeal twice. Ratings were reliable across passes, and the 50 ms ratings correlated strongly with the 500 ms ratings. The dependent variable was rated appeal of a screenshot. Nobody left anything; no bounce, trust or purchase was measured. Honest claim: an appeal judgement forms almost instantly and is stable.

**Lindgaard et al. 2011** showed that at brief exposures, judgements of trustworthiness and perceived usability track visual appeal. Honest claim: the snap appeal judgement colours later trust judgements.

**Tuch et al. 2012** crossed 119 screenshots on complexity and prototypicality at 50/500/1000 ms and 17/33/50 ms. Both mattered within 50 ms; complexity dominated at 17 ms with prototypicality catching up with time. Honest claim: keep element count low and the skeleton familiar; unusual surface styling is fine on a recognisable structure.

**Reinecke et al. 2013** had 548 volunteers rate 450 sites after 500 ms exposures and fit image metrics for complexity and colourfulness. Appeal peaked at moderate values of both (inverted U), with older and more educated raters preferring simpler, less colourful pages. Honest claim: restraint is a population preference and a stronger one for the audiences luxury serves.

**Fogg et al. 2003** coded 2,684 comments; "design look" led at 46%. Participants were recruited through non-profits and judged sites they did not plan to use, and reported reasons over-weight what is easy to verbalise. Honest claim: look is the most-mentioned cue, not 75% of credibility.

**Sillence et al. 2004** studied 15 women researching HRT; 94% of comments about rejected sites concerned design. Honest claim: rapid rejection on look precedes slow content checking; the 94% is a coding ratio in a tiny qualitative sample.

**Kluge et al. 2013** content-analysed 81 luxury homepages and ran a randomised lab experiment: the luxury style raised perceived conspicuousness and uniqueness. The authors called for field tests on conversion that have not appeared. Honest claim: the only direct academic test of luxury web styling, and it measures perception only.

## 4. Myths and overclaims not to repeat

| Claim | What is true | Say instead |
|---|---|---|
| "Users decide in 50 ms whether to stay" | Rated appeal of flashed screenshots; no behaviour measured [LINDGAARD06] | "An appeal judgement forms almost instantly and colours what follows" |
| "The brain processes visuals 60,000 times faster than text" | No study; traced to a 1998 3M sales deck and a 1982 ad insert | "Pictures are recognised faster and remembered better than words" |
| "People remember 65% of pictures and 10% of text after three days" | Popularisation in Brain Rules; no locatable primary study | "The picture superiority effect is replicated; the percentages are not" |
| "94% of first impressions are design-related" | 15 participants, rejection comments only [SILLENCE04] | "In small studies, rejection comments are mostly about look" |
| "Stanford says 75% of credibility is design" | 46% of comments in a non-representative sample [FOGG03] | "Design look was the most-cited credibility cue" |
| "53% leave after three seconds" | A since-removed 2016 aggregate; later figures are model predictions [GOOGLE16][GOOGLE17] | Cite the A/B case studies [WEBDEV-CWV] |
| "92% read reviews; 88% trust them like a friend" | 2014 vendor panel of about 2,100 with conditional answers; the 88% fell to 76% by 2019; no source for 92% | "Reviews move conversion most at low counts and for higher-priced goods" [SPIEGEL17] |
| "Reviews should average 4.2-4.5 stars" | Published range is 4.0-4.7 [SPIEGEL17] | Quote the published range |
| "The F-pattern means put everything top-left" | NN/g calls the F a symptom of weak formatting [NNG-F] | "Strong headings produce layer-cake scanning; design to prevent the F" |
| "Nobody scrolls" and "the fold is dead" | 57% of viewing time above the fold, 74% in two screenfuls; people scroll when the first screen earns it [NNG-SCROLL] | Both |
| "Choice overload: three options max" | Mean effect near zero; conditional [SCHEIBEHENNE10][CHERNEV15] | "Curate for uncertain buyers facing complex sets" |
| "Zeigarnik: unfinished things stick, so use progress bars and teasers" | No memory advantage in the 2025 meta-analysis | Cite resumption (Ovsiankina) or the labour illusion [BUELL11] |
| "Urgency timers always lift conversion" | Lower perceived benevolence in the controlled study; deceptive when fake [TUNCER23][FTC22] | "Real scarcity, stated once" |
| "Video heroes convert 80% better" | Vendor benchmarks without method; the vendors' own experts advise testing against a static image | "Untested; it costs LCP" |
| "3D/AR gives +94% conversion" | Shopify merchant-level correlation | "Promising, unproven, budget the performance cost" |
| "Luxury customers do not buy online" / "online will lead luxury by 2025" | Dated doctrine and a 2020 forecast; online grew to about a quarter and flattened [BAIN25] | "Online must reproduce rarity, service and ritual" (Kapferer 2015) |
| "Awwwards winners show what converts" | Jury taste; no conversion data | "They show the craft ceiling" |
| "Aesthetics make a site usable" | Perceptual effect; small effect on real performance [THIELSCH19] | "Looks buy a little forgiveness, not a working flow" |

## 5. Gaps: what has never been tested

- No published controlled study compares a luxury-styled page with a conventional page on purchase behaviour; Kluge 2013 is perception-only and lab-only.
- No independent controlled study on autoplay hero video, scrollytelling, kinetic typography or WebGL heroes and conversion was found for 2024-2026.
- Proof placement (beside the action, beside the price, after the price reveal) is practitioner A/B lore; no published controlled study.
- Baymard's luxury benchmark detail is paywalled; cite the 2021 public article for specifics and the 2024 benchmark for scope.
- NN/g has published no new large-scale eyetracking reading data since 2017-2018; the 2026 "reviewed" stamp adds no numbers.
- Market context: personal luxury goods about EUR 358 bn in 2025, flat at constant currency, with aspirational demand faltering and "price elevation ending" [BAIN25]; luxury must "rebuild trust on value" [MCKINSEY26]. Nothing design-specific.

## 6. Citation index

Keys used above; full citations and URLs are in `references/sources.md` §2.

LINDGAARD06, LINDGAARD11, TUCH12, REINECKE13, BAUGHAN20, KUROSU95, TRACTINSKY00, THIELSCH19, FOGG03, SILLENCE04, VISAWI, NNG-F, NNG-SCROLL, BAYMARD-HOME, NNG-AUTOFWD, ATTN-ANIM, GOOGLE16, GOOGLE17, WEBDEV-CWV, CONTENTSQUARE26, KAPFERER09, OKONKWO09, KLUGE13, HAGTVEDT08, PRACEJUS06, RAO89, HAN10, LYNN91, TUNCER23, MATHUR19, FTC22, BAIN25, MCKINSEY26, BAYMARD-LUX, AWWWARDS, LOEWENSTEIN94, ZEIGARNIK27, PEAKEND, REBER04, PICSUP, BUELL11, IYENGAR00, SCHEIBEHENNE10, CHERNEV15, SPIEGEL17, VONRESTORFF33.

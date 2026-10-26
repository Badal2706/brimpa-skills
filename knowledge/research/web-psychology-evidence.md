---
title: Evidence behind premium web design, first impressions and attention: papers, reports, graded rules and myths
topic: research/web-psychology
tags: [psychology, first-impressions, luxury, attention, conversion, evidence, myths, papers]
source: Literature search on 2026-10-22 with citations and evidence grades; feeds skills/luxury-web-design
source_type: paper
confidence: high
date: 2026-10-26
---

# Premium / luxury web design: the evidence behind first impressions, attention hooks and "expensive-looking" pages

Research notes compiled 2026-10-22 for a "luxury web design" skill. Every entry gives: claim, citation, URL, and an evidence-strength note. Strength scale used throughout:

- **controlled study** = randomised or within-subject experiment with a manipulated variable
- **meta-analysis** = pooled estimate across many experiments
- **field data / A-B test** = real traffic, usually a single company, often vendor-reported
- **survey / self-report** = people say what they do or prefer
- **industry audit** = expert heuristic review (Baymard, NN/g benchmarks)
- **opinion / framework** = practitioner books, trend posts, theory without a decisive test

Citation keys in [brackets] are reused in the closing rules list.

---

## A. First impressions and aesthetics

### A1. Snap aesthetic judgements

**[LINDGAARD06] Visual appeal is judged consistently within 50 ms, and the 50 ms judgement matches the 500 ms one.**
Lindgaard, Fernandes, Dudek & Brown (2006), "Attention web designers: You have 50 milliseconds to make a good first impression!", *Behaviour & Information Technology* 25(2), 115-126, doi:10.1080/01449290500330448.
URL: https://www.researchgate.net/publication/220208334 (publisher: https://www.tandfonline.com/doi/abs/10.1080/01449290500330448)
What it actually measured: three studies. Studies 1-2 flashed real homepages for **500 ms** and had participants rate visual appeal twice; ratings were highly reliable across the two passes. Study 3 added a **50 ms** condition with the same stimuli; 50 ms ratings correlated strongly with 500 ms ratings. The dependent variable was *rated visual appeal*, not bounce, trust, or purchase. The authors raised and then argued against a mere-exposure explanation. So the defensible claim is "an appeal judgement forms very fast and is stable", not "users decide to leave in 50 ms".
Evidence: controlled lab study, student sample, small N per study. Strong for "fast and stable appeal judgement", weak for anything behavioural.

**[LINDGAARD11] Snap judgements of trustworthiness and perceived usability are largely driven by visual appeal.**
Lindgaard, Dudek, Sen, Sumegi & Noonan (2011), "An exploration of relations between visual appeal, trustworthiness and perceived usability of homepages", *ACM Transactions on Computer-Human Interaction* 18(1), Article 1.
URL: https://dl.acm.org/doi/10.1145/1959022.1959023
Follow-up to the 50 ms work: even judgements that should demand more cognition (trust, usability) tracked visual appeal at brief exposures.
Evidence: controlled lab study; correlational structure inside the experiment.

**[TUCH12] Low visual complexity plus high prototypicality is the most appealing combination, and complexity is processed earlier than prototypicality.**
Tuch, Presslaber, Stöcklin, Opwis & Bargas-Avila (2012), "The role of visual complexity and prototypicality regarding first impression of websites: Working towards understanding aesthetic judgments", *International Journal of Human-Computer Studies* 70(11), 794-811, doi:10.1016/j.ijhcs.2012.06.003.
URL: https://research.google/pubs/the-role-of-visual-complexity-and-prototypicality-regarding-first-impression-of-websites-working-towards-understanding-aesthetic-judgments/
Design: 119 real-site screenshots crossed as complexity (low/medium/high) x prototypicality (low/high). Study 1 exposures 50/500/1000 ms; Study 2 exposures 17/33/50 ms. Both factors affected appeal within 50 ms; at 17 ms complexity dominated and prototypicality was weaker, with prototypicality catching up as exposure lengthened. Interpretation follows the Leder et al. (2004) stage model. Design implication: a luxury page can be unusual in surface styling, but its *layout skeleton* should remain recognisable (nav where expected, hero, etc.) and its element count low.
Evidence: controlled study, two experiments. Strong.

**[REINECKE13] Perceived colourfulness and visual complexity, computed from a screenshot, predict first-impression appeal; with demographics the model explains roughly half the variance.**
Reinecke, Yeh, Miratrix, Mardiko, Zhao, Liu & Gajos (2013), "Predicting users' first impressions of website aesthetics with a quantification of perceived visual complexity and colorfulness", *Proc. CHI 2013*, 2049-2058, doi:10.1145/2470654.2481281.
URL: https://dash.harvard.edu/bitstream/handle/1/12561368/Predicting%20Users%20First%20Impressions.pdf
Design: 548 volunteers rated 450 websites after 500 ms exposures; image metrics for complexity and colourfulness were fit to the ratings. Appeal peaked at *moderate* complexity and *moderate* colourfulness (an inverted U), with age and education shifting the optimum (older and more educated raters preferred less colourful, simpler pages).
Evidence: large online study, correlational model with held-out prediction. Strong for the predictive claim; it is a population average, not a luxury-segment finding.

**[BAUGHAN20] Visual complexity also hurts task performance, not just appeal.**
Baughan, August, Yamashita & Reinecke (2020), "Keep it Simple: How visual complexity and preferences impact search efficiency on websites", *Proc. CHI 2020*, doi:10.1145/3313831.3376849.
URL: https://dl.acm.org/doi/10.1145/3313831.3376849
Online experiment, N=165: higher complexity reduced search efficiency and information recall, most for people who prefer simple pages; effect independent of perceived appeal.
Evidence: controlled study. Moderate-strong.

### A2. The aesthetic-usability effect and credibility

**[KUROSU95] / [TRACTINSKY00] Things that look better are judged easier to use, before and after use.**
Kurosu & Kashimura (1995), "Apparent usability vs. inherent usability", *CHI '95 Conference Companion*, 292-293, doi:10.1145/223355.223680. 252 participants rated 26 ATM layouts; rated beauty and rated ease of use correlated strongly.
Tractinsky, Katz & Ikar (2000), "What is beautiful is usable", *Interacting with Computers* 13(2), 127-145, doi:10.1016/S0953-5438(00)00031-X. Replicated in Israel with a simulated ATM; the aesthetics-usability correlation survived actual use, and manipulated *real* usability had little effect on post-use perceptions.
URLs: https://dl.acm.org/doi/10.1145/223355.223680 ; https://www.sciencedirect.com/science/article/pii/S095354380000031X ; NN/g summary https://www.nngroup.com/articles/aesthetic-usability-effect/
Caveat: both correlate two self-reports from the same person; the 2000 study is the stronger because it manipulated usability. Hassenzahl (2004, *Human-Computer Interaction* 19) argued the link is partly "goodness" inference and weaker than popularly claimed.
Evidence: controlled studies with self-report DVs. Moderate.

**[THIELSCH19] Aesthetics has a small, heterogeneous positive effect on objective user performance.**
Thielsch, Scharfen, Masoudi & Reuter (2019), "Visual aesthetics and performance: A first meta-analysis", *Proc. Mensch und Computer 2019*, 199-210, doi:10.1145/3340764.3340794. 25 studies, 101 effects, 3,025 participants; small overall effect, g about 0.2-0.35 in mobile and software subgroups. A 2026 update in *International Journal of Human-Computer Interaction* (doi:10.1080/10447318.2026.2664081) reports g = 0.29 with high heterogeneity.
URL: https://dl.acm.org/doi/10.1145/3340764.3340794 ; https://www.tandfonline.com/doi/full/10.1080/10447318.2026.2664081
Evidence: meta-analysis. Strong that the effect exists, strong that it is small.

**[FOGG03] "Design look" is the single most-mentioned cue when people assess web credibility (46% of 2,684 comments), and credibility judgements follow a notice-then-interpret sequence.**
Fogg, Soohoo, Danielson, Marable, Stanford & Tauber (2003), "How do users evaluate the credibility of Web sites? A study with over 2,500 participants", *Proc. DUX 2003*, doi:10.1145/997078.997097. Companion theory: Fogg (2003), "Prominence-Interpretation Theory: Explaining how people assess credibility online", *CHI 2003 Extended Abstracts*, 722-723. The 2002 "Stanford Guidelines for Web Credibility" (10 guidelines: verify accuracy, show a real organisation, show expertise, show honest people, make contact easy, design professionally, make it easy to use, update often, restrain promotional content, avoid errors) are a research summary from the same lab.
URLs: https://dl.acm.org/doi/10.1145/997078.997097 ; https://credibility.stanford.edu/guidelines/ ; https://www.nngroup.com/articles/prominence-interpretation-theory/
Caveat: participants were recruited through non-profits (not representative), judged sites they did not plan to use, and reported *reasons*, which over-weights what is easy to verbalise (look) versus what is hard (accuracy).
Evidence: large survey/comment-coding study plus theory. Moderate.

**[SILLENCE04] In a health-site study, 94% of the comments explaining why a site was rejected were about design; 6% about content.**
Sillence, Briggs, Fishwick & Harris (2004), "Trust and mistrust of online health sites", *Proc. CHI 2004*, 663-670, doi:10.1145/985692.985776. Follow-up: Sillence, Briggs, Harris & Fishwick (2007), *Social Science & Medicine* 64(9), 1853-1862, which proposes a staged model: rapid heuristic rejection on look, then slower content interrogation.
URL: https://dl.acm.org/doi/10.1145/985692.985776 ; https://pubmed.ncbi.nlm.nih.gov/17328998/
Caveat: 15 women in North-East England researching HRT. The "94% of first impressions are design-related" meme comes from this tiny qualitative sample and describes *rejection comments*, not first impressions in general.
Evidence: small qualitative observational study. Weak for generalisation, useful for mechanism.

**[VISAWI] Perceived website aesthetics decomposes into four facets: simplicity, diversity, colourfulness, craftsmanship.**
Moshagen & Thielsch (2010), "Facets of visual aesthetics", *International Journal of Human-Computer Studies* 68(10), 689-709, doi:10.1016/j.ijhcs.2010.05.006. 18-item VisAWI validated over seven studies; 4-item VisAWI-S (2013); positive-item VisAWI-Pos (2023). Simplicity (clarity, structure) and craftsmanship (looks skilfully made, up-to-date) are the facets that most reliably track overall appeal and are the ones luxury pages should score highest on.
URLs: https://www.sciencedirect.com/science/article/abs/pii/S1071581910000777 ; manual http://www.thielsch.org/download/VisAWI/VisAWI_Manual_EN.pdf
Evidence: validated psychometric instrument. Strong as a measurement tool; it is a questionnaire you can actually run on a luxury prototype.

### A3. Reading and scanning behaviour

**[NNG-F] People scan rather than read; without visual cues they default to an F-shaped pattern that misses content on the right and lower down.**
Nielsen (2006) original eyetracking (232 users); Pernice (2017, reviewed Aug 2026), "F-Shaped Pattern of Reading on the Web: Misunderstood, But Still Relevant (Even on Mobile)", NN/g. Pernice also catalogues four text-scanning patterns ranked worst-to-best: F-pattern, spotted, layer-cake (fixations on headings only, reading when a heading is relevant), commitment.
URLs: https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/ ; https://www.nngroup.com/articles/text-scanning-patterns-eyetracking/ ; https://www.nngroup.com/articles/how-users-read-on-the-web/
Key nuance from the 2017 article: the F-pattern is the *default when there are no strong cues*, which NN/g frames as a design failure. Pages with strong headings, bolded key phrases and grouped blocks produce layer-cake scanning instead. Designing to "put everything top-left because of the F" is a misreading.
Evidence: qualitative eyetracking across many studies, non-random samples. Moderate. No fresh 2024-2026 eyetracking dataset was located; the 2017 page was re-reviewed in 2026 without new numbers.

**[NNG-SCROLL] About 57% of viewing time is spent above the fold and 74% within the first two screenfuls (2018), down from 80% above the fold in 2010.**
Fessenden (2018), "Scrolling and Attention", NN/g. 120 participants, 130,000+ fixations on a 1920x1080 screen.
URL: https://www.nngroup.com/articles/scrolling-and-attention/
Caveat: it measures *viewing time*, not how far people scroll; NN/g warns the 74% figure is affected by page length. People do scroll; attention per pixel just decays fast.
Evidence: eyetracking, moderate N. Moderate.

**[BAYMARD-HOME] Only "just above 50%" of leading e-commerce sites deliver a decent-or-better homepage UX; the average top-grossing site is "poor" on homepage and category navigation overall; 76% are mediocre or worse on the theme.**
Baymard Institute, Homepage & Category Navigation research (benchmark of 344 top-grossing US/EU sites, 13,000+ scored elements; 19-site usability study). Product pages: 52% desktop / 62% mobile / 64% app sites are mediocre or worse (2026 update). Product lists: 58% desktop / 78% mobile mediocre or worse (2025 update). Only 48% of leading desktop sites have decent-or-good product page UX.
URLs: https://baymard.com/research/homepage-and-category-usability ; https://baymard.com/blog/current-state-ecommerce-product-page-ux ; https://baymard.com/blog/current-state-product-list-and-filtering
No public Baymard figure specific to hero sections or above-the-fold content was found; their public pages do not quantify carousel or hero performance.
Evidence: industry audit (expert heuristic scoring calibrated against moderated usability tests). Moderate for "most sites have fixable problems", weak as causal evidence.

### A4. Attention, motion and speed

**[NNG-AUTOFWD] Auto-forwarding carousels and accordions reduce visibility of content and annoy users; moving panels trigger banner blindness.**
Nielsen (2013), "Auto-Forwarding Carousels and Accordions Annoy Users and Reduce Visibility", NN/g. Observed users failing to find a promotion shown in a rotating panel; recommends panels change only on user action.
URL: https://www.nngroup.com/articles/auto-forwarding/
Evidence: qualitative usability observation. Moderate-weak (consistent with later practitioner tests, but no controlled study).

**[ATTN-ANIM] Stronger animation raises *how often* a banner is fixated, not how long attention stays on it.**
Arxiv 1903.11997 (2019), "A gradual approach for maximising user conversion without compromising experience with high visual intensity website elements".
URL: https://arxiv.org/pdf/1903.11997
Evidence: single academic study. Weak-moderate; useful counterweight to "motion wins attention".

**Autoplay video and conversion: no independent controlled evidence either way.** Vendor posts (Unbounce, Wistia, PageDuel) report both lifts and losses; Unbounce's own experts do not recommend autoplay and advise A/B testing against a static image. The best-documented downside is weight: a hero video adds seconds to LCP, which the speed evidence below says costs more than any plausible engagement gain. Accessibility: WCAG 2.2 SC 2.2.2 (Pause, Stop, Hide) requires a control for any moving content lasting more than 5 seconds; `prefers-reduced-motion` should disable non-essential motion.
URLs: https://unbounce.com/landing-pages/autoplay-landing-page-best-practices/ ; https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html
Evidence: opinion plus accessibility standard. Weak on conversion, strong on the standard.

**[GOOGLE16] "53% of mobile visits are abandoned if a page takes longer than 3 seconds."**
Google/DoubleClick (Sept 2016), *The Need for Mobile Speed*; summarised in the DoubleClick Mobile Speed Toolkit PDF. Based on Google Analytics data across thousands of mobile sites (sources disagree between 4,500 and 10,000+ domains).
URL: https://www.thinkwithgoogle.com/_qs/documents/3702/9e6a3_DoubleClick_Mobile_Web_Speed_Toolkit_10_17_2016.pdf
Caveat: aggregate observational data, since-removed primary page; methodology never fully published.
Evidence: industry data, correlational. Moderate-weak.

**[GOOGLE17] Bounce probability rises 32% from 1 s to 3 s load, 90% at 5 s, 106% at 6 s.**
Google/SOASTA (2017), reproduced in Google's *Milliseconds Make Millions* (Deloitte, 2020). Figures are outputs of a predictive neural-network model, not observed rates.
URL: https://www.thinkwithgoogle.com/_qs/documents/9757/Milliseconds_Make_Millions_report_hQYAbZJ.pdf
Evidence: industry model. Weak-moderate.

**[WEBDEV-CWV] Controlled A/B tests tie Core Web Vitals to revenue.**
- Vodafone Italy (web.dev, 2021): 31% better LCP, +8% sales, +15% lead-to-visit, +11% cart-to-visit; A/B with no other differences. https://web.dev/case-studies/vodafone
- Rakuten 24 (web.dev, 2022): one-month 50/50 A/B; CLS -92.7%, FCP -8.5%, TTFB -18%; revenue per visitor +53.4%, conversion +33.1%, AOV +15.2%, exit rate -35.1%. https://web.dev/case-studies/rakuten
- redBus (web.dev, 2023): INP improvements (with other changes) tied to +7% sales. https://web.dev/case-studies/redbus-inp
- Aggregate page lists 19 cases (Tokopedia, Lazada +16.9% mobile conversion after 3x LCP, Agrofy -76% load abandonment, NIKKEI, NDTV, etc.). https://web.dev/case-studies/vitals-business-impact
Evidence: field A/B tests reported by the vendor (Google) with a stake in the result; single companies, not replicated independently. Moderate. Direction is consistent across every case, magnitude varies wildly.

**[CONTENTSQUARE26] Digital Experience Benchmark 2026 (Q4 2024-Q4 2025 data): visits -3.8%, engagement about -10%, scroll rate -2%, time on site -7%, frustration signals -4.3%, conversion -5.1%, 13% of visitors return within 30 days.**
URL: https://contentsquare.com/guides/digital-experience-benchmark/
Evidence: large-panel industry analytics, marketing-framed; useful as baselines, not as causal evidence.

---

## B. Luxury and premium perception

### B1. Luxury strategy theory

**[KAPFERER09] The 24 anti-laws of marketing.**
Kapferer & Bastien (2009; 2nd ed. 2012), *The Luxury Strategy: Break the Rules of Marketing to Build Luxury Brands*, Kogan Page. Chapter 3. Summaries: https://blas.com/luxury-strategy/ ; https://www.brandingstrategyinsider.com/the-antilaws-of-luxury-marketing-6/
The 24, in the book's order (paraphrased):
1. Forget about positioning; luxury is not comparative.
2. Does your product have enough flaws? (a signature imperfection is a source of emotion)
3. Do not pander to your customers' wishes.
4. Keep non-enthusiasts out.
5. Do not respond to rising demand.
6. Dominate the client.
7. Make it difficult for clients to buy.
8. Protect clients from non-clients, the big from the small.
9. The role of advertising is not to sell.
10. Communicate to those you are not targeting.
11. The presumed price should always seem higher than the actual price.
12. Luxury sets the price; price does not set luxury.
13. Raise your prices as time goes on in order to increase demand.
14. Keep raising the average price of the product range.
15. Do not sell.
16. Keep stars out of your advertising.
17. Cultivate closeness to the arts for initiates.
18. Do not relocate your factories.
19. Do not hire consultants.
20. Do not test.
21. Do not look for consensus.
22. Do not look after group synergies.
23. Do not look for cost reduction.
24. Just sell marginally on the internet.
Web-relevant translation: no comparison tables, no "best-selling" badges, no discount banners, friction is acceptable (appointment, waitlist, "enquire"), communicate the dream to many while selling to few, price shown without justification or anchoring games.
On the internet specifically: the book's section "Luxury and internet distribution (the internet dilemma)" argues the web is "a fabulous place to sell fashion or premium products, but a very dangerous one to sell luxury ones" because it removes the sensory, human and time dimensions. Kapferer (2015), *Kapferer on Luxury: How Luxury Brands Can Grow Yet Remain Rare*, Kogan Page, revisits this in the chapter "Internet and luxury: under-adopted or ill-adapted?", conceding e-commerce is unavoidable but should reproduce rarity, service and ritual rather than efficiency.
Evidence: practitioner framework from two industry executives/academics; no controlled tests. Opinion, but the dominant professional doctrine and consistent with the signalling studies below.

**[OKONKWO09] Luxury's defining traits (exclusivity, sensory richness, high service) are in tension with the web's traits (mass access, screen-only, self-service); the answer is to transfer the experience, not abandon it.**
Okonkwo (2009), "Sustaining the luxury brand on the Internet", *Journal of Brand Management* 16(5-6), 302-310, doi:10.1057/bm.2009.2; expanded in Okonkwo (2010), *Luxury Online: Styles, Systems, Strategies*, Palgrave Macmillan.
URL: https://link.springer.com/article/10.1057/bm.2009.2
Evidence: conceptual/practitioner. Opinion.

**[KLUGE13] Luxury homepages measurably differ from conventional ones in four ways, and those features raise perceived conspicuousness and uniqueness.**
Kluge, Königsfeld, Fassnacht & Mitschke (2013), "Luxury web atmospherics: an examination of homepage design", *International Journal of Retail & Distribution Management* 41(11/12), 901-916, doi:10.1108/IJRDM-01-2013-0013.
URL: https://www.emerald.com/insight/content/doi/10.1108/ijrdm-01-2013-0013/full/html
Content analysis of 81 luxury homepages plus expert interviews found: darker backgrounds, larger or full-screen stage imagery, a horizontal nav bar, and far fewer on-page elements. A randomised lab experiment then showed a luxury-style homepage raised perceived conspicuousness and uniqueness (not a generic "luxury" score). The authors call for field tests on conversion, which have not appeared.
Evidence: content analysis plus controlled lab experiment. Moderate. This is the closest thing to a direct academic test of "luxury web design".

### B2. Perception mechanisms

**[HAGTVEDT08] Art infusion: the presence of visual art raises perceived luxury of a product or package, regardless of the art's content.**
Hagtvedt & Patrick (2008), "Art Infusion: The influence of visual art on the perception and evaluation of consumer products", *Journal of Marketing Research* 45(3), 379-389, doi:10.1509/jmkr.45.3.379.
URL: https://www.bauer.uh.edu/vpatrick/docs/Art%20Infusion.pdf
Three experiments across packaging, ads and product design; effect mediated by perceived luxury. Later work (Seo & co., *JCP* 2021; Nature *Humanities & Social Sciences Communications* 2025) finds boundary conditions: cultural congruence, and dilution with repeated art exposures.
Evidence: controlled studies, replicated with moderators. Strong.

**[PRACEJUS06] White space reads as elegance, prestige, trustworthiness and refined taste because of its advertising history, not any innate property.**
Pracejus, Olsen & O'Guinn (2006), "How Nothing Became Something: White space, rhetoric, history, and meaning", *Journal of Consumer Research* 33(1), 82-90, doi:10.1086/504138.
URL: https://academic.oup.com/jcr/article/33/1/82/1795957
Mixed-method: historical analysis of ads plus studies showing consumers decode white space as a prestige signal. Follow-ups: Pracejus et al. (2013), "When white space is more than burning money", *International Journal of Research in Marketing* 30(3), 211-218, models white space as costly economic signalling; Olsen, Pracejus & O'Guinn (2012, *Journal of Business Research*) tie white space to perceived quality and price.
Evidence: controlled studies plus historical analysis. Moderate-strong. This is the citation for "negative space = premium".

**[RAO89] Price is a positive, significant quality cue; brand name also; store name is not.**
Rao & Monroe (1989), "The effect of price, brand name, and store name on buyers' perceptions of product quality: An integrative review", *Journal of Marketing Research* 26(3), 351-357, doi:10.2307/3172907.
URL: https://www.jstor.org/stable/3172907
Meta-analysis of 36 studies / 54 price-quality effects; mean eta-squared 0.12. Authors flag that the literature over-samples cheap, frequent purchases; evidence for high-priced goods was thin. Related: Plassmann et al. (2008, *PNAS*) showed higher stated prices raise reported and neural pleasantness for identical wine.
Evidence: meta-analysis. Strong that the heuristic exists, moderate for luxury price points.

**[HAN10] Quiet luxury has an empirical basis: the wealthy with low need for status (patricians) pay a premium for discreet branding; the loud-logo items are cheaper and the ones counterfeiters copy.**
Han, Nunes & Drèze (2010), "Signaling status with luxury goods: The role of brand prominence", *Journal of Marketing* 74(4), 15-30, doi:10.1509/jmkg.74.4.15.
URL: https://journals.sagepub.com/doi/10.1509/jmkg.74.4.015 ; summary https://www.ama.org/2021/04/16/signaling-status-with-luxury-goods-the-role-of-brand-prominence/
Four-group taxonomy (patricians, parvenus, poseurs, proletarians); field experiments plus pricing analysis of 465 Gucci and Louis Vuitton bags showed louder branding correlates with lower price. Web translation: a small wordmark, restrained logo repetition and no badge clutter signal "patrician" to the segment with the most money.
Evidence: controlled experiments plus market data. Strong.

**[LYNN91] / [CIALDINI84] Scarcity raises perceived value when the thing can be possessed, is useful and is transferable.**
Lynn (1991), "Scarcity effects on value: A quantitative review of the commodity theory literature", *Psychology & Marketing* 8(1), 43-57, doi:10.1002/mar.4220080105. Cialdini (1984), *Influence: The Psychology of Persuasion*, popularised the principle.
URL: https://onlinelibrary.wiley.com/doi/10.1002/mar.4220080105
Evidence: meta-analysis (Lynn) / popular synthesis (Cialdini). Strong that genuine scarcity raises value.

**[TUNCER23] Manufactured urgency backfires on perceived vendor benevolence and user experience.**
Tuncer, Sergeeva, Bongard-Blanchy, Distler, Doublet & Koenig (2023/2024), "Running out of time(rs): effects of scarcity cues on perceived task load, perceived benevolence and user experience on e-commerce sites", *Behaviour & Information Technology* 43(11), 2281-2299, doi:10.1080/0144929X.2023.2242966.
URL: https://doi.org/10.1080/0144929X.2023.2242966
Online experiment, N=202, three otherwise identical shops (no cues / limited-time / limited-quantity). Scarcity cues were read as a lack of benevolence; limited-time cues produced frustration; the cue-free site scored higher on both hedonic and pragmatic UX. Related: Song, Choi & Moon (2022), "Limited-time scarcity and competitive arousal in e-commerce", *International Review of Retail, Distribution and Consumer Research*: limited-time notices raised perceived scarcity but did not raise purchase intention. Wu & Lee / Frontiers in Psychology (2022): supply-scarcity appeals help only for consumers high in need for uniqueness and *reduce* intention for others.
Regulatory context: Mathur et al. (2019), "Dark Patterns at Scale", *PACM HCI* (CSCW) 3, Art. 81, doi:10.1145/3359183, found 157 deceptive countdown timers on 140 of ~11,000 shopping sites, and one retailer using a random-number generator for "just sold" counts. FTC (Sept 2022), *Bringing Dark Patterns to Light*, names fake countdown timers and false low-stock messages as deceptive. https://arxiv.org/abs/1907.07032 ; https://www.ftc.gov/system/files/ftc_gov/pdf/P214800+Dark+Patterns+Report+9.14.2022+-+FINAL.pdf
Evidence: controlled study (Tuncer), large crawl (Mathur), regulator report. Moderate-strong that fake urgency harms trust; strong that it carries legal risk.

### B3. Luxury e-commerce practice

**[BAIN25] Personal luxury goods: EUR 364 bn (2024) to about EUR 358 bn (2025), flat at constant currency; aspirational mid-tier demand faltering; "the post-Covid era of price elevation appears to be ending".**
Bain & Company / Fondazione Altagamma, 24th Luxury Study (20 Nov 2025), D'Arpizio & Levato.
URL: https://www.bain.com/insights/luxury-is-ready-for-a-new-era-after-stabilizing-in-2025-snap-chart/
Online share: the 2020 edition reported online doubling from 12% (2019) to 23% (2020); no 2025 public share figure was located, and the 2024 edition shows online growth roughly flat.
Evidence: industry data. Moderate for market context.

**[MCKINSEY26] *The State of Fashion 2026* (BoF/McKinsey, Nov 2025): luxury has relied on price rises as volumes softened for three years and must "rebuild trust" on value; mid-market now the fastest-growing segment; resale forecast to grow 2-3x faster than first-hand to 2027; AI agents reshaping discovery.**
URL: https://www.mckinsey.com/~/media/mckinsey/industries/retail/our%20insights/state%20of%20fashion/2026/the-state-of-fashion-2026-final.pdf ; https://www.businessoffashion.com/articles/luxury/the-state-of-fashion-2026-report-luxury-category-outlook-consumers/
Evidence: industry survey plus analysis. Moderate for context; nothing design-specific.

**[BAYMARD-LUX] Luxury sites: homepages and product pages are their strength, search and filtering their weakness.**
Baymard (June 2021), "15 Common UX Pitfalls Luxury Retail E-Commerce Sites Suffer From" (Bang & Olufsen, Chanel, Gucci, Jimmy Choo, Louis Vuitton, TAG Heuer, Van Cleef & Arpels); Luxury Goods UX Benchmark (April 2024, nine sites incl. Tiffany, Cartier, paywalled detail).
URLs: https://baymard.com/blog/2021-luxury-ecommerce-benchmark ; https://baymard.com/research-articles/luxury-goods-benchmark-2024
Public findings: luxury homepages average between "good" and "perfect", above apparel and electronics; product pages "decent" to "good" thanks to detailed descriptions, strong photography, relevant cross-sells, complimentary shipping/returns. Pitfalls: zero personalisation (vs 41% of apparel sites), no footer links to returns/shipping, weak feature and non-product search, no autocorrect, no thematic filters, no filter counts, out-of-stock dead ends (about 30% of testers abandon), no delivery date estimates, vague mobile link text, small tap targets (<7 mm).
Evidence: industry audit. Moderate for "what top luxury sites do and where they fail".

**[AWWWARDS] Sites of the Year 2022-2025 and what they share.**
Winners: 2022 KPR (Resn), The Other Side of Truth (The First The Last), Persepolis Reimagined (Monks); 2023 Lusion v3, Noomo Agency, Mana Yerba Mate (Louis Paquet); 2024 Igloo Inc (abeto), Don't Board Me, Opal Tadpole (Claudio Guglieri); 2025 Lando Norris (OFF+BRAND, Site of the Year and Users' Choice), Messenger (abeto, Developer SOTY), e-commerce of the year Scout Motors; Agency of the Year Immersive Garden.
URLs: https://www.awwwards.com/websites/sites_of_the_year/ ; https://www.awwwards.com/annual-awards/winners
Observed pattern (my reading of the winners, not an Awwwards statistic): nearly all are WebGL/3D-heavy, scroll-driven narratives with large display type, dark or near-mono palettes, minimal nav, and a single "moment" per section. Jury criteria weight design, usability, creativity and content; developer awards reward technical craft. Awards signal peer-rated craft, not conversion; most winners are agency showreels or brand films, not transactional luxury stores.
Evidence: award juries. Opinion/industry taste signal.

**What top luxury sites actually do (synthesis of Kluge 2013, Baymard 2021/2024 and a survey of current Hermès, Loro Piana, Brunello Cucinelli, Cartier, Van Cleef, Rolex, Aesop, Bang & Olufsen homepages):** full-bleed photography or film as the stage; serif or high-contrast display type paired with a quiet sans; a horizontal nav of 4-7 items, often hidden behind a menu on mobile; dark or warm-neutral backgrounds; no visible discounts, timers, star ratings or "bestseller" badges; CTAs phrased as "Discover", "Book an appointment", "Contact an advisor" rather than "Buy now"; editorial storytelling pages (maison, savoir-faire, heritage); product pages that lead with materials, dimensions, origin and craft process, with price stated plainly and services (complimentary delivery, gift wrapping, engraving, returns) listed as facts. This is practice, not proof; the only experimental test is Kluge et al. 2013.

---

## C. Hooks and attention without cheapness

**[LOEWENSTEIN94] Curiosity is a response to a perceived information gap; it is strongest when people know a little, not nothing or everything.**
Loewenstein (1994), "The psychology of curiosity: A review and reinterpretation", *Psychological Bulletin* 116(1), 75-98, doi:10.1037/0033-2909.116.1.75.
URL: https://www.researchgate.net/publication/375205065
Design use: a hero that shows one specific, concrete detail (a hand finishing a seam) and withholds the whole invites a scroll; a vague "Discover more" opens no gap. Later work (Kang et al. 2009 *Psychological Science*; Hsee & Ruan 2016) supports curiosity as motivating even costly exploration.
Evidence: theoretical review with experimental support. Moderate-strong for mechanism; no web-specific test.

**[ZEIGARNIK27] Unfinished tasks are better remembered. Mostly fails to replicate; the resumption tendency (Ovsiankina) does replicate.**
Zeigarnik (1927), *Psychologische Forschung* 9, 1-85. Van Bergen (1968) and Butterfield (1964) found the memory effect unreliable; Seifert & Patalano (1991) split results. Ghibellini & Meier (2025), "Interruption, recall and resumption: a meta-analysis of the Zeigarnik and Ovsiankina effects", *Humanities and Social Sciences Communications*: no memory advantage for unfinished tasks, but a general tendency to resume them.
URL: https://www.nature.com/articles/s41599-025-05000-w
Evidence: meta-analysis, negative. Weak. Do not cite Zeigarnik for progress bars or teaser copy; cite Ovsiankina (resumption) or Buell & Norton instead.

**[PEAKEND] Retrospective evaluation of an experience is predicted by its peak and its end, with little weight on duration.**
Redelmeier & Kahneman (1996), "Patients' memories of painful medical treatments", *Pain* 66(1), 3-8; Redelmeier, Katz & Kahneman (2003), randomised trial N=682, *Pain* 104, 187-194; Fredrickson & Kahneman (1993) *JPSP* for the original "duration neglect".
URL: https://pubmed.ncbi.nlm.nih.gov/8857625/ ; https://pubmed.ncbi.nlm.nih.gov/12855328/
Design use: invest in one peak moment per page (the orchestrated motion or the reveal) and in the ending (order confirmation, thank-you, packaging page), not in uniform polish everywhere. Boundary conditions exist for multi-episode events (Ariely & Carmon).
Evidence: controlled and randomised clinical studies, replicated in hedonic contexts. Strong for the principle; transfer to web is inferential.

**[REBER04] Processing fluency: the more easily something is perceived, the more it is liked; symmetry, contrast, prototypicality and repetition all work through fluency.**
Reber, Schwarz & Winkielman (2004), "Processing fluency and aesthetic pleasure: Is beauty in the perceiver's processing experience?", *Personality and Social Psychology Review* 8(4), 364-382, doi:10.1207/s15327957pspr0804_3.
URL: https://pages.ucsd.edu/~pwinkiel/reber-schwarz-winkielman-beauty-PSPR-2004.pdf
This is the mechanism under Tuch 2012 and Reinecke 2013. It also explains why legible type at generous size and high figure-ground contrast read as "quality". Caveat: disfluency can signal effort or exclusivity in some contexts (Pocheptsova, Labroo & Dhar 2010, *JMR*: disfluent fonts raised evaluation of special-occasion products). For luxury, the resolution is fluency in layout and reading, with deliberate slowness (pacing, reveals) rather than visual difficulty.
Evidence: theoretical synthesis of many controlled studies. Strong.

**[PICSUP] Pictures are remembered better than words (picture superiority effect).**
Nelson, Reed & Walling (1976), "Pictorial superiority effect", *Journal of Experimental Psychology: Human Learning and Memory* 2(5), 523-528; Paivio's dual-coding theory (1971, 1986). Higdon, Neath, Surprenant & Ensor (2025), *QJEP*, argue distinctiveness explains it better than dual coding, and colour photos were not remembered better than black-and-white.
URL: https://journals.sagepub.com/doi/10.1177/17470218241235520
Evidence: replicated controlled studies. Strong for memory; the "65% recall after 3 days vs 10% for text" figure attributed to Medina's *Brain Rules* is a popularisation without a locatable primary study, and "60,000x faster" is fabricated (see Myths).

**[BUELL11] The labor illusion: showing the work being done raises perceived value, even when it makes people wait longer.**
Buell & Norton (2011), "The labor illusion: How operational transparency increases perceived value", *Management Science* 57(9), 1564-1579, doi:10.1287/mnsc.1110.1376.
URL: https://pubsonline.informs.org/doi/10.1287/mnsc.1110.1376
Five experiments with simulated travel-search and dating sites: users preferred a site that visibly "searched airlines" for 30-60 seconds over one returning identical results instantly; effect mediated by perceived effort and reciprocity, and it disappears when results are poor. Follow-up: Buell, Kim & Tsay (2017), *Management Science* 63(6), operational transparency in a cafeteria raised satisfaction and effort. Design use: craftsmanship process reveals, "made-to-order" progress, atelier footage, bespoke configurators that visibly compose the piece.
Evidence: controlled studies, replicated. Strong.

**[IYENGAR00] / [SCHEIBEHENNE10] / [CHERNEV15] Choice overload exists only under conditions: complex sets, hard tasks, uncertain preferences, effort-minimising goals.**
Iyengar & Lepper (2000), "When choice is demotivating", *JPSP* 79(6), 995-1006 (24 vs 6 jams: 30% vs 3% of stoppers bought). Scheibehenne, Greifeneder & Todd (2010), "Can there ever be too many options?", *Journal of Consumer Research* 37(3), 409-425: 50 experiments, mean d about 0, strong heterogeneity, publication bias. Chernev, Böckenholt & Goodman (2015), "Choice overload: A conceptual review and meta-analysis", *Journal of Consumer Psychology* 25(2), 333-358: 99 observations; effect is reliable once four moderators are included.
URLs: https://doi.org/10.1086/651235 ; https://doi.org/10.1016/j.jcps.2014.08.002
Design use for luxury: short, curated collections with clear differentiation are supported; "limit everything to three" is not. Uncertain, high-stakes buyers (first-time luxury customers) are exactly the moderator condition where overload bites, so curation and guided selection earn their keep there.
Evidence: meta-analyses with caveat. Moderate.

**[SPIEGEL17] Reviews move conversion sharply at low counts and for higher-priced goods; purchase likelihood peaks at 4.0-4.7 stars, not 5.0.**
Spiegel Research Center, Northwestern University (June 2017), *How Online Reviews Influence Sales*, with PowerReviews data from a high-end gift retailer and an apparel retailer. Five reviews vs none: +270% purchase likelihood; display of reviews lifted conversion +190% for a lower-priced and +380% for a higher-priced product.
URL: https://spiegel.medill.northwestern.edu/how-online-reviews-influence-sales/
Caveat: observational retailer data, one vendor partner; the "4.2-4.5" range circulating online is a narrowing of the published 4.0-4.7.
Evidence: field data, correlational. Moderate. Placement evidence specifically (above vs below the fold, near CTA) is practitioner A/B lore; no controlled published study was found. For luxury, the Kapferer doctrine and Han et al. argue against star ratings on the product; press quotes, client letters and named-advisor testimonials are the usual substitute.

**[VONRESTORFF33] The isolated item in a homogeneous set is remembered better; distinctiveness, not raw salience, drives it.**
von Restorff (1933), *Psychologische Forschung* 18, 299-342; Hunt (1995), "The subtlety of distinctiveness: What von Restorff really did", *Psychonomic Bulletin & Review* 2(1), 105-112, doi:10.3758/BF03214414.
URL: https://link.springer.com/article/10.3758/BF03214414
Hunt shows the effect does not require perceptual salience (a loud colour); it requires difference *relative to a similar context*. Design use: one accent on an otherwise restrained page (a single gold rule, one serif word in a sans headline, one object in colour on a monochrome spread) is the premium version of the isolation effect; three accents cancel it.
Evidence: replicated memory experiments. Strong for memory; transfer to CTA visibility is inferential.

### C7. 2025-2026 trend reports (all industry data or opinion)

- **Trend lists** (Envato Elements, Line25, Bubble, TheeDigital, MotionKit, UX Pilot; all 2026) converge on: scrollytelling, kinetic typography, lightweight 3D/WebGL, broken grids, "visual personality" against AI-template sameness. None reports a measured engagement or conversion effect. One (Line25) rates kinetic type "selective use only" for 2026 and quotes a StudioMeyer retrospective calling it "more polish than substance". URLs: https://elements.envato.com/learn/web-design-trends ; https://line25.com/articles/web-design-trends-2026/ ; https://motionkit.io/blog/web-animation-trends-2026
  Evidence: opinion.
- **3D product content**: Shopify (changelog, May 2022; first stated 2020) reports merchants adding 3D/AR content "see a 94% conversion lift on average". Platform-wide correlation between merchants with and without 3D, not an experiment. Rebecca Minkoff reported +65% order likelihood after AR interaction and +27% after 3D. https://changelog.shopify.com/posts/shop-adds-3d-and-augmented-reality-ar-previews
  Evidence: vendor field data, selection-biased. Weak-moderate.
- **Scroll-depth benchmarks**: Contentsquare 2026 reports scroll rate -2% YoY; NN/g 2018 gives the attention decay curve. No controlled study of "scrollytelling vs static page" on conversion was located. Performance and reduced-motion costs are documented risks (INP thresholds; WCAG 2.3.3 Animation from Interactions).
  Evidence: industry data for baselines; opinion for scrollytelling effects.
- **Awwwards winners 2022-2025** show the craft ceiling (3D, scroll narrative, big type) but are not conversion evidence.

---

## Evidence-ranked rules

Tags: **strong** (controlled study or meta-analysis, replicated), **moderate** (single controlled study, large industry audit, vendor A/B), **weak** (survey, opinion, trend, or inference from lab to web).

1. Keep visual complexity low and the layout skeleton recognisable; unusual styling, conventional structure. **strong** [TUCH12][REINECKE13][BAUGHAN20]
2. Use moderate, restrained colourfulness; near-monochrome with one accent tests better with older and more educated audiences. **strong** [REINECKE13]
3. The appeal judgement is formed before anything is read, so the first viewport must already look finished with no layout shift. **strong** [LINDGAARD06][TUCH12]; CLS link to revenue **moderate** [WEBDEV-CWV]
4. Looking good buys forgiveness for usability friction, but only perceptually and only a little; do not use it to excuse broken flows. **strong** that the effect exists, small [TRACTINSKY00][THIELSCH19]
5. Generous white space is a decoded prestige signal; crowding reads as discount. **moderate-strong** [PRACEJUS06][KLUGE13]
6. Dark or deep-neutral backgrounds, a full-screen stage image, horizontal nav, few elements are what luxury homepages share, and they raise perceived uniqueness and conspicuousness. **moderate** [KLUGE13]
7. Art, illustration or photography with painterly quality raises perceived luxury of whatever sits beside it. **strong** [HAGTVEDT08]
8. Keep logo and brand marks small and infrequent; loud branding signals the lower-price tier to the wealthiest segment. **strong** [HAN10]
9. State the price plainly; do not justify, discount, anchor or compare. Price itself is a quality cue. **strong** for the heuristic [RAO89]; **weak/opinion** for the no-discount doctrine [KAPFERER09]
10. Never use countdown timers, fake low-stock or "X people viewing" on a premium site; they lower perceived benevolence and carry regulatory risk. **moderate-strong** [TUNCER23][MATHUR19][FTC22]
11. Genuine scarcity (numbered editions, waitlists, by appointment) does raise value; say it factually, once. **strong** [LYNN91]
12. Show the work: process footage, atelier reveals, visible "composing your piece" states add value and tolerate longer waits. **strong** [BUELL11]
13. Design one peak moment per page and a deliberate ending; polish is remembered at the peak and the end, not on average. **strong** principle, **weak** web transfer [PEAKEND]
14. Use one isolated accent per view (a single serif word, a single colour object); more than one cancels the effect. **strong** memory effect, **weak** transfer [VONRESTORFF33]
15. Open an information gap with a specific detail, not a vague teaser; curiosity needs partial knowledge. **moderate** [LOEWENSTEIN94]
16. Do not cite Zeigarnik for progress indicators or cliff-hangers; the memory effect does not replicate. **strong negative** [ZEIGARNIK27 meta-analysis 2025]
17. Prefer fluent reading (large, high-contrast, well-leaded type) and put slowness in pacing, not legibility. **strong** [REBER04]
18. Lead with imagery for memory, but caption it: pictures beat words, and the "60,000x" number is fiction. **strong** effect, [PICSUP]
19. Curate small, clearly differentiated collections for first-time or uncertain buyers; large ranges are fine for connoisseurs with firm preferences. **moderate** [CHERNEV15][SCHEIBEHENNE10]
20. Put the proposition and the most informative words first in headings; people scan in layer-cake fashion when headings are strong and default to an F when they are not. **moderate** [NNG-F]
21. Expect about half of attention above the fold and three-quarters in two screenfuls; the first screen must carry the proposition, and scroll cues must be real, not decorative. **moderate** [NNG-SCROLL]
22. No auto-rotating carousels; panels change on user action only. **moderate-weak** [NNG-AUTOFWD]
23. Autoplay hero video is unproven for conversion and proven to cost LCP; if used, mute, poster-first, under about 2 MB, honour `prefers-reduced-motion`, and provide a pause control. **weak** on conversion, **strong** on standards [WCAG 2.2.2][WEBDEV-CWV]
24. Treat LCP under 2.5 s and INP under 200 ms as part of the luxury brief; every published A/B in the web.dev set moved revenue in the same direction. **moderate** [WEBDEV-CWV][GOOGLE16]
25. Star ratings and review counts on the product are off-brand for true luxury; where social proof is needed, use editorial press, named advisors or client letters. **weak/opinion** [KAPFERER09][HAN10]; the value of reviews elsewhere is **moderate** [SPIEGEL17]
26. Product pages should lead with material, dimensions, origin and craft, with services stated as facts; this is where top luxury sites already score "good" and where Baymard's testers reward detail. **moderate** [BAYMARD-LUX]
27. Fix the unglamorous: search, filters, out-of-stock paths, delivery dates, returns links in the footer, 7 mm tap targets; these are where luxury sites fail testers. **moderate** [BAYMARD-LUX]
28. Friction can be a feature ("Request an appointment", "Enquire") but only for the purchase step, never for information-seeking. **weak/opinion** [KAPFERER09] constrained by **moderate** [BAYMARD-LUX]
29. 3D/WebGL product viewers correlate with higher conversion in vendor data; treat as promising, not proven, and budget the performance cost. **weak-moderate** [Shopify 2022]
30. Run VisAWI (18 items, or the 4-item short form) on prototypes; simplicity and craftsmanship scores are the ones to maximise for a premium read. **strong** as instrument [VISAWI]

---

## Myths and overclaims

1. **"Users decide in 50 ms whether to stay."** Lindgaard et al. 2006 measured *rated visual appeal* of flashed screenshots and showed the 50 ms rating agrees with the 500 ms rating. Nobody left anything; no behaviour was measured. The honest claim: an appeal judgement forms almost instantly and is stable, and it colours later trust and usability judgements [LINDGAARD06][LINDGAARD11].
2. **"The brain processes visuals 60,000 times faster than text."** No study exists. Alan Levine's 2012 crowd-sourced hunt (with a cash bounty) traced it to a 1998 3M sales presentation quoting an unnamed source and a 1982 Business Week ad insert. Images are faster to recognise than words, by orders of magnitude less than this. https://cogdogblog.com/2012/07/60000-times-question/
3. **"People remember 10% of what they read, 65% of pictures after three days."** Popularised in Medina's *Brain Rules*; no primary experiment with those numbers is locatable. The picture superiority effect is real; the percentages are not from a citable study [PICSUP].
4. **"94% of first impressions are design-related."** From Sillence et al. 2004: 15 women, health websites, 94% of comments *about rejected sites* mentioned design. It is a qualitative coding ratio, not a population statistic about first impressions [SILLENCE04].
5. **"75% of users judge credibility by design" / "Stanford says design is 75% of credibility."** Garbling of Fogg 2003, where "design look" was the most-cited of 18 credibility factors, mentioned in 46% of comments by a non-representative sample [FOGG03].
6. **"53% leave after 3 seconds."** Real 2016 Google aggregate, but it is a correlation on a since-removed report with disputed sample size, and the later "32% more bounces at 3 s" is a neural-network prediction, not an observation [GOOGLE16][GOOGLE17]. Use the A/B case studies instead [WEBDEV-CWV].
7. **"92% of consumers read reviews; 88% trust reviews as much as personal recommendations."** The 88% is BrightLocal's 2014 Local Consumer Review Survey (about 2,100 panel respondents), and most of that 88% was conditional ("if there are multiple reviews", "if they seem authentic"). BrightLocal's own figure fell to 76% in 2019 and lower after answer options changed in 2022. No primary source for the "92% read" figure was found; it circulates uncredited. https://www.brightlocal.com/research/local-consumer-review-survey-2014/
8. **"Reviews should be 4.2-4.5 stars."** Spiegel 2017 published 4.0-4.7; the narrower band is secondary-source drift [SPIEGEL17].
9. **"The F-pattern means put everything top-left."** NN/g's own 2017 article calls the F-pattern a symptom of weak formatting and tells designers to prevent it [NNG-F].
10. **"Nobody scrolls / the fold does not matter."** Both wrong: 57% of viewing time is above the fold, 74% in two screenfuls, and people do scroll when the first screen earns it [NNG-SCROLL].
11. **"Choice overload: offer no more than three options."** The 2010 meta-analysis found a mean effect near zero; the 2015 one found it depends on complexity, difficulty, preference uncertainty and goal. The jam study is a single field demonstration that has not replicated cleanly [SCHEIBEHENNE10][CHERNEV15].
12. **"Zeigarnik effect: unfinished things stick in memory, so use progress bars/teasers."** The 2025 meta-analysis finds no memory advantage; only the tendency to resume (Ovsiankina) holds [ZEIGARNIK27].
13. **"Urgency timers always lift conversion."** Field data from discount retail says sometimes; the only controlled study on a premium-neutral store says they lower perceived benevolence and UX, and regulators now treat fake timers as deceptive [TUNCER23][FTC22].
14. **"Video heroes convert 80% better."** Vendor landing-page benchmarks with no methodology; expert panels at the same vendors do not recommend autoplay. Treat as untested.
15. **"3D/AR gives +94% conversion."** Shopify merchant-level correlation (merchants who bother with 3D differ in many ways), not an experiment.
16. **"Luxury customers do not buy online" / "online will be the leading luxury channel by 2025."** Both Bain claims are dated (2009-era doctrine and a 2020 forecast). Online grew to about a quarter of luxury sales and then flattened; the 2025 study emphasises value and trust, not channel [BAIN25][KAPFERER09].
17. **"Awwwards winners show what converts."** They show what juries of designers and developers admire; none publishes conversion data, and most winners are brand films or agency sites [AWWWARDS].
18. **The aesthetic-usability effect as a licence.** The meta-analytic effect of aesthetics on real performance is small (g about 0.2-0.3) and heterogeneous; it shifts perception more than behaviour [THIELSCH19].

## Gaps worth stating in the skill

- No published controlled study tests "luxury-styled page vs conventional page" on purchase behaviour; Kluge et al. 2013 is perception-only and lab-only.
- No independent controlled study on autoplay hero video, scrollytelling, kinetic typography or WebGL heroes and conversion was found for 2024-2026.
- Baymard's luxury detail is paywalled; cite the 2021 public article for specifics and the 2024 benchmark for scope.
- NN/g has not published new large-scale eyetracking reading data since 2017-2018; the 2026 "reviewed" stamp adds no new numbers.

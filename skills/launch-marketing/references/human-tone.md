# Human tone: removing GTM slop from copy

Test for every piece: "Would a good founder who knows the product and the reader actually send this?" Use this file when rewriting or auditing landing pages, launch posts, cold emails, LinkedIn posts, carousels, one-pagers and onboarding emails.

## Audit process

1. Read the whole input first. Do not start fixing sentence one.
2. Identify the format (landing page, cold email, launch post, carousel, newsletter) because each has its own tells.
3. Identify the target reader: developer, founder, buyer, patient, general public. The same sentence can be fine for one and slop for another.
4. Scan for all 18 patterns below and the tiered word lists, mark every hit, and score it (pass 1 in [Tiered slop score](#tiered-slop-score-two-passes)).
5. Rewrite: specifics replace vague claims; active replaces passive; direct replaces hype; one purpose per sentence.
6. Pass 2: rescore the rewritten text from scratch, then run the Horoscope Test. Ask "What still reads like AI or generic marketing copy?" and fix it. Do not present copy that fails the threshold.
7. Present in three parts: **Rewrite**, **Audit notes** (bullets: what changed and why, plus the score before and after, e.g. "Slop score 17 -> 2, pass (short asset)"), **What to fill in** (placeholders needing a real number, name or quote, e.g. `[fill in: actual customer name]`).

### Voice calibration (optional, when a sample of the person's writing exists)

Note sentence length, word choice, how they open, how they transition, verbal tics. Match them. Fragments stay fragments. If they write "we" and "our team", do not switch to "I". With no sample, default to short sentences, active voice, no hype, peer to peer.

### Signs of dead copy (even when it passes the word list)

- Every paragraph ends on a vague positive.
- No numbers, names or outcomes anywhere.
- Indistinguishable from other products in the category.
- "The leading" or "the only" with no evidence.
- CTA says "Learn more" or "Get started today".
- "We" means the product and "you" means everyone.

### Aim for

- Specific: "cut deploy time from 40 minutes to 8", not "ship faster".
- One person: write to a named role in a situation.
- Say what you do: "a reverse proxy that lets you swap AI providers without touching code" beats "seamless integration layer for modern AI infrastructure".
- End on something real: what happens next, what the reader does, what result to expect.

Deck language versus human language:
- Before: "Our platform serves as a comprehensive solution that empowers development teams to streamline their workflows, fostering collaboration and enhancing productivity across the entire software delivery lifecycle."
- After: "It replaces your deploy scripts with a single CLI command. Most teams get it running in an afternoon. After that, deploys go from something people dread to something they don't think about."

## The 18 slop patterns

### 1. Empty value props
Watch: streamline, empower, transform, revolutionize, unlock, elevate, supercharge, reimagine, next-generation, cutting-edge, world-class, best-in-class, industry-leading, state-of-the-art. They stand where a value prop should be.
- Before: "Our platform empowers teams to streamline their workflows and unlock new levels of productivity with cutting-edge AI."
- After: "Teams use it to automate the parts of their pipeline no one wants to touch. Most save 3-5 hours a week in the first month."

### 2. Significance inflation
Watch: marks a pivotal moment, represents a shift, is transforming the way, is redefining how, changing the game, set to revolutionize, in an era where, in today's rapidly evolving landscape.
- Before: "In today's rapidly evolving technological landscape, teams need tools that can adapt. Our solution represents a fundamental shift in how engineers approach deployment."
- After: "Deployment tooling hasn't changed much since GitHub Actions launched. We built something that works differently. Here's how."

### 3. Fake social proof
Watch: industry leaders, top companies, forward-thinking teams, innovative organizations, leading enterprises, thousands of developers, growing community of, trusted by. Vague proof is worse than none: name customers (with permission) or describe the customer type precisely.
- Before: "Trusted by thousands of developers and forward-thinking teams across the globe."
- After: "Used by backend teams at [customer], [customer], and a handful of YC companies building on top of LLMs. None of them asked us to say that; we asked if we could."

### 4. Feature lists dressed as benefits
"-ing" phrases bolted onto features.
- Before: "Advanced analytics, providing deep visibility into every step of your pipeline. Seamless integrations, connecting effortlessly with your existing tools. Real-time monitoring, ensuring you never miss a critical event."
- After: "You can see exactly where builds are failing and why, without digging through logs. It connects to whatever you're already using: Slack, PagerDuty, GitHub. When something breaks at 2am, it tells you before your users do."

### 5. Mission statement creep
Watch: our mission is to, we believe that, we're on a mission, we exist to, we're committed to, our vision is, we're passionate about. Buyers care whether you solve their problem.
- Before: "At Acme, we believe that every developer deserves tools that work as hard as they do. We're committed to building software that empowers teams to do their best work."
- After: "We built Acme after two years at a fintech where every deploy took 45 minutes and broke something. We couldn't find anything that fixed it, so we built it ourselves."

### 6. Cold-email AI tells
Kill: "I came across your profile and was impressed by...", "I hope this email finds you well", "I wanted to reach out because...", "Would you be open to a quick 15-minute call?", "I'd love to learn more about your challenges", "Looking forward to connecting", "Feel free to reach out if you have any questions", non-specific compliments, three sentences of intro before saying what you do.
- Before: "Hi [Name], I hope this email finds you well. I came across your company and was impressed by the work you're doing in the AI space. I wanted to reach out because I think our platform could add significant value to your workflow. Would you be open to a quick 15-minute call to explore synergies?"
- After: "Hi [Name], saw you're building an LLM pipeline at [Company]. We help teams like yours cut API costs by routing between providers automatically. Worth a look? Happy to show you the setup we use at similar-stage companies."

### 7. Performative transparency
Watch: I'll be honest with you, to be transparent, candidly, I want to be upfront, the truth is, here's the thing. Real transparency does not announce itself.
- Before: "I'll be honest with you: most tools in this space overpromise. The truth is, we've taken a different approach, and candidly, the results speak for themselves."
- After: "Most tools in this space charge per seat and lock you into annual contracts. We don't. Month to month, cancel any time, pricing on the website."

### 8. "Whether you're... or..." false range
It avoids committing to a customer.
- Before: "Whether you're a solo developer building your first app or an enterprise team managing hundreds of microservices, our platform scales with your needs."
- After: "It's built for teams that have outgrown Heroku but don't want to manage Kubernetes themselves. Usually 5-50 engineers."

### 9. Launch-post hype
Kill: "We're thrilled/excited/stoked to announce...", "After months of hard work...", "Today is a big day for us...", "We couldn't have done it without our amazing team...", "We'd love your support!" plus link.
- Before: "We're incredibly excited to announce the launch of our new platform! After months of hard work, late nights, and countless iterations, we're finally ready to share it with the world."
- After: "We shipped the thing. It does X. If you've dealt with [specific problem], it's probably worth 10 minutes of your time. [link] We're around in the comments if anything's unclear."

### 10. Vague CTAs
Replace: "Learn more" with what they will learn; "Get started today" with what getting started means; "Book a demo" with what happens in the demo; "Try it free" with how long, what is included, what they will see; "Reach out" with how and why.
- Before: "Ready to transform your workflow? Get started today and learn more about how we can help your team reach its full potential."
- After: "Sign up, connect your repo, and you'll have a working deploy pipeline in under an hour. No credit card. [link]"

### 11. AI vocabulary
Cut: actually, additionally, align with, comprehensive, crucial, cutting-edge, delve, elevate, empower, enhance, ensure, foster, garner, groundbreaking, highlight, holistic, innovative, intricate, journey, key (as adjective), landscape (abstract), leverage, paradigm, pivotal, robust, seamless, showcase, solution (for product), streamline, synergy, tapestry, testament, transformative, underscore, unlock, utilize, valuable, vibrant. If it is on every SaaS homepage, cut it.

A random "actually" dropped mid-sentence ("it actually works", "which actually matters") is one of the strongest single-word tells; keep it only when it contrasts with an expectation you have just stated.

### 12. Copula avoidance
Watch: serves as, stands as, functions as, operates as, acts as, represents, boasts, features, offers. Say what it is.
- Before: "The dashboard serves as a central hub for your operations, offering real-time insights and featuring advanced filtering capabilities."
- After: "The dashboard shows your pipeline in real time. You can filter by team, environment, or date."

### 13. Rule of three
AI forces benefits, bullets and clauses into threes.
- Before: "Build faster, ship smarter, and scale confidently."
- After: "You'll spend less time on deploys. That's the pitch."

### 14. Negative parallelism ("not just X, it's Y")
- Before: "It's not just a deployment tool. It's a complete platform for modern engineering teams."
- After: "It handles deploys, rollbacks, and environment config. Most teams use it instead of maintaining their own scripts."

### 15. Em dashes as fake punch
- Before: "We built it for developers—not DevOps teams—who want deploys to just work—without the overhead."
- After: "We built it for developers who want deploys to just work, without having to become a DevOps expert to get there."

### 16. Hedging stacks in technical claims
- Before: "Our solution could potentially help reduce infrastructure costs by up to possibly 40% in some cases."
- After: "Customers typically cut infrastructure costs 30-40% in the first quarter. It depends on how much you're over-provisioned."

### 17. Generic positive closers
- Before: "The future is bright for teams that embrace this approach. Together, we can build a better ecosystem for developers everywhere."
- After: "That's what we're building. If it sounds like something you'd use, try it."

### 18. Passive voice and abstract agents hiding the product
- Before: "Workflows are automated. Errors are caught before they reach production. Teams are empowered to ship with confidence."
- After: "It catches errors before they hit production. Your team ships without running through a manual checklist first."

The active-voice version of the same hiding is an abstract noun given agency: "this approach unlocks potential", "our methodology drives results", "the platform fosters collaboration". Something that is neither a person nor the product does the verb, and the reader learns nothing. Name who does what to whom.
- Before: "This approach unlocks potential across your organization and drives meaningful outcomes."
- After: "Your ops lead gets the weekly report on Monday morning instead of building it on Friday afternoon."

## Extra scrub lists for social and community copy

- **Filler intensifiers:** incredibly, absolutely, essentially, literally, really, significantly, simply, truly, ultimately, very. Replace with the specific: "very fast" becomes "runs in 12 ms".
- **Hedge phrases:** it's worth noting, I should note, it remains to be seen.
- **Throat-clearing and connectors:** in conclusion, first and foremost, furthermore, moreover, "however" at sentence start, thus, hence, in summary.
- **Structural tells:** "This ensures that", "This allows for", "Let's dive in", "Buckle up", "A thread on", "Quick thread:".
- **Instant-delete sentences in community posts:** "Try X today", "Sign up now", "I came across this great tool" (fake discovery), "our users/customers" from an account with no community history, "I made X and you can use it to..." followed by a link, unqualified superlatives, any product link in a Reddit body.
- **Launch and changelog openers:** excited/pleased to announce, we are thrilled, just shipped / just wanted to share, big announcement.
- **Outreach pleasantries:** hope this finds you well, Happy Monday, just wanted to, just following up, touch base, circle back, ping, loop in, bandwidth, low-hanging fruit, move the needle.

## Union banned-word list (all channels)

streamline, empower, transform, revolutionize, reimagine, unlock, elevate, supercharge, next-generation, next-level, cutting-edge, state-of-the-art, world-class, best-in-class, industry-leading, enterprise-grade, seamless, robust, powerful, innovative, game-changing, game-changer, groundbreaking, remarkable, transformative, disruptive, leverage, utilize, harness, synergy, synergize, delve, deep dive, dive deep, holistic, comprehensive, actionable, crucial, vital, pivotal, paradigm, journey, landscape, testament, tapestry, delightful, illuminate, unveil, elucidate, skyrocket, realm, embark, navigating, ever-evolving, scalable (as filler), end-to-end, best-of-breed, solution (noun for the product), thrilled / excited / pleased to announce, touch base, circle back, move the needle, low-hanging fruit, bandwidth.

Words that are fine in normal prose but that the X and LinkedIn source rules also flag as padding: can, may, just, very, really, literally, actually, certainly, probably, basically, could, maybe. Treat these as a prompt to check whether the sentence says anything, not as an automatic ban.

## Tiered slop score (two passes)

A score makes reviews consistent between drafts and between reviewers. It is a review heuristic, not an AI detector, and a low score does not prove anything about who wrote the text. The lists above stay the source of truth; this section only says how much each hit weighs. Count each phrase once per occurrence and never score the same words under two rows.

| Tier | What counts | Points |
|---|---|---|
| 1. Always cut | every word in the union banned-word list; the pattern 11 vocabulary; the phrase lists in patterns 1, 6, 9 and 17; the launch openers, outreach pleasantries, instant-delete community sentences, hedge phrases, structural tells and throat-clearing connectors in the scrub lists (except "however"); plus the additions below | +3 per hit |
| 2. Cut when clustered | the Tier 2 list below | +2 per hit, counted only once the asset has 3 or more Tier 2 hits |
| 3. Density | filler intensifiers, the padding words above, qualifiers (quite, rather, somewhat, fairly, relatively), hedges (perhaps, might, could potentially, to some extent), stacked transitions (therefore, consequently, meanwhile) | +2 per paragraph holding 3 or more |
| Patterns | each instance of patterns 2, 3, 4, 5, 7, 8, 10, 13, 14 and 18 | +3 |
| | each instance of pattern 12 (copula avoidance) or 16 (hedging stack) | +2 |
| | each em dash (pattern 15) | +1 |
| Extra structural tells | listed below | +2 or +3 each |
| Horoscope Test | each failing sentence (short assets) or paragraph (long-form) | +5 |

**Tier 1 additions** (not already in the lists above): multifaceted, compelling, meticulous, facilitate, commence, paramount, plethora, myriad, culminate, bolster, spearhead, endeavour; "it's important to note that", "plays a vital / crucial / pivotal role", "it goes without saying", "without further ado", "in essence", "in this article we'll cover". Plain replacements: facilitate -> help; commence -> start; paramount -> most important; plethora / myriad -> many, or the number; culminate in -> end with; bolster -> support, or say how.

**Tier 2** (fine alone, a tell in a cluster): at the end of the day, moving forward, arguably, notably, that said, it's no secret that, firstly / secondly / thirdly, "however" more than twice, paired adjectives doing one job ("fast and reliable", "simple and intuitive").

**Extra structural tells** (not among the 18 patterns):
- Uniform rhythm: three or more consecutive sentences within about three words of each other in length (+3). Vary them; mix a short sentence with a long one.
- Staccato fragments used for drama ("Short. Punchy. Done.") (+3). Keep a fragment only where it carries real emphasis.
- Recap at the end of every section (+2). Summarise only a section that genuinely needs it.
- Synonym cycling: "customers", "clients", "users" and "patrons" for one group in adjacent sentences (+2). Repeat the clearest word.
- Participial tack-ons: "..., highlighting the importance of X", "..., underscoring the need for Y" (+2). Delete, or make it its own sentence with a fact.
- Even coverage: every section the same length whatever its importance (+2). Spend words where the reader's decision is.

**The Horoscope Test.** For every sentence of a short asset (hero, tagline, subhead, email, social post, app-store text) and every paragraph of long-form copy, ask: "Could this sit, unchanged, on any company's site, for any customer, in any year?" If yes, cut it, or replace it with something specific to this product, this reader and this moment: a number, a name, a place, a mechanism, a real constraint. Rephrasing is not a fix. This is the named form of the "specific beats vivid" and fluff-test rules in SKILL.md, so apply it once, here.

**Pass threshold**

| Score | Long-form (about 500+ words) | Short asset (under about 300 words) |
|---|---|---|
| Pass | 0-5 | 0-2 |
| Review the flagged lines | 6-12 | 3-6 |
| Rewrite the flagged sections | 13-20 | 7+ (rewrite the asset) |
| Full rewrite | 21+ | |

Between 300 and 500 words, use the long-form bands. Hard gates regardless of score: zero Tier 1 hits, zero Horoscope Test failures, zero em dashes in social copy, zero invented specifics. A draft that misses a gate fails even at a low score.

**Two passes**
1. **Detect and rewrite.** Quote each hit, name its tier or pattern, write the replacement, apply all of them, and note the score.
2. **Rescore from scratch.** Rewrites reintroduce tells, so scan the new text as if seeing it for the first time. Look for banned-for-banned swaps (leverage -> harness: both are banned; write "use"), transitions that survived, copulas creeping back, a new rule of three, the rhythm going uniform again, and overcorrection (every sentence a fragment, every paragraph opening "Look,"; one technique repeated becomes its own tell). Run the Horoscope Test last, record the final score, and show "before -> after" in the audit notes and the self-QA block.

Removing tells without adding specifics produces sterile copy. If pass 2 leaves only safe, empty sentences, the problem is missing input: go back to the intake for numbers, names and proof, or leave `[fill in: ...]` placeholders.

## Worked example: cold email rewrite

Target: founder of an AI startup that recently raised and has early product-market fit.

- Subject: lowercase and specific, e.g. "GTM for [Company], quick question".
- Open with a specific observed fact: "Saw you raised [round] and are [specific thing from their site or a recent post]. Congrats."
- Say what you do in plain nouns: "Mostly content and distribution: developer-facing carousels, cold outreach sequences, creator partnerships. We've done this for [ref] and [ref]."
- Ask a question they can answer without committing: "Are you running any content right now, or is it all word of mouth at this stage?"
- Low-pressure close: "Either answer is useful. Just trying to see if this is even relevant timing."
- Sign with first name only. Under 100 words.
- Fill-ins to flag: the round, one specific sentence from their site or a post, two real reference clients who gave permission.

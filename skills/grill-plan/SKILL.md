---
name: grill-plan
description: Interrogate a plan until no open decisions remain - a website brief, feature, launch, security scope or business decision. Use whenever the user says "grill me", "poke holes in this plan", "what am I missing", "is this plan solid", "edge cases", "stress-test this" or "before we start building", or shares a brief, spec, roadmap or idea and is about to commit time or money to it, even if they never ask to be questioned. Maps the plan as a decision tree, looks facts up in the repo, docs or web instead of asking, puts only real decisions to the owner in rounds of up to four multiple-choice questions, and ends with a confirmed shared-understanding summary recorded in DECISIONS.md before any work starts. Runs before web-design, luxury-web-design, security-review scoping and launch-marketing positioning.
license: MIT
metadata:
  author: Brimpa
  version: "1.0"
  updated: "2026-10-30"
---

# Grill the plan (decision tree, rounds, then shared understanding)

A plan fails on the decision nobody noticed was still open. This skill finds every open decision, separates facts (your job) from choices (the owner's), and closes them in rounds until nothing is silently assumed. Nothing gets built until the owner confirms the summary.

## How to run this

1. **Read everything first.** The brief, the conversation, the repo (README, CLAUDE.md, package files, an existing DECISIONS.md or plan file, docs), and any linked pages. Note what is already decided so you never ask it again.
2. **Map the decision tree.** Write the plan's goal in one line, then branch: each decision lists the decisions that hang off it. A website brief usually runs audience and job, then offer and proof, then pages and sections, then stack and hosting, then launch date; a feature runs user and trigger, then data and permissions, then failure cases, then rollout. Keep the tree in your working notes, or under "Open" in DECISIONS.md for a long session.
3. **Split facts from decisions.** For every node ask: could I find this out? Facts (current stack, what a hosting plan includes, what a law requires, a competitor's price, whether an API exists, what a library supports) are looked up in the repo, docs or web, with a sub-agent where the tool allows so the main thread is not blocked. Only choices that trade one outcome against another go to the owner. A fact becomes a question only when the owner is the sole source (their budget, deadline, a client's preference); say where you already looked.
4. **Compute the frontier.** The frontier is every open decision whose prerequisites are settled. A question that depends on another question still open belongs to a later round. A pending lookup blocks only the questions downstream of it; ask the rest now.
5. **Ask one round** (format below), then wait. Never proceed on an answer you assumed.
6. **Update the tree.** Record each answer, close settled branches, open the branches it created (choosing online booking opens payment, reminders and a cancellation policy), drop branches it made irrelevant, and recompute the frontier. If an answer contradicts an earlier decision, raise the conflict in the next round.
7. **Repeat until the frontier is empty**: every branch visited, every edge case either decided or explicitly parked by the owner.
8. **Write the shared-understanding summary** (template below), get the owner's confirmation, record it, and only then hand off or start work.

## How to ask a round (owner preference, mandatory)

- Deliver every round through the AskUserQuestion tool, at most 4 questions per call. If the frontier holds more, ask the 4 that unblock the most downstream decisions and keep the rest for the next round.
- Before the call, write a short plain explanation (two to four sentences): what is settled, what this round decides and why it matters now. Explain any new term in everyday words.
- Each question gets a short header, one clear question and 2-4 options. Put the recommended option first and end its label with "(Recommended)". Give every option a one-line description of its consequence (cost, time, risk, what it rules out), not a restatement of the label.
- Do not write an "Other" option; the tool adds one automatically. Treat an "Other" answer as new information: update the tree and ask whatever it opens next round.
- Use multi-select only when the options genuinely combine (which pages to include, which channels to launch on).
- Recommend from evidence: the brief, what you looked up, the relevant sibling skill's rules. With no basis for a recommendation, say so in the context paragraph and put the most reversible option first.
- If AskUserQuestion is not available (claude.ai, some desktop clients), ask the same round as a numbered list with lettered options, recommended first, each with its consequence line.

## What to probe (only the branches the plan actually has)

| Plan type | Branches people forget |
|---|---|
| Website brief | the one action the page must get; what imagery truly exists; who writes and approves copy; who owns domain, email and hosting; where form submissions go; what personal data is collected; who maintains it after launch |
| Feature | who triggers it and when; empty, error and limit states; who can see whose data; migrating existing data; how to switch it off; how success is measured |
| Launch | the single audience and first channel; the date and what moves if it slips; proof that exists today; what happens to the first sign-ups; support load |
| Security scope | in-scope assets and environments; out-of-scope actions (payments, real users, mass email); test accounts; who receives findings and by when |
| Business decision | the alternative being rejected; reversibility and cost of being wrong; the deadline; who else must agree; what evidence would change the answer |

## Output: shared-understanding summary

```
Shared understanding: <plan name>                    Date: <YYYY-MM-DD>
Goal:          <one line>
Decided:       <decision -> choice -> why, one line each>
Facts found:   <fact -> source (file, doc URL, date checked)>
Parked:        <edge cases the owner deferred, with the trigger to revisit>
Assumptions:   <anything still assumed; empty, or each one owner-approved>
Next step:     <which skill or task starts, and its first action>
```

Confirm it with one last AskUserQuestion ("Confirm and start (Recommended)" / "Change something"). On confirmation, write it to `DECISIONS.md` in the project root, or to the project's existing plan file (PLAN.md, a spec, a decisions folder) if there is one. Newest entry on top, dated, each decision a sentence a stranger could follow. Create the file only when the first entry is ready.

## Anti-patterns

- Asking the owner a fact you could look up ("which framework is this?" when package.json says so).
- Dumping twenty questions at once, or asking a question whose answer depends on another open question in the same round.
- Options without a consequence line, or a recommended option that is not first.
- Leading questions that hide a choice you already made; state the recommendation openly instead.
- Starting work, writing code or drafting copy before the summary is confirmed.
- Grilling a trivial or fully specified task: if the frontier is empty after step 3, say so in one line and proceed.

## When the user pushes back

- "Just start, stop asking." Offer one final round with only the blocking decisions (at most 4), list every other assumption in the summary, and get that confirmed.
- "You decide." Take the recommended option, record it as "delegated to Claude" in DECISIONS.md, and flag any choice that is expensive to reverse.
- "I don't know yet." Park it with a trigger ("decide before copy is written") and continue with the branches that do not depend on it.

## Hand-offs

- **web-design**: the confirmed summary is the brief reading in its step 1; pass the audience, the one action, the imagery that exists and the constraints.
- **luxury-web-design**: put its stakes test and Goal test to the owner in the first round; the summary carries the site's one job and its one button into that skill's gate.
- **security-review**: the security-scope branches fill its "Scope and inputs" table (in-scope assets, out-of-scope actions, test accounts, report recipient).
- **launch-marketing**: the decided audience, alternative and proof feed its positioning step; do not re-ask what the summary settled.
- **dpdp-legal-compliance**: any branch that collects or shares personal data goes there before it is decided.

## References

- `references/sources.md`: read this for where the method came from (mattpocock/skills, MIT), what was adapted, and why not to install the whole upstream plugin beside this collection.

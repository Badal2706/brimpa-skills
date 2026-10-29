# Sources for the grill-plan skill

The method (decision tree, rounds over a frontier, facts looked up rather than asked, done only when the owner confirms a shared understanding) is adapted from Matt Pocock's grilling skills. The wording, the AskUserQuestion round format, the plan-type probe table, the summary template, DECISIONS.md recording and the hand-offs are this collection's own. No upstream text is copied.

| Source | URL | License | What was taken |
|---|---|---|---|
| `grilling` skill (mattpocock/skills, `skills/productivity/grilling/SKILL.md`), read at commit a496f55 (2026-10-29), plugin version 1.3.2 | https://github.com/mattpocock/skills | MIT, Copyright (c) 2026 Matt Pocock | Adapted in our own words: map the plan as a design tree; work it in rounds; the frontier is every decision whose prerequisites are settled; a question that depends on another open question waits for a later round; finding facts is the agent's job, decisions are the user's; dispatch a sub-agent for lookups and block only the questions downstream of it; finish when the frontier is empty and do not act until the user confirms shared understanding; give a recommended answer with each question. |
| `grill-me` skill (same repo, `skills/productivity/grill-me/SKILL.md`) | https://github.com/mattpocock/skills | MIT | The idea of a user-facing entry point for the grilling interview; it only invokes `grilling`. Trigger phrase "grill me". |
| `grill-with-docs` skill (same repo, `skills/engineering/grill-with-docs/SKILL.md`) | https://github.com/mattpocock/skills | MIT | The idea of recording decisions as the interview settles them (upstream writes a GLOSSARY.md and ADRs through its `domain-modeling` skill). Here this is simplified to one dated DECISIONS.md or the project's existing plan file, created only when the first entry is ready. |

Owner preference (not from upstream): every round goes through the AskUserQuestion tool with at most 4 questions, 2-4 options each, the recommended option first and marked "(Recommended)", a one-line consequence per option, and a short plain explanation before asking. Upstream instead prints numbered questions with a recommended answer and words them so "yes" accepts it.

## Do not install the whole upstream plugin alongside this collection

As of 2026-10-30 the `mattpocock-skills` plugin (v1.3.2) installs 27 skills at once. Some names clash with built-in Claude Code skills or are generic enough to shadow other skills: `code-review` has the same name as Claude Code's built-in `/code-review`, and names such as `research`, `pr`, `implement`, `triage`, `teach` and `handoff` compete for the same triggers as other installed tools. Its `grill-me` and `grilling` would also compete with this skill for "grill me". If you want one upstream skill for comparison, install that single skill (the skills CLI takes `--skill <name>`; read its SKILL.md and licence first, see `knowledge/dev-tools/agent-skills-ecosystem.md`) rather than the plugin, and remove it when done.

Cross-referenced sibling skills in this collection: web-design (step 1, brief reading), luxury-web-design (stakes and Goal gate), security-review (Scope and inputs), launch-marketing (positioning), dpdp-legal-compliance (personal-data branches).

## MIT notice

MIT requires keeping the copyright and permission notice with copies or substantial portions of the software. This skill copies no upstream text or code; the attribution above is kept anyway.

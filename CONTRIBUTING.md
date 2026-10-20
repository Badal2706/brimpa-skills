# Contributing / authoring conventions

These are the rules every skill in this repo follows. Keep them when editing or adding a skill so the set stays consistent.

## Format (Agent Skills spec)

```
---
name: <skill-name>            # equals the folder name; a-z 0-9 and single hyphens; max 64
description: <text>           # 1-1024 chars; strongest trigger words in the first 200 (claude.ai UI cap)
license: MIT
metadata:
  author: Badal Patel
  version: "1.x"
  updated: "YYYY-MM-DD"
---
```

- The description is the only trigger. Say what the skill does and list the concrete situations and phrases that should trigger it, including cases where the user does not name the topic.
- Keep `SKILL.md` under 500 lines. Long checklists, tables and templates go in `references/`, each linked from `SKILL.md` with one "read this when..." sentence. Reference files over ~300 lines start with a table of contents.
- Wrap the description in double quotes if it contains `: ` or ` #`.

## Writing

- Imperative voice. Explain why a rule exists in a short clause when it is not obvious.
- Workflow first ("How to run this"), then rules, then output/report template, then anti-patterns and "when the user pushes back", then hand-offs and the reference index.
- Concrete numbers only when they come from a cited source or a well-known standard. Date anything that changes: "as of Oct 2026".
- Security content is defensive and audit-check level: what to verify, the secure configuration. No exploit payloads or bypass techniques.
- Scraping and reverse-engineering content leads with authorization, robots.txt/ToS and legal red lines.
- No promotional content, course plugs or social-media handles.

## Attribution

Each skill has `references/sources.md` with the upstream source, license and what was taken. Repo-level credits live in `NOTICE` and `SOURCES.md`. Apache-2.0 sources require keeping their attribution.

## Before pushing

```
pwsh scripts/validate.ps1            # names, descriptions, referenced files, line counts
claude plugin validate --strict .    # if Claude Code is installed
```

Bump `version` in `.claude-plugin/plugin.json` and `.claude-plugin/marketplace.json` whenever a skill changes, so `/plugin update` picks it up. Re-package for Claude Desktop with `scripts/package-skills.ps1`.

## Facts that age fastest

Google rich-result support and spam policies (seo-geo-audit), AI crawler user agents (seo-geo-audit, llm-app-security), DPDP Rules commencement dates (dpdp-legal-compliance), OWASP editions (security-review, llm-app-security), Scrapling and REA install commands (web-scraping, reverse-engineering). Re-verify against primary sources every few months.

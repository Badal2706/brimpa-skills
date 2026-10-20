# Brimpa Skills

_By Brimpa. Previously published as `badal-skills`; this repo replaces it._

Reusable [Agent Skills](https://agentskills.io/specification) for shipping websites and software, distilled from a year of collected security checklists, design systems, SEO playbooks, compliance guides and launch prompts, then re-verified against primary sources as of **October 2026**.

Works with Claude Code, Claude Desktop / claude.ai (including Cowork), and any agent that reads `SKILL.md` files (Codex, Cursor, Gemini CLI, OpenCode and others via `npx skills add`).

## The skills

| Skill | Use it when you… | Replaces / merges |
|---|---|---|
| [security-review](skills/security-review/) | are about to ship or deploy an app, API or SaaS; want a quick pre-launch pass or a full audit with a report | Cloudflare security-audit-skill, Strix methodology, OWASP 2025, the "6 prompts before production" list, two social-media security checklists |
| [llm-app-security](skills/llm-app-security/) | build chatbots, RAG, agents, MCP servers, "Summarize with AI" buttons, or your brand is read by AI assistants | Strix LLM/agentic knowledge, OWASP LLM Top 10 2025 and Agentic Top 10 2026, Microsoft Defender + mavek.ai recommendation-poisoning research |
| [dpdp-legal-compliance](skills/dpdp-legal-compliance/) | handle personal data of Indian users, need consent/notice/breach/rights flows, or a pre-launch legal checklist | DPDP founder guide, DPDP Rules 2025 (verified), DPDP audit prompt, 20-item legal launch list |
| [ui-ux](skills/ui-ux/) | design or review any screen: web apps, dashboards, admin panels, mobile, desktop, forms, tables, onboarding, accessibility | impeccable (modes, craft floor, critique rubric), taste-skill app rules, ui-ux-pro-max UX guidelines and tokens, UX laws |
| [web-design](skills/web-design/) | build a marketing site, landing page, portfolio, clinic or local-business site and want it to look like *this* client, not like every AI site | Anthropic frontend-design, impeccable, taste-skill directions, ui-ux-pro-max style catalog, 12 landing-page animation recipes |
| [seo-geo-audit](skills/seo-geo-audit/) | audit or launch a site for Google, Maps and AI search (AI Overviews, ChatGPT, Perplexity, Claude) | my old local-seo-audit v1, claude-seo, position-me, clinic local-SEO playbook, verified Google changes through Oct 2026 |
| [launch-marketing](skills/launch-marketing/) | write positioning, landing copy, pricing pages, Product Hunt / Show HN / LinkedIn posts, newsletters, outreach; de-slop AI copy | opendirectory (human-tone, brand-alchemy, position-me, launch kits, email) |
| [brand-identity](skills/brand-identity/) | define a palette, type system, logo rules, voice and brand tokens; add an animated mascot | ui-ux-pro-max brand + design references, taste brandkit, Anthropic brand-guidelines pattern, mascot guide |
| [launch-video](skills/launch-video/) | make a 40–60 s product launch film or demo clip from screenshots with a deterministic HTML render pipeline | "Launch Film With Claude" method |
| [web-scraping](skills/web-scraping/) | collect web data you are authorized to collect; choose fetchers, spiders, sanitize for LLMs | Scrapling official skill (linked, not vendored) + alternatives |
| [reverse-engineering](skills/reverse-engineering/) | understand how a shipped artifact works, with evidence, within legal limits | REA (linked, not vendored) |

Each skill folder has a `SKILL.md` (the instructions Claude loads), `references/` (long checklists and templates loaded on demand) and `references/sources.md` (what came from where, with licenses).

## Install

### Claude Code (terminal, VS Code / JetBrains extensions, Desktop "Code" tab)

Option A — as a plugin (recommended, one command, easy updates):

```
/plugin marketplace add Badal2706/brimpa-skills
/plugin install brimpa-skills@brimpa
```

Option B — copy skills into your personal skills folder (works offline, no plugin system):

```bash
git clone https://github.com/Badal2706/brimpa-skills.git
# all skills, for every project:
cp -r brimpa-skills/skills/* ~/.claude/skills/
# or just one skill into the current project:
cp -r brimpa-skills/skills/security-review .claude/skills/
```

Option C — the cross-agent installer (Codex, Cursor, Gemini CLI, OpenCode, 70+ agents):

```bash
npx skills add Badal2706/brimpa-skills            # pick skills interactively
npx skills add Badal2706/brimpa-skills --skill ui-ux -g   # one skill, user-wide
```

Then just describe the task ("review this API before launch", "make this clinic site look premium", "audit SEO for example.com"); Claude picks the skill from its description. You can also type `/security-review` etc.

### Claude Desktop app and claude.ai (chat and Cowork)

Skills here are attached to your Claude account, not to a folder on disk.

1. Turn on **Settings → Capabilities → "Code execution and file creation"** (on Team/Enterprise an Owner enables it under Organization settings → Plugins & skills).
2. Package the skills: run `scripts/package-skills.ps1` (Windows) or `scripts/package-skills.sh` (macOS/Linux). You get one zip per skill in `dist/`, each shaped as `skill-name.zip → skill-name/SKILL.md` (that shape is required).
3. In the app: left sidebar → **Customize → Skills → + → Create skill → Upload a skill** → choose a zip. Repeat per skill.
4. Toggle each skill on under **Your skills**. Use it by describing the task, or type `/` in the message box and pick it.

Alternative for Cowork users: **Customize → Plugins → Add → Add marketplace**, enter `Badal2706/brimpa-skills`, then install the `brimpa-skills` plugin. Account-installed plugins also show up in Claude Code as `brimpa-skills@synced`.

Notes:
- If an upload is rejected for the description, shorten the `description:` line to 200 characters (the claude.ai UI has been documented with a 200-character cap; the spec allows 1024). The packaging script prints which skills exceed 200.
- Cowork and cloud sessions do **not** read `~/.claude/skills/`; the Desktop app's Code tab and scheduled tasks do.
- Free/Pro/Max uploads are private to you. Team/Enterprise can share or publish to the org.

### Update

Plugin install: `/plugin update brimpa-skills@brimpa`. Copied folders: `git pull` and copy again. Desktop uploads: delete the old skill and upload the new zip.

## Publish your own copy on GitHub

```bash
cd "brimpa-skills"
git init -b main
git add .
git commit -m "feat: initial skills collection"
gh repo create brimpa-skills --public --source=. --remote=origin --push
# or create the repo in the GitHub UI, then:
# git remote add origin https://github.com/Badal2706/brimpa-skills.git && git push -u origin main
```

Before every push:

```bash
pwsh scripts/validate.ps1                 # structural checks (names, descriptions, referenced files)
claude plugin validate --strict .         # Claude Code's own validator, if installed
```

Then edit the two placeholders: the `owner.url` in `.claude-plugin/marketplace.json` and `repository` in `.claude-plugin/plugin.json`. Bump `version` in both files when you change a skill, so `/plugin update` picks it up.

The repo layout is the one Claude Code, Claude Desktop/Cowork ("Add marketplace") and `npx skills add` all understand:

```
brimpa-skills/
├── .claude-plugin/
│   ├── marketplace.json   # lets people `/plugin marketplace add you/brimpa-skills`
│   └── plugin.json        # the single plugin that contains ./skills/*
├── skills/<skill-name>/SKILL.md (+ references/)
├── scripts/               # package + validate helpers
├── README.md  SOURCES.md  LICENSE  NOTICE
```

## Sources and licensing

Everything here is MIT. The upstream projects it draws from are MIT, Apache-2.0 or BSD-3-Clause and are credited in [NOTICE](NOTICE), [SOURCES.md](SOURCES.md) and each skill's `references/sources.md`. Two upstream skills (Scrapling, REA) are deliberately **not** copied in; their wrapper skills tell you how to install the official version because both track fast-moving tools.

## Maintenance

Facts that age fastest and should be re-checked every few months: Google rich-result support and spam policies (seo-geo-audit), AI crawler user agents (seo-geo-audit, llm-app-security), DPDP Rules commencement dates (dpdp-legal-compliance), OWASP lists (security-review, llm-app-security). Each skill marks such facts "as of Oct 2026".

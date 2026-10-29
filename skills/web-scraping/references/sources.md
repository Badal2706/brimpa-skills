# Sources for the web-scraping skill

This skill is a wrapper: it carries durable decision rules and an authorization gate, and links to the upstream Scrapling skill instead of vendoring it. Nothing from Scrapling's `references/` is copied here. If a snapshot is ever vendored, keep Scrapling's `LICENSE.txt` beside it and pin the version in the frontmatter.

| Source | URL | License | What was taken |
|---|---|---|---|
| Scrapling (library, CLI, MCP server, `scrapling-official` Agent Skill) by Karim Shoair | https://github.com/D4Vinci/Scrapling | BSD-3-Clause | Adapted: fetcher ladder, session/adaptive/spider mental model, CLI and MCP decision rules, `--ai-targeted` / `main_content_only` sanitization rule, install commands, the "Guardrails (Always)" block. Linked: `agent-skill/Scrapling-Skill/` and `docs/` for the current API. Version read: v0.5 (2026-10-17), which the changelog marks as containing many breaking changes. |
| Scrapling Agent Skill install docs | https://github.com/D4Vinci/Scrapling/blob/main/docs/ai/agent-skill.md | BSD-3-Clause | `npx skills add D4Vinci/Scrapling --skill scrapling-official`, manual zip install path, Claude Code skills directory. |
| Scrapling MCP docs | https://github.com/D4Vinci/Scrapling/tree/main/docs/ai | BSD-3-Clause | `claude mcp add ScraplingServer ...`, `claude_desktop_config.json` entry, Docker variant, HTTP transport auth-token requirement, default port 127.0.0.1:8000. |
| Scrapling Skill zip (manual install) | https://github.com/D4Vinci/Scrapling/raw/refs/heads/main/agent-skill/Scrapling-Skill.zip | BSD-3-Clause | Linked only. |
| skills.sh CLI | https://skills.sh | see repo | Linked as the installer used by `npx skills add`. |
| Crawl4AI | https://github.com/unclecode/crawl4ai | see repo | Linked as the alternative for LLM-ready Markdown; no code or text taken. |
| Maxun | https://github.com/getmaxun/maxun | see repo | Linked as the no-code alternative; no code or text taken. |
| Browser Use | https://github.com/browser-use/browser-use | see repo | Linked as the agentic-browsing alternative; no code or text taken. |
| api-anything by Tianjun Zheng (README and INSTALL.md, v0.3.1, commit 3495ffe, read 2026-10-30) | https://github.com/goodnight000/api-anything | MIT | Facts only, rewritten: learns a site's request from two example inputs and replays it over plain HTTP; MCP tool names; Node 22.13+ and Chromium requirement; sharing is on by default and is turned off with `setup --no-share` (first install) or `setup --no-share --share-only` (existing install), flags checked in the README's "What setup changes" and "What leaves your machine" sections; searches still reach the catalog with sharing off; `login` imports browser-profile cookies; writes need `--allow-writes`; `--dry` shows a request with credentials redacted. No code taken. |
| agent-browser by Vercel Labs (README, v0.41.0, commit 1453dd3, read 2026-10-30) | https://github.com/vercel-labs/agent-browser | Apache-2.0 | Facts only: native Rust CLI, CDP connection, `snapshot` accessibility tree with refs, `agent-browser mcp` server, opt-in safety flags (`--content-boundaries`, `--max-output`, `--allowed-domains`, `--action-policy`, `--confirm-actions`), `--profile` reuse of Chrome login state. No code or text redistributed, so Apache-2.0 attribution obligations do not arise; keep its LICENSE (and any NOTICE it adds) beside anything ever vendored. |
| Firecrawl | https://www.firecrawl.dev | commercial service | Linked as a hosted alternative; verify terms and data-processing location before use. |
| PaddleOCR | https://github.com/PaddlePaddle/PaddleOCR | Apache-2.0 | Linked as the document OCR alternative. |
| Stirling PDF | https://github.com/Stirling-Tools/Stirling-PDF | see repo | Linked as the self-hosted PDF toolkit alternative. |
| Instagram screenshot tips (various, Jul-Oct 2026) | n/a | summarized as checklists | Only the fact that Crawl4AI, Maxun, Browser Use, PaddleOCR and Stirling PDF exist and their one-line purpose; no promotional claims kept. |
| OWASP Top 10 for LLM Applications (prompt injection, LLM01) | https://owasp.org/www-project-top-10-for-large-language-model-applications/ | public docs, cited | Rationale for treating scraped content as untrusted input. |
| Google Search Central: robots.txt specification | https://developers.google.com/search/docs/crawling-indexing/robots/intro | public docs, cited | Meaning of Disallow and the convention that crawlers honor it. |
| Digital Personal Data Protection Act, 2023 (MeitY) | https://www.meity.gov.in/data-protection-framework | public law, cited | Basis for refusing personal-data collection without a lawful basis; details live in the dpdp-legal-compliance skill. |

Scrapling's BSD-3-Clause license requires keeping its copyright notice, conditions and disclaimer with any redistributed copy, and forbids using the author's name to endorse derived products. This skill redistributes nothing from it.

Cross-referenced sibling skills in this collection: dpdp-legal-compliance (personal data), llm-app-security (handling scraped content inside an LLM application), security-review (if the scraper itself ships as a product).

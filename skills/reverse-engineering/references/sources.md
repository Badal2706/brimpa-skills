# Sources for the reverse-engineering skill

This skill is a wrapper: it carries the legal gate and the evidence-first workflow, and links to the upstream REA skill instead of vendoring it. `npx rea-agents setup` installs and refreshes the matching `reverse-engineer-anything` skill copy itself; a hand-copied version would only go stale against it. Nothing from REA's `references/` is copied here. If a snapshot is ever vendored, keep REA's MIT copyright and permission notice beside it and pin the package version.

| Source | URL | License | What was taken |
|---|---|---|---|
| REA: Reverse Engineer Anything, by morluto (MCP server, CLI, `reverse-engineer-anything` skill) | https://github.com/morluto/rea | MIT (REA-authored code; third-party material keeps its own licences per `THIRD_PARTY_NOTICES.md`) | Adapted: route-by-artifact table, summary-first paging, observation/inference/unknown discipline, passive vs declared runtime distinction, finding-ledger practice, close-session rule, the analysis-capability list. Package version read: 6.7.0; skill metadata version 42. |
| REA `.agents/skills/reverse-engineer-anything/` | https://github.com/morluto/rea/tree/main/.agents/skills/reverse-engineer-anything | MIT | Linked for current tool names, `detail` options and evidence contracts; not copied. |
| REA `docs/installation.md` | https://github.com/morluto/rea/blob/main/docs/installation.md | MIT | Install commands (`npx rea-agents setup`, `--client claude_code --yes`, `--dry-run --json`, `doctor`, manual `claude mcp add --scope local rea ...`), Node version requirements, Claude Desktop "quit first" caveat, MSIX config-path caveat, `CLAUDE_CONFIG_DIR`, `REA_MCP_INPUT_SCHEMA_PROFILE=compact`. |
| REA `DISCLAIMER.md` and README | https://github.com/morluto/rea/blob/main/DISCLAIMER.md | MIT (text) | The red lines (no DRM/licence/anti-cheat circumvention, no cheats, no auth/bot-protection bypass, no copying proprietary code, no AI-policy evasion), "possession is not permission", commercial-engine licensing, supply-chain warning. Summarized, not reproduced. |
| REA `AGENTS.md` | https://github.com/morluto/rea/blob/main/AGENTS.md | MIT | Distinguish observations/derivations/inferences/unknowns; Ghidra ephemeral databases, IDA read-only; redaction defaults. |
| rea.tools (project site) | https://rea.tools | n/a | Linked as the official site. |
| `rea-agents` on npm | https://www.npmjs.com/package/rea-agents | MIT | Linked as the only official package. |
| MCP Registry entry | `io.github.morluto/rea` | n/a | Cited as the registry id. |
| Analysis engines referenced (Ghidra, Rizin, objdump, JADX, Binwalk, Unblob, pwntools, WABT, TShark, sigrok, Playwright; Hopper, IDA Pro/Hex-Rays, JEB) | vendor sites | Various; IDA, Hopper and JEB are commercial | Named only as bring-your-own engines; the user must hold a valid licence for commercial ones. |

Licence note: MIT requires keeping the copyright notice and permission notice with any substantial copy of REA's code or text. This skill redistributes nothing from it.

Cross-referenced sibling skills in this collection: security-review (code you have the source for), dpdp-legal-compliance (personal data discovered inside artifacts or captures), llm-app-security (if the analysed artifact is an LLM-powered application).

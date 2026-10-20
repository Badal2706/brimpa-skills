---
name: reverse-engineering
description: Understand how a shipped binary, app, APK or other artifact works (your own builds, software you are authorized to analyse, interoperability or security research) with REA (Reverse Engineer Anything) as the MCP/CLI tool and an evidence-first workflow. Use whenever the user asks how an app, binary, APK, Electron app, .NET assembly, firmware image, WASM module, browser page or network capture (HAR/pcap) works under the hood, wants to "see how they built that feature", decompile, disassemble, trace IPC or network calls, inspect an installed program, debug a release build without source, verify what a vendor binary really does, or do interoperability work. Also use when someone asks to crack, bypass, patch a licence check, DRM, anti-cheat or login, so the legal gate can answer them. Not for code you already have the source for.
license: MIT
metadata:
  author: Brimpa
  version: "1.0"
  updated: "2026-10-20"
---

# Reverse engineering (evidence-first, REA-backed)

This is a thin wrapper. The durable part is the legal gate and the epistemic workflow; the fast-moving part (REA tool names, `detail` options, schema fields) lives in the `reverse-engineer-anything` skill that `npx rea-agents setup` installs and maintains in `~/.claude/skills/`. REA "changes quickly", so read that installed copy for current tool names and never guess them from memory. A skill fetched from the repository's main branch may describe tools that an older installed npm release lacks; what the connected server advertises wins.

## How to run this

1. Run the legal and ethical gate (next section). If it fails, stop and explain what you can do instead (documented APIs, vendor support, clean-room interoperability notes).
2. Check whether the source is available. If the user has the repository, use normal code-reading tools and skip REA entirely; REA is for claims that depend on a shipped artifact.
3. Write down the questions to answer and the evidence each one needs (static structure, strings, decompiled function, runtime observation). This list is your finding ledger from the start.
4. Confirm REA is reachable (its tools appear). If not, diagnose without changing config, then install with the dry-run / approve / apply / restart sequence in the Install section. Do not loop through setup.
5. Route by artifact type (table below) and request the smallest useful overview first (`detail: "summary"`).
6. Page into retained evidence with `inspect_analysis_view` using the returned `parent_evidence_id` and exact `node_id`s. Batch requests around one hypothesis at a time; do not re-run identical analyses.
7. Corroborate each finding with the evidence type it needs. Use runtime observation only when static analysis cannot answer, and only within the declared scope.
8. Revisit the ledger: mark every question answered, partial or unresolved. Write the report (template below), then close sessions (`close_binary`, browser targets).

## Step 1: legal and ethical gate

Legitimate uses: debugging or auditing software you own or are authorized to examine; security research, incident and malware analysis, vulnerability research with coordinated disclosure; interoperability; software preservation; CTFs and education.

REA's red lines, adopted here as this skill's own:

- No circumventing DRM, licence checks, anti-cheat or other technical protection measures.
- No game cheats and no tampering with online services.
- No bypassing authentication, bot protection or access controls on systems you are not authorized to test.
- No copying proprietary software or reproducing protected code or assets; decompiled output is not yours to ship.
- No evading AI providers' usage policies, no reselling or sharing accounts.

Permission is specific, not implied. Public availability, possession of a file or access to a debugging endpoint does not by itself grant permission for every operation. Authorization to inspect an artifact does not authorize executing it, intercepting its traffic, changing a device or interacting with another party's servers. Commercial engines (IDA/Hex-Rays, Hopper, JEB) must be legally licensed; REA grants no licence to them, and trials remain subject to vendor terms.

For interoperability work, prefer clean-room notes: one person records observed behaviour (formats, protocols, sequences) with evidence IDs; the implementer works from the notes, not the decompiled code. Before publishing or reusing any reconstruction, check the rights situation; source-like output grants no rights to the original program.

## Install (as of Oct 2026)

Requirements: Node.js 22.x (>= 22.19), 24.x (>= 24.11) or 26+, plus npm. Some features need Node 24.15+/26 (SQLite inspection). Linux needs a procps-compatible `ps` on PATH. Analysis engines are bring-your-own (Hopper, Ghidra, IDA, Kuna, Rizin, objdump, JADX with a full JDK, Binwalk/Unblob, pwntools, WABT, TShark); setup installs none of them except Hopper on a separate explicit approval (`--install-hopper`). Static JavaScript/Electron and .NET inspection need no external engine.

Interactive, any supported client (multi-select agents, review the plan with exact paths and backups, approve, restart the agent):

```bash
npx rea-agents setup          # or: npx rea-agents@latest setup
```

Scripted, Claude Code:

```bash
npx -y rea-agents@latest setup --client claude_code --dry-run --json   # read-only plan
npx -y rea-agents@latest setup --client claude_code --yes              # apply
npx -y rea-agents@latest doctor --client claude_code --json            # verify registration
```

Setup writes `mcpServers.rea` into `~/.claude.json` (user scope) and the skill into `~/.claude/skills/reverse-engineer-anything` (`--skill=false` to omit). `CLAUDE_CONFIG_DIR` is honored for a separate profile. Manual project-local registration without the skill (the docs advise against `--scope project`, which writes a committable `.mcp.json`; replace the version with the current release):

```bash
claude mcp add --scope local rea -- npx -y rea-agents@<version> mcp
# native Windows:
claude mcp add --scope local rea -- cmd.exe /d /c npx -y rea-agents@<version> mcp
```

Claude Desktop: quit the app fully first (a running app rewrites its config from memory and drops the registration) and run setup from a terminal Claude Desktop did not start:

```bash
npx -y rea-agents@latest setup --client claude_desktop
```

CLI without MCP, same workflows and evidence contracts: `npx -y rea-agents@latest analyze-javascript-application /absolute/path/to/app --json`; or `npm install --global rea-agents`, then `rea --help`, `rea update`, `rea analyze PATH --provider ghidra --json`, `rea inspect-managed-artifact Assembly.dll --json`. Use `--json` in scripts (the default output is TOON). Exit code 0 means completed, which may still include partial evidence and unknowns; 1 means failed.

Supply chain: trust only `morluto/rea`, rea.tools and the `rea-agents` npm package (MCP Registry id `io.github.morluto/rea`). If Claude Code runs against a non-first-party `ANTHROPIC_BASE_URL`, tool search is off and REA's roughly 172 tool schemas are sent on every request; set `REA_MCP_INPUT_SCHEMA_PROFILE=compact` in the server's `env`.

## What REA can analyse

Desktop installation directories; native binaries (pseudocode, assembly, strings, symbols, xrefs via Hopper/Ghidra/IDA); offline ELF layout; Go and Rust build metadata (built-in); WASM; EVM bytecode; SQLite snapshots; Linux core dumps; JavaScript/Electron apps (ASAR or extracted tree: modules, imports, source maps, routes, IPC, native add-ons); websites via CDP (page structure, scripts, network, screenshots); HAR/SAZ/mitmproxy/qlog captures; .NET assemblies (metadata and CIL, static only; not NativeAOT bodies, single-file hosts or IL2CPP); Android APKs (manifest, classes, decompiled methods via headless JADX), devices via adb, Apktool resources, Flutter, JEB projects; firmware; packet captures; logic-analyser recordings; Apple bundles, IPA and DMG; process behaviour capture (Linux/macOS PTY).

## Route by artifact type

Pick the first tool from the artifact, then go summary-first. Names below are as of Oct 2026; confirm against the installed skill.

| Artifact | First tool | Then |
|---|---|---|
| Electron app, ASAR, JS tree | `analyze_javascript_application` | modules, IPC surfaces, routes, source maps |
| Native binary, archive, installer directory | `open_binary` | `binary_overview`, `search_strings`, `analyze_function`, pseudocode, `xrefs`; `close_binary` at the end |
| .NET assembly | `inspect_managed_artifact` | metadata, CIL |
| Android APK | `inspect_android_package` | manifest, classes, decompiled methods |
| Firmware image | `inspect_firmware_regions` / `extract_firmware` | per-region analysis |
| Web page you own or may test | `list_browser_targets` (passive) | `capture_browser_scenario` only when you must click/type, with declared actions |
| HAR / SAZ / proxy capture | `inspect_web_network_capture` | request/response structure, redacted by default |
| Go / Rust / WASM / SQLite / EVM / PE resources | `inspect_go_binary`, `inspect_rust_binary`, `inspect_wasm_artifact`, `inspect_sqlite_database`, `inspect_evm_interface`, `inspect_pe_resources` | as returned |

If the user says "my app" without a name or path, ask; never pick an example app for them.

## Evidence discipline

- Summary first, then page. Request `detail: "summary"`, then `inspect_analysis_view` with exact ids. On a transport `resource_constraint`, use views or `export_evidence_bundle`. A result truncated by the client is incomplete, never canonical JSON.
- Separate observations, inferences and unknowns in every statement, and cite Evidence IDs for observations. Preserve limitations and coverage from the tool output.
- Static never implies execution. An IPC channel, preload surface or manifest entry seen in code is not proof it is reachable at runtime or that a policy is enforced. Decompiled pseudocode is not original source.
- Absence is scoped: an empty result proves absence only within the scope actually examined, not in the artifact as a whole.
- Parse resources and config with format-aware parsers alongside code; do not infer behaviour from filenames or string fragments.
- Runtime is opt-in and declared. Passive CDP observation never clicks, navigates or evaluates page JS, and REA does not contain the page's network; scenario captures run only the declared actions; process captures and `observe_native_calls` really execute the target with your user's permissions, so treat them like running unknown software. Passive captures redact credentials, header values, storage values and raw bodies by default; keep it that way unless the user owns the data.
- Ghidra sessions use ephemeral databases and never modify executable bytes; IDA analysis is read-only. Do not patch artifacts.
- When building your own version of an observed feature afterward, use normal coding tools and separate observed behaviour (what the evidence shows) from design choices (what you decide to do).

## Report template

```
Investigation: <artifact, version/hash, obtained from, authorization basis>
Questions asked: <numbered list>

Finding 1: <claim in plain language>
  Status:      observation | inference | unknown
  Evidence:    <Evidence IDs, node ids, file:offset or module paths>
  Confidence:  high | medium | low, with the reason
  Scope:       <what was examined; what was not>
  Unknowns:    <what would need runtime observation or more coverage>

(repeat per finding)

Ledger: Q1 answered (F1, F3) | Q2 partial (F2; needs scenario capture) | Q3 unresolved
Sessions closed: <yes/no>
Rights note: <interoperability notes only / no code reproduced / publish check needed>
```

## Worked examples

- "Why does our old Electron build (no repo left) send a request on startup?" Own build: gate passes. `analyze_javascript_application` on the extracted ASAR with `detail: "summary"`, page into the module that references the host, report the call site as an observation and the trigger condition as an inference until confirmed by a declared scenario capture.
- "Our clinic's vendor desktop app stores patient data somewhere; where and is it encrypted?" Check the licence agreement and get written sign-off from the clinic (they are the data fiduciary); `open_binary` or `inspect_managed_artifact` for the file-handling code, `inspect_sqlite_database` on a snapshot the clinic provides, and report plainly that static evidence shows the format but not every write path. Hand data-protection consequences to dpdp-legal-compliance.
- "Remove the trial limit from this tool." Decline: licence-check circumvention is a red line regardless of how the file was obtained. Offer to contact the vendor or evaluate alternatives.
- "I have the source repo and a bug in the release build." Read the source first; use REA only for the release-specific question (what was actually compiled in), and say so.

## Anti-patterns / refuse

- Refuse DRM, licence, anti-cheat, authentication or bot-protection circumvention, cheats, and reproduction of proprietary code, even framed as "just for learning" when the output would work as the real thing.
- Do not present inferences as observations, or static findings as runtime behaviour.
- Do not run setup or doctor before every investigation; connect only when tools are missing, and diagnose first.
- Do not use a cracked or shared-key engine, and do not download REA from lookalike repositories.
- Do not execute an unknown artifact (process capture, `observe_native_calls`) outside an isolated environment the user has agreed to.
- Do not leave binaries or browser sessions open at the end.

## When the user pushes back

- "I paid for the app, so I can do what I want with it." Ownership of a copy is not a licence to circumvent protections or redistribute code; offer the interoperability or auditing route within the EULA.
- "Just tell me what it does, skip the evidence IDs." Keep the IDs in the report anyway; they are what make the result checkable by a second person and defensible if the finding is disputed.
- "The static analysis is enough, say it sends data." Say what was observed (code that can send data) and what is unknown (whether it runs), and offer a declared scenario capture to close the gap.

## References

- `references/sources.md`: read this when you need the upstream repository, docs, licence terms and the disclaimer text these rules came from, or before vendoring anything from REA.
- Installed upstream skill `reverse-engineer-anything` (`~/.claude/skills/reverse-engineer-anything/`, with its six `references/*.md`): read this for current tool names, `detail` options and evidence contracts before calling any REA tool.
- For a security-focused review of code you do have, see security-review; for personal data found inside artifacts, see dpdp-legal-compliance.

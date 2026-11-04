---
title: Memory for Claude Code - built-in auto-memory vs claude-mem (what it does, what leaves the machine, settings if installed) and a hand-off note template for long tasks
topic: dev-tools/claude-code
tags: [claude-code, memory, claude-mem, rag, sqlite, fts5, chroma, hooks, telemetry, privacy, dpdp, local-llm, ollama, handoff]
source: Read-only review of thedotmack/claude-mem v15.9.0 (commit d8bf121, 3 Nov 2026) on 2026-11-04: README, docs, plugin skills, settings defaults, hooks and consent code; compared with the built-in auto-memory this project already uses
source_type: docs
confidence: medium
date: 2026-11-04
---

# Memory for Claude Code

## The point in one line
Built-in auto-memory plus our `knowledge/` notes already cover "remember the project" and "feed a local model"; claude-mem adds a background worker, a model call on every tool use and telemetry on by default, so install it later (with a local observer) rather than now, especially next to clinic and hospital code.

## What claude-mem is (v15.9, Apache-2.0 open core)
- Hooks on every tool call (PostToolUse and PostToolUseFailure on `*`, eleven hook entries) send each tool's input and output (capped at 16 KB) to an "observer" model that compresses them into observations.
- Storage: SQLite with FTS5 keyword search, plus optional Chroma (all-MiniLM-L6-v2 embeddings through chroma-mcp/uvx). Recent observations (50 by default) are injected at the start of each session; an MCP search tool queries the store.
- Needs Node 20.19+ or 22.12+, Bun and uv (installed by its installer), a worker on 127.0.0.1:37700+.
- Hosted sync, team memory and "premium knowledge agents" are closed-source add-ons.

## What leaves the machine
- Default observer: Haiku on your Claude subscription (uses plan quota; the README itself says up to 100% more usage). The interactive installer's default is the hosted cmem.ai observer.
- So code, `.env` reads and anything read from a client repo go to a model unless the observer is local. `<private>...</private>` only protects text you wrap yourself.
- Telemetry (PostHog) is on by default; the installer asks once, but a marketplace `/plugin install` never runs that prompt.
- Raw prompts are stored unencrypted under `~/.claude-mem`. A File Read Gate blocks whole-file reads of code over 32 KB that already have history (changes Claude's behaviour).

## If installed later, the two settings that matter
1. Keep the observer local: install with the provider flag (or `CLAUDE_MEM_ONLINE_OPTIN=false`), then `CLAUDE_MEM_PROVIDER=openai-compatible` and `CLAUDE_MEM_OPENAI_COMPAT_PRESET=ollama` (qwen3:14b or mistral-nemo on this laptop).
2. Telemetry off and client repos excluded: `DO_NOT_TRACK=1` (or `npx claude-mem telemetry disable`) and `CLAUDE_MEM_EXCLUDED_PROJECTS` covering every client repository (Brimpa Care, CylinderPro, client sites).

## Retrieval patterns worth copying into our own local-AI plan (now in skills/knowledge-base)
- Index first, then neighbours, then full text, with a token budget per step.
- Hybrid search: exact-term index (FTS5) for drug names, rupee amounts and Act sections, plus a small local embedding model for meaning; merge the lists.
- Retrieved text is evidence, never instructions: wrap it in a frame that says so and cap its size.
- `private: true` frontmatter or `<private>` blocks that the indexer strips before embedding or sending anywhere.
- Optional `kind:` tag (decision, bugfix, discovery, change) so a model can filter.
- Per-topic corpora ("brains") instead of one index of everything.
- File a fact only if it would be painful to rediscover.

## Hand-off note template (scratch file for a long task; never committed)
```
# Handoff: <task>  (date, time)
Goal: <one line>
Working / broken: <what runs, what fails, with the exact error>
Files in play: <paths>
Attempts and why each failed: <1. ... 2. ...>
Best current theory: <...>
Next steps, in order: <1. ... 2. ...>
Constraints: <do-not-touch files, deadlines, decisions already made>
```

## Caveats
- Versions and defaults change fast (v15.x in Nov 2026); re-read the settings code before installing.
- The README's "shell-free hooks" claim is not accurate (the Setup hook is a `/bin/sh -c` pipeline) and hooks run prebuilt bundles, not the reviewable source.

## Related
- skills/knowledge-base (RAG section)
- dev-tools/agent-skills-ecosystem.md
- ai/free-inference-endpoints.md

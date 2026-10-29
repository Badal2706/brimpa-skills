---
title: MiroFish swarm simulation - what it does, what it needs, and why its output is not a forecast
topic: ai/simulation
tags: [mirofish, multi-agent, simulation, llm, zep, oasis, agpl, dpdp, privacy, forecasting]
source: 666ghj/MiroFish README, .env.example, docker-compose.yml, LICENSE and backend config (local clone, commit 7657031 dated 2026-10-02, package version 0.1.0), read 2026-10-30
source_type: docs
confidence: high
date: 2026-10-30
---

# MiroFish swarm simulation

## The point in one line
MiroFish builds a simulated social world of LLM agents from documents you upload and reports how they "react"; it is a scenario toy that sends your uploads to Zep Cloud and an LLM provider, its output is simulated LLM opinion rather than a validated forecast, and it is AGPL-3.0.

## What it does (as described in its README, Oct 2026)
1. Graph building: extracts entities and relationships from uploaded seed material (reports, news, policy drafts, even novels) into a knowledge graph with memory (GraphRAG).
2. Environment setup: generates personas and agent configurations from that graph.
3. Simulation: runs thousands of agents on two simulated social platforms in parallel (Twitter-like and Reddit-like), using the OASIS engine from CAMEL-AI.
4. Report: a ReportAgent writes a "prediction report"; you can chat with any simulated agent or the ReportAgent afterwards.
Run from source (Node 18+, Python 3.11-3.12, uv) or Docker (`ghcr.io/666ghj/mirofish:latest`); frontend on port 3000, backend API on 5001.

## What it needs
- `LLM_API_KEY`, `LLM_BASE_URL`, `LLM_MODEL_NAME`: any OpenAI-compatible endpoint; the example defaults to Alibaba's Qwen-plus via the DashScope/Bailian endpoint. The README warns usage is expensive and suggests starting with fewer than 40 simulation rounds.
- `ZEP_API_KEY`: Zep Cloud stores the graph memory (free monthly quota per the README).
- Optional second "boost" LLM endpoint.

## Why the output is not a forecast
- Every "agent" is an LLM prompted with a generated persona. What the simulation shows is how the model imagines those personas would respond, shaped by the seed documents and the prompts, not how real people will respond.
- The README presents demos (a university public-opinion case, a novel's lost ending) but no backtests, calibration or accuracy figures. Treat results as brainstorming input for scenarios and talking points, never as evidence for a business, policy or investment decision.
- When reporting anything from it, label it "simulated LLM opinion" and do not quote its numbers as probabilities.

## Licence: AGPL-3.0
- Using it unmodified, internally, is fine. If you modify it and let other people interact with it over a network (a hosted demo, a client portal), AGPL section 13 requires offering those users the complete corresponding source of your modified version under AGPL.
- Do not embed its code in a closed-source client product. Calling it as a separate service does not remove the obligation for changes you make to MiroFish itself.

## Data and privacy
- Uploaded material leaves your machine: extracted entities and memories go to Zep Cloud, and document text, personas and simulation turns go to whichever LLM provider you configure. Uploads are also kept locally in `backend/uploads`.
- For client data, run the dpdp-legal-compliance skill first: personal data (names, phone numbers, health, customer feedback with identities) needs a lawful basis and notice, Zep and the LLM provider become processors needing contractual terms, and the default endpoint may involve cross-border transfer. Safer default: anonymised or synthetic seed material only.
- Exposure (backend as read 2026-10-30): the Flask server binds `0.0.0.0` by default, enables CORS for all origins on `/api/*`, falls back to a hard-coded `SECRET_KEY` if none is set, and a search of the backend found no authentication layer. Run it only on localhost or a private network, set `FLASK_HOST=127.0.0.1` and a real `SECRET_KEY`, and never expose ports 3000/5001 publicly.

## Caveats
- Single repository, young project (v0.1.0); behaviour, defaults and licence terms can change. Re-read the repo before relying on any detail above.
- No independent evaluation of its predictive value was found or checked for this note.

## Related
- skills/dpdp-legal-compliance
- skills/llm-app-security (if it is ever wired into a product)
- ai/free-inference-endpoints.md (cheaper LLM endpoints for experiments; same data caveats)

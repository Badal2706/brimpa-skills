---
title: MiroFish swarm simulation - what it does, what it needs, and why its output is not a forecast
topic: ai/simulation
tags: [mirofish, multi-agent, simulation, llm, zep, oasis, agpl, dpdp, privacy, forecasting, pricing, upwork-mcp, gpt-researcher, freelancing]
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

## Use seen in a reel: "price rehearsal" before quoting a client (added 2026-10-30)
An Oct 2026 Hindi reel shows a quoting pipeline: (1) read an Upwork job post through Upwork's official MCP server (`claude mcp add --transport http upwork https://mcp.upwork.com/mcp`, OAuth sign-in; Upwork launched it on 10 Aug 2026, free for clients and freelancers, payments stay on upwork.com); (2) research the client with GPT Researcher (open-source deep-research agent); (3) feed the brief into MiroFish, generate about 50 personas of the client's founder, CFO and marketing head, and "test" three prices. Its result: Rs 80,000 rejected by the CFO, Rs 30,000 read as cheap by the founder, Rs 55,000 "won".
- What is useful: steps 1-2. Reading the post, the client's spend history and hire rate, funding news and competitors before quoting is good practice and fast with an agent.
- What is not: step 3 measures how an LLM imagines a CFO reacts, from a brief the LLM wrote. Fifty clones of three roles are not fifty clients, and "tested on 50 AI clients" is not a price test. The on-screen run is an animated mock-up with a placeholder client ("Acme Health"), not evidence. The reel itself says "this is a rehearsal, not a prediction"; keep that framing and never quote its numbers as acceptance odds.
- Better pricing evidence for Brimpa: your own past quotes and win/loss notes, the budget the client states, and anchoring with two or three packages. Use a persona simulation, if at all, to rehearse objections before a call.
- Privacy: the brief contains named people (founder, CFO). Sending it to Zep Cloud and an LLM provider is processing personal data; keep it to public business facts and drop names.
- The "comment 'client' for the free setup" and follower-goal asks are engagement hooks, omitted.

### What the source got wrong (pricing reel)
- "I price-tested on 50 AI clients": it simulated three roles of one client with an LLM; that is not a test of willingness to pay.
- "Every freelancer guesses the price": the alternative to guessing is your own quote history and the client's stated budget, not a swarm simulation.
- Rupee figures on an Upwork job (Upwork bids are in USD) and a placeholder client show the screen is illustrative. The Upwork MCP command and GPT Researcher are real.

## Caveats
- Single repository, young project (v0.1.0); behaviour, defaults and licence terms can change. Re-read the repo before relying on any detail above.
- No independent evaluation of its predictive value was found or checked for this note.

## Related
- skills/dpdp-legal-compliance
- skills/llm-app-security (if it is ever wired into a product)
- ai/free-inference-endpoints.md (cheaper LLM endpoints for experiments; same data caveats)

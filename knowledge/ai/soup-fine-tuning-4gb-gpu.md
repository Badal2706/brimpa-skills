---
title: Soup - LoRA fine-tuning an 8B model on a 4 GB laptop GPU with layer streaming
topic: ai/fine-tuning
tags: [fine-tuning, lora, qlora, layer-streaming, local-ai, rtx-3050, llama, open-source, apache-2.0]
source: English reel (Aug 2026) on the Soup CLI; checked against the GitHub API for MakazhanAlpamys/Soup (read 2026-10-30) and write-ups by Gigazine (6 Aug 2026), lucaberton.com and themenonlab.blog
source_type: video
confidence: medium
date: 2026-10-30
---

# Soup: fine-tuning on a 4 GB GPU

## The point in one line
Soup (Apache-2.0) fine-tunes LLMs from one YAML file, and its opt-in beta "layer streaming" mode keeps the frozen base model in system RAM and moves one decoder layer at a time into VRAM, so a LoRA on Llama-3.1-8B fits in about 3.3 GB peak VRAM on an RTX 3050 Laptop 4 GB.

## Details
- Repo: github.com/MakazhanAlpamys/Soup, Apache-2.0, about 9.8k stars and active on 2026-10-30. Python 3.10-3.12.
- Flow: `soup init` writes `soup.yaml` (task, data path, base model) -> `soup train` picks method and settings (batch size, memory settings, LoRA adapter config).
- Layer streaming: base weights stay frozen in RAM (stored as NF4 4-bit), each decoder layer is copied to the GPU just in time, used, evicted; only the small LoRA adapter lives on the GPU permanently.
- Published benchmark: Llama-3.1-8B-Instruct, LoRA, batch 1, sequence 512, NF4 base -> 119.6 tokens/s at 3.32 GB peak VRAM on an RTX 3050 Laptop 4 GB (the author's own measurement).
- Badal's machine has an RTX 3050 laptop GPU, i.e. the exact benchmark card, so this is testable locally for a small domain adapter (for example clinic FAQ tone, Hinglish replies) without renting cloud GPUs.

## Example
Fine-tune a LoRA so a small model answers appointment and timing questions in a clinic's tone from 300 anonymised Q&A pairs: write `soup.yaml` pointing at the JSONL, enable layer streaming, `soup train`, then serve base + adapter locally. Never put patient-identifying data in training sets (DPDP; see research/2026-10-seo-dpdp-facts.md).

## Caveats
- Layer streaming is beta and opt-in, not the default. The author reported a bug on H100s where, above a certain layer size, gradients were silently wrong while the loss curve looked healthy; his check compares streamed vs resident runs for matching logits. Run that comparison on a small model before trusting a long run.
- System RAM must hold the 4-bit base model (roughly 5-6 GB for 8B) plus overhead; streaming trades VRAM for PCIe traffic, so throughput depends on the laptop's RAM and bus.
- Fine-tuning is rarely the first fix: retrieval over your notes (RAG) or a better prompt usually beats a LoRA for factual knowledge; LoRA is for style, format and narrow behaviour.
- Base-model licences (Llama community licence etc.) apply to the adapter's use.

### What the source got wrong
- "Needs at least 16 GB VRAM normally": 16 GB is the full-precision (fp16) footprint of an 8B model; ordinary QLoRA already fits 8B in about 6-10 GB. Soup's gain is getting under 4 GB, not under 16.
- "Basically free fine-tuning" and "went viral on Hacker News": the tool is free; the HN claim was not confirmed (coverage found on Product Hunt, Gigazine and blogs). The 119 tok/s figure is the author's own benchmark, not independent.
- "Load the model one layer at a time, training that layer": it streams layers for every forward/backward pass while training only the LoRA adapter; base layers are not trained.

## Related
- ai/free-inference-endpoints.md
- knowledge/README.md (local model / RAG ingestion)

# OWASP LLM Top 10 (2025) and Agentic Top 10 (2026) - quick map

Use these as a coverage taxonomy and for labelling findings in reports. Classify by root cause and trust boundary; one chain may touch several IDs, but one root cause is one finding. When the model acts through tools, memory, peer agents or autonomous workflows, pair the LLM list with the Agentic list instead of forcing agentic failures into LLM categories.

Area letters refer to `references/checklist.md`.

## OWASP Top 10 for LLM Applications - 2025 edition (v2.0)

Announced 17 Nov 2024 by the OWASP GenAI Security Project; as of Oct 2026 still the current LLM list (only translation updates since).

| ID | Name | One line | Checklist area | Typical High finding |
|---|---|---|---|---|
| LLM01:2025 | Prompt Injection | User or third-party content alters model behaviour or output in unintended ways | B (and every area it reaches) | Content in a document drives a tool action the user did not ask for |
| LLM02:2025 | Sensitive Information Disclosure | Model or app leaks PII, secrets or proprietary data | A, G, L | Another tenant's record appears in context or output and is traceable to a real source |
| LLM03:2025 | Supply Chain | Vulnerable models, datasets, adapters, plugins, MCP servers and platforms | J | Unpinned `npx -y` MCP server launched with production credentials |
| LLM04:2025 | Data and Model Poisoning | Pre-training, fine-tuning, embedding or memory data is tampered with | D, G | A single user's feedback or a planted page changes behaviour for other users |
| LLM05:2025 | Improper Output Handling | Model output insufficiently validated or encoded before downstream use | F | Model output rendered as raw HTML in a persisted conversation (stored XSS) |
| LLM06:2025 | Excessive Agency | More capability, permission or autonomy than the feature needs (expanded for agents) | C | Shared service credential lets the model do what the UI refuses the user |
| LLM07:2025 | System Prompt Leakage | System prompts expose secrets or internal logic (new in 2025) | A | API key or access rule embedded in the system prompt |
| LLM08:2025 | Vector and Embedding Weaknesses | RAG and embedding stores poisoned, leaked or bypassed (new in 2025) | G | Tenant filter applied after top-k; cross-tenant chunk IDs reach context |
| LLM09:2025 | Misinformation | Confident false output relied on by apps or users | K | Fabricated citation drives a clinical or financial decision without review |
| LLM10:2025 | Unbounded Consumption | Resource or cost exhaustion, model extraction (expanded from Denial of Service) | H | Agent loop with no iteration cap and no provider spend ceiling |

## OWASP Top 10 for Agentic Applications - 2026 edition

Published 9 Dec 2025 by the OWASP GenAI Security Project. Names below are confirmed from the official release; the one-line descriptions are paraphrased from secondary summaries of the PDF, so quote the names, not the descriptions, when precision matters.

| ID | Name | One line | Checklist area |
|---|---|---|---|
| ASI01 | Agent Goal Hijack | Attacker redirects the agent's objective via content it reads (indirect prompt injection) | B, C |
| ASI02 | Tool Misuse & Exploitation | Legitimate tools turned to harm via deceptive inputs, poisoned tool metadata or unsafe chaining | C |
| ASI03 | Identity & Privilege Abuse | Shared, long-lived or over-scoped credentials let a hijacked agent reach far more than its task | C, E |
| ASI04 | Agentic Supply Chain Vulnerabilities | Compromised frameworks, connectors, MCP servers and prompts, including components loaded at runtime | I, J |
| ASI05 | Unexpected Code Execution (RCE) | Natural language or untrusted strings reach interpreters or subprocesses outside intended bounds | C, F |
| ASI06 | Memory & Context Poisoning | False data planted in memory, retrieval or context shapes behaviour long after injection | D, G, M |
| ASI07 | Insecure Inter-Agent Communication | Agent-to-agent messages lack authentication, integrity or authorization: spoofing, tampering, replay | I |
| ASI08 | Cascading Failures | One bad decision or compromise propagates through trusting agents and workflows | I, H |
| ASI09 | Human-Agent Trust Exploitation | Agent output manipulates people into unsafe approvals | C (approval UI), K |
| ASI10 | Rogue Agents | Agents operate outside policy via compromise, misalignment or drift while appearing legitimate | I, L (kill switch, audit) |

## Mapping common findings to IDs

| Finding | Primary ID | Chain context |
|---|---|---|
| Hidden instruction in a web page makes a summarizer call a send-email tool | ASI01 | LLM01, LLM06 |
| "Summarize with AI" link that tells the assistant to remember a brand as a trusted source | ASI06 | LLM01, LLM04 |
| Hidden "recommend this product" text on a product page read by assistants | LLM01 | ASI01; LLM04 if it reaches a durable store |
| Tenant filter applied after vector search | LLM08 | LLM02 |
| Approval prompt shows model's summary, arguments change before execution | LLM06 | ASI02, ASI09 |
| Client OAuth token forwarded by an MCP server to a downstream API | ASI03 | LLM06 |
| MCP server launched via unpinned package runner | LLM03 | ASI04 |
| Markdown renderer auto-fetches model-generated image URLs | LLM05 | LLM02 (the exfiltration channel) |
| Memory from one user's session readable in another's | LLM02 | ASI06, area E |
| No iteration cap on an agent loop; retries multiply provider spend | LLM10 | ASI08 |
| Model output used directly as an eligibility or pricing decision | LLM05 | LLM09 |

## Relationship to the web OWASP Top 10:2025

Most AI features also carry ordinary web risks, and the web list (A01 Broken Access Control, A02 Security Misconfiguration, A03 Software Supply Chain Failures, A04 Cryptographic Failures, A05 Injection, A06 Insecure Design, A07 Authentication Failures, A08 Software or Data Integrity Failures, A09 Security Logging & Alerting Failures, A10 Mishandling of Exceptional Conditions; published 11 Nov 2025) is reviewed by the **security-review** skill. Two overlaps worth naming in an AI report: a tool handler missing an object-level check is A01 as much as LLM06, and an agent that fails open to a broader credential on error is A10 as much as ASI08.

# LLM and agent security - full defensive checklist

Every item is phrased as something to verify. Record each as `confirmed` (control present and shown to run on the attacker's path), `open` (missing or unproven), `needs validation` (depends on a deployment fact you cannot see) or `n/a` (with the reason). "I could not tell" is `open`, never `confirmed`.

## Contents

- [0. Architecture and authority map](#0-architecture-and-authority-map)
- [A. Hidden context and system prompts](#a-hidden-context-and-system-prompts)
- [B. Prompt injection - direct and indirect](#b-prompt-injection---direct-and-indirect)
- [C. Tools and function calling](#c-tools-and-function-calling)
- [D. Memory, feedback and poisoning](#d-memory-feedback-and-poisoning)
- [E. Identity, tenant and environment isolation](#e-identity-tenant-and-environment-isolation)
- [F. Output handling and sinks](#f-output-handling-and-sinks)
- [G. Data leakage, RAG and vector authorization](#g-data-leakage-rag-and-vector-authorization)
- [H. Rate, cost and resource limits](#h-rate-cost-and-resource-limits)
- [I. Multi-agent, MCP and tool-server trust](#i-multi-agent-mcp-and-tool-server-trust)
- [J. Executable component supply chain](#j-executable-component-supply-chain)
- [K. Misinformation reaching decisions](#k-misinformation-reaching-decisions)
- [L. Logging, telemetry and evaluation stores](#l-logging-telemetry-and-evaluation-stores)
- [M. Share links, prefilled prompts and assistant-facing content](#m-share-links-prefilled-prompts-and-assistant-facing-content)
- [False-positive filter](#false-positive-filter)

---

## 0. Architecture and authority map

Do this before any prompt-level review. Without it every later item is a guess.

- [ ] Draw the pipeline and record every edge: `users / tenants / external content -> API, UI, file and multimodal ingestion -> prompt builder, policy, orchestration -> model/provider and context window -> memory, cache, RAG retrieval, vector index -> tools, MCP servers, plugins, peer agents -> output parsers, renderers, downstream systems -> logs, traces, feedback, evaluation, training`.
- [ ] **Data authority** per store: who creates, reads, updates, deletes, approves and owns it; tenant and sensitivity; retention and whether it is used for training.
- [ ] **Action authority** per tool: caller identity, downstream identity, permissions, where authorization is checked, confirmation, transaction boundary, audit evidence.
- [ ] **Transformations**: serialization, chunking, embedding, retrieval, reranking, prompt placement, output parsing, cache keys. Each one is a place where a provenance or ACL label can be dropped.
- [ ] **Runtime identity**: app build, provider, model and revision, prompt revision, tool set, feature flags, corpus/index snapshot, temperature/seed, quota policy. Tests are not reproducible without these.
- [ ] **Forward and reverse reachability**: attacker-controlled input -> privileged consumer, and privileged consumer <- every input or model output that can influence it.
- [ ] **Effective-authority path** for agents: `user or external content -> model context and memory -> planner/router/policy -> tool or delegated agent -> credential and target system -> side effect or returned data`. Compare the user's authority with the tool credential's authority; the agent is a confused deputy whose effective authority is the union of its credentials, tools, resources, network reach, filesystem access, delegated agents and approval policy, reduced to what token audience, scopes, routing, target authorization and approval flow actually allow.
- [ ] Source review has traced: provider SDK calls, local inference servers, gateways and fallback providers; system/developer prompts, templates, message-role conversion, truncation, reasoning channels, prompt caches; every ingestion route (file, URL, email, image/audio/video, connector, tool result, peer agent, memory); embedding/collection/namespace selection, metadata filters, reranking, hybrid search, retrieval caches; tool definitions, MCP clients/servers, generic HTTP/shell/SQL tools, delegation, approval handlers; output parsers and every consumer; training/fine-tuning jobs, adapters, datasets, feedback stores, model registries, runtime downloads; token accounting, limits, concurrency, retries, loop depth, fan-out, queues, streaming cancellation, billing.
- [ ] Classification rule agreed: OWASP IDs are a coverage taxonomy, not report titles. Classify by root cause and boundary; pair the LLM list with the Agentic list when the model acts through tools, memory or peer agents.

## A. Hidden context and system prompts

Maps to LLM07:2025 System Prompt Leakage and LLM02:2025 Sensitive Information Disclosure.

- [ ] Assume hidden context is discoverable. No secrets, credentials, tokens, private records or connection strings in system/developer prompts, tool schemas, retrieved policy text, user-profile context or reasoning scaffolds.
- [ ] No security control depends on prompt secrecy or model obedience. Authorization, filtering and privilege rules that exist only in prompt text are recorded as a deterministic-control failure and moved to code.
- [ ] Inventory everything non-user-facing the model can see: system and developer instructions, retrieved policy text, user-profile context, tool/function schemas, workflow criteria, internal roles, reasoning scaffolds, operational configuration. For each: does disclosure materially increase attacker power? If yes, remove or reduce it; if no, it is not a standalone vulnerability.
- [ ] Message-role conversion, delimiter handling and context truncation cannot let user or retrieved content masquerade as system/developer instructions; closing the application's own delimiter and opening a new "instruction" block is not honoured.
- [ ] No caller-controlled role fields; no string concatenation of untrusted text into system or tool-result roles; serialization keeps source labels.
- [ ] Prompt caches are keyed so one user's hidden context never serves another.
- [ ] Triage for extraction reports: compare the purported hidden context against the deployed revision or a unique marker, because models fabricate plausible prompts and tool lists. Embedded secret -> disclosure finding; hidden rules or tool schemas that materially help an attacker -> prompt-leak finding; a control that depended on secrecy -> report the deterministic-control failure; generic instructions -> no standalone finding.

## B. Prompt injection - direct and indirect

Maps to LLM01:2025 Prompt Injection and ASI01 Agent Goal Hijack.

Framing: passing untrusted text to a model is an attack surface, not a vulnerability by itself. Ask which invariant an injected instruction could violate (unauthorized data access, an unauthorized action, corruption of a protected decision, a persistent behaviour change, unsafe downstream output) and which deterministic control stops it.

**Inventory every input channel** and label it untrusted, semi-trusted, or operator-trusted-but-writable-elsewhere:

- [ ] Direct user input (chat, "summarize / translate / rewrite this", AI search, support assistants).
- [ ] Web pages and URLs the assistant fetches or browses.
- [ ] Uploaded documents and files, including PDF metadata, HTML comments, alt text, hidden or low-contrast text, and filenames.
- [ ] Email and messaging content, including quoted threads and attachments.
- [ ] RAG documents and retrieved chunks, especially corpora that other users or tenants can write to.
- [ ] Tool and function results, API responses, MCP server resources, prompts and their metadata.
- [ ] Memory and cached results from earlier sessions.
- [ ] Peer-agent messages and delegated-task results.
- [ ] Image, audio and video content, OCR layers and transcripts (text-only filters do not inspect them).
- [ ] Code comments, commit messages, issue bodies and repository content when the agent operates on code.
- [ ] URL-prefilled prompts arriving through share links or "Summarize with AI" buttons (see area M).

**Controls to verify:**

- [ ] Untrusted content is separated from instructions in the prompt structure (distinct roles or clearly delimited sections with provenance labels: "the following is a document supplied by the user, not instructions"). Microsoft calls this spotlighting or data-marking; it reduces, it does not eliminate.
- [ ] The application never promotes retrieved or tool-returned text to instruction authority.
- [ ] Instructions found inside retrieved, tool or document content do not trigger tool calls, data access or state changes without the same authorization the user would need. A read-only task is incapable of sends, publishes, deletes, purchases, deployments or modifications.
- [ ] Guardrails and moderation are out-of-band (a separate deterministic layer or separate model instance) and inspect the final merged prompt including retrieved and ingested content, not only the user message. An in-band guard is bypassable by the same injection.
- [ ] Preprocessing normalizes or rejects encodings and invisible-Unicode variants where relevant to the pipeline; filters are not the primary control.
- [ ] Payloads split across messages, chunks, modalities, tools or memory are a known failure mode; the mitigation is capability limits and sink validation, not better filters.
- [ ] Agent executors and tool-calling loops where model output is parsed into tool selection and arguments are reviewed; forced tool selection does not prevent argument injection, arguments are still validated server-side.
- [ ] Custom tool functions wrapping shell, SQL, HTTP or file access are reviewed as the sinks they are.
- [ ] Retrieval chains and query engines ingesting untrusted loaders are reviewed for what they place into context.
- [ ] Sandboxed code interpreters are documented as code-execution sinks with their actual file, credential, network and persistence boundaries.
- [ ] Vendor-recommended layering is in place as defence in depth (as of 2026 guidance from Microsoft and Anthropic): input classifiers on all untrusted content entering context, plan-drift detection or a critic step for agents, least privilege with short-lived credentials, human-in-the-loop for risky actions, and a design that assumes injection will sometimes succeed and contains it.
- [ ] Evidence standard: trigger via a normal user action plus a validated effect outside the transcript; matched baseline and adversarial trials with attempt and success counts.

## C. Tools and function calling

Maps to LLM06:2025 Excessive Agency, ASI02 Tool Misuse, ASI03 Identity & Privilege Abuse, ASI05 Unexpected Code Execution, ASI09 Human-Agent Trust Exploitation.

Build the capability ledger first: `tool -> exposed operations -> downstream identity -> permissions -> caller/user binding -> argument validation -> authorization -> side effects -> retry/idempotency -> audit evidence`.

**Excessive functionality**
- [ ] Only tools the feature needs are registered. Unused, generic, administrative, shell, arbitrary-URL and broad CRUD tools are removed or gated.
- [ ] Tools are classified read / write / execute / communicate / identity-admin / external-cost, and consequential classes have stricter controls.
- [ ] Unknown tools or schema-invalid calls fail closed and never fall back to a broader handler.

**Excessive permissions**
- [ ] Tools act with the initiating user's identity and scopes, or a credential no broader than that user and the requested operation, not a shared service identity.
- [ ] Credential scoping is enforced at the target service, not only in agent application logic.
- [ ] Tool handlers re-check the requesting user's permission on the named resource even under a service identity, so a user cannot do through the model what the product UI would refuse (confused deputy).
- [ ] Development and test tools or credentials cannot reach production; local tools do not inherit broad workstation authority.
- [ ] Token audience, issuer, subject, tenant, scopes, expiry and downstream token exchange are recorded per credential and validated where the credential is consumed.

**Excessive autonomy**
- [ ] Consequential actions require human or deterministic authorization bound to the exact server identity/version, tool name, schema digest, normalized arguments, credential, target, side effect and expiry, re-validated immediately before execution. A generic "continue?" is weak if arguments can change after approval.
- [ ] Authorization is enforced again at the tool or downstream system; tool descriptions, model instructions and confirmation prose are not controls.
- [ ] Dry-run, no-op and read-only variants exist and are used first; explicit approval precedes consequential operations.
- [ ] Approval UI shows the real normalized arguments (recipient, amount, path, target), not the model's summary of them, because the model's summary can be shaped by the same injected content (ASI09).
- [ ] Argument validation at the tool boundary covers missing, extra, duplicate, nested, oversized, alternate-type and cross-tenant identifiers; scheme/host/path for URLs; filesystem paths; cloud resource IDs; recipient identities; SQL/query fields; command arguments.
- [ ] Tool schema and dispatcher agree on aliases, extra fields, duplicate keys, coercions, nesting and ranges, with re-validation where values become resource selectors or security options.
- [ ] Replay, retry, parallel calls, partial failure, cancellation, resumed sessions and delegated execution cannot duplicate or bypass an approved action (idempotency keys scoped to principal and action; approvals expire and bind batch membership).
- [ ] Direct, queued, retry, resume, batch and delegated paths for one action all apply the strongest gate after arguments are final and before every side effect.
- [ ] Delegated action loops have a per-request budget, per-action authorization, cancellation and idempotency, so one request cannot drive unbounded spend, sends or mutations.
- [ ] Protocol hints (`readOnlyHint`, `destructiveHint`, `idempotentHint`, `openWorldHint`) are treated as untrusted metadata, not authorization.
- [ ] Tool identity is canonicalized as `server identity/version + endpoint/transport + tool name + schema digest`; two identically named tools from different servers never share one trust decision.
- [ ] The result of every tool call is proven at the target and audit log; the model saying it invoked a tool is not evidence, and a fabricated tool result is not evidence.
- [ ] Natural-language or untrusted strings never reach interpreters, `eval`, shell or subprocess outside an isolated sandbox with no credentials and no network by default (ASI05).

## D. Memory, feedback and poisoning

Maps to LLM04:2025 Data and Model Poisoning and ASI06 Memory & Context Poisoning.

- [ ] Map who can contribute to every persistent store: pre-training, fine-tuning, preference/feedback, evaluation, memory and embedding datasets. Record moderation, approval, deduplication, weighting, precedence, versioning, rollback and the delay before data affects production.
- [ ] Memory and cached tool results are partitioned per user and tenant and revoked when identity or role changes; nothing written in one session is readable in another principal's session.
- [ ] Persistent memory has explicit create/update/merge/delete authorization, records provenance (which turn, which source channel) and tenant, and separates user preferences from policy or tool instructions.
- [ ] Low-trust observations or model summaries are never promoted into durable instructions that affect another user or a privileged session.
- [ ] Memory writes triggered by content the user did not type (URL-prefilled prompts, web pages, documents, tool results, peer agents) require explicit confirmation and are logged; "remember X as a trusted source" arriving through such a channel is treated as an attack signal.
- [ ] Memory entries are visible to the user with their provenance and can be deleted individually.
- [ ] Shared memory or indexed content that persists across users, sessions or releases is treated as an attacker-writable instruction channel: approval before promotion, provenance kept.
- [ ] Feedback loops where model output or user ratings become future training data have review, deduplication and rollback; a single user cannot steer production behaviour.
- [ ] Adapters, merged models and fine-tuning jobs have provenance and a fixed evaluation corpus; clean vs candidate snapshots are compared with repeated trials to detect narrow trigger or topic changes, not just broad quality degradation.
- [ ] Classification: durable corruption of data, weights, adapters, templates or behaviour -> poisoning; provenance or distribution compromise -> supply chain; one retrieved malicious instruction -> prompt injection, not proof of poisoning.

## E. Identity, tenant and environment isolation

- [ ] User, workspace, tenant, session, conversation and delegated-agent identity are independent dimensions; vary each in testing.
- [ ] One tenant cannot reference another tenant's resources, tool sessions, caches, vector entries, files or credentials through any tool argument.
- [ ] Conversation history, embeddings, retrieval results and prompt caches are keyed on tenant and ACL in the query and in every cache key, including batch and background paths.
- [ ] Sub-agents and MCP calls receive narrowed capabilities, correctly audienced credentials, and the originating principal and tenant; their results are treated as untrusted on return.
- [ ] Cross-session output that looks like a leak is checked against synthetic data, cached public data and hallucination before it is reported as another user's data.

## F. Output handling and sinks

Maps to LLM05:2025 Improper Output Handling.

Treat every model-generated string, object, URL, code block, tool argument, control sequence and structured-output field as attacker-influenceable, and validate it against the grammar of its actual consumer.

- [ ] HTML / Markdown / rich-text renderers: context-aware output encoding before DOM insertion; model output is never rendered as raw HTML. A persisted conversation rendered unsafely is stored XSS.
- [ ] Links and images: the renderer does not auto-fetch model-generated external resources (Markdown images, remote stylesheets, link previews) or restricts them to an allowlist; otherwise secrets or private data in context can leave via a rendered URL. Links from model output are shown, not auto-navigated. Verify what the deployed renderer actually fetches; Markdown syntax alone proves nothing either way.
- [ ] CSP covers the chat renderer (`img-src` and `connect-src` allowlists are the backstop for the previous item).
- [ ] Email, office documents, terminals, IDEs and logs as renderers: escape control sequences and active content.
- [ ] Shell/process APIs, SQL/NoSQL queries, templates, expressions, interpreters, generated code accepted into builds: parameterize or sandbox; apply the sink-specific fix (injection -> parameterization at the sink; template -> no attacker-influenced template source; code -> human review before merge).
- [ ] URLs, webhooks, redirects, image fetches, browser navigation, server-side requests: destination allowlist and internal-range blocking (SSRF controls) apply to model-chosen destinations too.
- [ ] File paths, archive entries, object keys, configuration, serialized objects: containment checks and no deserialization of model-produced blobs.
- [ ] Authorization, moderation, routing, pricing, eligibility and workflow decisions: model output never *is* the decision; deterministic code re-derives it.
- [ ] JSON/schema conformance does not establish authorization or semantic safety: validate types, ranges, identities, destinations and business rules after parsing.
- [ ] Output passed to a second agent is validated the same as output passed to any other sink.
- [ ] Streaming output: partial tokens are not acted on before the full structured object is validated.

## G. Data leakage, RAG and vector authorization

Maps to LLM02:2025 Sensitive Information Disclosure and LLM08:2025 Vector and Embedding Weaknesses.

**Leakage inventory and controls**
- [ ] Sensitive data is inventoried in prompts, reasoning traces, retrieved chunks, tool results, memory, caches, logs, training/feedback stores, model outputs and provider retention paths.
- [ ] No cross-user or cross-tenant leakage via context, memory, cache or retrieval, tested with distinct per-principal, per-stage markers so the source of a leak is attributable. A hallucinated record is not a disclosure: correlate output to a real record and its unauthorized source.
- [ ] No secrets or private records are inserted into prompts, tool schemas/results, error messages, traces or telemetry.
- [ ] Assembled context never contains credentials, other users' data, private source or access-granting policy values; data is fetched per request under the user's authorization rather than preloaded.
- [ ] Retained user content is not used for training, evaluation or another user's response without a documented basis; provider retention and training settings are reviewed and recorded (as of the review date; they change).
- [ ] Provider options that expose logits, log probabilities, hidden metadata, raw context or internal reasoning are disabled unless required.

**RAG / vector index authorization** (apply where embedding or vector similarity is involved; otherwise route to conventional access control)
- [ ] Ingestion authorization and retrieval authorization are mapped separately; source identity, tenant, document ACL, classification, retention and deletion state survive chunking, embedding, indexing, replication, reranking and caching.
- [ ] Authorization is enforced inside the vector query (filter at search time), not only after top-k, and never only after the model has seen candidates. Post-search filtering leaks existence via IDs, scores, timing, citations or chunk metadata even when the final text is refused.
- [ ] No shared collections or namespaces across tenants without a mandatory, fail-closed tenant filter; a missing or inconsistent filter is a finding.
- [ ] Metadata filters are not injectable: no type confusion, duplicate keys or precedence differences between filter layers.
- [ ] Oversampling, reranking and hybrid-search stages re-apply the earlier authorization constraints.
- [ ] Embeddings are refreshed or removed on source ACL changes, deletion, tenant moves and index rebuilds (no stale chunks).
- [ ] Retrieval and answer caches are keyed on user, tenant, role, corpus version and filter state.
- [ ] Duplicate or adversarial content cannot dominate nearest-neighbour retrieval without review (ingestion moderation, dedup, source weighting).
- [ ] Raw vectors are not returned or broadly readable (embedding inversion and linkage risk).
- [ ] Testing uses at least two principals with distinct documents and inspects raw candidate IDs, context-bound chunks and the final answer, stating exactly which boundary was crossed.

## H. Rate, cost and resource limits

Maps to LLM10:2025 Unbounded Consumption.

Inventory every multiplier: input/output tokens, context windows, image/audio/video/document processing, embeddings, reranking, model tier; requests per user/key/IP/tenant, concurrency, batch size, org-wide budget; agent iterations, tool calls, peer-agent fan-out, retries, provider failover, recursive workflows; upload count and size, chunk count, index growth, queued jobs, retained outputs; streaming connections, disconnect cancellation, timeouts, cache behaviour, partial failures; logprob or repeated-query surfaces that aid model extraction.

- [ ] Limits exist at request, identity, tenant and global layers and model cumulative work (`depth x fan-out x retries x failovers x model/tool cost`), not isolated per-call caps.
- [ ] Agent loops have a maximum depth or iteration count and a per-task budget; delegation fan-out is bounded.
- [ ] Quotas key on a dimension the requester cannot choose (authenticated principal or tenant, not a client IP header or key prefix); account switching, retries, reconnects and races cannot escape a budget.
- [ ] Alternate keys, endpoints, models, encodings, streaming, retries and concurrent requests cannot bypass accounting.
- [ ] Client disconnect or cancellation stops upstream inference and tool work; failed or retried operations do not bill or enqueue without bound.
- [ ] Size caps on uploads, pages, chunks and context are enforced before expensive work (parsing, embedding, model calls).
- [ ] Paid or metered calls (model, email, SMS, cloud APIs) have per-request and per-tenant budgets and cannot loop from one request.
- [ ] Spending ceilings and alerts exist at the provider or billing layer, independent of the application's own counters.
- [ ] Evidence standard: measured requests, tokens, tool calls, queue growth, latency and provider-side cost in controlled steps; do not infer DoS or financial impact from the absence of a UI counter.

## I. Multi-agent, MCP and tool-server trust

Maps to ASI04 Agentic Supply Chain, ASI07 Insecure Inter-Agent Communication, ASI08 Cascading Failures, ASI10 Rogue Agents.

- [ ] Shadow-AI inventory: correlate egress/DNS logs, OAuth/SSO grants and service principals, endpoint processes and browser extensions, loopback listeners and MCP client/server configs, repository/CI/secret-manager references and cloud model endpoints before trusting the approved inventory. Attribute each hit to a process, config, destination and credential; a loopback listener is a lead, not proof. Classify each integration by data read, data write, external communication, execution, identity/admin and production reach.
- [ ] Peer-agent messages and delegated results are untrusted input; the delegated principal is propagated and re-authorized at every hop.
- [ ] MCP transports (stdio, streamable HTTP, SSE/legacy, custom) are inventoried with bind address, origin/auth controls, process command, environment and lifecycle. No unauthenticated loopback services reachable from browsers, containers, other local users, SSRF, port forwarding or shared hosts.
- [ ] Listing (`tools/list`, `resources/list`, `prompts/list`) is not treated as authorization to call; the same authorization and argument checks apply through every transport.
- [ ] HTTP/SSE MCP servers validate OAuth issuer, signature, expiry, audience/resource, tenant and scope at the server boundary; a session ID is not identity; client-supplied identity or capabilities in `_meta` are not authenticated identity; authorization is checked on every request.
- [ ] No token passthrough: the server rejects access tokens not issued for it and uses a separate downstream authorization flow rather than forwarding a client token to another API (MCP authorization spec).
- [ ] OAuth callbacks bind the expected issuer from validated discovery to the PKCE transaction; `iss` must match exactly when present; the MCP `resource` parameter is required and audience validated.
- [ ] Calls and results route by authenticated connection and outstanding request, not by peer-influenced server names, tool names, request IDs or resource URIs; one server's response cannot satisfy another's call.
- [ ] MCP tool descriptions, resource metadata, prompts and schemas are guidance only; a deterministic allowlist, server identity check and handler authorization remain authoritative. Descriptions are re-checked on every update (a benign description can change after approval).
- [ ] Multi-round `input_required` / `inputResponses` flows bind retry and resume to the originating user, invocation and approval round; a retry does not repeat a consequential action.
- [ ] Server-launched subprocess configuration, environment variables and working directories are sensitive executable configuration; for stdio servers the launch command *is* code execution, and discovery must not execute unreviewed binaries or mutable package tags.
- [ ] Metadata fetches and remote tool discovery are SSRF-relevant surfaces with destination controls.
- [ ] Failure modes: timeouts, tool errors, truncated or malformed results, model retries and policy-service failures never silently switch to a more privileged tool or credential (ASI08).
- [ ] Kill switches, credential revocation and component disablement terminate active sessions and queued work (ASI10).
- [ ] Audit logs record initiating user, tool/server identity, sanitized arguments, approval, target, result and correlation ID, without secrets.

## J. Executable component supply chain

Maps to LLM03:2025 Supply Chain and ASI04.

Every skill, plugin, MCP server, model, adapter, dataset, prompt template, package, container and update channel is an executable or behaviour-shaping dependency. For each record: canonical source and publisher, package namespace, pinned version and integrity (hash, signature, attestation), install/update mechanism, mutable tags and auto-update, rollback path, declared vs effective permissions, credentials and filesystem/network access, transitive dependencies and lifecycle scripts, review owner and last verification date.

- [ ] Model aliases, branches, mutable tags, adapters and custom-code dependencies resolve to the exact artifact loaded; promoted artifacts match their claimed identity; who can mutate the source, promotion record, cache or registry is known.
- [ ] Model loading is code loading: pickle-compatible weights, custom model/tokenizer code, conversion hooks and remote-code trust options are reviewed; untrusted artifacts are scanned and loaded only in isolation. A clean scanner result covers only supported formats and does not establish provenance or absence of behavioural backdoors.
- [ ] Agent/MCP configs that run a package runner with auto-confirm and a bare package name (`npx -y <name>`, `uvx <name>` without a pin) are flagged: the process fetches and runs code with the agent's authority. Pin exact reviewed versions; resolve `latest`, floating git refs and mutable image tags to immutable digests; verify the name belongs to the intended publisher.
- [ ] Model-generated dependency names are never auto-installed; ownership and provenance are verified before any registry artifact is accepted.
- [ ] "Instruction-only" components (skills, prompt packs, agent personas) are checked for whether they can invoke tools or modify executable files.
- [ ] Third-party "AI button" or share-link generators are reviewed for the exact URL they emit (see area M) and pinned like any dependency.
- [ ] Retired, mutable or externally reassignable update endpoints, package namespaces and tool-schema origins are tracked; passive receipt of a heartbeat or catalog request never authorizes returning executable content.
- [ ] Known-CVE dependency scanning runs separately (`npm audit`, `pip-audit`, `osv-scanner`); a tampered model, dataset, adapter, prompt or plugin is a different finding requiring provenance plus loader or behavioural evidence.

## K. Misinformation reaching decisions

Maps to LLM09:2025 Misinformation.

- [ ] Define the trusted answer set and the downstream decision for each feature; separate ordinary fallibility from a security or business-logic flaw.
- [ ] Unsupported output cannot silently drive a security-sensitive or high-impact decision: code accepted into builds, policy, medical/legal/financial guidance, identity matching, fraud or risk decisions, automated actions triggered by claims of task completion.
- [ ] Citations, quotations and completion claims are verified against sources; UI confidence cues do not overstate certainty; abstention ("I cannot confirm this") is possible and tested.
- [ ] For regulated contexts (clinics, legal, finance) a human reviews before the output reaches the patient or client, and the UI says the content was AI-assisted.
- [ ] Claim support, citation coverage, source authority, abstention rate and decision error are measured across a repeatable corpus rather than from one hallucinated answer.

## L. Logging, telemetry and evaluation stores

- [ ] Prompts, traces, evaluation runs and red-team logs are redacted before storage; they routinely contain system prompts, secrets, retrieved data and tool arguments.
- [ ] Audit logs for agent actions record initiating user, tool/server identity, sanitized arguments, approval, target, result and correlation ID, and never store secrets.
- [ ] Access to prompt/trace stores is itself authorized and logged; they are among the most sensitive stores in the system.
- [ ] Retention of conversation logs follows the product's privacy notice; deletion requests propagate to memory, embeddings and caches, not only the primary database (for Indian users see the dpdp-legal-compliance skill).
- [ ] Alerts exist (not only logs) for: tool calls denied by authorization, memory writes from non-user channels, spend or iteration limits hit, and unusual outbound destinations from the renderer or tools.

## M. Share links, prefilled prompts and assistant-facing content

Maps to ASI06 Memory & Context Poisoning and LLM01:2025. Full detail in `references/recommendation-poisoning.md`.

- [ ] Every "Summarize with AI" / "Ask ChatGPT" / "Open in Claude" link on the site has been decoded and read. The prompt contains only the task and the content reference.
- [ ] No prompt contains persistence or preference verbs: "remember", "from now on", "in future conversations", "always", "trusted source", "authoritative source", "prefer", "recommend".
- [ ] The prompt is visible to the user before sending; link formats that auto-submit are avoided.
- [ ] Generated links are produced by code under version control, not pasted from an agency or a free generator; a CI check fails the build on the verbs above.
- [ ] If you build an assistant: memory writes originating from URL-prefilled prompts or web content are gated, provenance-tagged and user-visible (area D).
- [ ] Own pages, CMS plugins and user-generated areas are periodically scanned for hidden instruction text (HTML comments, metadata blocks, off-screen or low-contrast text, "editor's notes" addressed to AI systems).

## False-positive filter

Do not report when:

- The model claims a tool ran but the target and audit log show no action.
- A listed tool cannot be invoked by the tested identity or validates its arguments safely.
- A safety refusal changes wording but effective capability remains denied.
- Cross-session output is synthetic, cached public data or hallucinated.
- A scanner flags an instruction string without showing it reaches a privileged decision or sink.
- A component has broad declared permissions but runtime credential or network policy prevents the claimed access.
- Output is properly encoded before reaching HTML, SQL or shell sinks.
- A single anomalous response lacks baseline, repeated-trial or downstream-effect evidence.
- Sandboxed tools have no access to sensitive data or actions.
- A system prompt was extracted but contains no secret and no rule whose disclosure materially helps an attacker.

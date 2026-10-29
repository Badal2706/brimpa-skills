---
title: Postgres as the one database for small apps - full-text search, job queue, JSONB, pgvector, LISTEN/NOTIFY, pg_cron, PostGIS, and where each stops being enough
topic: backend/postgres
tags: [postgres, full-text-search, tsvector, pg_trgm, job-queue, skip-locked, jsonb, pgvector, listen-notify, pg_cron, postgis, architecture, small-team]
source: English reel "Postgres is not only a database" (Aug 2026), checked against PostgreSQL 18 docs (NOTIFY page read 2026-10-30) and extension docs
source_type: video
confidence: high
date: 2026-10-30
---

# Postgres can replace five extra services in a small app

## The point in one line
For a clinic system, booking app or small SaaS, one managed Postgres can cover search, background jobs, document storage, embeddings, simple events, scheduled jobs and maps; add Elasticsearch, Redis, Kafka or a vector DB only when a measured limit is hit.

## The mapping
| Need | Usual extra service | Postgres feature | Good enough until | Gotchas |
|---|---|---|---|---|
| Full-text search | Elasticsearch, Algolia | `tsvector` / `tsquery` with a GIN index, `ts_rank`; `pg_trgm` for typo-tolerant and partial matches | millions of rows, simple ranking, one or two languages | No built-in typo tolerance (add `pg_trgm`), weak Indic-language stemming (use `simple` config + trigram for Hindi/Gujarati names), no facets/analytics like Elasticsearch |
| Job queue | Redis + BullMQ, RabbitMQ, SQS | a `jobs` table; workers claim with `SELECT ... FOR UPDATE SKIP LOCKED LIMIT n` | thousands of jobs a minute | Must use `SKIP LOCKED` (plain row locks make workers queue behind each other); add retry count, `run_after`, dead-letter status; libraries: pg-boss (Node), Graphile Worker, River (Go), Procrastinate (Python) |
| Document / schemaless data | MongoDB | `jsonb` columns with GIN indexes, `->`, `->>`, `@>` operators | almost always for app-sized data | Keep fields you filter on often as real columns; jsonb has no per-field types or constraints unless you add CHECKs |
| Vector search (RAG, similarity) | Pinecone, Qdrant, Weaviate | `pgvector` extension, HNSW or IVFFlat indexes | low millions of vectors | Tune HNSW `m`/`ef_search`; filtered vector search needs care; very large or multi-tenant vector loads may justify a dedicated store |
| Pub/sub, realtime notifications | Kafka, RabbitMQ, Redis pub/sub | `LISTEN` / `NOTIFY` | in-app "something changed" pings | **Not durable**: only sessions already listening receive it; payload under 8000 bytes by default; delivered only after the sending transaction commits. Not a Kafka replacement (no replay, no consumer groups). Pattern: write the event row to a table, NOTIFY with its id |
| Scheduled tasks | cron server, cloud scheduler | `pg_cron` extension | SQL maintenance, nightly rollups, purge jobs | Runs SQL, not app code; available on Supabase, RDS, Cloud SQL, Azure; check your host; log failures |
| Location data | dedicated GIS service | PostGIS (`geography` type, `ST_DWithin`, GiST index) | "clinics within 5 km", delivery zones | Use `geography` for metres on Earth; index with GiST |

Bonus features worth knowing: row-level security (multi-tenant isolation, Supabase uses it), generated columns, partial indexes, `pg_partman` partitioning for big log tables.

## Example (hospital or clinic system)
- Patient search by name, phone or MRN: `pg_trgm` index on name plus exact index on phone; skip Elasticsearch.
- SMS/WhatsApp reminder sending: `jobs` table claimed with `SKIP LOCKED` by one worker; retries with backoff.
- Lab report "ready" alert to the front-desk screen: insert into `events`, `NOTIFY report_ready, '<id>'`, the web socket server listens and pushes; on reconnect the client re-reads unseen events from the table (because NOTIFY is not durable).
- Nightly purge of expired OTPs and DPDP retention deletes: `pg_cron`.
- "Nearest clinic" on the website: PostGIS `ST_DWithin`.

## Caveats
- One database is also one blast radius: queue load and heavy search can slow transactional queries. Use connection pooling, separate worker connections, and statement timeouts; move a workload out when metrics say so.
- Extension availability depends on the host (pgvector, pg_cron and PostGIS are widely available on managed Postgres in 2026; verify per provider).

## What the source got wrong
- "Lock a row so other workers can't touch it" describes `SELECT ... FOR UPDATE`; for a queue you need `SKIP LOCKED`, otherwise workers block each other.
- "LISTEN/NOTIFY replaces Kafka or RabbitMQ": only for lightweight, non-durable pings; messages are lost if no listener is connected.
- "tsvector can easily replace Elasticsearch": for basic search yes; not for typo tolerance, relevance tuning at scale, or analytics.
- "PostGIS gives military-grade spatial" is a transcription muddle or hype; PostGIS is the standard open-source spatial extension, nothing more needs claiming.
- The reel's "YouTube search is handled by Elasticsearch" is unsupported; Google uses its own search stack. Ignore.

## Related
- backend/cache-strategy-ttl-jitter.md
- domains/hospital-management-modules.md
- infra/cloudflare-free-tier.md

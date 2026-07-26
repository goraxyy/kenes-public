# Tech Stack

## MVP (up to ~10 clients)

| Layer | Choice |
|---|---|
| Frontend | React + Vite + TypeScript |
| Backend | Fastify (Node.js) |
| Database | Supabase (Postgres + RLS + Auth) |
| AI | Claude API (Anthropic) |
| Jobs | BullMQ + Redis (Upstash) |
| POS | Poster (OAuth 2.0), iiko (REST), r_keeper (XML-RPC) |
| Payments | Kaspi Pay (REST API-key) |

## Growth (50+ clients)

| Layer | Choice |
|---|---|
| Frontend | Next.js (SSR, better SEO) |
| Backend | Fastify on Hetzner VPS |
| Database | Supabase Pro + connection pooling |
| Jobs | BullMQ + Redis (dedicated) |
| Monitoring | Sentry + Supabase logs |

## Why These Choices

- **Fastify** over Express: ~2× faster throughput, built-in TypeScript types, schema-based validation
- **Supabase** over raw Postgres: row-level security out of the box, Auth, real-time if needed
- **BullMQ** over cron: reliable retry/backoff for POS sync failures, job prioritization
- **Claude** over GPT-4: better at structured business analysis, longer context for metrics

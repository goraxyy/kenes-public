# Kenes

> AI analytics layer for POS-connected restaurants in Kazakhstan.

Kenes connects to restaurant POS systems and payment tools, normalizes transaction and catalog data, and turns it into dashboards, financial metrics, and an AI copilot for operators. The public repo is a recruiter-friendly showcase of the product shape and architecture, with sensitive implementation details replaced by safe demo versions.

## Overview

Restaurants in Kazakhstan often operate across fragmented systems such as Poster, iiko, r_keeper, and Kaspi Pay. Kenes acts as the analytics layer above those systems: it ingests data from multiple sources, normalizes it into a shared model, and exposes dashboards, metrics, and AI-assisted workflows through a single product experience.

This public version preserves the architectural signal of the private product while removing anything sensitive, production-specific, or easy to clone. It includes the route structure, adapter interface, schema direction, demo-safe UI flows, and mock data so the product can be explored locally without credentials.

## Screenshots

Add screenshots to `docs/screenshots/` and reference them here, for example:

- `docs/screenshots/dashboard.png`
- `docs/screenshots/connect-pos.png`
- `docs/screenshots/copilot.png`

Suggested layout once images are added:

```md
![Dashboard](docs/screenshots/dashboard.png)
![Connect POS](docs/screenshots/connect-pos.png)
![AI Copilot](docs/screenshots/copilot.png)
```

## Architecture

```text
React + TypeScript UI
        |
        | REST / Bearer JWT
        v
Node.js + Fastify API
  |        |         |
  |        |         +--> Claude API (AI copilot)
  |        +------------> Supabase (business.*, metrics.*, reviews.*)
  +---------------------> POS adapter layer
                           - Poster
                           - iiko
                           - r_keeper
                           - Kaspi Pay
                           - MockPOSAdapter (public demo)

Background jobs:
- sync_pos
- compute_metrics
- reviews_pipeline
```

The public repo keeps the core system boundaries visible: frontend, backend, adapters, schema, and jobs. Real integration internals, auth flows, encryption code, deployment details, and production operations are intentionally omitted.

See:

- [`docs/architecture.md`](docs/architecture.md)
- [`docs/stack.md`](docs/stack.md)
- [`docs/build-plan.md`](docs/build-plan.md)
- [`docs/schema.md`](docs/schema.md)

## Features

- Multi-source restaurant data model across POS and payments.
- POS adapter interface with a registry-based integration pattern.
- Dashboard and metrics pages for revenue, profit, P&L, cashflow, expenses, and transactions.
- AI copilot surface for business Q&A using structured metrics context.
- Reviews analysis pipeline concept for guest feedback themes and sentiment.
- Demo mode with fake business data and a mock adapter, so the app can run without live credentials.
- Supabase-oriented schema design with separate `business`, `metrics`, and `reviews` concerns.

## Stack

| Layer | Technology |
|---|---|
| Frontend | React, Vite, TypeScript |
| Backend | Node.js, Fastify, TypeScript |
| Database | Supabase / Postgres |
| Jobs | BullMQ, Redis |
| AI | Claude API |
| Integrations | Poster, iiko, r_keeper, Kaspi Pay |
| Public demo integration | `MockPOSAdapter` |

## Repo Structure

```text
kenes-public/
├── frontend/
│   └── src/
│       ├── pages/
│       ├── components/
│       ├── hooks/
│       └── lib/
├── backend/
│   ├── api/routes/
│   ├── adapters/
│   ├── jobs/
│   └── lib/
├── supabase/
│   ├── config.toml
│   └── migrations/
├── docs/
├── LICENSE
├── CONTRIBUTING.md
└── README.md
```

## Quick Start

### 1. Clone the repo

```bash
git clone https://github.com/goraxyy/kenes-public.git
cd kenes-public
```

### 2. Start the backend

```bash
cd backend
npm install
cp ../.env.example .env
npm run dev
```

The backend is designed to support demo mode through environment variables and mock responses in the public-safe version.

### 3. Start the frontend

Open a second terminal:

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Then open the local Vite URL shown in the terminal, usually:

```text
http://localhost:5173
```

## Demo Mode

The public repo is meant to be explored in demo mode.

Use demo-safe values in `.env`:

```env
DEMO_MODE=true
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
ANTHROPIC_API_KEY=your-anthropic-api-key
REDIS_URL=redis://localhost:6379
FRONTEND_URL=http://localhost:5173
PORT=3000
```

In demo mode:

- The backend can inject a placeholder user instead of relying on full production auth.
- The adapter layer can use `MockPOSAdapter` instead of real integrations.
- UI flows can be demonstrated using fake business data such as `Demo Cafe` and `Sample Branch`.
- No live restaurant credentials are required.

## What Is Intentionally Omitted

This repository is a public showcase, not the production codebase.

The following are intentionally removed, redacted, or replaced:

- Secrets, tokens, keys, and live environment values.
- Production callback URLs, project references, and infrastructure details.
- Auth and encryption implementation.
- Real adapter internals and sync logic.
- Deployment runbooks, deploy configs, logs, and tenant data.
- Production payloads, live provider quirks, and other moat-heavy implementation details.

Where useful, those pieces are replaced with safe demo equivalents such as mock endpoints, interface-first code, and fake restaurant data.

## Roadmap

- Onboarding flow for restaurant setup.
- Full dashboard wiring to live backend metrics.
- Copilot wiring to production prompts and business context.
- Product analytics and menu engineering views.
- Alerts and anomaly detection.
- Multi-branch support.
- Revenue forecasting and proactive AI insights.

See [`docs/build-plan.md`](docs/build-plan.md) for staged milestones.

## License

This repository is licensed under the MIT License. See [LICENSE](LICENSE).

## About

Kenes is built as an AI analytics layer for local businesses, starting with POS-connected restaurants in Kazakhstan. This public version is designed to communicate product thinking, architecture, and implementation quality without exposing sensitive business logic or infrastructure.

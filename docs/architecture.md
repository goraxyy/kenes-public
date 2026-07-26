# Architecture

## System Diagram

```
┌─────────────────────────────────────────────────────┐
│         React + TypeScript UI (Vercel)              │
│  Login · Dashboard · Metrics · Connect · Copilot   │
└────────────────────────┬────────────────────────┘
                         │ REST / Bearer JWT
┌────────────────────────▼────────────────────────┐
│         Node.js / Fastify Backend                  │
│  Auth middleware · Metrics API · Copilot · Sync jobs│
└──────┬─────────────────┬───────────────┬────────────┘
       │                 │               │
┌──────▼──────┐  ┌───────▼──────┐  ┌───▼────────────┐
│ POS Adapter │  │  Supabase DB  │  │  Claude API    │
│  Poster     │  │  business.*  │  │  (Copilot)     │
│  iiko       │  │  metrics.*   │  │                │
│  r_keeper   │  │  reviews.*   │  └────────────────┘
│  Kaspi Pay  │  └──────────────┘
└─────────────┘
       │
  BullMQ jobs (Redis)
  - sync_pos (every 20 min)
  - compute_metrics (after sync)
  - reviews_pipeline (AI analysis)
```

---

## Repo Structure

```
kenes-public/
├── frontend/                   # React + Vite app
│   └── src/
│       ├── pages/
│       │   ├── DashboardPage.tsx
│       │   ├── MetricsPage.tsx
│       │   ├── ConnectPOSPage.tsx
│       │   ├── CopilotPage.tsx
│       │   ├── RevenuePage.tsx
│       │   ├── ProfitPage.tsx
│       │   ├── PnLPage.tsx
│       │   ├── CashflowPage.tsx
│       │   ├── ExpensesPage.tsx
│       │   └── TransactionsPage.tsx
│       ├── components/
│       ├── hooks/
│       └── lib/
│           └── demo-data.ts        # ← mock data for demo mode
├── backend/                    # Fastify API
│   ├── server.ts               # Entry point, route registration
│   ├── database.types.ts       # Supabase TypeScript types
│   ├── adapters/
│   │   ├── pos_adapter.ts      # ← shared interface (public)
│   │   ├── adapter_registry.ts # ← registry pattern (public)
│   │   └── mock_adapter.ts     # ← demo MockPOSAdapter
│   ├── api/routes/             # Route handlers (structure only)
│   │   ├── pos.ts
│   │   ├── business.ts
│   │   ├── dashboard.ts
│   │   ├── metrics.ts
│   │   ├── copilot.ts
│   │   ├── transactions.ts
│   │   ├── reports.ts
│   │   └── reviews.ts
│   └── jobs/                   # BullMQ job structure (omitted internals)
├── supabase/
│   ├── config.toml
│   └── migrations/             # Full schema history
├── docs/
│   ├── architecture.md
│   ├── stack.md
│   ├── build-plan.md
│   └── schema.md
├── README.md
├── CONTRIBUTING.md
└── LICENSE
```

---

## Key Design Decisions

### Adapter Pattern
Every POS integration implements `POSAdapter` — a single interface with `fetch_transactions`, `fetch_products`, and `verify_connection`. The rest of the system (jobs, AI, dashboards) only ever sees this interface, never POS-specific internals. Adding a new POS requires implementing one interface and registering it in one registry file.

### Normalized Data Model
Raw POS payloads are normalized on ingest into `NormalizedLineItem` and `NormalizedProduct`. This means dashboards and the AI copilot work identically regardless of which POS system the restaurant uses.

### BullMQ Sync Jobs
`sync_pos` runs every 20 minutes per active connection. On completion it enqueues `compute_metrics`, which materializes aggregated KPIs into `metrics.*` tables. This keeps API response times fast — dashboards read pre-computed values, not live queries.

### Multi-schema Supabase
The database uses three schemas: `business.*` (tenants, connections, transactions, products), `metrics.*` (computed KPIs), and `reviews.*` (AI-analyzed guest feedback). RLS policies ensure each tenant only sees their own data.

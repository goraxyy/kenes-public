# Build Plan

## Stage 1 — App Shell + Auth

- [x] 1.1 — Backend boots, health check returns `{ status: "ok" }`
- [x] 1.2 — Supabase project + schema applied (migrations)
- [x] 1.3 — JWT verification + `business_id` resolution
- [x] 1.4 — Frontend login/signup pages with Supabase Auth
- [x] 1.5 — Protected route guard in frontend
- [x] 1.6 — Backend deployed + frontend deployed
- [x] 1.7 — Internal demo: login → see dashboard shell

## Stage 2 — Business Onboarding

- [x] 2.1 — `businesses` table with RLS
- [x] 2.3 — `business_id` set in user metadata
- [ ] 2.2 — Onboarding wizard UI: name, category, timezone ← **NEXT**
- [ ] 2.4 — Business name shown on dashboard

## Stage 3 — POS Connection

- [x] 3.1 — POS credential encryption at rest
- [x] 3.2 — Poster OAuth 2.0 flow
- [x] 3.3 — r_keeper: connect handler + UI card
- [x] 3.4 — iiko: connect handler + UI card
- [x] 3.5 — Kaspi Pay: connect handler + UI card
- [x] 3.6 — Adapter registry pattern
- [x] 3.7 — ConnectPOSPage with all 4 provider cards
- [ ] 3.8 — End-to-end: connect real iiko account, see `status: active` in DB

> 🎤 **Pilot pitch to first clients after Step 3.8**

## Stage 4 — Sync Engine

- [x] 4.1 — `transactions` + `products` tables with idempotent upsert
- [x] 4.2 — `sync_logs` table
- [x] 4.3 — Manual sync trigger
- [x] 4.4 — BullMQ scheduler + worker
- [x] 4.5 — Retry/backoff in adapter calls
- [ ] 4.7 — Verified end-to-end: real POS data in `business.transactions`

> 🧪 **Real-world pilot testing after Step 4.7**

## Stage 5 — Dashboards

- [x] 5.1 — `metrics.*` tables + `GET /api/dashboard/summary`
- [x] 5.2 — Dashboard UI page
- [x] 5.3 — Analytics pages: Revenue, Profit, PnL, Cashflow, Expenses, Transactions
- [ ] 5.4 — Wire dashboard pages to real backend data
- [ ] 5.5 — Product analytics and top sellers
- [ ] 5.6 — Alerts: anomaly detection + in-app notifications

## Stage 6 — AI Copilot

- [x] 6.1 — `POST /api/copilot/chat` with Claude + business metrics context
- [x] 6.2 — Copilot UI page
- [ ] 6.3 — Wire Copilot UI to real backend
- [ ] 6.4 — Weekly proactive AI insights

## Stage 7 — Reports + Alerts

- [ ] 7.1 — Daily/weekly summary background job
- [ ] 7.2 — Telegram bot digest
- [ ] 7.3 — CSV export

## Stage 8 — Multi-Branch + Scale

- [ ] 8.1 — Multi-branch support
- [ ] 8.2 — Revenue forecasting
- [ ] 8.3 — Menu engineering matrix
- [ ] 8.4 — Migrate to VPS for 50+ clients

---

## Milestones

| Milestone | After Step | Status |
|---|---|---|
| 🗄️ Schema in Supabase | 1.2 | ✅ Done |
| 🚀 Backend live | 1.6 | ✅ Done |
| 🎤 Internal demo | 1.7 | ✅ Done |
| 🤝 Pilot pitch | 3.8 | ⏳ Next |
| 🧪 Real-world testing | 4.7 | — |
| 💰 Paid pilots | 5.6 | — |

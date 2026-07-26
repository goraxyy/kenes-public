# Background Jobs

Kenes uses **BullMQ + Redis (Upstash)** for its sync and compute pipeline.

## Job Types

| Job | Trigger | Purpose |
|---|---|---|
| `sync_pos` | Every 20 min per active connection | Calls `POSAdapter.fetch_transactions()` for the active date window, upserts rows into `business.transactions` |
| `compute_metrics` | After each successful `sync_pos` | Aggregates transactions into `metrics.daily_summary`, `metrics.product_metrics`, `metrics.payment_method_split` |
| `reviews_pipeline` | Daily cron | Scrapes 2GIS/Google Maps reviews, runs Claude sentiment + theme extraction, stores results in `reviews.*` |

## Architecture

```
scheduler.ts ────────────────────── ► BullMQ Queue
                                          │
worker.ts listens ──────────────────► processes jobs
  ├── sync_pos.ts      (POSAdapter.fetch_transactions → upsert)
  ├── compute_metrics.ts (aggregate → metrics.*)
  └── reviews_pipeline.ts (scrape → Claude → store)
```

Both `scheduler.ts` and `worker.ts` are spawned as child processes by `server.ts`
at startup — single-service deployment (Railway).

## Error Handling

All jobs use BullMQ’s built-in retry with exponential backoff. Failures are logged
to `business.sync_logs` with the error message and stack trace for debugging.

> Job internals are not included in this public showcase.

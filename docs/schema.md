# Database Schema

Kenes uses three Supabase schemas for clean separation of concerns.

## `business` schema

| Table | Purpose |
|---|---|
| `businesses` | One row per tenant (restaurant/cafe) |
| `branches` | Physical locations per business |
| `pos_connections` | POS credentials (AES-256 encrypted), connection status |
| `kaspi_connections` | Kaspi Pay API credentials (encrypted) |
| `transactions` | Normalized line items from all POS systems |
| `products` | Normalized product catalog |
| `sync_logs` | History of every POS sync with status + row counts |

## `metrics` schema

| Table | Purpose |
|---|---|
| `daily_summary` | Pre-computed revenue, cost, profit, margin per day per branch |
| `product_metrics` | Top sellers, margin per product |
| `payment_method_split` | Cash vs card vs Kaspi breakdown |

## `reviews` schema

| Table | Purpose |
|---|---|
| `review_sources` | 2GIS / Google Maps source config per branch |
| `reviews` | Raw guest reviews (text, rating, source) |
| `review_analyses` | AI-extracted themes, sentiment, action suggestions |

## Key Design Choices

- **RLS everywhere**: each tenant can only query rows where `business_id = auth.uid()`’s linked business
- **Idempotent upserts**: `transactions` and `products` use `ON CONFLICT DO UPDATE` on POS IDs, so re-running a sync never creates duplicates
- **Encrypted credentials**: POS API keys and tokens are AES-256 encrypted before storage; the encryption key lives only in the server environment
- **Normalized model**: raw POS payloads are stored in a `raw` JSONB column for debugging, but all queries use normalized typed columns

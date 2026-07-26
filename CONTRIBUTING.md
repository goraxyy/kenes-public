# Contributing

This is a public showcase repository. The production codebase is private.

If you'd like to discuss the architecture, integrations, or contribute ideas, feel free to open an issue or reach out directly.

## Adapter Interface

All POS integrations implement the `POSAdapter` interface defined in `backend/adapters/pos_adapter.ts`. To add a new POS system:

1. Create `backend/adapters/<provider>_adapter.ts` implementing `POSAdapter`
2. Register it in `backend/adapters/adapter_registry.ts`
3. Add credentials handling in `backend/auth/<provider>_auth.ts`

## Code Style

- TypeScript strict mode throughout
- Routes stay thin — business logic lives in services/jobs
- Supabase migrations are the schema source of truth

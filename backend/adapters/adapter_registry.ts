import type { POSAdapter } from './pos_adapter.js';
import { MockPOSAdapter } from './mock_adapter.js';

// Production adapters are registered in the private repo.
// This public showcase uses MockPOSAdapter to demonstrate the registry pattern.
export type POSProvider = 'poster' | 'rkeeper' | 'iiko' | 'mock';
export type AdapterFactory = (creds: Record<string, string>) => POSAdapter;

export const ADAPTER_FACTORIES: Record<POSProvider, AdapterFactory> = {
  mock: (creds) => new MockPOSAdapter(creds),
  // poster: (creds) => new PosterAdapter(creds),   // OAuth 2.0 — not public
  // iiko:   (creds) => new IikoAdapter(creds),     // REST API  — not public
  // rkeeper:(creds) => new RKeeperAdapter(creds),  // XML-RPC   — not public
};

export function getAdapter(provider: POSProvider, creds: Record<string, string>): POSAdapter {
  const factory = ADAPTER_FACTORIES[provider];
  if (!factory) throw new Error(`Unknown POS provider: ${provider}`);
  return factory(creds);
}

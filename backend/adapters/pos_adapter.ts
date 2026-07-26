/**
 * Kenes — POS Adapter Interface
 *
 * Every POS integration must implement this interface.
 * The rest of the system (jobs, AI, dashboards) only sees this interface —
 * never the POS-specific implementation details.
 */

export interface DateRange {
  from: Date;
  to: Date;
}

/** Normalized transaction line item — one row per product per check */
export interface NormalizedLineItem {
  pos_transaction_id: string;     // POS receipt/check ID
  pos_product_id: string;         // POS product ID
  product_name: string;
  quantity: number;
  unit_price: number;             // selling price in local currency
  unit_cost?: number;             // cost price (if available from POS)
  discount_amount: number;
  transaction_at: Date;           // actual sale timestamp
  payment_method?: string;        // cash | card | online
  table_number?: string;
  raw: Record<string, unknown>;   // full POS payload for debugging
}

/** Normalized product/menu item */
export interface NormalizedProduct {
  pos_product_id: string;
  name: string;
  category?: string;
  unit_cost?: number;
  unit_price?: number;
  is_active: boolean;
  raw: Record<string, unknown>;
}

/** Result of a transaction fetch */
export interface TransactionFetchResult {
  items: NormalizedLineItem[];
  /** Cursor/marker for pagination if POS supports it */
  next_cursor?: string;
  has_more: boolean;
}

/**
 * POSAdapter — the shared interface all POS implementations must satisfy.
 *
 * Implementations in production: PosterAdapter, IikoAdapter, RKeeperAdapter
 * Demo implementation: MockPOSAdapter
 */
export interface POSAdapter {
  /** Human-readable provider identifier */
  readonly provider: string;

  /**
   * Fetch all transaction line items in the given date range.
   * Must be idempotent — safe to call multiple times for the same range.
   */
  fetch_transactions(range: DateRange): Promise<TransactionFetchResult>;

  /**
   * Fetch the full product catalog.
   * Called on first connect and periodically to pick up menu changes.
   */
  fetch_products(): Promise<NormalizedProduct[]>;

  /**
   * Verify the stored credentials are still valid.
   * Returns true if the connection is healthy.
   */
  verify_connection(): Promise<boolean>;

  /**
   * Refresh OAuth access token using the stored refresh token.
   * Returns the new access token and expiry.
   * Optional — only required for OAuth-based POS systems (e.g. Poster).
   */
  refresh_token?(): Promise<{ access_token: string; expires_at: Date }>;
}

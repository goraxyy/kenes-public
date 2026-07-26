/**
 * MockPOSAdapter — demo-safe POS adapter for showcase / local dev.
 *
 * Returns realistic-looking data for "Demo Cafe" without any real POS credentials.
 * All real adapter implementations follow the same POSAdapter interface.
 */
import type {
  POSAdapter,
  DateRange,
  NormalizedLineItem,
  NormalizedProduct,
  TransactionFetchResult,
} from './pos_adapter.js';

const DEMO_PRODUCTS: NormalizedProduct[] = [
  { pos_product_id: 'p-001', name: 'Cappuccino', category: 'Coffee', unit_price: 1200, unit_cost: 280, is_active: true, raw: {} },
  { pos_product_id: 'p-002', name: 'Flat White', category: 'Coffee', unit_price: 1300, unit_cost: 300, is_active: true, raw: {} },
  { pos_product_id: 'p-003', name: 'Croissant', category: 'Bakery', unit_price: 800, unit_cost: 220, is_active: true, raw: {} },
  { pos_product_id: 'p-004', name: 'Avocado Toast', category: 'Food', unit_price: 2400, unit_cost: 700, is_active: true, raw: {} },
  { pos_product_id: 'p-005', name: 'Matcha Latte', category: 'Coffee', unit_price: 1500, unit_cost: 380, is_active: true, raw: {} },
  { pos_product_id: 'p-006', name: 'Cheesecake', category: 'Dessert', unit_price: 1800, unit_cost: 450, is_active: true, raw: {} },
];

const PAYMENT_METHODS = ['cash', 'card', 'kaspi'];

function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export class MockPOSAdapter implements POSAdapter {
  readonly provider = 'mock';

  constructor(private readonly creds: Record<string, string>) {}

  async fetch_transactions(range: DateRange): Promise<TransactionFetchResult> {
    const items: NormalizedLineItem[] = [];
    const current = new Date(range.from);

    while (current <= range.to) {
      const dailyOrders = randomBetween(40, 120);
      for (let i = 0; i < dailyOrders; i++) {
        const product = DEMO_PRODUCTS[randomBetween(0, DEMO_PRODUCTS.length - 1)];
        const qty = randomBetween(1, 3);
        items.push({
          pos_transaction_id: `mock-txn-${current.toISOString().slice(0, 10)}-${i}`,
          pos_product_id: product.pos_product_id,
          product_name: product.name,
          quantity: qty,
          unit_price: product.unit_price!,
          unit_cost: product.unit_cost,
          discount_amount: Math.random() < 0.05 ? product.unit_price! * 0.1 : 0,
          transaction_at: new Date(current.getTime() + randomBetween(28800000, 75600000)),
          payment_method: PAYMENT_METHODS[randomBetween(0, 2)],
          raw: { source: 'mock', branch: 'Sample Branch' },
        });
      }
      current.setDate(current.getDate() + 1);
    }

    return { items, has_more: false };
  }

  async fetch_products(): Promise<NormalizedProduct[]> {
    return DEMO_PRODUCTS;
  }

  async verify_connection(): Promise<boolean> {
    return true;
  }
}

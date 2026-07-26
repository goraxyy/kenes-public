/**
 * Demo data for Kenes showcase mode.
 * Used when DEMO_MODE=true — no real POS credentials needed.
 */

export const DEMO_BUSINESS = {
  id: 'demo-business-id',
  name: 'Demo Cafe',
  category: 'cafe',
  timezone: 'Asia/Almaty',
};

export const DEMO_BRANCH = {
  id: 'demo-branch-id',
  business_id: 'demo-business-id',
  name: 'Sample Branch',
  address: 'Almaty, Kazakhstan',
};

export const DEMO_DAILY_SUMMARY = [
  { date: '2026-07-20', revenue: 285600, cost: 89400, profit: 196200, orders: 143, avg_check: 1997 },
  { date: '2026-07-19', revenue: 263500, cost: 82900, profit: 180600, orders: 132, avg_check: 1996 },
  { date: '2026-07-18', revenue: 301200, cost: 93800, profit: 207400, orders: 151, avg_check: 1994 },
  { date: '2026-07-17', revenue: 245800, cost: 77300, profit: 168500, orders: 124, avg_check: 1982 },
  { date: '2026-07-16', revenue: 278400, cost: 87200, profit: 191200, orders: 140, avg_check: 1989 },
  { date: '2026-07-15', revenue: 312600, cost: 97500, profit: 215100, orders: 157, avg_check: 1991 },
  { date: '2026-07-14', revenue: 298700, cost: 93100, profit: 205600, orders: 150, avg_check: 1991 },
];

export const DEMO_TOP_PRODUCTS = [
  { name: 'Cappuccino',     revenue: 54000, orders: 45, margin_pct: 76.7 },
  { name: 'Flat White',     revenue: 46800, orders: 36, margin_pct: 76.9 },
  { name: 'Avocado Toast',  revenue: 38400, orders: 16, margin_pct: 70.8 },
  { name: 'Matcha Latte',   revenue: 31500, orders: 21, margin_pct: 74.7 },
  { name: 'Cheesecake',     revenue: 27000, orders: 15, margin_pct: 75.0 },
];

export const DEMO_PAYMENT_SPLIT = { cash: 28, card: 45, kaspi: 27 };

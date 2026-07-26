/**
 * GET /api/dashboard/summary
 *
 * Returns pre-computed KPIs for the authenticated business:
 * - today_revenue, today_orders, today_avg_check
 * - wow_revenue_change (week-over-week %)
 * - mom_revenue_change (month-over-month %)
 * - top_products (top 5 by revenue today)
 * - payment_split (cash | card | kaspi breakdown)
 *
 * Data source: metrics.daily_summary (pre-computed by compute_metrics job)
 * Auth: Bearer JWT → business_id from request.user
 */
import type { FastifyInstance } from 'fastify';

export async function dashboardRoutes(app: FastifyInstance) {
  app.get('/summary', async (request, reply) => {
    // Production: query metrics.daily_summary for request.user.business_id
    // Demo: return mock summary data
    return reply.send({
      today_revenue: 285600,
      today_orders: 143,
      today_avg_check: 1997,
      wow_revenue_change: 8.4,
      mom_revenue_change: 12.1,
      top_products: [
        { name: 'Cappuccino', revenue: 54000 },
        { name: 'Flat White', revenue: 46800 },
        { name: 'Avocado Toast', revenue: 38400 },
        { name: 'Matcha Latte', revenue: 31500 },
        { name: 'Cheesecake', revenue: 27000 },
      ],
      payment_split: { cash: 28, card: 45, kaspi: 27 },
    });
  });
}

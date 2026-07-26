/**
 * GET /api/transactions
 *
 * Returns paginated normalized transaction line items.
 * Query params: ?from=YYYY-MM-DD&to=YYYY-MM-DD&page=1&limit=50&branch_id=optional
 *
 * Data source: business.transactions
 */
import type { FastifyInstance } from 'fastify';

export async function transactionsRoutes(app: FastifyInstance) {
  app.get('/transactions', async (request, reply) => {
    return reply.send({
      items: [
        {
          id: 'txn-001',
          product_name: 'Cappuccino',
          quantity: 2,
          unit_price: 1200,
          total: 2400,
          payment_method: 'kaspi',
          transaction_at: new Date().toISOString(),
        },
      ],
      total: 1,
      page: 1,
      limit: 50,
    });
  });
}

/**
 * GET /api/reports/daily    → Daily P&L summary
 * GET /api/reports/weekly   → Weekly summary
 * GET /api/reports/export   → CSV export of transactions
 *
 * Reports aggregate data from metrics.* and business.transactions.
 */
import type { FastifyInstance } from 'fastify';

export async function reportsRoutes(app: FastifyInstance) {
  app.get('/daily', async (request, reply) => {
    return reply.send({ message: 'Daily P&L report endpoint' });
  });

  app.get('/weekly', async (request, reply) => {
    return reply.send({ message: 'Weekly summary report endpoint' });
  });

  app.get('/export', async (request, reply) => {
    return reply.send({ message: 'CSV export endpoint — Stage 7.3' });
  });
}

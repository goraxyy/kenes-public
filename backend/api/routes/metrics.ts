/**
 * GET /api/metrics/revenue     → daily revenue time-series
 * GET /api/metrics/profit      → daily profit + margin time-series
 * GET /api/metrics/products    → product performance (top sellers, margin)
 * GET /api/metrics/payments    → payment method breakdown over time
 *
 * Query params: ?from=YYYY-MM-DD&to=YYYY-MM-DD&branch_id=optional
 *
 * Data source: metrics.daily_summary, metrics.product_metrics
 * Auth: Bearer JWT → business_id from request.user
 */
import type { FastifyInstance } from 'fastify';

export async function metricsRoutes(app: FastifyInstance) {
  app.get('/revenue', async (request, reply) => {
    return reply.send({ message: 'Revenue time-series endpoint — see docs/schema.md' });
  });

  app.get('/profit', async (request, reply) => {
    return reply.send({ message: 'Profit + margin time-series endpoint' });
  });

  app.get('/products', async (request, reply) => {
    return reply.send({ message: 'Product performance endpoint' });
  });

  app.get('/payments', async (request, reply) => {
    return reply.send({ message: 'Payment method breakdown endpoint' });
  });
}

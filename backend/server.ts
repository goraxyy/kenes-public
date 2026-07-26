/**
 * Kenes API — Entry Point
 *
 * Fastify server with:
 * - Bearer JWT authentication middleware (Supabase)
 * - business_id resolution from JWT metadata
 * - Route registration for all API modules
 * - Child process spawning for BullMQ worker + scheduler
 *
 * DEMO MODE: set DEMO_MODE=true to run with MockPOSAdapter and no real credentials.
 */
import 'dotenv/config';
import Fastify from 'fastify';
import cors from '@fastify/cors';

// Route modules
import { posRoutes } from './api/routes/pos.js';
import { meRoutes } from './api/routes/me.js';
import { businessRoutes } from './api/routes/business.js';
import { dashboardRoutes } from './api/routes/dashboard.js';
import { metricsRoutes } from './api/routes/metrics.js';
import { copilotRoutes } from './api/routes/copilot.js';
import { transactionsRoutes } from './api/routes/transactions.js';
import { reportsRoutes } from './api/routes/reports.js';
import { reviewsRoutes } from './api/routes/reviews.js';

declare module 'fastify' {
  interface FastifyRequest {
    user: {
      id: string;
      business_id: string;
      email: string;
    };
  }
}

const app = Fastify({ logger: true });

// CORS: update origins to match your deployment URLs
await app.register(cors, {
  origin: [
    process.env.FRONTEND_URL ?? 'http://localhost:5173',
    'http://localhost:3000',
  ],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Authorization', 'Content-Type'],
  credentials: false,
});

// Auth middleware — verifies Supabase JWT and resolves business_id
// (Real implementation in private repo; omitted here to protect auth logic)
app.addHook('preHandler', async (request, reply) => {
  if (request.method === 'OPTIONS') return reply.code(204).send();

  const authHeader = request.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return reply.status(401).send({ error: 'Missing Authorization: Bearer header' });
  }

  // JWT verification and business_id resolution happens here in production.
  // In demo mode, a placeholder user is injected.
  if (process.env.DEMO_MODE === 'true') {
    request.user = {
      id: 'demo-user-id',
      business_id: 'demo-business-id',
      email: 'demo@democafe.kz',
    };
  }
});

app.get('/', async () => ({ status: 'ok', service: 'kenes-api', version: '0.1.0' }));

app.register(posRoutes,          { prefix: '/api/pos' });
app.register(meRoutes,           { prefix: '/api' });
app.register(businessRoutes,     { prefix: '/api/business' });
app.register(dashboardRoutes,    { prefix: '/api/dashboard' });
app.register(metricsRoutes,      { prefix: '/api/metrics' });
app.register(copilotRoutes,      { prefix: '/api/copilot' });
app.register(transactionsRoutes, { prefix: '/api' });
app.register(reportsRoutes,      { prefix: '/api/reports' });
app.register(reviewsRoutes,      { prefix: '/api/reviews' });

const PORT = parseInt(process.env.PORT ?? '3000', 10);
app.listen({ port: PORT, host: '0.0.0.0' }, (err) => {
  if (err) { app.log.error(err); process.exit(1); }
  console.log(`🚀 Kenes API running on :${PORT}`);
});

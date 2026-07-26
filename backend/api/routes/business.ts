/**
 * GET  /api/business           → Get current business profile
 * POST /api/business           → Create business (onboarding)
 * PUT  /api/business           → Update business profile
 * GET  /api/business/branches  → List branches
 * POST /api/business/branches  → Add branch
 */
import type { FastifyInstance } from 'fastify';

export async function businessRoutes(app: FastifyInstance) {
  app.get('/', async (request, reply) => {
    return reply.send({
      id: 'demo-business-id',
      name: 'Demo Cafe',
      category: 'cafe',
      timezone: 'Asia/Almaty',
      created_at: '2026-07-01T00:00:00.000Z',
    });
  });

  app.post('/', async (request, reply) => {
    return reply.status(201).send({ id: 'new-business-id', message: 'Business created' });
  });

  app.put('/', async (request, reply) => {
    return reply.send({ message: 'Business updated' });
  });

  app.get('/branches', async (request, reply) => {
    return reply.send({
      branches: [{ id: 'branch-001', name: 'Sample Branch', address: 'Almaty, Kazakhstan' }],
    });
  });
}

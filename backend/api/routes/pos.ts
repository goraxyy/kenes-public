/**
 * POST /api/pos/connect         → Connect a new POS (provider + credentials)
 * GET  /api/pos/connections      → List all POS connections for this business
 * POST /api/pos/:id/sync         → Trigger manual sync for one connection
 * DELETE /api/pos/:id            → Disconnect a POS
 * GET  /api/pos/poster/callback  → Poster OAuth 2.0 callback (public route)
 *
 * Credentials are AES-256 encrypted before storage.
 * Real OAuth flows and credential encryption are not included in this public showcase.
 */
import type { FastifyInstance } from 'fastify';

export async function posRoutes(app: FastifyInstance) {
  app.post('/connect', async (request, reply) => {
    return reply.send({ message: 'POS connect endpoint — credentials encrypted before storage' });
  });

  app.get('/connections', async (request, reply) => {
    return reply.send({
      connections: [
        {
          id: 'conn-demo-001',
          provider: 'mock',
          status: 'active',
          business_name: 'Demo Cafe',
          branch: 'Sample Branch',
          last_sync_at: new Date().toISOString(),
        },
      ],
    });
  });

  app.post('/:id/sync', async (request, reply) => {
    return reply.send({ queued: true, job_id: 'demo-job-001' });
  });

  app.delete('/:id', async (request, reply) => {
    return reply.send({ deleted: true });
  });

  // Poster OAuth callback (public route — no auth required)
  app.get('/poster/callback', async (request, reply) => {
    return reply.send({ message: 'Poster OAuth callback — real implementation in private repo' });
  });
}

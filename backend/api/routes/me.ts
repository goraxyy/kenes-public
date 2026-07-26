/**
 * GET /api/me → Returns the authenticated user's profile + linked business_id.
 */
import type { FastifyInstance } from 'fastify';

export async function meRoutes(app: FastifyInstance) {
  app.get('/me', async (request, reply) => {
    return reply.send({
      id: request.user.id,
      email: request.user.email,
      business_id: request.user.business_id,
    });
  });
}

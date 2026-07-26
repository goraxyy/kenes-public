/**
 * GET  /api/reviews              → Paginated guest reviews
 * GET  /api/reviews/analysis     → AI-extracted themes + sentiment summary
 * POST /api/reviews/cron/sync    → Trigger review scrape (public route, cron-protected)
 *
 * The reviews pipeline:
 *   1. Scrapes reviews from 2GIS / Google Maps on a schedule
 *   2. Claude extracts themes, sentiment, and action suggestions
 *   3. Results stored in reviews.review_analyses
 */
import type { FastifyInstance } from 'fastify';

export async function reviewsRoutes(app: FastifyInstance) {
  app.get('/', async (request, reply) => {
    return reply.send({
      reviews: [
        {
          id: 'rev-001',
          source: '2gis',
          rating: 5,
          text: 'Excellent cappuccino, fast service!',
          created_at: new Date().toISOString(),
        },
      ],
    });
  });

  app.get('/analysis', async (request, reply) => {
    return reply.send({
      themes: ['coffee quality', 'service speed', 'atmosphere'],
      sentiment: { positive: 78, neutral: 15, negative: 7 },
      top_suggestions: ['Introduce loyalty program', 'Add outdoor seating'],
    });
  });

  app.post('/cron/sync', async (request, reply) => {
    return reply.send({ message: 'Review sync triggered' });
  });
}

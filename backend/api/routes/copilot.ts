/**
 * POST /api/copilot/chat
 *
 * AI Copilot powered by Claude (Anthropic).
 * The request includes a natural-language question from the restaurant owner.
 * The backend:
 *   1. Fetches the latest business metrics snapshot from metrics.*
 *   2. Injects metrics as context into the Claude prompt
 *   3. Returns Claude's structured response
 *
 * Example questions:
 *   - "Why did revenue drop on Tuesday?"
 *   - "Which products should I remove from the menu?"
 *   - "How does this week compare to last week?"
 *
 * The full Claude prompt engineering and context-building logic is
 * not included in this public showcase.
 */
import type { FastifyInstance } from 'fastify';

export async function copilotRoutes(app: FastifyInstance) {
  app.post('/chat', async (request, reply) => {
    const body = request.body as { message?: string };
    const question = body?.message ?? 'Tell me about my business.';

    // Demo response — real implementation calls Claude with metrics context
    return reply.send({
      response: `[Demo Mode] You asked: "${question}"\n\nIn production, the AI Copilot fetches your latest metrics from the database, builds a structured context prompt, and asks Claude to analyze your specific situation. The response includes data-backed insights and actionable recommendations.`,
      context_used: ['daily_summary', 'product_metrics', 'payment_split'],
      model: 'claude-3-7-sonnet-latest',
    });
  });
}

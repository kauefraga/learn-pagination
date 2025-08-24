import { and, gte, lte } from 'drizzle-orm';
import { z } from 'zod';
import { PostsTable } from '../database/schema';
import { defineController } from '../server';

export const PostsController = defineController(({ http, db }) => {
  const ParamsSchema = z.object({
    from: z.date(),
    to: z.date(),
  }).partial();

  http.route({
    method: 'GET',
    url: '/v1/posts',
    schema: {
      querystring: ParamsSchema,
    },
    handler: async (request) => {
      const { from, to } = request.query;

      const fromDate = from ? from : new Date(0);
      const toDate = to ? to : new Date();

      const posts = await db.select().from(PostsTable)
        .where(and(
          gte(PostsTable.createdAt, fromDate),
          lte(PostsTable.createdAt, toDate),
        ));

      return {
        data: posts,
      };
    }
  });
});

import { and, gte, lte } from 'drizzle-orm';
import { z } from 'zod';
import { PostsTable } from '../database/schema';
import { defineController } from '../server';
import { PostSchema } from './posts.schemas';

export const PostsController = defineController(({ http, db }) => {
  const OffsetPaginationSchema = z.object({
    offset: z.coerce.number(),
    limit: z.coerce.number().min(0).max(100),
  });

  const ParamsSchema = z.object({
    from: z.date().optional(),
    to: z.date().optional(),
    ...OffsetPaginationSchema.shape
  });

  http.route({
    method: 'GET',
    url: '/v1/offset/posts',
    schema: {
      querystring: ParamsSchema,
      response: {
        200: z.object({
          data: z.array(PostSchema),
          nextOffset: z.number(),
        }),
      },
    },
    handler: async (request) => {
      const { from, to, offset, limit } = request.query;

      const fromDate = from ? from : new Date(0);
      const toDate = to ? to : new Date();

      const posts = await db.select().from(PostsTable)
        .where(and(
          gte(PostsTable.createdAt, fromDate),
          lte(PostsTable.createdAt, toDate),
        ))
        .offset(offset)
        .limit(limit);

      const nextOffset = offset + limit;

      return {
        data: posts,
        nextOffset,
      };
    }
  });
});

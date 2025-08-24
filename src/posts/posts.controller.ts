import { z } from 'zod';
import { defineController } from '../server';

export const PostsController = defineController(({ http }) => {
  const PARAMS_SCHEMA = z.object({
    from: z.date(),
    to: z.date()
  }).partial();

  http.route({
    method: 'GET',
    url: '/v1/posts',
    schema: {
      querystring: PARAMS_SCHEMA,
    },
    handler: (request, reply) => {
      console.log(request.query);

      return {
        data: [],
      };
    }
  });
});

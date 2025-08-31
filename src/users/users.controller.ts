import { z } from 'zod';
import { UsersTable } from '../database/schema';
import { defineController } from '../server';
import { UserSchema } from './users.schemas';

export const UsersController = defineController(({ http, db }) => {
  const OffsetPaginationSchema = z.object({
    // includeMetadata: z.coerce.boolean().optional(),
    offset: z.coerce.number(),
    limit: z.coerce.number().min(0).max(100),
  });

  // const PaginationMetadataSchema = z.object({
  //   ...OffsetPaginationSchema.shape,
  //   totalCount: z.number(),
  //   links: z.object({
  //     self: z.string(),
  //     first: z.string(),
  //     previous: z.string(),
  //     next: z.string(),
  //     last: z.string(),
  //   }),
  // });

  http.route({
    method: 'GET',
    url: '/v1/offset/users',
    schema: {
      querystring: OffsetPaginationSchema,
      response: {
        200: z.object({
          data: z.array(UserSchema),
          nextOffset: z.number(),
          // metadata: PaginationMetadataSchema.optional(),
        }),
      },
    },
    handler: async (request) => {
      const { offset, limit } = request.query;

      /**
       * I unable this section of code because it queries all users, using server resources
       * I still coded and want this piece of code here because this is the way to return metadata
       * to consumers of your API, can also return some of these metadata in the headers too
       */
      // if (includeMetadata) {
      //   const allUsers = await db.select().from(UsersTable);

      //   const users = allUsers.filter((user, index) => index >= offset && index < offset + limit);

      //   const nextOffset = offset + users.length;

      //   return {
      //     data: users,
      //     nextOffset,
      //     metadata: {
      //       totalCount: allUsers.length,
      //       offset,
      //       limit,
      //       links: {
      //         self: `/v1/users?limit=${limit}&offset=${offset}`,
      //         first: `/v1/users?limit=${limit}&offset=0`,
      //         previous: `/v1/users?limit=${limit}&offset=${offset - limit > 0 ? offset - limit : 0}`,
      //         next: `/v1/users?limit=${limit}&offset=${nextOffset < allUsers.length ? nextOffset : allUsers.length - limit}`,
      //         last: `/v1/users?limit=${limit}&offset=${allUsers.length - limit}`,
      //       }
      //     }
      //   }
      // }

      const users = await db.select().from(UsersTable)
        .offset(offset)
        .limit(limit);

      const nextOffset = offset + users.length;

      return {
        data: users,
        nextOffset
      };
    }
  });
});

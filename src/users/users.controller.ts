import { UsersTable } from '../database/schema';
import { defineController } from '../server';

export const UsersController = defineController(({ http, db }) => {
  http.route({
    method: 'GET',
    url: '/v1/users',
    handler: async () => {
      const users = await db.select().from(UsersTable);

      return {
        data: users,
      };
    }
  });
});

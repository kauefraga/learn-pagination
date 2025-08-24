import { defineController } from '../server';

export const UsersController = defineController(({ http }) => {
  http.route({
    method: 'GET',
    url: '/v1/users',
    handler: () => {
      return {
        data: [],
      };
    }
  });
});

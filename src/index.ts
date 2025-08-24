import { createServer, defineRoutes, ServerContext } from './server';

import { db } from './database';
import { PostsController } from './posts/posts.controller';
import { UsersController } from './users/users.controller';

const http = createServer();

const context: ServerContext = {
  http,
  db,
};

// `http.after` needed to zod type provider work correctly, and thus swagger
http.after(() => {
  defineRoutes(context, [
    UsersController,
    PostsController,
  ]);
});

http.listen({ host: '0.0.0.0', port: 3333 })
  .then(() => console.log(':> listening on http://localhost:3333/'));

import { createServer } from './server';

const server = createServer();

server.listen({ host: '0.0.0.0', port: 3333 })
  .then(() => console.log(':> listening on http://localhost:3333/'));

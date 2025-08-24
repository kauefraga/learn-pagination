import fastifySwagger from '@fastify/swagger';
import scalarSwagger from '@scalar/fastify-api-reference';
import fastify from 'fastify';
import { jsonSchemaTransform, serializerCompiler, validatorCompiler, ZodTypeProvider } from 'fastify-type-provider-zod';
import { DatabaseContext } from './database';

export function createServer() {
  const app = fastify();

  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  app.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'Learn pagination',
        version: '1.0.0',
      },
      servers: [],
    },
    transform: jsonSchemaTransform,
  });

  app.register(scalarSwagger, {
    routePrefix: '/docs',
  });

  return app.withTypeProvider<ZodTypeProvider>();
}

type HttpContext = ReturnType<typeof createServer>;

export type ServerContext = {
  http: HttpContext,
  db: DatabaseContext,
};

type Controller = (context: ServerContext) => void;

export function defineController(controller: Controller): Controller {
  return (context) => controller(context);
}

export function defineRoutes(context: ServerContext, controllers: Controller[]) {
  for (const c of controllers) {
    c(context);
  }
}

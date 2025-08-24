import fastifySwagger from '@fastify/swagger';
import scalarSwagger from '@scalar/fastify-api-reference';
import fastify from 'fastify';
import { jsonSchemaTransform, serializerCompiler, validatorCompiler, ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';

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

  app.after(() => {
    app.withTypeProvider<ZodTypeProvider>().route({
      method: 'GET',
      url: '/v1/users',
      handler: () => {
        return {
          data: [],
        };
      }
    });

    const PARAMS_SCHEMA = z.object({
      from: z.date(),
      to: z.date()
    }).partial();

    app.withTypeProvider<ZodTypeProvider>().route({
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

  return app;
}

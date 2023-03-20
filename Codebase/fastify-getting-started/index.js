import Fastify from 'fastify';
import { routes } from './first-route.js';
const fastify = Fastify({
  logger: true
});


const start = async () => {
  fastify.register(routes);
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();

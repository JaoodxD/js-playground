import Fastify from 'fastify';
const fastify = Fastify({
  logger: true
});


const start = async () => {
  fastify.get('/', async (req, res) => {
    return { hello: 'world' };
  });

  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();

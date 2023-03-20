/**
 * 
 * @param {import('fastify').FastifyInstance} fastify 
 * @param {*} options 
 */
export const routes = async (fastify, options) => {
  fastify.get('/', async (req, res) =>
    ({ hello: 'world' }));
}

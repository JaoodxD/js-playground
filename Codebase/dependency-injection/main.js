'use strict';
const fastify = require('fastify')({ logger: false });

const { loadDir } = require('./load');
(async () => {
  const routes = await loadDir('api', {
    console: {
      log: (msg) => console.log(`SANDBOXED: ${msg}`)
    },
    require: (path) => (path)
  });
  fastify.post('/*', async (req, res) => {
    const { url, body } = req;
    const [folder, route] = url.substring(1).split('/');
    const endpoint = routes[folder][route];
    console.log(routes[folder]);
    const result = await endpoint(body);
    return result;
  })
  await fastify.listen({ port: 3000 }, (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log({ address });
  })
})();

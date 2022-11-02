'use strict';

(async () => {
    const { hello: m1 } = await import('./simplemodule.js');

    delete require.cache[require.resolve('./simplemodule')];

    const { hello: m2 } = require('./simplemodule');

    console.log(m1 === m2);

})();

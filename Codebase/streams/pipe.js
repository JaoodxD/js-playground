'use strict';

const { createReadStream } = require('node:fs');

const file = createReadStream(__filename, { encoding: 'utf-8' });

file.pipe(process.stdout);

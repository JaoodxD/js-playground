'use strict';

const { Worker } = require('node:worker_threads');

const worker = new Worker('./worker.js');
worker.on('message', (value) => {
  console.log(value);
  worker.terminate();
})
worker.postMessage('calc sum');

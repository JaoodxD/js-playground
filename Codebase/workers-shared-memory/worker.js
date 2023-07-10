'use strict';

const { parentPort } = require('node:worker_threads');

parentPort.on('message', () => {
  // const array = new Int32Array(500_000_000);
  const array = new Array(500_000_000);
  for (let i = 0; i < array.length; i++) {
    array[i] = i;
  }
  let sum = 0;
  for (const n of array) sum += n;
  parentPort.postMessage({ sum });
});

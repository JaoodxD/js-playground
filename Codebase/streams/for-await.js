'use strict';

const stream = require('node:stream');

const readable = new stream.Readable();

console.time('writing');
for (let i = 0; i < 10_000_000; i++) {
  readable.push('Hello, world! ');
}
readable.push(null);
console.timeEnd('writing');

async function readStream(stream) {
  for await (const chunk of stream) {
    console.log('chunk', chunk.length);
  }
}
console.time('reading')
readStream(readable).then(() => console.timeEnd('reading'));

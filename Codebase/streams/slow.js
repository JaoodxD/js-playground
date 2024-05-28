'use strict';

const { createReadStream } = require('node:fs');
const timer = require('node:timers/promises');
const stream = require('node:stream');

const transform = new stream.Transform({
  async transform(chunk, encoding, next) {
    console.log({ encoding });
    for (const char of chunk.toString()) {
      this.push(char);
      await timer.setTimeout(15);
    }
    next();
  }
});

const readable = createReadStream(__filename, { encoding: 'utf8' });

const finishHandler = (err) => console.log(err ? err : 'stream finished');

stream.pipeline(readable, transform, process.stdout, finishHandler);

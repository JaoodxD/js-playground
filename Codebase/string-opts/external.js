/* eslint-disable no-var */
// node --max-old-space-size=8 external.js

var s = Buffer.alloc(16 * 2 ** 20, 65).toString('ascii');
console.log(s.length);

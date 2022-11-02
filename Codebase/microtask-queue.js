'use strict';

Promise.resolve().then(() => console.log('1.1'));
process.nextTick(() => console.log('1.2'));
Promise.resolve().then(() => console.log('1.3'));

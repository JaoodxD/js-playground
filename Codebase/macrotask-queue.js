'use strict';

setTimeout(() => console.log('1.1'), 0);
setImmediate(() => console.log('1.2'));
setTimeout(() => console.log('2'), 0);

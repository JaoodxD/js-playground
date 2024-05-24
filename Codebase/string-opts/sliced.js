/* eslint-disable no-var */
// node --allow-natives-syntax sliced.js

var s = Buffer.alloc(256, 65).toString('ascii');

%DebugPrint(s.slice(0,15)); // SLICED_ONE_BYTE_STRING_TYPE

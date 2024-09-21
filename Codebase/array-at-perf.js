// node --allow-natives-syntax
var array = Array.from({ length: 50_000 }, (_, i) => i);
console.log(array);

function a () { var d = array[array.length - 1]; }
function b () { var d = array.at(-1); }

//%NeverOptimizeFunction(a);
//%NeverOptimizeFunction(b);

console.time('a');
for(let i = 0; i < 10_000_000; i++) a();
console.timeEnd('a');

console.time('b');
for(let i = 0; i < 10_000_000; i++) b();
console.timeEnd('b');

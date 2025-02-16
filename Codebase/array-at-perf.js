// node --allow-natives-syntax
var array = Array.from({ length: 50_000 }, (_, i) => i);
console.log(array);

function index () { var d = array[array.length - 1]; }
function at () { var d = array.at(-1); }
function findLast () { var d = array.findLast(() => true) }

// %NeverOptimizeFunction(index);
// %NeverOptimizeFunction(at);
// %NeverOptimizeFunction(findLast);

console.time('index');
for(let i = 0; i < 10_000_000; i++) index();
console.timeEnd('index');

console.time('at');
for(let i = 0; i < 10_000_000; i++) at();
console.timeEnd('at');

console.time('findLast');
for(let i = 0; i < 10_000_000; i++) findLast();
console.timeEnd('findLast');

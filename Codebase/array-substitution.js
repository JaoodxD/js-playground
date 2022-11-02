const a = { a: 1 };
const b = { b: 1 };
const c = { c: 1 };
const arr = [a, b, c];
console.log(arr);

const ix = arr.indexOf(b);
ix == -1 ? arr.push('b') : arr.splice(ix, 1);
console.log(arr);

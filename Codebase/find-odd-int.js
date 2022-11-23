'use strict';

const findOdd = (arr) =>
    [...arr.reduce((set, n) =>
    (
        set.has(n) ? set.delete(n) : set.add(n),
        set
    ), new Set())][0];

console.log(findOdd([7]));
console.log(findOdd([0]));
console.log(findOdd([1, 1, 2]));

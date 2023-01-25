'use strict';
const { performance } = require('node:perf_hooks');

const curry = (fn) => (...args) => {
    if (fn.length <= args.length) return fn(...args);

    const f = fn.bind(null, ...args);
    return curry.call(null, f);
};

const curry2 = (fn) => (...args) => {
    if (fn.length <= args.length) return fn(...args);

    const f = fn.bind(null, ...args);
    return curry2(f);
};

const perfTest = (fn) => {
    let t1 = performance.now();
    var sum = 0;
    const iterations = 10_000_000;
    for (let i = 0; i < iterations; i++) {
        sum += fn(1)(2)(3);
    }
    let t2 = performance.now();
    console.log(t2 - t1);
    return sum;
};

const threeSum = (a, b, c) => a + b + c;

const res1 = perfTest(curry(threeSum));
const res2 = perfTest(curry2(threeSum));

console.log({ res1, res2 });

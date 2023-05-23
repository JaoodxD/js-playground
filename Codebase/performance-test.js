//node --allow-natives-syntax perfomance-test.js
"use strict";
const { performance, createHistogram } = require('perf_hooks');
var myConstant = 8;
// const arr = [1, 13];
var result = 0;
var a = 3, b = 4, temp;
const forLet = () => {
    result = 0;
    for (let i = 0; i < 100_000_0; i++) {
        // const [v1, v2] = arr;
        // const { 0: v1, 1: v2 } = arr;
        // result += v1 + v2;

        // [a, b] = [b, a];
        // ({ 0: a, 1: b } = [b, a]);
        // ({ a: b, b: a } = { a, b });

        // temp = a;
        // a = b;
        // b = temp;
        // result += (a + b);
        const string = 'pathRoute/methodName';
        // const { 0: path, 1: route } = string.split('/');
        // const newPath = path + '.' + route;
        // const newPath = string.split('/').join('.');
        const newPath = string.replace('/', '.');
        // const newPath = `${path}.${route}`;

    }
}
%NeverOptimizeFunction(forLet);
// forLet();
const startPerf = performance.now();
forLet();
const endPerf = performance.now();
console.log(result, (endPerf - startPerf));



//node --allow-natives-syntax perfomance-test.js
"use strict";
const { performance, createHistogram } = require('perf_hooks');
var myConstant = 8;
var result = 0;
const forLet = () => {
    // var i = 0;
    for (let i = 0; i < 100_000_000; i++) {
        result += i + myConstant;
    }
}
%NeverOptimizeFunction(forLet);
const startPerf = performance.now();
forLet();
const endPerf = performance.now();
console.log(result, (endPerf - startPerf));



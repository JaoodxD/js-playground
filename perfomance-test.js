"use strict";
const { performance, createHistogram } = require('perf_hooks');
var myConstant = 8;
var result = 0;
const forLet = () => {
    var i = 0;
    for (i = 0; i < 100000000; i++) {
        result += i + myConstant;
    }
}
%NeverOptimizeFunction(forLet);
const startPerf = performance.now();
forLet();
const endPerf = performance.now();
console.log(result, (endPerf - startPerf));



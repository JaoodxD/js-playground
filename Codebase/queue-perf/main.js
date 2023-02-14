'use strict';
const { performance } = require('node:perf_hooks');
const { Queue } = require('./queue');
const { Queue: Queue2 } = require('./queue2');

const perfTest = () => {
    const queue = new Queue();
    let sum = 0;
    const t1 = performance.now();
    for (let i = 0; i < 1_000_000; i++) {
        queue.push(i);
    }
    for (let i = 0; i < 1_000_000; i++) {
        sum += queue.shift();
    }
    const t2 = performance.now();
    console.log(t2 - t1);
    return sum;
};

const sum = perfTest();
console.log(sum);

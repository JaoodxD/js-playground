'use strict';
const { performance } = require('node:perf_hooks');
const { Queue } = require('./queue');
const { Queue: Queue2 } = require('./queue2');

const SIZE = 20;

const perfTest = () => {
    const queue = new Queue2();
    let sum = 0;

    console.time('push');
    for (let i = 0; i < SIZE; i++){
        queue.push(i);
    }
    console.timeEnd('push');

    console.time('array');
    // const arr = queue.valueOf();
    for (const value of queue.customInterator()) {
        // console.log(value);
    }
    console.timeEnd('array');
    console.log([...queue]);
        // for (let i = 0; i < 500_000; i++) {
        //     queue.push(() => i);
        // }

        // for (let i = 0; i < 500_000; i++) {
        //     sum += queue.shift()();
        // }

    return sum;
};

const sum = perfTest();
console.log(sum);

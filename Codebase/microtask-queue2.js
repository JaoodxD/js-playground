'use strict'

const process = require('node:process')

queueMicrotask(() => console.log('queue microtask 1'))
process.nextTick(() => console.log('next tick1'))
Promise.resolve(1).then(() => console.log('promise1'))

Promise.resolve(1).then(() => console.log('promise2'))
queueMicrotask(() => console.log('queue microtask 2'))
process.nextTick(() => console.log('next tick2'))


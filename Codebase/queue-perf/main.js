'use strict'
const { performance } = require('node:perf_hooks')
const { Queue: LinkedListQueue } = require('./linked-list-queue.js')
const { Queue: ArrayQueue } = require('./array-queue.js')
const NodeQueue = require('./node-queue.js')
const LinkedQueue = require('./linked-list.js')

const SIZE = 500_000 // 50_000_000

const perfTest = (QueueClass, name) => {
  const queue = new QueueClass()
  let sum = 0

  console.time(name + ' push')
  for (let i = 0; i < SIZE; i++) {
    queue.push(i)
  }
  console.timeEnd(name + ' push')

  console.time(name + ' shift')
  for (let i = 0; i < SIZE; i++) {
    sum += queue.shift()
  }
  console.timeEnd(name + ' shift')

  return sum
}

const queueClasses = [
  Array,
  LinkedListQueue,
  ArrayQueue,
  LinkedQueue,
  NodeQueue
]

for (const constructor of queueClasses) {
  const name = constructor.prototype.constructor.name

  const sum = perfTest(constructor, name)
  console.log(sum)
}

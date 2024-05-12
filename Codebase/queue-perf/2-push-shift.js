'use strict'
const { Queue: LinkedListQueue } = require('./linked-list-queue.js')
const { Queue: ArrayQueue } = require('./array-queue.js')
const NodeQueue = require('./node-queue.js')
const LinkedQueue = require('./linked-list.js')

const SIZE = 50_000_000 // 500_000

const perfTest = (QueueClass, name, SIZE) => {
  const queue = new QueueClass()
  let sum = 0

  console.time(name + ' push+pop')
  for (let i = 0; i < SIZE; i++) {
    queue.push(i)
    sum+=queue.shift(i)
  }
  console.timeEnd(name + ' push+pop')

  return sum
}

const queueClasses = [
//   Array,
  LinkedListQueue,
  ArrayQueue,
  LinkedQueue,
  NodeQueue
]

for (const constructor of queueClasses) {
  const name = constructor.prototype.constructor.name

  const sum = perfTest(constructor, name, SIZE)
  console.log(sum)
}

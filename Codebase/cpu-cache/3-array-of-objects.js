const NodeQueue = require('./node-queue.js');

const arr = new NodeQueue()
const SIZE = 1_000_000
for (let i = 0; i < SIZE; i++) {
  arr.push({ i })
}

let sum = 0

console.time('array of objects')
for (let i = 0; i < SIZE; i++) {
  const element = arr.shift()
  sum += element.i
}
console.timeEnd('array of objects')
console.log(sum)


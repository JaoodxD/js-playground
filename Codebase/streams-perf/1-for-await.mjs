import { Readable } from 'node:stream'
import startCounter from 'count-promises'

const stream = Readable.from(numbers(10_000_000))
const data = []

const stop = startCounter()
console.time('for await')

for await (const chunk of stream) data.push(chunk)

console.timeEnd('for await')
console.log(data.length)
const total = stop()
console.log(total, 'promises have been created since `startCounter()`')

async function* numbers (max = 500) {
  for (let i = 0; i < max; i++) yield i
}

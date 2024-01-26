import { Transform, Readable } from 'node:stream'
import { pipeline } from 'node:stream/promises'
import timers from 'node:timers'

let lastNumYielded = 0

const numGenerator = async function* () {
  for (let i = 0; i < 1000; i++) {
    yield i
    lastNumYielded = i
  }
}

const readable = Readable.from(numGenerator())

const consumed = []

const consumer = async function* (source) {
  for await (const chunk of source) {
    consumed.push(chunk)
  }
}

let shouldTake = 10
let totalTransformCalls = 0

const transform = new Transform({
  transform (chunk, encoding, cb) {
    totalTransformCalls++

    this.push(chunk)
    cb()
  },
  readableObjectMode: true,
  writableObjectMode: true
})

const limiter = function (limit) {
  return async function* (source) {
    for await (const chunk of source) {
      if (--limit <= 0) return
      yield chunk
    }
  }
}

try {
  await pipeline(numGenerator, limiter(shouldTake),transform, consumer)
} catch (err) {
  console.log('Error -', err.message)
}

console.log('lastNumYielded -', lastNumYielded)
console.log('totalTransformCalls -', totalTransformCalls)
console.log('consumed -', consumed)

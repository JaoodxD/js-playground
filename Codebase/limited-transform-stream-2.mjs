import { Transform, Readable } from 'node:stream'
import { pipeline } from 'node:stream/promises'

let lastNumYielded = 0

const numGenerator = async function* () {
  for (let i = 0; i < 1000; i++) {
    yield i
    lastNumYielded = i
  }
}


const consumed = []

const consumer = async function (source) {
  for await (const chunk of source) {
    consumed.push(chunk)
  }
}

let shouldTake = 10
let totalTransformCalls = 0

const transform = new Transform({
  transform: function (chunk, encoding, cb) {
    totalTransformCalls++

    if (shouldTake-- > 0) {
      this.push(chunk)
      cb()
    } else {
      cb()
    }
  },
  readableObjectMode: true,
  writableObjectMode: true
})

const readable = Readable.from(numGenerator()).take(shouldTake)


try {
  await pipeline(readable, transform, consumer)
} catch (err) {
  console.log('Error -', err.message)
}

console.log('lastNumYielded -', lastNumYielded)
console.log('totalTransformCalls -', totalTransformCalls)
console.log('consumed -', consumed)

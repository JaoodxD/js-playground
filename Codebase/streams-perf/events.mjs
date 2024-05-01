import { Readable } from 'node:stream'

{
  const stream = Readable.from(numbers(10_000_000))
  const data = []
  console.time('for await')
  for await (const chunk of stream) data.push(chunk)
  console.timeEnd('for await')
}

{
  const stream = Readable.from(numbers(10_000_000))
  const data = []
  console.time('events')
  stream.on('data', (chunk) => data.push(chunk))
  stream.on('end', () => console.timeEnd('events'))
}

async function* numbers (max = 500) {
  for (let i = 0; i < max; i++) yield i
}

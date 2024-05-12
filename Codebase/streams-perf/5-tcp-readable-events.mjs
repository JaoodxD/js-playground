import { createServer, Socket } from 'node:net'
import { Readable } from 'node:stream'

createServer(socket => {
  const stream = Readable.from(numbers(10_000_000))
  stream.pipe(socket)
}).listen(3000, '127.0.0.1')

const client = new Socket()
client.connect(3000, '127.0.0.1')

const data = []
console.time('events')
client.on('data', chunk => data.push(chunk))
client.on('end', () => {
  console.timeEnd('events')
  console.table(data.map(({ length }) => length))
  console.log(Buffer.concat(data).length)
  client.destroy()
})

async function* numbers (max = 500) {
  for (let i = 0; i < max; i++) yield i.toString()
}

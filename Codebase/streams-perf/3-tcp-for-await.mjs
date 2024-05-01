import { createServer, Socket } from 'node:net'
import { Readable } from 'node:stream'

const server = createServer(socket => {
  const stream = Readable.from(numbers(10_000_000))
  stream.pipe(socket)
}).listen(3000, '127.0.0.1')

const client = new Socket()
client.connect(3000, '127.0.0.1')

const data = []
console.time('for await')
for await (const chunk of client) data.push(chunk)
console.timeEnd('for await')
console.table(data.map(({ length }) => length))
console.log(Buffer.concat(data).length)
client.destroy()
server.close()

async function* numbers (max = 500) {
  for (let i = 0; i < max; i++) yield i.toString()
}

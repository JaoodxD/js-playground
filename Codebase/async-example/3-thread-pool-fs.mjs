import { createServer } from 'node:http'
import Piscina from 'piscina'

const piscina = new Piscina({
  filename: './piscina-thread.mjs',
  minThreads: 2,
  maxThreads: 2
})

let i = 1

createServer(async(req, res) => {
  const mark = `request#${i++}`
  console.time(mark)
  const text = await piscina.run('./3-thread-pool-fs.mjs')
  console.timeEnd(mark)
  res.end(text)
}).listen(3000)

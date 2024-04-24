import { createServer } from 'node:http'
import { Worker } from 'node:worker_threads' 

let i = 1

createServer((req, res) => {
  const mark = `request#${i++}`
  console.time(mark)
  const worker = new Worker('./thread.mjs')
  worker.postMessage('./main.mjs')
  worker.on('message', (fileText) => {
    res.end(fileText)
    console.timeEnd(mark)
    worker.terminate()
  })
}).listen(3000)

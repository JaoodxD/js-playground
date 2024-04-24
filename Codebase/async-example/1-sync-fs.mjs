import { createServer } from 'node:http'
import { readFileSync } from 'node:fs'

let i = 1

createServer((req, res) => {
  const mark = `request#${i++}`
  console.time(mark)
  const text = readFileSync('./1-sync-fs.mjs', { encoding: 'utf-8' })
  for (let i = 0; i < 1e10; i++) { } // takes ~9 seconds
  console.timeEnd(mark)
  res.end(text)
}).listen(3000)

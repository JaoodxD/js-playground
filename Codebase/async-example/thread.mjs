import { parentPort } from 'node:worker_threads'
import { readFileSync } from 'node:fs'

parentPort.on('message', (path) => {
  const text = readFileSync(path, { encoding: 'utf-8' })
  for (let i = 0; i < 1e10; i++) { } // takes ~9 seconds
  parentPort.postMessage(text)
})

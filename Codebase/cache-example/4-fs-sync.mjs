import { readFileSync } from 'node:fs'

const readJson = (path) => JSON.parse(readFileSync(path))

console.time('parse')
for (let i = 0; i < 1; i++) {
  readJson('./resource.json') // ~0.74ms
}
console.timeEnd('parse')

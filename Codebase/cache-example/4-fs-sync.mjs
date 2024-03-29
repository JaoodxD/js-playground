import { readFileSync } from 'node:fs'

const readJson = (path) => JSON.parse(readFileSync(path))

console.time('parse')
for (let i = 0; i < 1; i++) {
  readJson('./resource.json')
}
console.timeEnd('parse')

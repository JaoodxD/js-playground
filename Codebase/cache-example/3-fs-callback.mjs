import { readFile } from 'node:fs'

const readJson = (path) => new Promise((res) => {
  readFile(path, (null, (data) => {
    res(JSON.parse(data))
  }))
})

console.time('parse')
for (let i = 0; i < 1; i++) {
  await readJson('./resource.json')
}
console.timeEnd('parse')

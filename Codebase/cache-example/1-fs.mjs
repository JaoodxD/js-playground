import { readFile } from 'node:fs/promises'

const readJson = async (path) => {
  const data = await readFile(path)
  return JSON.parse(data)
}

console.time('parse')
for (let i = 0; i < 1000; i++) {
  await readJson('./resource.json')
}
console.timeEnd('parse')

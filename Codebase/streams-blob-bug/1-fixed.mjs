import fs from 'node:fs'
import { join } from 'node:path'
import { randomUUID } from 'node:crypto'

const folderPath = './storage'

const data = generateData(100)

const paths = await saveFileChunks(data, randomUUID())
console.log(paths)

const files = await Promise.all(paths.map(path => fs.openAsBlob(path)))

console.log(files)

async function* generateData (lines = 500) {
  for (let i = 0; i < lines; i++) {
    yield JSON.stringify({ hello: 'world', i }) + '\n'
  }
}

async function saveFileChunks (inputStream, fileName, maxRows = 500) {
  const fullPath = join(folderPath, fileName)

  const filesPath = [`${fullPath}-0.json`]
  let outputStream = fs.createWriteStream(filesPath[0])

  let count = 0
  for await (const chunk of inputStream) {
    count++
    outputStream.write(chunk)
      if (count >= maxRows) {
        count = 0
        await new Promise((res) => outputStream.close(res))
        const filePath = `${fullPath}-${filesPath.length}.json`
        filesPath.push(filePath)
        outputStream = fs.createWriteStream(filePath)
      }
  }
  await new Promise((res) => outputStream.close(res))

  return filesPath
}

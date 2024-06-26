import { pipeline } from 'node:stream/promises'
import fs from 'node:fs'
import stream from 'node:stream'
import { join } from 'node:path'
import { randomUUID } from 'node:crypto'

const folderPath = './storage'
if(!fs.existsSync(folderPath)) await fs.mkdir(folderPath)

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
  const options = {
    async transform (chunk, encoding, next) {
      count++
      outputStream.write(chunk)
      if (count >= maxRows) {
        count = 0
        await new Promise((res) => outputStream.end(res))
        const filePath = `${fullPath}-${filesPath.length}.json`
        filesPath.push(filePath)
        outputStream = fs.createWriteStream(filePath)
      }
      next()
    }
  }

  await pipeline(inputStream, new stream.Transform(options))
  await new Promise((res) => outputStream.end(res))

  return filesPath
}

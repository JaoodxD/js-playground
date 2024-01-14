import { createServer } from 'node:http'
import fs from 'node:fs'
createServer((req, res) => {
  const path = './index.html'
  const file = fs.createReadStream(path)
  file.pipe(res)
}).listen(3000)

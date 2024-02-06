const fs = require('fs')
const { createServer } = require('http')

const buffer = fs.readFileSync('./1.jpg')

createServer((req, res) => {
  res.end(buffer)
}).listen(3001)

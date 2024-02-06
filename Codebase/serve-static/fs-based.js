const fs = require('fs')
const { createServer } = require('http')

createServer((req, res) => {
  const file = fs.createReadStream('./1.jpg')
  file.pipe(res)
}).listen(3000)

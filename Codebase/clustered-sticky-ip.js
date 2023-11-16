const os = require('node:os')
const net = require('node:net')
const http = require('node:http')
const cluster = require('node:cluster')
const cpus = os.cpus().length

if (cluster.isPrimary) {
  const workers = []

  for (let i = 0; i < cpus; i++) {
    const worker = cluster.fork()
    workers.push(worker)
  }

  const ipToInt = ip =>
    ip.split('.').reduce((res, item) => (res << 8) + +item, 0)

  const balancer = socket => {
    const ip = ipToInt(socket.remoteAddress)
    const id = Math.abs(ip) % cpus
    const worker = workers[id]
    if (worker) worker.send({ name: 'socket' }, socket)
  }

  const server = new net.Server({ pauseOnConnect: true }, balancer)
  server.listen(2000)
} else {
  const dispatcher = (req, res) => {
    console.log(req.url)
    res.setHeader('Process-Id', process.pid)
    res.end(`Hello from worker ${process.pid}`)
  }

  const server = http.createServer(dispatcher)
  server.listen(null)

  process.on('message', (message, socket) => {
    if (message.name === 'socket') {
      socket.server = server
      server.emit('connection', socket)
      socket.resume()
    }
  })
}

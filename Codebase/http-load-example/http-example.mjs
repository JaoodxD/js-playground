import { createServer } from 'node:http'

import express from 'express'
import fastify from 'fastify'

const server2 = fastify({ logger: false })
server2
  .all('/*', (req, res) => {
    res.send('hello world')
  })
  .listen({ port: 3002 }, () => console.log('listeting on port 3002'))

const server = express()
server
  .all('/*', (req, res) => {
    res.end('hello world')
  })
  .listen(3001, () => console.log('listening on port 3001'))

createServer((req, res) => {
  res.end('hello world')
}).listen(3000, () => console.log('listening on port 3000'))

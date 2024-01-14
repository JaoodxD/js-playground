import { createServer } from 'node:http'
import { parallelize, finalize } from 'naive-concurrency/parallelizer.js'

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

// function heavyCompute () {
//   for (let i = 0; i < 1e6; i++) { }
// }

// const asyncHeavyCompute = parallelize(heavyCompute, {
//   pool: 4
// })

createServer((req, res) => {
  // await asyncHeavyCompute()
  // const result = await heavyCompute()
  res.end('hello world')
}).listen(3000, () => console.log('listening on port 3000'))

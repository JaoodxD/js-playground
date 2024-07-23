const EventEmitter = require('node:events')
const { setTimeout: sleep } = require('node:timers/promises')

const ee1 = new EventEmitter({ captureRejections: true })
ee1.on('something', async value => {
  await sleep(500)
  throw new Error('kaboom')
})

ee1.on('error', console.log)

const ee2 = new EventEmitter({ captureRejections: true })
ee2.on('something', async value => {
  await sleep(500)
  throw new Error('kaboom')
})

ee2[Symbol.for('nodejs.rejection')] = console.log

;(function doSomething () {
  ee1.emit('something')
})()

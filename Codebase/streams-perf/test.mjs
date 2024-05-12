import { EventEmitter } from 'node:events'
import startCounter from 'count-promises'

const ee = new EventEmitter()

const stop = startCounter()

ee.on('check', data => {
  console.log({ data })
  const total = stop()
  console.log(total, 'promises have been created since `startCounter()`')
})

ee.emit('check', 'Hello world')

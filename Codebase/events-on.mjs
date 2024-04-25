import { EventEmitter, on } from 'node:events'

const ee = new EventEmitter()

queueMicrotask(() => {
  ee.emit('message', 1)
  ee.emit('message', 2)
  ee.emit('message', 3)
})

for await (const event of on(ee, 'message', {
  highWaterMark: 5,
  lowWaterMark: 2
})) {
  console.log(event)
}

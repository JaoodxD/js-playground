const { EventEmitter } = require('events')
const { setTimeout: wait } = require('timers/promises')

const ee = new EventEmitter()

const doRequest = async (msg) => {

  ee.addListener('message', (payload) => {
    console.log({msg, payload})
  })
  await wait(1000)
  ee.emit('message', msg)
}


doRequest('Hello 1')
doRequest('World 2')

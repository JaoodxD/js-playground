import { EventEmitter } from 'node:events'

const ee = new EventEmitter()

const broadcastMessage = msg => {
  console.log(new Date().toLocaleTimeString(), 'Broadcasting queued message')
  ee.emit('message', msg)
}

const postMessage = msg => {
  console.log('\n')
  console.log(new Date().toLocaleTimeString(), 'Posting message')
  broadcastMessage(msg)
}

const user1Listener = msg => {
  console.log(new Date().toLocaleTimeString(), 'User1 recieved:', msg)
}

const user2Listener = msg => {
  console.log(new Date().toLocaleTimeString(), 'User2 recieved:', msg)
}

ee.on('message', user1Listener)
ee.on('message', user2Listener)

const interval = setInterval(() => {
  postMessage('User3 changed configs')
}, 500)

setTimeout(() => clearInterval(interval), 5_000)

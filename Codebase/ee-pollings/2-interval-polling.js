import { EventEmitter } from 'node:events'

const ee = new EventEmitter()

let messageQueue = []

const postMessage = msg => {
  console.log(new Date().toLocaleTimeString(), 'Posting message')
  messageQueue.push({ msg, date: new Date().toLocaleTimeString() })
}

const broadcastMessage = () => {
  if (!messageQueue.length) {
    console.log('No message to broadcast')
    return
  }

  console.log(new Date().toLocaleTimeString(), 'Broadcasting queued message')
  ee.emit('message', messageQueue)
  messageQueue = []
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

setInterval(() => {
  broadcastMessage()
}, 2000).unref()

setTimeout(() => clearInterval(interval), 6_000)

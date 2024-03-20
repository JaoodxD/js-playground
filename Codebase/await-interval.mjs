import { setInterval } from 'node:timers/promises'

for await (const _ of setInterval(500)) {
  console.log('hi')
}

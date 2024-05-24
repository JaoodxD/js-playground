import { nextTick } from 'node:process'
const end = new Date()

end.setSeconds(end.getSeconds() + 10)

let count = 0

nextTick(function counter () {
  count++
  if (new Date() < end) nextTick(counter)
  else {
    console.log(count / 1e3, 'ops')
  }
})

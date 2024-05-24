const end = new Date()

end.setSeconds(end.getSeconds() + 10)

let count = 0

queueMicrotask(function counter () {
  count++
  if (new Date() < end) queueMicrotask(counter)
  else {
    console.log(count / 1e3, 'ops')
  }
})

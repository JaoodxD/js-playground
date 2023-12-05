function build () {
  var curr = 0,
    next = 1
  var temp = 0
  function* fibonacci () {
    while (true) {
      yield curr
      temp = curr + next
      curr = next
      next = temp
    }
  }

  var cache = {}
  var counter = 0
  return function fib (n) {
    if (n in cache) return cache[n]
    for (var next of fibonacci()) {
      cache[counter] = next
      if (counter === n) return next
      counter++
    }
  }
}

var fib = build()

var table = []
for (var i = 0; i <= 100; i++) {
  table.push(fib(i))
}
console.table(table)

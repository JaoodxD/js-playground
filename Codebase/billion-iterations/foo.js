const array = new Uint32Array(10000)
// array.fill(10000)

function test () {
  const start = Date.now()
  for (let i = 0; i < 10000; i++) {
    for (let j = 0; j < 100000; j++) {
      array[i] = array[i] + j
    }
  }
  const elapsed = Date.now() - start
  console.log(elapsed)
}

for (let i = 0; i < 10; i++) {
  test()
}

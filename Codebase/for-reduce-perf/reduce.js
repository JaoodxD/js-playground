for (let i = 0; i < 20; i++) {
  const arr = new Array(10_000_000).fill(0)
  console.time('reduce')
  const sumArr = arr.reduce((a, b) => a + b)
  console.timeEnd('reduce')
}

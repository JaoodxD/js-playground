for (let i = 0; i < 20; i++) {
  const arr = new Array(10_000_000).fill(0)
  console.time('for')
  for (let j = 0; j < arr.length; j++) {
    arr[j] = arr[j + 1] ?? 0
  }
  console.timeEnd('for')
}

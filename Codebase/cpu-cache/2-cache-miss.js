const arr = []
const SIZE = 1000
for (let i = 0; i < SIZE; i++) {
  const subarr = []
  arr.push(subarr)
  for (let j = 0; j < SIZE; j++) {
    subarr.push(j)
  }
}

let sum = 0
console.time('miss')
for (let j = 0; j < SIZE; j++) {
  for (let i = 0; i < SIZE; i++) {
    sum += arr[i][j]
  }
}
console.timeEnd('miss')
console.log({ sum })

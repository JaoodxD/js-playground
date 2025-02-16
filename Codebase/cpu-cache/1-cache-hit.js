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
console.time('hit')
for (let i = 0; i < SIZE; i++) {
  for (let j = 0; j < SIZE; j++) {
    sum += arr[i][j]
  }
}
console.timeEnd('hit')
console.log({sum})

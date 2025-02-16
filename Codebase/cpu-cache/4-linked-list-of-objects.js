const head = { i: 0, next: null }
const SIZE = 1_000_000

let prev = head
for (let i = 1; i < SIZE; i++) {
  const node = { i, next: null }
  prev.next = node
  prev = node
}

let sum = 0
let curr = head
console.time('linked list of objects')
while (curr !== null) {
  sum += curr.i
  curr = curr.next
}

console.timeEnd('linked list of objects')
console.log(sum)

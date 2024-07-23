const close = ([a, b], [x, y]) => (x >= a && x <= b) || (y >= a && y <= b)

const merge = arr =>
  arr.reduce((acc, range) => {
    const adj = acc.find(range2 => close(range, range2))
    if (!adj) acc.push(range)
    else {
      const [x, y] = adj
      const [a, b] = range
      adj[0] = Math.min(x, a)
      adj[1] = Math.max(y, b)
    }
    console.log(range)
    console.dir(acc, { depth: null })
    console.log('')
    return acc
  }, [])

const array1 = [
  [1, 3],
  [2, 6],
  [8, 10],
  [15, 18]
]
const array2 = [
  [1, 4],
  [4, 5]
]
const array3 = [
  [11, 12],
  [2, 3],
  [5, 7],
  [1, 4],
  [8, 10],
  [6, 8]
]

console.log(merge(array3))

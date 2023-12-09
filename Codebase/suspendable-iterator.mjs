const obj = {
  data: [1, 2, 3, 4, 5],
  index: 0,
  [Symbol.asyncIterator] () {
    setInterval(() => this.data.push(111), 2000)
    return {
      async next () {
        if (obj.index < obj.data.length) {
          await wait(500)

          const value = obj.data[obj.index++]

          return { value, done: false }
        } else {
          return { done: true }
        }
      }
    }
  }
}

// Using the manual async iterable
for await (const value of obj) {
  console.log('first', value)
  break
}

await wait(1000)

for await (const value of obj) {
  console.log('seocnd', value)
}

function wait (ms) {
  return new Promise(res => setTimeout(res, ms))
}

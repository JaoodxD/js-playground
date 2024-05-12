Array.prototype.then = async function (resolve, reject) {
  const promises = {
    [Symbol.iterator]: function* () {
      for (let i = 0; i < this.length; i++) {
        yield this[i]
      }
    }
  }
  promises.length = 0
  for (let i = 0; i < this.length; i++) {
    promises[i] = await this[i]
    promises.length++
  }
  resolve(promises)
}
const [a, b] = await [Promise.resolve(1), Promise.resolve(2)]

console.log({ a, b })

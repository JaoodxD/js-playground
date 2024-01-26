import startCounter from 'count-promises'

const stop = startCounter()
const obj = {
  then(res) {
    res(42)
  }
}
const number = await obj
// const number2 = await 42
// const number3 = await Promise.resolve(42)
// obj.then( (n) => console.log(n))

const total = stop()
console.log(total, 'promises have been created since `startCounter()`')

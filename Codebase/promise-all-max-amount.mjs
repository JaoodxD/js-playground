import { setTimeout } from 'node:timers/promises'
const COUNT =  2_097_150 // max promises to resolve in Promise.all on node v22.0.0 
const promises = []

console.time('generate')

for (let i = 0; i < COUNT; i++) {
  promises.push(Promise.resolve(i))
}
console.timeEnd('generate')

Promise.all(promises).then(() => console.log('done'))

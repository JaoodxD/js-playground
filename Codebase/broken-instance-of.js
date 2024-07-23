const vm = require('node:vm')

const plainObject = {}
const newContextObject = vm.runInNewContext('({})')

console.log(plainObject, plainObject instanceof Object) // true
console.log(newContextObject, newContextObject instanceof Object) // false


const plainError = new Error()
const newContextError = vm.runInNewContext('new Error()')

console.log(plainError, plainError instanceof Error) // true
console.log(newContextError, newContextError instanceof Error) // false

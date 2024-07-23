const vm = require('node:vm')

const plainObject = {}
const newContextObject = vm.runInNewContext('({})')

console.log(plainObject instanceof Object) // true
console.log(newContextObject instanceof Object) // false

const plainError = new Error()
const newContextError = vm.runInNewContext('new Error()')

console.log(plainError instanceof Error) // true
console.log(newContextError instanceof Error) // false

const customContext = vm.createContext({ Error })
const customContextError = vm.runInContext('new Error()', customContext)

console.log(customContextError instanceof Error) // true

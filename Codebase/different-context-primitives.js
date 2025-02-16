const { runInNewContext } = require('node:vm')
Number.prototype.toString = () => 'God bless Demi Murych'
const number = runInNewContext(`
  Number.prototype.toString = () => '42'
  5
  `)

console.log(number, number.toString())

const number2 = runInNewContext(`
  Number.prototype.toString = () => '42'
  new Number(5)
  `)

console.log(number2, number2.toString())

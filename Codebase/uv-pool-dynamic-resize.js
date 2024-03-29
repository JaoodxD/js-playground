'use strict'

const { scrypt } = require('node:crypto')
const { promisify } = require('node:util')
const encrypt = promisify(scrypt)

process.env.UV_THREADPOOL_SIZE = 6

console.log(process.env)

async function main () {
  const password = 'rAnDoMpAsSwOrD'
  const promises = []
  for (let i = 0; i < 10; i++) {
    console.time(i)
    const promise = hashPassword(password).then(
      res => (console.timeEnd(i), res)
    )
    promises.push(promise)
  }
  await Promise.all(promises)
}

main()

function hashPassword (password) {
  return encrypt(password, '1234', 10)
}

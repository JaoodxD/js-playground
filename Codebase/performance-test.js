/* eslint-disable no-var */
//node --allow-natives-syntax perfomance-test.js
'use strict'
const { performance } = require('perf_hooks')
var result = 0
const forLet = () => {
  result = 0
  for (let i = 0; i < 100_000_0; i++) {
    const string = 'pathRoute/methodName'
    const newPath = string.replace('/', '.')
  }
}
%NeverOptimizeFunction(forLet)
const startPerf = performance.now()
forLet()
const endPerf = performance.now()
console.log(result, endPerf - startPerf)

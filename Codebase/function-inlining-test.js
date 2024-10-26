const { strictEqual } = require('node:assert');

function singleReturn(a) {
  let result = 0;
  switch (a) {
    case 1:
      result = 1;
      break;
    case 2:
      result = 2;
      break;
    case 3:
      result = 3;
      break;
    case 4:
      result = 4;
      break;
    case 5:
      result = 5;
      break;
  }
  return result;
}

function earlyReturn(a) {
  switch (a) {
    case 0:
      return 0;
    case 1:
      return 1;
    case 2:
      return 2;
    case 3:
      return 3;
    case 4:
      return 4;
    case 5:
      return 5;
  }
}

function betterEarlyReturn(a) {
  switch (a) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 3:
      return 3;
    case 4:
      return 4;
    case 5:
      return 5;
    default:
      return 0;
  }
}

// %OptimizeFunctionOnNextCall(singleReturn);
// %OptimizeFunctionOnNextCall(earlyReturn);
// %OptimizeFunctionOnNextCall(betterEarlyReturn);

(() => {
  console.time('testSingleReturn');
  for (let i = 0, temp = 0; i < 1e7; i++) {
    temp = i % 5;
    strictEqual(singleReturn(temp), temp);
  }
  console.timeEnd('testSingleReturn');
})();

(() => {
  console.time('testEarlyReturn');
  for(let i = 0, temp = 0; i < 1e7; i++) {
    temp = i % 5;
    strictEqual(earlyReturn(temp), temp);
  }
  console.timeEnd('testEarlyReturn');
})();

(() => {
  console.time('testBetterEarlyReturn');
  for(let i = 0, temp = 0; i < 1e7; i++) {
    temp = i % 5;
    strictEqual(betterEarlyReturn(temp), temp);
  }
  console.timeEnd('testBetterEarlyReturn');
})();

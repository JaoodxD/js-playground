var arr = new Array(100).fill(0).map((e, i) => i);
var res = 0

function myFor(arr) {
  var tempSum = 0
  for (let j = 0; j < 10_000_000; j++) {
    for (let index = 0; index < arr.length; index++) {
      tempSum += arr[index];
    }
  }
    return tempSum
}

for (let c = 0; c < 5; c++) {
  console.time('for')
  res += myFor(arr)
  console.timeEnd('for')
}

console.log(res);

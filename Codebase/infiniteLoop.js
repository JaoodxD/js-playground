const infiniteLoop = (arr, d, n) => {
  const strategy = {
    left: (arr1, arr2) => arr1.push(arr2.shift()),
    right: (arr1, arr2) => arr2.unshift(arr1.pop())
  };

  const action = strategy[d];

  while (n--)
    for (let i = 0; i < arr.length; i++) {
      const i2 = (i + 1) % arr.length;
      action(arr[i], arr[i2]);
    }
  return arr;
};

const arr = [
  [1, 2],
  [3, 4, 5],
  [6, 7, 8, 9]
];

console.log(arr);

infiniteLoop(arr, 'left', 2);
console.log(arr);

infiniteLoop(arr, 'right', 2);
console.log(arr);


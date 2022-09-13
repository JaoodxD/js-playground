'use strict';

const findSpecPartition = (n, k, com) => {
    const arr = new Array(k);
    if (com === 'min') {
        arr.fill(1);
        arr[0] = n - k + 1;
    }
    if (com === 'max') {
        const l = Math.floor(n / k);
        const u = n % k;
        arr.fill(l);
        arr.fill(l + 1, 0, u);
    }
    return arr;
};

console.log(findSpecPartition(10, 4, 'min'));
console.log(findSpecPartition(10, 4, 'max'));

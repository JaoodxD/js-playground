'use strict';

const queueTime = (customers, n) => {
    let arr = [...customers];
    const zeroFilter = (arr) => arr.filter((n) => n);
    const decrArr = (arr, num) => arr.map((n, i) => i < num ? n - 1 : n);

    let count = 0;
    while (arr.length) {
        arr = zeroFilter(decrArr(arr, n));
        count++;
        console.log({ arr });
    }
    return count;
};

const queueTime2 = (customers, n) => {
    let count = 0;
    while (customers.length) {
        for (let i = 0; i < Math.min(customers.length, n); i++) {
            customers[i]--;
        }
        customers = customers.filter((n) => n);
        count++;
    }
    return count;
};

// console.log(queueTime([], 1), 0);
// console.log(queueTime([1, 2, 3, 4], 1), 10);
console.log(queueTime2([2, 2, 3, 3, 4, 4], 2), 9);
// console.log(queueTime([1, 2, 3, 4, 5], 100), 5);

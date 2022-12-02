'use strict';
const { intervals } = require('./intervals.json');

const seconds = Object.values(intervals).flat();
console.log({ seconds });

const index = seconds.findIndex((n) => n > 1380);
console.log(index, seconds[index]);

const distribution = seconds.map((n, i, arr) => ({ dist: i / arr.length, n }));

console.table(distribution);


'use strcit';

const merge = require('./customMergeObjects.js');

/* const group = require('./group');
const user = require('./user');

console.dir({ group, user, result: merge(group, user) }, { depth: null });
 */


const arr1 = [1, 2, 3];
const arr2 = [3, 4];

console.log({ arr1, arr2, result: merge(arr1, arr2) });

const objArr1 = [{ name: 'test', show: true }];
const objArr2 = [{ name: 'test', show: true }];

console.log({ objArr1, objArr2, result: merge(objArr1, objArr2) });


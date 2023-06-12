'use strcit';

const merge = require('./customMergeObjects.js');

const group = require('./group');
const user = require('./user');

console.dir({ group, user, result: merge(group, user) }, { depth: null });

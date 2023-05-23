'use strict';

const copyStrategy = {
  'number': (n) => n,
  'string': (str) => str,
  'object': function (obj) {
    const newObj = {};

    for (const key in obj) {
      const type = typeof obj[key];
      const copy = getStrategy(type);
      if (!copy) continue;
      newObj[key] = copy(obj[key]);
    }

    return newObj;
  },
  'function': (fn) => {
    console.log({ fn:fn.toString() });
    return fn;
  }
};

const getStrategy = (type) => copyStrategy[type];
const copy = (value) => getStrategy(typeof value)(value);

const obj = {
  a: 1,
  b: 'asd',
  c: {
    cc: 'hello'
  },
  hello() { console.log('hello, world') }
};

const copyObj = copy(obj);

console.table([obj, copyObj]);
console.log(obj.hello === copyObj.hello);



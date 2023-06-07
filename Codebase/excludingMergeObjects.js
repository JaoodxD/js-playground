const mergeStrategy = {
  primitive: (a, b) => a != b ? b ?? a : undefined,
  object(obj1, obj2) {
    if (!obj1) return merge(obj2, obj2);
    if (!obj2) return merge(obj1, obj1);

    const { constructor } = Reflect.getPrototypeOf(obj2);
    const obj = new constructor();

    const fields1 = Object.keys(obj1);
    const fields2 = Object.keys(obj2);
    const fields = new Set(fields1.concat(fields2));

    for (const key of fields) {
      const value = merge(obj1[key], obj2[key])
      if (value !== undefined) {
        obj[key] = value;
      }
    }

    return obj;
  }
};

const getAction = (value) =>
  typeof value === 'object'
    ? mergeStrategy.object
    : mergeStrategy.primitive;

const merge = (v1, v2) => getAction(v2)(v1, v2);
const multiMerge = (...values) => values.reduce((acc, v) => merge(acc, v));

const obj1 = {
  max: 'test',
  dima: {
    field1: true
  },
  test: [{
    a: 1,
    b: '2'
  },
  {
    a: 2,
    b: '22'
  }]
};

const obj2 = {
  dima: {
    field1: false,
    field2: true
  },
  test: [{
    a: 2,
  }]
};

const newObj = merge(obj1, obj2);

console.dir({ obj1, obj2, newObj }, { depth: null });


const arr1 = [1, 2, 3, 4, 5];
const arr2 = { 7: 0x45 };
const arr3 = { 7: 0x45 };

console.dir(multiMerge(arr1, arr2, arr3));

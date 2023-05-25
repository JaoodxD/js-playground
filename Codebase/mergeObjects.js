const mergeStrategy = {
  primitive: (a, b) => b ?? a,
  object: (obj1, obj2) => {
    if (!obj1) return merge(obj2, obj2);
    if (!obj2) return merge(obj1, obj1);

    const { constructor } = Reflect.getPrototypeOf(obj2);
    const obj = new constructor();

    const fields1 = Object.keys(obj1);
    const fields2 = Object.keys(obj2);
    const fields = new Set(fields1.concat(fields2));

    for (const key of fields) {
      obj[key] = merge(obj1[key], obj2[key]);
    }

    return obj;
  }
};

const getAction = (value) =>
  typeof value === 'object'
    ? mergeStrategy.object
    : mergeStrategy.primitive;

const merge = (v1, v2) => getAction(v2)(v1, v2);

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
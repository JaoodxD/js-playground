const mergeStrategy = {
  primitive(value1, value2) {
    return value1 !== value2 ? value2 ?? value1 : undefined;
  },

  primitiveArray(arr1, arr2 = []) {
    const filtered = arr1.concat(arr2).filter((x) => {
      if (arr1.includes(x) !== arr2.includes(x)) return true;
      return false;
    });
    if (!filtered.length) return undefined;
    return filtered;
  },

  objectsArray(arr1, arr2) {
    return arr1.concat(arr2).filter((x) => {
      const arr1Contains = arr1.some(({ id }) => id === x.id);
      const arr2Contains = arr2.some(({ id }) => id === x.id);
      if (arr1Contains !== arr2Contains) return true;
      return false;
    });
  },

  timestampedObject(obj1, obj2 = {}) {
    const { time: t1 } = obj1;
    const { time: t2 } = obj2;
    if (t1 > t2) return this.object(obj1, {});
    return this.object(obj1, obj2);
  },

  object(obj1, obj2) {
    if (!obj1) return merge(obj2, obj2);
    if (!obj2) return merge(obj1, obj1);

    const { constructor } = Reflect.getPrototypeOf(obj2);
    const obj = new constructor();

    const fields1 = Object.keys(obj1);
    const fields2 = Object.keys(obj2);
    const fields = new Set(fields1.concat(fields2));

    for (const key of fields) {
      const mergedValue = merge(obj1[key], obj2[key]);
      if (mergedValue !== undefined) obj[key] = mergedValue;
    }
    if (!Object.keys(obj).length) return undefined;
    return obj;
  }
};

const getType = (value) => {
  if (Array.isArray(value)) {
    const [element] = value;
    const type = typeof element;
    if (type !== 'object') return 'primitiveArray';
    return 'objectsArray';
  }
  if (typeof value === 'object') {
    if ('time' in value) return 'timestampedObject';
    return 'object';
  };
  return 'primitive';
}

const merge = (v1, v2) => mergeStrategy[getType(v1)](v1, v2);

const arr1 = [{ id: 1, name: 'UA' }, { id: 2, name: 'KZ' }];
const arr2 = [{ id: 2, name: 'KZ' }, { id: 3, name: '-=xXxD1M@S1KxXx=-' }];

const result = merge(arr1, arr2);
console.log({ result });

const groupCfg = {
  countries: [1, 2, 3],
  statuses: {
    value: [10, 20, 30],
    time: 1000
  },
  departments: {
    value: [8, 9, 10],
    time: 5000
  },
  analytics: {
    show: true,
    time: 10000
  },
  cardOrder: {
    time: 10000,
    show: true,
    settings: {
      comment: {
        show: true
      },
      contact: {
        rows: [
          { id: 1, name: 'country', show: true },
          { id: 2, name: 'department', show: true },
        ],
        show: true
      }
    }
  }
};

const userCfg = {
  countries: [1, 2, 3],
  statuses: {
    value: [10, 40],
    time: 1001
  },
  departments: {
    value: [7, 8],
    time: 4000
  },
  analytics: {
    show: true,
    time: 18000
  },
  cardOrder: {
    time: 18000,
    show: true,
    settings: {
      comment: {
        show: true
      },
      contact: {
        rows: [
          { id: 3, name: 'asdasd', show: true },
          { id: 2, name: 'department', show: true },
        ],
        show: true
      }
    }
  }

};


console.dir({ groupCfg, userCfg, result: merge(groupCfg, userCfg) }, { depth: null });

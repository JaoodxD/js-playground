const getType = require('./valueType');

const primitiveComparison = (a, b) => {
  const typeA = typeof a;
  const typeB = typeof b;

  if (typeA === typeB) {
    if (typeA === 'number') return a - b;
    if (typeA === 'string') return a.localeCompare(b);
  }
  return a.toString().localeCompare(b.toString());
};

const mergeStrategy = {
  primitive(value1, value2) {
    return value2 ?? value1;
  },

  primitiveArray(arr1, arr2 = []) {
    if (!arr2) return arr1.slice().sort(primitiveComparison);
    const concated = arr1.filter((x) => !arr2.includes(x))
      .concat(arr2.filter((x) => !arr1.includes(x)));
    return concated.sort(primitiveComparison);
  },

  objectsArray(arr1, arr2) {
    const unique1 = arr1.filter((x) => !arr2.some(({ name }) => name === x.name));
    const unique2 = arr2.filter((x) => !arr1.some(({ name }) => name === x.name));

    const common = arr1.filter((x) => arr2.some(({ name }) => name === x.name));
    const merged = common.map((obj) => {
      const commonObj = arr2.find((({ name }) => name === obj.name));
      const merged = merge(obj, commonObj);
      return merged;
    });

    return unique1.concat(merged, unique2);
  },

  timestampedObject(obj1, obj2) {
    const v1 = obj1 ?? {};
    const v2 = obj2 ?? {};
    const { time: t1 = 0 } = v1;
    const { time: t2 = 0 } = v2;
    if (t1 > t2) return mergeStrategy.object(obj1, obj2, true);
    return mergeStrategy.object(obj1, obj2);
  },

  timestampedArray(arr1, arr2 = []) {
    console.log({ arr1, arr2 });
    const unique = arr2.filter((x) => !arr1.includes(x));
    const concated = arr1.concat(unique);
    return concated.sort(primitiveComparison);
  },

  object(obj1, obj2, time) {
    if (!obj1) return merge(obj2, emptyInstance(obj2));
    if (!obj2) return merge(obj1, emptyInstance(obj1));
    const obj = emptyInstance(obj2);

    const fields1 = Object.keys(obj1);
    const fields2 = Object.keys(obj2);
    const fields = new Set(fields1.concat(fields2));

    for (const key of fields) {
      const mergedValue = merge(obj1[key], obj2[key], time);
      if (mergedValue !== undefined) obj[key] = mergedValue;
    }

    const keysCount = Object.keys(obj).length;
    if (!keysCount) return;
    if (keysCount === 1 && obj.hasOwnProperty('time')) return;
    return obj;
  }
};

const emptyInstance = (val) => {
  const { constructor } = Reflect.getPrototypeOf(val);
  return new constructor();
};

const merge = (v1, v2) => mergeStrategy[getType(v1)](v1, v2);

module.exports = merge;

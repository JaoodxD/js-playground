const getType = require('./valueType');

const mergeStrategy = {
  primitive(value1, value2) {
    return value2 ?? value1;
  },

  primitiveArray(arr1, arr2 = []) {
    const concated = arr1.filter((x) => !arr2.includes(x))
      .concat(arr2.filter((x) => !arr1.includes(x)));
    return concated;
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

  timestampedObject(obj1, obj2 = {}) {
    const { time: t1 } = obj1;
    const { time: t2 = 0 } = obj2;
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
      obj[key] = mergedValue;
    }
    return obj;
  }
};

const merge = (v1, v2) => mergeStrategy[getType(v1)](v1, v2);

module.exports = merge;
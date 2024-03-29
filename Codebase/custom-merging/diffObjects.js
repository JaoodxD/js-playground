const getType = require('./valueType');

const diffStrategy = {
  primitive(value1, value2) {
    if (value1 === value2) return;
    if (value2 == undefined) return value1;
    return value2;
  },

  primitiveArray(arr1, arr2 = []) {
    const filtered = arr1.concat(arr2).filter((x) =>
      arr1.includes(x) !== arr2.includes(x));
    if (!filtered.length) return;
    return filtered.sort();
  },

  objectsArray(arr1, arr2 = []) {
    const arr = [];
    for (const obj of arr1) {
      const similar = arr2.find(({ name }) => obj.name === name);
      if (!similar) {
        arr.push(obj);
        continue;
      }
      const temp = this.object(obj, similar);
      if (temp) arr.push(temp)
    }
    for (const obj of arr2) {
      const similar = arr1.find(({ name }) => obj.name === name);
      if (!similar) arr.push(obj);
    }
    return arr;
  },

  timestampedObject(obj1, obj2 = {}) {
    const { time: t1 } = obj1;
    const { time: t2 = 0 } = obj2;
    if (t1 > t2) return;// this.object(obj1, {});
    return this.object(obj1, obj2);
  },

  object(obj1, obj2) {
    if (!obj1) return diff({}, obj2);
    if (!obj2) return diff(obj1, {});
    const obj = emptyInstance(obj2);

    const fields1 = Object.keys(obj1);
    const fields2 = Object.keys(obj2);
    const fields = new Set(fields1.concat(fields2));
    for (const key of fields) {
      const mergedValue = diff(obj1[key], obj2[key]);
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

const diff = (v1, v2) => diffStrategy[getType(v1)](v1, v2);

module.exports = diff;

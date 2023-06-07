
const diffStrategy = {
  primitive: (v1, v2) => v1,
  array: (arr1, arr2) => arr1.filter((x) => !arr2.includes(x)),
  object: (obj1, obj2) =>
    Object.fromEntries(
      Object.entries(obj1)
        .filter(([key]) => !(key in obj2))
    )
};
const getType = (value) => {
  if (Array.isArray(value)) return 'array';
  if (typeof value === 'object') return 'object';
  return 'primitive';
}
const getStrategy = (value1, value2) => {
  const type1 = getType(value1);
  const type2 = getType(value2);
  if (type1 !== type2) throw new Error('Not compatible types');
  return diffStrategy[type1];
};

const diff = (value1, value2) => getStrategy(value1, value2)(value1, value2);


const obj1 = { a: 1, b: 2, c: 1 };
const obj2 = { b: 2, a: 1 };
console.log(diff(obj1, obj2));

const arr1 = [1, 3, 4, 5];
const arr2 = [5, 3];
console.log(diff(arr1,arr2));

const UA = { id: 1, name: 'Ukraine' };
const KZ = { id: 2, name: 'Kazakhstan' };
const US = { id: 3, name: 'United States of America' };
const objArr1 = [UA, KZ];
const objArr2 = [KZ];
console.log(diff(objArr1, objArr2));

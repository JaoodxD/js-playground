'use strict';
const { Config } = require('./config.js');
const { test } = require('node:test');
const assert = require('node:assert');

const arraysContainSameElements = (arr1, arr2) => {
  if (!Array.isArray(arr1)) return false;
  if (!Array.isArray(arr2)) return false;
  if (arr1.length !== arr2.length) return false;

  const sortedArr1 = arr1.slice().sort();
  const sortedArr2 = arr2.slice().sort();

  return sortedArr1.every((value, index) => value === sortedArr2[index]);
};

test('diff tests', async (t) => {
  await t.test('diff primitives', async (t) => {
    await t.test('should return first if second is null/undefined', () => {
      const value1 = 1;
      const value2 = undefined;

      const cfg1 = new Config(value1);
      const cfg2 = new Config(value2);
      const diff = cfg1.diff(cfg2);

      const result = diff.toJSON();

      assert.strictEqual(result, value1);
    });

    await t.test('should return null if both values are equal', () => {
      const value1 = 2;
      const value2 = 2;

      const cfg1 = new Config(value1);
      const cfg2 = new Config(value2);
      const diff = cfg1.diff(cfg2);

      const result = diff.toJSON();

      assert.strictEqual(result, null);
    });

    await t.test('should return second if both values are present and not equal', () => {
      const value1 = 1;
      const value2 = 2;

      const cfg1 = new Config(value1);
      const cfg2 = new Config(value2);
      const diff = cfg1.diff(cfg2);

      const result = diff.toJSON();

      assert.strictEqual(result, value2);
    });
  });

  await t.test('diff array of primitives', async (t) => {
    await t.test('should return first array if second is empty', () => {
      const value1 = [1, 2, 3, 4];
      const value2 = [];

      const cfg1 = new Config(value1);
      const cfg2 = new Config(value2);
      const diff = cfg1.diff(cfg2);

      const result = diff.toJSON();

      assert.deepEqual(result, value1);
    });

    await t.test('should return second if first array is empty', () => {
      const value1 = [];
      const value2 = [1, 2, 3, 4];

      const cfg1 = new Config(value1);
      const cfg2 = new Config(value2);
      const diff = cfg1.diff(cfg2);

      const result = diff.toJSON();

      assert.deepEqual(result, value2);
    });

    await t.test('should return excluded elements', () => {
      const value1 = [1, 2, 3, 4];
      const value2 = [1, 3];

      const cfg1 = new Config(value1);
      const cfg2 = new Config(value2);
      const diff = cfg1.diff(cfg2);

      const result = diff.toJSON();
      const expected = [2, 4];

      assert.deepEqual(result, expected);
    });

    await t.test('should return included elements', () => {
      const value1 = [1, 2, 3, 4];
      const value2 = [1, 2, 3, 4, 5];

      const cfg1 = new Config(value1);
      const cfg2 = new Config(value2);
      const diff = cfg1.diff(cfg2);

      const result = diff.toJSON();
      const expected = [5];

      assert.deepEqual(result, expected);
    });

    await t.test('should return newely included and excluded elements', () => {
      const value1 = [1, 2, 3, 4];
      const value2 = [1, 2, 3, 5];

      const cfg1 = new Config(value1);
      const cfg2 = new Config(value2);
      const diff = cfg1.diff(cfg2);

      const result = diff.toJSON();
      const expected = [4, 5];

      assert.deepEqual(result, expected);
    });
  });

  await t.test('objects with primitive values', async (t) => {
    await t.test('should return first if second is null/undefined', () => {
      const value1 = { a: 1 };
      const value2 = { a: undefined };

      const cfg1 = new Config(value1);
      const cfg2 = new Config(value2);
      const diff = cfg1.diff(cfg2);

      const result = diff.toJSON();

      assert.deepEqual(result, value1);
    });

    await t.test('should return null if both values are equal', () => {
      const value1 = { a: 2 };
      const value2 = { a: 2 };

      const cfg1 = new Config(value1);
      const cfg2 = new Config(value2);
      const diff = cfg1.diff(cfg2);

      const result = diff.toJSON();

      assert.strictEqual(result, null);
    });

    await t.test('should return second if both values are present and not equal', () => {
      const value1 = { a: 1 };
      const value2 = { a: 2 };

      const cfg1 = new Config(value1);
      const cfg2 = new Config(value2);
      const diff = cfg1.diff(cfg2);

      const result = diff.toJSON();

      assert.deepEqual(result, value2);
    });
  });

  await t.test('objects with nested arrays', async (t) => {
    await t.test('should return first array if second is empty', () => {
      const value1 = { countries: [1, 2, 3, 4] };
      const value2 = { countries: [] };

      const cfg1 = new Config(value1);
      const cfg2 = new Config(value2);
      const diff = cfg1.diff(cfg2);

      const result = diff.toJSON();

      assert.deepEqual(result, value1);
    });

    await t.test('should return second if first array is empty', () => {
      const value1 = { countries: [] };
      const value2 = { countries: [1, 2, 3, 4] };

      const cfg1 = new Config(value1);
      const cfg2 = new Config(value2);
      const diff = cfg1.diff(cfg2);

      const result = diff.toJSON();

      assert.deepEqual(result, value2);
    });

    await t.test('should return excluded elements', () => {
      const value1 = { countries: [1, 2, 3, 4] };
      const value2 = { countries: [1, 3] };

      const cfg1 = new Config(value1);
      const cfg2 = new Config(value2);
      const diff = cfg1.diff(cfg2);

      const result = diff.toJSON();
      const expected = { countries: [2, 4] };

      assert.deepEqual(result, expected);
    });

    await t.test('should return included elements', () => {
      const value1 = { countries: [1, 2, 3, 4] };
      const value2 = { countries: [1, 2, 3, 4, 5] };

      const cfg1 = new Config(value1);
      const cfg2 = new Config(value2);
      const diff = cfg1.diff(cfg2);

      const result = diff.toJSON();
      const expected = { countries: [5] };

      assert.deepEqual(result, expected);
    });

    await t.test('should return newely included and excluded elements', () => {
      const value1 = { countries: [1, 2, 3, 4] };
      const value2 = { countries: [1, 2, 3, 5] };

      const cfg1 = new Config(value1);
      const cfg2 = new Config(value2);
      const diff = cfg1.diff(cfg2);

      const result = diff.toJSON();
      const expected = { countries: [4, 5] };

      assert.deepEqual(result, expected);
    });
  });

  await t.test('mixed test cases', async (t) => {
    await t.test('should return null on equal configs', () => {
      const group = new Config({
        countries: [1, 2, 3, 4, 5],
        order: {
          show: true,
          rows: ['id', 'phone', 'country', 'departments']
        }
      });
      const user = new Config({
        countries: [1, 2, 3, 4, 5],
        order: {
          show: true,
          rows: ['id', 'phone', 'country', 'departments']
        }
      });

      const diff = group.diff(user);
      const result = diff.toJSON();

      assert.deepEqual(result, null);
    });

    await t.test('should return only fields that differ', () => {
      const group = new Config({
        countries: [1, 2, 3, 4, 5],
        order: {
          show: true,
          rows: ['id', 'phone', 'country', 'departments']
        }
      });
      const user = new Config({
        countries: [1, 2, 3, 4, 5],
        order: {
          show: false,
          rows: ['id', 'phone', 'country', 'departments']
        }
      });

      const diff = group.diff(user);
      const result = diff.toJSON();

      const expected = {
        order: {
          show: false
        }
      };

      assert.deepEqual(result, expected);
    });

    await t.test('should return second config if first is empty', () => {
      const group = new Config({});
      const user = new Config({
        countries: [1, 2, 3, 4, 5],
        order: {
          show: true,
          rows: ['id', 'phone', 'country', 'departments']
        }
      });

      const diff = group.diff(user);
      const result = diff.toJSON();

      const expected = user.toJSON();

      assert.deepEqual(result, expected);
    });
  });
});

test('glue tests', async (t) => {
  await t.test('glue primitives', async (t) => {
    await t.test('should return first value when diff in null', () => {
      const group = new Config(1);
      const diff = new Config(null);

      const user = group.glue(diff);
      const result = user.toJSON();

      const expected = 1;

      assert.strictEqual(result, expected);
    });

    await t.test('should return diff value when group cfg in null', () => {
      const group = new Config(null);
      const diff = new Config(2);

      const user = group.glue(diff);
      const result = user.toJSON();

      const expected = 2;

      assert.strictEqual(result, expected);
    });

    await t.test('should return diff as a newer value', () => {
      const group = new Config(3);
      const diff = new Config(5);

      const user = group.glue(diff);
      const result = user.toJSON();

      const expected = 5;

      assert.strictEqual(result, expected);
    });

    await t.test('should return 0 as a newer value', () => {
      const group = new Config(3);
      const diff = new Config(0);

      const user = group.glue(diff);
      const result = user.toJSON();

      const expected = 0;

      assert.strictEqual(result, expected);
    });
  });

  await t.test('glue array of primitives', async (t) => {
    await t.test('should return group when diff is null', () => {
      const group = new Config([1, 2, 3, 4]);
      const diff = new Config(null);

      const user = group.glue(diff);
      const result = user.toJSON();

      const expected = [1, 2, 3, 4];

      assert.ok(arraysContainSameElements(result, expected));
    });

    await t.test('should return group when diff is empty array', () => {
      const group = new Config([1, 2, 3, 4]);
      const diff = new Config([]);

      const user = group.glue(diff);
      const result = user.toJSON();

      const expected = [1, 2, 3, 4];

      assert.ok(arraysContainSameElements(result, expected));
    });

    await t.test('should return diff when base config is null', () => {
      const group = new Config(null);
      const diff = new Config([1, 2, 3, 4]);

      const user = group.glue(diff);
      const result = user.toJSON();

      const expected = [1, 2, 3, 4];

      assert.ok(arraysContainSameElements(result, expected));
    });

    await t.test('should return diff when base config is empty array', () => {
      const group = new Config([]);
      const diff = new Config([1, 2, 3, 4]);

      const user = group.glue(diff);
      const result = user.toJSON();

      const expected = [1, 2, 3, 4];

      assert.ok(arraysContainSameElements(result, expected));
    });

    await t.test('should return array of exclusive values', () => {
      const group = new Config([1, 2, 3, 4]);
      const diff = new Config([3, 5]);

      const user = group.glue(diff);
      const result = user.toJSON();

      const expected = [1, 2, 4, 5];

      assert.ok(arraysContainSameElements(result, expected));
    });

    await t.test('should return null when two arrays duplicate each other', () => {
      const group = new Config([1, 2, 3, 4]);
      const diff = new Config([1, 2, 3, 4]);

      const user = group.glue(diff);
      const result = user.toJSON();

      const expected = null;

      assert.strictEqual(result, expected);
    });
  });
});

'use strict';
const { Config } = require('./config.js');
const { test } = require('node:test');
const assert = require('node:assert');

test('diff primitives', async (t) => {
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

test('diff array of primitives', async (t) => {
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

test('objects with primitive values', async (t) => {
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

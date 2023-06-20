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

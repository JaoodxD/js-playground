'use strict';

import { test } from 'node:test';
import assert from 'node:assert';

import quicksort from './quicksort.js';

test('quicksort test', async (t) => {
  await t.test('easy', () => {
    const arr = [4, 5, 3, 2, 7];
    const actualResult = [2, 3, 4, 5, 7];

    quicksort(arr);
    assert.strictEqual(arr.toString() === actualResult.toString(), true)

  });

  await t.test('medium rare', () => {
    const arr = [1, 2, 3, 4, 5];
    const actualResult = [1, 2, 3, 4, 5];

    quicksort(arr);
    assert.strictEqual(arr.toString() === actualResult.toString(), true)

  });

  await t.test('hard', () => {
    const arr = [5, 4, 3, 2, 1];
    const actualResult = [1, 2, 3, 4, 5];

    quicksort(arr);
    assert.strictEqual(arr.toString() === actualResult.toString(), true)

  });
})

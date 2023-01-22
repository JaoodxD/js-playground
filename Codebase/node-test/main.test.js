'use strict';
const { test } = require('node:test');
const assert = require('node:assert');

const { powering } = require('./main');

test('powering function', (t) => {
    t.todo('powering 10 ** 3 = 1000');
    assert.strictEqual(powering(10)(3), 1000);
});

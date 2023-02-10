'use strict';
const { test } = require('node:test');
const assert = require('node:assert');

const { findMaxSpot } = require('./main');

test('horizontal matching', async (t) => {
    await t.test('Easy', () => {
        const testField = [
            '    ',
            '    ',
            'XXX ',
            '    ',
        ];
        const actualResult = 3;

        const testResult = findMaxSpot(testField, 'Should find all 3 spots in 2d row');
        assert.strictEqual(testResult, actualResult);
    });

    await t.test('Medium', () => {
        const testField = [
            'XXX ',
            '    ',
            'XXXX',
            '    ',
        ];
        const actualResult = 4;

        const testResult = findMaxSpot(testField, 'Should find 2d row as longest spot');

        assert.strictEqual(testResult, actualResult);
    });

    await t.test('Hard', () => {
        const testField = [
            'XXX   ',
            '      ',
            'XXXX  ',
            '      ',
            ' XXXXX',
            '      ',
        ];
        const actualResult = 5;

        const testResult = findMaxSpot(testField, 'Should find 4d row as longest spot');

        assert.strictEqual(testResult, actualResult);
    });

});

test('vertical matching', async (t) => {
    await t.test('Easy', () => {
        const testField = [
            'X   ',
            'X   ',
            'X   ',
            '    ',
        ];
        const actualResult = 3;

        const testResult = findMaxSpot(testField, 'Should find all 3 spots in 0th column');

        assert.strictEqual(testResult, actualResult);
    })

    await t.test('Medium', () => {
        const testField = [
            'X   ',
            'X  X',
            'X  X',
            '    ',
        ];
        const actualResult = 3;

        const testResult = findMaxSpot(testField, 'Should find 0st column as longest spot');

        assert.strictEqual(testResult, actualResult);
    });

    await t.test('Medium', () => {
        const testField = [
            'X     ',
            'X  X X',
            'X  X X',
            '     X',
            '     X',
            '     X',
        ];
        const actualResult = 5;

        const testResult = findMaxSpot(testField, 'Should find 5st column as longest spot');

        assert.strictEqual(testResult, actualResult);
    });
});

test('combined matching', async (t) => {
    await t.test('Easy', () => {

        const testField = [
            '    ',
            ' XX ',
            ' XX ',
            '    ',
        ];
        const actualResult = 4;

        const testResult = findMaxSpot(testField, 'Should find cube of 4 spots');

        assert.strictEqual(testResult, actualResult);
    });

    await t.test('Medium', () => {

        const testField = [
            'XXXXX  ',
            '      X',
            '  XX  X',
            '      X',
            '    X  ',
            ' XX    ',
            ' XX    ',
        ];
        const actualResult = 5;

        const testResult = findMaxSpot(testField, 'Should find 0th row of 5 spots');

        assert.strictEqual(testResult, actualResult);
    });

    await t.test('Hard', () => {

        const testField = [
            'XXXXX  ',
            'XXXXX  ',
            '       ',
            'XX     ',
            'X      ',
            'X      ',
            'XXXXXXX',
        ];
        const actualResult = 11;

        const testResult = findMaxSpot(testField, 'Should find long spot of 11 units');

        assert.strictEqual(testResult, actualResult);
    });

    await t.test('Ultra Hard', () => {

        const testField = [
            'XXXXXXX',
            'X     X',
            'X     X',
            'X     X',
            'X     X',
            'X     X',
            'XXXXXXX',
        ];
        const actualResult = 24;

        const testResult = findMaxSpot(testField, 'Should find circle spot of 24 units');

        assert.strictEqual(testResult, actualResult);
    });
});

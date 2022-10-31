'use strict';

class SomeClass {
    constructor(obj, fieldNames) {
        this.groupingField = fieldNames;
        this.obj = { ...obj };
    }
    [Symbol.toPrimitive] = () => this.groupingField.map((field) => `${this.obj[field]}`).join(', ');
};

const arr = [
    {
        timestamp: 160000,
        name: 'Maksym',
        updateUserId: 1
    },
    {
        timestamp: 160000,
        name: 'Dmytro',
        updateUserId: 2
    },
    {
        timestamp: 160000,
        name: 'Dmytro',
        updateUserId: 2
    }
];

const instances = arr.map((obj) => new SomeClass(obj, ['timestamp', 'updateUserId']));

console.log(instances.map((obj) => `${obj}`));

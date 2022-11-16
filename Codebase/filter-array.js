'use strict';

const array = [
    {
        name: 111
    }, {
        name: 112
    }, {
        name: 113
    }, {
        name: 114
    }, {
        name: 115
    }, {
        name: 116
    }, {
        name: 117
    }, {
        name: 118
    }, {
        name: 119
    }, {
        name: 120
    }
];

const disabled = [111,112,113,114,115];
console.log(array.length);

const LIMIT = 5;
let counter = 0;

const arrayToShow = array.filter(({ name }) =>
    !disabled.includes(name) && ++counter <= LIMIT);

console.table(arrayToShow);

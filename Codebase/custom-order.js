'use strict';

const goodAttributes = [
    {
        "id": 6,
        "name": "Steel",
        "status": true
    },
    {
        "id": 8,
        "name": "Rubber",
        "status": true
    },
    {
        "id": 2,
        "name": "Fantastic",
        "status": true
    },
    {
        "id": 4,
        "name": "Concrete",
        "status": true
    }
];

const requiredOrder = [2, 4, 8, 6];

const newAttributes = requiredOrder.map((id) => goodAttributes.find((attr) => attr.id === id));

console.log({ newAttributes });

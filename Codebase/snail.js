'use strict';

const snail = (matrix) => {
    const move = {
        left: [0, -1],
        right: [0, 1],
        up: [-1, 0],
        down: [1, 0]
    };
    const turnRight = {
        right: 'down',
        down: 'left',
        left: 'up',
        up: 'right'
    };
    const getValue = ([x, y]) => (matrix[x] || [])[y];
    const performStep = ([x1, y1], [x2, y2]) => [x1 + x2, y1 + y2];

    const N = matrix[0].length;
    let currentPoint = [0, 0];
    let nextPoint = [];
    let currentDirection = 'right';
    let currentStep = move[currentDirection];

    const values = [getValue(currentPoint)];

    let newValue;
    while (values.length < N * N) {
        nextPoint = performStep(currentPoint, currentStep);
        newValue = getValue(nextPoint);
        if (newValue && !values.includes(newValue)) {
            values.push(newValue);
            currentPoint = nextPoint;
        } else {
            currentDirection = turnRight[currentDirection];
            currentStep = move[currentDirection];
            currentPoint = performStep(currentPoint, currentStep);
            newValue = getValue(currentPoint);

            values.push(newValue);
        }
        console.log(currentPoint);
    }
    return values;
};

const array = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16]];

console.log(snail(array));

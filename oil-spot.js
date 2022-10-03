const field = [
    'XXXXX  ',
    '      X',
    '  XX  X',
    '      X',
    '    X  ',
    ' XX    ',
    ' XX    ',
];

const findMaxSpot = (field) => {
    const matrix = field.map((row) => row.split(''));
    console.table(matrix);
    class Point {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
        collideWith({ x: x2, y: y2 }) {
            const { x: x1, y: y1 } = this;
            return (x1 === x2 && y1 === y2 + 1)
                || (x1 === x2 && y1 === y2 - 1)
                || (x1 === x2 + 1 && y1 === y2)
                || (x1 === x2 - 1 && y1 === y2);
        }
        [Symbol.toPrimitive] = function () {
            return `(${this.x}, ${this.y})`;
        }
    }
    /**
     * @type {Array.<Array.<Point>>}
     */
    const oilSpots = [];
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix.length; j++) {
            if (matrix[i][j] === 'X') {
                const newSpot = new Point(i, j);
                const existingSpot = oilSpots.find((spot) => spot.some((point) => point.collideWith(newSpot)));
                if (existingSpot) existingSpot.push(newSpot);
                else oilSpots.push([newSpot]);
            }
        }
    }
    console.log(oilSpots.map(x => x.length));
    return oilSpots.map(x => x.length).sort((a, b) => b - a)[0];

};

const res = findMaxSpot(field);
console.log({ res });

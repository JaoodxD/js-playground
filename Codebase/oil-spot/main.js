const field = [
    'XXXXX  ',
    '      X',
    '  XX  X',
    '      X',
    '    X  ',
    ' XX    ',
    ' XX    ',
];

const field2 = [
    'XXXXX  ',
    'XXXXX  ',
    '       ',
    'XX     ',
    'X      ',
    'X      ',
    'XXXXXXX',
]

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
    }
    /**
     * @type {Array.<Array.<Point>>}
     */
    const oilSpots = [];
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix.length; j++) {
            //if oil spot was found
            if (matrix[i][j] === 'X') {
                //create instance of 2d point
                const newSpot = new Point(i, j);
                //check if found spot collides with any previously spotted
                const existingSpot = oilSpots.find((spot) => spot.some((point) =>
                    point.collideWith(newSpot)));
                //if we find collision we add newely created point to it
                //else we create new spot with this point
                if (existingSpot) existingSpot.push(newSpot);
                else oilSpots.push([newSpot]);
            }
        }
    }
    //as a result we have array of vectors
    //every vector contains coordinates of related oil spots 
    console.log(oilSpots.map((x) => x.length));
    return oilSpots.map((x) => x.length).sort((a, b) => b - a)[0];

};

const maxSpot = findMaxSpot(field2);
console.log({ maxSpot });

module.exports = { findMaxSpot };

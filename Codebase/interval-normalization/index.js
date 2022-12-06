'use strict';
let { intervals, gradientConfig } = require('./intervals.json');
const { watchFile } = require('node:fs');

const seconds = Object.values(intervals).flat();
const getBoundaries = (sec) => {
    const higherIndex = seconds.findIndex((x) => x >= sec);
    const lowerIndex = Math.min(0, higherIndex - 1);
    return [seconds[lowerIndex], seconds[higherIndex]];
};

const min = () => Math.min(...seconds);
const max = () => Math.max(...seconds);
const justify = (n) => n > max() ? max() : n < min() ? min() : n;

const distribution = seconds.reduce((acc, n, i, arr) =>
    acc.set(n, i / (arr.length - 1)),
    new Map());

const f = (x) => distribution.get(x);

const linearInterpolation = (f, x0, x1) => (x) =>
(
    f(x0) +
    (
        (f(x1) - f(x0))
        /
        (x1 - x0)
    )
    * (x - x0)
);

const createGradient = (colors) => (x) => {
    const color = [...colors].sort(([, x0], [, x1]) => x0 - x1);
    const getColor = (rgb, x) => {
        if (!/^[rgb]$/.test(rgb)) throw Error('Invalid color argument');
        const channel = ['r', 'g', 'b'].indexOf(rgb);
        const f = (x) => (color.find(([, x0]) => x === x0)?.[0] ?? color[0][0])[channel];

        const higherIndex = color.findIndex(([, x0]) => x0 >= x);
        const lowerIndex = Math.min(higherIndex - 1, 0);

        return linearInterpolation(f, color[lowerIndex][1], color[higherIndex][1])(x);

    };
    return [getColor('r', x), getColor('g', x), getColor('b', x)];
};

let x = 0.00;
setInterval(() => {
    if (x === 1) x = 0;
    x += 0.05;
    x = Math.min(x, 1);
    const gradient = createGradient(gradientConfig);
    const res = gradient(x).reduce((color, channel) => color + (~~channel).toString(16).padStart(2, '0'), "#");
    console.log('%cTEST', `color: ${res}`, { x, res });

}, 1000);

watchFile('./intervals.json', (eventType, filename) => {
    // console.log({ eventType, filename });
    delete require.cache[require.resolve('./intervals.json')];
    let json = require('./intervals.json');
    intervals = json.intervals;
    gradientConfig = json.gradientConfig;
})

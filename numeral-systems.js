const numberIn10 = 102;
let temp = numberIn10;
const toNumSystem = 26;

const getBaseLog = (base, y) => Math.log(y) / Math.log(base);

const size = Math.floor(getBaseLog(toNumSystem, numberIn10));

const arr = new Array(size + 1).fill(0).map((x, i) => toNumSystem ** i).reverse();

const res = arr.map(x => {
    const t = Math.floor(temp / x);
    temp -= t * x;
    return t;
});

console.table([arr, res]);

console.log({ numberIn10, temp });


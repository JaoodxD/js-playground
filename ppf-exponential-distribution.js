const n = 140;

const arr = new Array(n).fill(0).map((_, i) => i);

const f = (n, len, thrashold = 0.2) => {
    const l = len + 1;
    const BETA = 0.40;
    const p = (l - n - 1) / l;
    const result = (-BETA * Math.log(1 - p)).toFixed(2);
    return result > thrashold ? result : thrashold;
};

const f2 = (n, len, [min, avg, max]) => n < len / 4 ? min : n < (len / 4 * 3) ? avg : max;

const res = arr.map((n, _, arr) => f2(n, arr.length, [1, 2, 3]).toFixed(2));

// console.table([arr, res]);
console.log(res.map(x => x.replace('.', ',')).join('\n'));

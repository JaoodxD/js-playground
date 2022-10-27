const n = 40;

const arr = new Array(n).fill(0).map((_, i) => i);

const f = (n, len, thrashold = 0.2) => {
    const l = len + 1;
    const BETA = 0.40;
    const p = (l - n - 1) / l;
    const BB = 0.4868 + 0.873 * Math.log(len);
    const result = (-Math.log(1 - p) / BB);
    return result > thrashold ? result.toFixed(2) : thrashold.toFixed(2);
};

const f2 = (n, len, [min, avg, max]) => n < len / 4 ? min : n < (len / 4 * 3) ? avg : max;

const res = arr.map((n, _, arr) => f(n, arr.length));

// console.table([arr, res]);
console.log(res.map(x => x).join('\n'));

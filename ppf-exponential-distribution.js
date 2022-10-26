const n = 12;

const arr = new Array(n).fill(0).map((_, i) => i);

const f = (n, len) => {
    const l = len + 1;
    const BETA = 0.40;
    const p = (l - n - 1) / l;
    return (-BETA * Math.log(1 - p)).toFixed(2);
}

const res = arr.map((n, _, arr) => f(n, arr.length));

console.table([arr, res]);

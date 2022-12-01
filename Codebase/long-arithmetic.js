const sumStrings = (a, b, remainder = 0) => (
    a = a.split('').map((n) => +n).reverse(),
    b = b.split('').map((n) => +n).reverse(),
    a.length < b.length && ([a, b] = [b, a]),
    a.forEach((n, i) => (
        a[i] = (n + (b[i] ?? 0) + remainder) % 10,
        remainder = ~~((n + (b[i] ?? 0) + remainder) / 10)
    )),
    remainder && a.push(remainder),
    a.reverse(),
    a.join('').replace(/^0+/g,'')
);

console.log(sumStrings('8797', '45'));
console.log(sumStrings('888', '12345'));
console.log(sumStrings('888', '0012345'));

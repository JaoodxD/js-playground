
const blocks = [
    3, 2, 2, 5, 10
];

const maxLength = 10;

const printBlock = len => "#".repeat(len);
const build = arr => arr.map(printBlock);

let acc = 0;
const filtered = blocks.filter(x => {
    const eq = x + acc < maxLength;
    acc += eq ? x : 0;
    return eq;
});
console.log({ acc, filtered });
let elements = build(filtered);
if (filtered.length < blocks.length) elements += '…';

console.log(elements);

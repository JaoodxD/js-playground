const arr = [
    [1, 2, 3],
    4,
    5,
    [[6, [7]]]
];

const flat = (arr) => {
    const temp = [];
    const spread = (element) => {
        element.forEach(x => typeof x === 'number' ? temp.push(x) : spread(x));
    };
    spread(arr);
    return temp;
}

const flat2 = (arr) => {
    let temp = [];
    arr.forEach(x => Array.isArray(x) ? temp.push(...x) : temp.push(x));
    return temp.some(x => typeof x !== 'number') ? flat2(temp) : temp;
}

console.log(flat2(arr));

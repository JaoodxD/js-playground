const findWordsInBars = (str) => {
    const regex = /\|[^\|]+\|/g;
    const result = [];
    let match;
    while ((match = regex.exec(str)) !== null) {
        const { index, 0: { length } } = match;
        result.push([
            index,
            index + length - 1
        ]);
        
    }
    return result;
};

const testStr = '|a1| and |b1| and |a1|';

const res = findWordsInBars(testStr);

console.log({ res });

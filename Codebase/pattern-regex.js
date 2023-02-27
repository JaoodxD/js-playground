const findWordsInBars = (str) => {
    const regex = /\|[^\|]+\|/g;
    const result = [];
    let match;
    while ((match = regex.exec(str)) !== null) {
        result.push([
            match.index,
            match.index + match[0].length - 1
        ]);
        
    }
    return result;
};

const testStr = '|a1| and |b1| and |a1|';

const res = findWordsInBars(testStr);

console.log({ res });

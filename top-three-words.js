const topThreeWords = (text) => {
    console.log(text);
    text = text.toLowerCase();
    const words = text.match(/[a-z]+'?[a-z]?/g) || [];
    const dic = {};
    for (const word of words) {
        dic[word] = dic[word] + 1 || 1;
    }
    return Object.entries(dic)
        .sort(([, value1], [, value2]) => value2 - value1)
        .slice(0, 3)
        .map(([key,]) => key);
};

const res = topThreeWords("e e e e DDD ddd DdD: ddd ddd aa aA Aa, bb cc cC e e e");
console.log({ res });

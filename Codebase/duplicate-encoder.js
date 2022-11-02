const duplicateEncode = word => {
    word = word.toLowerCase();
    const dic = {};
    word.split('').forEach(ch => {
        ch in dic
            ? dic[ch] = ')'
            : dic[ch] = '(';
    });
    console.table(dic);

    return word.replace(/./g, x => dic[x]);

};
console.log(duplicateEncode("din"));
console.log(duplicateEncode("recede"));
console.log(duplicateEncode("Success"));


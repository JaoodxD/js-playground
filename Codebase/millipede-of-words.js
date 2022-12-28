'use strict';

// find first letter of the word
const getFirstLetter = (word = '') => word[0];
// find last letter of the word
const getLastLetter = (word = '') => word[word.length - 1];
// test whether last letter of first word equal to first letter of second word
const testWords = (word1, word2) => getLastLetter(word1) === getFirstLetter(word2);
// test whether array is valid chain of millipede words
const testArray = (array) => {
    for (let i = 0; i < (array.length - 1); i++) {
        const [word1, word2] = [array[i], array[i + 1]];
        if(!testWords(word1, word2)) return false;
    }
    return true;
};
// fastest way to generate all possible permutations of words
const permute = (permutation) => {
    var length = permutation.length,
        result = [permutation.slice()],
        c = new Array(length).fill(0),
        i = 1, k, p;

    while (i < length) {
        if (c[i] < i) {
            k = i % 2 && c[i];
            p = permutation[i];
            permutation[i] = permutation[k];
            permutation[k] = p;
            ++c[i];
            i = 1;
            result.push(permutation.slice());
        } else {
            c[i] = 0;
            ++i;
        }
    }
    return result;
};
// test if any of permutations are valid
const solution = (words) => permute(words).some(testArray);

// kata test case
const words = ["trade", "pole", "view", "grave", "ladder", "mushroom", "president"];
console.table(
    permute(words)
        .map((per) =>
            ({ arr: per, test: testArray(per) }))
        .filter(({ test }) => test)
);

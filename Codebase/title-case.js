'use strict';

const toTitleCase = (text) => text
    .replace(/\b\w/gm, x => x.toUpperCase())
    .replace(/\B\w/gm, x => x.toLowerCase());

const minorWordDicBuilder = (list) =>
    (word) => list
        ?.split(' ')
        .some((x) => x.toLowerCase() === word.toLowerCase()) ?? false;

const titleCase = (title, minorWords) => {
    const isMinorWord = minorWordDicBuilder(minorWords);
    const words = title.split(' ');
    const transformedWords = words.map((word, i) =>
        isMinorWord(word) && i ? word.toLowerCase() : toTitleCase(word));
    return transformedWords.join(' ');
};

console.log(titleCase('a clash of KINGS', 'a an the of'));
console.log(titleCase('THE WIND IN THE WILLOWS', 'The In'));
console.log(titleCase('the quick brown fox'));

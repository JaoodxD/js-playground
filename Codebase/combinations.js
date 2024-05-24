/* eslint-disable no-var */
function f(valuesArray, required) {

    var combi = [];
    var temp = [];
    var slent = Math.pow(2, valuesArray.length);

    for (var i = 0; i < slent; i++) {
        temp = [];
        for (var j = 0; j < valuesArray.length; j++) {
            if ((i & Math.pow(2, j))) {
                temp.push(valuesArray[j]);
            }
        }
        if (temp.length > 0) {
            combi.push({ sum: temp.reduce((a, b) => a + b, 0), temp });
        }
    }

    combi.sort((a, b) => a.length - b.length);
    console.table(combi);
    return combi.some(x => x.sum === required);
}

const res = f([1, 2, 3, 4], 7);
console.log(res);

'use strict';

let obj = Object.freeze({
    a: {
        b: 3
    }
});
console.log(obj.a.b);
obj.a.b = 4;
console.log(obj.a.b);

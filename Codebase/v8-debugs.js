//node --allow-natives-syntax v8-debugs.js

let a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
let b = [];
/* for (let i = 0; i < a.length; i++) {
    b.push(a[i]);
 }*/
b = Array.from(a);
%DebugPrint(b);

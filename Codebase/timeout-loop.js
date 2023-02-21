let a = 0;
const func = () => a++ > 2 ? 'victory': null; 

setTimeout(function fn() {
    const result = func();
    if (result) return console.log('fin!', result);
    console.log('fail', result);
    fn();
}, 0);

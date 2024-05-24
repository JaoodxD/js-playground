/* eslint-disable no-var */
const f1 = () => {
    const filename = 'upload.file1.img.2002.txt';
    const splitResult = filename.split(/\.(?!.*\.)/);
    const [name, type] = splitResult;
    return splitResult;
};

const f2 = () => {
    var file = 'upload.file1.img.2002.txt'.split('.');
    const extension = file.pop();
    const filename = file.join('.');
    return filename;
}

const test = (f) => {
    console.time('start');
    for(let i = 0; i < 1000000; i++){
        f();
    }
    console.timeEnd('start');
}

console.log(`Regex run:`);
test(f1);
console.log(`Usual split + join run:`);
test(f2);

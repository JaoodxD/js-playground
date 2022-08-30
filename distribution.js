const calcStatistics = arr => {
    const sum = arr.reduce((a, b) => a + b, 0);
    const percentaegs = arr.map(x => x / sum);
    return { sum, percentaegs };
};
const log = (...data) => console.log(data);

const arr = [500,600,350,500,450,600];

log(arr,calcStatistics(arr));

const shifted = arr.shift();

log(arr,calcStatistics(arr));

const stat = calcStatistics(arr);

const arr3 = arr.map((x,i)=> x+shifted*stat.percentaegs[i]);

log(arr3,calcStatistics(arr3));

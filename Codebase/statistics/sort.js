'use strict';

const chartcolor = [
    ["(Drop) Возврат", 'red'],
    ["Завершён", '#00CC00'],
    ["(Drop) Возврат (учтён)", '#d90d53'],

]
const obj = [
    {
        "date": '1:00',
        "(Drop) Возврат (учтён)": 444
    },
    {
        "date": '2:00',
        "Завершён": 48
    },
    {
        "date": '3:00',
        "(Drop) Возврат": 51,
    }

];
console.log({ obj });

obj.sort((a, b) => {
    const aKey = Object.keys(a).find((key) => chartcolor.some(([name,]) => name === key));
    const bKey = Object.keys(b).find((key) => chartcolor.some(([name,]) => name === key));
    return a[aKey] - b[bKey];
});
console.log({ obj });

'use strict';

const { orders, percent } = require('./data.json');

const getPercent = (id) => percent.find(({ statusId, count }) => statusId === id).count;

class StatUnit {
    constructor({ status, statusId, timestamp }) {
        this.status = status;
        this.statusId = statusId;
        this.timestamp = timestamp;
        this.count = 1;
    }
    [Symbol.toPrimitive] = function () {
        return `${this.statusId}, ${this.timestamp}`;
    }
}

const filtered = orders.map(({ status, timestamp, statusId }) => new StatUnit({ status, statusId, timestamp }));
const dic = {};
filtered.forEach((statUnit) => dic[statUnit] ? dic[statUnit].count++ : dic[statUnit] = statUnit);

console.table(dic);
console.log(Object.entries(dic).length);

const statuses = {};

statuses['Все'] = {

}

let i = 1;

const marker = {
    enabled: true,
    radius: 4,
    symbol: "circle"
};

for (const [, value] of Object.entries(dic)) {
    if (!(value.status.name in statuses)) {
        statuses[value.status.name] = {
            shadow: true,
            type: 'column',
            key: i++,
            name: value.status.name,
            color: value.status.color,
            count: 0,
            percent: getPercent(value.statusId),
            data: []
        }
    }
    statuses[value.status.name].data.push({
        y: value.count,
        x: value.timestamp,
        marker
    });
    statuses[value.status.name].count += value.count;

}

console.table(statuses);

console.dir(statuses['Отказ'], { depth: null });

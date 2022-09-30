'use strict';

const data = require('./data.json');
const data2 = require('./data2.json');
const data3 = require('./data3.json');


/**
 * 
 * @param {any[]} orders Orders info
 * @param {any[]} percent Statistic on percentage distribution
 * @param {'Days' | 'Hours'} roundTo To which unit round timestamps
 * @returns 
 */
const calcStatistics = ({ orders, percent }, roundTo = 'Days', timeZone = +3) => {
    //1000ms in 1s, 60s in 1m, 60m in 1h
    const msInHour = 1000 * 60 * 60;
    //24h in 1d
    const msInDay = msInHour * 24;
    const stripDays = (ms) => {
        ms += timeZone * msInHour;
        let newMs = Math.floor(ms / msInDay) * msInDay;
        return newMs;
    };
    const stripHours = (ms) => {
        let newMs = Math.floor(ms / msInHour) * msInHour;
        let hoursInThisDay = (newMs % msInDay) / msInHour + timeZone;
        if (hoursInThisDay === 0 || hoursInThisDay === 24) newMs += msInHour;
        return newMs;
    };

    const rounder = {
        'Days': stripDays,
        'Hours': stripHours,
        default: (value) => value
    };

    const processor = rounder[roundTo] ?? rounder['default'];
    orders.forEach((order) => order.timestamp = processor(order.timestamp));

    const getPercent = (id) => percent.find(({ statusId }) => statusId === id).count;

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

    // console.table(dic);
    // console.log(Object.entries(dic).length);

    const statuses = {};

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
        statuses[value.status.name].data.sort(({x:x1},{x:x2}) => x2 - x1);
        statuses[value.status.name].count += value.count;

    }

    // console.table(statuses);

    const values = Object.values(statuses);

    const all = {
        color: "#000000",
        name: 'Все',
        count: orders.length,
        percent: '100',
        yAxis: 1,
        key: 0,
        data: [],
        zIndex: 2
    };

    const timeStamps = {};
    filtered.forEach(({ timestamp }) => timeStamps[timestamp] ? timeStamps[timestamp].y++ : timeStamps[timestamp] = {
        y: 1,
        x: timestamp,
        marker
    });

    // console.table(timeStamps);
    all.data = Object.values(timeStamps).sort(({ x: x1 }, { x: x2 }) => x2 - x1);

    // console.dir(all, { depth: null });

    values.unshift(all);

    // console.table(values);
    return values;
};

const result = calcStatistics(data3, 'Days');

console.table(result);


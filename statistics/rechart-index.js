'use strict';

const moment = require('moment');

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
    /**
     * 
     * @param {Number} ms 
     * @param {'Days' | 'Hours'} type 
     */
    const formatDate = (ms, type) => {
        const date = moment(ms);
        date.locale('ru');
        if (type === 'Days') return date.format('D MMM');
        if (type === 'Hours') return date.format('h:mm');
        return date.format('ll');
    }
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

    const example = {
        'Новый': 0,
        'Отправлено': 230,
        'Принято': 22,
        line: 230 + 22, //total
        date: '21 apr',
        name: 'ts'
    };

    const uniqueTimestamps = new Set(
        Object.entries(dic)
            .map(([, value]) => value.timestamp)
            .sort((a, b) => a - b)
    );
    const tsList = [...uniqueTimestamps].map((ms) => ({      //.map((ts) => formatDate(ts, roundTo));
        line: 0,
        date: formatDate(ms, roundTo),
        name: ms
    }));
    console.table(tsList);
    Object.values(dic).forEach(({ status: { name }, timestamp, count }) => {
        const column = tsList.find(({ name: columnName }) => columnName === timestamp);
        column[name] = count;
        column['line'] += count;
    });
    // console.dir({tsList});
    return tsList;
};

const result = calcStatistics(data3, 'Days');

console.log({result});


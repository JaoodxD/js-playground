//@ts-check
'use strict';

const moment = require('moment');

class StatUnit {
    constructor(obj, fieldNames) {
        this.groupingField = fieldNames;
        this.obj = { ...obj };
        this.count = 1;
    }
    [Symbol.toPrimitive] = () =>
        this.groupingField.map((field) =>
            `${this.obj[field]}`).join(', ');
};

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
const stripDays = (ms, timeZone = +3) => {
    ms += timeZone * msInHour;
    let newMs = Math.floor(ms / msInDay) * msInDay;
    return newMs;
};
const stripHours = (ms, timeZone = +3) => {
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

/**
 * 
 * @param {'Days' | 'Hours'} roundTo 
 * @returns 
 */
const processor = (roundTo) => rounder[roundTo] ?? rounder['default'];


module.exports = {
    getRounder: processor,
    formatDate,
    StatUnit
};

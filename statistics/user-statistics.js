//@ts-check
'use strict';

const data = require('./dataUsers.json');
const { StatUnit, formatDate, getRounder } = require('./utils');

/**
 * @typedef {Object} StatOptions
 * @property {'Days' | 'Hours'} roundTo
 * @property {number} timeZone
 * @property {string[]} fields
 * 
 * @typedef {Object} ServerStatistics
 * @property {any[]} orders
 * @property {any[]} percent
 */


/**
 * 
 * @param {ServerStatistics} orders Orders info
 * @param {StatOptions} options
 */
const calcStatistics = (
    { orders },
    {
        roundTo,
        timeZone,
        fields
    } = {
            roundTo: 'Days',
            timeZone: +3,
            fields: ['timestamp', 'acceptedByUserId']
        }
) => {
    const processor = getRounder(roundTo);
    const ordersWithRoundedTimestamps = orders.map((order) =>
        ({ ...order, timestamp: processor(order.timestamp, timeZone) }));

    const statUnits = ordersWithRoundedTimestamps.map((order) => new StatUnit(order, fields));
    
    const dic = {};
    statUnits.forEach((statUnit) =>
        dic[statUnit] ? dic[statUnit].count++ : dic[statUnit] = statUnit);

    const uniqueTimestamps = new Set(
        Object.entries(dic)
            .map(([, value]) => value.obj.timestamp)
            .sort((a, b) => a - b)
    );

    const timestampsList = [...uniqueTimestamps].map((ms) => ({
        line: 0,
        date: formatDate(ms, roundTo),
        name: ms
    }));
    Object.values(dic).forEach(({ groupingField: [timestampFieldName, fieldName], obj, count }) => {
        const timestampValue = obj[timestampFieldName];
        const column = timestampsList.find(({ name }) => name === timestampValue);
        const fieldValue = obj[fieldName];
        if (column) {
            column[fieldValue] = count;
            column['line'] += count;
        }
    });
    console.table(timestampsList);

    return timestampsList;
};

const res = calcStatistics(data, {
    roundTo: 'Days',
    fields: ['timestamp', 'acceptedByUserId'],
    timeZone: +3
});

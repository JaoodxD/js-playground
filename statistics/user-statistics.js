//@ts-check
'use strict';

const data = require('./dataUsers.json');
const { StatUnit, formatDate, getRounder } = require('./utils');

/**
 * 
 * @param {{orders:any[], percent:any[]}} orders Orders info
 * @param {{roundTo: 'Days' | 'Hours', timeZone: number, fields: Array<string>}} options
 * @returns 
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
    orders.forEach((order) => order.timestamp = processor(order.timestamp, timeZone));

    const statUnits = orders.map((order) => new StatUnit(order, fields));
    const dic = {};
    statUnits.forEach((statUnit) =>
        dic[statUnit] ? dic[statUnit].count++ : dic[statUnit] = statUnit);

    const uniqueTimestamps = new Set(
        Object.entries(dic)
            .map(([, value]) => value.obj.timestamp)
            .sort((a, b) => a - b)
    );

    const tsList = [...uniqueTimestamps].map((ms) => ({
        line: 0,
        date: formatDate(ms, roundTo),
        name: ms
    }));
    Object.values(dic).forEach(({ groupingField: [timestampFieldName, fieldName], obj, count }) => {
        const timestampValue = obj[timestampFieldName];
        const column = tsList.find(({ name }) => name === timestampValue);
        const fieldValue = obj[fieldName];
        if (column) {
            column[fieldValue] = count;
            column['line'] += count;
        }
    });
    console.table(tsList);

    return tsList;
};

const res = calcStatistics(data, {
    roundTo: 'Days',
    fields: ['timestamp', 'acceptedByUserId'],
    timeZone: +3
});

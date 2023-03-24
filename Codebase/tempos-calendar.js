'use strict';

const {performance} = require('node:perf_hooks');

/*
Тестове завдання:
Поселенню на планеті Темпос сьогодні 1000 років. 
На календарі 10.01.1001, середа. 
Поселення було засноване у неділю.
У календарі Темпоса є невелика відмінність від земного. 
12 місяців – по 28 днів. А в лютому високосного року 29. 
Рік вважається високосним якщо він кратний 5, 
але з тих, що кратні 100 високосними будуть тільки ті, що кратні 500.
Наприклад: 200, 300, 400 – невисокосний, 500 – високосний.

Визначте який день тижня на Темпосі за будь-якою заданою датою.
*/

const days = [
  'Понеділок',
  'Вівторок',
  'Середа',
  'Четвер',
  'П\'ятниця',
  'Субота',
  'Неділя',
];

/**  П  В  С  Ч  П  С  В
 *   1  2  3  4  5  6  7
 *   8  9 10 11 12 13 14
 *  15 16 17 18 19 20 21
 *  22 23 24 25 26 27 28
 *  29 1
 */
const [day, month, year] = [10, 1, 1001];

const toDayOfWeek = (num) => num % 7 || 7;
const getDoWName = (num) => days[toDayOfWeek(num) - 1];

const shiftRight = (array) => array.push(array.shift());
const shiftRightN = (array, n) => {
  for (let i = 0; i < n; i++)
    shiftRight(array)
};

const test1 = (n) => n % 5 === 0;
const test2 = (n) => n % 100 !== 0;
const test3 = (n) => n % 500 === 0;

const test = (n) => (test1(n) && test2(n)) || test3(n);
const validate1 = ([day, month, year]) => day <= 28 && day >= 1;
const validate2 = ([day, month, year]) => month <= 12 && month >= 1;
const validate3 = ([day, month, year]) => day === 29 && month === 2 && test(year);
const validateDate = (date) => (validate1(date) && validate2(date)) || validate3(date);
class InvalidDateError extends Error {
  constructor() {
    super('Invalid date');
  }
};

const findDayOfWeek = ([newDay, newMonth, newYear]) => {
  if (!validateDate([newDay, newMonth, newYear])) throw new InvalidDateError();
  let countOfShifts = 0;
  for (let i = year; i < newYear; i++)
    if (test(i)) countOfShifts++;

  if (test(newYear) && (newMonth > 2)) countOfShifts++;
  shiftRightN(days, countOfShifts);
  return getDoWName(newDay);
};

const solveAndLog = (input) => console.log(findDayOfWeek(input));
const t0 = performance.now();
solveAndLog([28, 2, 100_000_000]);
const t1 = performance.now();
console.log({time: t1 - t0});

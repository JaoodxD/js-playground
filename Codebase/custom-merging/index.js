const { Config, Diff } = require('./config');


const obj1 = {
  countries: [1, 2, 3, 4, 5],

};

const obj2 = {
  countries: [3, 4, 6]
};

const cfg1 = new Config(obj1);
const cfg2 = new Config(obj2);

const diff = cfg1.diff(cfg2);

console.log(cfg1.toJSON(), cfg2.toJSON(), diff.toJSON());

const { Config, Diff } = require('./config');


const obj1 = {
  countries: [1, 2, 3, 4],
  order: {
    settings: {
      address: {
        show: true,
        swap: false
      }
    },
    show: true,
    time: 1437
  },
  cardOrder: {
    time: 20000,
    show: true,
    settings: {
      comment: {
        show: false
      },
      contact: {
        rows: [
          { name: 'country', show: true },
          { name: 'department', show: true },
        ],
        show: true
      }
    }
  }
};

const obj2 = {
  countries: [4, 5],
  order: {
    settings: {
      address: {
        show: false,
        swap: false
      }
    },
    show: true,
    time: 1438
  },
  cardOrder: {
    time: 18000,
    show: true,
    settings: {
      comment: {
        show: true
      },
      contact: {
        rows: [
          { name: 'asdasd', show: true },
          { name: 'department', show: true },
        ],
        show: true
      }
    }
  }
};

const cfg1 = new Config(obj1);
const cfg2 = new Config(obj2);

const diff = cfg1.diff(cfg2);

console.dir(diff.toJSON(), { depth: null });

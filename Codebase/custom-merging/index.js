const { Config } = require('./config');


const obj1 = {
  countries: [1, 2, 3, 4],
  order: {
    settings: {
      address: {
        swap: false
      }
    },
    time: 1437
  },
  cardOrder: {
    time: 20000,
    settings: {
      comment: {
      },
      contact: {
        rows: ['country', 'department']
      }
    }
  }
};

const obj2 = {
  countries: [4, 5],
  order: {
    settings: {
      address: {
        swap: false
      }
    },
    time: 1438
  },
  cardOrder: {
    time: 18000,
    settings: {
      comment: {
      },
      contact: {
        rows: ['asdasd', 'department']
      }
    }
  }
};

const cfg1 = new Config(obj1);
const cfg2 = new Config(obj2);

const fullCfg = cfg1.glue(cfg2);
const diff = fullCfg.diff(cfg2);
console.dir(fullCfg.toJSON(), { depth: null });
console.dir(diff, { depth: null });

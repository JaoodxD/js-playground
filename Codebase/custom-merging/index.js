const { Config } = require('./config');

const obj1 = {
  countries: [1, 2, 3, 4],
  order: {
    settings: {
      address: {
        swap: true
      }
    },
    time: 1439
  },
  cardOrder: {
    time: 20000,
    settings: {
      comment: {
      },
      contact: {
        rows: ['country', 'department', 'DIMAS']
      },
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
    time: 1440
  },
  cardOrder: {
    time: 28000,
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

const diff = cfg1.diff(cfg2);

console.log('\n#GROUP CONFIG:');
console.dir(cfg1.toJSON(), { depth: null });

console.log('\n#USER CONFIG:');
console.dir(cfg2.toJSON(), { depth: null });

console.log('\n#DIFF CONFIG:');
console.dir(diff.toJSON(), { depth: null });

// diff.printCells();

const fullCfg = cfg1.glue(diff);

console.log('\n#NEW USER CONFIG:');
console.dir(fullCfg.toJSON(), { depth: null });
fullCfg.printCells();

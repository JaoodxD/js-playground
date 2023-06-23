const { Config, DimkinHelperSKrasnymiISinimiTochkami } = require('./config');

const group = {
  countries: [1, 2, 3, 4, 5],
  order: {
    rows: ['id', 'status'],
    show: true
  },
  cardOrder: {
    settings: {
      comment: {
        show: true
      },
      contact: {
        show: true,
        rows: ['department']
      }
    },
    show: true
  }
};

const user = {
  countries: [1, 2, 3, 4],
  order: {
    rows: ['id', 'status'],
    show: true
  },
  cardOrder: {
    settings: {
      comment: {
        show: false
      },
      contact: {
        show: true,
        rows: ['department']
      }
    },
    show: true
  }
};

const countries = [1, 2, 3, 4, 5, 6, 7];
const results = countries.map((id) => DimkinHelperSKrasnymiISinimiTochkami(group, user, `countries/${id}`));
console.table([countries, results]);
const anyBlue = results.includes('blue');
const anyRed = results.includes('red');
if (anyBlue && anyRed) return console.log('BLUE & RED');
if (anyBlue) return console.log('BLUE');
if (anyRed) return console.log('RED');
if (!(anyBlue && anyRed)) return console.log('GREY');
// const result = DimkinHelperSKrasnymiISinimiTochkami(group, user, 'cardOrder/settings/contact/rows/department');
// console.log(result);
/* const group = new Config({
  order: {
    name:'Dima'
  }
});
console.log('\nGROUP: ',group.toJSON());


const user = new Config({
  order: {
    name:'Dima'
  }
});
console.log('\nUSER: ',user.toJSON());

const diff = group.diff(user);
console.log('\nDIFF: ',diff.toJSON());

const newUser = group.glue(diff);

console.log('\nNEW USER: ', newUser.toJSON());

newUser.printCells(); */


/* const obj1 = {
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
const cfg2 = new Config(null);

const diff = cfg1.glue(cfg2);

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
fullCfg.printCells(); */

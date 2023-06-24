const diff = require('./diffObjects');
const merge = require('./mergeObjects');

class Config {
  #config;

  constructor(cfgObj) {
    this.#config = cfgObj;
  }

  glue(cfgObj) {
    const obj2 = cfgObj instanceof Config ? cfgObj.toJSON() : cfgObj;
    const newCfg = merge(this.#config, obj2);
    return new Config(newCfg);
  }

  diff(config) {
    const obj = config instanceof Config ? config.toJSON() : config;
    const newCfg = diff(this.#config, obj);
    return new Config(newCfg);
  }

  toJSON() {
    return this.#config ?? null;
  }
}

const DimkinHelperSKrasnymiISinimiTochkami = (obj1, obj2, path) => {
  const CELL_TYPE = {
    INHERIT: 'grey',
    ENABLED: 'blue',
    DISABLED: 'red',
    NONE: 'transparent'
  };
  const getValue = (obj, path) => path.split('/').reduce((acc, key) => {
    if (acc == null) return acc;
    if (Array.isArray(acc)) return acc.find((value) => value == key)
    return acc[key];
  }, obj);

  const value1 = getValue(obj1, path);
  const value2 = getValue(obj2, path);

  if (!value1 && value2) return CELL_TYPE.ENABLED;
  if (value1 && value2) return CELL_TYPE.INHERIT;
  if (value1 && !value2) return CELL_TYPE.DISABLED;
  return CELL_TYPE.NONE;
};

const isOrdinaryObject = (value) =>
  typeof value === 'object' &&
  !Array.isArray(value) &&
  value !== null;

const timestampObject = (obj, timestamp = Date.now()) => {
  if (!isOrdinaryObject(obj)) return obj;
  for (const key in obj) {
    if (isOrdinaryObject(obj[key])) {
      Object.assign(obj[key], { time: timestamp });
    }
  }
  return obj;
}

module.exports = {
  Config,
  DimkinHelperSKrasnymiISinimiTochkami,
  timestampObject
}

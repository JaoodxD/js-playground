const diff = require('./diffObjects');
const merge = require('./mergeObjects');
const getType = require('./valueType');

class Config {
  #config;

  #firstParent;
  #secondParent;

  #CELL_TYPE = {
    INHERIT: 'grey',
    ENABLED: 'blue',
    DISABLED: 'red',
    NONE: 'transparent'
  }
  #cellTypes;
  #firstParentCells;
  #secondParentCells;

  constructor(cfgObj) {
    this.#config = cfgObj;
    this.#cellTypes = this.calculateCellTypes(this.#config);
  }

  glue(cfgObj) {
    const obj2 = cfgObj instanceof Config ? cfgObj.toJSON() : cfgObj;
    const newCfg = merge(this.#config, obj2);
    return new Config(newCfg);
  }

  diff(config) {
    const obj = config instanceof Config ? config.toJSON() : config;
    const newCfg = diff(this.#config, obj);
    return new Config(newCfg).setParents(this, config);
  }

  setParents(first, second) {
    this.#firstParent = first;
    this.#secondParent = second;
    this.#cellTypes = this.calculateCellTypes(this.#config);
    this.#firstParentCells = this.calculateCellTypes(first.toJSON());
    this.#secondParentCells = this.calculateCellTypes(second.toJSON());
    return this;
  }

  cellType(path) {
    if (!this.#firstParent || !this.#secondParent) throw new Error('No parents');
    const firstParentCell = this.#firstParentCells.get(path);
    const secondParentCell = this.#secondParentCells.get(path);
    if (!firstParentCell && secondParentCell) return this.#CELL_TYPE.ENABLED;
    if (firstParentCell && secondParentCell) return this.#CELL_TYPE.INHERIT;
    if (firstParentCell && !secondParentCell) return this.#CELL_TYPE.DISABLED;
    return this.#CELL_TYPE.NONE;
  }

  printCells() {
    if (this.#firstParent && this.#secondParent) {
      const keys = new Set(
        [...this.#firstParentCells.keys()]
          .concat([...this.#secondParentCells.keys()]));
      for (const key of keys) {
        console.log(key, this.cellType(key));
      }
    }
    else {
      for (const [key] of this.#cellTypes) {
        console.log(key, this.cellType(key));
      }
    }
  }

  calculateCellTypes(object) {
    const cellTypes = new Map();
    for (const key in object) {
      if (getType(object[key]) === 'primitive') {
        cellTypes.set(key, 'primitive');
      }
      else {
        const map = this.calculateCellTypes(object[key]);
        for (const [nestedKey, value] of map) {
          if (nestedKey === 'time') continue;
          if (Array.isArray(object[key])) {
            cellTypes.set(`${key}/${object[key][nestedKey]}`, value);
          }
          else cellTypes.set(`${key}/${nestedKey}`, value);
        }
      }
    }
    return cellTypes;
  }

  toJSON() {
    return this.#config;
  }
}

module.exports = {
  Config
}

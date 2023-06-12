const merge = require("./customMergeObjects.js");


class Config {
  #config;
  constructor(cfgObj) {
    this.#config = cfgObj;
  }

  diff(cfgObj) {
    const obj2 = cfgObj instanceof Config ? cfgObj.toJSON() : cfgObj;
    const newCfg = merge(this.#config, obj2);
    return new Diff(newCfg);
  }

  glue(diff) {
    return new Config;
  }

  toJSON() {
    return this.#config;
  }
}

class Diff {
  #configDiff;
  constructor(cfgDiff) {
    if (cfgDiff instanceof Config) this.#configDiff = cfgDiff.toJSON();
    else this.#configDiff = cfgDiff;
  }

  glue(config) {
    return config.glue(this.#configDiff);
  }

  toJSON() {
    return this.#configDiff;
  }
}

module.exports = {
  Config, Diff
}

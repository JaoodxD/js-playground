const merge = require("./customMergeObjects.js");


class Config {
  #config;
  constructor(cfgObj) {
    this.#config = cfgObj;
  }

  diff(cfgObj) {
    const newCfg = merge(this.#config, cfgObj);
    return new Diff(newCfg);
  }

  glue(diff) {
    return new Config;
  }

  toPlainObject() {
    return this.#config;
  }
}

class Diff {
  #configDiff;
  constructor(cfgDiff) {
    this.#configDiff = cfgDiff;
  }

  glue(config) {
    return config.glue(this.#configDiff);
  }
}

module.exports = {
  Config, Diff
}

'use strict';

const fsp = require('node:fs/promises');
const path = require('node:path');
const vm = require('node:vm');

const OPTIONS = {
  timeout: 5000,
  displayErrors: false
};

const load = async (filePath, sandbox) => {
  const src = await fsp.readFile(filePath, 'utf8');
  const code = `'use strict';\n${src}`;
  const script = new vm.Script(code);
  const context = vm.createContext(Object.freeze({ ...sandbox }));
  const exported = script.runInContext(context, OPTIONS);
  return typeof exported === 'object' ? exported : { method: exported };
};

const loadDir = async (folderPath, sandbox) => {
  const files = await fsp.readdir(folderPath, { withFileTypes: true });
  const container = {};
  for (const file of files) {
    const { name } = file;
    if (file.isFile() && !name.endsWith('.js')) continue;
    const location = path.join(folderPath, name);
    const key = path.basename(name, '.js');
    const loader = file.isFile() ? load : loadDir;
    container[key] = await loader(location, sandbox);
  }
  return container;
};

module.exports = { load, loadDir };

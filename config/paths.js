'use strict';

const { resolve } = require('path');

const cwd = process.cwd();
const src = resolve(cwd, 'src');
const publish = resolve(cwd, 'demo');
const getIndex = isProd =>
  isProd ? resolve(src, 'index.js') : resolve(src, 'index.js');
const dist = resolve(cwd, 'dist');
const lib = resolve(cwd, 'lib');
const pages = resolve(src, 'pages');
const babelrc = resolve(cwd, '.babelrc');
const html = resolve(publish, 'index.html');
const dump = resolve(cwd, '.webpack.dump.js');
const packageJSON = resolve(cwd, 'package.json');
const publicDir = resolve(cwd, 'public');

module.exports = {
  src,
  getIndex,
  dist,
  lib,
  pages,
  babelrc,
  html,
  dump,
  publicDir,
  packageJSON,
};

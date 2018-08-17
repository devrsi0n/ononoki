'use strict';

const fs = require('fs');
const path = require('path');

const { getIndex, pages } = require('./paths');

const { lstatSync, readdirSync, existsSync } = fs;
const { join } = path;

const isDir = $path => existsSync($path) && lstatSync($path).isDirectory();

const getPageSubDirs = () => {
  if (isDir(pages)) {
    return readdirSync(pages)
      .map(name => [name, join(pages, name)])
      .filter(item => isDir(item[1]));
  }
  return [];
};

function getValidEntry(isProd) {
  const index = getIndex(isProd);
  if (existsSync(index)) {
    return { index };
  }
  return getPageSubDirs(isProd)
    .map(item => ({ [item[0]]: item[1] }))
    .reduce((pre, curr) => ({ ...pre, ...curr }), {});
}

const validObject = obj =>
  !!obj && typeof obj === 'object' && Object.keys(obj).length > 0;

const getEntry = isProd => {
  const entry = getValidEntry(isProd);
  const str = JSON.stringify(entry);

  if (isProd) {
    if (!validObject(entry)) {
      throw new Error(
        `Expect src/index.js or src/pages/<subDir> as entry, get: ${str}`
      );
    }
    return entry;
  }

  if (!validObject(entry)) {
    throw new Error(
      `Expect src/index.js or src/pages/<subDir> as entry, get: ${str}`
    );
  }
  return {
    ...entry,
    client: `${require.resolve(
      'webpack-dev-server/client'
    )}?http://0.0.0.0:3030`,
    hotServer: require.resolve('webpack/hot/only-dev-server'),
  };
};

const outputNames = {
  filename: 'pages/[name]/index.js',
  chunkFilename: '[name]/chunk.js',
};

// CSS names for MiniCssExtractPlugin in prod mode
const cssNames = {
  filename: 'pages/[name]/index.css',
  chunkFilename: '[name]/chunk.css',
};

module.exports = {
  getEntry,
  outputNames,
  cssNames,
  getPageSubDirs,
};

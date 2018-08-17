'use strict';

const webpack = require('webpack');
const config = require('../config/webpack.config.prod');

const compiler = webpack(config);
compiler.run((err, stats) => {
  if (err) {
    const cache = [];
    console.error(
      `compileAssets error: ${JSON.stringify(
        (err && err.details) || err,
        (key, value) => {
          if (typeof value === 'object' && value !== null) {
            if (cache.includes(value)) {
              return undefined;
            }
            cache.push(value);
          }
          return value;
        },
        2
      )}`
    );
    return;
  }
  console.log(stats.toString({ colors: true }));
});

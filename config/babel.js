'use strict';

const fs = require('fs');

const { babelrc } = require('./paths');

/**
 * Get babel options, fallback with default options
 * @param {boolean} isProd is production environment
 * @returns {object}
 */
module.exports = function getBabelOptions(isProd) {
  const base = {
    compact: isProd,
    cacheDirectory: true,
    highlightCode: true,
  };

  if (fs.existsSync(babelrc)) {
    return {
      ...base,
      babelrc: true,
    };
  }

  return {
    ...base,
    babelrc: false,
    presets: [
      [
        require.resolve('babel-preset-env'),
        {
          modules: false, // Support tree shaking
          targets: {
            browsers: ['chrome >= 50'],
          },
        },
      ],
      [require.resolve('babel-preset-react')],
      [require.resolve('babel-preset-stage-2')],
    ].filter(Boolean),
    plugins: [
      // require.resolve('babel-plugin-transform-decorators-legacy'),
      // require.resolve('babel-plugin-transform-class-properties'),
      require.resolve('react-hot-loader/babel'),
    ].filter(Boolean),
  };
};

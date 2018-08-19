'use strict';

const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/**
 * Get style loaders
 * @param {boolean} isProd
 * @param {object} cssOptions
 * @param {string} preProcessor
 */
const getStyleLoaders = (isProd, cssOptions, preProcessor) => {
  const loaders = [
    isProd ? MiniCssExtractPlugin.loader : require.resolve('style-loader'),
    {
      loader: require.resolve('css-loader'),
      options: { sourceMap: !isProd, ...cssOptions },
    },
    {
      // Options for PostCSS as we reference these options twice
      // Adds vendor prefixing based on your specified browser support in
      // package.json
      loader: require.resolve('postcss-loader'),
      options: {
        // Necessary for external CSS imports to work
        ident: 'postcss',
        plugins: () => [
          /* eslint-disable global-require */
          require('postcss-flexbugs-fixes'),
          autoprefixer({
            flexbox: 'no-2009',
          }),
        ],
        sourceMap: !isProd,
      },
    },
  ];
  if (preProcessor) {
    loaders.push({
      loader: require.resolve(preProcessor),
      options: {
        sourceMap: !isProd,
      },
    });
  }
  return loaders;
};

const getFileLoaderOptions = {
  name: 'static/media/[name].[ext]',
};

const getFileLoader = () => ({
  loader: require.resolve('file-loader'),
  exclude: [/\.jsx?$/, /\.html$/, /\.json$/],
  options: {
    ...getFileLoaderOptions,
  },
});

const getImageLoader = () => ({
  test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/, /\.woff2/],
  loader: require.resolve('url-loader'),
  options: {
    limit: 20000,
    ...getFileLoaderOptions,
  },
});

const rawLoader = {
  test: /gif.worker.js$/,
  use: 'raw-loader',
};

module.exports = {
  getStyleLoaders,
  getImageLoader,
  getFileLoader,
  rawLoader,
};

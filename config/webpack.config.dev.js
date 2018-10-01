'use strict';

const { dist, cwd } = require('./paths');
const getBabelOptions = require('./babel');
const { getEntry, outputNames } = require('./utils');
const {
  getImageLoader,
  getStyleLoaders,
  getFileLoader,
  rawLoader,
} = require('./loaders');
const { getPlugins } = require('./plugins');

module.exports = {
  entry: getEntry(false),
  mode: 'development',
  devtool: 'eval-source-map',
  output: {
    pathinfo: true,
    ...outputNames,
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx'],
  },
  module: {
    rules: [
      {
        oneOf: [
          getImageLoader(false),
          {
            test: /\.jsx?$/,
            exclude: [/[/\\\\]node_modules[/\\\\]/],
            use: [
              // This loader parallelizes code compilation, it is optional but
              // improves compile time on larger projects
              {
                loader: require.resolve('thread-loader'),
                options: {
                  // keep workers alive for more effective watch mode
                  poolTimeout: Infinity,
                },
              },
              {
                loader: require.resolve('babel-loader'),
                options: getBabelOptions(false),
              },
            ],
          },
          {
            test: /\.css$/,
            use: getStyleLoaders(false, { importLoaders: 1 }),
          },
          {
            test: /\.(scss|sass)$/,
            use: getStyleLoaders(false, { importLoaders: 2 }, 'sass-loader'),
          },
          rawLoader,
          getFileLoader(false),
        ],
      },
    ],
  },
  plugins: getPlugins(false),
  devServer: {
    contentBase: [dist, cwd],
    host: '0.0.0.0',
    port: 3030,
    compress: true,
    // clientLogLevel: 'none',
    hot: true,
    // hotOnly: true,
    open: true,
    stats: { colors: true },
    headers: { 'Access-Control-Allow-Origin': '*' },
    overlay: true,
  },
};

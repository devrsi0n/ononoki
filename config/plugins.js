'use strict';

const { join } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');

const { getPageSubDirs, cssNames } = require('./utils');
const { dist, publicDir } = require('./paths');

// HtmlWebpackPlugin configs for multiply entries in dev mode
const getHTMLPlugins = () => {
  const dirs = getPageSubDirs(false);
  if (dirs.length > 0) {
    return dirs.map(
      ([name, dir]) =>
        new HtmlWebpackPlugin({
          template: join(dir, 'index.html'),
          filename: `pages/${name}/index.html`,
          inject: true,
          chunks: [name, 'vendors'],
        })
    );
  }
  throw new Error('Expect src/pages/ as webpack entry');
};

function getPlugins(isProd) {
  const plugins = [...getHTMLPlugins()];

  if (!isProd) {
    plugins.push(
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('development'),
        },
      }),
      new webpack.HotModuleReplacementPlugin()
    );
  } else {
    plugins.push(
      new MinifyPlugin(),
      new CopyWebpackPlugin([{ from: publicDir, to: dist }]),
      new MiniCssExtractPlugin(cssNames),
      new CleanWebpackPlugin(dist, { root: process.cwd() }),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
      })
    );
  }

  return plugins;
}

module.exports = {
  getPlugins,
};

'use strict';

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const opn = require('opn');

const config = require('../config/webpack.config.dev');

process.env.NODE_ENV = 'development';

const devServerOptions = config.devServer;

delete config.devServer;

const { port, host } = devServerOptions;
const url = `http://localhost:${port}/pages/content`;

WebpackDevServer.addDevServerEntrypoints(config, devServerOptions);

let isFirst = true;
const compiler = webpack(config);
compiler.plugin('done', stats => {
  if (stats.hasErrors()) {
    console.log(stats.toString({ colors: true }));
    return;
  }
  if (isFirst) {
    opn(url);
    isFirst = false;
    console.log(`Dev server listen on ${url}`);
  }
});

const devServer = new WebpackDevServer(compiler, devServerOptions);
devServer.listen(port, host, err => {
  if (err) {
    console.error(`dev server listen error: ${err}`);
    return;
  }
  console.log('Starting dev server');
});

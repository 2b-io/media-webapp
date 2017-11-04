const express = require('express');
const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app  = module.exports = express();
const port = 3000;

const webpackConfig = require('../webpack/webpack.dev.babel.js');

const compiler = webpack(webpackConfig);
const devMiddleware = webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath
});

app.use(devMiddleware);

app.use('*', (req, res, next) => {
  const filename = path.join(compiler.outputPath, '../index.html');

  compiler.outputFileSystem.readFile(filename, (err, result) => {
    if (err) {
      return next(err);
    }

    res
      .set('content-type','text/html')
      .send(result)
      .end();
  });
});

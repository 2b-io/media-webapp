const webpack = require('webpack')
const BabelMinifyWebpackPlugin = require('babel-minify-webpack-plugin')

module.exports = require('./webpack.common')({
  plugins: [
    new BabelMinifyWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      PRODUCTION: JSON.stringify(true)
    })
  ]
})

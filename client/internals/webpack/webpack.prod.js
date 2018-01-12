const webpack = require('webpack')
const BabelMinifyWebpackPlugin = require('babel-minify-webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = require('./webpack.common')({
  devtool: 'cheap-module-source-map',
  plugins: [
    // new BundleAnalyzerPlugin({
    //   analyzerHost: '0.0.0.0'
    // }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new BabelMinifyWebpackPlugin({
      removeConsole: true,
      removeDebugger: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      },
      PRODUCTION: JSON.stringify(true)
    })
  ]
})

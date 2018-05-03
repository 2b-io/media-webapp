import webpack from 'webpack'
import BabelMinifyWebpackPlugin from 'babel-minify-webpack-plugin'
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

import common from './webpack.common'

export default common({
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

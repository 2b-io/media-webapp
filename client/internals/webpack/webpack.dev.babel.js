import path from 'path'
import webpack from 'webpack'
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

import common from './webpack.common'

const rootDir = path.resolve(__dirname, '../..')

export default common({
  mode: 'development',
  entry: {
    app: [
      path.join(rootDir, 'src/app/index.js'),
      'webpack-hot-middleware/client?reload=true'
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      PRODUCTION: JSON.stringify(false),
      VERSION: JSON.stringify(require('../../package.json').version)
    }),
    new webpack.HotModuleReplacementPlugin(),
    // new BundleAnalyzerPlugin({
    //   analyzerHost: '0.0.0.0'
    // })
  ]
})

const path = require('path')
const webpack = require('webpack')

const rootDir = path.resolve(__dirname, '../..')

module.exports = require('./webpack.common')({
  entry: {
    app: [
      path.join(rootDir, 'app/index.js'),
      'webpack-hot-middleware/client?reload=true'
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      PRODUCTION: JSON.stringify(false)
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
})

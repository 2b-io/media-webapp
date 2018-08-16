import path from 'path'
import webpack from 'webpack'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import CleanWebpackPlugin from 'clean-webpack-plugin'

import common from './webpack.common'

const rootDir = path.resolve(__dirname, '../..')

export default common({
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin([
      path.join(rootDir, './build')
    ], {
      verbose: true,
      watch: false,
      allowExternal: true
    }),
    new BundleAnalyzerPlugin({
      analyzerHost: '0.0.0.0'
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      },
      PRODUCTION: JSON.stringify(true)
    })
  ]
})

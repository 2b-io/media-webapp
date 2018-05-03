import webpack from 'webpack'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

import common from './webpack.common'

export default common({
  mode: 'production',
  plugins: [
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

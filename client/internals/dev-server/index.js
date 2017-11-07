import express from 'express'
import path from 'path'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'

import webpackConfig from '../webpack/webpack.dev.js'

const app = express()
const port = 3001

const compiler = webpack(webpackConfig)
const devMiddleware = webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath
})

app.use(devMiddleware)

app.use('*', (req, res, next) => {
  const filename = path.join(compiler.outputPath, '../index.html')

  compiler.outputFileSystem.readFile(filename, (err, result) => {
    if (err) {
      return next(err)
    }

    res
      .set('content-type','text/html')
      .send(result)
      .end()
  })
})

app.listen(port, () => console.log(`dev-server started at ${port}`))

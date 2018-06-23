import express from 'express'
import path from 'path'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

import webpackConfig from '../webpack/webpack.dev.babel'

const app = express()
const port = 3001
let started = false

const compiler = webpack(webpackConfig)

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    watchOptions: {
      ignored: /node_modules/,
      poll: true
    },
    logLevel: 'warn'
  })
)
app.use(
  webpackHotMiddleware(compiler)
)

app.use('*', (req, res, next) => {
  const filename = path.join(compiler.outputPath, '../index.html')

  compiler.outputFileSystem.readFile(filename, (err, result) => {
    if (err) {
      return next(err)
    }

    res
      .set('content-type', 'text/html')
      .send(result)
      .end()
  })
})

compiler.hooks.emit.tap('done', () => {
  if (started) {
    return
  }

  app.listen(port, () => {
    started = true

    console.log(`dev-server started at ${port}`)
  })
})



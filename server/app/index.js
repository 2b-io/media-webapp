import express from 'express'
import morgan from 'morgan'
import proxy from 'http-proxy-middleware'

import config from 'infrastructure/config'
import { loadSystemModules } from 'modules/loader'

const app = express()
const port = config.systemPort

app.use(morgan('dev'))

loadSystemModules(app, [
  {
    mountPath: '/api',
    moduleName: 'api'
  }
])

if (config.webpackDevServer) {
  app.use(proxy(config.webpackDevServer, { ws: true }))
}

app.listen(port, () => console.log(`server started at ${port}`))

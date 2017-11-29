import express from 'express'
import proxy from 'http-proxy-middleware'

import { loadSystemModules } from 'services/module-loader'
import { config } from 'services/config-loader'

const app = express()
const port = config.systemPort

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

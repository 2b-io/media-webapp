import express from 'express'
import proxy from 'http-proxy-middleware'

import config from 'infrastructure/config'
import { parseJWT } from 'middlewares/jwt'
import { loadSystemModules } from 'modules/loader'

const app = express()
const port = config.systemPort

app.use(parseJWT)

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

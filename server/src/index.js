import express from 'express'
import morgan from 'morgan'
import proxy from 'http-proxy-middleware'

import config from 'infrastructure/config'
import { loadSystemModules } from 'modules/loader'

const app = express()
const port = config.systemPort

app.use(morgan('dev'))
app.get('/favicon.ico', (req, res) => res.sendStatus(404))
app.get('/robots.txt', (req, res) => res.sendStatus(404))

loadSystemModules(app, [ {
  mountPath: '/graphql',
  moduleName: 'graphql'
} ])

if (config.webpackDevServer) {
  app.use(proxy(config.webpackDevServer, { ws: true }))
}

app.listen(port, () => console.log(`server started at ${port}`))

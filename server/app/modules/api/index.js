import bodyParser from 'body-parser'
import express from 'express'
import serializeError from 'serialize-error'
import initAllRoutes from './routes'

const app = express()

// common middlewares
app.use(bodyParser.json())

initAllRoutes(app)

app.use((error, req, res, next) => {
  res.status(500).json(serializeError(error))
})

export default app

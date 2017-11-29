import bodyParser from 'body-parser'
import express from 'express'
import initAllRoutes from './routes'

const app = express()

// common middlewares
app.use(bodyParser.json())

initAllRoutes(app)

export default app

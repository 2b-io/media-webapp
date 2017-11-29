import express from 'express'
import initAllRoutes from './routes'

const app = express()

initAllRoutes(app)

export default app

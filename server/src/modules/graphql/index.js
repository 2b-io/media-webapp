import express from 'express'
import graphqlMiddleware from 'express-graphql'

import schema from './schema'

const app = express()

app.use('/', graphqlMiddleware({
  schema,
  graphiql: true
}))

export default app

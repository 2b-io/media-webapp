import express from 'express'
import graphqlMiddleware from 'express-graphql'

import rootSchema from './schemas'

const app = express()

app.use('/', graphqlMiddleware({
  schema: rootSchema,
  graphiql: true
}))

export default app

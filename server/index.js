import express from 'express'

const app = express()
const port = 3000

if (process.env.NODE_ENV === 'development') {
  let proxy = require('express-http-proxy')

  app.use(proxy('http://0.0.0.0:3001'))
}

app.listen(port, () => console.log(`server started at ${port}`))

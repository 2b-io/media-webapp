const express = require('express')

const app = express()
const port = 3000

if (process.env.NODE_ENV === 'development') {
  let devServer = require('../internals/dev-server')

  app.use(devServer)
}

app.listen(port, () => console.log(`Server started at ${port}`))

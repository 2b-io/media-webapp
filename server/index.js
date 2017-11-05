import express from 'express'
import proxy from 'express-http-proxy'

const app = express()
const port = 3000

if (process.env.NODE_ENV === 'development') {
  app.use(proxy('http://0.0.0.0:3001'))
}

app.listen(port, () => console.log(`server started at ${port}`))

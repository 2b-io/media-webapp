import express from 'express'
import proxy from 'http-proxy-middleware'

const app = express()
const port = 3000

if (process.env.NODE_ENV === 'development') {
  app.use(proxy('http://0.0.0.0:3001', { ws:true }))
}

app.listen(port, () => console.log(`server started at ${port}`))

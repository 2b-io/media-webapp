import express from 'express'

const app = express()

app.get('/', (req, res) => res.send('Web Endpoint'))

export default app

import express from 'express'

const app = express()

app.get('/', (req, res) => res.send('Auth Endpoint'))

export default app

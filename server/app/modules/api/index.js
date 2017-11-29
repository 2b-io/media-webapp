import express from 'express'

const app = express()

app.get('/', (req, res) => res.send('API Endpoint'))

export default app

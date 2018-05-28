import React from 'react'

import BrowserRouter from './browser-router'
import History from './history'

import routes, { otherwise } from './routes'

export default () => (
  <History>
    <BrowserRouter routes={routes} otherwise={otherwise} />
  </History>
)

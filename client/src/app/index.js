import 'stylus/global'

import React from 'react'
import { render } from 'react-dom'
import App from 'containers/App'

const root = document.getElementById('root')

render(
  <App />,
  root,
  () => setTimeout(() => root.style.opacity = 1)
)

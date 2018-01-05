import React from 'react'
import { render } from 'react-dom'

import 'css/global.styl'
import Mount from 'bootstrap/Mount'

render(
  <Mount />,
  document.getElementById('root'),
  () => console.log('Render completed')
)

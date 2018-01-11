import React from 'react'
import { render } from 'react-dom'

import 'css/global.styl'
import Bootstrap from './bootstrap'

render(
  <Bootstrap />,
  document.getElementById('root'),
  () => console.log('Render completed')
)

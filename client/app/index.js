import React from 'react'
import { render } from 'react-dom'

import 'css/global.styl'
import Bootstrap from './bootstrap'

const root = document.getElementById('root')

render(
  <Bootstrap />,
  root,
  () => {
    setTimeout(() => root.style.opacity = 1)

    console.log('Render completed')
  }
)

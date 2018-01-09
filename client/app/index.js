import React from 'react'
import { render } from 'react-dom'

import 'css/global.styl'
import boostrap from './bootstrap'


boostrap(mount => {
  render(
    mount,
    document.getElementById('root'),
    () => console.log('Render completed')
  )
})

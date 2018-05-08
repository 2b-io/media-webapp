import 'stylus/global'

import React from 'react'
import { render } from 'react-dom'

import Core from 'core'

const root = document.getElementById('root')

render(
  <Core />,
  root,
  () => setTimeout(() => root.style.opacity = 1)
)

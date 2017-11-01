import React from 'react'
import { render } from 'react-dom'

import './global.styl'
import Mount from 'core/Mount'

const MOUNT_NODE = document.getElementById('root')

render(<Mount />, MOUNT_NODE, () => console.log('Render completed'))

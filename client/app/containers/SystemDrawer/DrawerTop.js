import Radium from 'radium'
import React from 'react'

import { topStyle } from './style'

@Radium
class DrawerTop extends React.PureComponent {
  render() {
    return (
      <div style={topStyle}>
      </div>
    )
  }
}

export default DrawerTop

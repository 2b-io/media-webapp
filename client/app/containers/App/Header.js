import Radium from 'radium'
import React from 'react'

import { headerStyle } from './style'

@Radium
class Header extends React.PureComponent {
  render() {
    return (
      <div style={headerStyle}>
        <h1>Hello world</h1>
      </div>
    )
  }
}

export default Header

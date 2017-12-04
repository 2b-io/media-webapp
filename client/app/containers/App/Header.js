import Radium from 'radium'
import React from 'react'

// icons
import FaBars from 'react-icons/lib/fa/bars'

import { headerStyle } from './style'

@Radium
class Header extends React.PureComponent {
  render() {
    return (
      <div style={headerStyle.wrapper}>
        <div style={headerStyle.container}>
          <FaBars size={30} />
        </div>
      </div>
    )
  }
}

export default Header

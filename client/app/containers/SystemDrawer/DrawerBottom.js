import Radium from 'radium'
import React from 'react'

import { InternalLink } from 'components/Link'

import { bottomStyle, linkStyle } from './style'

@Radium
class DrawerBottom extends React.Component {
  render() {
    return (
      <div style={bottomStyle}>
        <InternalLink link="/sign-up" style={linkStyle}>
          Create new account
        </InternalLink>
      </div>
    )
  }
}

export default DrawerBottom

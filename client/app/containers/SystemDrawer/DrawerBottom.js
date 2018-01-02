import Radium from 'radium'
import React from 'react'

import { InternalLink } from 'components/Link'

import { bottom as style } from './style'

@Radium
class DrawerBottom extends React.Component {
  render() {
    return (
      <div style={style.wrapper}>
        <InternalLink link="/about" style={style.signature}>
          medianetwork.io&copy;
        </InternalLink>
      </div>
    )
  }
}

export default DrawerBottom

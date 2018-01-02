import Radium from 'radium'
import React from 'react'
import IconCopyright from 'react-icons/lib/md/copyright'

import { InternalLink } from 'components/Link'

import { bottom as style } from './style'

@Radium
class DrawerBottom extends React.Component {
  render() {
    return (
      <div style={style.wrapper}>
        <InternalLink link="/about" style={style.signature}>
          <IconCopyright size={20} />medianetwork.io
        </InternalLink>
      </div>
    )
  }
}

export default DrawerBottom

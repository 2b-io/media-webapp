import React from 'react'

import { drawerItemStyle, contentStyle } from './style'
import { InternalLink } from 'components/Link'

class DrawerContent extends React.Component {
  render() {
    return (
      <ul style={contentStyle}>
        <li>
          <InternalLink link="/" style={drawerItemStyle}>
            Why MediaNetwork?
          </InternalLink>
        </li>
        <li>
          <InternalLink link="/" style={drawerItemStyle}>
            Pricing
          </InternalLink>
        </li>
        <li>
          <InternalLink link="/" style={drawerItemStyle}>
            About Us
          </InternalLink>
        </li>
      </ul>
    )
  }
}

export default DrawerContent

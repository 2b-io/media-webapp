import React from 'react'
import pick from 'object.pick'

import HyperLink from 'decorators/HyperLink'

import { linkStyle } from './style'

class Link extends React.PureComponent {
  static NATIVE_PROPS = ['href', 'alt', 'target', 'onClick']

  render() {
    const supportedProps = pick(this.props, Link.NATIVE_PROPS)

    return (
      <a style={linkStyle} {...supportedProps}>{this.props.children}</a>
    )
  }
}

export default Link
export const InternalLink = HyperLink(Link)

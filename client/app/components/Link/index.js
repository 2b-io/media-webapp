import Radium from 'radium'
import React from 'react'
import pick from 'object.pick'

import HyperLink from 'decorators/HyperLink'

import style from './style'

@Radium
class Link extends React.PureComponent {
  static NATIVE_PROPS = ['href', 'alt', 'target', 'onClick']

  render() {
    const supportedProps = pick(this.props, Link.NATIVE_PROPS)
    const mergedStyle = {
      ...style,
      ...this.props.style
    }

    return (
      <a style={mergedStyle} {...supportedProps}>
        {this.props.children}
      </a>
    )
  }
}

export default Link
export const InternalLink = HyperLink(Link)

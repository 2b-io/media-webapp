import Radium from 'radium'
import React from 'react'
import pick from 'object.pick'

import HyperLink from 'decorators/HyperLink'

import style from './style'

@Radium
class Button extends React.PureComponent {
  render() {
    const supportedProps = pick(this.props, ['onClick', 'type'])
    const mergedStyle = {
      ...style,
      ...this.props.style
    }

    return (
      <button style={mergedStyle} {...supportedProps}>
        {this.props.children}
      </button>
    )
  }
}

export default Button
export const LinkButton = HyperLink(Button)

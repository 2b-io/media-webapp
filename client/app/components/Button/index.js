import React from 'react'
import pick from 'object.pick'

import HyperLink from 'decorators/HyperLink'

import { buttonStyle } from './style'

class Button extends React.PureComponent {
  render() {
    const supportedProps = pick(this.props, ['onClick', 'type'])

    return (
      <button style={buttonStyle}
        {...supportedProps}
      >{this.props.children}</button>
    )
  }
}

export default Button
export const LinkButton = HyperLink(Button)

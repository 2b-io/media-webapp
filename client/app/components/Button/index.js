import React from 'react'
import pick from 'object.pick'

class Button extends React.PureComponent {
  render() {
    const supportedProps = pick(this.props, ['onClick'])

    return <button {...supportedProps}>{this.props.children}</button>
  }
}

export default Button

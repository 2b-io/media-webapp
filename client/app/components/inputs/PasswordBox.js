import Radium from 'radium'
import React from 'react'

@Radium
class PasswordBox extends React.Component {
  render() {
    const { input } = this.props

    return (
      <input type="password" {...input} />
    )
  }
}

export default PasswordBox

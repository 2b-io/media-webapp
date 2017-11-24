import Radium from 'radium'
import React from 'react'

@Radium
class PasswordBox extends React.Component {
  render() {
    const { input: { value, onChange } } = this.props

    return (
      <input type="password" value={value} onChange={onChange} />
    )
  }
}

export default PasswordBox

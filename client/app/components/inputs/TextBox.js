import Radium from 'radium'
import React from 'react'

@Radium
class TextBox extends React.Component {
  render() {
    const { input: { value, onChange } } = this.props

    return (
      <input type="text" value={value} onChange={onChange} />
    )
  }
}

export default TextBox

import Radium from 'radium'
import React from 'react'

@Radium
class TextBox extends React.Component {
  render() {
    const { input } = this.props

    return (
      <input type="text" {...input} />
    )
  }
}

export default TextBox

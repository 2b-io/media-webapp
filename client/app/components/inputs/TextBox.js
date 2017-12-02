import Radium from 'radium'
import React from 'react'
import pick from 'object.pick'

import { textInputStyle } from './style'

@Radium
class TextBox extends React.Component {
  render() {
    const { input:inputProps } = this.props
    const nativeInputProps = pick(this.props, ['placeholder'])

    return (
      <input type="text" style={textInputStyle}
        {...nativeInputProps}
        {...inputProps}
      />
    )
  }
}

export default TextBox

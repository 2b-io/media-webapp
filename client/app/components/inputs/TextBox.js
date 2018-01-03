import Radium from 'radium'
import React from 'react'
import pick from 'object.pick'

import { text as style } from './style'

@Radium
class TextBox extends React.Component {
  render() {
    const { input:inputProps } = this.props
    const nativeInputProps = pick(this.props, ['placeholder'])
    const mergedStyle = {
      ...style,
      ...this.props.style
    }

    return (
      <input type="text" style={mergedStyle}
        {...nativeInputProps}
        {...inputProps}
      />
    )
  }
}

export default TextBox

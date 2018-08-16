import Radium from 'radium'
import React from 'react'

import BreakPoint from 'components/BreakPoint'

import style from './style'

class ResponsiveBox extends React.Component {
  render() {
    const mergedStyle = {
      small: { ...style.small, ...(this.props.style || {}) },
      medium: { ...style.medium, ...(this.props.style || {}) }
    }

    return [
      <BreakPoint name="small" key="small">
        <div style={mergedStyle.small}>{this.props.children}</div>
      </BreakPoint>,
      <BreakPoint name="medium" key="medium">
        <div style={mergedStyle.medium}>{this.props.children}</div>
      </BreakPoint>
    ]
  }
}

export default ResponsiveBox

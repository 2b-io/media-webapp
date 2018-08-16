import React from 'react'
import MediaQuery from 'react-responsive'

import BREAK_POINT_DEF from './constants'

class BreakPoint extends React.PureComponent {
  render() {
    const { name, children } = this.props
    const desiredBreakPoint = BREAK_POINT_DEF[name] || BREAK_POINT_DEF.desktop

    return (
      <MediaQuery query={desiredBreakPoint}>
        {children}
      </MediaQuery>
    )
  }
}

export default BreakPoint

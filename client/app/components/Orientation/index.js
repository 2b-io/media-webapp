import React from 'react'
import MediaQuery from 'react-responsive'

import ORIENTATION_DEF from './constants'

class Orientation extends React.PureComponent {
  render() {
    const { name, children } = this.props
    const desiredOrientation = ORIENTATION_DEF[name] || ORIENTATION_DEF.landscape

    return (
      <MediaQuery query={desiredOrientation}>
        {children}
      </MediaQuery>
    )
  }
}

export default Orientation

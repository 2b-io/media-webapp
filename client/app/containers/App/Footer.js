import React from 'react'
import { connect } from 'react-redux'

import { LAYOUT } from 'actions/layout'
import SystemFooter from 'containers/SystemFooter'

@connect(state => ({ layout: state.ui.layout }))
class Footer extends React.PureComponent {
  render() {
    const { mode } = this.props.layout

    switch (mode) {
      case LAYOUT.SYSTEM_MODE:
        return <SystemFooter />
    }

    return null
  }
}

export default Footer

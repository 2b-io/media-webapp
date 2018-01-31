import React from 'react'
import { connect } from 'react-redux'

// internals
import { LAYOUT } from 'actions/layout'
import SystemHeader from 'containers/SystemHeader'

@connect(state => ({ layout: state.ui.layout }))
class Header extends React.PureComponent {
  render() {
    const { layout } = this.props

    return <SystemHeader layout={layout} />
  }
}

export default Header

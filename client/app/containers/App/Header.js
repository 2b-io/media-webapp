import React from 'react'
import { connect } from 'react-redux'

// internals
import { LAYOUT } from 'actions/layout'
import PersonalHeader from 'containers/PersonalHeader'
import SystemHeader from 'containers/SystemHeader'

// @connect(state => ({ layout: state.ui.layout }))
class Header extends React.PureComponent {
  render() {
    return <SystemHeader />
  }
}

export default Header

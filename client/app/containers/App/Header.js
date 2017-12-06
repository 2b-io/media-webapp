import React from 'react'
import { connect } from 'react-redux'

// internals
import { LAYOUT } from 'actions/layout'
import PersonalHeader from 'containers/PersonalHeader'
import SystemHeader from 'containers/SystemHeader'

@connect(state => ({ layout: state.layout }))
class Header extends React.PureComponent {
  render() {
    const { mode } = this.props.layout

    switch (mode) {
      case LAYOUT.PERSONAL_MODE:
        return <PersonalHeader />

      case LAYOUT.SYSTEM_MODE:
        return <SystemHeader />
    }

    return null
  }
}

export default Header

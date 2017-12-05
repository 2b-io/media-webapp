import React from 'react'
import { connect } from 'react-redux'

// internals
import { LAYOUT } from 'actions/layout'
import { loadableContainer } from 'helpers/loadable'

const AccountHeader = loadableContainer('AccountHeader')
const SystemHeader = loadableContainer('SystemHeader')

@connect(state => ({ layout: state.layout }))
class Header extends React.PureComponent {
  render() {
    const { mode } = this.props.layout

    switch (mode) {
      case LAYOUT.ACCOUNT_MODE:
        return <AccountHeader />

      case LAYOUT.SYSTEM_MODE:
        return <SystemHeader />
    }

    return null
  }
}

export default Header

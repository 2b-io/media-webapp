import Radium from 'radium'
import React from 'react'
import { connect } from 'react-redux'

// icons
import MdMenu from 'react-icons/lib/md/menu'

import { LAYOUT } from 'actions/layout'
import { toggleAppMenu } from 'actions/drawer';
import AppDrawer from 'containers/AppDrawer'

import { headerStyle } from './style'

@connect(state => ({ layout: state.layout }))
@Radium
class Header extends React.PureComponent {
  constructor(props) {
    super(props)

    this._openMenu = this._openMenu.bind(this)
  }
  render() {
    const { mode } = this.props.layout

    switch (mode) {
      case LAYOUT.FULLSCREEN_MODE:
        return null

      case LAYOUT.SYSTEM_MODE:
        return this._renderSystemHeader()
    }

    return null
  }

  _renderSystemHeader() {
    return (
      <div style={headerStyle.wrapper}>
        <AppDrawer />
        <div style={headerStyle.container}>
          <div style={headerStyle.drawer}
            onClick={this._openMenu}>
            <MdMenu size={32} />
          </div>
        </div>
      </div>
    )
  }

  _openMenu() {
    const { dispatch } = this.props

    dispatch(toggleAppMenu(true))
  }
}

export default Header

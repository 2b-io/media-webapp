import Radium from 'radium'
import React from 'react'
import { connect } from 'react-redux'

// icons
import MdMenu from 'react-icons/lib/md/menu'

import { toggleMenu } from 'actions/drawer';
import AppDrawer from 'containers/AppDrawer'

import { headerStyle } from './style'

@connect()
@Radium
class Header extends React.PureComponent {
  constructor(props) {
    super(props)

    this._openMenu = this._openMenu.bind(this)
  }
  render() {
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
    console.log('xxx')
    const { dispatch } = this.props

    dispatch(toggleMenu(true))
  }
}

export default Header

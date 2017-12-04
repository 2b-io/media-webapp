import Radium from 'radium'
import React from 'react'
import { connect } from 'react-redux'

// icons
import FaBars from 'react-icons/lib/fa/bars'
import FaClose from 'react-icons/lib/fa/close'

import { action as toggleMenu } from 'redux-burger-menu';

import Drawer from './Drawer'

import { headerStyle, sideMenuStyle } from './style'

@connect()
@Radium
class Header extends React.PureComponent {
  constructor(props) {
    super(props)

    this._openMenu = this._openMenu.bind(this)
  }
  render() {
    console.log('render')

    return (
      <div style={headerStyle.wrapper}>
        <Drawer right
          isOpen={this.state.menuVisible}
          disableOverlayClick
          width={'100%'}
          styles={sideMenuStyle}
          customBurgerIcon={ false }
          customCrossIcon={<FaClose size={30} />}>
          <a href="#">Menu Items</a>
        </Drawer>
        <div style={headerStyle.container}>
          <div style={headerStyle.drawer}
            onClick={this._openMenu}>
            <FaBars size={30} />
          </div>
        </div>
      </div>
    )
  }

  _openMenu() {
    const { dispatch } = this.props

    dispatch(toggleMenu(true))
  }
}

export default Header

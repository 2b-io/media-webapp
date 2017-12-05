import React from 'react'

import { slide as Menu } from 'react-burger-menu'
import { decorator as reduxBurgerMenu } from 'redux-burger-menu'

import IconClose from 'react-icons/lib/io/close-round'

import { sideMenuStyle } from './style'

const ReduxMenu = reduxBurgerMenu(Menu, 'account')

class AccountDrawer extends React.PureComponent {
  render() {
    return (
      <ReduxMenu left
        width={'250px'}
        styles={sideMenuStyle}
        customBurgerIcon={false}
        customCrossIcon={this.renderCloseButton()}>

      </ReduxMenu>
    )
  }

  renderCloseButton() {
    return (
      <IconClose size={24} color="#fff" />
    )
  }
}

export default AccountDrawer

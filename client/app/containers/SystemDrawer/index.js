import React from 'react'

import { slide as Menu } from 'react-burger-menu'
import { decorator as reduxBurgerMenu } from 'redux-burger-menu'

import IconClose from 'react-icons/lib/io/close-round'

import DrawerTop from './DrawerTop'
import DrawerContent from './DrawerContent'
import DrawerBottom from './DrawerBottom'
import { sideMenuStyle } from './style'

const ReduxMenu = reduxBurgerMenu(Menu, 'system')

class SystemDrawer extends React.PureComponent {
  render() {
    return (
      <ReduxMenu right
        pageWrapId="page-wrap"
        width={'100%'}
        styles={sideMenuStyle}
        customBurgerIcon={false}
        customCrossIcon={this.renderCloseButton()}>
        <DrawerTop />
        <DrawerContent />
        <DrawerBottom />
      </ReduxMenu>
    )
  }

  renderCloseButton() {
    return (
      <IconClose size={24} color="#fff" />
    )
  }
}

export default SystemDrawer

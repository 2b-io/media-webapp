import React from 'react'

import { slide as Menu } from 'react-burger-menu'
import { decorator as reduxBurgerMenu } from 'redux-burger-menu'

import IconClose from 'react-icons/lib/io/close-round'

import { LAYOUT } from 'actions/layout'

import DrawerContent from './DrawerContent'
import DrawerBottom from './DrawerBottom'
import { sideMenuStyle } from './style'

const ReduxMenu = reduxBurgerMenu(Menu, LAYOUT.SYSTEM_MODE)

class SystemDrawer extends React.PureComponent {
  render() {
    return (
      <ReduxMenu right
        pageWrapId="page-wrap"
        width={240}
        styles={sideMenuStyle}
        customBurgerIcon={false}
        customCrossIcon={false}>
        <DrawerContent />
        <DrawerBottom />
      </ReduxMenu>
    )
  }
}

export default SystemDrawer

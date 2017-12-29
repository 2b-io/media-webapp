import React from 'react'

import { slide as Menu } from 'react-burger-menu'
import { decorator as reduxBurgerMenu } from 'redux-burger-menu'

import IconClose from 'react-icons/lib/io/close-round'

import { LAYOUT } from 'actions/layout'

import DrawerTop from './DrawerTop'
import DrawerContent from './DrawerContent'
import DrawerBottom from './DrawerBottom'
import { sideMenuStyle } from './style'

const ReduxMenu = reduxBurgerMenu(Menu, LAYOUT.SYSTEM_MODE)

class SystemDrawer extends React.PureComponent {
  render() {
    return (
      <ReduxMenu right
        pageWrapId="page-wrap"
        width={'100%'}
        styles={sideMenuStyle}
        customBurgerIcon={false}
        customCrossIcon={false}>
        <DrawerTop />
        <DrawerContent />
        <DrawerBottom />
      </ReduxMenu>
    )
  }
}

export default SystemDrawer

import React from 'react'

import {slide as Menu} from 'react-burger-menu'
import {decorator as reduxBurgerMenu} from 'redux-burger-menu'

import IconClose from 'react-icons/lib/io/android-close'

import DrawerTop from './DrawerTop'
import DrawerContent from './DrawerContent'
import { sideMenuStyle } from './style'

const ReduxSlide = reduxBurgerMenu(Menu, 'app')

class Drawer extends React.PureComponent {
  render() {
    return (
      <ReduxSlide right
        width={'100%'}
        styles={sideMenuStyle}
        customBurgerIcon={false}
        customCrossIcon={this.renderCloseButton()}>
        <DrawerTop />
        <DrawerContent />
      </ReduxSlide>
    )
  }

  renderCloseButton() {
    return (
      <IconClose size={32} color="#fff" />
    )
  }
}

export default Drawer

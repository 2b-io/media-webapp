import React from 'react'

import { reveal as Menu } from 'react-burger-menu'
import { decorator as reduxBurgerMenu } from 'redux-burger-menu'

import { LAYOUT } from 'actions/layout'

import Top from './Top'
import Content from './Content'
import Bottom from './Bottom'
import style from './style'

const ReduxMenu = reduxBurgerMenu(Menu, LAYOUT.PERSONAL_MODE)

class PersonalDrawer extends React.PureComponent {
  render() {
    return (
      <ReduxMenu left
        pageWrapId="page-wrap"
        width={'260px'}
        styles={style.drawer}
        customBurgerIcon={false}
        customCrossIcon={false}>
        <Top />
        <Content />
        <Bottom />
      </ReduxMenu>
    )
  }

  renderCloseButton() {
    return (
      <IconClose size={24} color="#fff" />
    )
  }
}

export default PersonalDrawer

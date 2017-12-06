import React from 'react'

import { reveal as Menu } from 'react-burger-menu'
import { decorator as reduxBurgerMenu } from 'redux-burger-menu'

import IconClose from 'react-icons/lib/io/close-round'

import style from './style'
import Top from './Top'
import Content from './Content'
import Bottom from './Bottom'

const ReduxMenu = reduxBurgerMenu(Menu, 'account')

class AccountDrawer extends React.PureComponent {
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

export default AccountDrawer

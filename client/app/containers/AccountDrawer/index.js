import React from 'react'

import { reveal as Menu } from 'react-burger-menu'
import { decorator as reduxBurgerMenu } from 'redux-burger-menu'

import IconClose from 'react-icons/lib/io/close-round'

import style from './style'
import Top from './Top'
import Content from './Content'

const ReduxMenu = reduxBurgerMenu(Menu, 'account')

class AccountDrawer extends React.PureComponent {
  render() {
    return (
      <ReduxMenu left
        pageWrapId="page-wrap"
        width={'250px'}
        styles={style.drawer}
        customBurgerIcon={false}
        customCrossIcon={false}>
        <Top />
        <Content />
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

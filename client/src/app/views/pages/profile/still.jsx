import React, { Fragment } from 'react'
import { connect } from 'react-redux'

import { mapDispatch } from 'services/redux-helpers'
import { actions, selectors } from 'state/interface'
import { ContextMenu, List } from 'ui/elements'
import { MenuIcon } from 'ui/icons'
import { Text } from 'ui/typo'

import Top from './top'

const Profile = ({
  account,
  session,
  maximizeSidebar,
  toEditProfile,
  toChangePassword,
  showMenu, hideMenu,
  ui: {
    isMenuActive
  }
}) => {
  const menuItems = [ {
    content: () => <Text mostLeft mostRight>Edit Profile</Text>,
    onClick: () => toEditProfile()
  }, {
    content: () => <Text mostLeft mostRight>Change Password</Text>,
    onClick: () => toChangePassword()
  } ]

  return (
    <Fragment>
      <MenuIcon onClick={ maximizeSidebar } />
      <Top account={ account } />
      { account && session && session.account &&
        account._id === session.account._id && (
        <ContextMenu.Menu
          stateless={ true }
          isActive={ isMenuActive }
          activate={ showMenu }
          deactivate={ hideMenu }
          content={ () => <List items={ menuItems } /> }
        />
      ) }
    </Fragment>
  )
}

export default connect(
  (state) => {
    const { id } = selectors.currentParams(state)

    return {
      account: selectors.findAccountById(
        state,
        id,
        selectors.currentSession(state)
      ),
      session: selectors.currentSession(state)
    }
  },
  mapDispatch({
    maximizeSidebar: actions.maximizeSidebar,
    toEditProfile: () => actions.requestLocation('/@me/edit'),
    toChangePassword: () => actions.requestLocation('/@me/change-password'),
    showMenu: () => actions.showMenu('PROFILE'),
    hideMenu: () => actions.hideMenu('PROFILE')
  })
)(Profile)

import React, { Fragment } from 'react'
import MediaQuery from 'react-responsive'
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
  openSidebar,
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
    onClick: () => toEditProfile(account.identifier)
  }, {
    content: () => <Text mostLeft mostRight>Change Password</Text>,
    onClick: () => toChangePassword(account.identifier)
  } ]

  return (
    <Fragment>
      <MediaQuery query='(max-device-width: 599px)'>
        { openSidebar ?
            <div></div> :
            <MenuIcon onClick={ maximizeSidebar } />
        }
      </MediaQuery>
      <MediaQuery query='(min-device-width: 600px)'>
        <div></div>
      </MediaQuery>
      <Top account={ account } />
      { account && session && session.account &&
        account.identifier === session.account.identifier && (
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
    const { identifier } = selectors.currentParams(state)

    return {
      account: selectors.findAccountById(
        state,
        identifier,
        selectors.currentSession(state)
      ),
      session: selectors.currentSession(state),
      openSidebar: selectors.maximizeSidebar(state)
    }
  },
  mapDispatch({
    maximizeSidebar: actions.maximizeSidebar,
    toChangePassword: (identifier) => actions.requestLocation(`/@${ identifier }/change-password`),
    toEditProfile: (identifier) => actions.requestLocation(`/@${ identifier }/edit`),
    showMenu: () => actions.showMenu('PROFILE'),
    hideMenu: () => actions.hideMenu('PROFILE')
  })
)(Profile)

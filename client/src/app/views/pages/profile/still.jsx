import React, { Fragment } from 'react'
import { connect } from 'react-redux'

import { mapDispatch } from 'services/redux-helpers'
import { actions, selectors } from 'state/interface'
import { ContextMenu, List } from 'ui/elements'
import { MenuIcon } from 'ui/icons'
import { Text } from 'ui/typo'

import Top from './top'

const Profile = ({ account, maximizeSidebar }) => {
  const menuItems = [ {
    content: () => <Text mostLeft mostRight>Edit Profile</Text>
  }, {
    content: () => <Text mostLeft mostRight>Change Password</Text>
  } ]

  return (
    <Fragment>
      <MenuIcon onClick={ maximizeSidebar } />
      <Top account={ account } />
      <ContextMenu
        content={ () => <List items={ menuItems } /> }
      />
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
    maximizeSidebar: actions.maximizeSidebar
  })
)(Profile)

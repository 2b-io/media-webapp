import React from 'react'
import { connect } from 'react-redux'

import { actions, selectors } from 'state/interface'
import { Identicon } from 'ui/elements'

const LeftMenu = ({ isSignedIn, session, signOut }) => (
  <div className="transition-item">
    { isSignedIn &&
      <Identicon size={ 24 } id={ session.account.email } />
    }
    <button onClick={ signOut }>Sign Out</button>
  </div>
)

export default connect(
  state => ({
    isSignedIn: selectors.isSignedIn(state),
    session: selectors.currentSession(state)
  }),
  dispatch => ({
    signOut: () => dispatch(actions.closeLayout())
  })
)(LeftMenu)

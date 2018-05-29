import React from 'react'
import { connect } from 'react-redux'

import { actions } from 'state/interface'

const LeftMenu = ({ signOut }) => (
  <div className="transition-item">
    <button onClick={ signOut }>Sign Out</button>
  </div>
)

export default connect(
  null,
  dispatch => ({
    signOut: () => dispatch(actions.closeLayout())
  })
)(LeftMenu)

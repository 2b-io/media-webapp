import React, { Fragment } from 'react'
import { connect } from 'react-redux'

import { mapDispatch } from 'services/redux-helpers'
import { actions } from 'state/interface'
import { MenuIcon } from 'ui/icons'
import { PageTitle } from 'ui/typo'

const Dashboard = ({ maximizeSidebar }) => (
  <Fragment>
    <MenuIcon onClick={ maximizeSidebar } />
    <PageTitle>Dashboard</PageTitle>
  </Fragment>
)

export default connect(
  null,
  mapDispatch({
    maximizeSidebar: actions.maximizeSidebar
  })
)(Dashboard)

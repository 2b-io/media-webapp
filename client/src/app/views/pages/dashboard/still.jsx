import React, { Fragment } from 'react'
import { connect } from 'react-redux'

import { mapDispatch, mapState } from 'services/redux-helpers'
import { actions, selectors } from 'state/interface'
import { PageTitle } from 'ui/typo'
import { MenuButton } from 'views/common/compounds'

const Dashboard = ({ maximizeSidebar, openSidebar }) => (
  <Fragment>
    <MenuButton onClick={ maximizeSidebar } />
    <PageTitle>Dashboard</PageTitle>
  </Fragment>
)

export default connect(
  mapState({
    openSidebar: selectors.maximizeSidebar
  }),
  mapDispatch({
    maximizeSidebar: actions.maximizeSidebar
  })
)(Dashboard)

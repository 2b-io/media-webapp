import React, { Fragment } from 'react'
import MediaQuery from 'react-responsive'
import { connect } from 'react-redux'

import { mapDispatch, mapState } from 'services/redux-helpers'
import { actions, selectors } from 'state/interface'
import { MenuIcon } from 'ui/icons'
import { PageTitle } from 'ui/typo'

const Dashboard = ({ maximizeSidebar, openSidebar }) => (
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

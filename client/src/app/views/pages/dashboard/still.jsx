import React, { Fragment } from 'react'
import MediaQuery from 'react-responsive'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { mapDispatch } from 'services/redux-helpers'
import { actions } from 'state/interface'
import { MenuIcon } from 'ui/icons'
import { PageTitle } from 'ui/typo'

const Dashboard = ({ maximizeSidebar }) => (
  <Fragment>
    <MediaQuery query='(max-device-width: 599px)'>
      <MenuIcon onClick={ maximizeSidebar } />
    </MediaQuery>
    <MediaQuery query='(min-device-width: 600px)'>
      <div></div>
    </MediaQuery>
    <PageTitle>Dashboard</PageTitle>
  </Fragment>
)

export default connect(
  null,
  mapDispatch({
    maximizeSidebar: actions.maximizeSidebar
  })
)(Dashboard)

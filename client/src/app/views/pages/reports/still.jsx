import React, { Fragment } from 'react'
import { connect } from 'react-redux'

import { mapDispatch } from 'services/redux-helpers'
import { actions } from 'state/interface'
import { PageTitle } from 'ui/typo'
import { MenuButton } from 'views/common/compounds'

const Reports = ({ maximizeSidebar }) => (
  <Fragment onClick={ maximizeSidebar }>
    <MenuButton />
    <PageTitle>Reports</PageTitle>
  </Fragment>
)

export default connect(
  null,
  mapDispatch({
    maximizeSidebar: actions.maximizeSidebar
  })
)(Reports)

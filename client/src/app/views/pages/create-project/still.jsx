import React, { Fragment } from 'react'
import { connect } from 'react-redux'

import { mapDispatch } from 'services/redux-helpers'
import { actions } from 'state/interface'
import { BackIcon } from 'ui/icons'
import { PageTitle } from 'ui/typo'

const CreateProject = ({ navigateBack }) => (
  <Fragment>
    <BackIcon onClick={ navigateBack } />
    <PageTitle>Create Project</PageTitle>
  </Fragment>
)

export default connect(
  null,
  mapDispatch({
    navigateBack: () => actions.requestLocation('/projects')
  })
)(CreateProject)

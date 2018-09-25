import React, { Fragment } from 'react'
import { connect } from 'react-redux'

import { mapDispatch } from 'services/redux-helpers'
import { actions, selectors } from 'state/interface'
import { BackIcon } from 'ui/icons'
import { PageTitle } from 'ui/typo'
import { withParams } from 'views/router'

const EditProject = ({ navigateBack, project = {} }) => (
  <Fragment>
    <BackIcon onClick={ navigateBack.bind(null, project.identifier) } />
    <PageTitle>Edit Project</PageTitle>
  </Fragment>
)

export default withParams(
  connect(
    (state, { params: { identifier } }) => ({
      project: selectors.findProjectByIdentifier(state, identifier)
    }),
    mapDispatch({
      navigateBack: (identifier) => actions.requestLocation(`/projects/${ identifier }`)
    })
  )(EditProject)
)

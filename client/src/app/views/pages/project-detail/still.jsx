import React, { Fragment } from 'react'
import { connect } from 'react-redux'

import { mapDispatch } from 'services/redux-helpers'
import { actions, selectors } from 'state/interface'
import { BackIcon } from 'ui/icons'
import { PageTitle } from 'ui/typo'
import { withParams } from 'views/router'

const ProjectDetail = ({ navigateBack, project = {} }) => (
  <Fragment>
    <BackIcon onClick={ navigateBack } />
    <PageTitle>{ project.name }</PageTitle>
  </Fragment>
)

export default withParams(
  connect(
    (state, { params: { identifier } }) => ({
      project: selectors.findProjectByIdentifier(state, identifier)
    }),
    mapDispatch({
      navigateBack: () => actions.requestLocation('/projects')
    })
  )(ProjectDetail)
)

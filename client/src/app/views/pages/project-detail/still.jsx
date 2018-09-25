import React, { Fragment } from 'react'
import { connect } from 'react-redux'

import { selectors } from 'state/interface'
import { PageTitle } from 'ui/typo'
import { withParams } from 'views/router'

const ProjectDetail = ({ project = {} }) => (
  <Fragment>
    <PageTitle>{ project.name }</PageTitle>
  </Fragment>
)

export default withParams(
  connect(
    (state, { params: { identifier } }) => ({
      project: selectors.findProjectByIdentifier(state, identifier)
    })
  )(ProjectDetail)
)

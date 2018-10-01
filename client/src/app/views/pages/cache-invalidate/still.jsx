import React, { Fragment } from 'react'
import { connect } from 'react-redux'

import { mapDispatch } from 'services/redux-helpers'
import { actions, selectors } from 'state/interface'
import { BackIcon } from 'ui/icons'
import { PageTitle } from 'ui/typo'

const CacheInvalidate = ({ navigateBack, project = {} }) => (
  <Fragment>
    <BackIcon onClick={ navigateBack.bind(null, project.identifier) } />
    <PageTitle>Cache Invalidator</PageTitle>
  </Fragment>
)

export default connect(
  (state) => {
    const { identifier } = selectors.currentParams(state)

    return {
      project: selectors.findProjectByIdentifier(state, identifier)
    }
  },
  mapDispatch({
    navigateBack: (identifier) => actions.requestLocation(`/projects/${ identifier }`)
  })
)(CacheInvalidate)

import React, { Fragment } from 'react'
import { connect } from 'react-redux'

import { mapDispatch } from 'services/redux-helpers'
import { actions, selectors } from 'state/interface'
import { BackIcon } from 'ui/icons'
import { PageTitle } from 'ui/typo'

const ChangePassword = ({ identifier, navigateBack }) => (
  <Fragment>
    <BackIcon onClick={ () => navigateBack(identifier) } />
    <PageTitle>Change Password</PageTitle>
  </Fragment>
)

export default connect(
  (state) => {
    const { identifier } = selectors.currentParams(state)

    return {
      identifier
    }
  },
  mapDispatch({
    navigateBack: (identifier) => actions.requestLocation(`/@${ identifier }`)
  })
)(ChangePassword)

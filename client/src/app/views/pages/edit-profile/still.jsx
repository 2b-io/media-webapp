import React, { Fragment } from 'react'
import { connect } from 'react-redux'

import { mapDispatch } from 'services/redux-helpers'
import { actions, selectors } from 'state/interface'
import { Button } from 'ui/elements'
import { BackIcon } from 'ui/icons'
import { PageTitle } from 'ui/typo'

const EditProfile = ({ identifier, navigateBack }) => (
  <Fragment>
    <Button onClick={ () => navigateBack(identifier) }>
      <BackIcon />
    </Button>
    <PageTitle>Edit Profile</PageTitle>
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
)(EditProfile)

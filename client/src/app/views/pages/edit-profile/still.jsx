import React, { Fragment } from 'react'
import { connect } from 'react-redux'

import { mapDispatch } from 'services/redux-helpers'
import { actions } from 'state/interface'
import { BackIcon } from 'ui/icons'
import { PageTitle } from 'ui/typo'

const EditProfile = ({ navigateBack }) => (
  <Fragment>
    <BackIcon onClick={ navigateBack.bind(null, false) } />
    <PageTitle>Edit Profile</PageTitle>
  </Fragment>
)

export default connect(
  null,
  mapDispatch({
    navigateBack: (identifier) => actions.requestLocation(`/projects/${ identifier }`)
  })
)(EditProfile)

import React, { Fragment } from 'react'
import { connect } from 'react-redux'

import { mapDispatch } from 'services/redux-helpers'
import { actions, selectors } from 'state/interface'
import { BackIcon } from 'ui/icons'
import { PageTitle } from 'ui/typo'

const EditProfile = ({
  id,
  navigateBack
}) => (
  <Fragment>
    <BackIcon onClick={ navigateBack.bind(null, id) } />
    <PageTitle>Edit Profile</PageTitle>
  </Fragment>
)

export default connect(
  (state) => {
      const { id } = selectors.currentParams(state)
    return { id }
  },
  mapDispatch({
    navigateBack: (id) => actions.requestLocation(`/@:${ id }`)
  })
)(EditProfile)

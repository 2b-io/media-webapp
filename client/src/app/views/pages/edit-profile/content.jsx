import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { mapDispatch } from 'services/redux-helpers'
import { actions, selectors } from 'state/interface'
import { Container } from 'ui/elements'

import StatelessEditProfileForm from './form'

const EditProfileForm = reduxForm({
  form: 'editProfile',
  enableReinitialize: true
})(StatelessEditProfileForm)

const EditProfile = ({
  account,
  session,
  updateProfile
}) => {
  if (!account) {
    return null
  }

  return (
    <Container>
      { account && session.account && session.account.identifier === account.identifier &&
        <EditProfileForm
          initialValues={ account }
          onSubmit={ updateProfile }
        />
      }
    </Container>
  )
}

export default connect(
  (state) => {
    const { identifier } = selectors.currentParams(state)
    const session = selectors.currentSession(state)

    return {
      account: selectors.findAccountById(state, identifier),
      session
    }
  },
  mapDispatch({
    updateProfile: actions.updateProfile
  })
)(EditProfile)

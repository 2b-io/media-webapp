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
  if(!account) {
    return null
  }

  return (
    <Container>
      { session && account && session.account._id === account._id &&
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
    const { id } = selectors.currentParams(state)
    const session = selectors.currentSession(state)

    return {
      account: selectors.findAccountById(state, id, session),
      session
    }
  },
  mapDispatch({
    updateProfile: actions.updateProfile
  })
)(EditProfile)

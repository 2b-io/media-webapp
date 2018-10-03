import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { mapDispatch } from 'services/redux-helpers'
import { actions, selectors } from 'state/interface'
import { Container } from 'ui/elements'
import { stateful } from 'views/common/decorators'

import _EditProfileForm from './form'

const EditProfileForm = reduxForm({
  form: 'editProfile',
  enableReinitialize: true
})(_EditProfileForm)

const EditProfile = ({
  account,
  session,
  updateProfile
}) => {
  if(!account) {
    return null
  }

  const { _id: loginId, ...newAccount } = account

  return (
    <Container>
      { session && account && session.account._id === loginId &&
        <EditProfileForm
          initialValues={ newAccount }
          onSubmit={ updateProfile }
        />
      }
    </Container>
  )
}

export default connect(
  (state) => {
    const { id } = selectors.currentParams(state)
    return {
      account: selectors.findAccountById(
        state,
        id,
        selectors.currentSession(state)
      ),
      session: selectors.currentSession(state)
    }
  },
  mapDispatch({
    updateProfile: actions.updateProfile
  })
)(EditProfile)
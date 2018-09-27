import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { mapDispatch } from 'services/redux-helpers'
import { selectors } from 'state/interface'
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
  editProfile
}) => {

  return (
    <Container>
      { session && account && session.account._id === account._id &&
        <EditProfileForm
          initialValues={ account }
          onSubmit={ editProfile }
        />
      }
    </Container>
  )
}

export default stateful({
  component: 'EditProfile'
})(
  connect(
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
      editProfile: () => true
    })
  )(EditProfile)
)

import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { mapDispatch } from 'services/redux-helpers'
import { actions, selectors } from 'state/interface'
import { Container } from 'ui/elements'
import { stateful } from 'views/common/decorators'
import { validateConfirmPassword } from 'views/common/validate'

import _ChangePasswordForm from './form'

const ChangePasswordForm = reduxForm({
  form: 'changePasswordForm',
  validate: validateConfirmPassword
})(_ChangePasswordForm)

const ChangePassword = ({
  account,
  session,
  changePassword
}) => (
  <Container>
    { session && account && session.account._id === account._id &&
      <ChangePasswordForm
        onSubmit={ changePassword }
      />
    }
  </Container>
)

export default stateful({
  component: 'ChangePassword'
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
      changePassword: ({ currentPassword, password }) => actions.changePassword(currentPassword, password)
    })
  )(ChangePassword)
)

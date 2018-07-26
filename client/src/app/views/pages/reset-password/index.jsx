import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { mapDispatch, mapState } from 'services/redux-helpers'
import { actions, selectors } from 'state/interface'
import { ChangePassword } from 'views/common/form'
import { Container } from 'ui/elements'
import { ErrorBox, SuccessBox } from 'ui/elements'
import { stateful } from 'views/common/decorators'
import { validateConfirmPassword } from 'views/common/validate'

const ResetPasswordForm = reduxForm({
  form: 'resetPassword',
  enableReinitialize: true,
  validate: validateConfirmPassword
})(ChangePassword)

const ResetPassword=({
  fetchPasswordReset,
  match,
  toSignIn,
  ui: { result, error }
}) => {
  const { code } = match.params
  if (!code ) {
    return null
  }
  return (
    <main>
      <Container center size="small">
        <ResetPasswordForm
          resetPassword={ true }
          onSubmit={ ({ password }) => {
            fetchPasswordReset({ password, code }) } }
        />
      </Container>
    </main>
  ) }

export default stateful({
  component: 'ResetPassword'
})(
  connect(
    mapState({
      statusReset: selectors.statusReset
    }),
    mapDispatch({
      fetchPasswordReset: ({ password, code }) => actions.fetchPasswordReset(password, code),
      toSignIn: () => actions.requestLocation('/sign-in')
    })
  )(ResetPassword)
)

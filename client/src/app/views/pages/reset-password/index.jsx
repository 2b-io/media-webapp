import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { mapDispatch, mapState } from 'services/redux-helpers'
import { actions, selectors } from 'state/interface'
import { Modal } from 'ui/compounds'
import { Container } from 'ui/elements'

import _resetPasswordForm from './resetPasswordForm'

const ResetPasswordForm = reduxForm({
  form: 'resetPassword',
  enableReinitialize: true
})(_resetPasswordForm)

const ResetPassword=({ fetchPasswordReset, match, toForgotPassword, statusReset }) => {
  const { code } = match.params
  if (!code ) {
    return null
  }

  return (
    <main>
      <Container center size="small">
        { statusReset===null? <ResetPasswordForm onSubmit={ ({ password })=>{ fetchPasswordReset({ password, code }) } } /> :
          <Modal
            open={ true }
            zIndex={ 10 }
            onClickOutside={ toSignIn }
            onClose={ toSignIn }>
            <div>
              <p>Reset password success!</p>
            </div>
          </Modal>
        }
      </Container>
    </main>
  ) }

export default connect(
  mapState({
    statusReset: selectors.statusReset
  }),
  mapDispatch({
    fetchPasswordReset: ({ password, code }) => actions.fetchPasswordReset(password, code),
    toForgotPassword: () => actions.requestLocation('/forgot-password')
  })
)(ResetPassword)

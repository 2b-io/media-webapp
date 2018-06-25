import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { mapDispatch, mapState } from 'services/redux-helpers'
import { actions, selectors } from 'state/interface'
import { Modal } from 'ui/compounds'
import { Container } from 'ui/elements'

import _resetPasswordForm from './resetPasswordForm'

const ResetPasswordForm = reduxForm({
  form: 'fetchResetPassword',
  enableReinitialize: true
})(_resetPasswordForm)

const ResetPassword=({ fetchResetPassword, match, toForgotPassword, statusResetPassword }) => {
  const { code } = match.params
  if (!code ) {
    return null
  }

  return (
    <main>
      <Container center size="small">
        { statusResetPassword===null? <ResetPasswordForm onSubmit={ ({ password })=>{ fetchResetPassword({ password, code }) } } /> :
          <Modal
            open={ true }
            zIndex={ 10 }
            onClickOutside={ toForgotPassword }
            onClose={ toForgotPassword }>
            { () => statusResetPassword===true? <p>Reset password success!</p> : <p>Reset password fail!</p>
            }
          </Modal>
        }
      </Container>
    </main>
  ) }

export default connect(
  mapState({
    statusResetPassword: selectors.statusResetPassword
  }),
  mapDispatch({
    fetchResetPassword: ({ password, code }) => actions.fetchResetPassword(password, code),
    toForgotPassword: () => actions.requestLocation('/forgot-password')
  })
)(ResetPassword)

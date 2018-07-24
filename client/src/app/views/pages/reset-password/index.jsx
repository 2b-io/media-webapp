import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { mapDispatch, mapState } from 'services/redux-helpers'
import { actions, selectors } from 'state/interface'
import { ChangePassword } from 'views/common/form'
import { Modal } from 'ui/compounds'
import { Container } from 'ui/elements'
import { validateConfirmPassword } from 'views/common/validate'

const ResetPasswordForm = reduxForm({
  form: 'resetPassword',
  enableReinitialize: true,
  validate: validateConfirmPassword
})(ChangePassword)

const ResetPassword=({ fetchPasswordReset, match, toSignIn, statusReset }) => {
  const { code } = match.params
  if (!code ) {
    return null
  }

  return (
    <main>
      <Container center size="small">
        { statusReset === null? <ResetPasswordForm
          resetPassword={ true }
          onSubmit={ ({ password }) => {
            fetchPasswordReset({ password, code }) } }
        /> :
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
    toSignIn: () => actions.requestLocation('/sign-in')
  })
)(ResetPassword)

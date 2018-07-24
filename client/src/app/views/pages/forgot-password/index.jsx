import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { Modal } from 'ui/compounds'
import { Container } from 'ui/elements'
import { actions, selectors } from 'state/interface'
import { mapDispatch, mapState } from 'services/redux-helpers'

import _ForgotPasswordForm from './forgot-password-form'

const ForgotPasswordForm = reduxForm({
  form: 'fetchEmail',
  enableReinitialize: true
})(_ForgotPasswordForm)

const ForgotPassword=({ fetchEmail, status, toSignIn }) => {
  return (
    <main>
      <Container center size="small">
        <ForgotPasswordForm onSubmit={ fetchEmail } />
        { status===null?'':<p>Email not exist, please check again</p> }
      </Container>
      { status?  <Modal
        open={ true }
        zIndex={ 10 }
        onClickOutside={ toSignIn }
        onClose={ toSignIn }
      >
        <p>
          Request reset password success! Please check your email and reset password during 24 hour
        </p>
      </Modal>:''}
    </main>
  ) }

export default connect(
  mapState({
    status: selectors.status
  }),
  mapDispatch({
    fetchEmail: email => actions.fetchEmail(email),
    toSignIn: () => actions.requestLocation('/sign-in'),
  })
)(ForgotPassword)

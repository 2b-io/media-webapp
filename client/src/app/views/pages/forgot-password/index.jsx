import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { actions } from 'state/interface'
import { Container } from 'ui/elements'
import { mapDispatch } from 'services/redux-helpers'
import _ForgotPasswordForm from './forgotPasswordForm'

const ForgotPasswordForm = reduxForm({
  form: 'ForgotPass',
  enableReinitialize: true
})(_ForgotPasswordForm)

const ForgotPassword=({ ForgotPass }) => (
  <main>
    <Container center size="small">
      <ForgotPasswordForm onSubmit={ ForgotPass }/>
    </Container>
  </main>
)

export default connect(
  null,
  mapDispatch({
    ForgotPass: email => actions.fetchForgotPassword(email),
  })
)(ForgotPassword)

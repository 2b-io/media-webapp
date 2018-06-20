import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { actions } from 'state/interface'
import { Container } from 'ui/elements'
import { mapDispatch } from 'services/redux-helpers'
import _ForgotPasswordForm from './forgotPasswordForm'

const ForgotPasswordForm = reduxForm({
  form: 'fetchEmail',
  enableReinitialize: true
})(_ForgotPasswordForm)

const ForgotPassword=({ fetchEmail }) => (
  <main>
    <Container center size="small">
      <ForgotPasswordForm onSubmit={ fetchEmail }/>
    </Container>
  </main>
)

export default connect(
  null,
  mapDispatch({
    fetchEmail: email => actions.fetchEmail(email),
  })
)(ForgotPassword)

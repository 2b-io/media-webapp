import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { Container, Description, Header } from 'ui/elements'
import { actions, selectors } from 'state/interface'
import { mapDispatch, mapState } from 'services/redux-helpers'

import _ForgotPasswordForm from './forgot-password-form'

const ForgotPasswordForm = reduxForm({
  form: 'fetchEmail',
  enableReinitialize: true
})(_ForgotPasswordForm)

const ForgotPassword=({ fetchEmail }) => {
  return (
    <main>
      <Container center size="small">
        <Header center> Forgot Password </Header>
        <Description justify> Enter your email address below and click on the &#39;Request reset password&#39; button </Description>
        <ForgotPasswordForm onSubmit={ fetchEmail } />
      </Container>
    </main>
  ) }

export default connect(
  mapState({
    status: selectors.status
  }),
  mapDispatch({
    fetchEmail: email => actions.fetchEmail(email)
  })
)(ForgotPassword)

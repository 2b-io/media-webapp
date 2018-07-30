import React, { Fragment } from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { Container, Description, Header, ErrorBox, SuccessBox, Link } from 'ui/elements'
import { actions } from 'state/interface'
import { mapDispatch } from 'services/redux-helpers'
import { stateful } from 'views/common/decorators'

import _ForgotPasswordForm from './forgot-password-form'

const ForgotPasswordForm = reduxForm({
  form: 'forgotPassword',
  enableReinitialize: true
})(_ForgotPasswordForm)

const ForgotPassword=({ forgotPassword, toSignIn, ui: { resultForgotPassword, errorFetchEmail } }) => {
  return (
    <main>
      <Container center size="small">
        { errorFetchEmail && <ErrorBox>Request reset password fail</ErrorBox> }
        { resultForgotPassword && <Fragment>
          <SuccessBox>Send request success</SuccessBox>
        </Fragment> ||
        <Fragment>
          <Header center> Forgot Password </Header>
          <Description justify> Enter your email address below and click on the &#39;Request reset password&#39; button </Description>
        </Fragment>
        }
        <ForgotPasswordForm onSubmit={ forgotPassword } />
        <Link href='/sign-in' onClick={ toSignIn }>Back to login</Link>
      </Container>
    </main>
  ) }

export default stateful({
  component: 'ResetPassword'
})(
  connect(
    null,
    mapDispatch({
      forgotPassword: email => actions.forgotPassword(email),
      toSignIn: () => actions.requestLocation('/sign-in')
    })
  )(ForgotPassword)
)

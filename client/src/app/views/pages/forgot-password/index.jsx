import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { Container, Description, Header, ErrorBox, SuccessBox } from 'ui/elements'
import { actions, selectors } from 'state/interface'
import { mapDispatch, mapState } from 'services/redux-helpers'
import { stateful } from 'views/common/decorators'

import _ForgotPasswordForm from './forgot-password-form'

const ForgotPasswordForm = reduxForm({
  form: 'fetchEmail',
  enableReinitialize: true
})(_ForgotPasswordForm)

const ForgotPassword=({ fetchEmail, toSignIn, ui: { resultFetchEmail, errorFetchEmail } }) => {
  return (
    <main>
      <Container center size="small">
        { errorFetchEmail && <ErrorBox>Request reset password fail</ErrorBox> }
        { resultFetchEmail && <React.Fragment>
          <SuccessBox>Send request success</SuccessBox>
        </React.Fragment> ||
        <React.Fragment>
          <Header center> Forgot Password </Header>
          <Description justify> Enter your email address below and click on the &#39;Request reset password&#39; button </Description>
        </React.Fragment>
        }
        <ForgotPasswordForm onSubmit={ fetchEmail } result={ resultFetchEmail } toSignIn={ toSignIn } />
      </Container>
    </main>
  ) }

export default stateful({
  component: 'ResetPassword'
})(
  connect(
    mapState({
      status: selectors.status
    }),
    mapDispatch({
      fetchEmail: email => actions.fetchEmail(email),
      toSignIn: () => actions.requestLocation('/sign-in')
    })
  )(ForgotPassword)
)

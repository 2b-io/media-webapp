import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { actions } from 'state/interface'
import { mapDispatch } from 'services/redux-helpers'
import { Break, Container, Link } from 'ui/elements'
import { Text } from 'ui/typo'

import StatelessForm from './form'

const ForgotPasswordForm = reduxForm({
  form: 'forgotPassword',
  enableReinitialize: true
})(StatelessForm)

const ForgotPassword=({
  forgotPassword,
  toSignIn,
  ui: {
    idle
  }
}) => (
  <Container>
    <ForgotPasswordForm
      onSubmit={ forgotPassword }
      idle={ idle }
    />
    <Break double />
    <Text mostLeft mostRight>
      Remember your password?<br />
      <Link
        href='/sign-in'
        onClick={ toSignIn }
      >
        Sign in now!
      </Link>
    </Text>
  </Container>
)


export default connect(
  null,
  mapDispatch({
    forgotPassword: email => actions.forgotPassword(email),
    toSignIn: () => actions.requestLocation('/sign-in')
  })
)(ForgotPassword)

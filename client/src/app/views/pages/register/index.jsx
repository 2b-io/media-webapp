import React, { Fragment } from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { mapDispatch } from 'services/redux-helpers'
import { actions } from 'state/interface'
import { Container, Link, Paragraph } from 'ui/elements'
import { stateful } from 'views/common/decorators'

import _RegisterForm from './form'

const RegisterForm = reduxForm({
  form: 'register',
  enableReinitialized: true
})(_RegisterForm)

const Register = ({
  register,
  toSignIn,
  ui: { idle, error, result }
}) => (
  <main>
    <Container center size="small">

      {
        result && (
          <Fragment>
            <div>Register completed</div>
          </Fragment>
        )
      }
      {
        !result && (
          <Fragment>
            {
              error && (
                <Fragment>
                  <span>Register failed</span>
                </Fragment>
              )
            }
            <Paragraph>
              Enter your email address
            </Paragraph>
            <RegisterForm
              onSubmit={ register }
              canSubmit={ idle }
            />
            <Paragraph>
              Have an account already?<br />
              <Link href="/sign-in" onClick={ toSignIn }>Sign in now!</Link>
            </Paragraph>
          </Fragment>
        )
      }
    </Container>
  </main>
)

export default stateful({
  component: 'Register'
})(
  connect(
    null,
    mapDispatch({
      register: ({ email }) => actions.register(email),
      toSignIn: () => actions.requestLocation('/sign-in')
    })
  )(Register)
)

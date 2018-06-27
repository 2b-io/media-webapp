import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { mapDispatch } from 'services/redux-helpers'
import { actions } from 'state/interface'
import { Container, Link, Paragraph } from 'ui/elements'

import _RegisterForm from './form'

const RegisterForm = reduxForm({
  form: 'register',
  enableReinitialized: true
})(_RegisterForm)

const Register = ({ register, toSignIn }) => (
  <main>
    <Container center size="small">
      <Paragraph>
        Enter your email address
      </Paragraph>
      <RegisterForm onSubmit={ register } />
      <Paragraph>
        Have an account already?<br />
        <Link href="/sign-in" onClick={ toSignIn }>Sign in now!</Link>
      </Paragraph>
    </Container>
  </main>
)

export default connect(
  null,
  mapDispatch({
    register: ({ email }) => actions.register(email),
    toSignIn: () => actions.requestLocation('/sign-in')
  })
)(Register)

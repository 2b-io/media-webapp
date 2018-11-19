import React from 'react'

import {
  Break,
  Form,
  ButtonGroup, LinkButton, PrimaryButton
} from 'ui/elements'
import { TextBox } from 'views/common/form'
import { validateRequired, validateEmail } from 'views/common/validate'

const SignInForm = ({
  handleSubmit,
  idle,
  toForgotPassword
}) => (
  <Form handleSubmit={ handleSubmit }>
    <TextBox
      label="Email"
      type="email"
      name="email"
      disabled={ !idle }
      validate={ [ validateRequired, validateEmail ] }
    />
    <Break />
    <TextBox
      label="Password"
      type="password"
      name="password"
      disabled={ !idle }
    />
    <Break double />
    <ButtonGroup
      primary={ () => (
        <PrimaryButton disabled={ !idle } type="submit">
          Sign in
        </PrimaryButton>
      ) }
      secondary={ () => (
        <div style={ { textAlign: 'center' } }>
          <LinkButton onClick={ toForgotPassword }>
            Can&apos;t sign in?
          </LinkButton>
        </div>
      ) }
    />
  </Form>
)

export default SignInForm

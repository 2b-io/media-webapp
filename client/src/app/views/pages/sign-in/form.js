import React from 'react'
import { TextBox  } from 'ui/redux-form'

import styled from 'styled-components'

const Form = styled.form`
`

const FormLine = styled.div`
  padding-bottom: 15px;
  text-align: center;
`

const SignInForm = ({ handleSubmit }) => (
  <Form onSubmit={ handleSubmit }>
    <FormLine>
      <TextBox
        type="email"
        name="email"
        placeholder="your email"
        autoFocus
      />
    </FormLine>
    <FormLine>
      <TextBox
        type="password"
        name="password"
        placeholder="your password"
      />
    </FormLine>
    <FormLine>
      <button type="submit">Sign In</button>
    </FormLine>
  </Form>
)

export default SignInForm

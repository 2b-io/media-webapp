import React from 'react'
import styled from 'styled-components'

import { Button } from 'ui/elements'
import { TextBox  } from 'ui/redux-form'

const Form = styled.form`
  padding-bottom: 10px;
`

const FormLine = styled.div`
  padding-bottom: ${
    ({ last = false }) => last ? 0 : '20px'
  };
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
    <FormLine last>
      <Button type="submit">Sign In</Button>
    </FormLine>
  </Form>
)

export default SignInForm

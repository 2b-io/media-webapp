import React from 'react'
import styled from 'styled-components'

import { SuccessIcon, ErrorIcon } from 'ui/icons'

const Container = styled.div`
  display: flex;
`
const Icon = styled.div`
  float: right;
  padding-top: 5px;
  color: ${
    ({ theme, error }) => error ? theme.error.base :theme.success.base
  }
`
const Input = styled.input.attrs({
  type: ({ type = 'text' }) => type,
})`
  appearance: none;
  background-color: inherit;
  color: inherit;
  border: none;
  border-bottom: 2px solid ${
    ({ disabled, readOnly, theme, error, valid, touched }) => (disabled || readOnly) ?
      theme.secondary.base :
      error && touched ? theme.error.base : valid ? theme.success.base : theme.primary.base
  };
  border-radius: 0;
  outline: none;
  padding: ${ ({ theme }) => theme.spacing.small };
  width: 100%;
  transition: border-bottom .3s linear;

  &:hover, &:focus {
    border-bottom: 2px solid ${
      ({ disabled, readOnly, theme, error, valid, touched }) => (disabled || readOnly) ?
        theme.secondary.base :
        error && touched ? theme.error.base : valid ? theme.success.base : theme.primary.base
    };
  }
`
const TextBox = (props) => (
  <Container>
    <Input { ...props } />
    <Icon error={ props.error }>
      {props.error && props.touched? <ErrorIcon  size='medium' /> : props.valid? <SuccessIcon size='medium' /> :''}
    </Icon>
  </Container>
)

export default TextBox

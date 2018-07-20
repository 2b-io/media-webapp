import React from 'react'
import styled from 'styled-components'

import { SuccessIcon, ErrorIcon } from 'ui/icons'

const Container = styled.div`
  position: relative;
  border-bottom: 2px solid ${
    ({ disabled, readOnly, theme, error, valid }) => (disabled || readOnly) ?
      theme.secondary.base : (
        error ? theme.error.base : (
          valid ? theme.success.base : theme.primary.base
        )
      )
  };
  &:hover, &:focus {
    border-bottom: 2px solid ${
      ({ disabled, readOnly, theme, error, valid }) => (disabled || readOnly) ?
        theme.secondary.light.base : (
          error ? theme.error.light.base : (
            valid ? theme.success.light.base : theme.primary.light.base
          )
        )
    };
  }
`
const Icon = styled.div`
  position: absolute;
  transform: translate3d(0, -50%, 0);
  top: 50%;
  right: ${ ({ theme }) => theme.spacing.small };
  color: ${
    ({ theme, error }) => error ? theme.error.base : theme.success.base
  }
`
const Input = styled.input.attrs({
  type: ({ type = 'text' }) => type,
})`
  appearance: none;
  background-color: inherit;
  color: inherit;
  border: none;
  border-radius: 0;
  outline: none;
  padding: ${ ({ theme }) => theme.spacing.small };
  padding-right: ${ ({ valid, error }) => valid || error && '44px' };
  width: 100%;
  transition: border-bottom .3s linear;
`
const TextBox = (props) => (
  <Container { ...props } >
    <Input { ...props } />
    <Icon error={ props.error }>
      { props.error && <ErrorIcon size="medium" /> }
      { props.valid && <SuccessIcon size="medium" /> }
    </Icon>
  </Container>
)

export default TextBox

import React from 'react'
import styled, { css } from 'styled-components'

import { SuccessIcon, ErrorIcon } from 'ui/icons'

const Container = styled.div`
  position: relative;
  border-bottom: 2px solid ${
    ({ disabled, readOnly, theme, invalid, valid }) => (disabled || readOnly) ?
      theme.secondary.base : (
        invalid ? theme.error.base : (
          valid ? theme.success.base : theme.primary.base
        )
      )
  };
  &:hover, &:focus {
    border-bottom: 2px solid ${
      ({ disabled, readOnly, theme, invalid, valid }) => (disabled || readOnly) ?
        theme.secondary.light.base : (
          invalid ? theme.error.light.base : (
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
    ({ theme, invalid }) => invalid ? theme.error.base : theme.success.base
  }
`
const commonStyle = css`
  appearance: none;
  background-color: inherit;
  color: inherit;
  border: none;
  border-radius: 0;
  outline: none;
  padding: ${ ({ theme }) => theme.spacing.small };
  padding-right: ${ ({ valid, invalid }) => valid || invalid && '44px' };
  width: 100%;
  transition: border-bottom .3s linear;
`

const Input = styled.input.attrs({
  type: ({ type = 'text' }) => type
})`
  ${ commonStyle }
`
const TextArea = styled.textarea.attrs({
  type: ({ type = 'text' }) => type,
  rows: ({ rows = 5 }) => rows
})`
  ${ commonStyle }
  resize: none;
`

const TextBox = ({ valid, invalid, multiline, ...props }) => (
  <Container valid={ valid } invalid={ invalid } >
    { multiline ? <TextArea valid={ valid } invalid={ invalid } rows={ multiline } { ...props } /> : <Input valid={ valid } invalid={ invalid } { ...props } /> }
    <Icon invalid={ invalid }>
      { invalid && <ErrorIcon size="medium" /> }
      { valid && <SuccessIcon size="medium" /> }
    </Icon>
  </Container>
)

export default TextBox

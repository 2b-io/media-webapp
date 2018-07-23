import React from 'react'
import styled, { css } from 'styled-components'

import { SuccessIcon, ErrorIcon } from 'ui/icons'

const border = color => css`
  border: 1px solid ${ color.base };

  &:hover, focus {
    border: 1px solid ${ color.light.base };
  }
`

const iconColor = (selector, color) => css`
  ${ selector } {
    color: ${ color.base };
  }

  &:hover, &:focus {
    ${ selector } {
      color: ${ color.light.base }
    }
  }
`

const TrailingIcon = styled.div`
  position: absolute;
  transform: translate3d(0, -50%, 0);
  top: 50%;
  right: ${ ({ theme }) => theme.spacing.small };
`

const Container = styled.div`
  position: relative;
  transition: border .3s linear;
  background: ${ ({ theme }) => theme.white.base };
  color: ${ ({ theme }) => theme.white.on.base };
  ${
    ({ disabled, readOnly, theme, invalid, valid }) => (disabled || readOnly) ?
      border(theme.secondary) : (
        invalid ?
          border(theme.error) : (
            valid ?
              border(theme.success)
              : border(theme.primary)
          )
      )
  };

  ${
    ({ theme, invalid }) => invalid ?
      iconColor(TrailingIcon, theme.error) :
      iconColor(TrailingIcon, theme.success)
  }
`

const commonStyle = css`
  display: block;
  appearance: none;
  background-color: inherit;
  color: inherit;
  border: none;
  border-radius: 0;
  outline: none;
  padding: ${ ({ theme }) => theme.spacing.small };
  padding-right: ${ ({ valid, invalid }) => (valid || invalid) && '44px' };
  width: 100%;
  cursor: ${
    ({ disabled, readOnly }) => (disabled || readOnly) ? 'not-allowed' : 'inherit'
  };

  &::placeholder {
    color: ${ ({ theme }) => theme.secondary.limpid.base };
  }
`

const Input = styled.input.attrs({
  type: ({ type = 'text' }) => type
})`
  ${ commonStyle }
`
const TextArea = styled.textarea.attrs({
  rows: ({ rows = 5 }) => rows
})`
  ${ commonStyle }
  resize: none;
`

const Label = styled.label`
  font-size: 0.9em;
  position: absolute;
  z-index: 1;
  top: 0;
  left: 6px;
  background: white;
  line-height: ${ ({ theme }) => theme.spacing.medium };
  height: ${ ({ theme }) => theme.spacing.medium };
  padding: ${ ({ theme }) => `0 ${ theme.spacing.tiny }` };
`

const Wrapper = styled.div`
  position: relative;
  padding-top: ${
    ({ theme }) => theme.spacing.small
  };
  padding-bottom: ${
    ({ theme }) => theme.spacing.medium
  };
`

const ErrorMessage = styled.div`
  padding: ${
    ({ theme: { spacing } }) => `
      ${ spacing.tiny }
      ${ spacing.small }
    `
  };
  border: 1px solid ${ ({ theme }) => theme.error.base };
  background: ${ ({ theme }) => theme.error.base };
  color: ${ ({ theme }) => theme.error.on.base };
`

const TextBox = ({
  label,
  multiline,
  invalid,
  valid,
  ...props
}) => (
  <Wrapper>
    <Container valid={ valid } invalid={ invalid } { ...props }>
      { multiline ?
        <TextArea
          valid={ valid }
          invalid={ invalid }
          { ...props }
        /> :
        <Input
          valid={ valid }
          invalid={ invalid }
          { ...props }
        />
      }
      { (valid || invalid) &&
        <TrailingIcon invalid={ invalid }>
          { invalid && <ErrorIcon size="medium" /> }
          { valid && <SuccessIcon size="medium" /> }
        </TrailingIcon>
      }
    </Container>
    { invalid &&
      <ErrorMessage>{ invalid }</ErrorMessage>
    }
    { label &&
      <Label>{ label }</Label>
    }
  </Wrapper>
)

export default TextBox

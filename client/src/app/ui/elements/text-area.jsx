import React from 'react'
import styled, { css } from 'styled-components'

import { AssistiveTextLine } from 'ui/typo'

const border = color => css`
  border-bottom: 1px solid ${ color.base };

  &:hover, focus {
    border-bottom: 1px solid ${ color.light.base };
  }
`

const Container = styled.div`
  display: grid;
  & > * {
    min-width: 0;
    min-height: 0;
  }

  position: relative;
  background: ${ ({ theme }) => theme.white.base };
  color: ${ ({ theme }) => theme.white.on.base };
  grid-template-columns: 100%;
`

const commonStyle = css`
  display: inline-block;
  appearance: none;
  background-color: inherit;
  color: inherit;
  border: none;
  border-radius: 0;
  outline: none;
  width: 100%;
  line-height: 24px;
  padding: 0 8px;
  cursor: ${
    ({ disabled, readOnly }) => (disabled || readOnly) ? 'not-allowed' : 'inherit'
  };

  &::placeholder {
    color: ${ ({ theme }) => theme.secondary.limpid.base };
  }
`

const InputArea = styled.textarea.attrs({
  rows: ({ rows = 4 }) => rows
})`
  ${ commonStyle }
  resize: none;
`

const Wrapper = styled.div`
  position: relative;
`

const Indicator = styled.div`
  position: absolute;
  bottom: 24px;
  left: 0;
  right: 0;
  height: 1px;
  transition: border .3s linear;
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
`

const ErrorTextColor = styled.div`
  color: ${ ({ theme }) => theme.error.base };
`

const TextArea = ({
  invalid,
  valid,
  ...props
}) => (
  <Wrapper>
    <Container valid={ valid } invalid={ invalid } { ...props }>
      <InputArea
        valid={ valid }
        invalid={ invalid }
        { ...props }
      />
    </Container>
    <Indicator valid={ valid } invalid={ invalid } { ...props } />
    {
      <ErrorTextColor>
        <AssistiveTextLine mostLeft mostRight>{ invalid }</AssistiveTextLine>
      </ErrorTextColor>
    }
  </Wrapper>
)

export default TextArea

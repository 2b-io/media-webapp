import React from 'react'
import styled, { css } from 'styled-components'

import { SuccessIcon, ErrorIcon } from 'ui/icons'

const border = color => css`
  border-bottom: 1px solid ${ color.base };

  &:hover, focus {
    border-bottom: 1px solid ${ color.light.base };
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
  height: 32px;
  position: relative;
  padding: 0 8px;
  display: grid;
  grid-gap: 8px;
  background: ${ ({ theme }) => theme.white.base };
  color: ${ ({ theme }) => theme.white.on.base };
  ${
    ({ theme, invalid }) => invalid ?
      iconColor(TrailingIcon, theme.error) :
      iconColor(TrailingIcon, theme.success)
  };
  ${
    ({ leading, trailing }) => {
      if(leading && trailing){
        return css`
          grid-template-columns: 32px 1fr 32px;
        `
      }
      if(leading && !trailing){
        return css`
          grid-template-columns: 32px 1fr;
        `
      }
      if(!leading && trailing){
        return css`
          grid-template-columns: 1fr 32px;
        `
      }
      return css`
        grid-template-columns: 100%;
      `
    }
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
`

const Indicator = styled.div`
  position: absolute;
  top: 32px;
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

const AssistiveText = styled.div`
  padding: 0 8px;
  height: 16px;
  line-height: 16px;
  font-size: 10px;
  color: ${ ({ theme }) => theme.error.base };
`

const Leading = styled.div`
  display: flex;
  align-item: center;
  justify-content: center;
`
const Trailing = styled.div`
  display: flex;
  align-item: center;
  justify-content: center;
`

const TextBox = ({
  label,
  multiline,
  invalid,
  valid,
  leading,
  trailing,
  ...props
}) => (
  <Wrapper>
    <Container valid={ valid } invalid={ invalid } leading={ leading } trailing={ trailing } { ...props }>
      { leading && (
        <Leading>
          { leading }
        </Leading>
      ) }
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
      { /*(valid || invalid) &&
        <TrailingIcon invalid={ invalid } >
          { invalid && <ErrorIcon size="medium" /> }
          { valid && <SuccessIcon size="medium" /> }
        </TrailingIcon>*/
      }
      { trailing && (
        <Trailing>
          { trailing }
        </Trailing>
      ) }
    </Container>
    <Indicator valid={ valid } invalid={ invalid } { ...props }/>
    {
      <AssistiveText>{ invalid }</AssistiveText>
    }
    { //label &&
      // <Label>{ label }</Label>
    }
  </Wrapper>
)

export default TextBox

import React from 'react'
import styled from 'styled-components'

import { AssistiveTextLine } from 'ui/typo'

const Container = styled.div`
  display: grid;
  & > * {
    min-width: 0;
    min-height: 0;
  }

  position: relative;
  background: ${ ({ theme }) => theme.white.base };
  color: ${ ({ theme }) => theme.white.on.base };
  grid-template-columns:
    ${ ({ hasLeading }) => hasLeading && '40px' }
    1fr
    ${ ({ hasTrailing }) => hasTrailing && '40px' };
`

const Input = styled.input.attrs({
  type: 'text'
})`
  display: block;
  appearance: none;
  border: none;
  border-radius: 0;
  outline: none;
  width: auto;
  line-height: 40px;
  height: 40px;
  background: ${ ({ theme }) => theme.white.base };
  color: ${
    ({ disabled, theme }) => disabled ?
      theme.secondary.base :
      theme.black.base
  };
  ${ ({ hasLeading }) => !hasLeading && 'padding-left: 8px;' }
  ${ ({ hasTrailing }) => !hasTrailing && 'padding-right: 8px;' }
  cursor: ${
    ({ disabled, readOnly }) => (disabled || readOnly) ? 'not-allowed' : 'inherit'
  };

  &::placeholder {
    color: ${ ({ theme }) => theme.secondary.limpid.base };
  }

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    appearance: none;
    margin: 0;
  }
`

const Wrapper = styled.div`
`

const Indicator = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: ${
    ({ disabled, theme }) => disabled ?
      theme.secondary.base :
      theme.black.base
  };
`

const Assistive = styled.div`
  display: grid;
  & > * {
    min-height: 0;
    min-width: 0;
  }
  grid-template-columns: 1fr min-content;
`

const TextBox = ({
  invalid,
  leading,
  trailing,
  ...props
}) => (
  <Wrapper>
    <Container
      hasLeading={ !!leading }
      hasTrailing={ !!trailing }
    >
      { leading && leading() }
      <Input
        hasLeading={ !!leading }
        hasTrailing={ !!trailing }
        { ...props }
      />
      { trailing && trailing() }
      <Indicator disabled={ props.disabled } />
    </Container>
    <Assistive>
      { props.readOnly &&
        <AssistiveTextLine mostLeft mostRight>
          Read only
        </AssistiveTextLine> ||
        <AssistiveTextLine mostLeft mostRight variant="error">
          { invalid }
        </AssistiveTextLine>
      }
      { props.maxLength &&
        <AssistiveTextLine mostLeft mostRight>
          { props.value.length }/{ props.maxLength }
        </AssistiveTextLine>
      }
    </Assistive>
  </Wrapper>
)

export default TextBox

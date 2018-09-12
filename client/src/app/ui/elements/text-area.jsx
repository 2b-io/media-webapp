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
`

const InputArea = styled.textarea.attrs({
  rows: ({ rows = 4 }) => rows
})`
  display: block;
  appearance: none;
  background-color: white;
  color: black;
  border: none;
  border-radius: 0;
  outline: none;
  width: auto;
  line-height: 24px;
  padding: 0 8px;
  resize: none;
  cursor: ${
    ({ disabled, readOnly }) => (disabled || readOnly) ? 'not-allowed' : 'inherit'
  };

  &::placeholder {
    color: ${ ({ theme }) => theme.secondary.limpid.base };
  }

  &::-webkit-scrollbar {
    width: 1px;
  }
  &::-webkit-scrollbar-track {
    background: rgba(0,0,0,0);
  }
`

const Wrapper = styled.div`
  position: relative;
`

const Indicator = styled.div`
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 2px;
  background: ${ ({ theme }) => theme.black.base };
`

const TextArea = ({
  invalid,
  valid,
  ...props
}) => (
  <Wrapper>
    <Container>
      <InputArea
        valid={ valid }
        invalid={ invalid }
        { ...props }
      />
    </Container>
    <Indicator />
    <AssistiveTextLine
      mostLeft mostRight
      variant="error">
      { invalid }
    </AssistiveTextLine>
  </Wrapper>
)

export default TextArea

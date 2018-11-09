import React, { Fragment } from 'react'
import styled from 'styled-components'

import { CheckedBox, UncheckedBox } from 'ui/icons'
import { TextLine } from 'ui/typo'

const Wrapper = styled.label`
  display: grid;
  & > * {
    min-width: 0;
    min-height: 0;
  }

  height: 40px;
  grid-template-columns: 1fr 40px;
  user-select: none;
  cursor: ${
    ({
      disabled,
      theme: { mouseDetected }
    }) => disabled ? 'not-allowed' : (
      mouseDetected ? 'pointer' : 'unset'
    )
  };
  &:hover {
    background-color: ${
      ({ theme }) => theme.mouseDetected && !theme.touchDetected ?
        theme.hoverColor :
        'unset'
    }
  }
`

const Switch = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${
    ({ disabled, theme }) => disabled ?
      theme.secondary.base :
      theme.black.base
  };
`

const Input = styled.input.attrs({
  type: 'checkbox'
})`
  display: none;
`

const CheckBox = ({
  label,
  description,
  ...props
}) => (
  <Fragment>
    <Wrapper>
      { label && <TextLine mostLeft>{ label }</TextLine> }
      <Switch disabled={ props.disabled }>
        <Input { ...props } checked={ props.value } />
        { props.value &&
          <CheckedBox /> ||
          <UncheckedBox />
        }
      </Switch>
    </Wrapper>
    { description && description() }
  </Fragment>
)

export default CheckBox

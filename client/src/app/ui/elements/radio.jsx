import React, { Fragment } from 'react'
import styled from 'styled-components'

import { CheckedRadio, UncheckedRadio } from 'ui/icons'
import { TextLine } from 'ui/typo'

const Wrapper = styled.label`
  display: grid;
  & > * {
    min-width: 0;
    min-height: 0;
  }

  height: 40px;
  grid-template-columns: 1fr 40px;
`

const Switch = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${
    ({ disabled, theme }) => disabled ?
      '#e6e6e6' :
      theme.black.base
  };
`

const Input = styled.input.attrs({
  type: 'radio'
})`
  display: none;
`

const Radio = ({ label, description, ...props }) => {
  const checked = props.choice === props.value

  return (
    <Fragment>
      <Wrapper>
        { label && <TextLine mostLeft>{ label }</TextLine> }
        <Switch disabled={ props.disabled }>
          <Input { ...props }
            checked={ checked }
            value={ props.choice }
          />
          { checked && <CheckedRadio /> || <UncheckedRadio /> }
        </Switch>
      </Wrapper>
      { description && description() }
    </Fragment>
  )
}

export default Radio

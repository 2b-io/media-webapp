import React, { Fragment } from 'react'
import styled from 'styled-components'

import { CheckIcon } from 'ui/icons'
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
`

const Circle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 100%;
  border: 1px solid black;
  width: 24px;
  height: 24px;
`

const Input = styled.input.attrs({
  type: 'radio'
})`
  display: none;
`

const Radio = ({ label, description, ...props) => (
  <Fragment>
    <Wrapper>
      { label &&  <TextLine mostLeft>{ label }</TextLine> }
      <Switch>
        <Input { ...props } />
        <Circle>
          { props.checked && <CheckIcon /> }
        </Circle>
      </Switch>
    </Wrapper>
    { description &&  description() }
  </Fragment>
)

export default Radio

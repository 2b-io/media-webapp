import React from 'react'
import styled from 'styled-components'

import { CheckIcon } from 'ui/icons'
import { TextLine } from 'ui/typo'

const Wrapper = styled.div`
  display: grid;
  & > * {
    min-width: 0;
    min-height: 0;
  }

  height: 40px;
  grid-template-columns: 1fr 40px;
`

const Switch = styled.label`
  padding-right: 8px;
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Button = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Circle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
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

const Radio = (props) => (
  <Wrapper>
    { props.label &&
      <TextLine mostLeft>{ props.label }</TextLine>
    }
    <Switch>
      <Button>
        <Input { ...props } />
        <Circle>
          { props.checked &&
            <CheckIcon />
          }
        </Circle>
      </Button>
    </Switch>
  </Wrapper>
)

export default Radio

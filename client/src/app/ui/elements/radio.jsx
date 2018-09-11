import React from 'react'
import styled from 'styled-components'

import { CheckIcon } from 'ui/icons'
import { DescriptionTextLine } from 'ui/typo'

const Wrapper = styled.div`
  display: grid;
  grid-gap: 8px;
  height: 40px;
  grid-template-columns: 1fr 32px;
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
const Label = styled.label`
  align-items: center;
  display: flex;
  flex-wrap: nowrap;
  padding-left: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  background: ${ ({ theme }) => theme.white.base };
  color: ${ ({ theme }) => theme.white.on.base };
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

const Radio = ({
  ...props
}) => (
  <Wrapper>
    { props.label &&
      <Label>
        <DescriptionTextLine>{ props.label }</DescriptionTextLine>
      </Label>
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

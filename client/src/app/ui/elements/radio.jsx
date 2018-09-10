import React from 'react'
import styled, { css } from 'styled-components'

import { CheckIcon } from 'ui/icons'

const Wrapper = styled.div`
  padding: 0 8px;
  display: grid;
  grid-gap: 8px;
  height: 32px;
  grid-template-columns: 1fr 32px;
`

const Switch = styled.label`
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
  font-size: 12px;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  background: ${ ({ theme }) => theme.white.base };
  color: ${ ({ theme }) => theme.white.on.base };
  font-weight: ${ ({ fontWeight }) => fontWeight};
`

const Circle = styled.div`

  border-radius: 100%;
  border: 1px solid black;
  width: 24px;
  height: 24px;
`

const Input = styled.input.attrs({
  type: 'radio'
})`
  display:none;
`

const Radio = ({
  label,
  ...props
}) => (
  <Wrapper>
    { label &&
      <Label fontWeight={ props.fontWeight }>{ label }</Label>
    }
    <Switch>
      <Button>
        <Input { ...props } checked={ props.value }/>

        <Circle>
          { props.value &&
            <CheckIcon />
          }
        </Circle>

      </Button>
    </Switch>
  </Wrapper>
)

export default Radio

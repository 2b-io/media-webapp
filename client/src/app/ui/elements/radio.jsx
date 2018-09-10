import React from 'react'
import styled, { css } from 'styled-components'

const Wrapper = styled.div`
  padding: 0 8px;
  display: grid;
  grid-gap: 8px;
  height: 32px;
  grid-template-columns: 1fr 32px;
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

const Input = styled.input.attrs({
  type: 'radio'
})`
  display: block;
  &:checked :before {
    background-color: ${ ({ theme }) => theme.primary.base };
    transform: translate3d(100%, 0, 0);
  }
`

const Radio = ({
  label,
  ...props
}) => (
  <Wrapper>
    { label &&
      <Label fontWeight={ props.fontWeight }>{ label }</Label>
    }
    <Button>
      <Input { ...props } defaultChecked={ props.value }/>
    </Button>
  </Wrapper>
)

export default Radio

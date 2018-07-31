import React from 'react'
import styled, { css } from 'styled-components'

const border = color => css`
  border: 1px solid ${ color.base };

  &:hover, focus {
    border: 1px solid ${ color.light.base };
  }
`
const Container = styled.div`
  position: relative;
  transition: border .3s linear;
  background: ${ ({ theme }) => theme.white.base };
  color: ${ ({ theme }) => theme.white.on.base };
  ${
    ({ disabled, readOnly, theme }) =>
      (disabled || readOnly) ? border(theme.secondary) : border(theme.primary)
  };
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
  padding-top: ${
    ({ theme }) => theme.spacing.small
  };
  padding-bottom: ${
    ({ theme }) => theme.spacing.medium
  };
`

const Input = styled.input.attrs({
  type: 'checkbox'
})`
  width: 20px;
  height: 20px;
  display: block;
  margin: ${ ({ theme }) => theme.spacing.small };
`

const CheckBox = ({ label, ...props }) => (
  <Wrapper>
    <Container { ...props }>
      <div>
        <Input { ...props } />
      </div>
    </Container>
    { label &&
      <Label>{ label }</Label>
    }
  </Wrapper>
)

export default CheckBox

import React from 'react'
import styled, { css } from 'styled-components'

const border = color => css`
  border: 1px solid ${ color.base };

  &:hover, focus {
    border: 1px solid ${ color.light.base };
  }
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

const Container = styled.div`
  position: relative;
  width: 50%;
  min-width: 200px;
  transition: border .3s linear;
  background: ${ ({ theme }) => theme.white.base };
  color: ${ ({ theme }) => theme.white.on.base };
  ${
    ({ disabled, readOnly, theme }) =>
      (disabled || readOnly) ? border(theme.secondary) : border(theme.primary)
  };

`

const Button = styled.div`
  min-width: 200px;
`

const Label = styled.label`
  font-size: 0.9em;
  position: absolute;
  z-index: 1;
  top: 0;
  left: 6px;
  background: ${ ({ theme }) => theme.background.base };;
  line-height: ${ ({ theme }) => theme.spacing.medium };
  height: ${ ({ theme }) => theme.spacing.medium };
  padding: ${ ({ theme }) => `0 ${ theme.spacing.tiny }` };
`

const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 100%;
  height: 34px;
  margin: ${ ({ theme }) => theme.spacing.small } 0 ${ ({ theme }) => theme.spacing.tiny };
`
const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${ ({ theme }) => theme.secondary.opaque.base };
  transition: .4s;
  margin: 0 ${ ({ theme }) => theme.spacing.small };

  &:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 50%;
    left: 0;
    bottom: 4px;
    background-color: ${ ({ theme }) => theme.white.base };
    transition: .4s;
  }

`

const Input = styled.input.attrs({
  type: 'checkbox'
})`
  display:none;

  &:checked + ${ Slider } {
    background-color: ${ ({ theme }) => theme.primary.base };;
  }

  &:checked + ${ Slider } {
    &:before {
      transform: translateX(100%);
    }
  }
`

const CheckBox = ({ label, ...props }) => (
  <Wrapper>
    <Container { ...props }>
      <Switch>
        <Button>
          <Input { ...props } />
          <Slider />
        </Button>
      </Switch>
    </Container>
    { label &&
      <Label>{ label }</Label>
    }
  </Wrapper>
)

export default CheckBox

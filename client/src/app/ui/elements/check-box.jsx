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
  display: inline-flex;
  transition: border .3s linear;
  background: ${ ({ theme }) => theme.white.base };
  color: ${ ({ theme }) => theme.white.on.base };
  padding: ${
    ({ theme }) => theme.spacing.small
  };
  ${
    ({ disabled, readOnly, theme }) =>
      (disabled || readOnly) ? border(theme.secondary) : border(theme.primary)
  };
`

const Button = styled.div`
  width: 100%;
  display: flex;
  text-align: center;
  justify-content: center;
`

const State = styled.span`
  width: 100px;
  flex-basis: 50%;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const Label = styled.label`
  font-size: 0.9em;
  position: absolute;
  z-index: 1;
  top: 0;
  left: 6px;
  background: ${ ({ theme }) => theme.background.base };
  line-height: ${ ({ theme }) => theme.spacing.medium };
  height: ${ ({ theme }) => theme.spacing.medium };
  padding: ${ ({ theme }) => `0 ${ theme.spacing.tiny }` };
`

const Switch = styled.label`
  position: relative;
  display: block;
  width: 100%;
`

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  &:before {
    position: absolute;
    content: "";
    height: 100%;
    width: 50%;
    left: 0;
    background-color: ${ ({ theme }) => theme.secondary.base };
    transition: transform .3s linear;
  }
`

const Input = styled.input.attrs({
  type: 'checkbox'
})`
  display:none;

  &:checked + ${ Slider }:before {
    background-color: ${ ({ theme }) => theme.primary.base };
    transform: translate3d(100%, 0, 0);
  }
`

const CheckBox = ({
  label,
  checkedText, uncheckedText,
  ...props
}) => (
  <Wrapper>
    <Container { ...props }>
      <Switch>
        <Button>
          <State>{ checkedText }</State>
          <State>{ uncheckedText }</State>
          <Input { ...props } checked={ props.value } />
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

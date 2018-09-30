import React from 'react'
import styled from 'styled-components'

const Button = styled.button.attrs({
  type: ({ type = 'button' }) => type
})`
  appearance: none;
  margin: 0;
  background: none;
  padding: 0;
  white-space: nowrap;
  cursor: pointer;
  text-decoration: underline;
  border: none;
  outline: none;
  cursor: ${
    ({ disabled }) => disabled ? 'not-allowed' : 'pointer'
  };
  &:focus {
    outline: none;
  }
`
const Wrapper = styled.div`
  text-align: center;
  display: block;
  line-height: 40px;
  height: 40px;
`
const ButtonText = ({ ...props }) =>(
  <Wrapper>
    <Button { ...props } />
  </Wrapper>
)

ButtonText.Group = styled.div`
  display: inline-flex;

  & > ${ ButtonText } {
    margin-right: ${
      ({ theme, loosed }) => loosed ?
        theme.spacing.medium :
        theme.spacing.small
    };

    &:last-child {
      margin-right: 0;
    }
  }
`

export default ButtonText

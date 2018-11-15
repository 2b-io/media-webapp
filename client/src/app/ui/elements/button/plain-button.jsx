import styled, { css } from 'styled-components'

const PlainButton = styled.button.attrs({
  type: ({ type = 'button' }) => type
})`
  appearance: none;
  border: none;
  outline: none;
  background: transparent;
  margin: 0;
  white-space: nowrap;
  line-height: 40px;
  height: 40px;
  cursor: ${
    ({
      disabled,
      theme: { mouseDetected }
    }) => disabled ? 'not-allowed' : (
      mouseDetected ? 'pointer' : 'unset'
    )
  };

  ${
    ({ theme }) => theme.mouseDetected && !theme.touchDetected &&
      css`
        transition:  opacity .3s;
        &:hover {
          opacity: 0.7;
        }
      `
  }

  &:focus {
    outline: none;
  }
`

export default PlainButton

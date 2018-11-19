import styled, { css } from 'styled-components'

const LinkButton = styled.button.attrs({
  type: ({ type = 'button' }) => type
})`
  appearance: none;
  margin: 0;
  background: none;
  white-space: nowrap;
  cursor: pointer;
  text-decoration: underline;
  border: none;
  outline: none;
  line-height: 40px;
  height: 40px;
  padding: 0 8px;
  &:focus {
    outline: none;
  }
  ${
    ({ disabled, theme: { mouseDetected } }) => mouseDetected && css`
      cursor: ${ disabled ? 'not-allowed' : 'pointer' };
    `
  }
  ${
    ({ disabled, theme }) => css`
      color: ${
        disabled ?
          theme.secondary.base :
          theme.black.base
      };

      ${
        !disabled && theme.mouseDetected && !theme.touchDetected && css`
          &:hover {
            color: ${ theme.black.light.base };
          }
        `
      }
    `
  }
`

export default LinkButton

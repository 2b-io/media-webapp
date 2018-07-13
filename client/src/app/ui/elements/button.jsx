import styled, { css } from 'styled-components'

const Button = styled.button.attrs({
  type: ({ type = 'button' }) => type
})`
  appearance: none;
  cursor: pointer;
  display: inline-flex;

  &:focus {
    outline: none;
  }

  ${
    ({ plain }) => plain ?
      css`
        background: transparent;
        border: none;
        outline: none;
        padding: 0;
        margin: 0;
      ` :
      css`
        padding: 0 15px;
        line-height: 2.5em;
        border: none;
        background: ${ ({ theme }) => theme.primary.base };
        color: ${ ({ theme }) => theme.primary.on.base };
        transition: background .3s linear;

        &:hover {
          background: ${ ({ theme }) => theme.primary.light.base };
          color: ${ ({ theme }) => theme.primary.light.on.base };
        }
      `
  }
`

export default Button

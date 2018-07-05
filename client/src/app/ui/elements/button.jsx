import styled, { css } from 'styled-components'

import { LIGHT0, LIGHT1, LIGHT3 } from 'ui/color-palettes'

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
        border: 1px solid ${ LIGHT3 };
        padding: 0 15px;
        line-height: 2.5em;
        border-radius: 5px;
        background: ${ LIGHT0 };
        transition: background .3s linear;

        &:hover {
          background: ${ LIGHT1 };
        }
      `
  }
`

export default Button

import styled from 'styled-components'

import { LIGHT3, LIGHT4 } from 'ui/color-palettes'

const TextBox = styled.input.attrs({
  type: ({ type = 'text' }) => type,
  defaultValue: ({ defaultValue }) => defaultValue
})`
  appearance: none;
  background-color: transparent;
  border: none;
  border-bottom: 2px solid ${ LIGHT3 };
  border-radius: 0;
  outline: none;
  padding: 10px;
  width: 100%;
  transition: border-bottom .3s linear;
  &:hover, &:focus {
    border-bottom: 2px solid ${ LIGHT4 };
  }
`

export default TextBox

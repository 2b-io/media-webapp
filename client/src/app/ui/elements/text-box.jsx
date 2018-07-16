import styled from 'styled-components'

const TextBox = styled.input.attrs({
  type: ({ type = 'text' }) => type,
  defaultValue: ({ defaultValue }) => defaultValue
})`
  appearance: none;
  background-color: inherit;
  color: inherit;
  border: none;
  border-bottom: 2px solid ${ ({ theme }) => theme.primary.base };
  border-radius: 0;
  outline: none;
  padding: 10px;
  width: 100%;
  transition: border-bottom .3s linear;
  &:hover, &:focus {
    border-bottom: 2px solid ${ ({ theme }) => theme.primary.dark.base };
  }
`

export default TextBox

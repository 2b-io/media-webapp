import styled from 'styled-components'

const TextArea = styled.textarea.attrs({
  type: ({ type = 'text' }) => type,
  rows: ({ rows = 5 }) => rows
})`
  appearance: none;
  background-color: transparent;
  border: none;
  border-bottom: 2px solid ${ ({ theme }) => theme.primary.base };
  border-radius: 0;
  outline: none;
  padding: ${ ({ theme }) => theme.spacing.small };
  width: 100%;
  resize: none;
  transition: border-bottom .3s linear;
  &:hover, &:focus {
    border-bottom: 2px solid ${ ({ theme }) => theme.primary.light.base };
  }
`

export default TextArea

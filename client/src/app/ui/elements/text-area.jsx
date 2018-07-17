import styled from 'styled-components'

const TextArea = styled.textarea.attrs({
  type: ({ type = 'text' }) => type,
  rows: ({ rows = 5 }) => rows
})`
  appearance: none;
  background-color: inherit;
  color: inherit;
  border: none;
  border-bottom: 2px solid ${
    ({ disabled, readOnly, theme }) => (disabled || readOnly) ?
      theme.secondary.base :
      theme.primary.base
  };
  border-radius: 0;
  outline: none;
  padding: ${ ({ theme }) => theme.spacing.small };
  width: 100%;
  resize: none;
  transition: border-bottom .3s linear;
  &:hover, &:focus {
    border-bottom: 2px solid ${
      ({ disabled, readOnly, theme }) => (disabled || readOnly) ?
        theme.secondary.light.base :
        theme.primary.light.base
    }
  }
`

export default TextArea

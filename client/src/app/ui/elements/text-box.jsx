import styled from 'styled-components'

const TextBox = styled.input.attrs({
  type: ({ type = 'text' }) => type
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
  transition: border-bottom .3s linear;
  &:hover, &:focus {
    border-bottom: 2px solid ${
      ({ disabled, readOnly, theme }) => (disabled || readOnly) ?
        theme.secondary.light.base :
        theme.primary.light.base
    };
  }
`

export default TextBox

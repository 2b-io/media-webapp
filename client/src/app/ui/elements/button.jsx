import styled, { css } from 'styled-components'

const Button = styled.button.attrs({
  type: ({ type = 'button' }) => type
})`
  appearance: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  margin: 0;

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
      ` :
      css`
        padding: ${ ({ theme }) => `0 ${ theme.spacing.medium }` };
        line-height: 2.5em;
        border: none;
        background: ${
          ({ disabled, theme }) => disabled ?
            theme.secondary.base :
            theme.primary.base
        };
        color: ${
          ({ disabled, theme }) => disabled ?
            theme.secondary.on.base :
            theme.primary.on.base
        };
        transition: background .3s linear;

        &:hover {
          background: ${
            ({ disabled, theme }) => disabled ?
              theme.secondary.light.base :
              theme.primary.light.base
          };
          color: ${
            ({ disabled, theme }) => disabled ?
              theme.secondary.light.on.base :
              theme.primary.light.on.base
          };
        }

        &:active {
          background: ${
            ({ disabled, theme }) => disabled ?
              theme.secondary.dark.base :
              theme.primary.dark.base
          };
          color: ${
            ({ disabled, theme }) => disabled ?
              theme.secondary.dark.on.base :
              theme.primary.dark.on.base
          };
        }
      `
  }
`

Button.Group = styled.div`
  display: inline-flex;

  & > ${ Button } {
    margin-right: ${ ({ theme }) => theme.spacing.small };

    &:last-child {
      margin-right: 0;
    }
  }
`

export default Button

import styled, { css } from 'styled-components'

const Button = styled.button.attrs({
  type: ({ type = 'button' }) => type
})`
  appearance: none;
  display: inline-flex;
  align-items: center;
  margin: 0;
  transition: background .3s linear;
  transition: color .3s linear;
  cursor: ${
    ({ disabled }) => disabled ? 'not-allowed' : 'pointer'
  };

  ${
    ({ disabled, plain, theme, variant }) => (variant || plain) ?
      css`
        text-transform: uppercase;
        border: none;
        outline: none;
        ${
          plain && `
            padding: 0;
            background: transparent;
          `
        }
        ${
          variant && `
            padding: 0 ${ theme.spacing.small };
            line-height: 2.5em;
            background: ${ theme.background.base };
            font-weight: 600;
            color: ${
              disabled ?
                theme.secondary.base :
                theme[variant].base
            };

            &:hover {
              color: ${
                disabled ?
                  theme.secondary.light.base :
                  theme[variant].light.base
              };
            }

            &:active {
              color: ${
                disabled ?
                  theme.secondary.dark.base :
                  theme[variant].dark.base
              };
            }
          `
        }
      ` :
      css`
        border: none;
        outline: none;
        padding: 0 ${ theme.spacing.medium };
        line-height: 2.5em;
        background: ${
          disabled ?
            theme.secondary.base :
            theme.primary.base
        };
        color: ${
          disabled ?
            theme.secondary.on.base :
            theme.primary.on.base
        };

        &:hover {
          background: ${
            disabled ?
              theme.secondary.light.base :
              theme.primary.light.base
          };
          color: ${
            disabled ?
              theme.secondary.light.on.base :
              theme.primary.light.on.base
          };
        }

        &:active {
          background: ${
            disabled ?
              theme.secondary.dark.base :
              theme.primary.dark.base
          };
          color: ${
            disabled ?
              theme.secondary.dark.on.base :
              theme.primary.dark.on.base
          };
        }
      `
  }

  &:focus {
    outline: none;
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

import styled, { css } from 'styled-components'

const Button = styled.button.attrs({
  type: ({ type = 'button' }) => type
})`
  appearance: none;
  display: inline-flex;
  align-items: center;
  margin: 0;
  padding: 0;
  white-space: nowrap;
  transition: background .3s linear;
  transition: color .3s linear;
  line-height: 40px;
  height: 40px;
  cursor: ${
    ({ disabled }) => disabled ? 'not-allowed' : 'pointer'
  };

  ${
    ({ disabled, plain, theme, variant }) => (variant || plain) ?
      css`
        text-transform: uppercase;
        border: none;
        outline: none;
        font-weight: 600;
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
        display: block;
        width: 100%;
        border: none;
        outline: none;
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
    margin-right: ${
      ({ theme, loosed }) => loosed ?
        theme.spacing.medium :
        theme.spacing.small
    };

    &:last-child {
      margin-right: 0;
    }
  }
`

export default Button

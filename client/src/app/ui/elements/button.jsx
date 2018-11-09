import styled, { css } from 'styled-components'

const Button = styled.button.attrs({
  type: ({ type = 'button' }) => type
})`
  appearance: none;
  border: none;
  outline: none;
  align-items: center;
  margin: 0;
  padding: 0 8px;
  white-space: nowrap;
  transition:
    background .3s linear,
    color .3s linear;
  line-height: 40px;
  height: 40px;
  cursor: ${
    ({
      disabled,
      theme: { mouseDetected }
    }) => disabled ? 'not-allowed' : (
      mouseDetected ? 'pointer' : 'unset'
    )
  };

  ${
    ({
      disabled, plain, theme, variant }) => (variant || plain) ?
      css`
        display: inline-flex;
        font-weight: 600;
        ${
          plain && `
            padding: 0;
            background: transparent;

            ${ theme.mouseDetected && !theme.touchDetected && `
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
              }`
            }
          `
        }
        ${
          variant && `
            background: ${ theme.background.base };
            color: ${
              disabled ?
                theme.secondary.base :
                theme[variant].base
            };

            ${ theme.mouseDetected && !theme.touchDetected && `
              &:hover {
                color: ${
                  disabled ?
                    theme.secondary.light.base :
                    theme[variant].light.base
                };
              }`
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
        margin: auto;
        width: 100%;
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
        ${ theme.mouseDetected && !theme.touchDetected && `
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
          }`
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
  display: flex;

  ${
    ({ align }) => align === 'right' ?
      css`
        justify-content: flex-end;
      ` :
      css`
        justify-content: flex-start;
      `
  };
`

export default Button

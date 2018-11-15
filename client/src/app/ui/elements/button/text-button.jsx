import React from 'react'
import styled, { css } from 'styled-components'

const Button = styled.button.attrs({
  type: ({ type = 'button' }) => type
})`
  appearance: none;
  margin: 0;
  background: none;
  padding: 0;
  white-space: nowrap;
  cursor: pointer;
  text-decoration: underline;
  border: none;
  outline: none;
  &:focus {
    outline: none;
  }
  color: ${
    ({ disabled, theme }) => disabled ?
      theme.secondary.base :
      theme.black.base
  };
  ${
    ({ disabled, theme: { mouseDetected } }) => mouseDetected && css`
      cursor: ${ disabled ? 'not-allowed' : 'pointer' };
    `
  }
  ${
    ({ disabled, theme, variant }) => variant ?
      css`
        background: ${ theme.background.base };
        color: ${
          disabled ?
            theme.secondary.base :
            theme[variant].base
        };

        ${
          theme.mouseDetected && !theme.touchDetected && `
            &:hover {
              color: ${
                disabled ?
                  theme.secondary.light.base :
                  theme[variant].light.base
              };
            }
          `
        }
      ` :
      css`
        background: ${ theme.white.base };
        color: ${
          disabled ?
            theme.secondary.light.base :
            theme.black.base
        };

        ${
          theme.mouseDetected && !theme.touchDetected && `
            &:hover {
              color: ${
                disabled ?
                  theme.secondary.light.base :
                  theme.black.light.base
              };
            }
          `
        }
      `
  }
`

const Wrapper = styled.div`
  text-align: center;
  display: block;
  line-height: 40px;
  height: 40px;
`

const TextButton = ({ ...props }) =>(
  <Wrapper>
    <Button { ...props } />
  </Wrapper>
)

TextButton.Group = styled.div`
  display: inline-flex;

  & > ${ TextButton } {
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

export default TextButton

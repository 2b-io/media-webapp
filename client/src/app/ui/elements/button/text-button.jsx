import styled, { css } from 'styled-components'

const TextButton = styled.button.attrs({
  type: ({ type = 'button' }) => type
})`
  appearance: none;
  margin: 0;
  background: transparent;
  padding: 0;
  white-space: nowrap;
  border: none;
  outline: none;
  display: inline-flex;
  font-weight: 600;
  align-items: center;
  line-height: 40px;
  height: 40px;
  padding: 0 8px;

  &:focus {
    outline: none;
  }
  ${
    ({ disabled, theme: { mouseDetected } }) => mouseDetected && css`
      cursor: ${ disabled ? 'not-allowed' : 'pointer' };
    `
  }
  ${
    ({ disabled, theme, variant = 'secondary' }) => css`
      color: ${
        disabled ?
          theme.secondary.base :
          theme[ variant ].base
      };

      ${
        !disabled && theme.mouseDetected && !theme.touchDetected && css`
          &:hover {
            color: ${ theme[ variant ].light.base };
          }
        `
      }
    `
  }
`

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

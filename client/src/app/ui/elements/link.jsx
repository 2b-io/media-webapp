import React from 'react'
import styled, { css } from 'styled-components'

import preventDefault from 'services/prevent-default'

const StyledLink = styled.a`
  text-decoration: underline;

  ${
    ({ disabled, theme: { mouseDetected } }) => mouseDetected && css`
      cursor: ${ disabled ? 'not-allowed' : 'pointer' };
    `
  }
  ${
    ({ disabled, theme }) => css`
      ${
        !disabled && theme.mouseDetected && !theme.touchDetected && css`
          transition: opacity .3s;

          &:hover {
            opacity: 0.7;
          }
        `
      }
    `
  }

`

const Link = ({ onClick, ...props }) => (
  <StyledLink onClick={ preventDefault(onClick) } { ...props } />
)

export default Link

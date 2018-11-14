import React from 'react'
import styled from 'styled-components'

import preventDefault from 'services/prevent-default'

const StyledLink = styled.a`
  text-decoration: underline;
  cursor: ${
    ({
      disabled,
      theme: { mouseDetected }
    }) => disabled ? 'not-allowed' : (
      mouseDetected ? 'pointer' : 'unset'
    )
  };
  &:hover {
    opacity: ${
      ({ theme }) => theme.mouseDetected && !theme.touchDetected ?
        '0.7' :
        'unset'
    }
  }
`

const Link = ({ onClick, ...props }) => (
  <StyledLink onClick={ preventDefault(onClick) } { ...props } />
)

export default Link

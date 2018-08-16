import React from 'react'
import styled from 'styled-components'

import { LIGHT0, LIGHT_4 } from 'ui/color-palettes'

const StyledHeader = styled.div`
  position: fixed;
  background: ${ LIGHT_4 };
  z-index: 3;
  left: 0;
  right: 0;
  height: ${
    ({ height }) => `${height}px`
  };
  color: ${ LIGHT0 };
  top: ${
    ({ height, shown }) => shown ? 0 : `-${height}px`
  };
  transition: ${
    ({ shown }) => shown ?
      'top .6s cubic-bezier(.4, 0, .2, 1) .6s' :
      'top .6s cubic-bezier(.4, 0, .2, 1)'
  };
`

const Header = ({ children, height, shown }) => (
  <StyledHeader
    shown={ shown }
    height={ height }>
    { children }
  </StyledHeader>
)

export default Header

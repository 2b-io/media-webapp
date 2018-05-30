import React from 'react'
import styled from 'styled-components'

const StyledHeader = styled.div`
  position: fixed;
  background: #000000;
  z-index: 3;
  left: 0;
  right: 0;
  height: ${
    ({ height }) => `${height}px`
  };
  color: #ffffff;
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

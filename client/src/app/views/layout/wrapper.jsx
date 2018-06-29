import React from 'react'
import styled from 'styled-components'

const StyledWrapper = styled.div`
  position: absolute;
  z-index: 1;
  top: ${
    ({ headerHeight }) => `${headerHeight}px`
  };
  left: ${
    ({ menuWidth }) => `${menuWidth}px`
  };
  right: 0;
  bottom: 0;
  -webkit-overflow-scrolling: touch;
  overflow-x: hidden;
  overflow-y: ${
    ({ shown }) => shown ? 'auto' : 'hidden'
  };
`

const Wrapper = ({ children, shown, headerHeight, menuWidth }) => (
  <StyledWrapper
    id="wrapper"
    shown={ shown }
    headerHeight={ headerHeight }
    menuWidth={ menuWidth }>
    { children }
  </StyledWrapper>
)

export default Wrapper

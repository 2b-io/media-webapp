import React from 'react'
import styled from 'styled-components'

const StyledWrapper = styled.div`
  position: absolute;
  z-index: 1;
  min-width: 270px;
  top: 0;
  left: ${
    ({ menuWidth }) => `${ menuWidth }px`
  };
  right: 0;
  bottom: 0;
  transition: left 1.2s cubic-bezier(.4, 0, .2, 1);
  -webkit-overflow-scrolling: touch;
  overflow-x: hidden;
  overflow-y: ${
    ({ shown }) => shown ? 'auto' : 'hidden'
  };
  background: ${ ({ theme }) => theme.background.base };
`

const Wrapper = ({ children, shown, menuWidth }) => (
  <StyledWrapper
    id="wrapper"
    shown={ shown }
    menuWidth={ menuWidth }>
    { children }
  </StyledWrapper>
)

export default Wrapper

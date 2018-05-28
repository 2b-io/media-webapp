import React, { Component } from 'react'
import styled from 'styled-components'

const StyledWrapper = styled.div`
  position: absolute;
  z-index: 1;
  top: ${
    ({ headerHeight }) => `${headerHeight}px`
  };
  left: 100px;
  right: 0;
  bottom: 0;
  -webkit-overflow-scrolling: touch;
  overflow: ${
    ({ shown }) => shown ? 'auto' : 'hidden'
  };
`

const Wrapper = ({ children, shown, headerHeight }) => (
  <StyledWrapper
    shown={ shown }
    headerHeight= { headerHeight }>
    { children }
  </StyledWrapper>
)

export default Wrapper

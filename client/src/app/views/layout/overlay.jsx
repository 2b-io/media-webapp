import React from 'react'
import styled from 'styled-components'

const StyledOverlay = styled.div`
  position: fixed;
  background-color: gray;
  z-index: 2;
  top: 0;
  left: 0;
  bottom: 0;
  transition: width 1.2s cubic-bezier(.4, 0, .2, 1);
  align-center: center;
  justify-content: center;
  width: ${
    ({ shown, width }) => shown ? '100%' : `${width}px`
  };
  padding-top: ${
    ({ headerHeight }) => `${headerHeight}px`
  };
`
const Overlay = ({ children, shown, headerHeight, width }) => (
  <StyledOverlay
    shown={ shown }
    headerHeight={ headerHeight }
    width={ width }>
    { children }
  </StyledOverlay>
)

export default Overlay

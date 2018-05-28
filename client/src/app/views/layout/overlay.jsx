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
  display: flex;
  align-center: center;
  justify-content: center;
  width: ${
    ({ shown }) => shown ? '100%' : '100px'
  };
  padding-top: ${
    ({ headerHeight }) => `${headerHeight}px`
  };
`
const Overlay = ({ children, shown, headerHeight }) => (
  <StyledOverlay shown={ shown } headerHeight={ headerHeight }>
    { children }
  </StyledOverlay>
)

export default Overlay

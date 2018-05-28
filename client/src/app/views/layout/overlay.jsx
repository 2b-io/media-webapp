import React from 'react'
import styled from 'styled-components'

const Overlay = styled.div`
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

export default ({ shown, headerHeight }) => (
    <Overlay shown={ shown } headerHeight={ headerHeight }>
      <div>
        <span>Overlay</span>
      </div>
    </Overlay>
)

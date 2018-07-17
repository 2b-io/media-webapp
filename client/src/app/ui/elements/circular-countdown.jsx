import React from 'react'
import styled, { keyframes } from 'styled-components'

const countdown = ({ size }) => keyframes`
  from {
    stroke-dashoffset: 0px;
  }
  to {
    stroke-dashoffset: ${ (size - 4) * Math.PI }px;
  }
`

const Wrapper = styled.div`
  display: inline-flex;
  width: ${ ({ size }) => `${ size }px` };
  height: ${ ({ size }) => `${ size }px` };

  svg {
    transform: rotateY(-180deg) rotateZ(-90deg);

    circle {
      fill: none;
      stroke-linecap: round;
      stroke-width: ${ ({ stroke }) => `${ stroke }px` };
      stroke: currentColor;
      stroke-dasharray: ${ ({ size }) => `${ (size - 4) * Math.PI }px` };
      stroke-dashoffset: 0px;
      animation:
        ${ countdown }
        ${ ({ expiring }) => expiring }
        linear
        forwards;
    }
  }
`

const CircularCountdown = ({ size, expiring = '10s', stroke = 2 }) => (
  <Wrapper size={ size } expiring={ expiring } stroke={ stroke }>
    <svg>
      <circle r={ size / 2 - 2 } cx={ size / 2 } cy={ size / 2 } />
    </svg>
  </Wrapper>
)

export default CircularCountdown

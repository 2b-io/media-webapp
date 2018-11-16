import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  @media (min-width: 600px) {
    display: grid;
    grid-template-columns: min-content min-content;
    grid-gap: 16px;
    width: min-content;
    margin: 0 0 0 auto;

    & > * {
      min-width: 0;
      min-height: 0;
    }
  }
`

const Primary = styled.div`
`

const Secondary = styled.div`
  grid-row-start: -1;
`

const ButtonGroup = ({ primary, secondary }) => (
  <Wrapper>
    { primary && <Primary>{ primary() }</Primary> }
    { secondary && <Secondary>{ secondary() }</Secondary> }
  </Wrapper>
)

export default ButtonGroup

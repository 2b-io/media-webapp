import React from 'react'
import styled from 'styled-components'

import { TextLine } from 'ui/typo'

const Wrapper = styled.div`
`
const Container = styled.div`
  position: relative;
  height: 24px;
`

const Header = styled.div`
  display: grid;
  & > * {
    min-width: 0;
    min-height: 0;
  };
  grid-template-columns: 1fr 40px;
`

const Value = styled.span`
  height: 40px;
  line-height: 40px;
  text-align: center;
`

const Range = styled.input.attrs({
  type: 'range'
})`
  position: absolute;
  height: 24px;
  background: transparent;
  appearance: none;
  outline: none;
  opacity: 0;
  margin: 0;
  left: 0;
  width: 100%;
  z-index: 4;
`

const CircleThumb = styled.div.attrs({
  style: ({ relativeValue }) => ({
    left: `${ relativeValue }%`
  })
})`
  position: absolute;
  width: 24px;
  height: 24px;
  transform: translate3d(-50%, 0, 0);
  border-radius: 50%;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, .07);
  display: block;
  transition: .2s;
  z-index: 3;
  background: ${ ({ theme }) => theme.primary.base };
`

const ActiveTrack = styled.div.attrs({
  style: ({ relativeValue }) => ({
    width: `${ relativeValue }%`
  })
})`
  position: absolute;
  top: 10px;
  left: 0;
  display: inline-block;
  height: 4px;
  background: ${ ({ theme }) => theme.primary.base };
  transition: .2s;
  z-index: 2;
`

const InactiveTrack = styled.div`
  position: absolute
  top: 11px;
  right: 0;
  display: inline-block;
  height: 2px;
  background: ${ ({ theme }) => theme.black.base };
  transition: .2s;
  width: 100%;
  z-index: 1;
`

const SlideBar = ({
  label,
  ...props
}) => {
  const { min, max, value } = props
  const relativeValue = Math.abs((value - min) / (max - min)) * 100

  return (
    <Wrapper>
      <Header>
        <TextLine mostLeft mostRight>{ label }</TextLine>
        <Value>{ value }</Value>
      </Header>
      <Container>
        <ActiveTrack relativeValue={ relativeValue } />
        <InactiveTrack />
        <CircleThumb relativeValue={ relativeValue } />
        <Range
          { ...props }
        />
      </Container>
    </Wrapper>
  )
}

export default SlideBar

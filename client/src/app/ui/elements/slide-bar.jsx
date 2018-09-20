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
  grid-template-columns: 1fr minmax(40px, min-content);
`

const Range = styled.input.attrs({
  type: 'range'
})`
  position: absolute;
  height: 16px;
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
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: ${ ({ theme }) => theme.primary.base };
  position: absolute;
  top: -7px;
  right: -8px;
`

const ActiveTrack = styled.div.attrs({
  style: ({ relativeValue }) => ({
    width: `${ relativeValue }%`
  })
})`
  position: absolute;
  top: 7px;
  left: 0;
  height: 2px;
  background: ${ ({ theme }) => theme.primary.base };
  transition: width .2s;
  z-index: 2;
`

const InactiveTrack = styled.div`
  position: absolute
  top: 7px;
  left: 0;
  right: 0;
  height: 2px;
  background: ${ ({ theme }) => theme.black.base };
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
        <TextLine align="center">{ value }</TextLine>
      </Header>
      <Container>
        <InactiveTrack />
        <ActiveTrack relativeValue={ relativeValue }>
          <CircleThumb />
        </ActiveTrack>
        <Range { ...props } />
      </Container>
    </Wrapper>
  )
}

export default SlideBar

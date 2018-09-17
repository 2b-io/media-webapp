import React, { Fragment } from 'react'
import styled from 'styled-components'


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

const Detail = styled.span`
  height: 40px;
  padding-left: 8px;
  line-height: 40px;
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
`

const CircleThumb = styled.div`
  position: absolute;
  width: 24px;
  height: 24px;
  margin-left: -12px;
  border-radius: 50%;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, .07);
  display: block;
  transition: .2s;
  background: ${ ({ theme }) => theme.primary.base };
  left: ${
    ({ value }) => ` ${ value }%`
  };
`
const ActiveTrack = styled.div`
  position: absolute;
  top: 10px;
  left: 0;
  display: inline-block;
  height: 4px;
  background: ${ ({ theme }) => theme.primary.base };
  transition: .2s;
  width: ${
    ({ value }) => ` ${ value }%`
  };
`

const InactiveTrack = styled.div`
  position: absolute;
  top: 10px;
  right: 0;
  display: inline-block;
  height: 4px;
  background: black;
  transition: .2s;
  background: rgba(100, 200, 250, 1);
  width: ${
    ({ value }) => ` ${ 100 - value }%`
  };
`

const SlideBar = ({
  label,
  ...props
}) => {
  const currentState = props.value
  return (
    <Fragment>
      <Header>
        <Detail>{ label }</Detail>
        <Value>{ currentState }</Value>
      </Header>
      <Container>
        <ActiveTrack value={ currentState } />
        <InactiveTrack value={ currentState } />
        <CircleThumb value={ currentState } />
        <Range
          { ...props }
          value={ currentState }
        />
      </Container>
    </Fragment>
  )
}

export default SlideBar

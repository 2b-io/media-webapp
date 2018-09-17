import React from 'react'
import styled from 'styled-components'


const Container = styled.div`
  position: relative;
`

const Range = styled.input.attrs({
  type: 'range'
})`
  position: absolute;
  height: 24px;
  background: transparent;
  // appearance: none;
  // outline: none;
  // opacity: 0;
  margin: 0;
  left: 0;
  width: 100%;
`

const Circle = styled.div`
  position: absolute;
  width: 24px;
  height: 24px;
  margin-left: -12px;
  border-radius: 50%;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, .07);
  display: block;
  transition: .2s;
  top: -10px;
  background: ${ ({
    theme,
    disabled
  }) => disabled ?
    theme.secondary.base :
    theme.primary.base
  };
  left: ${
    ({ range }) => ` ${ range }%`
  };
`
const RangeValue = styled.div`
  position: absolute;
  top: -2;
  left: 0;
  display: inline-block;
  height: 4px;
  background: ${ ({
    theme,
    disabled
  }) => disabled ?
    theme.secondary.base :
    theme.primary.base
  };
  transition: .2s;
  width: ${
    ({ range }) => ` ${ range }%`
  };
`

const RangeValueRight = styled.div`
  position: absolute;
  top: -2;
  right: 0;
  display: inline-block;
  height: 4px;
  background: black;
  transition: .2s;
  width: ${
    ({ range }) => ` ${ 100 - range }%`
  };
`

const SlideBar = ({
  ...props
}) => {

  return (
    <Container>
      <RangeValue range={ props.value } />
      <RangeValueRight range={ props.value } />
      <Circle range={ props.value } />
      <Range
        { ...props }
        value={ props.value }
      />
    </Container>
  )
}

export default SlideBar

import React from 'react'
import styled from 'styled-components'


const Container = styled.div`
  position: relative;
  &::after {
    content: '';
    width: 100%;
    height: 20px;
    border-radius: 10px;
    background: #f2f4f4;
    display: block;
  }

  &::before {
    content: '';
  }

`

const Range = styled.input.attrs({
  type: 'range'
})`

  position: absolute;
  width: 100%;
  background: transparent;
  appearance: none;
  left: 0;
  top: -3px;
  z-index: 9;
  outline: none;
  opacity: 0;

  &::-ms-expand {
    display: none;
  }

  &::-ms-clear {
    display: none;
  }

  &::-webkit-slider-thumb {
    width: 35px;
    height: 35px;
    margin: -3px 0 0 -3px;
    cursor: pointer;
    appearance: none;
  }
`

const Circle = styled.div`
  position: absolute;
  top: -8px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, .07);
  border: solid 2px #dbdbdb;
  background: white;
  display: inline-block;
  transition: .2s;
`
const RangeValue = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: inline-block;
  width: 20%;
  height: 20px;
  background: #29b3e0;
  border-radius: 10px 0 0 10px;
  transition: .2s;
`

const genSlideStyle = (value) => {
  return {
    point: {
      left: `calc(${value * 20}% - ${5 + 3 * value}px)`,
    },
    range: {
      width: `${value * 20}%`,
    },
  };
};


const SlideBar = ({
  value,
  ...props
}) => {
  const slideStyle = genSlideStyle(value);

  return (
    <Container>
      <RangeValue />
      <Circle />
      <Range
        name="range"
        type="range"
        min="0"
        max="5"
        value={ value }
        step="1"
        // onChange={ () => handleChange() }
      />
    </Container>
  );
}

export default SlideBar

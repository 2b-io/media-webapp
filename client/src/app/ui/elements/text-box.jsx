import React from 'react'
import styled from 'styled-components'

const TextBox = styled.input.attrs({
  type: ({ type = 'text' }) => type
})`
  appearance: none;
  background-color: transparent;
  border: none;
  border-bottom: 2px solid lightgray;
  border-radius: 0;
  outline: none;
  padding: 10px;
  width: 100%;
  transition: border-bottom .6s linear;
  &:hover, &:focus {
    border-bottom: 2px solid black;
  }
`

export default TextBox

import React from 'react'
import styled from 'styled-components'

const TextBox = styled.input.attrs({
  type: ({ type }) => type
})`
  border: none;
  border-bottom: 2px solid lightgray;
  outline: none;
  padding: 10px;
  width: 100%;
  transition: border-bottom .6s linear;
  &:hover, &:focus {
    border-bottom: 2px solid black;
  }
`

export default TextBox

import React from 'react'
import styled from 'styled-components'

const TextBox = styled.input.attrs({
  type: ({ type }) => type
})`
  border: none;
  border-bottom: 2px solid gray;
  outline: none;
  padding: 10px;
  width: 100%;
  &:hover {
    border-bottom: 2px solid black;
  }
`

export default TextBox

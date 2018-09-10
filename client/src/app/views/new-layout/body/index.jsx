import React from 'react'
import styled from 'styled-components'

const Material = styled.section`
  overflow-x: hidden;
  overflow-y: auto;
`

const Body = ({ children }) => (
  <Material>{ children }</Material>
)

export default Body

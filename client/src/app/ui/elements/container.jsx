import React from 'react'
import styled from 'styled-components'

const MiddleContainer = styled.div`
  max-width: 1024px;
  margin: auto;
  padding: 16px;
`

const Container = ({ children }) => (
  <MiddleContainer>{ children }</MiddleContainer>
)

export default Container

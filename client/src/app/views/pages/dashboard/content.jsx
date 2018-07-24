import React from 'react'
import styled from 'styled-components'

import { Container } from 'ui/elements'
import Project from './project'

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const Dashboard = () => (
  <Container>
    <Wrapper>
      <Project />
    </Wrapper>
  </Container>

)

export default Dashboard

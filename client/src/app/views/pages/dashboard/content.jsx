import React from 'react'
import styled from 'styled-components'

import { Container } from 'ui/elements'
import Project from './project'

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const Box = styled.div`
  max-width: 600px;
  width: 600px;
  padding-bottom: ${ ({ theme }) => theme.spacing.medium };
  padding-right: ${ ({ theme }) => theme.spacing.medium };

  @media (max-width: 768px) {
    width: 100%;
    padding-right: 0;
  }
`

const Dashboard = () => (
  <Container>
    <Wrapper>
      <Box>
        <Project />
      </Box>
      <Box>
        <Project />
      </Box>
      <Box>
        <Project />
      </Box>
      <Box>
        <Project />
      </Box>
      <Box>
        <Project />
      </Box>
    </Wrapper>
  </Container>

)

export default Dashboard

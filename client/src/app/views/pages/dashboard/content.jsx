import React from 'react'
import styled from 'styled-components'

import ProjectBlock from './project-block'
import { Container } from 'ui/elements'

const Layout = styled.section`
  padding: 16px;
  height: 100%;
  min-height: 100%;
  max-height: 100%;
  overflow-y: auto;
  background: #e6e6e6;
`

const Dashboard = () => (
  <Layout>
    <Container>
      <ProjectBlock />
    </Container>
  </Layout>
)

export default Dashboard

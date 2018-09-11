import React from 'react'
import styled from 'styled-components'

import ProjectBlock from './project-block'

const Layout = styled.section`
  padding: 16px;
  height: 100%;
  min-height: 100%;
  max-height: 100%;
  overflow-y: auto;
  background: #e6e6e6;
`

const Container = styled.div`
  display: grid;
  & > * {
    min-height: 0;
    min-width: 0;
  }

  grid-gap: 16px;
  grid-template-columns: 100%;
`

const Dashboard = () => (
  <Layout>
    <Container>
      <ProjectBlock />
    </Container>
  </Layout>
)

export default Dashboard

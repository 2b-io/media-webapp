import React from 'react'
import styled from 'styled-components'

import ProjectBlock from './project-block'
import { ResponsiveGrid } from 'ui/elements'

const BREAK_POINTS = {
  phone: 1,
  tablet: 2,
  laptop: 3,
  desktop: 4,
  otherwise: 5
}

const Layout = styled.section`
  padding: 16px;
  height: 100%;
  min-height: 100%;
  max-height: 100%;
  overflow-y: auto;
  background: #e6e6e6;
`

const Dashboard = () => {
  const items = [ {
    content: () => <ProjectBlock />
  } ]

  return (
    <Layout>
      <ResponsiveGrid
        breakpoints={ BREAK_POINTS }
        items={ items }
      />
    </Layout>
  )
}

export default Dashboard

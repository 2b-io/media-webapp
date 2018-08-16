import React from 'react'

import { Container, MasonryLayout } from 'ui/elements'
import Project from './project'

const Dashboard = () => (
  <Container>
    <MasonryLayout
      rowHeight="tall"
      items={ [ {
        component: Project,
        grid: {
          w: 2,
          h: 1
        }
      } ] }
    />
  </Container>
)

export default Dashboard

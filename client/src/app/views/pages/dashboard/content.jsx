import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { mapDispatch } from 'services/redux-helpers'
import { actions, selectors } from 'state/interface'

import { Card, ResponsiveGrid } from 'ui/elements'
import { Project } from 'views/common/compounds'

const BREAK_POINTS = {
  phone: 1,
  otherwise: 2
}

const Layout = styled.section`
  padding: 16px;
  height: 100%;
  min-height: 100%;
  max-height: 100%;
  overflow-y: auto;
  background: #e6e6e6;
`

const Dashboard = ({
  pinnedProjects,
  toProjectDetail
}) => {
  const items = pinnedProjects.map((project) => {
    return {
      content: () => <Card
        key={ project.identifier }
        onClick={ toProjectDetail.bind(null, project.identifier) }
        content={ () => <Project project={ project } /> }
      />
    }
  })
  return (
    <Layout>
      <ResponsiveGrid
        breakpoints={ BREAK_POINTS }
        items={ items }
      />
    </Layout>
  )
}

export default connect(
  (state) => {
    const pinnedProjectIdentifiers = selectors.pinnedProjectIdentifiers(state)
    return {
      pinnedProjects: selectors.pinnedProjects(state, pinnedProjectIdentifiers)
    }
  },
  mapDispatch({
    toProjectDetail: slug => actions.requestLocation(`/projects/${ slug }`)
  })
)(Dashboard)

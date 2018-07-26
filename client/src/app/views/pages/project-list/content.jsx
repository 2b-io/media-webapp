import React from 'react'
import { connect } from 'react-redux'

import { mapDispatch, mapState } from 'services/redux-helpers'
import { actions, selectors } from 'state/interface'
import { Panel } from 'ui/compounds'
import { Button, Container, Link, MasonryLayout, Nowrap } from 'ui/elements'
import { AddIcon } from 'ui/icons'

const Project = ({ project, toProjectDetail }) => (
  <Panel fit={ true }>
    <Panel.Content>
      <Container>
        <Nowrap>
          <Link href="/" onClick={ toProjectDetail }>
            { project.name }
          </Link>
        </Nowrap>
        <Nowrap>
          <span>{ project.slug }</span>
        </Nowrap>
      </Container>
    </Panel.Content>
  </Panel>
)

const ProjectList = ({
  projects,
  toProjectDetail
}) => {
  if (!projects || !projects.length) {
    return (
      <h2>No data ....</h2>
    )
  }

  const items = projects.map(
    project => ({
      grid: { w: 1, h: 1 },
      component: () => (
        <Project key={ project._id }
          project={ project }
          toProjectDetail={ toProjectDetail.bind(null, project.slug) }
        />
      )
    })
  )

  return (
    <main>
      <Container>
        <MasonryLayout
          rowHeight="short"
          items={ items }
        />
      </Container>
    </main>
  )
}

export default connect(
  mapState({
    projects: selectors.allProjects,
  }),
  mapDispatch({
    toProjectDetail: slug => actions.requestLocation(`/projects/${ slug }`)
  })
)(ProjectList)

// TODO
//   <List
//     items={ projects }
//     renderItem={ project => <Project data={ project } /> }
//   />
// )

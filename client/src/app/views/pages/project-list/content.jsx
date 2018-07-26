import React from 'react'
import { connect } from 'react-redux'

import { mapDispatch, mapState } from 'services/redux-helpers'
import { actions, selectors } from 'state/interface'
import { Panel, TitleBar } from 'ui/compounds'
import { Button, Container, Link, MasonryLayout, Nowrap } from 'ui/elements'
import { FavoriteIcon } from 'ui/icons'

const Project = ({ project, toProjectDetail }) => (
  <Panel>
    <Panel.Header>
      <TitleBar>
        <TitleBar.Title>
          <Link href="/" onClick={ toProjectDetail }>
            { project.name }
          </Link>
        </TitleBar.Title>
        <TitleBar.Menu>
          <Button plain>
            <FavoriteIcon size="medium" />
          </Button>
        </TitleBar.Menu>
      </TitleBar>
    </Panel.Header>
    <Panel.Content>
      <Container>
        <Nowrap>Slug: { project.slug }</Nowrap>
        <Nowrap>Presets: { Object.keys(project.presets).length }</Nowrap>
        <Nowrap>Collaborators: { project.collaborators.length }</Nowrap>
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

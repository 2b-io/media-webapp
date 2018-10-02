import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { mapDispatch, mapState } from 'services/redux-helpers'
import { actions, selectors } from 'state/interface'
import { Card } from 'ui/elements'
import { AddIcon } from 'ui/icons'
import { Text } from 'ui/typo'
import { Project } from 'views/common/compounds'
import { stateful } from 'views/common/decorators'

const Fab = styled.button`
  position: fixed;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 40px;
  appearance: none;
  background: ${
    ({ theme }) => theme.primary.base
  };
  color: ${
    ({ theme }) => theme.primary.on.base
  };
  outline: none;
  border: none;
  bottom: 8px;
  right: 8px;
`

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
const sortProjects = ( { type, ascending }, projects, currentAccountId) => {

  switch (type) {
    case 'privilege': {
      return projects.sort(
        (project) => {
          const privilegeInProject = Object.values(project.collaborators).filter(
            ({ account }) => account._id === currentAccountId
          )[0].privilege

          return privilegeInProject === 'owner' && ascending
        }
      )
    }
    case 'name':
      return projects.sort(
        (project, nextProject) => (
          ascending ?
            project.name.localeCompare(nextProject.name) :
            nextProject.name.localeCompare(project.name)
        )
      )
    case 'created':
      return projects.sort(
        (project, nextProject) => (
          ascending ?
            project.created - nextProject.created :
            nextProject.created - project.created
        )
      )
  }
  return projects
}
const hideProjects = (projects) => projects.filter(({ isActive }) => isActive === true )

const ProjectList = ({
  projects,
  toCreateProject,
  toProjectDetail,
  session,
  ui: {
    sortType,
    sortAscending,
    hideDisabledProjects
  }
}) => {
  console.log('sortAscending', sortAscending);
  const { _id: currentAccountId } = session
  const filteredProjects = hideDisabledProjects ?
    hideProjects(projects) :
    projects

  const sortedProjects = sortProjects({
    type: sortType,
    ascending: sortAscending
  }, filteredProjects, currentAccountId)

  const cards = sortedProjects.map(
    project => (
      <Card
        key={ project.identifier }
        onClick={ toProjectDetail.bind(null, project.identifier) }
        content={ () => <Project project={ project } /> }
      />
    )
  )

  return (
    <Layout>
      <Container>
        { projects.length &&
          cards ||
          <Text>You do not have any projects yet.</Text>
        }
      </Container>
      <Fab onClick={ toCreateProject }>
        <AddIcon />
      </Fab>
    </Layout>
  )
}
export default connect(
  mapState({
    projects: selectors.allProjects,
    session: selectors.currentAccount
  }),
  mapDispatch({
    toCreateProject: () => actions.requestLocation('/projects/create'),
    toProjectDetail: identifier => actions.requestLocation(`/projects/${ identifier }`)
  })
)(ProjectList)

import React from 'react'
import { Portal } from 'react-portal'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { mapDispatch, mapState } from 'services/redux-helpers'
import { actions, selectors } from 'state/interface'
import { Card, PrimaryButton, ResponsiveGrid, LoadingIcon } from 'ui/elements'
import { AddIcon } from 'ui/icons'
import { Project } from 'views/common/compounds'

const Fab = styled(PrimaryButton)`
  position: fixed;
  min-width: 40px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  padding: 0;
  margin: 0;
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

const BREAK_POINTS = {
  phone: 1,
  tablet: 2,
  laptop: 3,
  desktop: 4,
  otherwise: 5
}

const sortProjects = ({ type, ascending }, projects, currentAccountId) => {
  switch (type) {
    case 'privilege': {
      return projects.sort(
        (project) => {
          const privilegeInProject = Object.values(project.collaborators).filter(
            ({ account }) => account._id === currentAccountId
          )[0].privilege

          return privilegeInProject === 'OWNER' && ascending
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
            project.createdAt - nextProject.createdAt :
            nextProject.createdAt - project.createdAt
        )
      )
  }

  return projects
}

const ProjectList = ({
  projects,
  toCreateProject,
  toProjectDetail,
  session,
  ui: {
    idle,
    sortType,
    sortAscending,
    hideDisabledProjects
  }
}) => {
  const { _id: currentAccountId } = session
  const filteredProjects = hideDisabledProjects ?
    projects.filter(({ isActive }) => isActive) :
    projects

  const sortedProjects = sortProjects({
    type: sortType,
    ascending: sortAscending
  }, filteredProjects, currentAccountId)

  const cards = sortedProjects.map(
    project => (
      {
        content: () => (
          <Card
            key={ project.identifier }
            interactable={ true }
            onClick={ toProjectDetail.bind(null, project.identifier) }
            content={ () => <Project project={ project } /> }
          />
        )
      }
    )
  )
  if (!idle) {
    return <div> <LoadingIcon /> </div>
  }
  return (
    <Layout>
      <ResponsiveGrid
        breakpoints={ BREAK_POINTS }
        items={ cards }
      />
      <Portal node={ document.getElementById('root') }>
        <Fab onClick={ toCreateProject }>
          <AddIcon />
        </Fab>
      </Portal>
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
    toProjectDetail: (identifier) => actions.requestLocation(`/projects/${ identifier }`)
  })
)(ProjectList)

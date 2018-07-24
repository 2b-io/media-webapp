import React from 'react'
import { connect } from 'react-redux'
import styled, { css } from 'styled-components'

import { mapDispatch, mapState } from 'services/redux-helpers'
import { actions, selectors } from 'state/interface'
import preventDefault from 'services/prevent-default'
import { Button } from 'ui/elements'
import { TitleBar } from 'ui/compounds'
import { AddIcon, ReloadIcon } from 'ui/icons'
import CreateProject from 'views/common/modals/create-project'
import { List } from 'ui/compounds'


const Box = styled.div`
  max-width: 600px;
  width: 600px;
  @media (max-width: 768px) {
    width: 100%;
  }
`
const BoxItem = styled.div`
`

const StyledLink = styled.a`
  display: block;
  text-decoration:none;
  text-overflow: ellipsis;
  overflow: hidden;
`

const StyledAll = styled.a`
  text-decoration:none;
  float: right;
  display: block;
  padding: ${ ({ theme }) => `${ theme.spacing.small }` };
`
const StyleHeader = styled.div`
  ${
    ({ theme }) => css`
      border-bottom: 1px solid ${ theme.secondary.light.base };
    `
  }
`

const ProjectLink = ({ onClick, ...props }) => (
  <StyledLink onClick={ preventDefault(onClick) } { ...props } />
)


const ProjectItem = ({ project, toProjectDetail }) => (
  <ProjectLink href="/" onClick={ toProjectDetail }>{ project.name }</ProjectLink>
)

const ProjectList = ({ projects, toProjectDetail }) => {
  if (!projects || !projects.length) {
    return (
      <h2>No data ....</h2>
    )
  }

  return (
    <List>
      {
        projects.map(
          project => (
            <List.Item key={ project._id }>
              <ProjectItem
                project={ project }
                toProjectDetail={ toProjectDetail.bind(null, project.slug) }
              />
            </List.Item>
          )
        )
      }
    </List>
  )
}

const AllProjects = ({ onClick, ...props }) => (
  <StyledAll onClick={ preventDefault(onClick) } { ...props } />
)

const Header = ({ showModal, reloadProjects }) => (
  <StyleHeader>
    <TitleBar>
      <TitleBar.Title>Project</TitleBar.Title>
      <TitleBar.Menu>
        <Button plain onClick={ showModal }>
          <AddIcon size="medium" />
        </Button>
        <Button plain onClick={ reloadProjects }>
          <ReloadIcon size="medium" />
        </Button>
      </TitleBar.Menu>
    </TitleBar>
    <CreateProject
      width="wide"
      title="Create New Project"
    />
  </StyleHeader>
)

const Project = ({ projects, toProjectDetail, toProjects, showModal, reloadProjects }) => (
  <Box>
    <BoxItem>
      <Header showModal={ showModal } reloadProjects={ reloadProjects } />
      <ProjectList projects={ projects } toProjectDetail={ toProjectDetail } />
      <AllProjects href="/" onClick={ ()=> toProjects() }>View all</AllProjects>
    </BoxItem>
  </Box>
)

export default connect(
  mapState({
    projects: selectors.allProjects,
  }),
  mapDispatch({
    toProjectDetail: slug => actions.requestLocation(`/projects/${ slug }`),
    toProjects: () => actions.requestLocation('/projects'),
    showModal: () => actions.showModal({ modal: 'CreateProject' }),
    reloadProjects: () => actions.fetchProjects()
  })
)(Project)




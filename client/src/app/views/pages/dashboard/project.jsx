import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { mapDispatch, mapState } from 'services/redux-helpers'
import { actions, selectors } from 'state/interface'
import preventDefault from 'services/prevent-default'
import { Button, Link } from 'ui/elements'
import { Panel, TitleBar } from 'ui/compounds'
import { AddIcon, ReloadIcon } from 'ui/icons'
import { TextLine } from 'ui/typo'
import CreateProject from 'views/common/modals/create-project'
// import { List } from 'ui/compounds'
import List from 'views/new-layout/sidebar/list'

const StyledLink = styled.a`
  display: block;
  text-decoration: none;
  text-overflow: ellipsis;
  overflow: hidden;
`

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

const NoData = styled.h2`
  padding: ${
    ({ theme }) => theme.spacing.medium
  };
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
      <NoData>No data...</NoData>
    )
  }

  const items = projects.map(
    project => ({
      key: project._id,
      onClick: toProjectDetail.bind(null, project.slug),
      content: () => <TextLine mostLeft mostRight>{ project.name }</TextLine>
    })
  )

  return (
    <List items={ items } />
  )
}

const Header = ({ showModal, reloadProjects }) => (
  <TitleBar>
    <TitleBar.Title>Recent Projects</TitleBar.Title>
    <TitleBar.Menu>
      <Button plain onClick={ showModal }>
        <AddIcon size="medium" />
      </Button>
      <Button plain onClick={ reloadProjects }>
        <ReloadIcon size="medium" />
      </Button>
    </TitleBar.Menu>
  </TitleBar>
)

const Project = ({ projects, toProjectDetail, toProjects, showModal, reloadProjects }) => (
  <Fragment>
    <Panel fit={ true }>
      <Panel.Header>
        <Header showModal={ showModal } reloadProjects={ reloadProjects } />
      </Panel.Header>
      <Panel.Content>
        <ProjectList projects={ projects } toProjectDetail={ toProjectDetail } />
      </Panel.Content>
      <Panel.Footer>
        <Footer href="/" onClick={ ()=> toProjects() }>
          <Link href="/projects" onClick={ preventDefault(toProjects) }>
            View all
          </Link>
        </Footer>
      </Panel.Footer>
    </Panel>
    <CreateProject
      width="wide"
      title="Create New Project"
    />
  </Fragment>
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

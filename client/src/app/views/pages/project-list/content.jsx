import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { mapDispatch, mapState } from 'services/redux-helpers'
import { actions, selectors } from 'state/interface'
import { Card } from 'ui/elements'
import { AddIcon } from 'ui/icons'
import { Text } from 'ui/typo'

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

const ProjectList = ({
  projects,
  toCreateProject,
  toProjectDetail
}) => {
  if (!projects || !projects.length) {
    return (
      <Layout>
        <Container>
          <Text>You do not have any projects yet.</Text>
        </Container>
      </Layout>
    )
  }

  const cards = projects.map(
    project => (
      <Card
        key={ project.identifier }
        onClick={ toProjectDetail.bind(null, project.identifier) }
        content={ () => (
          <Text mostLeft mostRight>
            { project.name }<br />
            { project.infrastructure.domain }<br />
            { project.status }
          </Text>
        ) }
      />
    )
  )

  return (
    <Layout>
      <Container>
        { cards }
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
  }),
  mapDispatch({
    toCreateProject: () => actions.requestLocation('/projects/create'),
    toProjectDetail: identifier => actions.requestLocation(`/projects/${ identifier }`)
  })
)(ProjectList)

// TODO
//   <List
//     items={ projects }
//     renderItem={ project => <Project data={ project } /> }
//   />
// )

import React from 'react'
import styled from 'styled-components'

import { stateful } from 'views/common/decorators'
import { Redirect, withParams } from 'views/router'

import { ApiKeys } from './api-keys-card'
import { Collaborators } from './collaborator-card/'
import { ProjectInfo } from './project-info-card/'
import { ProjectTools } from './project-tools-card'
import { Presets } from './presets-card'
import { PullSettings } from './pull-settings-card/'

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

const Project = ({
  params: {
    identifier
  },
  ui: {
    // idle,
    notFound,
    // deleteError,
    deleteResult,
    // updateError
  }
}) => {
  if(notFound || deleteResult) {
    return <Redirect to="/projects" />
  }

  return (
    <Layout>
      <Container>
        <ProjectInfo identifier={ identifier } />
        <Presets identifier={ identifier } />
        <PullSettings identifier={ identifier } />
        <ApiKeys identifier={ identifier } />
        <Collaborators identifier={ identifier } />
        <ProjectTools identifier={ identifier } />
      </Container>
    </Layout>
  )
}

export default withParams(
  stateful({ component: 'ProjectDetail' })(Project)
)

import React, { Fragment } from 'react'
import styled from 'styled-components'

import { ApiKeys } from './api-keys-card'
import { CacheSetting } from './cache-setting-card'
import { Collaborators } from './collaborator-card'
import { ProjectInfo } from './project-info-card'
import { ProjectTools } from './project-tools-card'
import { Presets } from './presets-card'
import { PullSettings } from './pull-settings-card'

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
  ui
}) => {
  return (
    <Layout>
      <Container>
        <ProjectInfo ui={ ui } />
        {
          ui.isProjectActive &&
            <Fragment>
              <Presets ui={ ui } />
              <CacheSetting ui={ ui } />
              <PullSettings />
              <ApiKeys />
              <Collaborators ui={ ui } />
              <ProjectTools />
            </Fragment>
        }
      </Container>
    </Layout>
  )
}

export default Project

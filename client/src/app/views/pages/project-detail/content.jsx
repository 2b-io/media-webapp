import React, { Fragment } from 'react'
import styled from 'styled-components'

import { ApiKeys } from './api-keys-card'
import { CacheSetting } from './cache-setting-card'
import { Collaborators } from './collaborator-card'
import { ResponsiveGrid } from 'ui/elements'
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
        {
          <ResponsiveGrid
            breakpoints={
              {
                phone: 1,
                tablet: 2,
                laptop: 3,
                desktop: 4,
                otherwise: 5
              }
            }
            items={
              [
                {
                  content: () => <ProjectInfo ui={ ui } />
                },
                {
                  content: () => <Presets ui={ ui } />,
                  enabled: ui.isProjectActive
                },
                {
                  content: () => <CacheSetting ui={ ui } />,
                  enabled: ui.isProjectActive
                },
                {
                  content: () => <PullSettings ui={ ui } />,
                  enabled: ui.isProjectActive
                },
                {
                  content: () => <ApiKeys ui={ ui } />,
                  enabled: ui.isProjectActive
                },
                {
                  content: () => <Collaborators ui={ ui } />,
                  enabled: ui.isProjectActive
                },
                {
                  content: () => <ProjectTools ui={ ui } />,
                  enabled: ui.isProjectActive
                },
              ]
            }
          />
        }
      </Container>
    </Layout>
  )
}

export default Project

import React from 'react'
import styled from 'styled-components'

// import { ApiKeys } from './api-keys-card'
import { CacheSetting } from './cache-setting-card'
import { Collaborators } from './collaborator-card'
import { ResponsiveGrid, LoadingIcon } from 'ui/elements'
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

const BREAK_POINTS = {
  phone: 1,
  tablet: 2,
  laptop: 3,
  desktop: 4,
  otherwise: 5
}

const generateContentProject = (ui) => {
  if (ui.isProjectActive) {
    return [
      {
        content: () => <ProjectInfo ui={ ui } />
      },
      {
        content: () => <Presets ui={ ui } />,
      },
      {
        content: () => <CacheSetting ui={ ui } />,
      },
      {
        content: () => <PullSettings ui={ ui } />,
      },
      // {
      //   content: () => <ApiKeys ui={ ui } />,
      // },
      {
        content: () => <Collaborators ui={ ui } />,
      },
      {
        content: () => <ProjectTools ui={ ui } />,
      }
    ]
  } else {
    return [
      {
        content: () => <ProjectInfo ui={ ui } />
      }
    ]
  }
}

const Project = ({ ui }) => { console.log('ui', ui);
  if (!ui.idle) {
    return <div> <LoadingIcon /> </div>
  }
  return (
    <Layout>
      <ResponsiveGrid
        breakpoints={ BREAK_POINTS }
        items={ generateContentProject(ui) }
        height="auto"
      />
    </Layout>
  )
}

export default Project

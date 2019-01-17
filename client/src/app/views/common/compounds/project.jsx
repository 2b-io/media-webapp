import React from 'react'
import styled from 'styled-components'

import { StatusIndicator } from 'ui/elements'
import { Text, TextLine } from 'ui/typo'

const ProjectName = styled.div`
  display: grid;
  & > * {
    min-width: 0;
    min-height: 0;
  }

  grid-template-columns: 40px 1fr;
`

const Project = ({ project }) => {
  const {
    domain,
    protocol,
    infrastructure: {
      domain: ifraDomain,
      provider
    }
  } = project

  return (
    <section>
      <ProjectName>
        <StatusIndicator isActive={ project.isActive } />
        <TextLine mostRight>{ project.name }</TextLine>
      </ProjectName>
      <Text mostLeft mostRight>
        { provider === 'cloudfront' ? 'Amazon CloudFront' : 'Key CDN' }<br />
        { `${ protocol }://${ domain }` }<br />
        { ifraDomain }<br />
        {
          project.status !== 'DEPLOYED' ?
            project.status :
            project.isActive ? 'DEPLOYED' : 'DISABLED'
        }
      </Text>
    </section>
  )
}

export default Project

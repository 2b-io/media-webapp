import React from 'react'
import styled from 'styled-components'

const Pattern = styled.div`
  cursor: pointer;
  padding: ${
    ({ theme }) => `
      ${ theme.spacing.small }
      ${ theme.spacing.medium }
    `
  }
`

const ProjectTools = ({ onProjectSelected, detail }) => (
  <Pattern
    onClick={ onProjectSelected }
  >
    <span>{ detail }</span>
  </Pattern>
)

export default ProjectTools

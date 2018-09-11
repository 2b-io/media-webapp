import React from 'react'

import { Card, List } from 'ui/elements'
import { AddIcon, MoreIcon } from 'ui/icons'
import { Heading, TextLine } from 'ui/typo'

const ProjectBlock = ({ projects, toProjectDetail }) => {
  const items = projects.map(
    project => ({
      key: project._id,
      content: () => (
        <TextLine mostLeft mostRight
          onClick={ () => toProjectDetail(project.slug) }>
          { project.name }
        </TextLine>
      ),
      trailing: () => <MoreIcon />
    })
  )

  return (
    <Card
      title={ () => <Heading mostLeft mostRight>Projects</Heading> }
      fab={ () => <AddIcon /> }
      content={ () => <List items={ items } /> }
    />
  )
}

export default ProjectBlock

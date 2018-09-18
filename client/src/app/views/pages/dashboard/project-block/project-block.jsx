import React from 'react'

import { Card, List } from 'ui/elements'
import { AddIcon, MoreIcon } from 'ui/icons'
import { Heading, Text, TextLine } from 'ui/typo'

const ProjectBlock = ({
  projects,
  toCreateProject,
  toProjectDetail
}) => {
  const items = projects.map(
    project => ({
      key: project._id,
      content: () => (
        <TextLine mostLeft
          onClick={ toProjectDetail.bind(null, project.identifier) }>
          { project.name }
        </TextLine>
      ),
      trailing: () => <MoreIcon />
    })
  )

  return (
    <Card
      title={ () => <Heading mostLeft mostRight>Projects</Heading> }
      fab={ () => <AddIcon onClick={ toCreateProject } /> }
      content={ () => (
        items.length &&
          <List items={ items } /> ||
          <Text mostLeft mostRight>
            You do not have any projects yet.
          </Text>
      ) }
    />
  )
}

export default ProjectBlock
